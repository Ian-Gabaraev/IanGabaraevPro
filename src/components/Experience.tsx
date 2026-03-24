import { motion } from 'framer-motion';
import './Experience.css';

const experiences = [
  {
    company: 'Akvelon / AMN Healthcare',
    role: 'Lead Software Development Engineer',
    period: '2021 — Present',
    description: 'Leading development of Stratus Video telehealth platform. Built real-time communication services, led AWS to Azure migration, achieved 85% database performance improvement.',
    tech: ['Python', 'Django', 'React', 'Azure', 'PostgreSQL', 'FreeSWITCH'],
  },
  {
    company: 'Quantori / Tessera Therapeutics',
    role: 'Lead Software Development Engineer',
    period: '2021 — 2022',
    description: 'Built bioinformatics solutions for DNA sequence analysis. Designed serverless architectures for genome error detection.',
    tech: ['Python', 'AWS Lambda', 'Serverless', 'Benchling API'],
  },
  {
    company: 'MST',
    role: 'Team Leader, Backend',
    period: '2020 — 2021',
    description: 'Led backend development for education platforms and e-commerce systems. Mentored junior developers, conducted technical interviews.',
    tech: ['Python', 'Flask', 'GraphQL', 'PostgreSQL', 'Redis'],
  },
  {
    company: 'Brain Creators',
    role: 'Software Development Engineer',
    period: '2017 — 2019',
    description: 'Developed RESTful and GraphQL APIs for enterprise clients. Built AWS Lambda functions and designed database schemas.',
    tech: ['Python', 'Django', 'GraphQL', 'AWS S3', 'MySQL'],
  },
];

const Experience = () => {
  return (
    <section id="experience" className="section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="section-title">Experience</p>
          
          <div className="experience-list">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                className="experience-item"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className="experience-header">
                  <div>
                    <h3>{exp.company}</h3>
                    <p className="role">{exp.role}</p>
                  </div>
                  <span className="period">{exp.period}</span>
                </div>
                <p className="description">{exp.description}</p>
                <div className="tech-list">
                  {exp.tech.map((t) => (
                    <span key={t} className="tech-item">{t}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
