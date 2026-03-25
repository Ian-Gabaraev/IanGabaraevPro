export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  content: string;
}

export const posts: BlogPost[] = [
  {
    slug: 'the-tale-of-an-unknown-bat-part-1',
    title: 'The Tale of an Unknown Bat #1: Field Recording in Vietnamese Caves',
    date: '2026-03-25',
    excerpt: 'Hunting for bat calls with a 256kHz ultrasonic microphone — from neighborhood parks to pitch-black caves in the Marble Mountains.',
    tags: ['Python', 'DSP', 'Machine Learning', 'Bioacoustics', 'Wildlife', 'Series', 'Field Recording'],
    content: `
# The Tale of an Unknown Bat #1: Field Recording in Vietnamese Caves

*Part 2 of the BatSonar series*

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
    slug: 'the-bat-sonar-project-introduction',
    title: 'The Bat Sonar Project: Hearing What We Cannot',
    date: '2026-03-25',
    excerpt: 'Introducing an open-source ultrasonic bat detection system — where math, physics, programming, and machine learning collide.',
    tags: ['Python', 'DSP', 'Machine Learning', 'Wildlife', 'Series'],
    content: `
# The Bat Sonar Project: Hearing What We Cannot

<img src="/images/bats-echolocation.jpg" alt="Bats in flight using echolocation" style="width:100%;border-radius:8px;margin:1.5rem 0;" />

I've always had a complicated relationship with sound. As a light sleeper, I sometimes wished I had a knob to narrow my frequency range — blocking out loud music, car horns, fireworks, and all the nighttime noise that intrudes past bedtime.

Yet, at the same time, scuba diving and astrophotography introduced me to the beauty of unraveling the hidden, the invisible, the inaudible. When I got my hands on hardware that could record signals beyond our — let's face it, quite modest — human hearing range, I was hooked.

It didn't take long for another project to emerge. This one was truly challenging, sitting at the intersection of **math**, **physics**, **programming**, and **machine learning**.

**The Bat Sonar.**

---

## Why Bats?

<img src="/images/bats-cave.jpg" alt="Cave habitat for bats" style="width:100%;border-radius:8px;margin:1.5rem 0;" />

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
    slug: 'why-bats-a-scuba-divers-path-to-bioacoustics',
    title: 'Why Bats? A Scuba Diver\'s Path to Bioacoustics',
    date: '2026-03-25',
    excerpt: 'From hunting in darkness underwater to building ultrasonic bat detectors in Vietnamese caves — the science of echolocation.',
    tags: ['Python', 'DSP', 'Bioacoustics', 'Wildlife', 'Science'],
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

$$S_r = max(F) \times 2$$

$$F_n = \frac{S_r}{2}$$

In practice, allow more headroom:

$$S_r = F_n \times 2.5$$

For bat calls at 80kHz:

$$80 \times 2.5 = 200kHz$$

### Bit Depth and File Size

**Bit depth** Q determines the range of values each sample can take. Common values: 16-bit or 32-bit.

File size calculation:

$$size(bytes) = \frac{S_r \times Q \times C \times T}{8}$$

Where C is channels and T is duration in seconds.

### The Sine Wave

Any real audio is a product of many sine waves combined. The formula:

$$A \times sin(2\pi ft + \phi)$$

Where A is amplitude, f is frequency, t is time, and φ is phase.

### Quantization

Quantization maps analog values to discrete levels. With Q=8 bits, you get $2^8 = 256$ levels to track the wave movement.

### Doppler Shift

When source and listener move relative to each other, frequency appears to change:

$$\Delta f = \frac{(c + v)}{c} \times f$$

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
    slug: 'building-nomadatlas',
    title: 'Building NomadAtlas: A Finance Dashboard for Digital Nomads',
    date: '2026-03-20',
    excerpt: 'How I built a personal finance and lifestyle dashboard using React 19, Vite, and real-time APIs.',
    tags: ['React', 'TypeScript', 'Vite', 'Side Projects'],
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
    slug: 'ultrasonic-bat-detection',
    title: 'Building a Real-Time Ultrasonic Bat Detector with Python',
    date: '2026-03-15',
    excerpt: 'Capturing bat calls at 192kHz and using DSP techniques for species identification.',
    tags: ['Python', 'DSP', 'Audio', 'Wildlife'],
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
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find(post => post.slug === slug);
}

export function getAllPosts(): BlogPost[] {
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
