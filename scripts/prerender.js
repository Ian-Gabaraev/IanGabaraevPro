/**
 * Post-build prerender script.
 * Reads dist/index.html and generates route-specific HTML files
 * with correct <title>, <meta>, and structured data so Google
 * can index them on first crawl without executing JS.
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';

const DIST = join(import.meta.dirname, '..', 'dist');
const BASE_URL = 'https://iangabaraev.com';

const template = readFileSync(join(DIST, 'index.html'), 'utf-8');

const routes = [
  {
    path: '/blog',
    title: 'Blog | Ian Gabaraev — Software Engineering, DSP & Machine Learning',
    description: 'Articles by Ian Gabaraev on software engineering, full stack development, bioacoustics, DSP, machine learning, React, Python, and cloud architecture.',
    og: { type: 'website' },
  },
  {
    path: '/quiz',
    title: 'Quiz | Test Your Frontend & AWS Skills | Ian Gabaraev',
    description: 'Free interactive quizzes on JavaScript, TypeScript, React, Node.js, CSS, and AWS. Test your frontend development and cloud skills with 200+ questions.',
    og: { type: 'website' },
  },
  {
    path: '/blog/building-nomadatlas',
    title: 'Building NomadAtlas: A Finance Dashboard for Digital Nomads | Ian Gabaraev',
    description: 'How I built a personal finance and lifestyle dashboard using React 19, Vite, and real-time APIs.',
    og: { type: 'article' },
  },
  {
    path: '/blog/why-bats-a-scuba-divers-path-to-bioacoustics',
    title: "Why Bats? A Scuba Diver's Path to Bioacoustics | Ian Gabaraev",
    description: 'From hunting in darkness underwater to building ultrasonic bat detectors in Vietnamese caves — the science of echolocation.',
    og: { type: 'article' },
  },
  {
    path: '/blog/ultrasonic-bat-detection',
    title: 'Building a Real-Time Ultrasonic Bat Detector with Python | Ian Gabaraev',
    description: 'Capturing bat calls at 192kHz and using DSP techniques for species identification.',
    og: { type: 'article' },
  },
];

function generateHTML(route) {
  let html = template;

  // Replace <title>
  html = html.replace(
    /<title>[^<]*<\/title>/,
    `<title>${route.title}</title>`
  );

  // Replace meta name="title"
  html = html.replace(
    /<meta name="title" content="[^"]*"/,
    `<meta name="title" content="${route.title}"`
  );

  // Replace meta name="description"
  html = html.replace(
    /<meta name="description" content="[^"]*"/,
    `<meta name="description" content="${route.description}"`
  );

  // Replace canonical URL
  html = html.replace(
    /<link rel="canonical" href="[^"]*"/,
    `<link rel="canonical" href="${BASE_URL}${route.path}"`
  );

  // Replace og:url
  html = html.replace(
    /<meta property="og:url" content="[^"]*"/,
    `<meta property="og:url" content="${BASE_URL}${route.path}"`
  );

  // Replace og:title
  html = html.replace(
    /<meta property="og:title" content="[^"]*"/,
    `<meta property="og:title" content="${route.title}"`
  );

  // Replace og:description
  html = html.replace(
    /<meta property="og:description" content="[^"]*"/,
    `<meta property="og:description" content="${route.description}"`
  );

  // Replace og:type
  html = html.replace(
    /<meta property="og:type" content="[^"]*"/,
    `<meta property="og:type" content="${route.og.type}"`
  );

  // Replace twitter:title
  html = html.replace(
    /<meta property="twitter:title" content="[^"]*"/,
    `<meta property="twitter:title" content="${route.title}"`
  );

  // Replace twitter:description
  html = html.replace(
    /<meta property="twitter:description" content="[^"]*"/,
    `<meta property="twitter:description" content="${route.description}"`
  );

  // Replace twitter:url
  html = html.replace(
    /<meta property="twitter:url" content="[^"]*"/,
    `<meta property="twitter:url" content="${BASE_URL}${route.path}"`
  );

  return html;
}

for (const route of routes) {
  const html = generateHTML(route);
  const outDir = join(DIST, route.path);
  mkdirSync(outDir, { recursive: true });
  const outFile = join(outDir, 'index.html');
  writeFileSync(outFile, html);
  console.log(`  ✓ ${route.path}`);
}

console.log(`\nPrerendered ${routes.length} routes.`);
