import { motion } from 'framer-motion';
import { Mail, MapPin, ChevronDown, Sparkles } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import './Hero.css';

const Hero = () => {
  const roles = [
    'Lead Software Engineer',
    'Full-Stack Developer',
    'Cloud Architect',
    'ML Engineer',
  ];

  return (
    <section className="hero">
      <div className="hero-content container">
        <motion.div
          className="hero-badge"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Sparkles size={14} />
          <span>Available for opportunities</span>
        </motion.div>

        <motion.h1
          className="hero-title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Ian <span className="gradient-text">Gabaraev</span>
        </motion.h1>

        <motion.div
          className="hero-roles"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {roles.map((role, index) => (
            <motion.span
              key={role}
              className="role-tag"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
            >
              {role}
            </motion.span>
          ))}
        </motion.div>

        <motion.p
          className="hero-description"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <span className="highlight">10+ years</span> crafting scalable systems & leading engineering teams.
          <br />
          Architecting the future with <span className="highlight">Python</span>, <span className="highlight">TypeScript</span>, <span className="highlight">React</span>, and <span className="highlight">Cloud</span>.
        </motion.p>

        <motion.div
          className="hero-location"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <MapPin size={16} />
          <span>Remote • Worldwide</span>
        </motion.div>

        <motion.div
          className="hero-cta"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <a href="#contact" className="btn btn-primary">
            <Mail size={18} />
            Get in Touch
          </a>
          <a href="#projects" className="btn btn-secondary">
            View Projects
          </a>
        </motion.div>

        <motion.div
          className="hero-social"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.4 }}
        >
          <a href="https://github.com/ian-gabaraev" target="_blank" rel="noopener noreferrer" className="social-link">
            <GithubIcon size={22} />
          </a>
          <a href="https://www.linkedin.com/in/ian-gabaraev/" target="_blank" rel="noopener noreferrer" className="social-link">
            <LinkedinIcon size={22} />
          </a>
        </motion.div>

        <motion.div
          className="hero-stats"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6 }}
        >
          <div className="stat">
            <span className="stat-value">10+</span>
            <span className="stat-label">Years Experience</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat">
            <span className="stat-value">50+</span>
            <span className="stat-label">Projects Delivered</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat">
            <span className="stat-value">6</span>
            <span className="stat-label">Companies Led</span>
          </div>
        </motion.div>

        <motion.a
          href="#about"
          className="scroll-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{
            opacity: { duration: 0.6, delay: 2 },
            y: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
          }}
        >
          <ChevronDown size={28} />
        </motion.a>
      </div>

      {/* Animated code snippets floating */}
      <div className="floating-code">
        <motion.div
          className="code-snippet snippet-1"
          animate={{ y: [0, -15, 0], rotate: [0, 2, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <code>{'const engineer = { passion: "∞" }'}</code>
        </motion.div>
        <motion.div
          className="code-snippet snippet-2"
          animate={{ y: [0, 12, 0], rotate: [0, -1, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        >
          <code>{'async function buildTheFuture() {}'}</code>
        </motion.div>
        <motion.div
          className="code-snippet snippet-3"
          animate={{ y: [0, -10, 0], rotate: [0, 1.5, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        >
          <code>{'<Innovation scale="massive" />'}</code>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
