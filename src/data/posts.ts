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
    slug: 'nepal-the-digital-nomad-destination-nobody-talks-about',
    title: 'The Himalayas Called — And I Answered with a Laptop',
    date: '2026-03-27',
    excerpt: 'Nepal is gorgeous, affordable, connected, and serene. Why almost nobody considers it a remote work destination — and why they should.',
    tags: ['Digital Nomad', 'Nomad Atlas', 'React', 'TypeScript'],
    content: `
# The Himalayas Called — And I Answered with a Laptop

<img src="/images/nepal/nepal-3.webp" alt="Panoramic view of the Himalayan mountains in Nepal" style="width:100%;border-radius:8px;margin:1.5rem 0;" />
<p style="font-size:0.875rem;color:#737373;margin-top:-1rem;margin-bottom:2rem;">The Annapurna Circuit, Nepal — probably not your typical coworking space</p>

Digital nomads tend to follow the same overused, over-Instagrammed map as millions of others: Europe, Asia, and maybe Africa if they are feeling adventurous. Some might go to the Middle East, only to decide the culture is "too hard" to adapt to.

That is only natural. Most decisions we make as digital nomads are second-hand. When you work remotely, keep fixed hours, and live by deadlines, you want to land and get straight to work. You cannot fully mix adventure and work on a whim. And if you think you can, you either have too much free time on your hands or you need to revisit your definition of adventure.

<img src="/images/nepal/nepal-1.webp" alt="Trekking trail in the Annapurna region of Nepal" style="width:100%;border-radius:8px;margin:1.5rem 0;" />

One of the foundational ideas behind [Nomad Atlas](https://nomadatlas.dev) is helping you make safe, calculated travel decisions for yourself. The app does not simply look at what other digital nomads are doing. It looks at how you have lived your nomad life and how you felt along the way. So if you visited Rwanda and felt good there, do not be surprised if one day [Nomad Atlas](https://nomadatlas.dev) sends you a notification: "Hey, your stay in Phuket is coming to an end. How about flying to Rwanda?"

Africa, in particular, is a special place for digital nomads. It deserves more thought before you pull the trigger. And do not get me wrong: if you approach it responsibly, it could easily become your home base.

Today, though, I want to talk about another place. A place many people visit, but almost no one seriously considers as a digital nomad hub. A country that is both challenging and deeply rewarding. It may frighten you or make you fall in love, but it will not leave you indifferent.

## Buying Columbia Gear in Kuala Lumpur

In October 2024, my girlfriend and I went to a mall in Kuala Lumpur looking for Columbia gear. We found the store on the ground floor and left an hour later with large shopping bags. We each bought a new pair of hiking boots and a puffer jacket. The rest of the gear, we decided, could wait until arrival.

November came fast. There were reports of devastating floods in our destination, and we hesitated. Neither of us had ever been there before. But the flights were already booked, so after a sleepless night, we drove to KLIA with our backpacks full of gear.

<img src="/images/nepal/nepal-2.webp" alt="Mountain village along the Annapurna Circuit trek" style="width:100%;border-radius:8px;margin:1.5rem 0;" />

We landed in Kathmandu on a perfect, clear, sunny day. The next morning, we took a grueling 12-hour drive to Besisahar, followed by another two-hour bumpy ride to the nearest village on the Annapurna Circuit route.

Over the course of 25 days, I did not see a single digital nomad there.

I did, however, see potential.

## Why Nepal Works for Remote Work

<img src="/images/nepal/nepal-4.webp" alt="Teahouse accommodation in the Himalayan mountains" style="width:100%;border-radius:8px;margin:1.5rem 0;" />

**It is gorgeous.** The nature is mind-blowing, and no matter where you are, you have dozens of hiking options.

**It is affordable.** In many places, teahouses provide free accommodation as long as you order food. Prices per night can range from $5 to $50. A full three-course meal typically costs between $5 and $15.

**There is internet access.** Even teahouses offer Wi-Fi, and 5G was available in most places except the deeper valleys. It was fast enough to browse Instagram and upload stories. More importantly, it is fast enough to check your Jira board, answer Slack messages, and keep working remotely.

<img src="/images/nepal/nepal-5.webp" alt="Scenic mountain landscape along the trekking route in Nepal" style="width:100%;border-radius:8px;margin:1.5rem 0;" />

**It is serene.** And that matters. One of the biggest problems with popular digital nomad destinations is exactly that: they are too popular. You end up competing for housing, dealing with noise, and trying to take your daily stand-up call while someone nearby is throwing a party. In the Himalayas, there is none of that. It is secluded, quiet, and almost completely free of distractions.

## Would You Be Brave Enough?

<img src="/images/nepal/nepal-6.webp" alt="View from the Annapurna Circuit in Nepal" style="width:100%;border-radius:8px;margin:1.5rem 0;" />

So here is the question: would you ever be brave enough to give it a chance?

Because if you do, [Nomad Atlas](https://nomadatlas.dev) will do its best to give you smart recommendations, help you make better travel decisions, and warn you about severe weather before it becomes your problem.
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
    slug: 'building-nomadatlas',
    title: 'Building NomadAtlas: A Finance Dashboard for Digital Nomads',
    date: '2026-03-20',
    excerpt: 'How I built a personal finance and lifestyle dashboard using React 19, Vite, and real-time APIs.',
    tags: ['React', 'TypeScript', 'Nomad Atlas', 'Digital Nomad'],
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
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find(post => post.slug === slug);
}

export function getAllPosts(): BlogPost[] {
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
