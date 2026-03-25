import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleHashClick = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    if (!isHome) {
      e.preventDefault();
      window.location.href = '/' + hash;
    }
  };

  return (
    <motion.nav
      className={`navbar ${isScrolled ? 'scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="container navbar-container">
        <Link to="/" className="logo"><span className="logo-box">IG</span></Link>

        <div className="nav-links">
          <a href="#about" className="nav-link" onClick={(e) => handleHashClick(e, '#about')}>About</a>
          <a href="#experience" className="nav-link" onClick={(e) => handleHashClick(e, '#experience')}>Experience</a>
          <a href="#projects" className="nav-link" onClick={(e) => handleHashClick(e, '#projects')}>Projects</a>
          <Link to="/blog" className="nav-link">Blog</Link>
          <Link to="/quiz" className="nav-link">Quiz</Link>
          <a href="#contact" className="nav-link" onClick={(e) => handleHashClick(e, '#contact')}>Contact</a>
        </div>

        <button
          className="mobile-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="mobile-menu">
          <a href="#about" className="mobile-link" onClick={() => { setIsMobileMenuOpen(false); if (!isHome) window.location.href = '/#about'; }}>About</a>
          <a href="#experience" className="mobile-link" onClick={() => { setIsMobileMenuOpen(false); if (!isHome) window.location.href = '/#experience'; }}>Experience</a>
          <a href="#projects" className="mobile-link" onClick={() => { setIsMobileMenuOpen(false); if (!isHome) window.location.href = '/#projects'; }}>Projects</a>
          <Link to="/blog" className="mobile-link" onClick={() => setIsMobileMenuOpen(false)}>Blog</Link>
          <Link to="/quiz" className="mobile-link" onClick={() => setIsMobileMenuOpen(false)}>Quiz</Link>
          <a href="#contact" className="mobile-link" onClick={() => { setIsMobileMenuOpen(false); if (!isHome) window.location.href = '/#contact'; }}>Contact</a>
        </div>
      )}
    </motion.nav>
  );
};

export default Navbar;
