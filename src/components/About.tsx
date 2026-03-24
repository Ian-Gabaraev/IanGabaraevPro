import { motion } from 'framer-motion';
import { GraduationCap, Award, BookOpen, ExternalLink } from 'lucide-react';
import './About.css';

const About = () => {
  return (
    <section id="about" className="section about-section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">About Me</h2>
        </motion.div>

        <div className="about-grid">
          <motion.div
            className="about-content"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="about-intro">
              I'm a <span className="highlight">Lead Software Engineer</span> with over a decade of experience 
              architecting and building scalable systems that serve millions of users worldwide.
            </p>
            
            <p>
              My journey spans from crafting Python backends for healthcare giants to leading 
              cloud migrations across AWS and Azure. I specialize in transforming complex business 
              requirements into elegant, maintainable code.
            </p>

            <p>
              Whether it's optimizing database queries to achieve <span className="highlight">85% performance gains</span>, 
              building real-time communication platforms connecting patients with interpreters across 
              <span className="highlight"> 65 languages</span>, or diving into bioinformatics to detect genome errors — 
              I thrive on challenges that push the boundaries of what's possible.
            </p>

            <p>
              When I'm not coding, I'm exploring new technologies, contributing to open source, 
              and mentoring the next generation of developers.
            </p>

            <div className="about-highlights">
              <div className="highlight-item">
                <span className="highlight-number">10+</span>
                <span className="highlight-label">Years Experience</span>
              </div>
              <div className="highlight-item">
                <span className="highlight-number">6</span>
                <span className="highlight-label">Companies</span>
              </div>
              <div className="highlight-item">
                <span className="highlight-number">65</span>
                <span className="highlight-label">Languages Supported</span>
              </div>
            </div>
          </motion.div>

          <div className="about-cards">
            <motion.div
              className="about-card card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="card-icon">
                <GraduationCap size={24} />
              </div>
              <h3>Education</h3>
              <div className="card-content">
                <span className="degree">Bachelor's in International Relations</span>
                <span className="institution">Moscow State Institute of International Relations (MGIMO)</span>
              </div>
            </motion.div>

            <motion.div
              className="about-card card certification"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="card-icon">
                <Award size={24} />
              </div>
              <h3>Certification</h3>
              <div className="card-content">
                <span className="degree">Machine Learning Specialization</span>
                <span className="institution">Stanford University</span>
                <a 
                  href="https://www.coursera.org/account/accomplishments/specialization/7DDIBT28LOZT" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="cert-link"
                >
                  <ExternalLink size={14} />
                  View Certificate
                </a>
              </div>
            </motion.div>

            <motion.div
              className="about-card card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="card-icon">
                <BookOpen size={24} />
              </div>
              <h3>Methodologies</h3>
              <div className="card-content">
                <div className="methodology-tags">
                  <span>Agile/Scrum</span>
                  <span>TDD</span>
                  <span>CI/CD</span>
                  <span>Design Patterns</span>
                  <span>Code Review</span>
                  <span>Mentoring</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
