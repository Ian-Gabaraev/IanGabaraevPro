import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin, ExternalLink } from 'lucide-react';
import './Experience.css';

interface Experience {
  company: string;
  role: string;
  client?: string;
  period: string;
  location: string;
  description: string;
  achievements: string[];
  technologies: string[];
  link?: string;
}

const experiences: Experience[] = [
  {
    company: 'Akvelon, Inc.',
    client: 'AMN Healthcare',
    role: 'Lead Software Development Engineer',
    period: 'Jan 2021 – Present',
    location: 'Remote',
    description: 'Leading development of Stratus Video (SVEN), a mission-critical Telehealth platform connecting patients with interpreters across 65 languages worldwide.',
    achievements: [
      'Architected real-time communication service for Android/iOS/Electron clients',
      'Led development of internal agent management platform from scratch',
      'Achieved 85% database performance boost through query optimization',
      'Successfully migrated legacy Django 2 → Django 5 codebase',
      'Orchestrated cloud migration from AWS to Azure',
    ],
    technologies: ['Python', 'Django', 'React', 'TypeScript', 'AWS', 'Azure', 'PostgreSQL', 'Docker', 'FreeSWITCH'],
  },
  {
    company: 'Quantori, LLC',
    client: 'Tessera Therapeutics',
    role: 'Lead Software Development Engineer',
    period: 'Aug 2021 – Dec 2022',
    location: 'Remote',
    description: 'Built cutting-edge bioinformatics solutions for DNA sequence analysis and laboratory automation integration.',
    achievements: [
      'Designed Tessera DNA Scoring platform for genome error detection',
      'Developed Cellario-Benchling API bridge for lab automation',
      'Performed reverse-engineering of complex sequence analysis tools',
      'Deployed serverless architectures on AWS',
    ],
    technologies: ['Python', 'AWS Lambda', 'Serverless Framework', 'Benchling API', 'Bioinformatics'],
  },
  {
    company: 'MST',
    role: 'Team Leader (Backend)',
    period: 'Jun 2020 – May 2021',
    location: 'Moscow',
    description: 'Led backend development for diverse portfolio including e-learning platforms, e-commerce systems, and video monitoring solutions.',
    achievements: [
      'Led development of GrowHeads.ru education platform',
      'Built e-commerce platform for Panasonic Digital Cameras',
      'Developed video monitoring backend for Russia\'s leading ISP',
      'Mentored junior developers and conducted technical interviews',
    ],
    technologies: ['Python', 'Flask', 'GraphQL', 'PostgreSQL', 'Redis', 'Celery', 'RabbitMQ', 'asyncio'],
    link: 'https://growheads.ru/',
  },
  {
    company: 'Brain Creators, Inc.',
    role: 'Software Development Engineer',
    period: 'Sep 2017 – Jun 2019',
    location: 'Amsterdam',
    description: 'Full-stack development of RESTful and GraphQL APIs, working closely with stakeholders to deliver robust technical solutions.',
    achievements: [
      'Developed RESTful/GraphQL APIs using Django Rest Framework & Graphene',
      'Built Python-based Lambda functions on AWS',
      'Designed complex database schemas',
      'Participated in architecture design benchmarking',
    ],
    technologies: ['Python', 'Django', 'Flask', 'GraphQL', 'AWS S3', 'MySQL', 'NGINX'],
  },
  {
    company: 'Contracting & Open Source',
    role: 'Software Developer',
    period: 'Jan 2015 – Jun 2017',
    location: 'Freelance',
    description: 'Built diverse projects for clients including government bodies, NGOs, and media companies while contributing to open source.',
    achievements: [
      'Created public PlayStation4 REST API',
      'Developed Noise Monitoring System',
      'Built websites for Chamber of Commerce & political organizations',
      'Contributed to Jarvis Voice Assistant & Django-Websocket-Redis',
    ],
    technologies: ['Python', 'Django', 'Flask', 'MySQL', 'NGINX', 'GitLab CI'],
  },
];

const Experience = () => {
  return (
    <section id="experience" className="section experience-section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Battle-Tested Experience</h2>
          <p className="section-subtitle">
            A decade of engineering excellence across healthcare, biotech, education, and enterprise.
          </p>
        </motion.div>

        <div className="timeline">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="timeline-content card">
                <div className="timeline-header">
                  <div className="company-info">
                    <h3 className="company-name">
                      {exp.company}
                      {exp.client && <span className="client"> / {exp.client}</span>}
                    </h3>
                    <span className="role">{exp.role}</span>
                  </div>
                  {exp.link && (
                    <a href={exp.link} target="_blank" rel="noopener noreferrer" className="project-link">
                      <ExternalLink size={18} />
                    </a>
                  )}
                </div>

                <div className="timeline-meta">
                  <span className="meta-item">
                    <Calendar size={14} />
                    {exp.period}
                  </span>
                  <span className="meta-item">
                    <MapPin size={14} />
                    {exp.location}
                  </span>
                </div>

                <p className="description">{exp.description}</p>

                <ul className="achievements">
                  {exp.achievements.map((achievement, i) => (
                    <li key={i}>{achievement}</li>
                  ))}
                </ul>

                <div className="tech-tags">
                  {exp.technologies.map((tech) => (
                    <span key={tech} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>

              <div className="timeline-dot">
                <Briefcase size={16} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
