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
    slug: "aws-dva-c02",
    title: "AWS DVA-C02 Developer Associate Exam Guide",
    date: "2026-04-20",
    excerpt:
      "Complete study notes for the AWS Developer Associate certification covering compute, storage, databases, serverless, CI/CD, monitoring, security, and 100+ self-exam questions.",
    tags: ["AWS", "Cloud", "Certification", "Serverless", "DevOps"],
    markdownPath: "/aws-dva-c02.md",
    featured: true,
  },
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
