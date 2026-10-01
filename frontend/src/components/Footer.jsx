import {
  Github,
  Linkedin,
  Mail,
  Download,
  Code2,
  Heart,
  ArrowUpRight,
  ArrowUp,
  Sparkles,
  BriefcaseBusiness,
  MapPin,
  Coffee,
} from 'lucide-react'

import resume from '../assets/vaibhav_satpute_resume.pdf'

export default function Footer() {
  const scrollTo = (id) => {
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <footer className="professional-footer">

      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <div className="footer-background" aria-hidden="true">

        <div className="footer-grid" />

        <div className="footer-glow footer-glow-purple" />

        <div className="footer-glow footer-glow-cyan" />

        <div className="footer-line" />

        <div className="footer-dots" />

      </div>


      <div className="container footer-container">

        {/* =================================================
            CTA SECTION
        ================================================= */}

        <div className="footer-cta">

          <div className="footer-cta-content">

            <div className="footer-cta-badge">

              <span className="footer-status-dot" />

              <span>
                Open to opportunities
              </span>

            </div>


            <h2 className="footer-cta-title">

              Let's build something
              <span className="footer-gradient-text">
                meaningful.
              </span>

            </h2>


            <p className="footer-cta-description">

              I'm always interested in building interesting products,
              solving challenging problems, and exploring opportunities
              where technology can create real impact.

            </p>

          </div>


          <div className="footer-cta-actions">

            <a
              href="mailto:vaibhav.satpute2494@email.com"
              className="footer-contact-btn"
            >

              <Mail size={17} />

              <span>
                Start a Conversation
              </span>

              <ArrowUpRight size={15} />

            </a>


            <a
              href={resume}
              download="vaibhav_satpute_resume.pdf"
              className="footer-resume-btn"
            >

              <Download size={16} />

              <span>
                Download Resume
              </span>

            </a>

          </div>

        </div>


        {/* =================================================
            DIVIDER
        ================================================= */}

        <div className="footer-divider" />


        {/* =================================================
            MAIN FOOTER
        ================================================= */}

        <div className="footer-main">


          {/* ===============================================
              BRAND
          =============================================== */}

          <div className="footer-brand">

            <button
              className="footer-brand-logo"
              onClick={scrollToTop}
              aria-label="Back to top"
            >

              <span className="footer-logo-icon">

                <Code2 size={19} />

              </span>

              <span>

                Vaibhav
                <span className="footer-logo-dot">
                  .
                </span>
                dev

              </span>

            </button>


            <p className="footer-brand-description">

              Java Full-Stack Developer focused on building scalable
              web applications, clean backend systems, and
              AI-powered solutions.

            </p>


            <div className="footer-meta">

              <div className="footer-meta-item">

                <MapPin size={14} />

                <span>
                  India
                </span>

              </div>


              <div className="footer-meta-item">

                <BriefcaseBusiness size={14} />

                <span>
                  Full-Stack Development
                </span>

              </div>

            </div>


            {/* Social icons */}

            <div className="footer-socials">

              <a
                href="https://github.com/Vaibhav-S551"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social"
                aria-label="GitHub"
              >

                <Github size={18} />

              </a>


              <a
                href="https://www.linkedin.com/in/vaibhav-satpute-524334254"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social"
                aria-label="LinkedIn"
              >

                <Linkedin size={18} />

              </a>


              <a
                href="mailto:vaibhav.satpute2494@email.com"
                className="footer-social"
                aria-label="Email"
              >

                <Mail size={18} />

              </a>

            </div>

          </div>


          {/* ===============================================
              NAVIGATION
          =============================================== */}

          <div className="footer-column">

            <h3>
              Explore
            </h3>


            <button
              onClick={() => scrollTo('home')}
              className="footer-navigation-link"
            >
              Home
            </button>


            <button
              onClick={() => scrollTo('projects')}
              className="footer-navigation-link"
            >
              Projects
            </button>


            <button
              onClick={() => scrollTo('certificates')}
              className="footer-navigation-link"
            >
              Certificates
            </button>


            <button
              onClick={() => scrollTo('contact')}
              className="footer-navigation-link"
            >
              Contact
            </button>

          </div>


          {/* ===============================================
              TECHNOLOGIES
          =============================================== */}

          <div className="footer-column">

            <h3>
              Technologies
            </h3>


            <div className="footer-tech-list">

              <span>
                Java
              </span>

              <span>
                Spring Boot
              </span>

              <span>
                React
              </span>

              <span>
                Node.js
              </span>

              <span>
                MongoDB
              </span>

              <span>
                Python
              </span>

            </div>

          </div>


          {/* ===============================================
              CURRENT FOCUS
          =============================================== */}

          <div className="footer-column footer-focus">

            <h3>
              Current Focus
            </h3>


            <div className="focus-card">

              <div className="focus-icon">

                <Sparkles size={17} />

              </div>


              <div>

                <strong>
                  AI + Full Stack
                </strong>

                <p>
                  Building intelligent applications
                  with modern web technologies.
                </p>

              </div>

            </div>


            <div className="focus-status">

              <span />

              Currently learning & building

            </div>

          </div>

        </div>


        {/* =================================================
            BOTTOM
        ================================================= */}

        <div className="footer-bottom">

          <p className="footer-copyright">

            © {new Date().getFullYear()}
            {' '}
            <span>
              Vaibhav Satpute
            </span>
            . All rights reserved.

          </p>


          <p className="footer-made">

            Built with

            <Heart
              size={13}
              fill="currentColor"
            />

            <span>
              and
            </span>

            <Coffee size={13} />

            <span>
              lots of coffee
            </span>

          </p>


          <button
            className="footer-top-button"
            onClick={scrollToTop}
            aria-label="Back to top"
          >

            <ArrowUp size={15} />

          </button>

        </div>

      </div>


      {/* =====================================================
          STYLES
      ===================================================== */}

      <style>{`

        /* =====================================================
           FOOTER
        ===================================================== */

        .professional-footer {
          position: relative;

          overflow: hidden;

          padding:
            80px 0 25px;

          background:
            linear-gradient(
              180deg,
              #050505 0%,
              #070708 100%
            );

          border-top:
            1px solid rgba(255,255,255,0.07);

          isolation: isolate;
        }


        /* =====================================================
           BACKGROUND
        ===================================================== */

        .footer-background {
          position: absolute;

          inset: 0;

          overflow: hidden;

          pointer-events: none;

          z-index: -1;
        }


        .footer-grid {
          position: absolute;

          inset: 0;

          background-image:
            linear-gradient(
              rgba(124,58,237,0.025) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(124,58,237,0.025) 1px,
              transparent 1px
            );

          background-size:
            55px 55px;

          mask-image:
            linear-gradient(
              to bottom,
              transparent,
              black 25%,
              black 75%,
              transparent
            );
        }


        .footer-glow {
          position: absolute;

          border-radius: 50%;

          filter: blur(100px);
        }


        .footer-glow-purple {
          width: 500px;
          height: 300px;

          top: -180px;
          left: 20%;

          background:
            radial-gradient(
              ellipse,
              rgba(124,58,237,0.14),
              transparent 70%
            );
        }


        .footer-glow-cyan {
          width: 350px;
          height: 300px;

          right: -150px;
          bottom: -100px;

          background:
            radial-gradient(
              ellipse,
              rgba(6,182,212,0.07),
              transparent 70%
            );
        }


        .footer-line {
          position: absolute;

          width: 800px;
          height: 1px;

          top: 300px;
          left: 50%;

          transform:
            translateX(-50%);

          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(124,58,237,0.2),
              transparent
            );
        }


        .footer-dots {
          position: absolute;

          width: 180px;
          height: 180px;

          right: 7%;
          top: 70px;

          opacity: 0.18;

          background-image:
            radial-gradient(
              rgba(167,139,250,0.5) 1px,
              transparent 1px
            );

          background-size: 14px 14px;

          mask-image:
            radial-gradient(
              circle,
              black,
              transparent 70%
            );
        }


        /* =====================================================
           CTA
        ===================================================== */

        .footer-cta {
          display: flex;

          align-items: center;
          justify-content: space-between;

          gap: 50px;

          padding:
            35px 38px;

          border:
            1px solid rgba(255,255,255,0.08);

          border-radius: 16px;

          background:
            linear-gradient(
              135deg,
              rgba(124,58,237,0.08),
              rgba(255,255,255,0.025)
            );

          backdrop-filter: blur(18px);

          box-shadow:
            0 25px 70px rgba(0,0,0,0.18);

          position: relative;

          overflow: hidden;
        }


        .footer-cta::before {
          content: '';

          position: absolute;

          top: 0;
          left: 0;
          right: 0;

          height: 1px;

          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(167,139,250,0.6),
              rgba(103,232,249,0.5),
              transparent
            );
        }


        .footer-cta-content {
          max-width: 650px;
        }


        .footer-cta-badge {
          display: inline-flex;

          align-items: center;

          gap: 7px;

          padding:
            6px 10px;

          margin-bottom: 14px;

          border-radius: 100px;

          color: #6ee7b7;

          background:
            rgba(16,185,129,0.05);

          border:
            1px solid rgba(52,211,153,0.15);

          font-size: 0.68rem;

          font-weight: 600;
        }


        .footer-status-dot {
          width: 6px;
          height: 6px;

          border-radius: 50%;

          background: #34d399;

          box-shadow:
            0 0 8px rgba(52,211,153,0.7);
        }


        .footer-cta-title {
          margin: 0 0 10px;

          color: #f4f4f5;

          font-size:
            clamp(1.8rem, 3vw, 2.6rem);

          line-height: 1.15;

          letter-spacing: -0.035em;

          font-weight: 800;
        }


        .footer-gradient-text {
          display: block;

          background:
            linear-gradient(
              100deg,
              #c4b5fd,
              #67e8f9
            );

          -webkit-background-clip: text;
          background-clip: text;

          -webkit-text-fill-color: transparent;
        }


        .footer-cta-description {
          max-width: 560px;

          margin: 0;

          color: #8f8f98;

          font-size: 0.82rem;

          line-height: 1.7;
        }


        /* =====================================================
           CTA BUTTONS
        ===================================================== */

        .footer-cta-actions {
          display: flex;

          flex-direction: column;

          gap: 9px;

          min-width: 190px;
        }


        .footer-contact-btn,
        .footer-resume-btn {
          height: 43px;

          display: flex;

          align-items: center;
          justify-content: center;

          gap: 8px;

          border-radius: 8px;

          text-decoration: none;

          font-size: 0.75rem;

          font-weight: 600;

          transition:
            transform 0.25s ease,
            box-shadow 0.25s ease,
            border-color 0.25s ease;
        }


        .footer-contact-btn {
          color: white;

          background:
            linear-gradient(
              135deg,
              #7c3aed,
              #6d28d9
            );

          border:
            1px solid rgba(167,139,250,0.4);

          box-shadow:
            0 8px 25px rgba(124,58,237,0.16);
        }


        .footer-contact-btn:hover {
          transform: translateY(-2px);

          box-shadow:
            0 12px 30px rgba(124,58,237,0.25);
        }


        .footer-resume-btn {
          color: #b4b4bb;

          background:
            rgba(255,255,255,0.025);

          border:
            1px solid rgba(255,255,255,0.08);
        }


        .footer-resume-btn:hover {
          color: white;

          transform: translateY(-2px);

          border-color:
            rgba(167,139,250,0.35);

          background:
            rgba(124,58,237,0.06);
        }


        /* =====================================================
           DIVIDER
        ===================================================== */

        .footer-divider {
          height: 1px;

          margin:
            45px 0;

          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(255,255,255,0.08),
              transparent
            );
        }


        /* =====================================================
           MAIN
        ===================================================== */

        .footer-main {
          display: grid;

          grid-template-columns:
            1.7fr
            0.8fr
            1fr
            1.2fr;

          gap: 55px;
        }


        /* =====================================================
           BRAND
        ===================================================== */

        .footer-brand-logo {
          display: inline-flex;

          align-items: center;

          gap: 9px;

          padding: 0;

          border: none;

          background: transparent;

          color: #f4f4f5;

          font-family: var(--font-display);

          font-size: 1.25rem;

          font-weight: 800;

          cursor: pointer;
        }


        .footer-logo-icon {
          width: 34px;
          height: 34px;

          display: flex;

          align-items: center;
          justify-content: center;

          border-radius: 8px;

          color: #c4b5fd;

          background:
            rgba(124,58,237,0.1);

          border:
            1px solid rgba(124,58,237,0.18);
        }


        .footer-logo-dot {
          color: #a78bfa;
        }


        .footer-brand-description {
          max-width: 330px;

          margin:
            17px 0 18px;

          color: #71717a;

          font-size: 0.76rem;

          line-height: 1.75;
        }


        .footer-meta {
          display: flex;

          flex-direction: column;

          gap: 8px;

          margin-bottom: 20px;
        }


        .footer-meta-item {
          display: flex;

          align-items: center;

          gap: 7px;

          color: #5f5f68;

          font-size: 0.65rem;
        }


        .footer-meta-item svg {
          color: #8b5cf6;
        }


        /* =====================================================
           SOCIAL
        ===================================================== */

        .footer-socials {
          display: flex;

          gap: 7px;
        }


        .footer-social {
          width: 35px;
          height: 35px;

          display: flex;

          align-items: center;
          justify-content: center;

          border-radius: 8px;

          color: #777780;

          background:
            rgba(255,255,255,0.025);

          border:
            1px solid rgba(255,255,255,0.07);

          transition:
            color 0.2s ease,
            transform 0.2s ease,
            border-color 0.2s ease,
            background 0.2s ease;
        }


        .footer-social:hover {
          color: #e4e4e7;

          transform: translateY(-2px);

          border-color:
            rgba(124,58,237,0.35);

          background:
            rgba(124,58,237,0.07);
        }


        /* =====================================================
           COLUMNS
        ===================================================== */

        .footer-column {
          display: flex;

          flex-direction: column;

          align-items: flex-start;
        }


        .footer-column h3 {
          margin: 0 0 18px;

          color: #71717a;

          font-size: 0.65rem;

          text-transform: uppercase;

          letter-spacing: 0.13em;

          font-weight: 700;
        }


        .footer-navigation-link {
          padding: 0;

          margin-bottom: 11px;

          border: none;

          background: none;

          color: #8f8f98;

          font-family: inherit;

          font-size: 0.72rem;

          cursor: pointer;

          transition:
            color 0.2s ease,
            transform 0.2s ease;
        }


        .footer-navigation-link:hover {
          color: #c4b5fd;

          transform: translateX(3px);
        }


        /* =====================================================
           TECHNOLOGIES
        ===================================================== */

        .footer-tech-list {
          display: flex;

          flex-direction: column;

          gap: 10px;
        }


        .footer-tech-list span {
          color: #8f8f98;

          font-size: 0.72rem;

          transition: color 0.2s ease;
        }


        .footer-tech-list span:hover {
          color: #c4b5fd;
        }


        /* =====================================================
           FOCUS
        ===================================================== */

        .focus-card {
          display: flex;

          align-items: flex-start;

          gap: 10px;

          padding: 11px;

          width: 100%;

          border-radius: 9px;

          background:
            rgba(255,255,255,0.025);

          border:
            1px solid rgba(255,255,255,0.06);
        }


        .focus-icon {
          width: 30px;
          height: 30px;

          flex-shrink: 0;

          display: flex;

          align-items: center;
          justify-content: center;

          border-radius: 7px;

          color: #c4b5fd;

          background:
            rgba(124,58,237,0.1);
        }


        .focus-card strong {
          display: block;

          margin-bottom: 4px;

          color: #d4d4d8;

          font-size: 0.7rem;
        }


        .focus-card p {
          margin: 0;

          color: #71717a;

          font-size: 0.6rem;

          line-height: 1.5;
        }


        .focus-status {
          display: flex;

          align-items: center;

          gap: 6px;

          margin-top: 11px;

          color: #52525b;

          font-size: 0.58rem;
        }


        .focus-status span {
          width: 5px;
          height: 5px;

          border-radius: 50%;

          background: #34d399;
        }


        /* =====================================================
           BOTTOM
        ===================================================== */

        .footer-bottom {
          display: flex;

          align-items: center;

          justify-content: space-between;

          gap: 20px;

          margin-top: 55px;

          padding-top: 20px;

          border-top:
            1px solid rgba(255,255,255,0.06);

          color: #52525b;

          font-size: 0.63rem;
        }


        .footer-copyright {
          margin: 0;
        }


        .footer-copyright span {
          color: #71717a;
        }


        .footer-made {
          display: flex;

          align-items: center;

          gap: 5px;

          margin: 0;

          color: #52525b;
        }


        .footer-made svg:first-of-type {
          color: #ec4899;
        }


        .footer-top-button {
          width: 33px;
          height: 33px;

          display: flex;

          align-items: center;
          justify-content: center;

          border-radius: 8px;

          color: #71717a;

          background:
            rgba(255,255,255,0.025);

          border:
            1px solid rgba(255,255,255,0.07);

          cursor: pointer;

          transition:
            color 0.2s ease,
            transform 0.2s ease,
            border-color 0.2s ease;
        }


        .footer-top-button:hover {
          color: #c4b5fd;

          transform: translateY(-2px);

          border-color:
            rgba(124,58,237,0.35);
        }


        /* =====================================================
           RESPONSIVE
        ===================================================== */

        @media (max-width: 1000px) {

          .footer-main {
            grid-template-columns:
              1.5fr
              1fr
              1fr;

            gap: 40px;
          }


          .footer-focus {
            grid-column: span 3;

            max-width: 400px;
          }

        }


        @media (max-width: 768px) {

          .professional-footer {
            padding:
              60px 0 22px;
          }


          .footer-cta {
            flex-direction: column;

            align-items: flex-start;

            padding: 27px;
          }


          .footer-cta-actions {
            width: 100%;

            flex-direction: row;
          }


          .footer-contact-btn,
          .footer-resume-btn {
            flex: 1;
          }


          .footer-main {
            grid-template-columns:
              1fr 1fr;

            gap: 35px;
          }


          .footer-brand {
            grid-column: span 2;
          }


          .footer-focus {
            grid-column: span 2;

            max-width: none;
          }


          .footer-bottom {
            flex-wrap: wrap;
          }

        }


        @media (max-width: 500px) {

          .footer-cta {
            padding: 23px 20px;
          }


          .footer-cta-title {
            font-size: 1.65rem;
          }


          .footer-cta-description {
            font-size: 0.74rem;
          }


          .footer-cta-actions {
            flex-direction: column;
          }


          .footer-contact-btn,
          .footer-resume-btn {
            width: 100%;
          }


          .footer-main {
            grid-template-columns: 1fr;

            gap: 30px;
          }


          .footer-brand,
          .footer-focus {
            grid-column: auto;
          }


          .footer-bottom {
            flex-direction: column;

            text-align: center;

            gap: 12px;
          }


          .footer-top-button {
            order: -1;
          }

        }

      `}</style>

    </footer>
  )
}