import { Github, Linkedin, ArrowDown, Zap, Code, Brain } from 'lucide-react'
import profile from "../assets/profile_img.jpeg";

const skills = ['React', 'Node.js', 'MongoDB', 'Python', 'TensorFlow', 'AWS', 'TypeScript', 'Docker']

export default function Home() {
  const scrollToProjects = () => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
  const scrollToContact = () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section id="home" style={{ paddingTop: '120px', paddingBottom: '80px', minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      {/* Background decoration */}
      <div className="home-bg-orb orb1" />
      <div className="home-bg-orb orb2" />
      <div className="home-bg-grid" />

      <div className="container">
        <div className="home-layout">
          {/* Left: Text content */}
          <div className="home-content">
            <div className="home-tag animate-fade-up">
              <span className="status-dot" />
              <span>Available for opportunities</span>
            </div>

            <h1 className="home-title animate-fade-up" style={{ animationDelay: '0.1s' }}>
              <span className="greeting">Hi, I'm</span>
              <br />
              <span className="gradient-text">Vaibhav Satpute</span>
            </h1>

            <div className="home-subtitle animate-fade-up" style={{ animationDelay: '0.2s' }}>
              <span>Full-Stack Developer</span>
              <span className="divider">·</span>
              <span>AI Engineer</span>
            </div>

            <p className="home-bio animate-fade-up" style={{ animationDelay: '0.3s' }}>
              I craft intelligent, scalable web applications that bridge modern frontend experiences 
              with powerful AI/ML backends. Passionate about clean code, great UX, and pushing the 
              boundaries of what software can do.
            </p>

            <div className="home-actions animate-fade-up" style={{ animationDelay: '0.4s' }}>
              <button className="btn btn-primary" onClick={scrollToProjects}>
                <Zap size={16} />
                View Projects
              </button>
              <button className="btn btn-outline" onClick={scrollToContact}>
                Get In Touch
              </button>
              <a href="https://github.com/Vaibhav-S551" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="GitHub">
                <Github size={20} />
              </a>
              <a href="https://www.linkedin.com/in/vaibhav-satpute-524334254" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
            </div>

            {/* Skill chips */}
            <div className="skill-chips animate-fade-up" style={{ animationDelay: '0.5s' }}>
              {skills.map(s => (
                <span key={s} className="chip">{s}</span>
              ))}
            </div>
          </div>

          {/* Right: Profile visual */}
          <div className="home-visual animate-float">
            <div className="profile-ring">
              <div className="profile-img-wrap">
                <img
                  src={profile}
                  alt="Vaibhav Carter"
                  className=""
                />
              </div>
              {/* Floating badges */}
            </div>

            {/* Stats */}
          </div>
        </div>

        <button className="scroll-hint" onClick={scrollToProjects} aria-label="Scroll down">
          <ArrowDown size={18} />
        </button>
      </div>

      <style>{`
        #home { overflow: hidden; }
        .home-bg-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          pointer-events: none;
        }
        .orb1 {
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(124,58,237,0.18) 0%, transparent 70%);
          top: -100px; right: -100px;
        }
        .orb2 {
          width: 300px; height: 300px;
          background: radial-gradient(circle, rgba(6,182,212,0.12) 0%, transparent 70%);
          bottom: 100px; left: -50px;
        }
        .home-bg-grid {
          position: absolute;
          inset: 0;
          background-image: linear-gradient(rgba(124,58,237,0.04) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(124,58,237,0.04) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none;
        }
        .home-layout {
          display: grid;
          grid-template-columns: 1fr 400px;
          gap: 80px;
          align-items: center;
          position: relative;
          z-index: 1;
        }
        .home-content { max-width: 560px; }
        .home-tag {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 0.82rem;
          font-weight: 500;
          color: #34d399;
          background: rgba(16,185,129,0.08);
          border: 1px solid rgba(16,185,129,0.2);
          padding: 6px 14px;
          border-radius: 100px;
          margin-bottom: 24px;
        }
        .status-dot {
          width: 7px; height: 7px;
          background: #34d399;
          border-radius: 50%;
          animation: pulse-glow 2s ease-in-out infinite;
          box-shadow: 0 0 0 3px rgba(52,211,153,0.2);
        }
        .home-title {
          font-size: clamp(2.8rem, 5vw, 4.5rem);
          margin-bottom: 16px;
          line-height: 1;
        }
        .greeting { font-size: 0.5em; color: var(--text-secondary); font-weight: 500; }
        .home-subtitle {
          display: flex;
          align-items: center;
          gap: 12px;
          font-family: var(--font-display);
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--text-secondary);
          margin-bottom: 24px;
          letter-spacing: 0.02em;
        }
        .divider { color: var(--accent-light); }
        .home-bio {
          font-size: 1rem;
          color: var(--text-secondary);
          line-height: 1.8;
          margin-bottom: 36px;
          max-width: 480px;
        }
        .home-actions {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
          margin-bottom: 32px;
        }
        .social-icon-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 42px; height: 42px;
          border-radius: var(--radius-sm);
          background: var(--bg-card);
          border: 1px solid var(--border);
          color: var(--text-secondary);
          transition: var(--transition);
          text-decoration: none;
        }
        .social-icon-btn:hover {
          border-color: var(--accent);
          color: var(--accent-light);
          transform: translateY(-2px);
        }
        .skill-chips { display: flex; flex-wrap: wrap; gap: 8px; }
        
        /* Profile visual */
        .home-visual {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 28px;
        }
        .profile-ring {
          position: relative;
          width: 300px; height: 300px;
        }
        .profile-ring::before {
          content: '';
          position: absolute;
          inset: -3px;
          background: linear-gradient(135deg, var(--accent), var(--accent-2));
          border-radius: 50%;
          animation: spin 8s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        .profile-img-wrap {
          position: absolute;
          inset: 4px;
          background: var(--bg-secondary);
          border-radius: 50%;
          overflow: hidden;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .profile-img {
          width: 100%; height: 100%;
          object-fit: cover;
        }
        .float-badge {
          position: absolute;
          display: flex;
          align-items: center;
          gap: 6px;
          background: var(--bg-card);
          border: 1px solid var(--border-hover);
          border-radius: 100px;
          padding: 8px 14px;
          font-size: 0.78rem;
          font-weight: 600;
          color: var(--text-primary);
          z-index: 2;
          backdrop-filter: blur(10px);
          white-space: nowrap;
        }
        .float-badge svg { color: var(--accent-light); }
        .badge-tl { top: 0; left: -20px; }
        .badge-br { bottom: 20px; right: -20px; }
        .stats-row {
          display: flex;
          gap: 24px;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 20px 28px;
          width: 100%;
        }
        .stat-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2px;
          flex: 1;
        }
        .stat-num { font-family: var(--font-display); font-size: 1.6rem; font-weight: 800; }
        .stat-label { font-size: 0.75rem; color: var(--text-secondary); font-weight: 500; }
        .scroll-hint {
          position: absolute;
          bottom: 32px;
          left: 50%;
          transform: translateX(-50%);
          background: none;
          border: 1px solid var(--border);
          color: var(--text-muted);
          width: 40px; height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: var(--transition);
          animation: float 2s ease-in-out infinite;
          z-index: 1;
        }
        .scroll-hint:hover { border-color: var(--accent); color: var(--accent-light); }
        @media (max-width: 900px) {
          .home-layout { grid-template-columns: 1fr; text-align: center; gap: 48px; }
          .home-content { max-width: 100%; }
          .home-actions { justify-content: center; }
          .skill-chips { justify-content: center; }
          .home-subtitle { justify-content: center; }
          .home-bio { margin: 0 auto 36px; }
          .home-visual { order: -1; }
          .profile-ring { width: 220px; height: 220px; }
        }
        @media (max-width: 480px) {
          .stats-row { gap: 16px; padding: 16px; }
        }
      `}</style>
    </section>
  )
}
