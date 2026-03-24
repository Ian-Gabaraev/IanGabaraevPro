import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getAllPosts } from '../data/posts';
import './Blog.css';

const Blog = () => {
  const posts = getAllPosts();

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

          <div className="posts-list">
            {posts.map((post, index) => (
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

          {posts.length === 0 && (
            <p className="no-posts">No posts yet. Check back soon!</p>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Blog;
