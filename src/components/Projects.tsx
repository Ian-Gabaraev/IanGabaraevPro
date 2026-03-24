import { motion } from 'framer-motion';
import { ExternalLink, Rocket, Globe, Code } from 'lucide-react';
import { GithubIcon } from './Icons';
import './Projects.css';

interface Project {
  name: string;
  tagline: string;
  description: string;
  technologies: string[];
  github?: string;
  live?: string;
  featured?: boolean;
  stats?: {
    stars?: number;
    forks?: number;
  };
  image?: string;
}

const projects: Project[] = [
  {
    name: 'NomadAtlas.Dev',
    tagline: 'Digital Nomad Intelligence Platform',
    description: 'A comprehensive platform for remote workers and digital nomads, providing real-time data on visa requirements, cost of living, internet speeds, and co-working spaces across 200+ countries. Built with modern React/TypeScript frontend and Python backend.',
    technologies: ['TypeScript', 'React', 'Python', 'FastAPI', 'PostgreSQL', 'Redis', 'Docker', 'AWS'],
    live: 'https://nomadatlas.dev',
    github: 'https://github.com/ian-gabaraev/nomadatlas',
    featured: true,
  },
  {
    name: 'Stratus Video (SVEN)',
    tagline: 'Enterprise Telehealth Platform',
    description: 'VoIP platform for medical institutions connecting patients with interpreters across 65 languages. Handles thousands of daily video calls with real-time translation.',
    technologies: ['Python', 'Django', 'React', 'FreeSWITCH', 'WebRTC', 'Azure', 'PostgreSQL'],
    featured: true,
  },
  {
    name: 'PlayStation4 REST API',
    tagline: 'Open Source Gaming API',
    description: 'Public REST API wrapper for PlayStation Network, enabling developers to access game data, trophies, profiles and more.',
    technologies: ['Python', 'Flask', 'REST', 'OAuth2'],
    github: 'https://github.com/ian-gabaraev',
  },
  {
    name: 'Tessera DNA Scoring',
    tagline: 'Bioinformatics Solution',
    description: 'ML-powered platform for discovering errors in DNA sequences and providing improvement suggestions for genome editing research.',
    technologies: ['Python', 'AWS Lambda', 'Serverless', 'ML', 'NumPy'],
  },
  {
    name: 'Noise Monitoring System',
    tagline: 'Environmental Analytics',
    description: 'Real-time environmental noise monitoring and analytics platform with ML-based sound classification and alerting.',
    technologies: ['Python', 'PyTorch', 'Pandas', 'PostgreSQL', 'Docker'],
    github: 'https://github.com/ian-gabaraev',
  },
  {
    name: 'Django-Websocket-Redis',
    tagline: 'Open Source Contribution',
    description: 'Contributed to this popular Django library enabling WebSocket communication through Redis pub/sub messaging.',
    technologies: ['Python', 'Django', 'Redis', 'WebSockets'],
    github: 'https://github.com/jrief/django-websocket-redis',
  },
];

const Projects = () => {
  const featuredProjects = projects.filter(p => p.featured);
  const otherProjects = projects.filter(p => !p.featured);

  return (
    <section id="projects" className="section projects-section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-subtitle">
            Impactful solutions that solve real-world problems at scale.
          </p>
        </motion.div>

        {/* Featured projects */}
        <div className="featured-projects">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.name}
              className="featured-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <div className="featured-badge">
                <Rocket size={14} />
                <span>Featured</span>
              </div>

              <div className="featured-content">
                <div className="featured-header">
                  <h3 className="project-name">{project.name}</h3>
                  <span className="project-tagline">{project.tagline}</span>
                </div>

                <p className="project-description">{project.description}</p>

                <div className="project-tech">
                  {project.technologies.map(tech => (
                    <span key={tech} className="tech-tag">{tech}</span>
                  ))}
                </div>

                <div className="project-links">
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link">
                      <GithubIcon size={18} />
                      <span>Source</span>
                    </a>
                  )}
                  {project.live && (
                    <a href={project.live} target="_blank" rel="noopener noreferrer" className="project-link primary">
                      <Globe size={18} />
                      <span>Live Demo</span>
                    </a>
                  )}
                </div>
              </div>

              <div className="featured-visual">
                <div className="code-window">
                  <div className="window-header">
                    <div className="window-dot red"></div>
                    <div className="window-dot yellow"></div>
                    <div className="window-dot green"></div>
                    <span className="window-title">{project.name.toLowerCase().replace(/\./g, '_')}.ts</span>
                  </div>
                  <div className="window-content">
                    <code>
                      <span className="code-keyword">const</span> <span className="code-var">{project.name.replace(/[.\s]/g, '')}</span> = {'{'}<br/>
                      &nbsp;&nbsp;<span className="code-prop">impact</span>: <span className="code-string">"massive"</span>,<br/>
                      &nbsp;&nbsp;<span className="code-prop">users</span>: <span className="code-string">"worldwide"</span>,<br/>
                      &nbsp;&nbsp;<span className="code-prop">scale</span>: <span className="code-string">"enterprise"</span>,<br/>
                      {'}'};
                    </code>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Other projects grid */}
        <motion.h3
          className="other-projects-title"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <Code size={20} />
          Other Noteworthy Projects
        </motion.h3>

        <div className="projects-grid">
          {otherProjects.map((project, index) => (
            <motion.div
              key={project.name}
              className="project-card card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="project-card-header">
                <h4>{project.name}</h4>
                <div className="card-links">
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <GithubIcon size={18} />
                    </a>
                  )}
                  {project.live && (
                    <a href={project.live} target="_blank" rel="noopener noreferrer">
                      <ExternalLink size={18} />
                    </a>
                  )}
                </div>
              </div>
              <span className="card-tagline">{project.tagline}</span>
              <p className="card-description">{project.description}</p>
              <div className="card-tech">
                {project.technologies.slice(0, 4).map(tech => (
                  <span key={tech}>{tech}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
