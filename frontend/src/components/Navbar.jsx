import { useState, useEffect } from 'react'
import {
  Menu,
  X,
  Code2,
  Github,
  Download,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react'

import resume from '../assets/vaibhav_satpute_resume.pdf'

const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'projects', label: 'Projects' },
  { id: 'certificates', label: 'Certificates' },
  { id: 'contact', label: 'Contact' },
]

export default function Navbar({ activeSection }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  /* =========================================================
     SCROLL DETECTION
  ========================================================= */

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30)
    }

    onScroll()

    window.addEventListener('scroll', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [])


  /* =========================================================
     MOBILE MENU BODY LOCK
  ========================================================= */

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])


  /* =========================================================
     ESC KEY
  ========================================================= */

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])


  /* =========================================================
     NAVIGATION
  ========================================================= */

  const scrollTo = (id) => {
    document
      .getElementById(id)
      ?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })

    setMenuOpen(false)
  }


  return (
    <>
      {/* =====================================================
          NAVBAR
      ===================================================== */}

      <nav
        className={`professional-navbar ${
          scrolled ? 'navbar-scrolled' : ''
        }`}
      >

        <div className="navbar-container">

          {/* =================================================
              LOGO
          ================================================= */}

          <button
            className="professional-logo"
            onClick={() => scrollTo('home')}
            aria-label="Go to homepage"
          >

            <span className="logo-icon">

              <Code2 size={18} />

            </span>

            <span className="logo-text">

              vaibhav
              <span className="logo-dot">.</span>
              dev

            </span>

          </button>


          {/* =================================================
              DESKTOP NAVIGATION
          ================================================= */}

          <div className="desktop-navigation">

            <div className="nav-pill">

              {navLinks.map((link) => (

                <button
                  key={link.id}
                  className={`professional-nav-link ${
                    activeSection === link.id ? 'active' : ''
                  }`}
                  onClick={() => scrollTo(link.id)}
                >

                  <span>
                    {link.label}
                  </span>

                  {activeSection === link.id && (
                    <span className="active-indicator" />
                  )}

                </button>

              ))}

            </div>


            {/* =================================================
                RIGHT ACTIONS
            ================================================= */}

            <div className="navbar-actions">

              {/* GitHub */}

              <a
                href="https://github.com/Vaibhav-S551"
                target="_blank"
                rel="noopener noreferrer"
                className="navbar-github"
                aria-label="Visit GitHub profile"
              >

                <Github size={17} />

              </a>


              {/* Resume */}

              <a
                href={resume}
                download="vaibhav_satpute_resume.pdf"
                className="navbar-resume"
              >

                <Download size={15} />

                <span>
                  Resume
                </span>

              </a>


              {/* Contact */}

              <button
                className="navbar-hire"
                onClick={() => scrollTo('contact')}
              >

                <span>
                  Let's Talk
                </span>

                <ArrowUpRight size={15} />

              </button>

            </div>

          </div>


          {/* =================================================
              MOBILE MENU BUTTON
          ================================================= */}

          <button
            className={`mobile-menu-button ${
              menuOpen ? 'menu-active' : ''
            }`}
            onClick={() => setMenuOpen((previous) => !previous)}
            aria-label={
              menuOpen
                ? 'Close navigation menu'
                : 'Open navigation menu'
            }
            aria-expanded={menuOpen}
          >

            {menuOpen ? (
              <X size={21} />
            ) : (
              <Menu size={21} />
            )}

          </button>

        </div>


        {/* =================================================
            NAVBAR BOTTOM GLOW
        ================================================= */}

        <div className="navbar-bottom-glow" />

      </nav>


      {/* =====================================================
          MOBILE MENU
      ===================================================== */}

      <div
        className={`mobile-navigation-overlay ${
          menuOpen ? 'visible' : ''
        }`}
        onClick={() => setMenuOpen(false)}
        aria-hidden={!menuOpen}
      >

        <div
          className={`mobile-navigation ${
            menuOpen ? 'mobile-navigation-open' : ''
          }`}
          onClick={(event) => event.stopPropagation()}
        >

          {/* Mobile header */}

          <div className="mobile-navigation-header">

            <div className="mobile-menu-label">

              <Sparkles size={14} />

              <span>
                Navigation
              </span>

            </div>


            <button
              className="mobile-close-button"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >

              <X size={18} />

            </button>

          </div>


          {/* Mobile links */}

          <div className="mobile-navigation-links">

            {navLinks.map((link, index) => (

              <button
                key={link.id}
                className={`mobile-navigation-link ${
                  activeSection === link.id
                    ? 'mobile-link-active'
                    : ''
                }`}
                onClick={() => scrollTo(link.id)}
              >

                <span className="mobile-link-number">

                  0{index + 1}

                </span>


                <span className="mobile-link-label">

                  {link.label}

                </span>


                {activeSection === link.id && (
                  <span className="mobile-active-dot" />
                )}

              </button>

            ))}

          </div>


          {/* Mobile actions */}

          <div className="mobile-navigation-actions">

            <a
              href={resume}
              download="vaibhav_satpute_resume.pdf"
              className="mobile-resume-button"
              onClick={() => setMenuOpen(false)}
            >

              <Download size={16} />

              <span>
                Download Resume
              </span>

            </a>


            <button
              className="mobile-contact-button"
              onClick={() => scrollTo('contact')}
            >

              <span>
                Let's Work Together
              </span>

              <ArrowUpRight size={16} />

            </button>

          </div>


          {/* Mobile social */}

          <div className="mobile-navigation-footer">

            <span>
              Connect with me
            </span>


            <a
              href="https://github.com/Vaibhav-S551"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >

              <Github size={17} />

            </a>


            <a
              href="https://www.linkedin.com/in/vaibhav-satpute-524334254"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >

              <ArrowUpRight size={17} />

            </a>

          </div>

        </div>

      </div>


      {/* =====================================================
          STYLES
      ===================================================== */}

      <style>{`

        /* =====================================================
           MAIN NAVBAR
        ===================================================== */

        .professional-navbar {

          position: fixed;

          top: 0;
          left: 0;
          right: 0;

          z-index: 1000;

          padding: 18px 0;

          transition:
            padding 0.3s ease;

          pointer-events: none;
        }


        .professional-navbar::before {

          content: '';

          position: absolute;

          inset: 0;

          background:
            linear-gradient(
              180deg,
              rgba(5,5,8,0.72),
              transparent
            );

          opacity: 0;

          transition:
            opacity 0.3s ease;

          pointer-events: none;
        }


        .professional-navbar.navbar-scrolled::before {

          opacity: 1;
        }


        .navbar-container {

          width: min(
            calc(100% - 40px),
            1180px
          );

          margin: 0 auto;

          display: flex;

          align-items: center;

          justify-content: space-between;

          position: relative;

          z-index: 2;

          pointer-events: auto;
        }


        /* =====================================================
           LOGO
        ===================================================== */

        .professional-logo {

          display: inline-flex;

          align-items: center;

          gap: 9px;

          border: none;

          background: none;

          color: #f4f4f5;

          cursor: pointer;

          padding: 5px;

          font-family:
            var(--font-display);

          transition:
            transform 0.25s ease;
        }


        .professional-logo:hover {

          transform:
            translateY(-1px);
        }


        .logo-icon {

          width: 34px;
          height: 34px;

          display: flex;

          align-items: center;
          justify-content: center;

          border-radius: 9px;

          color: #c4b5fd;

          background:
            linear-gradient(
              135deg,
              rgba(124,58,237,0.14),
              rgba(6,182,212,0.06)
            );

          border:
            1px solid
            rgba(167,139,250,0.2);

          box-shadow:
            0 4px 18px
            rgba(124,58,237,0.08);
        }


        .logo-text {

          font-size: 1.08rem;

          font-weight: 800;

          letter-spacing: -0.025em;
        }


        .logo-dot {

          color: #a78bfa;
        }


        /* =====================================================
           DESKTOP NAVIGATION
        ===================================================== */

        .desktop-navigation {

          display: flex;

          align-items: center;

          gap: 12px;
        }


        .nav-pill {

          display: flex;

          align-items: center;

          gap: 2px;

          padding: 4px;

          border:
            1px solid
            rgba(255,255,255,0.07);

          background:
            rgba(10,10,15,0.45);

          backdrop-filter:
            blur(18px);

          -webkit-backdrop-filter:
            blur(18px);

          border-radius: 11px;

          box-shadow:
            0 8px 30px
            rgba(0,0,0,0.12);
        }


        .navbar-scrolled .nav-pill {

          background:
            rgba(10,10,15,0.7);

          border-color:
            rgba(255,255,255,0.09);
        }


        /* =====================================================
           NAV LINKS
        ===================================================== */

        .professional-nav-link {

          position: relative;

          display: flex;

          align-items: center;
          justify-content: center;

          min-width: 82px;

          height: 35px;

          padding:
            0 13px;

          border: none;

          border-radius: 8px;

          background: transparent;

          color: #8f8f98;

          font-family:
            var(--font-body);

          font-size: 0.72rem;

          font-weight: 600;

          cursor: pointer;

          transition:
            color 0.2s ease,
            background 0.2s ease;
        }


        .professional-nav-link:hover {

          color: #e4e4e7;

          background:
            rgba(255,255,255,0.035);
        }


        .professional-nav-link.active {

          color: #c4b5fd;

          background:
            rgba(124,58,237,0.08);
        }


        .active-indicator {

          position: absolute;

          bottom: 4px;

          left: 50%;

          transform:
            translateX(-50%);

          width: 4px;
          height: 4px;

          border-radius: 50%;

          background:
            #a78bfa;

          box-shadow:
            0 0 8px
            rgba(167,139,250,0.75);
        }


        /* =====================================================
           NAV ACTIONS
        ===================================================== */

        .navbar-actions {

          display: flex;

          align-items: center;

          gap: 7px;
        }


        .navbar-github {

          width: 35px;
          height: 35px;

          display: flex;

          align-items: center;
          justify-content: center;

          border-radius: 8px;

          color: #85858e;

          border:
            1px solid
            rgba(255,255,255,0.07);

          background:
            rgba(255,255,255,0.025);

          transition:
            all 0.2s ease;
        }


        .navbar-github:hover {

          color: #f4f4f5;

          border-color:
            rgba(167,139,250,0.3);

          background:
            rgba(124,58,237,0.07);

          transform:
            translateY(-1px);
        }


        .navbar-resume {

          display: flex;

          align-items: center;

          gap: 6px;

          height: 35px;

          padding:
            0 12px;

          border-radius: 8px;

          color: #a1a1aa;

          text-decoration: none;

          border:
            1px solid
            rgba(255,255,255,0.07);

          background:
            rgba(255,255,255,0.025);

          font-size: 0.7rem;

          font-weight: 600;

          transition:
            all 0.2s ease;
        }


        .navbar-resume:hover {

          color: #e4e4e7;

          border-color:
            rgba(167,139,250,0.3);

          transform:
            translateY(-1px);
        }


        .navbar-hire {

          display: flex;

          align-items: center;

          gap: 5px;

          height: 35px;

          padding:
            0 13px;

          border-radius: 8px;

          border:
            1px solid
            rgba(167,139,250,0.28);

          background:
            linear-gradient(
              135deg,
              rgba(124,58,237,0.18),
              rgba(124,58,237,0.08)
            );

          color: #d8ccff;

          font-size: 0.7rem;

          font-weight: 700;

          cursor: pointer;

          transition:
            all 0.2s ease;
        }


        .navbar-hire:hover {

          color: white;

          border-color:
            rgba(167,139,250,0.5);

          background:
            linear-gradient(
              135deg,
              rgba(124,58,237,0.3),
              rgba(124,58,237,0.12)
            );

          transform:
            translateY(-1px);

          box-shadow:
            0 6px 20px
            rgba(124,58,237,0.12);
        }


        /* =====================================================
           BOTTOM GLOW
        ===================================================== */

        .navbar-bottom-glow {

          position: absolute;

          left: 50%;

          bottom: -1px;

          width: 55%;

          height: 1px;

          transform:
            translateX(-50%);

          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(124,58,237,0.28),
              rgba(6,182,212,0.18),
              transparent
            );

          opacity: 0;

          transition:
            opacity 0.3s ease;
        }


        .navbar-scrolled .navbar-bottom-glow {

          opacity: 1;
        }


        /* =====================================================
           MOBILE BUTTON
        ===================================================== */

        .mobile-menu-button {

          display: none;

          width: 38px;
          height: 38px;

          align-items: center;
          justify-content: center;

          border-radius: 9px;

          color: #b4b4bc;

          background:
            rgba(255,255,255,0.035);

          border:
            1px solid
            rgba(255,255,255,0.08);

          cursor: pointer;

          transition:
            all 0.2s ease;
        }


        .mobile-menu-button:hover,
        .mobile-menu-button.menu-active {

          color: #d8ccff;

          border-color:
            rgba(167,139,250,0.35);

          background:
            rgba(124,58,237,0.08);
        }


        /* =====================================================
           MOBILE OVERLAY
        ===================================================== */

        .mobile-navigation-overlay {

          position: fixed;

          inset: 0;

          z-index: 998;

          background:
            rgba(0,0,0,0.5);

          backdrop-filter:
            blur(5px);

          opacity: 0;

          visibility: hidden;

          transition:
            opacity 0.3s ease,
            visibility 0.3s ease;
        }


        .mobile-navigation-overlay.visible {

          opacity: 1;

          visibility: visible;
        }


        /* =====================================================
           MOBILE PANEL
        ===================================================== */

        .mobile-navigation {

          position: absolute;

          top: 0;
          left: 0;
          right: 0;

          padding:
            82px 22px 25px;

          background:
            linear-gradient(
              180deg,
              #0b0b10 0%,
              #08080c 100%
            );

          border-bottom:
            1px solid
            rgba(255,255,255,0.08);

          box-shadow:
            0 25px 70px
            rgba(0,0,0,0.5);

          transform:
            translateY(-25px);

          opacity: 0;

          transition:
            transform 0.35s
            cubic-bezier(0.22,1,0.36,1),
            opacity 0.3s ease;
        }


        .mobile-navigation-open {

          transform:
            translateY(0);

          opacity: 1;
        }


        /* =====================================================
           MOBILE HEADER
        ===================================================== */

        .mobile-navigation-header {

          display: flex;

          align-items: center;

          justify-content: space-between;

          margin-bottom: 20px;

          padding-bottom: 14px;

          border-bottom:
            1px solid
            rgba(255,255,255,0.06);
        }


        .mobile-menu-label {

          display: flex;

          align-items: center;

          gap: 7px;

          color: #71717a;

          font-size: 0.65rem;

          font-weight: 700;

          text-transform: uppercase;

          letter-spacing: 0.12em;
        }


        .mobile-menu-label svg {

          color: #a78bfa;
        }


        .mobile-close-button {

          width: 32px;
          height: 32px;

          display: flex;

          align-items: center;
          justify-content: center;

          border-radius: 7px;

          border:
            1px solid
            rgba(255,255,255,0.07);

          background:
            rgba(255,255,255,0.025);

          color: #8f8f98;

          cursor: pointer;
        }


        /* =====================================================
           MOBILE LINKS
        ===================================================== */

        .mobile-navigation-links {

          display: flex;

          flex-direction: column;

          gap: 4px;
        }


        .mobile-navigation-link {

          position: relative;

          display: flex;

          align-items: center;

          gap: 14px;

          width: 100%;

          height: 53px;

          padding:
            0 14px;

          border: 1px solid transparent;

          border-radius: 9px;

          background: transparent;

          color: #898991;

          text-align: left;

          cursor: pointer;

          transition:
            all 0.2s ease;
        }


        .mobile-navigation-link:hover {

          color: #e4e4e7;

          background:
            rgba(255,255,255,0.025);
        }


        .mobile-link-active {

          color: #c4b5fd;

          background:
            rgba(124,58,237,0.08);

          border-color:
            rgba(124,58,237,0.12);
        }


        .mobile-link-number {

          width: 25px;

          color: #4f4f58;

          font-family:
            var(--font-display);

          font-size: 0.6rem;

          font-weight: 700;
        }


        .mobile-link-active .mobile-link-number {

          color: #8b5cf6;
        }


        .mobile-link-label {

          font-size: 0.85rem;

          font-weight: 600;
        }


        .mobile-active-dot {

          position: absolute;

          right: 15px;

          width: 5px;
          height: 5px;

          border-radius: 50%;

          background:
            #a78bfa;

          box-shadow:
            0 0 8px
            rgba(167,139,250,0.8);
        }


        /* =====================================================
           MOBILE ACTIONS
        ===================================================== */

        .mobile-navigation-actions {

          display: grid;

          grid-template-columns: 1fr 1fr;

          gap: 8px;

          margin-top: 20px;

          padding-top: 18px;

          border-top:
            1px solid
            rgba(255,255,255,0.06);
        }


        .mobile-resume-button,
        .mobile-contact-button {

          height: 42px;

          display: flex;

          align-items: center;
          justify-content: center;

          gap: 7px;

          border-radius: 8px;

          font-size: 0.68rem;

          font-weight: 700;

          text-decoration: none;

          cursor: pointer;
        }


        .mobile-resume-button {

          color: #a1a1aa;

          background:
            rgba(255,255,255,0.025);

          border:
            1px solid
            rgba(255,255,255,0.08);
        }


        .mobile-contact-button {

          color: white;

          border:
            1px solid
            rgba(167,139,250,0.25);

          background:
            linear-gradient(
              135deg,
              #7c3aed,
              #6d28d9
            );
        }


        /* =====================================================
           MOBILE FOOTER
        ===================================================== */

        .mobile-navigation-footer {

          display: flex;

          align-items: center;

          gap: 8px;

          margin-top: 18px;

          color: #4f4f58;

          font-size: 0.6rem;
        }


        .mobile-navigation-footer span {

          margin-right: auto;
        }


        .mobile-navigation-footer a {

          width: 30px;
          height: 30px;

          display: flex;

          align-items: center;
          justify-content: center;

          border-radius: 7px;

          color: #777780;

          background:
            rgba(255,255,255,0.025);

          border:
            1px solid
            rgba(255,255,255,0.06);
        }


        /* =====================================================
           RESPONSIVE
        ===================================================== */

        @media (max-width: 900px) {

          .desktop-navigation {

            display: none;
          }


          .mobile-menu-button {

            display: flex;
          }

        }


        @media (max-width: 500px) {

          .navbar-container {

            width:
              calc(100% - 28px);
          }


          .professional-navbar {

            padding: 14px 0;
          }


          .logo-text {

            font-size: 0.98rem;
          }


          .logo-icon {

            width: 32px;
            height: 32px;
          }


          .mobile-navigation {

            padding:
              76px 17px 20px;
          }


          .mobile-navigation-actions {

            grid-template-columns: 1fr;
          }

        }


        /* =====================================================
           ACCESSIBILITY
        ===================================================== */

        .professional-logo:focus-visible,
        .professional-nav-link:focus-visible,
        .navbar-github:focus-visible,
        .navbar-resume:focus-visible,
        .navbar-hire:focus-visible,
        .mobile-menu-button:focus-visible,
        .mobile-navigation-link:focus-visible,
        .mobile-close-button:focus-visible {

          outline:
            2px solid
            rgba(167,139,250,0.7);

          outline-offset: 3px;
        }

      `}</style>
    </>
  )
}