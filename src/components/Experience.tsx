import { motion } from 'framer-motion';
import './Experience.css';

const experiences = [
  {
    company: 'Akvelon',
    role: 'Lead Software Development Engineer',
    period: '2021 — Present',
    description: 'Implemented real-time communication backends via WebSockets and FreeSWITCH for an enterprise telehealth platform. Drove fundamental core stack upgrades across Django and React/TypeScript. Built internal accounting and reporting tools from scratch. Delivered PostgreSQL query optimizations and schema redesigns that cut infrastructure costs significantly. Configured NGINX reverse proxies and TLS termination for production traffic. Managed Jira-driven sprints, led code reviews, and owned architecture design decisions across the platform. Integrated NewRelic APM for observability and performance monitoring. Maintained and stabilized legacy systems under high operational load.',
    tech: ['Python', 'Django', 'React', 'TypeScript', 'Azure', 'PostgreSQL', 'FreeSWITCH', 'WebSockets', 'NGINX', 'Redis', 'NewRelic', 'Jira', 'Lua', 'Linux', 'TLS', 'JWT', 'Alembic', 'Copilot'],
  },
  {
    company: 'Quantori / Tessera Therapeutics',
    role: 'Lead Software Development Engineer',
    period: '2021 — 2022',
    description: 'Architected serverless bioinformatics pipelines for DNA sequence analysis and genome error detection. Built event-driven data processing with SQS and Lambda. Designed FastAPI microservices with SQLAlchemy ORM and Alembic migrations. Trained PyTorch models for genomic pattern classification. Managed infrastructure on AWS with CloudWatch monitoring and S3 data lakes.',
    tech: ['Python', 'FastAPI', 'AWS Lambda', 'SQS', 'PyTorch', 'SQLAlchemy', 'Alembic', 'PostgreSQL', 'Elasticsearch', 'Benchling API', 'Linux', 'JWT'],
  },
  {
    company: 'MST',
    role: 'Team Leader, Backend',
    period: '2020 — 2021',
    description: 'Led backend development for education platforms and the Panasonic E-Plaza e-commerce system. Designed RESTful and GraphQL APIs with Flask. Managed task pipelines via RabbitMQ and Celery. Integrated Bitrix CRM for client management workflows. Conducted code reviews, mentored junior developers, and led technical interviews. Administered MariaDB and PostgreSQL clusters with Redis caching layers.',
    tech: ['Python', 'Flask', 'GraphQL', 'PostgreSQL', 'MariaDB', 'Redis', 'RabbitMQ', 'Bitrix', 'jQuery', 'JavaScript', 'NGINX', 'Linux', 'Jira'],
  },
  {
    company: 'Brain Creators',
    role: 'Software Development Engineer',
    period: '2017 — 2019',
    description: 'Developed RESTful and GraphQL APIs serving enterprise clients at scale. Built serverless functions on AWS Lambda with SQS-triggered workflows. Designed normalized database schemas and wrote complex SQL for analytics. Implemented streaming data pipelines and JWT-based auth. Deployed and maintained services on Linux with Cloudflare CDN and DDoS protection.',
    tech: ['Python', 'Django', 'GraphQL', 'AWS Lambda', 'SQS', 'Cloudflare', 'Kotlin', 'MySQL', 'Elasticsearch', 'Streaming', 'JWT', 'Linux', 'NGINX'],
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
