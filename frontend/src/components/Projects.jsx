import {
  Github,
  ExternalLink,
  Layers,
  ShoppingCart,
  Brain,
  Bot,
  ClipboardList,
  Code2,
  Users,
  ShieldCheck,
  CreditCard,
  Database,
  Sparkles,
  ArrowUpRight
} from 'lucide-react'

const projects = [
  {
    title: 'E-Commerce Platform',
    category: 'Full Stack',
    description:
      'A full-stack e-commerce platform with product management, authentication, shopping cart, order management, payment integration, and an admin workflow.',
    tech: ['MongoDB', 'Express', 'React', 'Node.js', 'Stripe'],
    github:
      'https://github.com/Vaibhav-S551/FamilyFare/tree/main/familyfare',
    demo: null,
    color: '#06b6d4',
    icon: ShoppingCart,
    featured: true
  },

  {
    title: 'LegacyLens',
    category: 'AI / Developer Tool',
    description:
      'An AI-powered legacy code modernization assistant that analyzes Java code, detects code smells and security issues, explains legacy code, and suggests modernization strategies.',
    tech: [
      'Java',
      'Spring Boot',
      'JavaParser',
      'JWT',
      'React',
      'MongoDB',
      'AI'
    ],
    github: 'https://github.com/Vaibhav-S551/AI-code-moderization-system.git',
    demo: null,
    color: '#8b5cf6',
    icon: Code2,
    featured: true
  },

  {
    title: 'TaskBoard',
    category: 'Full Stack',
    description:
      'A collaborative task management application with boards, lists, tasks, authentication, JWT security, search functionality, and REST APIs.',
    tech: [
      'Java',
      'Spring Boot',
      'Spring Security',
      'JWT',
      'MySQL',
      'React'
    ],
    github: 'https://github.com/Vaibhav-S551/taskboard.git',
    demo: null,
    color: '#3b82f6',
    icon: ClipboardList,
    featured: true
  },

  {
    title: 'Book Recommendation System',
    category: 'Machine Learning',
    description:
      'A machine-learning based book recommendation system that analyzes book information and user input to generate personalized recommendations through a Flask API.',
    tech: [
      'Python',
      'TensorFlow',
      'Scikit-learn',
      'Flask',
      'Pandas',
      'NumPy'
    ],
    github: 'https://github.com/Vaibhav-S551/book-recommend',
    demo: null,
    color: '#f59e0b',
    icon: Brain,
    featured: false
  },

  {
    title: 'AI Integrated Portfolio',
    category: 'AI / Web',
    description:
      'A modern developer portfolio integrated with an AI chatbot that can answer questions about my education, skills, projects, experience, and professional background.',
    tech: [
      'React',
      'JavaScript',
      'CSS',
      'Node.js',
      'MongoDB',
      'OpenAI API'
    ],
    github: 'https://github.com/Vaibhav-S551/portfolio.git',
    demo: null,
    color: '#f97316',
    icon: Bot,
    featured: false
  },

  {
    title: 'Student Management System',
    category: 'Backend / REST API',
    description:
      'A Spring Boot based student management application providing REST APIs for managing student records with database persistence and structured service architecture.',
    tech: [
      'Java',
      'Spring Boot',
      'Spring Data JPA',
      'MySQL',
      'REST API'
    ],
    github: 'https://github.com/Vaibhav-S551',
    demo: null,
    color: '#22c55e',
    icon: Users,
    featured: false
  },

  // {
  //   title: 'Product Management API',
  //   category: 'Backend / REST API',
  //   description:
  //     'A production-style REST API for product and item management with JWT authentication, refresh tokens, validation, testing, Swagger documentation, and Docker support.',
  //   tech: [
  //     'Java 17+',
  //     'Spring Boot',
  //     'Spring Security',
  //     'JWT',
  //     'JPA',
  //     'MySQL',
  //     'Docker'
  //   ],
  //   github: 'https://github.com/Vaibhav-S551',
  //   demo: null,
  //   color: '#ec4899',
  //   icon: Database,
  //   featured: false
  // },

  // {
  //   title: 'Payment Integration System',
  //   category: 'Backend / Payments',
  //   description:
  //     'A payment-processing backend designed around secure payment workflows, webhook handling, idempotency, authentication, and scalable transaction processing.',
  //   tech: [
  //     'Java',
  //     'Spring Boot',
  //     'MongoDB',
  //     'Spring Security',
  //     'Stripe',
  //     'Redis'
  //   ],
  //   github: 'https://github.com/Vaibhav-S551',
  //   demo: null,
  //   color: '#14b8a6',
  //   icon: CreditCard,
  //   featured: false
  // }
]

const categoryIcons = {
  'Full Stack': Layers,
  'AI / Developer Tool': Sparkles,
  'AI / Web': Bot,
  'Machine Learning': Brain,
  'Backend / REST API': ShieldCheck,
  'Backend / Payments': CreditCard
}

export default function Projects() {
  return (
    <section id="projects" className="projects-section">
      <div className="projects-background">
        <div className="projects-grid-lines"></div>
        <div className="projects-orb projects-orb-one"></div>
        <div className="projects-orb projects-orb-two"></div>
      </div>

      <div className="container projects-container">
        <div className="section-header projects-heading">
          <div className="section-tag">
            <Layers size={12} />
            My Work
          </div>

          <h2 className="section-title">
            Featured <span className="gradient-text">Projects</span>
          </h2>

          <p className="section-subtitle">
            A collection of full-stack applications, AI tools, backend APIs,
            and machine learning projects I've built while developing my
            software engineering skills.
          </p>
        </div>

        <div className="project-stats">
          <div className="project-stat">
            <span className="stat-number">{projects.length}+</span>
            <span className="stat-label">Projects</span>
          </div>

          <div className="project-stat">
            <span className="stat-number">Full Stack</span>
            <span className="stat-label">Development</span>
          </div>

          <div className="project-stat">
            <span className="stat-number">AI + Java</span>
            <span className="stat-label">Core Focus</span>
          </div>
        </div>

        <div className="projects-grid">
          {projects.map((project, index) => {
            const ProjectIcon = project.icon
            const CategoryIcon =
              categoryIcons[project.category] || Layers

            return (
              <article
                key={project.title}
                className={`project-card ${
                  project.featured ? 'featured-project' : ''
                }`}
                style={{
                  '--project-color': project.color,
                  animationDelay: `${index * 0.08}s`
                }}
              >
                <div className="card-top-glow"></div>

                <div className="project-header">
                  <div
                    className="project-icon"
                    style={{
                      background: `${project.color}12`,
                      borderColor: `${project.color}35`,
                      color: project.color
                    }}
                  >
                    <ProjectIcon size={25} strokeWidth={1.8} />
                  </div>

                  <div className="project-actions">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="icon-link"
                        aria-label={`View ${project.title} on GitHub`}
                        title="View GitHub"
                      >
                        <Github size={17} />
                      </a>
                    )}

                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="icon-link"
                        aria-label={`Open ${project.title} demo`}
                        title="Live Demo"
                      >
                        <ExternalLink size={17} />
                      </a>
                    )}
                  </div>
                </div>

                <div className="project-meta">
                  <span
                    className="project-category"
                    style={{
                      color: project.color,
                      background: `${project.color}10`,
                      borderColor: `${project.color}25`
                    }}
                  >
                    <CategoryIcon size={12} />
                    {project.category}
                  </span>

                  {project.featured && (
                    <span className="featured-badge">
                      <Sparkles size={11} />
                      Featured
                    </span>
                  )}
                </div>

                <div className="project-content">
                  <h3 className="project-title">
                    {project.title}
                  </h3>

                  <p className="project-desc">
                    {project.description}
                  </p>
                </div>

                <div className="project-tech">
                  {project.tech.map((technology) => (
                    <span
                      key={technology}
                      className="tech-chip"
                      style={{
                        '--chip-color': project.color
                      }}
                    >
                      {technology}
                    </span>
                  ))}
                </div>

                <div className="project-footer">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-view-link"
                      style={{ color: project.color }}
                    >
                      <Github size={15} />
                      View Source
                      <ArrowUpRight size={14} />
                    </a>
                  )}

                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-view-link"
                      style={{ color: project.color }}
                    >
                      <ExternalLink size={15} />
                      Live Demo
                      <ArrowUpRight size={14} />
                    </a>
                  )}
                </div>

                <div
                  className="project-glow"
                  style={{
                    background: `radial-gradient(
                      circle at 10% 0%,
                      ${project.color}16 0%,
                      transparent 55%
                    )`
                  }}
                />
              </article>
            )
          })}
        </div>

        <div className="projects-cta">
          <div className="cta-content">
            <Github size={20} />

            <div>
              <h3>Want to explore more?</h3>
              <p>
                Check out my GitHub for source code, experiments and
                upcoming projects.
              </p>
            </div>
          </div>

          <a
            href="https://github.com/Vaibhav-S551"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline project-github-btn"
          >
            <Github size={16} />
            View GitHub
            <ArrowUpRight size={15} />
          </a>
        </div>
      </div>

      <style>{`
        .projects-section {
          position: relative;
          overflow: hidden;
          background:
            radial-gradient(
              circle at 15% 15%,
              rgba(124, 58, 237, 0.07),
              transparent 30%
            ),
            radial-gradient(
              circle at 85% 75%,
              rgba(6, 182, 212, 0.05),
              transparent 28%
            ),
            var(--bg-secondary);
          padding: 100px 0;
        }

        .projects-container {
          position: relative;
          z-index: 2;
        }

        .projects-background {
          position: absolute;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
        }

        .projects-grid-lines {
          position: absolute;
          inset: 0;
          opacity: 0.18;
          background-image:
            linear-gradient(
              rgba(255,255,255,0.025) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(255,255,255,0.025) 1px,
              transparent 1px
            );
          background-size: 70px 70px;
          mask-image: linear-gradient(
            to bottom,
            black,
            transparent 85%
          );
        }

        .projects-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
        }

        .projects-orb-one {
          width: 280px;
          height: 280px;
          background: rgba(124, 58, 237, 0.08);
          top: 5%;
          left: -140px;
        }

        .projects-orb-two {
          width: 320px;
          height: 320px;
          background: rgba(6, 182, 212, 0.06);
          right: -160px;
          bottom: 10%;
        }

        .projects-heading {
          max-width: 780px;
          margin: 0 auto 35px;
        }

        .section-tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }

        .projects-heading .section-title {
          margin-top: 14px;
        }

        .projects-heading .section-subtitle {
          max-width: 720px;
          margin-left: auto;
          margin-right: auto;
        }

        .project-stats {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 0;
          max-width: 650px;
          margin: 0 auto 50px;
          border: 1px solid var(--border);
          background: rgba(255,255,255,0.025);
          backdrop-filter: blur(12px);
          border-radius: 16px;
          overflow: hidden;
        }

        .project-stat {
          flex: 1;
          text-align: center;
          padding: 18px 20px;
          border-right: 1px solid var(--border);
        }

        .project-stat:last-child {
          border-right: none;
        }

        .stat-number {
          display: block;
          color: var(--text-primary);
          font-family: var(--font-display);
          font-size: 1rem;
          font-weight: 800;
          margin-bottom: 3px;
        }

        .stat-label {
          display: block;
          color: var(--text-muted);
          font-size: 0.68rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        .projects-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 22px;
          margin-bottom: 55px;
        }

        .project-card {
          position: relative;
          display: flex;
          flex-direction: column;
          min-height: 405px;
          padding: 25px;
          overflow: hidden;
          border-radius: 18px;
          border: 1px solid var(--border);
          background:
            linear-gradient(
              145deg,
              rgba(255,255,255,0.045),
              rgba(255,255,255,0.015)
            );
          box-shadow:
            0 10px 35px rgba(0,0,0,0.15);
          transition:
            transform 0.3s ease,
            border-color 0.3s ease,
            box-shadow 0.3s ease;
          animation: projectAppear 0.6s ease both;
        }

        .project-card:hover {
          transform: translateY(-8px);
          border-color: color-mix(
            in srgb,
            var(--project-color) 45%,
            var(--border)
          );
          box-shadow:
            0 20px 55px rgba(0,0,0,0.28),
            0 0 35px color-mix(
              in srgb,
              var(--project-color) 10%,
              transparent
            );
        }

        .featured-project {
          border-color: color-mix(
            in srgb,
            var(--project-color) 25%,
            var(--border)
          );
        }

        .card-top-glow {
          position: absolute;
          top: 0;
          left: 12%;
          right: 12%;
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent,
            var(--project-color),
            transparent
          );
          opacity: 0.5;
        }

        .project-glow {
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: 0.7;
        }

        .project-header,
        .project-meta,
        .project-content,
        .project-tech,
        .project-footer {
          position: relative;
          z-index: 2;
        }

        .project-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 18px;
        }

        .project-icon {
          width: 52px;
          height: 52px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 14px;
          border: 1px solid;
          transition: transform 0.3s ease;
        }

        .project-card:hover .project-icon {
          transform: rotate(-4deg) scale(1.06);
        }

        .project-actions {
          display: flex;
          gap: 7px;
        }

        .icon-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 35px;
          height: 35px;
          border-radius: 9px;
          background: rgba(255,255,255,0.035);
          border: 1px solid var(--border);
          color: var(--text-secondary);
          text-decoration: none;
          transition: all 0.25s ease;
        }

        .icon-link:hover {
          color: var(--project-color);
          border-color: var(--project-color);
          background: color-mix(
            in srgb,
            var(--project-color) 8%,
            transparent
          );
          transform: translateY(-2px);
        }

        .project-meta {
          display: flex;
          align-items: center;
          gap: 7px;
          flex-wrap: wrap;
          margin-bottom: 14px;
        }

        .project-category,
        .featured-badge {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 4px 9px;
          border-radius: 100px;
          font-size: 0.64rem;
          font-weight: 700;
          border: 1px solid;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }

        .featured-badge {
          color: #f59e0b;
          background: rgba(245,158,11,0.08);
          border-color: rgba(245,158,11,0.2);
        }

        .project-content {
          flex: 1;
        }

        .project-title {
          margin-bottom: 10px;
          color: var(--text-primary);
          font-family: var(--font-display);
          font-size: 1.18rem;
          font-weight: 750;
          line-height: 1.35;
        }

        .project-desc {
          margin-bottom: 20px;
          color: var(--text-secondary);
          font-size: 0.84rem;
          line-height: 1.75;
        }

        .project-tech {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-top: auto;
          padding-top: 10px;
        }

        .tech-chip {
          padding: 4px 9px;
          border-radius: 100px;
          border: 1px solid color-mix(
            in srgb,
            var(--chip-color) 23%,
            transparent
          );
          background: color-mix(
            in srgb,
            var(--chip-color) 8%,
            transparent
          );
          color: color-mix(
            in srgb,
            var(--chip-color) 85%,
            white
          );
          font-size: 0.66rem;
          font-weight: 650;
          transition: all 0.2s ease;
        }

        .tech-chip:hover {
          background: color-mix(
            in srgb,
            var(--chip-color) 15%,
            transparent
          );
        }

        .project-footer {
          display: flex;
          align-items: center;
          margin-top: 22px;
          padding-top: 15px;
          border-top: 1px solid var(--border);
        }

        .project-view-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: var(--text-secondary);
          text-decoration: none;
          font-size: 0.72rem;
          font-weight: 700;
          transition: gap 0.2s ease;
        }

        .project-view-link:hover {
          gap: 9px;
        }

        .projects-cta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 25px;
          max-width: 900px;
          margin: 0 auto;
          padding: 22px 25px;
          border: 1px solid var(--border);
          border-radius: 16px;
          background: rgba(255,255,255,0.025);
          backdrop-filter: blur(12px);
        }

        .cta-content {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .cta-content > svg {
          color: var(--accent-light);
          flex-shrink: 0;
        }

        .cta-content h3 {
          margin: 0 0 3px;
          color: var(--text-primary);
          font-size: 0.9rem;
        }

        .cta-content p {
          margin: 0;
          color: var(--text-muted);
          font-size: 0.75rem;
        }

        .project-github-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          white-space: nowrap;
        }

        @keyframes projectAppear {
          from {
            opacity: 0;
            transform: translateY(18px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 1000px) {
          .projects-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 700px) {
          .projects-section {
            padding: 75px 0;
          }

          .project-stats {
            max-width: 100%;
          }

          .projects-grid {
            grid-template-columns: 1fr;
          }

          .project-card {
            min-height: auto;
          }

          .projects-cta {
            flex-direction: column;
            align-items: flex-start;
          }

          .project-github-btn {
            width: 100%;
            justify-content: center;
          }
        }

        @media (max-width: 480px) {
          .project-stats {
            display: grid;
            grid-template-columns: 1fr;
          }

          .project-stat {
            border-right: none;
            border-bottom: 1px solid var(--border);
          }

          .project-stat:last-child {
            border-bottom: none;
          }

          .project-card {
            padding: 21px;
          }

          .projects-cta {
            padding: 20px;
          }

          .cta-content {
            align-items: flex-start;
          }
        }
      `}</style>
    </section>
  )
}