import {
  Github,
  Linkedin,
  ArrowDown,
  ArrowUpRight,
  Code2,
  BrainCircuit,
  Database,
  Server,
  Cpu,
  Sparkles,
  Terminal,
  Layers3,
  ShieldCheck,
  BriefcaseBusiness,
  GraduationCap,
} from 'lucide-react'

import profile from '../assets/profile_img.jpeg'

const skills = [
  'Java(core & Advanced)',
  'Spring Boot',
  'kafka',
  'Hibernate',
  'Spring Data Jpa',
  'AWS',
  'MicroServices',
  'Redis',
  'Jwt',
  'Spring Security',
  'Git',
  'GitHub',
  'Junit',
  'React',
  'JavaScript',
  'Node.js',
  'PostgreSQL',
  'MongoDB',
  'MySQL',
  'Python',
  'AI / ML',
  'Docker',
]

const techStack = [
  {
    name: 'Java',
    icon: Code2,
  },
  {
    name: 'Spring Boot',
    icon: Server,
  },
  {
    name: 'React',
    icon: Layers3,
  },
  {
    name: 'AI / ML',
    icon: BrainCircuit,
  },
]

export default function Home() {
  const scrollToProjects = () => {
    document
      .getElementById('projects')
      ?.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToContact = () => {
    document
      .getElementById('contact')
      ?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="home" className="professional-home">

      {/* ================= BACKGROUND ================= */}

      <div className="professional-bg" aria-hidden="true">

        <div className="bg-grid" />

        <div className="bg-glow bg-glow-one" />
        <div className="bg-glow bg-glow-two" />

        <div className="bg-line bg-line-one" />
        <div className="bg-line bg-line-two" />

        <div className="bg-dot-pattern" />

      </div>


      {/* ================= MAIN CONTENT ================= */}

      <div className="container professional-container">

        <div className="professional-layout">


          {/* ==================================================
              LEFT CONTENT
          ================================================== */}

          <div className="professional-content">


            {/* Availability */}

            <div className="availability-badge animate-fade-up">

              <span className="availability-dot" />

              <span>
                Available for opportunities
              </span>

              <ArrowUpRight size={13} />

            </div>


            {/* Heading */}

            <h1
              className="professional-title animate-fade-up"
              style={{ animationDelay: '0.1s' }}
            >

              <span className="hello-text">
                Hello, I'm
              </span>

              <span className="name-text">
                Vaibhav Satpute
              </span>

            </h1>


            {/* Role */}

            <div
              className="professional-role animate-fade-up"
              style={{ animationDelay: '0.2s' }}
            >

              <span>
                Java Full-Stack Developer
              </span>

              <span className="role-separator">
                •
              </span>

              <span>
                AI Enthusiast
              </span>

            </div>


            {/* Description */}

            <p
              className="professional-description animate-fade-up"
              style={{ animationDelay: '0.3s' }}
            >
              I build scalable web applications and intelligent software
              solutions using modern technologies. My focus is on creating
              clean backend systems, intuitive user experiences, and
              practical AI-powered applications.
            </p>


            {/* CTA */}

            <div
              className="professional-actions animate-fade-up"
              style={{ animationDelay: '0.4s' }}
            >

              <button
                className="professional-primary-btn"
                onClick={scrollToProjects}
              >

                <span>
                  Explore My Work
                </span>

                <ArrowUpRight size={17} />

              </button>


              <button
                className="professional-secondary-btn"
                onClick={scrollToContact}
              >
                Get In Touch
              </button>

            </div>


            {/* Social */}

            <div
              className="professional-social animate-fade-up"
              style={{ animationDelay: '0.45s' }}
            >

              <span className="social-label">
                Connect with me
              </span>


              <a
                href="https://github.com/Vaibhav-S551"
                target="_blank"
                rel="noopener noreferrer"
                className="professional-social-link"
              >

                <Github size={17} />

                <span>
                  GitHub
                </span>

                <ArrowUpRight size={12} />

              </a>


              <a
                href="https://www.linkedin.com/in/vaibhav-satpute-524334254"
                target="_blank"
                rel="noopener noreferrer"
                className="professional-social-link"
              >

                <Linkedin size={17} />

                <span>
                  LinkedIn
                </span>

                <ArrowUpRight size={12} />

              </a>

            </div>


            {/* Skills */}

            <div
              className="professional-skills animate-fade-up"
              style={{ animationDelay: '0.5s' }}
            >

              <div className="skills-label">

                <Sparkles size={14} />

                <span>
                  Core Technologies
                </span>

              </div>


              <div className="professional-skill-list">

                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="professional-skill"
                  >
                    {skill}
                  </span>
                ))}

              </div>

            </div>

          </div>


          {/* ==================================================
              RIGHT PROFILE
          ================================================== */}

          <div
            className="professional-profile animate-fade-up"
            style={{ animationDelay: '0.25s' }}
          >


            {/* Developer card */}

            <div className="profile-card">


              {/* Card header */}

              <div className="profile-card-header">

                <div className="window-controls">

                  <span />
                  <span />
                  <span />

                </div>

                <div className="profile-card-title">

                  <Terminal size={13} />

                  vaibhav.dev

                </div>

              </div>


              {/* Profile image */}

              <div className="profile-image-section">

                <div className="profile-image-glow" />

                <div className="profile-image-border">

                  <div className="profile-image-container">

                    <img
                      src={profile}
                      alt="Vaibhav Satpute"
                      className="professional-profile-image"
                    />

                  </div>

                </div>


                {/* Status */}

                <div className="profile-status">

                  <span className="profile-status-dot" />

                  Open to work

                </div>

              </div>


              {/* Developer information */}

              <div className="profile-information">

                <div className="profile-name">
                  Vaibhav Satpute
                </div>

                <div className="profile-position">
                  Java Full-Stack Developer
                </div>


                <div className="profile-location">
                  Building web applications & AI solutions
                </div>


                {/* Stack */}

                <div className="profile-stack">

                  {techStack.map(
                    ({ name, icon: Icon }) => (
                      <div
                        key={name}
                        className="stack-item"
                      >

                        <Icon size={15} />

                        <span>
                          {name}
                        </span>

                      </div>
                    )
                  )}

                </div>

              </div>


              {/* Developer metadata */}

              <div className="profile-footer">

                <div className="profile-footer-item">

                  <BriefcaseBusiness size={15} />

                  <div>

                    <span>
                      Focus
                    </span>

                    <strong>
                      Full Stack
                    </strong>

                  </div>

                </div>


                <div className="profile-footer-divider" />


                <div className="profile-footer-item">

                  <BrainCircuit size={15} />

                  <div>

                    <span>
                      Interest
                    </span>

                    <strong>
                      AI / ML
                    </strong>

                  </div>

                </div>

              </div>

            </div>


            {/* Floating technology cards */}

            <div className="floating-card floating-card-one">

              <div className="floating-card-icon purple">
                <Code2 size={17} />
              </div>

              <div>

                <strong>
                  Backend
                </strong>

                <span>
                  Java + Spring
                </span>

              </div>

            </div>


            <div className="floating-card floating-card-two">

              <div className="floating-card-icon cyan">
                <BrainCircuit size={17} />
              </div>

              <div>

                <strong>
                  AI / ML
                </strong>

                <span>
                  Intelligent Apps
                </span>

              </div>

            </div>


          </div>

        </div>


        {/* ==================================================
            BOTTOM STATS
        ================================================== */}

        <div
          className="professional-stats animate-fade-up"
          style={{ animationDelay: '0.6s' }}
        >

          <div className="professional-stat">

            <div className="stat-icon">
              <Layers3 size={17} />
            </div>

            <div>
              <strong>6+</strong>
              <span>Projects Built</span>
            </div>

          </div>


          <div className="professional-stat-divider" />


          <div className="professional-stat">

            <div className="stat-icon">
              <Code2 size={17} />
            </div>

            <div>
              <strong>10+</strong>
              <span>Technologies</span>
            </div>

          </div>


          <div className="professional-stat-divider" />


          <div className="professional-stat">

            <div className="stat-icon">
              <Database size={17} />
            </div>

            <div>
              <strong>Full Stack</strong>
              <span>Development</span>
            </div>

          </div>


          <div className="professional-stat-divider" />


          <div className="professional-stat">

            <div className="stat-icon">
              <Cpu size={17} />
            </div>

            <div>
              <strong>AI</strong>
              <span>Engineering</span>
            </div>

          </div>

        </div>


        {/* Scroll */}

        <button
          className="professional-scroll"
          onClick={scrollToProjects}
          aria-label="Scroll to projects"
        >

          <span>
            Scroll to explore
          </span>

          <ArrowDown size={15} />

        </button>

      </div>


      {/* ================= STYLES ================= */}

      <style>{`

        /* ==================================================
           SECTION
        ================================================== */

        .professional-home {
          position: relative;
          min-height: 100vh;

          padding-top: 120px;
          padding-bottom: 95px;

          display: flex;
          align-items: center;

          overflow: hidden;

          background:
            radial-gradient(
              circle at 75% 20%,
              rgba(124, 58, 237, 0.07),
              transparent 28%
            ),
            radial-gradient(
              circle at 15% 80%,
              rgba(6, 182, 212, 0.045),
              transparent 25%
            ),
            #050505;

          isolation: isolate;
        }


        /* ==================================================
           BACKGROUND
        ================================================== */

        .professional-bg {
          position: absolute;
          inset: 0;

          overflow: hidden;

          pointer-events: none;

          z-index: -1;
        }


        .bg-grid {
          position: absolute;
          inset: 0;

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

          background-size: 60px 60px;

          mask-image:
            linear-gradient(
              to bottom,
              black 20%,
              transparent 100%
            );
        }


        .bg-glow {
          position: absolute;

          border-radius: 50%;

          filter: blur(100px);
        }


        .bg-glow-one {
          width: 550px;
          height: 550px;

          right: -220px;
          top: -220px;

          background:
            radial-gradient(
              circle,
              rgba(124,58,237,0.16),
              transparent 68%
            );
        }


        .bg-glow-two {
          width: 400px;
          height: 400px;

          left: -200px;
          bottom: -120px;

          background:
            radial-gradient(
              circle,
              rgba(6,182,212,0.09),
              transparent 68%
            );
        }


        .bg-line {
          position: absolute;

          width: 800px;
          height: 1px;

          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(124,58,237,0.25),
              transparent
            );
        }


        .bg-line-one {
          right: -300px;
          top: 35%;

          transform: rotate(-28deg);
        }


        .bg-line-two {
          left: -350px;
          bottom: 25%;

          transform: rotate(25deg);
        }


        .bg-dot-pattern {
          position: absolute;

          width: 300px;
          height: 300px;

          right: 10%;
          bottom: 5%;

          opacity: 0.18;

          background-image:
            radial-gradient(
              rgba(167,139,250,0.5) 1px,
              transparent 1px
            );

          background-size: 16px 16px;

          mask-image:
            radial-gradient(
              circle,
              black,
              transparent 70%
            );
        }


        /* ==================================================
           LAYOUT
        ================================================== */

        .professional-container {
          width: 100%;

          position: relative;
          z-index: 2;
        }


        .professional-layout {
          display: grid;

          grid-template-columns:
            minmax(0, 1fr)
            430px;

          gap: 85px;

          align-items: center;
        }


        .professional-content {
          max-width: 650px;
        }


        /* ==================================================
           AVAILABILITY
        ================================================== */

        .availability-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;

          padding: 7px 11px;

          border-radius: 100px;

          background:
            rgba(16,185,129,0.05);

          border:
            1px solid rgba(52,211,153,0.18);

          color: #6ee7b7;

          font-size: 0.76rem;
          font-weight: 600;

          margin-bottom: 25px;

          backdrop-filter: blur(10px);
        }


        .availability-dot {
          width: 7px;
          height: 7px;

          border-radius: 50%;

          background: #34d399;

          box-shadow:
            0 0 0 4px rgba(52,211,153,0.08),
            0 0 12px rgba(52,211,153,0.6);

          animation:
            professional-pulse 2s ease-in-out infinite;
        }


        /* ==================================================
           TITLE
        ================================================== */

        .professional-title {
          display: flex;
          flex-direction: column;

          margin: 0 0 20px;

          line-height: 1;

          letter-spacing: -0.055em;
        }


        .hello-text {
          color: #a1a1aa;

          font-size:
            clamp(1.3rem, 2vw, 1.7rem);

          font-weight: 500;

          letter-spacing: -0.025em;

          margin-bottom: 12px;
        }


        .name-text {
          font-size:
            clamp(3rem, 5.8vw, 5.1rem);

          font-weight: 800;

          background:
            linear-gradient(
              105deg,
              #ffffff 0%,
              #e9d5ff 42%,
              #67e8f9 90%
            );

          -webkit-background-clip: text;
          background-clip: text;

          -webkit-text-fill-color: transparent;
        }


        /* ==================================================
           ROLE
        ================================================== */

        .professional-role {
          display: flex;
          align-items: center;
          gap: 11px;

          color: #d4d4d8;

          font-size: 1rem;
          font-weight: 600;

          margin-bottom: 24px;
        }


        .role-separator {
          color: #71717a;
        }


        /* ==================================================
           DESCRIPTION
        ================================================== */

        .professional-description {
          max-width: 590px;

          margin: 0 0 32px;

          color: #a1a1aa;

          font-size: 0.97rem;

          line-height: 1.85;
        }


        /* ==================================================
           ACTIONS
        ================================================== */

        .professional-actions {
          display: flex;
          align-items: center;
          flex-wrap: wrap;

          gap: 10px;

          margin-bottom: 25px;
        }


        .professional-primary-btn,
        .professional-secondary-btn {
          height: 44px;

          display: inline-flex;
          align-items: center;
          justify-content: center;

          gap: 8px;

          padding: 0 17px;

          border-radius: 8px;

          cursor: pointer;

          font-family: inherit;

          font-size: 0.8rem;
          font-weight: 600;

          transition:
            transform 0.25s ease,
            border-color 0.25s ease,
            background 0.25s ease,
            box-shadow 0.25s ease;
        }


        .professional-primary-btn {
          color: white;

          border: 1px solid
            rgba(167,139,250,0.45);

          background:
            linear-gradient(
              135deg,
              #7c3aed,
              #6d28d9
            );

          box-shadow:
            0 8px 25px
            rgba(124,58,237,0.18);
        }


        .professional-primary-btn:hover {
          transform: translateY(-2px);

          box-shadow:
            0 12px 35px
            rgba(124,58,237,0.28);
        }


        .professional-secondary-btn {
          color: #d4d4d8;

          background:
            rgba(255,255,255,0.025);

          border:
            1px solid rgba(255,255,255,0.09);
        }


        .professional-secondary-btn:hover {
          transform: translateY(-2px);

          color: white;

          border-color:
            rgba(167,139,250,0.35);

          background:
            rgba(124,58,237,0.06);
        }


        /* ==================================================
           SOCIAL
        ================================================== */

        .professional-social {
          display: flex;
          align-items: center;
          flex-wrap: wrap;

          gap: 8px;

          margin-bottom: 32px;
        }


        .social-label {
          color: #52525b;

          font-size: 0.68rem;

          margin-right: 4px;
        }


        .professional-social-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;

          height: 34px;

          padding: 0 10px;

          color: #a1a1aa;

          border:
            1px solid rgba(255,255,255,0.07);

          background:
            rgba(255,255,255,0.02);

          border-radius: 7px;

          text-decoration: none;

          font-size: 0.68rem;
          font-weight: 600;

          transition:
            color 0.2s ease,
            transform 0.2s ease,
            border-color 0.2s ease;
        }


        .professional-social-link:hover {
          color: white;

          transform: translateY(-2px);

          border-color:
            rgba(124,58,237,0.35);
        }


        /* ==================================================
           SKILLS
        ================================================== */

        .professional-skills {
          border-top:
            1px solid rgba(255,255,255,0.06);

          padding-top: 20px;
        }


        .skills-label {
          display: flex;
          align-items: center;
          gap: 6px;

          margin-bottom: 12px;

          color: #71717a;

          font-size: 0.67rem;

          text-transform: uppercase;

          letter-spacing: 0.12em;
        }


        .skills-label svg {
          color: #a78bfa;
        }


        .professional-skill-list {
          display: flex;
          flex-wrap: wrap;

          gap: 6px;
        }


        .professional-skill {
          padding: 6px 9px;

          border-radius: 6px;

          color: #a1a1aa;

          background:
            rgba(255,255,255,0.025);

          border:
            1px solid rgba(255,255,255,0.06);

          font-size: 0.67rem;

          transition:
            color 0.2s ease,
            border-color 0.2s ease,
            transform 0.2s ease;
        }


        .professional-skill:hover {
          color: #e4e4e7;

          border-color:
            rgba(124,58,237,0.3);

          transform: translateY(-2px);
        }


        /* ==================================================
           PROFILE
        ================================================== */

        .professional-profile {
          position: relative;

          min-height: 560px;

          display: flex;
          align-items: center;
          justify-content: center;
        }


        .profile-card {
          width: 350px;

          border:
            1px solid rgba(255,255,255,0.09);

          border-radius: 16px;

          overflow: hidden;

          background:
            linear-gradient(
              145deg,
              rgba(20,20,23,0.94),
              rgba(9,9,11,0.94)
            );

          backdrop-filter: blur(20px);

          box-shadow:
            0 30px 80px rgba(0,0,0,0.35);

          position: relative;

          z-index: 3;
        }


        .profile-card::before {
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


        /* ==================================================
           CARD HEADER
        ================================================== */

        .profile-card-header {
          height: 40px;

          display: flex;
          align-items: center;
          justify-content: space-between;

          padding: 0 13px;

          border-bottom:
            1px solid rgba(255,255,255,0.06);

          background:
            rgba(255,255,255,0.015);
        }


        .window-controls {
          display: flex;
          gap: 5px;
        }


        .window-controls span {
          width: 7px;
          height: 7px;

          border-radius: 50%;

          background: #3f3f46;
        }


        .profile-card-title {
          display: flex;
          align-items: center;
          gap: 5px;

          color: #71717a;

          font-family: monospace;

          font-size: 0.62rem;
        }


        /* ==================================================
           IMAGE
        ================================================== */

        .profile-image-section {
          position: relative;

          display: flex;
          align-items: center;
          justify-content: center;

          padding: 30px 20px 20px;
        }


        .profile-image-glow {
          position: absolute;

          width: 220px;
          height: 220px;

          border-radius: 50%;

          background:
            radial-gradient(
              circle,
              rgba(124,58,237,0.2),
              transparent 68%
            );

          filter: blur(25px);
        }


        .profile-image-border {
          position: relative;

          width: 190px;
          height: 190px;

          padding: 2px;

          border-radius: 50%;

          background:
            linear-gradient(
              135deg,
              rgba(167,139,250,0.8),
              rgba(103,232,249,0.65)
            );

          box-shadow:
            0 0 50px
            rgba(124,58,237,0.14);
        }


        .profile-image-container {
          width: 100%;
          height: 100%;

          padding: 5px;

          border-radius: 50%;

          background: #09090b;
        }


        .professional-profile-image {
          display: block;

          width: 100%;
          height: 100%;

          object-fit: cover;

          border-radius: 50%;

          /* IMPORTANT:
             No rotation animation */
          transform: none;

          transition:
            transform 0.35s ease,
            filter 0.35s ease;
        }


        .profile-image-border:hover
        .professional-profile-image {
          transform: scale(1.025);

          filter: brightness(1.04);
        }


        /* ==================================================
           PROFILE STATUS
        ================================================== */

        .profile-status {
          position: absolute;

          bottom: 13px;

          display: flex;
          align-items: center;
          gap: 6px;

          padding: 6px 10px;

          border-radius: 100px;

          color: #a7f3d0;

          background:
            rgba(6,78,59,0.8);

          border:
            1px solid rgba(52,211,153,0.18);

          backdrop-filter: blur(10px);

          font-size: 0.63rem;
          font-weight: 600;
        }


        .profile-status-dot {
          width: 6px;
          height: 6px;

          border-radius: 50%;

          background: #34d399;

          box-shadow:
            0 0 8px rgba(52,211,153,0.7);
        }


        /* ==================================================
           PROFILE INFORMATION
        ================================================== */

        .profile-information {
          padding: 0 24px 23px;

          text-align: center;
        }


        .profile-name {
          color: #f4f4f5;

          font-size: 1.05rem;
          font-weight: 700;

          margin-bottom: 4px;
        }


        .profile-position {
          color: #a78bfa;

          font-size: 0.72rem;
          font-weight: 600;

          margin-bottom: 8px;
        }


        .profile-location {
          color: #71717a;

          font-size: 0.65rem;

          line-height: 1.5;

          margin-bottom: 18px;
        }


        /* ==================================================
           STACK
        ================================================== */

        .profile-stack {
          display: grid;

          grid-template-columns: 1fr 1fr;

          gap: 6px;
        }


        .stack-item {
          display: flex;
          align-items: center;

          gap: 7px;

          padding: 8px;

          border-radius: 7px;

          color: #a1a1aa;

          background:
            rgba(255,255,255,0.025);

          border:
            1px solid rgba(255,255,255,0.06);

          font-size: 0.64rem;

          text-align: left;
        }


        .stack-item svg {
          color: #a78bfa;
        }


        /* ==================================================
           PROFILE FOOTER
        ================================================== */

        .profile-footer {
          display: flex;
          align-items: center;

          padding: 14px 20px;

          border-top:
            1px solid rgba(255,255,255,0.06);

          background:
            rgba(255,255,255,0.018);
        }


        .profile-footer-item {
          flex: 1;

          display: flex;
          align-items: center;
          justify-content: center;

          gap: 7px;
        }


        .profile-footer-item > svg {
          color: #71717a;
        }


        .profile-footer-item div {
          display: flex;
          flex-direction: column;

          gap: 2px;
        }


        .profile-footer-item span {
          color: #52525b;

          font-size: 0.55rem;
        }


        .profile-footer-item strong {
          color: #a1a1aa;

          font-size: 0.62rem;
        }


        .profile-footer-divider {
          width: 1px;
          height: 25px;

          background:
            rgba(255,255,255,0.07);
        }


        /* ==================================================
           FLOATING CARDS
        ================================================== */

        .floating-card {
          position: absolute;

          display: flex;
          align-items: center;

          gap: 8px;

          padding: 9px 12px 9px 8px;

          border-radius: 10px;

          background:
            rgba(12,12,15,0.88);

          border:
            1px solid rgba(255,255,255,0.08);

          backdrop-filter: blur(14px);

          box-shadow:
            0 15px 40px rgba(0,0,0,0.28);

          z-index: 5;

          animation:
            subtle-float 4s ease-in-out infinite;
        }


        .floating-card-one {
          left: -30px;
          top: 100px;
        }


        .floating-card-two {
          right: -30px;
          bottom: 110px;

          animation-delay: 1.2s;
        }


        .floating-card-icon {
          width: 31px;
          height: 31px;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 8px;
        }


        .floating-card-icon.purple {
          color: #c4b5fd;

          background:
            rgba(124,58,237,0.12);
        }


        .floating-card-icon.cyan {
          color: #67e8f9;

          background:
            rgba(6,182,212,0.1);
        }


        .floating-card > div:last-child {
          display: flex;
          flex-direction: column;

          gap: 2px;
        }


        .floating-card strong {
          color: #e4e4e7;

          font-size: 0.65rem;
        }


        .floating-card span {
          color: #71717a;

          font-size: 0.55rem;
        }


        /* ==================================================
           STATS
        ================================================== */

        .professional-stats {
          display: flex;
          align-items: center;

          max-width: 850px;

          margin-top: 55px;

          padding: 15px 20px;

          border:
            1px solid rgba(255,255,255,0.07);

          border-radius: 12px;

          background:
            rgba(255,255,255,0.018);

          backdrop-filter: blur(14px);
        }


        .professional-stat {
          flex: 1;

          display: flex;
          align-items: center;
          justify-content: center;

          gap: 9px;
        }


        .stat-icon {
          width: 31px;
          height: 31px;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 7px;

          color: #a78bfa;

          background:
            rgba(124,58,237,0.08);
        }


        .professional-stat div:last-child {
          display: flex;
          flex-direction: column;

          gap: 1px;
        }


        .professional-stat strong {
          color: #e4e4e7;

          font-size: 0.8rem;
        }


        .professional-stat span {
          color: #71717a;

          font-size: 0.58rem;
        }


        .professional-stat-divider {
          width: 1px;
          height: 28px;

          background:
            rgba(255,255,255,0.07);
        }


        /* ==================================================
           SCROLL
        ================================================== */

        .professional-scroll {
          position: absolute;

          bottom: 24px;
          right: 20px;

          display: flex;
          align-items: center;
          gap: 6px;

          padding: 7px 11px;

          color: #52525b;

          background: transparent;

          border:
            1px solid rgba(255,255,255,0.06);

          border-radius: 100px;

          font-size: 0.6rem;

          cursor: pointer;

          transition:
            color 0.2s ease,
            border-color 0.2s ease;
        }


        .professional-scroll:hover {
          color: #a78bfa;

          border-color:
            rgba(124,58,237,0.3);
        }


        /* ==================================================
           ANIMATIONS
        ================================================== */

        @keyframes professional-pulse {

          0%,
          100% {
            opacity: 1;
          }

          50% {
            opacity: 0.5;
          }

        }


        @keyframes subtle-float {

          0%,
          100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-6px);
          }

        }


        /* ==================================================
           RESPONSIVE
        ================================================== */

        @media (max-width: 1050px) {

          .professional-layout {
            grid-template-columns:
              minmax(0, 1fr)
              390px;

            gap: 45px;
          }


          .profile-card {
            width: 320px;
          }


          .floating-card-one {
            left: -15px;
          }


          .floating-card-two {
            right: -15px;
          }

        }


        @media (max-width: 900px) {

          .professional-home {
            padding-top: 110px;
            padding-bottom: 100px;
          }


          .professional-layout {
            grid-template-columns: 1fr;

            gap: 45px;

            text-align: center;
          }


          .professional-content {
            max-width: 700px;

            margin: 0 auto;
          }


          .professional-role {
            justify-content: center;
          }


          .professional-description {
            margin-left: auto;
            margin-right: auto;
          }


          .professional-actions,
          .professional-social {
            justify-content: center;
          }


          .professional-skills {
            text-align: left;
          }


          .professional-profile {
            order: -1;

            min-height: 520px;

            max-width: 500px;

            width: 100%;

            margin: 0 auto;
          }


          .professional-stats {
            margin-left: auto;
            margin-right: auto;
          }

        }


        @media (max-width: 600px) {

          .professional-home {
            padding-top: 100px;
          }


          .name-text {
            font-size:
              clamp(2.8rem, 12vw, 4rem);
          }


          .professional-role {
            font-size: 0.82rem;
          }


          .professional-description {
            font-size: 0.88rem;
          }


          .professional-profile {
            min-height: 470px;
          }


          .profile-card {
            width: 310px;
          }


          .profile-image-border {
            width: 165px;
            height: 165px;
          }


          .floating-card-one {
            left: -5px;
            top: 90px;
          }


          .floating-card-two {
            right: -5px;
            bottom: 90px;
          }


          .professional-stats {
            padding: 12px 7px;

            gap: 3px;
          }


          .professional-stat {
            gap: 4px;
          }


          .stat-icon {
            display: none;
          }


          .professional-stat strong {
            font-size: 0.7rem;
          }


          .professional-stat span {
            font-size: 0.5rem;
          }


          .professional-scroll {
            display: none;
          }

        }


        @media (max-width: 430px) {

          .professional-actions {
            display: grid;

            grid-template-columns: 1fr 1fr;

            width: 100%;
          }


          .professional-primary-btn,
          .professional-secondary-btn {
            width: 100%;
          }


          .professional-primary-btn {
            grid-column: span 2;
          }


          .professional-social {
            gap: 6px;
          }


          .social-label {
            width: 100%;

            margin-bottom: 3px;
          }


          .professional-profile {
            min-height: 430px;
          }


          .profile-card {
            width: 285px;
          }


          .profile-image-border {
            width: 145px;
            height: 145px;
          }


          .floating-card {
            padding: 7px;
          }


          .floating-card > div:last-child {
            display: none;
          }


          .floating-card-icon {
            width: 34px;
            height: 34px;
          }


          .floating-card-one {
            left: 0;
          }


          .floating-card-two {
            right: 0;
          }


          .professional-stats {
            margin-top: 35px;
          }

        }

      `}</style>

    </section>
  )
}