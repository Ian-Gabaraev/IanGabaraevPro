import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { getPostBySlug } from '../data/posts';
import './BlogPost.css';

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Simple markdown-to-HTML conversion for basic formatting
  const renderContent = (content: string) => {
    const lines = content.split('\n');
    const elements: React.ReactElement[] = [];
    let inCodeBlock = false;
    let codeContent: string[] = [];
    let codeLanguage = '';

    lines.forEach((line, index) => {
      // Code blocks
      if (line.startsWith('```')) {
        if (!inCodeBlock) {
          inCodeBlock = true;
          codeLanguage = line.slice(3);
          codeContent = [];
        } else {
          inCodeBlock = false;
          elements.push(
            <pre key={index} className="code-block">
              <code className={codeLanguage}>{codeContent.join('\n')}</code>
            </pre>
          );
        }
        return;
      }

      if (inCodeBlock) {
        codeContent.push(line);
        return;
      }

      // Headers
      if (line.startsWith('### ')) {
        elements.push(<h3 key={index}>{line.slice(4)}</h3>);
        return;
      }
      if (line.startsWith('## ')) {
        elements.push(<h2 key={index}>{line.slice(3)}</h2>);
        return;
      }
      if (line.startsWith('# ')) {
        elements.push(<h1 key={index}>{line.slice(2)}</h1>);
        return;
      }

      // List items
      if (line.startsWith('- ')) {
        elements.push(<li key={index}>{parseInlineMarkdown(line.slice(2))}</li>);
        return;
      }

      // Numbered lists
      const numberedMatch = line.match(/^(\d+)\.\s(.+)/);
      if (numberedMatch) {
        elements.push(<li key={index}>{parseInlineMarkdown(numberedMatch[2])}</li>);
        return;
      }

      // Empty lines
      if (line.trim() === '') {
        return;
      }

      // Regular paragraphs
      elements.push(<p key={index}>{parseInlineMarkdown(line)}</p>);
    });

    return elements;
  };

  const parseInlineMarkdown = (text: string) => {
    // Bold
    text = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    // Inline code
    text = text.replace(/`([^`]+)`/g, '<code>$1</code>');
    // Links
    text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
    
    return <span dangerouslySetInnerHTML={{ __html: text }} />;
  };

  return (
    <article className="blog-post-page">
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
                <span key={tag} className="post-tag">{tag}</span>
              ))}
            </div>
          </header>

          <div className="post-content">
            {renderContent(post.content)}
          </div>
        </motion.div>
      </div>
    </article>
  );
};

export default BlogPost;
