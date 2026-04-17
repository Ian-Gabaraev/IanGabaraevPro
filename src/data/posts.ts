export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  content: string;
  favorite?: boolean;
}

export const posts: BlogPost[] = [
  {
    favorite: true,
    slug: "upgrading-to-django-6",
    title: "Upgrading to Django 6: Everything That Went Wrong",
    date: "2026-04-25",
    excerpt:
      "Six months, 500+ containers, one brutal outage, and a WebSocket migration that nearly broke everything. A war story about upgrading a massive telehealth platform from Django 3 to Django 6.",
    tags: [
      "Python",
      "Django",
      "DevOps",
      "Azure",
      "Redis",
      "WebSockets",
      "Series",
    ],
    content: `
# Upgrading to Django 6: Everything That Went Wrong

<img src="/images/django6/hero.svg" alt="Dramatic diagram showing Django 6, Redis Pub/Sub, django-channels, and Azure containers connected in a dark infrastructure layout — illustrating the complexity of a major Django upgrade" style="width:100%;border-radius:8px;margin:1.5rem 0;" />

---

Moving a large-scale telehealth platform — 500+ containers, 6,000 concurrent users at peak, WebRTC calls across 65 languages — from Django 3 to Django 6 was a six-month odyssey. We went from Python 3.9 / Django 3 to Python 3.12 / Django 6, stopping at Django 5 along the way.

Here is everything that broke, everything we learned, and the one outage that made us rethink our entire deployment strategy.

<img src="/images/django6/stack-before-after.svg" alt="Architecture comparison: Django 3 with uWSGI and ws4redis versus Django 6 with Gunicorn, Uvicorn, and django-channels" style="width:100%;border-radius:8px;margin:1.5rem 0;" />

---

## The Obvious Stuff (That Still Hurt)

### Deprecations

Django does not remove things overnight. It deprecates them, warns you for two major versions, and then pulls the rug. By Django 6, that rug covered a lot of ground.

One example: \`index_together\` — gone. Replaced by \`Meta.indexes\`. Straightforward in theory, tedious in practice when you have hundreds of models accumulated over years of development.

### Third-Party Library Compatibility

Some libraries kept up with Django's pace. Many did not. In several cases, we had to fork packages and submit our own patches to make them Django 6–compatible. Each fork added to the maintenance surface. Each patch extended the timeline.

### Database Migrations

Django's ORM changes between major versions meant rewriting migrations. That alone is painful enough — ensuring data preservation across environments, testing rollback paths, verifying every migration on staging before it touches production.

But the real trap was **third-party migrations**.

We upgraded \`django-rest-knox\` from version 3 to 5.0.2. Knox 5 shipped with three new migrations that renamed columns and deleted another. On its own, not a big deal. But this meant that rolling back Django was no longer as simple as toggling a version number. A rollback now required automated SQL scripts to restore renamed columns to their original state. What should have been a five-minute revert became a carefully orchestrated database operation.

### Testing

Every major version upgrade demands a full audit of your test suite. New behaviors, changed defaults, deprecated patterns that silently passed before — all of it surfaces during testing. We rewrote and expanded significant portions of our tests. Necessary work, but it added weeks to the timeline.

---

## The WebSocket Problem

This is where things got interesting.

We were running \`ws4redis\` — a package that, by 2026, had been abandoned for years. The last meaningful updates were from our own team. We would have happily kept using it, if not for a breaking change introduced in Django 4.

### What Broke

Django 4 changed how incoming requests are handled at the WSGI layer. The \`LimitedStream\` class no longer exposes the underlying socket object. In Django 3, \`ws4redis\` could reach into the request, grab the raw socket, and use it for WebSocket communication. In Django 4+, that socket is wrapped in an object with no useful public interface.

Compare the two:

- **Django 3** — [\`LimitedStream\` exposes \`self.stream\`](https://github.com/django/django/blob/2a04e24d2dfc8e60a66e4369d970913cb2112d91/django/core/handlers/wsgi.py#L18)
- **Django 5+** — [\`LimitedStream\` wraps the stream with no public access](https://github.com/django/django/blob/da8fed601625466889849bd6383a2a78d1c17809/django/core/handlers/wsgi.py#L23)

The socket \`ws4redis\` depended on simply was not there anymore. The package was dead.

### The Patch Attempt

Before giving up on \`ws4redis\`, I [patched the code](https://github.com/jrief/django-websocket-redis/commit/8aa0cbd37f1f19df2748bfc47d1154ad225f8f62) to stop accessing the \`stream\` attribute directly.

Load testing looked fine. Messages arrived. Everything seemed to work.

Then our telemetry lit up with a stream of random, context-less errors. None of them pointed to a clear root cause. We had a package that *mostly* worked but was provably unreliable under real-world conditions. Releasing that to 6,000 users on a healthcare platform was not an option.

So \`django-channels\` it was.

---

## The django-channels Tax

Switching to \`django-channels\` solved the WebSocket compatibility problem. It also introduced three new ones.

### Problem 1: The Sync-Async Bridge

\`django-channels\` is asynchronous by design. It uses ASGI and Python's \`asyncio\` event loop under the hood. Our codebase, like most Django projects, was overwhelmingly synchronous.

Channels provides \`async_to_sync\` and \`sync_to_async\` bridge functions to let the two worlds coexist. In practice, this means that every time a synchronous Django view needs to send a WebSocket message, it has to:

1. Spin up or acquire an event loop
2. Schedule the coroutine on that loop
3. Block the current thread until the coroutine completes

Each bridge crossing added roughly **50 milliseconds** of latency on average. Invisible in local development with a single container and a handful of test connections. Very visible in production with hundreds of containers and thousands of users, where that 50ms compounds across every API call that triggers a WebSocket message.

### Problem 2: Redis Under Pressure

The default \`RedisChannelLayer\` in \`django-channels\` performs expensive bookkeeping on every message send. Specifically, it calls \`ZREMRANGEBYSCORE\` on Redis sorted sets to prune stale channels from groups.

\`ZREMRANGEBYSCORE\` is an O(log(N) + M) operation — where N is the total number of elements in the sorted set and M is the number of elements removed. On every single group message. At scale, with thousands of groups and constant messaging, this turned our Redis instance into a bottleneck. Latency spiked. Real users felt it.

The irony: we did not even need this cleanup. Most of our groups contained a single channel, and we already handled disconnects explicitly in our consumers.

The fix was switching to \`RedisPubSubChannelLayer\`, which uses Redis Pub/Sub instead of sorted sets. Lightweight, no expensive bookkeeping, no cache suffocation.

### Problem 3: Heartbeats at Scale

Our platform uses periodic WebSocket heartbeats to track user presence — whether an interpreter is available, whether a client is still on the call. Users receive a heartbeat every few seconds.

**Attempt 1: Broadcast Groups**

The first approach was simple: one group per user for direct messages, plus a few shared groups for broadcasting heartbeats. Locally, this worked perfectly.

In production, with 500+ containers but a single shared Redis cluster, group name collisions became a real concern. I isolated groups by combining the hostname and PID of the worker process. It worked, but the cache keys became absurdly long — group name + username + hostname + PID — and the overhead of tracking all of these across the environment was significant.

**Attempt 2: Direct Per-User Messages**

We scrapped broadcast groups for heartbeats and switched to sending messages directly to each user's connection:

\`\`\`python
await self.send(text_data="heartbeat")
\`\`\`

The tradeoff: without broadcast groups, each connected user needs a dedicated \`asyncio\` task running an infinite loop:

\`\`\`python
async def send_heartbeat(self):
    try:
        while True:
            await asyncio.sleep(settings.CHANNELS_HEARTBEAT_INTERVAL_SEC)
            await self.send(text_data=settings.CHANNELS_HEARTBEAT)
    except asyncio.CancelledError:
        pass
\`\`\`

That means thousands of concurrent coroutines across the platform. We had long discussions about whether this was sustainable. In the end, we had close to a thousand Python processes spread across 500+ containers — the per-process load was minimal. We bit the bullet. It worked.

---

## The Sync Send Hack

We still had the 50ms bridge tax every time a synchronous API view needed to push a WebSocket message. Three approaches were considered:

<img src="/images/django6/sync-bridge.svg" alt="Diagram comparing async_to_sync bridge adding 50ms latency versus direct Redis publish with near-zero overhead" style="width:100%;border-radius:8px;margin:1.5rem 0;" />

**Approach 1: Daemon Thread with Isolated Event Loop**

The idea was to spin up a persistent event loop in a daemon thread and dispatch all WebSocket sends to it, bypassing the \`async_to_sync\` bridge entirely.

On paper, elegant. In practice, dangerous. Daemon threads are fire-and-forget — if they crash, the main process has no way to detect or recover from the failure. In a healthcare platform where WebSocket messages drive real-time call routing, a silently dead daemon thread means frozen call logic with no error and no recovery path short of restarting the entire container.

I rejected this approach.

**Approach 2: Direct Redis Publish**

Instead of going through the \`django-channels\` layer from sync code, we extracted the serialization logic and published messages directly to Redis:

\`\`\`python
backend = settings.CHANNEL_LAYERS["default"]["BACKEND"]
if backend == "channels_redis.pubsub.RedisPubSubChannelLayer":
    serialized = channel_layer._serializer.serialize(message)
    redis_conn = get_ws_redis_conn()

    if len(group_names) > 1:
        with redis_conn.pipeline() as pipe:
            for group_name in group_names:
                pipe.publish(f"asgi__group__{group_name}", serialized)
            pipe.execute()
    else:
        redis_conn.publish(
            f"asgi__group__{group_names[0]}", serialized
        )
else:
    for group_name in group_names:
        async_to_sync(channel_layer.group_send)(group_name, message)
\`\`\`

Yes, it is a hack. It reaches into the internal channel naming convention of \`django-channels\` and publishes directly. The risk is that a future version of \`channels-redis\` changes its internal format and this breaks silently.

The tradeoff was worth it. The 50ms bridge penalty disappeared. The function is still in production today, and we keep a close eye on it with every \`channels-redis\` upgrade.

---

## The Three-Hour Outage

We rolled out \`django-channels\` to production. It survived for exactly three hours before the entire platform went down.

Surface-level metrics looked acceptable — no application errors, no obvious failures. Just mysterious, seemingly random spikes in Redis stats and container restarts.

After weeks of investigation, we found the root cause: **Azure Container Apps health probes**.

Something in our deployment configuration — the combination of uWSGI, Channels, and the new ASGI stack — made the health probes interpret normal behavior as unhealthy. The probes became aggressive. Containers were being killed and restarted in waves.

Here is the cascade:

<img src="/images/django6/cascade-failure.svg" alt="Circular diagram showing cascading health probe failure: probes kill containers, load shifts, frontends reconnect, survivors fail, repeat" style="width:100%;border-radius:8px;margin:1.5rem 0;" />

1. Health probes kill ~50 containers out of 500+
2. The load from those dead containers shifts to the surviving ones
3. Frontends detect lost WebSocket connections and immediately attempt reconnection — all at once
4. Surviving containers absorb a massive traffic spike
5. The spike slows them down enough to fail health checks
6. Health probes kill them too
7. Repeat

A classic cascading failure. We resolved the immediate outage with a rollback — turning off \`django-channels\` entirely and falling back to the patched \`ws4redis\` while we figured out the infrastructure side.

The fix came in a separate release:

- **Replaced uWSGI with Gunicorn + Uvicorn workers** — a far more common and better-supported stack for ASGI applications
- **Switched from HTTP health probes to TCP probes** — less overhead, less chance of false negatives under load
- **Tuned probe intervals and failure thresholds** to be less trigger-happy

The result: **zero unscheduled container restarts**. The app was stable.

---

## What We Should Have Done Differently

In hindsight, load testing would have caught most of these issues before they reached production. The reality was that our environment was extraordinarily difficult to replicate.

This was not a content management system. This was a real-time communication platform — WebRTC calls, interpreters joining from every timezone, ten different call establishment flows, thousands of concurrent background tasks ranging from milliseconds to an hour in duration.

You can copy a production database. You cannot copy 6,000 users doing unpredictable things every second. The entropy of a live production environment — the noise, the edge cases, the timing-dependent failures — was nearly impossible to simulate without dedicated load testing infrastructure that we did not yet have.

That is the real lesson: **for systems at this scale and complexity, invest in production-grade load testing infrastructure before you start the upgrade, not after the first outage.**

---

## Summary

| Challenge | Solution |
|---|---|
| \`index_together\` removed | Migrated to \`Meta.indexes\` |
| Third-party libraries incompatible | Forked and patched |
| Knox migrations blocked rollback | Automated SQL rollback scripts |
| \`ws4redis\` dead on Django 4+ | Migrated to \`django-channels\` |
| \`async_to_sync\` bridge latency (~50ms) | Direct Redis publish from sync code |
| \`RedisChannelLayer\` choking Redis | Switched to \`RedisPubSubChannelLayer\` |
| Heartbeats at scale | Per-user asyncio tasks |
| Azure health probes cascading failure | Gunicorn + Uvicorn, TCP probes |
| Unreproducible prod environment | Lesson learned: invest in load testing early |

Six months. Three major Django versions. One outage that rewired how we think about deployments. The platform is faster, more maintainable, and running on a modern stack. Was it worth it? Ask me again after the next major upgrade.
    `.trim(),
  },
  {
    slug: "unknown-bat",
    title: "The Tale of an Unknown Bat: Field Recording in Vietnamese Caves",
    date: "2026-04-17",
    excerpt:
        "Hunting for bat calls with a 256kHz ultrasonic microphone — from neighborhood parks to pitch-black caves in the Marble Mountains.",
    tags: [
      "Python",
      "DSP",
      "Machine Learning",
      "Bioacoustics",
      "Wildlife",
      "Series",
      "Field Recording",
    ],
    content: `
# The Tale of an Unknown Bat #1: Field Recording in Vietnamese Caves

---

As with any machine learning project — **data is king**, and having plenty of it can make the journey significantly smoother.

For BatSonar, the data primarily consists of WAVE files capturing bat vocalizations recorded using an ultrasonic microphone. This is a niche piece of tech you won't find at your local electronics store. I sourced mine — a **Pettersson Elektronik U256** — all the way from Uppsala, Sweden, and had it shipped to Da Nang, Vietnam.

The U256 offers a sampling rate of **256 kHz**, providing a comfortable and reliable target frequency range just below the Nyquist limit — around **20–105 kHz**. This range is ample for most bat species.

## Scouting Locations

With the microphone in hand, I mapped out my local area and identified three "prime" locations for recording:

- A **neighborhood park** with a pond and a golf course
- A **sprawling rice field** about 20 km away in Hoi An
- A **massive cave** at the base of the Marble Mountains

---

## First Stop: The Park

I started at the park around 6 p.m., a time I had noted as prime bat-spotting from seeing them zip past my window at dusk. It was drizzling lightly, but I figured the rain wouldn't be an issue.

Once there, I plugged in the mic and began monitoring. The mic captured a medley of sounds — cicadas, crickets, and frogs — but nothing ultrasonic.

A bit discouraged, I scanned the skies and noticed enormous birds circling silently and ominously overhead. Could these predators be keeping the bats away? Perhaps.

I decided to call it a night at the park and headed for my next destination.

---

## Into the Cave

I arrived at the cave entrance around 8 p.m. It was technically "closed" but with no physical barriers, I ventured inside.

It was dark — no, **pitch black** — and the echo of raindrops sounded like distant fireworks in the cavern's halls. Navigating a narrow passage, I emerged into a vast chamber, dimly lit by a single candle near a statue of Lady Buddha.

*(As I'd learned during a recent visit to the Marble Mountains, the Vietnamese often depict Buddha as female — a fascinating cultural nuance.)*

I set up the mic, hit "record," and voilà — there it was on the sonogram: the characteristic **"triangles"** of bat calls. The bats were definitely here, chattering away, possibly gossiping about the intruder who dared enter their lair.

Curious, I explored deeper into the cave, where the chambers grew increasingly larger. After two solid hours of recording bat vocalizations, I decided to call it a night.

On my way out, I bumped into a security guard making his rounds. The mutual surprise of encountering someone in such a setting at that hour made the interaction feel oddly surreal.

---

## A Mind-Blowing Discovery

The following day would prove unforgettable.

As much as I would love to dive into it all today, let me pause at a cliffhanger.

*Next up: What I found when I analyzed the recordings — and why it changed everything.*
    `.trim(),
  },
  {
    favorite: true,
    slug: "first-200ft-dive",
    title: "My First 200ft Dive Was My First Close Call",
    date: "2026-04-05",
    excerpt:
        "Side mount diving gave me confidence, redundancy, and perfect trim. It also gave me the audacity to solo-descend to 60 meters — and learn why the ocean does not care about your gear.",
    tags: ["Diving", "Side Mount", "Technical Diving", "Deep Diving"],
    content: `
# My First 200ft Dive Was My First Close Call

<img src="https://media.iangabaraev.com/media/sidemount.JPG" alt="Ian Gabaraev in side mount diving configuration during training in Phuket, Thailand" style="width:100%;border-radius:8px;margin:1.5rem 0;" />
<p style="font-size:0.875rem;color:#737373;margin-top:-1rem;margin-bottom:2rem;">My 4th or so side mount dive — courtesy of my instructor Jon (Phuket, Thailand)</p>

At this point, I am not entirely sure why I got into side mount diving. I do know I invested a lot of money into the gear and the training. It paid off — side mount is, arguably, the superior way of diving. It is fussier, more complex, but it offers two things that recreational back mount diving cannot beat: **redundancy** and **effortless buoyancy**.

My diving style changed drastically after the first time I tried the gear in open water. I became far more aggressive, far more confident, and paradoxically calmer. I now had double the air of anyone else in the group, and I was gliding through water in perfect trim, gracefully.

<video src="https://media.iangabaraev.com/media/sidemount.mp4" autoplay loop muted playsinline style="width:100%;border-radius:8px;margin:1.5rem 0;"></video>
<p style="font-size:0.875rem;color:#737373;margin-top:-1rem;margin-bottom:2rem;">Gliding at 40 meters (~130 ft)</p>

With that came the hidden risk. Any reputable dive instructor will tell you — the moment you lose respect for the sea is the moment you need to step back. Ultimately, the water does not care what setup you have. All it takes is one bad case of narcosis, one freakout at depth, one panic attack, or one vicious current that exhausts you before you make it back up safely.

---

## The Perfect Day That Wasn't

I learned that lesson on what started as a damn good day. The water was calm, crystal clear, blue skies, visibility pushing 30 meters. I separated from my group of five — which, in itself, is a violation of the rules in any form of diving. Not to justify my behavior - but back then I liked to see my diving style as more of a rogue pirate, the kinds of the guys that back in the 80s would descend to 200ft on air in search of sunken WW2 German subs. I locked onto the gentle downward slope, and in about ten to twelve minutes I was at **60 meters — 200 ft**. That marked my deepest dive on regular air.

**Nitrogen narcosis** is a very real thing. It is commonly compared to alcohol intoxication, but I do not think that is accurate. You do lose chunks of memory — but you also get blurred, tunnel vision, numbness in your face, and the rhythmic drumming of your heartbeat in your ears. Symptoms usually manifest past 30 meters. At 60 meters, you are guaranteed to be narked, and it is not mild.

I remember not being able to make out the readings on my Shearwater dive computer. I instinctively wanted to rub my eyes — but I was not impaired enough to attempt something as pointless as rubbing your eyes at 200 ft in salt water.

<video src="https://media.iangabaraev.com/media/deepdive.mp4" autoplay loop muted playsinline style="width:100%;border-radius:8px;margin:1.5rem 0;"></video>
<p style="font-size:0.875rem;color:#737373;margin-top:-1rem;margin-bottom:2rem;">The last thing I recorded — the computer reads 50 meters, ~160 ft</p>

## The Ascent

So the instincts kicked in and I turned back. I was already in deco by that point, with four mandatory stops of increasing duration — the longest being at 3 meters (10 ft) for 20 minutes. For context, a typical recreational dive takes under an hour. I had already been down for 40 minutes and was staring at roughly 40 more minutes of decompression. I knew that by the time I surfaced, the boat would be either searching for me or gone.

I did my first three stops diligently. But ten minutes into the final 3-meter stop, I ran out of gas.

Now — mandatory decompression is called *mandatory* for a reason. Skipping it is gambling with your health, and in more serious cases, with your life. I figured I was close enough to safe — my computer was running extra-conservative settings — so I surfaced. I kicked back to the pristine little beach on the island. Ten minutes later, the boat showed up. They had been looking for me.

## The Aftermath

The crew was not happy. I asked to hold the discussion until I had my 100% oxygen. I breathed on that mask for half an hour and felt fine.

Needless to say, the dive shop was upset. I was asked to never repeat the stunt, and I did not. Instead, I paired up with another tech diver from the Netherlands — and together we did a solid 20 dives with proper gas planning, proper buddy checks, and proper respect for the water.

---

## Lessons

- **Never separate from your group.** Solo diving at depth without explicit planning is reckless — no matter how good your gear is.
- **Narcosis is not optional.** At 60 meters on air, you will be impaired. Period.
- **Gas planning is everything.** Redundancy means nothing if you burn through both tanks chasing depth.
- **The ocean does not negotiate.** Confidence without discipline is just a more elaborate way of getting yourself killed.

Side mount diving remains one of the best decisions I have made. But the gear did not save me that day — my instincts did. And instincts are only worth something if you train them with humility. The moment you have a brilliant idea of rubbing your eyes at 200 ft - you know instincts are no longer behind the wheel.
    `.trim(),
  },
  {
    slug: "bat-sonar-p2",
    title: "The Bat Sonar Project: Hearing What We Cannot",
    date: "2026-04-02",
    excerpt:
        "Introducing an open-source ultrasonic bat detection system — where math, physics, programming, and machine learning collide.",
    tags: ["Python", "DSP", "Machine Learning", "Wildlife", "Series"],
    content: `
# The Bat Sonar Project: Hearing What We Cannot

<img src="/images/bats-echolocation.jpg" alt="Bats in flight using echolocation (Pexels, by Ian Gabaraev)" style="width:100%;border-radius:8px;margin:1.5rem 0;" />
<p style="font-size:0.875rem;color:#737373;margin-top:-1rem;margin-bottom:2rem;">Bat foraging over water in Da Nang, Vietnam (Photo by Ian Gabaraev @ Pexels)</p>


I've always had a complicated relationship with sound. As a light sleeper, I sometimes wished I had a knob to narrow my frequency range — blocking out loud music, car horns, fireworks, and all the nighttime noise that intrudes past bedtime.

Yet, at the same time, scuba diving and astrophotography introduced me to the beauty of unraveling the hidden, the invisible, the inaudible. When I got my hands on hardware that could record signals beyond our — let's face it, quite modest — human hearing range, I was hooked.

It didn't take long for another project to emerge. This one was truly challenging, sitting at the intersection of **math**, **physics**, **programming**, and **machine learning**.

**The Bat Sonar.**

---

## Why Bats?

<img src="/images/bats-cave.jpg" alt="Cave habitat for bats" style="width:100%;border-radius:8px;margin:1.5rem 0;" />
<p style="font-size:0.875rem;color:#737373;margin-top:-1rem;margin-bottom:2rem;">Bats in a cave (Photo by Vladimir Konoplev @ Pexels)</p>


Bats are fascinating creatures. Despite being so different from cetaceans like orcas, dolphins, and whales in every conceivable way, these two groups share one extraordinary skill at the very core of their survival: **echolocation**.

The evolutionary paths that led bats and cetaceans to develop this sophisticated ability are beyond the scope of my project. However, one factor stands out — both hunt in darkness.

Bats typically emerge at twilight and feed throughout the night. Whales like the mighty sperm whale dive over a thousand meters into the ocean's depths in search of their ultimate prey: the giant squid.

## The Darkness Problem

As a scuba diver, I know firsthand that light barely penetrates water. At about 50 meters, it's already dim. Past 300 meters, it's universally considered a no-light zone.

Sperm whales hunt far beyond that, in complete darkness, relying on echolocation to navigate and capture their prey.

## Why Not Whales?

The answer lies in accessibility and the ability to collect and analyze my own data.

Capturing whale songs is a monumental task, requiring specialized equipment, vessels, and large-scale operations. With bats, all I need is:

- An **ultrasonic microphone**
- A **cave**

Fortunately, caves are abundant in Southeast Asia, and ultrasonic microphones are relatively affordable — costing only a few hundred dollars.

---

## What's Coming

This will be a series of posts. I'll be describing the development of the project in detail, including:

- How and where I'm getting my data
- The DSP pipeline for processing ultrasonic audio
- Species classification using neural networks
- Real-time monitoring on a Raspberry Pi

Gathering bat noise is definitely one of the best parts of this.

*Next up: Sound fundamentals — wavelength, sampling rate, Nyquist, and FFT.*
    `.trim(),
  },
  {
    favorite: true,
    slug: "nepal-pros",
    title: "The Himalayas Called — And I Answered with a Laptop",
    date: "2026-03-27",
    excerpt:
        "Remote work in Nepal sounds insane — until you try it. Affordable, connected, serene, and utterly unlike any digital nomad destination you have been to.",
    tags: [
      "Digital Nomad",
      "Nomad Atlas",
      "React",
      "TypeScript",
      "Remote Work",
      "Nepal",
    ],
    content: `
# The Himalayas Called — And I Answered with a Laptop

<img src="/images/nepal/nepal-6.webp" alt="Panoramic view of the Himalayan mountains in Nepal" style="width:100%;border-radius:8px;margin:1.5rem 0;" />
<p style="font-size:0.875rem;color:#737373;margin-top:-1rem;margin-bottom:2rem;">Aerial view of Annapurna II peak, Nepal. Want to be on the top of your game - at the top of the world?</p>

Digital nomads tend to follow the same overused, over-Instagrammed map as millions of others: Bali, Lisbon, Chiang Mai, maybe Medellín if they are feeling adventurous. Some might go to the Middle East, only to decide the culture is "too hard" to adapt to.

That is only natural. Most decisions we make as remote workers are second-hand. When you work remotely from abroad, keep fixed hours, and live by deadlines, you want to land and get straight to work. You cannot fully mix adventure and remote work on a whim. And if you think you can, you either have too much free time on your hands or you need to revisit your definition of adventure.

<img src="/images/nepal/nepal-1.webp" alt="Ian Gabaraev on a trekking trail in the Annapurna region of Nepal" style="width:100%;border-radius:8px;margin:1.5rem 0;" />
<p style="font-size:0.875rem;color:#737373;margin-top:-1rem;margin-bottom:2rem;">Warming up in the harsh high altitude sun. I grew out a massive beard by the end of the trek</p>

One of the foundational ideas behind [Nomad Atlas](https://nomadatlas.dev) is helping you make safe, calculated travel decisions for yourself. The app does not simply look at what other digital nomads are doing. It looks at how you have lived your nomad life and how you felt along the way. So if you visited Rwanda and felt good there, do not be surprised if one day [Nomad Atlas](https://nomadatlas.dev) sends you a notification: "Hey, your stay in Phuket is coming to an end. How about flying to Rwanda?"

Africa, in particular, is a special place for digital nomads. It deserves more thought before you pull the trigger. And do not get me wrong: if you approach it responsibly, it could easily become your home base.

Today, though, I want to talk about another place. A place many people visit, but almost no one seriously considers as a digital nomad hub — or a viable remote work destination. Nepal does not appear on any "best countries for digital nomads" list. It has no digital nomad visa. It has no coworking spaces outside Kathmandu and Pokhara. And yet — it may frighten you or make you fall in love, but it will not leave you indifferent.

## Buying Columbia Gear in Kuala Lumpur

In October 2024, my girlfriend and I went to a mall in Kuala Lumpur looking for Columbia gear. We found the store on the first floor and left an hour later with large shopping bags. We each bought a new pair of hiking boots and a puffer jacket. The rest of the gear, we decided, could wait until arrival.

November came fast. There were reports of devastating floods in our destination, and we hesitated. Neither of us had ever been there before. But the flights were already booked, so after a sleepless night, we drove to KLIA, passport in hand and walkie-talkie on the belt.

<img src="/images/nepal/nepal-2.webp" alt="Mountain village along the Annapurna Circuit trek" style="width:100%;border-radius:8px;margin:1.5rem 0;" />
<p style="font-size:0.875rem;color:#737373;margin-top:-1rem;margin-bottom:2rem;">A view of Manaslu on the way back</p>

We landed in Kathmandu on a perfect, clear, sunny day. The next morning, we took a grueling 12-hour drive to Besisahar, followed by another two-hour bumpy ride to the nearest village on the Annapurna Circuit route.

Over the course of 25 days, I did not see a single digital nomad there.

I did, however, see potential.

## Why Nepal Works for Remote Work

<img src="/images/nepal/nepal-4.webp" alt="Teahouse accommodation in the Himalayan mountains with Wi-Fi for remote work" style="width:100%;border-radius:8px;margin:1.5rem 0;" />
<p style="font-size:0.875rem;color:#737373;margin-top:-1rem;margin-bottom:2rem;">A regular teahouse will have lodging, internet and warm food</p>


**It is gorgeous.** The nature is mind-blowing, and no matter where you are, you have dozens of hiking options after your workday ends.

**The cost of living in Nepal is absurdly low.** In many places, teahouses provide free accommodation as long as you order food. Prices per night range from USD 5 to USD 50. A full three-course meal costs between USD 5 and USD 15. For digital nomads used to paying $2,000/month for a studio in Lisbon or Bangkok, Nepal feels like a different economic universe.

**The internet in Nepal is better than you think.** Even remote teahouses offer Wi-Fi, and Nepal Telecom's 5G was available in most places except the deeper valleys. It was fast enough to browse Instagram and upload stories. More importantly, the Wi-Fi speed in Nepal is sufficient to check your Jira board, join Zoom calls, answer Slack messages, and keep working remotely from the Himalayas.

<img src="/images/nepal/nepal-5.webp" alt="Scenic mountain landscape along the trekking route in Nepal" style="width:100%;border-radius:8px;margin:1.5rem 0;" />

**It is serene.** And that matters more than coworking spaces or fast coffee shops. One of the biggest problems with popular digital nomad destinations is exactly that: they are too popular. You end up competing for housing, dealing with noise, and trying to take your daily stand-up call while someone nearby is throwing a party. In the Himalayas, there is none of that. Nepal offers something no coworking space in Canggu ever will: complete, undisturbed focus.

## Would You Be Brave Enough?

<img src="/images/nepal/nepal-3.webp" alt="View from the Annapurna Circuit in Nepal" style="width:100%;border-radius:8px;margin:1.5rem 0;" />
<p style="font-size:0.875rem;color:#737373;margin-top:-1rem;margin-bottom:2rem;">The basin of an ancient lake / sea. Around Chame, Manang</p>

So here is the question: would you ever be brave enough to try remote work in Nepal?

Nepal does not yet have a dedicated digital nomad visa — you will enter on a standard tourist visa, which is straightforward and available on arrival. That alone puts it ahead of many countries that make visa processes a nightmare for location-independent workers.

If you do decide to go, [Nomad Atlas](https://nomadatlas.dev) will do its best to give you smart recommendations, help you make better travel decisions, and warn you about severe weather before it becomes your problem.
    `.trim(),
  },
  {
    slug: "why-bats",
    title: "Why Bats? A Scuba Diver's Path to Bioacoustics",
    date: "2026-03-25",
    excerpt:
        "From hunting in darkness underwater to building ultrasonic bat detectors in Vietnamese caves — the science of echolocation.",
    tags: ["Python", "DSP", "Bioacoustics", "Wildlife", "Science"],
    content: `
# Why Bats? A Scuba Diver's Path to Bioacoustics

<img src="/images/danang-bat-cave.jpg" alt="Bat habitat near Da Nang, Vietnam" style="width:100%;border-radius:8px;margin:1.5rem 0;" />
<p style="font-size:0.875rem;color:#737373;margin-top:-1rem;margin-bottom:2rem;">Near Da Nang, Vietnam — where this project began</p>

Bats and whales have almost nothing in common. One flies, one swims. One weighs grams, the other tons. Yet both have evolved the same extraordinary ability: **echolocation** — navigating and hunting by sound in complete darkness.

As a technical diver, I've spent time at depths where light doesn't reach. Past 50 meters, it gets dark. Past 300 meters, it's pitch black. Sperm whales dive over a thousand meters hunting giant squid — they need sonar to survive.

So why am I building bat detectors instead of whale call analyzers?

## Accessibility

Capturing whale songs requires specialized vessels, hydrophones, and access to deep ocean. Bats? All I need is an ultrasonic microphone and a cave. Caves in Southeast Asia are everywhere — and ultrasonic mics cost a few hundred dollars.

This project started in Da Nang, Vietnam, along the coast of the South China Sea. The species here are different from British or American bats, but the fundamentals of bat communication are universal.

## The Goal

I'm building an open-source platform with these features:

- **Real-time monitoring** of bat vocalizations
- **Real-time classification** of call types
- **Post-recording analysis** for research
- **Species identification** using ML

Tech stack: Python with Librosa, NumPy, Pandas, PyTorch. Runs on a Raspberry Pi 4 with 4GB RAM.

---

## Sound Signal Primer

### Wavelength, Amplitude, Frequency

The **wavelength** λ is the length of one cycle — the distance between two peaks.

The **amplitude** (sound pressure) A relates to perceived loudness. The power of a signal:

$$P = A^2$$

The **frequency** F is the rate of oscillation per second. Human hearing ranges from 20Hz to 20kHz (most people max out around 16-17kHz).

### Sampling Rate and Nyquist

The **sampling rate** $S_r$ is the number of samples taken per second. Higher $S_r$ = better quality, more information preserved.

The **Nyquist theorem** states that to accurately sample a signal, $S_r$ must be at least 2x the highest frequency:

$$S_r = max(F) \\times 2$$

$$F_n = \\frac{S_r}{2}$$

In practice, allow more headroom:

$$S_r = F_n \\times 2.5$$

For bat calls at 80kHz:

$$80 \\times 2.5 = 200kHz$$

### Bit Depth and File Size

**Bit depth** Q determines the range of values each sample can take. Common values: 16-bit or 32-bit.

File size calculation:

$$size(bytes) = \\frac{S_r \\times Q \\times C \\times T}{8}$$

Where C is channels and T is duration in seconds.

### The Sine Wave

Any real audio is a product of many sine waves combined. The formula:

$$A \\times sin(2\\pi ft + \\phi)$$

Where A is amplitude, f is frequency, t is time, and φ is phase.

### Quantization

Quantization maps analog values to discrete levels. With Q=8 bits, you get $2^8 = 256$ levels to track the wave movement.

### Doppler Shift

When source and listener move relative to each other, frequency appears to change:

$$\\Delta f = \\frac{(c + v)}{c} \\times f$$

Where c is speed of sound (m/s), v is source velocity (m/s), and f is emitted frequency.

---

## Signal Representations

- **Oscillograms**: time vs amplitude
- **Power spectra**: frequency vs time
- **Spectrograms**: time vs frequency, with amplitude as color intensity

## FFT: Time Domain to Frequency Domain

**Fast Fourier Transform** decomposes a signal into its component frequencies. A waveform on the time domain (x=time, y=amplitude) doesn't tell us what frequencies are present.

FFT transforms this to the frequency domain (x=frequency, y=amplitude), showing how much of each frequency exists in the signal. Critical for bat call analysis.

---

## How Bats Echolocate

From Jon Russ's *British Bat Calls*:

*"Bats produce and project ultrasonic sounds from their mouths or noses, then detect echoes from solid objects. A single call provides a snapshot; a series provides a movie — like a strobe light creating staggered images."*

Bats determine size, position, speed, surface texture, and form of objects in 3D space. No single signal is optimal for all purposes, so bats evolved multiple signal types.

### Call Types

**FM (Frequency Modulated)**: Broadband signals spanning wide frequency ranges. Example: sweeping from 20kHz to 100kHz. Useful in cluttered environments like forests where precise spatial resolution matters.

**CF (Constant Frequency)**: Narrowband, long-duration calls. Provide long-range detection in open environments.

**qCF (Quasi-Constant Frequency)**: Combines benefits of both. Bats in cluttered environments emphasize FM; those in open spaces emphasize qCF.

**Social calls** are more complex than echolocation calls — trills and harmonics comparable to bird song. Used for territory defense, attracting mates, distress signals, and mother-infant communication.

### Key Parameters

- **Peak frequency (FmaxE)**: Frequency of maximum energy — often the key species identifier
- **Duration**: 2.5ms to 70ms
- **Pulse repetition rate**: Varies by species (Natterer's bat is fast, noctule is slow)
- **Start/max frequency**: Can be difficult to measure depending on background noise

### Species Example: Greater Horseshoe Bat

- Inter-pulse interval: 90.2ms (range: 24.9–186.6)
- Call duration: 50.5ms (range: 16.3–73.8)
- Peak frequency: 81.3kHz (range: 77.8–83.8)
- Start frequency: 70.2kHz (range: 62.2–78.5)

Horseshoe bats use long-duration CF calls with ears tuned precisely to that frequency.

---

## Signal Processing Approaches

### Frequency Division (FD)

Real-time, cheap broadband monitoring. Uses zero-crossing circuits. For every 10 input waves, outputs 1 wave of the same total duration. Reduces 80kHz to 8kHz — audible in real-time.

**Use case**: GUI real-time monitoring

### Time Expansion (TE)

Most accurate reproduction. Stores signal digitally, replays at 10x slower speed. Preserves all characteristics but can't capture new sounds during playback.

**Use case**: Post-recording analysis

**Limitation**: During playback, detector isn't capturing new sounds.

My approach: **FD for live preview, TE for analysis**. Store originals in a folder while monitoring continues.

---

## What's Next

I'm training neural networks on spectrogram images for automated species classification. Dataset: my recordings from Vietnam plus public bat call libraries.

Coming up: FFT implementation details, spectrogram generation, and the neural network architecture.
    `.trim(),
  },
  {
    slug: "building-nomadatlas",
    title: "Building NomadAtlas: A Finance Dashboard for Digital Nomads",
    date: "2026-03-20",
    excerpt:
        "How I built a personal finance and lifestyle dashboard using React 19, Vite, and real-time APIs.",
    tags: ["React", "TypeScript", "Nomad Atlas", "Digital Nomad"],
    content: `
# Building NomadAtlas: A Finance Dashboard for Digital Nomads

As a digital nomad, I needed a single dashboard to track expenses, monitor budgets, and check local weather — all in one place. Existing tools were either too bloated or didn't fit my workflow. So I built NomadAtlas.

## The Tech Stack

- **React 19** with TypeScript for type safety
- **Vite** for fast development and builds
- **React Bootstrap** for UI components
- **Open-Meteo API** for weather data
- **BigDataCloud API** for reverse geocoding

## Key Features

### Expense Tracking
A modern table UI for adding, categorizing, and searching expenses. Each entry includes amount, category, date, and notes.

### Budget Management
Set monthly budgets and see remaining balance at a glance. Visual indicators show when you're approaching limits.

### Weather Dashboard
Real-time weather for your current location with sunrise/sunset times. Auto-detects your city via geolocation.

## Lessons Learned

1. **Keep it simple** — I resisted the urge to add every feature. The core use case drives the design.
2. **Offline-first matters** — When you're traveling, connectivity is unreliable. Local storage is your friend.
3. **Real-time APIs are cheap** — Open-Meteo and BigDataCloud are free for personal use.

Check it out at [nomadatlas.dev](https://nomadatlas.dev).
    `.trim(),
  },
  {
    slug: "ultrasonic-bat-detection",
    title: "Building a Real-Time Ultrasonic Bat Detector with Python",
    date: "2026-03-15",
    excerpt:
        "Capturing bat calls at 192kHz and using DSP techniques for species identification.",
    tags: ["Python", "DSP", "Audio", "Wildlife"],
    content: `
# Building a Real-Time Ultrasonic Bat Detector with Python

Bats echolocate at frequencies between 20kHz and 120kHz — well above human hearing. To detect them, you need specialized hardware and software. Here's how I built a real-time bat detector.

## Hardware Requirements

- **Ultrasonic microphone** capable of 192kHz sampling
- **High-quality ADC** with low noise floor
- **Raspberry Pi 4** or laptop for processing

## The DSP Pipeline

### 1. Audio Capture
Using PyAudio to capture audio at 192kHz. This requires a microphone that can handle ultrasonic frequencies.

\`\`\`python
import pyaudio
import numpy as np

RATE = 192000
CHUNK = 4096

p = pyaudio.PyAudio()
stream = p.open(format=pyaudio.paFloat32,
                channels=1,
                rate=RATE,
                input=True,
                frames_per_buffer=CHUNK)
\`\`\`

### 2. Heterodyne Mixing
Shift ultrasonic frequencies down to the audible range by mixing with a reference frequency.

### 3. Spectral Analysis
Use FFT to identify characteristic frequency patterns of different bat species.

## Species Identification

Different bat species have distinct call patterns:
- **Pipistrelle**: 45-50kHz, FM sweeps
- **Noctule**: 20-25kHz, lower frequencies
- **Horseshoe bats**: Constant frequency around 80kHz

## Next Steps

I'm building a neural network classifier using spectrograms to automate species ID. More on that in a future post.
    `.trim(),
  },
  {
    favorite: true,
    slug: "nepal-cons",
    title: "Beautiful, Brutal, Honest — The Other Side of Nepal",
    date: "2026-03-31",
    excerpt:
        "Nepal is stunning. It is also dangerous, polluted, heartbreaking, and boring after dark. Five reasons remote work in Nepal will never go mainstream.",
    tags: [
      "Digital Nomad",
      "Nomad Atlas",
      "React",
      "TypeScript",
      "Series",
      "Remote Work",
      "Nepal",
    ],
    content: `
# Beautiful, Brutal, Honest — The Other Side of Nepal

<img src="https://media.iangabaraev.com/media/nepal2-prayer-wheels.webp" alt="Colorful Buddhist prayer wheels with golden Sanskrit inscriptions at a Himalayan monastery" style="width:100%;border-radius:8px;margin:1.5rem 0;" />
<p style="font-size:0.875rem;color:#737373;margin-top:-1rem;margin-bottom:2rem;">Prayer wheels at a monastery along the Annapurna Circuit. The culture is extraordinary — but getting to it is an ordeal in itself.</p>

In the [previous article](/blog/nepal-the-digital-nomad-destination-nobody-talks-about), I talked about Nepal as a potential digital nomad work base. I listed a number of reasons why one could be tempted to give this mountainous, landlocked, beach-club-less nation — the opposite of what your typical DN wants — a chance to host them for a while.

It would be naive to think of myself as a purveyor of truth here. I did not discover Nepal, and I was definitely not the first person to see it in that light. There are good reasons — at least five — why remote work in Nepal will never work for the majority of digital nomads. So to set things straight and to give anyone planning to work remotely from Nepal the full picture, I am going to cover the other side of the story.

## A Side Story to Set This Up

As I was developing [Nomad Atlas](https://nomadatlas.dev), I spent quite a bit of time refining the weather card. That little component is a legitimate shapeshifter — it was everything from a "the 70s were calling" textbox to a sleek, glassy, "Apple is suing me" transparent beauty. Visuals aside, I spent even more time deciding what it should display. Beyond current temperature, sunset and sunrise — how do I make it genuinely useful for everyone?

AQI. Air Quality Index. That was the first answer.

That is also the first reason why Nepal — particularly Kathmandu — will struggle to keep an even remotely health-conscious nomad.

## Reason 1: The Air Will Wreck You

The air quality in Kathmandu is among the worst in Asia. We were there for three days total, in a relatively decent area. Even then, I was coughing up black residue for a week after returning to Kuala Lumpur. The air is visibly unhealthy — dark, sticky, acrid fumes that concentrate in the busier streets. They say lungs do not feel pain. Mine would like a word. If you are considering living in Kathmandu as a digital nomad, invest in a proper N95 mask — not a suggestion, a necessity.

<video src="https://media.iangabaraev.com/media/nepal2-trail-clip.mp4" autoplay loop muted playsinline style="width:100%;border-radius:8px;margin:1.5rem 0;"></video>
<p style="font-size:0.875rem;color:#737373;margin-top:-1rem;margin-bottom:2rem;">A view you will not find on any Instagram reel — because the people who make it here do not care about reels.</p>

## Reason 2: Nature Hits Back — Hard

Another metric that went into the weather component of [Nomad Atlas](https://nomadatlas.dev) was severe weather warnings. That is reason number two.

Nepal is prone to every natural cataclysm except those born at sea:

- **Massive earthquakes.** The country sits on a major fault line, and devastating quakes are not a matter of *if* but *when*.
- **Disastrous floods.** The September 2024 deluge killed at least 200 people and displaced tens of thousands. I was there the following week. They did an impressive job cleaning up, but the impact was impossible to miss.
- **Waterborne disease.** The first time you see a cold, pristine waterfall, you will naturally want to fill your bottle — especially after a long hike. That is exactly how you end up ruining your trip, or worse, in the ER. Bugs are everywhere: in the food, the water, the animals.

<video src="https://media.iangabaraev.com/media/nepal2-scenery-clip.mp4" autoplay loop muted playsinline style="width:100%;border-radius:8px;margin:1.5rem 0;"></video>
<p style="font-size:0.875rem;color:#737373;margin-top:-1rem;margin-bottom:2rem;">The scenery is world-class. What surrounds it — less so.</p>

## Reason 3: The Roads Are a Coin Flip

There are no plans yet to implement traffic monitoring in Nomad Atlas, but you would want it if you were in Nepal. The roads are every bit as sketchy as the weather. We took a total of five car rides during our stay. In that time, we narrowly avoided a rockfall, had a full-size bus materialize head-on through thick fog, got stuck in knee-deep mud at 10 PM high in the mountains in pitch darkness — and that was a normal week.

<video src="https://media.iangabaraev.com/media/nepal2-road-clip.mp4" autoplay loop muted playsinline style="width:100%;border-radius:8px;margin:1.5rem 0;"></video>
<p style="font-size:0.875rem;color:#737373;margin-top:-1rem;margin-bottom:2rem;">A typical stretch of road. This is the good part.</p>

## Reason 4: It Will Break Your Heart

Are you a sensitive soul? Do you not have a thick skin? Nepal will test you. It is one of the poorest nations in the world, and that comes with consequences. Violent crime is not unheard of. Petty theft is common. Education rates are low. Jobs — practically nonexistent outside the capital.

That, except for the crime, may not affect you directly. But you are going to witness child labor, forced marriages, and exploitation — regardless of where you are. Up in the mountains, you will see a scene that makes your blood boil: a Nepali porter carrying an entire studio apartment's worth of supplies on his back for 30 dollars a day, while his "customer" loiters behind with a cigarette, shouting encouragement.

<img src="https://media.iangabaraev.com/media/nepal2-trail-rest.webp" alt="Ian Gabaraev resting on a rustic wooden bench along the Annapurna Circuit trail" style="width:100%;border-radius:8px;margin:1.5rem 0;" />
<p style="font-size:0.875rem;color:#737373;margin-top:-1rem;margin-bottom:2rem;">Taking a breather on one of the trail's hand-built shelters. Walkie-talkie on the chest — essential gear, not a fashion choice.</p>

## Reason 5: After Dark, There Is Nothing

If you are a remote worker abroad, you know how the days go. By the end of the workday, you want to decompress. In Bangkok, you have a thousand options: hit a mall, eat Pad Thai on a rooftop, catch a fight at Lumpinee, go on a shopping spree in Sukhumvit. In Kathmandu at 8 PM — I do not think there is much for you. The nightlife in Nepal is effectively nonexistent compared to other digital nomad hotspots. You may try, but the stress of navigating the city after dark will quickly steal your enthusiasm. Pokhara has a slightly better scene — lakeside cafes, a handful of bars — but nothing approaching what you would find in a typical nomad destination.

However, in the [previous article](/blog/nepal-the-digital-nomad-destination-nobody-talks-about), I talked about the national reserve areas specifically. There, at night, there is zero to do.

<img src="https://media.iangabaraev.com/media/nepal2-ukulele-teahouse.webp" alt="Ian Gabaraev playing ukulele inside a Himalayan teahouse with mountain view through the window" style="width:100%;border-radius:8px;margin:1.5rem 0;" />
<p style="font-size:0.875rem;color:#737373;margin-top:-1rem;margin-bottom:2rem;">Evening entertainment in a teahouse: a borrowed ukulele and a dartboard. This is peak nightlife on the Circuit.</p>

Unless — and if this is the case, you can thank me later — you are into astrophotography.

## The One Exception: Bortle Zero Skies

The mountains of Nepal are Bortle Class 1 at best — functionally Bortle 0. There is no light pollution. None. The sky is a vault of stars so dense it does not look real. For anyone into deep-sky imaging, this is one of the last accessible gold mines on Earth.

<img src="https://media.iangabaraev.com/media/nepal2-orion-nebula.webp" alt="Deep-sky astrophotograph of the Orion Nebula and surrounding star field taken from the Himalayas" style="width:100%;border-radius:8px;margin:1.5rem 0;" />
<p style="font-size:0.875rem;color:#737373;margin-top:-1rem;margin-bottom:2rem;">The Orion Nebula region captured from the Annapurna Circuit. No tracking mount — just stacked handheld exposures and dark Himalayan skies.</p>

If astrophotography is your thing, I may have just sold you on the idea of going — instead of talking you out of it.

## The Verdict

Nepal is not a digital nomad destination — not in the way Bali, Lisbon, or Bangkok are. It has no digital nomad visa program, limited coworking infrastructure, unreliable roads, and a cost of living that is low for a reason. But it has something those places will never have: an unfiltered, unkempt, unapologetic honesty. Nepal does not try to sell itself to you. It just exists — and if you can handle what it is, working remotely from the Himalayas will give you something no coworking space ever will.

Read the first part of this series: [The Himalayas Called — And I Answered with a Laptop](/blog/nepal-pros).
    `.trim(),
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((post) => post.slug === slug);
}

export function getAllPosts(): BlogPost[] {
  return posts.sort((a, b) => {
    if (a.favorite && !b.favorite) return -1;
    if (!a.favorite && b.favorite) return 1;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}
