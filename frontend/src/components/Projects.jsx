import { Github, ExternalLink, Layers } from 'lucide-react'

const projects = [
  {
    title: 'E-Commerce Platform',
    description: 'Full-featured MERN stack marketplace with Stripe payments, real-time inventory, admin dashboard, and order tracking.',
    tech: ['MongoDB', 'Express', 'React', 'Node.js', 'Stripe'],
    github: 'https://github.com/Vaibhav-S551/FamilyFare/tree/main/familyfare',
    color: '#06b6d4',
    icon: '🛒',
    featured: true
  },
  {
    title: 'Book Recommendation System',
    description: 'Deep learning model achieving 56%+ accuracy, deployed as a Flask API with a React frontend for real-time recommendations.',
    tech: ['Python', 'TensorFlow','ScikitLearn', 'Flask', 'Pandas', 'Numpy'],
    github: 'https://github.com/Vaibhav-S551/book-recommend',
    demo: null,
    color: '#f59e0b',
    icon: '🧠',
    featured: false
  },
  
  {
    title: 'Ai Integrated Portfolio ',
    description: 'Built a AI integrated portfolio where a Chatbot tells about the education,skills,and personal information.',
    tech: ['React',"CSS","Javascript","OpenAI API key","MongoDB"],
    github: 'https://github.com/alexcarter/crypto-tracker',
    color: '#f97316',
    icon: '💰',
    featured: false
  }
]

export default function Projects() {
  return (
    <section id="projects" style={{ background: 'var(--bg-secondary)' }}>
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <Layers size={12} style={{ display: 'inline', marginRight: '6px' }} />
            Portfolio
          </div>
          <h2 className="section-title">Featured <span className="gradient-text">Projects</span></h2>
          <p className="section-subtitle">A selection of things I've built — from AI tools to full-stack platforms</p>
        </div>

        <div className="projects-grid">
          {projects.map((project, i) => (
            <div
              key={project.title}
              className={`project-card card ${project.featured ? 'featured' : ''}`}
              style={{ '--project-color': project.color, animationDelay: `${i * 0.08}s` }}
            >
              <div className="project-header">
                <div className="project-icon" style={{ background: `${project.color}18`, borderColor: `${project.color}30` }}>
                  <span>{project.icon}</span>
                </div>
                <div className="project-links">
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="icon-link" aria-label="GitHub">
                    <Github size={17} />
                  </a>
                  {project.demo && (
                    <a href={project.demo} target="_blank" rel="noopener noreferrer" className="icon-link" aria-label="Live demo">
                      <ExternalLink size={17} />
                    </a>
                  )}
                </div>
              </div>

              {project.featured && <div className="featured-badge">⭐ Featured</div>}

              <h3 className="project-title">{project.title}</h3>
              <p className="project-desc">{project.description}</p>

              <div className="project-tech">
                {project.tech.map(t => (
                  <span key={t} className="tech-chip" style={{ '--chip-color': project.color }}>{t}</span>
                ))}
              </div>

              <div className="project-glow" style={{ background: `radial-gradient(circle at top left, ${project.color}08 0%, transparent 70%)` }} />
            </div>
          ))}
        </div>

        <div className="projects-cta">
          <a href="https://github.com/Vaibhav-S551" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
            <Github size={16} />
            View All on GitHub
          </a>
        </div>
      </div>

      <style>{`
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          margin-bottom: 48px;
        }
        .project-card {
          position: relative;
          cursor: default;
          transition: var(--transition);
        }
        .project-card.featured {
          grid-column: span 1;
          border-color: rgba(124,58,237,0.25);
        }
        .project-glow {
          position: absolute;
          inset: 0;
          border-radius: var(--radius);
          pointer-events: none;
        }
        .project-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 16px;
        }
        .project-icon {
          width: 46px; height: 46px;
          border-radius: 12px;
          border: 1px solid;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.3rem;
        }
        .project-links {
          display: flex;
          gap: 8px;
        }
        .icon-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 34px; height: 34px;
          border-radius: var(--radius-sm);
          background: rgba(255,255,255,0.04);
          border: 1px solid var(--border);
          color: var(--text-secondary);
          text-decoration: none;
          transition: var(--transition);
        }
        .icon-link:hover {
          border-color: var(--project-color, var(--accent));
          color: var(--project-color, var(--accent-light));
          transform: translateY(-2px);
        }
        .featured-badge {
          display: inline-block;
          font-size: 0.7rem;
          font-weight: 600;
          color: #f59e0b;
          background: rgba(245,158,11,0.1);
          border: 1px solid rgba(245,158,11,0.25);
          padding: 3px 10px;
          border-radius: 100px;
          margin-bottom: 10px;
        }
        .project-title {
          font-family: var(--font-display);
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 10px;
        }
        .project-desc {
          font-size: 0.88rem;
          color: var(--text-secondary);
          line-height: 1.7;
          margin-bottom: 18px;
          flex: 1;
        }
        .project-tech {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-top: auto;
        }
        .tech-chip {
          font-size: 0.72rem;
          font-weight: 600;
          padding: 4px 10px;
          border-radius: 100px;
          background: color-mix(in srgb, var(--chip-color, var(--accent)) 10%, transparent);
          color: var(--chip-color, var(--accent-light));
          border: 1px solid color-mix(in srgb, var(--chip-color, var(--accent)) 25%, transparent);
        }
        .projects-cta { text-align: center; }
        @media (max-width: 900px) {
          .projects-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 600px) {
          .projects-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  )
}
