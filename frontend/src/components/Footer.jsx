import { Github, Linkedin, Mail, Download, Code2, Heart } from 'lucide-react'
import resume from "../assets/vaibhav_satpute_resume.pdf";

export default function Footer() {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <footer>
      <div className="footer-glow" />
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="footer-logo">
              <Code2 size={22} />
              <span>Vaibhav<span style={{ color: 'var(--accent-light)' }}>.</span>dev</span>
            </div>
            <p className="footer-tagline">
              Building the future, one commit at a time. 
              Open to new opportunities and exciting projects.
            </p>
            <a
              href={resume}
              download="vaibhav_satpute_resume.pdf"
              className="btn btn-primary resume-btn"
            >
              <Download size={16} />
              Download Resume
            </a>
          </div>

          <div className="footer-links">
            <div className="footer-col">
              <h4 className="footer-col-title">Navigate</h4>
              <ul>
                {['home', 'projects', 'certificates', 'contact'].map(id => (
                  <li key={id}>
                    <button className="footer-link" onClick={() => scrollTo(id)}>
                      {id.charAt(0).toUpperCase() + id.slice(1)}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="footer-col">
              <h4 className="footer-col-title">Connect</h4>
              <ul>
                <li><a href="https://github.com/Vaibhav-S551" target="_blank" rel="noopener noreferrer" className="footer-link ext">
                  <Github size={14} /> GitHub
                </a></li>
                <li><a href="https://www.linkedin.com/in/vaibhav-satpute-524334254" target="_blank" rel="noopener noreferrer" className="footer-link ext">
                  <Linkedin size={14} /> LinkedIn
                </a></li>
                <li><a href="mailto:vaibhav.satpute2494@email.com" className="footer-link ext">
                  <Mail size={14} /> Email
                </a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Vaibhav Satputer. All rights reserved.</p>
          <p className="made-with">
            Made with <Heart size={13} fill="currentColor" /> and lots of coffee
          </p>
        </div>
      </div>

      <style>{`
        footer {
          position: relative;
          background: var(--bg-primary);
          border-top: 1px solid var(--border);
          overflow: hidden;
          padding: 70px 0 30px;
        }
        .footer-glow {
          position: absolute;
          top: -100px;
          left: 50%;
          transform: translateX(-50%);
          width: 600px; height: 200px;
          background: radial-gradient(ellipse, rgba(124,58,237,0.08) 0%, transparent 70%);
          pointer-events: none;
        }
        .footer-top {
          display: grid;
          grid-template-columns: 1.5fr 1fr;
          gap: 60px;
          margin-bottom: 48px;
          position: relative;
          z-index: 1;
        }
        .footer-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-display);
          font-size: 1.4rem;
          font-weight: 800;
          color: var(--text-primary);
          margin-bottom: 16px;
        }
        .footer-logo svg { color: var(--accent-light); }
        .footer-tagline {
          font-size: 0.9rem;
          color: var(--text-secondary);
          line-height: 1.7;
          margin-bottom: 28px;
          max-width: 380px;
        }
        .resume-btn { font-size: 0.88rem; }
        .footer-links { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; }
        .footer-col h4 {
          font-family: var(--font-display);
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: var(--text-muted);
          margin-bottom: 20px;
        }
        .footer-col ul { list-style: none; display: flex; flex-direction: column; gap: 10px; }
        .footer-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: none;
          border: none;
          color: var(--text-secondary);
          font-family: var(--font-body);
          font-size: 0.88rem;
          cursor: pointer;
          transition: var(--transition);
          text-decoration: none;
          padding: 0;
        }
        .footer-link:hover { color: var(--accent-light); transform: translateX(3px); }
        .footer-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 24px;
          border-top: 1px solid var(--border);
          font-size: 0.82rem;
          color: var(--text-muted);
          position: relative;
          z-index: 1;
        }
        .made-with {
          display: flex;
          align-items: center;
          gap: 5px;
          color: #ec4899;
        }
        @media (max-width: 768px) {
          .footer-top { grid-template-columns: 1fr; gap: 40px; }
          .footer-bottom { flex-direction: column; gap: 8px; text-align: center; }
        }
        @media (max-width: 480px) {
          .footer-links { grid-template-columns: 1fr; }
        }
      `}</style>
    </footer>
  )
}
