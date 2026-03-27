import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { GithubIcon } from './Icons';
import './Projects.css';

const projects = [
  {
    name: 'NomadAtlas',
    description: 'Finance and lifestyle command center for digital nomads. Real-time expense tracking, budget monitoring, geolocation-aware weather, and curated places — all in one dashboard. Auto-detects your city, visualizes spending by category, integrates live weather with sunrise/sunset.',
    tech: ['React 19', 'TypeScript', 'Vite', 'React Bootstrap', 'Open-Meteo API', 'CloudFlare', 'D1', 'PostgreSQL', 'Redis', 'Celery'],
    live: 'https://nomadatlas.dev',
    github: 'https://github.com/ian-gabaraev/nomadatlas',
  },
  {
    name: '[NDA] Telehealth Platform',
    description: 'Enterprise telehealth platform connecting patients with interpreters across 65 languages. Real-time video/audio via FreeSWITCH and WebSockets, NGINX load balancing, TLS-secured APIs, and Redis-backed session management.',
    tech: ['Python', 'Django', 'React', 'TypeScript', 'FreeSWITCH', 'Azure', 'WebSockets', 'NGINX', 'Redis', 'PostgreSQL', 'Lua', 'NewRelic', 'Celery'],
  },
  {
    name: 'Panasonic E-Plaza',
    description: 'Digital commerce platform for Panasonic. End-to-end e-commerce with product catalog, checkout flows, RabbitMQ order pipelines, and MariaDB-backed inventory management.',
    tech: ['React', 'TypeScript', 'Django', 'RabbitMQ', 'MariaDB', 'jQuery', 'NGINX', 'Bitrix'],
    live: 'https://eplaza.ru/'
  },
  {
    name: 'Panasonic Lumix Russia',
    live: 'https://www.panasonic.com/kz/consumer/digital-cameras-and-camcorders/digital-cameras/lumix-g-system-cameras.html',
    description: 'E-commerce platform for Panasonic Lumix Cameras',
    tech: ['React', 'JavaScript', 'Flask', 'Postgres', 'Django', 'NGINX', 'Bitrix'],
  },
  {
    name: 'Tessera DNA Analysis',
    description: 'Bioinformatics pipeline for DNA sequence analysis. ML-powered genomic tools with PyTorch classification models, SQS event pipelines, and FastAPI microservices.',
    tech: ['Python', 'FastAPI', 'PyTorch', 'SQLAlchemy', 'AWS Lambda', 'SQS', 'Elasticsearch'],
  },
  {
    name: 'GrowHeads',
    description: 'Knowledge sharing platform — Confluence-style collaborative workspace. Real-time editing via WebSockets, full-text search with Elasticsearch, and JWT-secured API layer.',
    tech: ['React', 'Node.js', 'PostgreSQL', 'Elasticsearch', 'WebSockets', 'JWT', 'Django', 'Python'],
    live: 'https://growheads.ru/',
  },
  {
    name: 'AI Russia',
    description: 'AI industry leaders annual contest platform and showcasing library',
    tech: ['Django', 'React', 'ElasticSearch', 'NGINX', 'Linux', 'MySQL'],
    live: 'https://ai-russia.ru/library'
  },
  {
    name: 'Bat Sonar.Listener',
    description: 'Lean, ultra high performance, real-time ultrasonic bat call detection implemented in C. Captures frequencies up to 192kHz, applies heterodyne mixing and spectral analysis for species identification.',
    tech: ['C', 'PortAudio', 'Audacity', 'KissFFT', 'MQTT', 'AWS'],
    github: 'https://github.com/Ian-Gabaraev/Bat-Sonar-Listener',
  },
  {
    name: 'Bat Sonar Suite',
    description: 'ML pipeline for bat species classification using FFT, MFCC extraction, and neural networks on ultrasonic recordings.',
    tech: ['Python', 'PyTorch', 'Librosa', 'NumPy'],
    github: 'https://github.com/Ian-Gabaraev/Bat-Sonar',
  },
  {
    name: 'PassiveSonar',
    description: 'Distributed application suite for AirBnb hosts to monitor noise levels in their properties in real time',
    tech: ['Python', 'TypeScript', 'React', 'Asyncio', 'WebSockets', 'MQTT', 'Redis', 'AWS', 'Librosa', 'Celery'],
    github: 'https://github.com/Ian-Gabaraev/passivesonar'
  }
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
