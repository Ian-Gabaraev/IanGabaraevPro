import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import { getAllGuides } from "../data/guides";
import "./Learn.css";

const Learn = () => {
  const guides = getAllGuides();

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <section className="learn-list-page">
      <Helmet>
        <title>Learn | Ian Gabaraev</title>
        <meta
          name="description"
          content="Learning guides on JavaScript, TypeScript, React, Node.js, and practical full stack engineering topics."
        />
        <link rel="canonical" href="https://iangabaraev.com/learn" />
        <meta property="og:title" content="Learn | Ian Gabaraev" />
        <meta
          property="og:description"
          content="Practical learning guides for JavaScript, TypeScript, React, and Node.js."
        />
        <meta property="og:url" content="https://iangabaraev.com/learn" />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="learn-list-title">Learn</h1>
          <p className="learn-list-subtitle">
            Structured guides for full stack interview prep and production-ready
            frontend engineering.
          </p>

          <div className="learn-guides-list">
            {guides.map((guide, index) => (
              <motion.article
                key={guide.slug}
                className={`learn-guide-card${guide.featured ? " learn-guide-card-featured" : ""}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                {guide.featured && (
                  <Star
                    className="learn-favorite-star"
                    size={18}
                    fill="currentColor"
                  />
                )}
                <Link to={`/learn/${guide.slug}`} className="learn-guide-link">
                  <time className="learn-guide-date">
                    {formatDate(guide.date)}
                  </time>
                  <h2 className="learn-guide-title">{guide.title}</h2>
                  <p className="learn-guide-excerpt">{guide.excerpt}</p>
                  <div className="learn-guide-tags">
                    {guide.tags.map((tag) => (
                      <span key={tag} className="learn-guide-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Learn;
