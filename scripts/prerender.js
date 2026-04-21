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
  ...posts.filter((post) => !post.hidden).map((post) => ({
    path: `/blog/${post.slug}`,
    title: `${post.title} | Ian Gabaraev`,
    description: post.excerpt,
    og: { type: "article" },
  })),
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

// --- JSON-LD structured data ---

const AUTHOR_LD = {
  "@type": "Person",
  name: "Ian Gabaraev",
  url: BASE_URL,
  jobTitle: "Lead Software Development Engineer",
  sameAs: [
    "https://www.linkedin.com/in/iangabaraev/",
    "https://github.com/iangabaraev",
  ],
};

function buildJsonLd(route) {
  const post = posts.find((p) => route.path === `/blog/${p.slug}`);
  if (post) {
    return {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.excerpt,
      datePublished: post.date,
      dateModified: post.date,
      author: AUTHOR_LD,
      publisher: { "@type": "Person", name: "Ian Gabaraev" },
      mainEntityOfPage: { "@type": "WebPage", "@id": `${BASE_URL}${route.path}/` },
      url: `${BASE_URL}${route.path}/`,
      keywords: post.tags.join(", "),
    };
  }

  const guide = guides.find((g) => route.path === `/learn/${g.slug}`);
  if (guide) {
    return {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: guide.title,
      description: guide.excerpt,
      author: AUTHOR_LD,
      mainEntityOfPage: { "@type": "WebPage", "@id": `${BASE_URL}${route.path}/` },
      url: `${BASE_URL}${route.path}/`,
    };
  }

  if (route.path === "/" || route.path === "") {
    return {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Ian Gabaraev",
      url: BASE_URL,
      author: AUTHOR_LD,
      description: route.description,
    };
  }

  return null;
}

// --- Generate HTML with meta tags + body content ---

function generateHTML(route) {
  let html = template;

  html = html.replace(/<title[^>]*>[^<]*<\/title>/, `<title>${route.title}</title>`);
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
    `<link rel="canonical" href="${BASE_URL}${route.path}/"`,
  );
  html = html.replace(
    /<meta property="og:url" content="[^"]*"/,
    `<meta property="og:url" content="${BASE_URL}${route.path}/"`,
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
    /<meta name="twitter:title" content="[^"]*"/,
    `<meta name="twitter:title" content="${route.title}"`,
  );
  html = html.replace(
    /<meta name="twitter:description" content="[^"]*"/,
    `<meta name="twitter:description" content="${route.description}"`,
  );
  html = html.replace(
    /<meta name="twitter:url" content="[^"]*"/,
    `<meta name="twitter:url" content="${BASE_URL}${route.path}/"`,
  );

  // Inject JSON-LD structured data
  const jsonLd = buildJsonLd(route);
  if (jsonLd) {
    html = html.replace(
      '</head>',
      `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>\n</head>`,
    );
  }

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

// --- Generate RSS feed ---

const sortedPosts = [...posts].filter((p) => !p.hidden).sort(
  (a, b) => new Date(b.date) - new Date(a.date),
);

const rssItems = sortedPosts
  .map(
    (post) =>
      `    <item>
      <title>${escapeHtml(post.title)}</title>
      <link>${BASE_URL}/blog/${post.slug}/</link>
      <guid isPermaLink="true">${BASE_URL}/blog/${post.slug}/</guid>
      <description>${escapeHtml(post.excerpt)}</description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <author>iandevhkt@gmail.com (Ian Gabaraev)</author>
      ${post.tags.map((t) => `<category>${escapeHtml(t)}</category>`).join("\n      ")}
    </item>`,
  )
  .join("\n");

const rssFeed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Ian Gabaraev — Blog</title>
    <link>${BASE_URL}/blog</link>
    <description>Articles by Ian Gabaraev on software engineering, Django, Python, bioacoustics, DSP, machine learning, and technical deep dives.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${BASE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${BASE_URL}/favicon-192.png</url>
      <title>Ian Gabaraev — Blog</title>
      <link>${BASE_URL}/blog</link>
    </image>
${rssItems}
  </channel>
</rss>`;

writeFileSync(join(DIST, "feed.xml"), rssFeed);
console.log("  ✓ /feed.xml (RSS feed)");

