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
