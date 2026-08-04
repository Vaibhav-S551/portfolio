import { useState, useEffect } from 'react'
import { Menu, X, Code2 } from 'lucide-react'

const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'projects', label: 'Projects' },
  { id: 'certificates', label: 'Certificates' },
  { id: 'contact', label: 'Contact' },
]

export default function Navbar({ activeSection }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="container navbar-inner">
          <button className="nav-logo" onClick={() => scrollTo('home')}>
            <Code2 size={20} />
            <span>vaibhav<span className="logo-accent">.</span>dev</span>
          </button>

          <ul className="nav-links">
            {navLinks.map(link => (
              <li key={link.id}>
                <button
                  className={`nav-link ${activeSection === link.id ? 'active' : ''}`}
                  onClick={() => scrollTo(link.id)}
                >
                  {link.label}
                  {activeSection === link.id && <span className="nav-indicator" />}
                </button>
              </li>
            ))}
            <li>
              <button className="btn btn-ghost nav-cta" onClick={() => scrollTo('contact')}>
                Hire Me
              </button>
            </li>
          </ul>

          <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <ul>
          {navLinks.map(link => (
            <li key={link.id}>
              <button
                className={`mobile-nav-link ${activeSection === link.id ? 'active' : ''}`}
                onClick={() => scrollTo(link.id)}
              >
                {link.label}
              </button>
            </li>
          ))}
          <li>
            <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={() => scrollTo('contact')}>
              Hire Me
            </button>
          </li>
        </ul>
      </div>

      <style>{`
        .navbar {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 1000;
          padding: 20px 0;
          transition: all 0.4s ease;
        }
        .navbar.scrolled {
          padding: 12px 0;
          background: rgba(10, 10, 15, 0.85);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--border);
          box-shadow: 0 4px 30px rgba(0,0,0,0.3);
        }
        .navbar-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .nav-logo {
          display: flex;
          align-items: center;
          gap: 8px;
          background: none;
          border: none;
          color: var(--text-primary);
          font-family: var(--font-display);
          font-size: 1.2rem;
          font-weight: 700;
          cursor: pointer;
          transition: var(--transition);
        }
        .nav-logo svg { color: var(--accent-light); }
        .logo-accent { color: var(--accent-light); }
        .nav-links {
          display: flex;
          align-items: center;
          gap: 4px;
          list-style: none;
        }
        .nav-link {
          position: relative;
          background: none;
          border: none;
          color: var(--text-secondary);
          font-family: var(--font-body);
          font-size: 0.9rem;
          font-weight: 500;
          padding: 8px 16px;
          cursor: pointer;
          transition: var(--transition);
          border-radius: var(--radius-sm);
        }
        .nav-link:hover { color: var(--text-primary); }
        .nav-link.active { color: var(--accent-light); }
        .nav-indicator {
          position: absolute;
          bottom: 4px;
          left: 50%;
          transform: translateX(-50%);
          width: 4px;
          height: 4px;
          background: var(--accent-light);
          border-radius: 50%;
        }
        .nav-cta { font-size: 0.85rem; padding: 8px 20px; }
        .hamburger {
          display: none;
          background: none;
          border: 1px solid var(--border);
          color: var(--text-primary);
          padding: 8px;
          border-radius: var(--radius-sm);
          cursor: pointer;
          transition: var(--transition);
        }
        .hamburger:hover { border-color: var(--accent); color: var(--accent-light); }
        .mobile-menu {
          display: none;
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 999;
          background: var(--bg-secondary);
          border-bottom: 1px solid var(--border);
          padding: 80px 24px 30px;
          transform: translateY(-100%);
          transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .mobile-menu.open { transform: translateY(0); }
        .mobile-menu ul { list-style: none; display: flex; flex-direction: column; gap: 8px; }
        .mobile-nav-link {
          display: block;
          width: 100%;
          text-align: left;
          background: none;
          border: none;
          color: var(--text-secondary);
          font-family: var(--font-body);
          font-size: 1.1rem;
          font-weight: 500;
          padding: 14px 16px;
          cursor: pointer;
          border-radius: var(--radius-sm);
          transition: var(--transition);
        }
        .mobile-nav-link:hover, .mobile-nav-link.active {
          background: rgba(124,58,237,0.1);
          color: var(--accent-light);
        }
        @media (max-width: 768px) {
          .nav-links { display: none; }
          .hamburger { display: flex; }
          .mobile-menu { display: block; }
        }
      `}</style>
    </>
  )
}
