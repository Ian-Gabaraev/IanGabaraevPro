import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <motion.div
            className="footer-text"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <p>
              Built with <Heart size={14} className="heart-icon" /> using{' '}
              <span className="tech">React</span> +{' '}
              <span className="tech">TypeScript</span>
            </p>
            <p className="copyright">
              © {currentYear} Ian Gabaraev. All rights reserved.
            </p>
          </motion.div>

          <motion.div
            className="footer-code"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <code>
              <span className="code-comment">// Made with passion</span>
              <br />
              <span className="code-keyword">export default</span>{' '}
              <span className="code-var">Excellence</span>;
            </code>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
