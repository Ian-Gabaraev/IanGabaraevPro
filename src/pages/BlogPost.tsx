import React, { useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import katex from "katex";
import "katex/dist/katex.min.css";
import { getPostBySlug } from "../data/posts";
import "./BlogPost.css";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;

  useEffect(() => {
    if (post) {
      document.title = `${post.title} | Ian Gabaraev`;
    }
    return () => {
      document.title = "Ian Gabaraev | Lead Software Engineer | Python, React, Cloud Expert";
    };
  }, [post]);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const renderMath = (tex: string, displayMode: boolean): string => {
    try {
      return katex.renderToString(tex, { displayMode, throwOnError: false });
    } catch {
      return tex;
    }
  };

  const renderContent = (content: string) => {
    const lines = content.split("\n");
    const elements: React.ReactElement[] = [];
    let inCodeBlock = false;
    let codeContent: string[] = [];
    let codeLanguage = "";

    lines.forEach((line, index) => {
      // Code blocks
      if (line.startsWith("```")) {
        if (!inCodeBlock) {
          inCodeBlock = true;
          codeLanguage = line.slice(3);
          codeContent = [];
        } else {
          inCodeBlock = false;
          elements.push(
            <pre key={index} className="code-block">
              <code className={codeLanguage}>{codeContent.join("\n")}</code>
            </pre>,
          );
        }
        return;
      }

      if (inCodeBlock) {
        codeContent.push(line);
        return;
      }

      // Block math ($$...$$)
      if (line.startsWith("$$") && line.endsWith("$$") && line.length > 4) {
        const math = line.slice(2, -2);
        elements.push(
          <div
            key={index}
            className="math-block"
            dangerouslySetInnerHTML={{ __html: renderMath(math, true) }}
          />,
        );
        return;
      }

      // HTML tags (img, p with style, etc.) - pass through
      if (line.trim().startsWith("<")) {
        elements.push(
          <div key={index} dangerouslySetInnerHTML={{ __html: line }} />,
        );
        return;
      }

      // Horizontal rule
      if (line.trim() === "---") {
        elements.push(<hr key={index} />);
        return;
      }

      // Headers
      if (line.startsWith("### ")) {
        elements.push(<h3 key={index}>{line.slice(4)}</h3>);
        return;
      }
      if (line.startsWith("## ")) {
        elements.push(<h2 key={index}>{line.slice(3)}</h2>);
        return;
      }
      if (line.startsWith("# ")) {
        elements.push(<h1 key={index}>{line.slice(2)}</h1>);
        return;
      }

      // List items
      if (line.startsWith("- ")) {
        elements.push(
          <li key={index}>{parseInlineMarkdown(line.slice(2))}</li>,
        );
        return;
      }

      // Numbered lists
      const numberedMatch = line.match(/^(\d+)\.\s(.+)/);
      if (numberedMatch) {
        elements.push(
          <li key={index}>{parseInlineMarkdown(numberedMatch[2])}</li>,
        );
        return;
      }

      // Empty lines
      if (line.trim() === "") {
        return;
      }

      // Regular paragraphs
      elements.push(<p key={index}>{parseInlineMarkdown(line)}</p>);
    });

    return elements;
  };

  const parseInlineMarkdown = (text: string) => {
    // Process inline math first ($...$) but not $$
    text = text.replace(/\$([^$]+)\$/g, (_, math) => renderMath(math, false));
    // Bold
    text = text.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
    // Inline code
    text = text.replace(/`([^`]+)`/g, "<code>$1</code>");
    // Links
    text = text.replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>',
    );

    return <span dangerouslySetInnerHTML={{ __html: text }} />;
  };

  return (
    <article className="blog-post-page">
      <Helmet>
        <meta name="description" content={post.excerpt} />
        <link
          rel="canonical"
          href={`https://iangabaraev.com/blog/${post.slug}`}
        />
        <meta property="og:title" content={`${post.title} | Ian Gabaraev`} />
        <meta property="og:description" content={post.excerpt} />
        <meta
          property="og:url"
          content={`https://iangabaraev.com/blog/${post.slug}`}
        />
        <meta property="og:type" content="article" />
        <meta property="og:image" content="https://iangabaraev.com/og-image.png" />
        <meta property="article:published_time" content={post.date} />
        <meta property="article:author" content="Ian Gabaraev" />
        {post.tags.map((tag) => (
          <meta key={tag} property="article:tag" content={tag} />
        ))}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            description: post.excerpt,
            datePublished: post.date,
            dateModified: post.date,
            author: {
              "@type": "Person",
              name: "Ian Gabaraev",
              url: "https://iangabaraev.com",
            },
            publisher: { "@type": "Person", name: "Ian Gabaraev" },
            mainEntityOfPage: `https://iangabaraev.com/blog/${post.slug}`,
          })}
        </script>
      </Helmet>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link to="/blog" className="back-link">
            <ArrowLeft size={16} />
            Back to Blog
          </Link>

          <header className="post-header">
            <time className="post-meta">{formatDate(post.date)}</time>
            <h1>{post.title}</h1>
            <div className="post-tags">
              {post.tags.map((tag) => (
                <span key={tag} className="post-tag">
                  {tag}
                </span>
              ))}
            </div>
          </header>

          <div className="post-content">{renderContent(post.content)}</div>
        </motion.div>
      </div>
    </article>
  );
};

export default BlogPost;
