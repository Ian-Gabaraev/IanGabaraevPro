import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { getAllPosts } from '../data/posts';
import './Blog.css';

const Blog = () => {
  const posts = getAllPosts();
  const [activeTags, setActiveTags] = useState<string[]>([]);

  // Extract all unique tags from posts
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    posts.forEach(post => post.tags.forEach(tag => tagSet.add(tag)));
    return Array.from(tagSet).sort();
  }, [posts]);

  // Filter posts based on active tags
  const filteredPosts = useMemo(() => {
    if (activeTags.length === 0) return posts;
    return posts.filter(post => 
      activeTags.some(tag => post.tags.includes(tag))
    );
  }, [posts, activeTags]);

  const toggleTag = (tag: string) => {
    setActiveTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const clearFilters = () => setActiveTags([]);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <section className="blog-page">
      <Helmet>
        <title>Blog | Ian Gabaraev — Software Engineering, DSP & Machine Learning</title>
        <meta name="description" content="Articles by Ian Gabaraev on software engineering, full stack development, bioacoustics, DSP, machine learning, React, Python, and cloud architecture." />
        <link rel="canonical" href="https://iangabaraev.com/blog" />
        <meta property="og:title" content="Blog | Ian Gabaraev" />
        <meta property="og:description" content="Articles on software engineering, full stack development, bioacoustics, DSP, machine learning, and cloud architecture." />
        <meta property="og:url" content="https://iangabaraev.com/blog" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Ian Gabaraev's Blog",
          "description": "Articles on software engineering, full stack development, bioacoustics, DSP, and machine learning.",
          "url": "https://iangabaraev.com/blog",
          "author": { "@type": "Person", "name": "Ian Gabaraev" }
        })}</script>
      </Helmet>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="blog-title">Blog</h1>
          <p className="blog-subtitle">
            Thoughts on software engineering, side projects, and the occasional deep dive.
          </p>

          <div className="tag-filters">
            {allTags.map(tag => (
              <button
                key={tag}
                className={`filter-tag ${activeTags.includes(tag) ? 'active' : ''}`}
                onClick={() => toggleTag(tag)}
              >
                {tag}
              </button>
            ))}
            {activeTags.length > 0 && (
              <button className="clear-filters" onClick={clearFilters}>
                Clear
              </button>
            )}
          </div>

          <div className="posts-list">
            {filteredPosts.map((post, index) => (
              <motion.article
                key={post.slug}
                className={`post-card${post.favorite ? ' post-card-favorite' : ''}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                {post.favorite && <Star className="favorite-star" size={18} fill="currentColor" />}
                <Link to={`/blog/${post.slug}`} className="post-link">
                  <time className="post-date">{formatDate(post.date)}</time>
                  <h2 className="post-title">{post.title}</h2>
                  <p className="post-excerpt">{post.excerpt}</p>
                  <div className="post-tags">
                    {post.tags.map((tag) => (
                      <span key={tag} className="post-tag">{tag}</span>
                    ))}
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>

          {filteredPosts.length === 0 && activeTags.length > 0 && (
            <p className="no-posts">No posts match the selected tags.</p>
          )}

          {posts.length === 0 && (
            <p className="no-posts">No posts yet. Check back soon!</p>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Blog;
