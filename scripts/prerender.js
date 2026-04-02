/**
 * Post-build prerender script.
 * Reads dist/index.html and generates route-specific HTML files
 * with correct <title>, <meta>, structured data, AND body content
 * so Google can index them on first crawl without executing JS.
 */
import { readFileSync, writeFileSync, mkdirSync, unlinkSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { buildSync } from "esbuild";

const ROOT = join(import.meta.dirname, "..");
const DIST = join(ROOT, "dist");
const BASE_URL = "https://iangabaraev.com";

// --- Compile and import content metadata at build time ---
const tmpPostsFile = join(DIST, "__posts_tmp.mjs");
buildSync({
  entryPoints: [join(ROOT, "src/data/posts.ts")],
  bundle: true,
  format: "esm",
  outfile: tmpPostsFile,
  platform: "node",
});
const { posts } = await import(pathToFileURL(tmpPostsFile).href);
unlinkSync(tmpPostsFile);

const tmpGuidesFile = join(DIST, "__guides_tmp.mjs");
buildSync({
  entryPoints: [join(ROOT, "src/data/guides.ts")],
  bundle: true,
  format: "esm",
  outfile: tmpGuidesFile,
  platform: "node",
});
const { guides } = await import(pathToFileURL(tmpGuidesFile).href);
unlinkSync(tmpGuidesFile);

const template = readFileSync(join(DIST, "index.html"), "utf-8");

const guideMarkdownBySlug = new Map(
  guides.map((guide) => {
    const fileName = guide.markdownPath.replace(/^\//, "");
    const markdown = readFileSync(join(DIST, fileName), "utf-8");
    return [guide.slug, markdown];
  }),
);

const guideRoutes = guides.map((guide) => ({
  path: `/learn/${guide.slug}`,
  title: `${guide.title} | Ian Gabaraev`,
  description: guide.excerpt,
  og: { type: "article" },
}));

const routes = [
  {
    path: "/blog",
    title: "Blog | Ian Gabaraev — Software Engineering, DSP & Machine Learning",
    description:
      "Articles by Ian Gabaraev on software engineering, full stack development, bioacoustics, DSP, machine learning, React, Python, and cloud architecture.",
    og: { type: "website" },
  },
  {
    path: "/quiz",
    title: "Quiz | Test Your Frontend & AWS Skills | Ian Gabaraev",
    description:
      "Free interactive quizzes on JavaScript, TypeScript, React, Node.js, CSS, and AWS. Test your frontend development and cloud skills with 200+ questions.",
    og: { type: "website" },
  },
  {
    path: "/learn",
    title: "Learn | Ian Gabaraev",
    description:
      "Learning guides on JavaScript, TypeScript, React, Node.js, and practical full stack engineering topics.",
    og: { type: "website" },
  },
  ...guideRoutes,
  {
    path: "/blog/nepal-the-digital-nomad-destination-nobody-talks-about",
    title: "The Himalayas Called — And I Answered with a Laptop | Ian Gabaraev",
    description:
      "Nepal is gorgeous, affordable, connected, and serene. Why almost nobody considers it a remote work destination — and why they should.",
    og: { type: "article" },
  },
  {
    path: "/blog/building-nomadatlas",
    title:
      "Building NomadAtlas: A Finance Dashboard for Digital Nomads | Ian Gabaraev",
    description:
      "How I built a personal finance and lifestyle dashboard using React 19, Vite, and real-time APIs.",
    og: { type: "article" },
  },
  {
    path: "/blog/why-bats-a-scuba-divers-path-to-bioacoustics",
    title: "Why Bats? A Scuba Diver's Path to Bioacoustics | Ian Gabaraev",
    description:
      "From hunting in darkness underwater to building ultrasonic bat detectors in Vietnamese caves — the science of echolocation.",
    og: { type: "article" },
  },
  {
    path: "/blog/ultrasonic-bat-detection",
    title:
      "Building a Real-Time Ultrasonic Bat Detector with Python | Ian Gabaraev",
    description:
      "Capturing bat calls at 192kHz and using DSP techniques for species identification.",
    og: { type: "article" },
  },
];

// --- Minimal markdown → HTML for crawler-visible content ---

function escapeHtml(s) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function inlineFormat(s) {
  s = s.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  s = s.replace(/\*([^*]+)\*/g, "<em>$1</em>");
  s = s.replace(/`([^`]+)`/g, "<code>$1</code>");
  s = s.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
  return s;
}

function mdToHtml(md) {
  const lines = md.split("\n");
  const out = [];
  let inCode = false;

  for (const line of lines) {
    if (line.startsWith("```")) {
      if (!inCode) {
        out.push("<pre><code>");
        inCode = true;
      } else {
        out.push("</code></pre>");
        inCode = false;
      }
      continue;
    }
    if (inCode) {
      out.push(escapeHtml(line));
      continue;
    }
    if (line.trim().startsWith("<")) {
      out.push(line);
      continue;
    }
    if (line.trim() === "---") {
      out.push("<hr/>");
      continue;
    }
    if (line.startsWith("$$") && line.endsWith("$$") && line.length > 4) {
      out.push(`<p>${escapeHtml(line)}</p>`);
      continue;
    }
    const hMatch = line.match(/^(#{1,6})\s+(.*)/);
    if (hMatch) {
      const lvl = hMatch[1].length;
      out.push(`<h${lvl}>${inlineFormat(hMatch[2])}</h${lvl}>`);
      continue;
    }
    if (line.startsWith("- ")) {
      out.push(`<li>${inlineFormat(line.slice(2))}</li>`);
      continue;
    }
    if (line.trim() === "") continue;
    out.push(`<p>${inlineFormat(line)}</p>`);
  }

  return out.join("\n");
}

// --- Build static body content for each route ---

function getBodyContent(route) {
  if (route.path === "/blog") {
    const sorted = [...posts].sort(
      (a, b) => new Date(b.date) - new Date(a.date),
    );
    return `<main><h1>Blog</h1><p>${escapeHtml(route.description)}</p>${sorted
      .map(
        (p) =>
          `<article><h2><a href="/blog/${p.slug}">${escapeHtml(p.title)}</a></h2>` +
          `<time datetime="${p.date}">${p.date}</time>` +
          `<p>${escapeHtml(p.excerpt)}</p></article>`,
      )
      .join("\n")}</main>`;
  }

  if (route.path === "/quiz") {
    return `<main><h1>Quiz</h1><p>${escapeHtml(route.description)}</p></main>`;
  }

  if (route.path === "/learn") {
    const sorted = [...guides].sort(
      (a, b) => new Date(b.date) - new Date(a.date),
    );
    return `<main><h1>Learn</h1><p>${escapeHtml(route.description)}</p>${sorted
      .map(
        (guide) =>
          `<article><h2><a href="/learn/${guide.slug}">${escapeHtml(guide.title)}</a></h2>` +
          `<time datetime="${guide.date}">${guide.date}</time>` +
          `<p>${escapeHtml(guide.excerpt)}</p></article>`,
      )
      .join("\n")}</main>`;
  }

  const guide = guides.find((g) => `/learn/${g.slug}` === route.path);
  if (guide) {
    const markdown = guideMarkdownBySlug.get(guide.slug) || "";
    return (
      `<main><article><h1>${escapeHtml(guide.title)}</h1>` +
      `<time datetime="${guide.date}">${guide.date}</time>` +
      `${mdToHtml(markdown)}</article></main>`
    );
  }

  const post = posts.find((p) => `/blog/${p.slug}` === route.path);
  if (post) {
    return (
      `<main><article><h1>${escapeHtml(post.title)}</h1>` +
      `<time datetime="${post.date}">${post.date}</time>` +
      `${mdToHtml(post.content)}</article></main>`
    );
  }

  return "";
}

// --- Generate HTML with meta tags + body content ---

function generateHTML(route) {
  let html = template;

  html = html.replace(/<title>[^<]*<\/title>/, `<title>${route.title}</title>`);
  html = html.replace(
    /<meta name="title" content="[^"]*"/,
    `<meta name="title" content="${route.title}"`,
  );
  html = html.replace(
    /<meta name="description" content="[^"]*"/,
    `<meta name="description" content="${route.description}"`,
  );
  html = html.replace(
    /<link rel="canonical" href="[^"]*"/,
    `<link rel="canonical" href="${BASE_URL}${route.path}"`,
  );
  html = html.replace(
    /<meta property="og:url" content="[^"]*"/,
    `<meta property="og:url" content="${BASE_URL}${route.path}"`,
  );
  html = html.replace(
    /<meta property="og:title" content="[^"]*"/,
    `<meta property="og:title" content="${route.title}"`,
  );
  html = html.replace(
    /<meta property="og:description" content="[^"]*"/,
    `<meta property="og:description" content="${route.description}"`,
  );
  html = html.replace(
    /<meta property="og:type" content="[^"]*"/,
    `<meta property="og:type" content="${route.og.type}"`,
  );
  html = html.replace(
    /<meta property="twitter:title" content="[^"]*"/,
    `<meta property="twitter:title" content="${route.title}"`,
  );
  html = html.replace(
    /<meta property="twitter:description" content="[^"]*"/,
    `<meta property="twitter:description" content="${route.description}"`,
  );
  html = html.replace(
    /<meta property="twitter:url" content="[^"]*"/,
    `<meta property="twitter:url" content="${BASE_URL}${route.path}"`,
  );

  // Inject body content into <div id="root">
  const body = getBodyContent(route);
  if (body) {
    html = html.replace(
      '<div id="root"></div>',
      `<div id="root">${body}</div>`,
    );
  }

  return html;
}

for (const route of routes) {
  const html = generateHTML(route);
  const outDir = join(DIST, route.path);
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "index.html"), html);
  console.log(`  ✓ ${route.path}`);
}

console.log(`\nPrerendered ${routes.length} routes with body content.`);
