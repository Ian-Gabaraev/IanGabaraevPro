import { motion } from 'framer-motion';
import { Mail, MapPin, Sparkles } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import './Contact.css';

const Contact = () => {
  return (
    <section id="contact" className="section contact-section">
      <div className="container">
        <motion.div
          className="contact-content"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="contact-badge">
            <Sparkles size={14} />
            <span>Let's Connect</span>
          </div>

          <h2 className="contact-title">
            Ready to Build
            <br />
            <span className="gradient-text">Something Amazing?</span>
          </h2>

          <p className="contact-description">
            Whether you're looking for a technical leader to drive your next project,
            need expertise in cloud architecture, or want to discuss innovative solutions —
            I'm always excited to explore new opportunities.
          </p>

          <div className="contact-info">
            <div className="info-item">
              <MapPin size={18} />
              <span>Available Worldwide • Remote First</span>
            </div>
          </div>

          <div className="contact-buttons">
            <a href="mailto:ian.gabaraev@gmail.com" className="btn btn-primary contact-btn">
              <Mail size={20} />
              <span>Get in Touch</span>
            </a>
            <a 
              href="https://www.linkedin.com/in/ian-gabaraev/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-secondary contact-btn"
            >
              <LinkedinIcon size={20} />
              <span>LinkedIn</span>
            </a>
            <a 
              href="https://github.com/ian-gabaraev" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-secondary contact-btn"
            >
              <GithubIcon size={20} />
              <span>GitHub</span>
            </a>
          </div>
        </motion.div>

        {/* Decorative elements */}
        <div className="contact-decoration">
          <motion.div
            className="deco-circle circle-1"
            animate={{ scale: [1, 1.1, 1], rotate: [0, 180, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="deco-circle circle-2"
            animate={{ scale: [1, 1.2, 1], rotate: [360, 180, 0] }}
            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          />
        </div>
      </div>
    </section>
  );
};

export default Contact;
