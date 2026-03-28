import { motion } from 'framer-motion';
import { ExternalLink, Waves, Mountain, Landmark, Camera } from 'lucide-react';
import './About.css';
import { FaUnsplash } from 'react-icons/fa';
import { SiPexels } from 'react-icons/si';

const About = () => {
  const skills = [
    'Python', 'TypeScript', 'React', 'Django', 'FastAPI', 'AWS', 'Azure',
    'PostgreSQL', 'Docker', 'GraphQL', 'Redis', 'Kafka', 'PyTorch', 'DSP'
  ];

  return (
    <section id="about" className="section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="section-title">About</p>
          
          <div className="about-grid">
            <div className="about-text">
              <p>
                Full stack engineer building end-to-end solutions — from React frontends 
                to Python backends to cloud infrastructure on AWS and Azure. For the past 
                decade, I've shipped production systems across healthcare, biotech, and education.
              </p>
              <p>
                I architect cloud migrations, design APIs, build real-time UIs, and optimize 
                distributed systems for scale. At Akvelon, I lead development of an enterprise 
                telehealth platform serving interpreters across 65 languages worldwide.
              </p>
              <p>
                Outside enterprise work, I build personal projects: <a href='https://nomadatlas.dev' className='project-link'>NomadAtlas</a> — a React 19 
                finance dashboard for digital nomads — and <a href='https://github.com/Ian-Gabaraev/Bat-Sonar-Listener' className='project-link'>Bat Sonar</a>, the ultrasonic bat detection systems 
                combining DSP with machine learning.
              </p>
            </div>
            
            <div className="about-info">
              <div className="info-block">
                <h3>Education</h3>
                <p>Moscow State Institute of International Relations</p>
                <span>Bachelor's in International Relations</span>
              </div>
              
              <div className="info-block">
                <h3>Certification</h3>
                <p>Machine Learning Specialization</p>
                <a 
                  href="https://www.coursera.org/account/accomplishments/specialization/7DDIBT28LOZT"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cert-link"
                >
                  Stanford University <ExternalLink size={12} />
                </a>
              </div>
              
              <div className="info-block beyond-code">
                <h3>Beyond Code</h3>
                <div className="beyond-items">
                  <span className="beyond-item"><Waves size={15} /> Technical Diving</span>
                  <span className="beyond-item"><Mountain size={15} /> Himalayan Trekking</span>
                  <span className="beyond-item"><Landmark size={15} /> Archeology</span>
                  <span className="beyond-item"><Camera size={15} /> Photography</span>
                </div>
                <div className="beyond-links">
                  <a
                    href="https://unsplash.com/@iangabaraev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="beyond-link"
                  >
                    <FaUnsplash size={16} /> Unsplash
                  </a>
                  <a
                    href="https://www.pexels.com/@ian-gabaraev-2149212079/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="beyond-link"
                  >
                    <SiPexels size={16} /> Pexels
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="skills-list">
            {skills.map((skill) => (
              <span key={skill} className="skill-tag">{skill}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
