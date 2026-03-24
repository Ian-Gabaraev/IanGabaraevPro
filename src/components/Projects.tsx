import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { GithubIcon } from './Icons';
import './Projects.css';

const projects = [
  {
    name: 'NomadAtlas',
    description: 'Finance and lifestyle command center for digital nomads. Real-time expense tracking, budget monitoring, geolocation-aware weather, and curated places — all in one dashboard. Auto-detects your city, visualizes spending by category, integrates live weather with sunrise/sunset.',
    tech: ['React 19', 'TypeScript', 'Vite', 'React Bootstrap', 'Open-Meteo API'],
    live: 'https://nomadatlas.dev',
    github: 'https://github.com/ian-gabaraev/nomadatlas',
  },
  {
    name: 'Stratus Video',
    description: 'Enterprise telehealth platform connecting patients with interpreters across 65 languages. Handles thousands of daily video calls.',
    tech: ['Python', 'Django', 'React', 'FreeSWITCH', 'Azure'],
  },
  {
    name: 'Panasonic E-Plaza',
    description: 'Digital commerce platform for Panasonic. End-to-end e-commerce solution with product catalog, checkout flows, and enterprise integrations.',
    tech: ['React', 'TypeScript', 'Node.js', 'AWS'],
  },
  {
    name: 'Tessera DNA Analysis',
    description: 'Bioinformatics pipeline for DNA sequence analysis. ML-powered genomic tools processing large-scale sequencing data.',
    tech: ['Python', 'Bioinformatics', 'ML', 'Data Pipelines'],
  },
  {
    name: 'Growheads',
    description: 'Knowledge sharing platform — Confluence-style collaborative workspace for teams. Document management, search, and real-time editing.',
    tech: ['React', 'Node.js', 'PostgreSQL', 'Elasticsearch'],
  },
  {
    name: 'Bat Sonar Listener',
    description: 'Real-time ultrasonic bat call detection. Captures frequencies up to 192kHz, applies heterodyne mixing and spectral analysis for species identification.',
    tech: ['Python', 'NumPy', 'SciPy', 'DSP', 'PyAudio'],
    github: 'https://github.com/Ian-Gabaraev/Bat-Sonar-Listener',
  },
  {
    name: 'Bat Sonar Analysis',
    description: 'ML pipeline for bat species classification using FFT, MFCC extraction, and neural networks on ultrasonic recordings.',
    tech: ['Python', 'PyTorch', 'Librosa', 'NumPy'],
    github: 'https://github.com/Ian-Gabaraev/Bat-Sonar',
  },
];

const Projects = () => {
  return (
    <section id="projects" className="section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="section-title">Projects</p>
          
          <div className="projects-grid">
            {projects.map((project, index) => (
              <motion.article
                key={project.name}
                className="project-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className="project-header">
                  <h3>{project.name}</h3>
                  <div className="project-links">
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                        <GithubIcon size={18} />
                      </a>
                    )}
                    {project.live && (
                      <a href={project.live} target="_blank" rel="noopener noreferrer" aria-label="Live site">
                        <ArrowUpRight size={18} />
                      </a>
                    )}
                  </div>
                </div>
                <p className="project-description">{project.description}</p>
                <div className="project-tech">
                  {project.tech.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
