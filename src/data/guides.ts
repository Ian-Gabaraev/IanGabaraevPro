export interface Guide {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  markdownPath: string;
  featured?: boolean;
}

export const guides: Guide[] = [
  {
    slug: "full-stack-interview-prep",
    title: "Frontend Interview Prep: JavaScript & TypeScript",
    date: "2026-03-29",
    excerpt:
      "A comprehensive JavaScript, TypeScript, React, and Node.js guide for interview prep with practical gotchas and examples.",
    tags: ["JavaScript", "TypeScript", "React", "Node.js", "Interview Prep"],
    markdownPath: "/learn-full-stack.md",
    featured: true,
  },
];

export const getAllGuides = (): Guide[] => {
  return [...guides].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
};

export const getGuideBySlug = (slug: string): Guide | undefined => {
  return guides.find((guide) => guide.slug === slug);
};
