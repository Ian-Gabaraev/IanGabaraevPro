import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content container">
        <motion.p
          className="hero-label"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          Full Stack Engineer
        </motion.p>

        <motion.h1
          className="hero-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Ian Gabaraev
        </motion.h1>

        <motion.p
          className="hero-description"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Backend, Cloud, Frontend — I build across the entire stack. 10+ years shipping 
          production systems in Python, TypeScript, React, AWS, and Azure. Currently at 
          Akvelon, architecting telehealth infrastructure serving millions.
        </motion.p>

        <motion.div
          className="hero-links"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <a href="#contact" className="btn btn-primary">
            Get in touch
            <ArrowRight size={16} />
          </a>
          <a href="https://github.com/ian-gabaraev" target="_blank" rel="noopener noreferrer" className="hero-social">
            <GithubIcon size={20} />
          </a>
          <a href="https://www.linkedin.com/in/ian-gabaraev/" target="_blank" rel="noopener noreferrer" className="hero-social">
            <LinkedinIcon size={20} />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
