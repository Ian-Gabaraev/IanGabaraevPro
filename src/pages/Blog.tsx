import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
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
                className="post-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
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
