import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import { getGuideBySlug } from "../data/guides";
import { renderMarkdownContent } from "../utils/renderMarkdown";
import "./LearnGuide.css";

const LearnGuide = () => {
  const { slug } = useParams<{ slug: string }>();
  const guide = slug ? getGuideBySlug(slug) : undefined;

  useEffect(() => {
    if (guide) {
      document.title = `${guide.title} | Ian Gabaraev`;
    }
    return () => {
      document.title = "Ian Gabaraev | Lead Software Engineer | Python, React, Cloud Expert";
    };
  }, [guide]);

  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!guide) {
      return;
    }

    let isMounted = true;

    const loadContent = async () => {
      try {
        const response = await fetch(guide.markdownPath);
        if (!response.ok) {
          throw new Error("Failed to load guide content.");
        }

        const markdown = await response.text();
        if (isMounted) {
          setContent(markdown);
        }
      } catch {
        if (isMounted) {
          setError(
            "Could not load this guide right now. Please try again in a moment.",
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    void loadContent();

    return () => {
      isMounted = false;
    };
  }, [guide]);

  const renderedContent = useMemo(() => {
    if (!content) {
      return null;
    }

    return renderMarkdownContent(content);
  }, [content]);

  if (!guide) {
    return <Navigate to="/learn" replace />;
  }

  return (
    <article className="learn-guide-page">
      <Helmet>
        <meta name="description" content={guide.excerpt} />
        <meta name="keywords" content={guide.tags.join(", ")} />
        <link
          rel="canonical"
          href={`https://iangabaraev.com/learn/${guide.slug}/`}
        />
        <meta property="og:title" content={`${guide.title} | Ian Gabaraev`} />
        <meta property="og:description" content={guide.excerpt} />
        <meta
          property="og:url"
          content={`https://iangabaraev.com/learn/${guide.slug}/`}
        />
        <meta property="og:type" content="article" />
        <meta property="og:image" content="https://iangabaraev.com/og-image.png" />
        <meta property="article:published_time" content={guide.date} />
        <meta property="article:author" content="Ian Gabaraev" />
        {guide.tags.map((tag) => (
          <meta key={tag} property="article:tag" content={tag} />
        ))}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content={`${guide.title} | Ian Gabaraev`}
        />
        <meta name="twitter:description" content={guide.excerpt} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TechArticle",
            headline: guide.title,
            description: guide.excerpt,
            datePublished: guide.date,
            dateModified: guide.date,
            keywords: guide.tags.join(", "),
            author: {
              "@type": "Person",
              name: "Ian Gabaraev",
              url: "https://iangabaraev.com",
            },
            publisher: { "@type": "Person", name: "Ian Gabaraev" },
            mainEntityOfPage: `https://iangabaraev.com/learn/${guide.slug}`,
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://iangabaraev.com",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Learn",
                item: "https://iangabaraev.com/learn",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: guide.title,
                item: `https://iangabaraev.com/learn/${guide.slug}`,
              },
            ],
          })}
        </script>
      </Helmet>

      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link to="/learn" className="back-link">
            <ArrowLeft size={16} />
            Back to Learn
          </Link>

          <header className="learn-guide-header">
            <time className="learn-guide-meta">
              {new Date(guide.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            <h1>{guide.title}</h1>
            <div className="learn-guide-tags">
              {guide.tags.map((tag) => (
                <span key={tag} className="learn-guide-tag">
                  {tag}
                </span>
              ))}
            </div>
          </header>

          <div className="learn-guide-content">
            {isLoading && <p>Loading guide...</p>}
            {error && <p>{error}</p>}
            {!isLoading && !error && renderedContent}
          </div>
        </motion.div>
      </div>
    </article>
  );
};

export default LearnGuide;
