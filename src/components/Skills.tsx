import { motion } from 'framer-motion';
import { Code2, Database, Cloud, Brain, Server, Layers } from 'lucide-react';
import './Skills.css';

interface Skill {
  name: string;
  level: number;
  icon?: string;
}

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  skills: Skill[];
}

const skillCategories: SkillCategory[] = [
  {
    title: 'Frontend',
    icon: <Code2 size={24} />,
    skills: [
      { name: 'TypeScript', level: 95 },
      { name: 'React', level: 92 },
      { name: 'JavaScript', level: 98 },
      { name: 'HTML/CSS', level: 90 },
      { name: 'Bootstrap', level: 85 },
    ],
  },
  {
    title: 'Backend',
    icon: <Server size={24} />,
    skills: [
      { name: 'Python', level: 98 },
      { name: 'Django', level: 95 },
      { name: 'FastAPI', level: 92 },
      { name: 'Flask', level: 90 },
      { name: 'GraphQL', level: 88 },
      { name: 'REST APIs', level: 96 },
      { name: 'gRPC', level: 82 },
    ],
  },
  {
    title: 'Databases',
    icon: <Database size={24} />,
    skills: [
      { name: 'PostgreSQL', level: 94 },
      { name: 'MongoDB', level: 88 },
      { name: 'Redis', level: 90 },
      { name: 'ElasticSearch', level: 80 },
      { name: 'MySQL', level: 86 },
    ],
  },
  {
    title: 'Cloud & DevOps',
    icon: <Cloud size={24} />,
    skills: [
      { name: 'AWS', level: 92 },
      { name: 'Azure', level: 88 },
      { name: 'Docker', level: 94 },
      { name: 'Lambda', level: 90 },
      { name: 'CI/CD', level: 86 },
    ],
  },
  {
    title: 'ML & Data',
    icon: <Brain size={24} />,
    skills: [
      { name: 'PyTorch', level: 82 },
      { name: 'NumPy', level: 90 },
      { name: 'Pandas', level: 88 },
      { name: 'Data Analysis', level: 85 },
    ],
  },
  {
    title: 'Architecture',
    icon: <Layers size={24} />,
    skills: [
      { name: 'System Design', level: 92 },
      { name: 'Microservices', level: 90 },
      { name: 'Event-Driven', level: 86 },
      { name: 'TDD', level: 88 },
    ],
  },
];

const techStack = [
  'Python', 'TypeScript', 'React', 'Django', 'FastAPI', 'AWS', 'Azure',
  'Docker', 'PostgreSQL', 'MongoDB', 'Redis', 'GraphQL', 'Celery',
  'RabbitMQ', 'Kafka', 'PyTorch', 'Git', 'Linux', 'Nginx', 'Elixir'
];

const Skills = () => {
  return (
    <section id="skills" className="section skills-section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Tech Arsenal</h2>
          <p className="section-subtitle">
            A decade of mastering the most powerful technologies in software engineering.
          </p>
        </motion.div>

        {/* Scrolling tech marquee */}
        <motion.div
          className="tech-marquee"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="marquee-track">
            {[...techStack, ...techStack].map((tech, i) => (
              <span key={i} className="marquee-item">{tech}</span>
            ))}
          </div>
        </motion.div>

        {/* Skill categories grid */}
        <div className="skills-grid">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              className="skill-card card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
            >
              <div className="skill-card-header">
                <div className="skill-icon">{category.icon}</div>
                <h3>{category.title}</h3>
              </div>
              <div className="skill-list">
                {category.skills.map((skill) => (
                  <div key={skill.name} className="skill-item">
                    <div className="skill-info">
                      <span className="skill-name">{skill.name}</span>
                      <span className="skill-level">{skill.level}%</span>
                    </div>
                    <div className="skill-bar">
                      <motion.div
                        className="skill-fill"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
