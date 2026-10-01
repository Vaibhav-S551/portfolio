import { useState } from 'react'
import axios from 'axios'
import {
  Send,
  Mail,
  MapPin,
  Github,
  Linkedin,
  MessageSquare,
  CheckCircle,
  AlertCircle,
  ArrowUpRight,
  Clock,
  BriefcaseBusiness,
  Code2,
  Sparkles
} from 'lucide-react'

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: ''
  })

  const API_URL = import.meta.env.VITE_API_URL || ''
  const [status, setStatus] = useState(null)
  const [errorMsg, setErrorMsg] = useState('')

  const handleChange = (e) => {
    setForm((previous) => ({
      ...previous,
      [e.target.name]: e.target.value
    }))

    if (status === 'error') {
      setStatus(null)
      setErrorMsg('')
    }
  }

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const name = form.name.trim()
    const email = form.email.trim()
    const message = form.message.trim()

    if (!name || !email || !message) {
      setStatus('error')
      setErrorMsg('Please complete all fields before sending.')
      return
    }

    if (!validateEmail(email)) {
      setStatus('error')
      setErrorMsg('Please enter a valid email address.')
      return
    }

    if (message.length < 10) {
      setStatus('error')
      setErrorMsg('Please enter a little more detail in your message.')
      return
    }

    setStatus('loading')
    setErrorMsg('')

    try {
      const response = await axios.post(
        `${API_URL}/api/contact`,
        {
          name,
          email,
          message
        },
        {
          timeout: 5000
        }
      )

      if (response.data?.success) {
        setStatus('success')

        setForm({
          name: '',
          email: '',
          message: ''
        })
      } else {
        throw new Error(
          response.data?.message || 'Failed to send message.'
        )
      }
    } catch (error) {
      console.error('Contact form error:', error)

      setStatus('error')

      setErrorMsg(
        error.response?.data?.message ||
        'Unable to send your message right now. Please try again.'
      )
    }
  }

  return (
    <section id="contact" className="contact-section">

      {/* Background */}
      <div className="contact-background">
        <div className="contact-grid-pattern" />

        <div className="contact-orb contact-orb-one" />
        <div className="contact-orb contact-orb-two" />

        <div className="floating-code code-one">
          {'</>'}
        </div>

        <div className="floating-code code-two">
          {'{ }'}
        </div>

        <div className="floating-code code-three">
          {'( )'}
        </div>
      </div>

      <div className="container contact-container">

        {/* Header */}
        <div className="section-header contact-heading">

          <div className="section-tag">
            <MessageSquare size={12} />
            Get In Touch
          </div>

          <h2 className="section-title">
            Let's{' '}
            <span className="gradient-text">
              Connect
            </span>
          </h2>

          <p className="section-subtitle">
            Have a project idea, job opportunity, or just want to
            talk about technology? Send me a message and let's
            start a conversation.
          </p>

        </div>

        {/* Availability */}
        <div className="availability-card">

          <div className="availability-left">

            <span className="availability-dot">
              <span />
            </span>

            <div>
              <strong>Currently available</strong>

              <p>
                Open to full-time opportunities, internships,
                freelance projects and collaborations.
              </p>
            </div>

          </div>

          <div className="availability-status">
            <BriefcaseBusiness size={15} />
            Open to opportunities
          </div>

        </div>

        {/* Main Contact Layout */}
        <div className="contact-layout">

          {/* =========================
              LEFT INFORMATION PANEL
          ========================= */}
          <div className="contact-info">

            <div className="info-top">

              <div className="info-icon-large">
                <Code2 size={25} />
              </div>

              <div>
                <span className="info-eyebrow">
                  Developer • Engineer • Builder
                </span>

                <h3 className="info-heading">
                  Let's build something
                  <span> meaningful.</span>
                </h3>
              </div>

            </div>

            <p className="info-text">
              Whether you are looking for a Java Full Stack
              developer, have an interesting project idea, or
              simply want to connect, I'd be happy to hear from
              you.
            </p>

            {/* Contact Cards */}
            <div className="info-items">

              <a
                href="mailto:vaibhav.satpute2494@email.com"
                className="contact-item"
              >
                <div className="contact-item-icon">
                  <Mail size={18} />
                </div>

                <div className="contact-item-content">
                  <span>Email</span>
                  <strong>
                    vaibhav.satpute2494@email.com
                  </strong>
                </div>

                <ArrowUpRight
                  className="contact-arrow"
                  size={16}
                />
              </a>

              <div className="contact-item">
                <div className="contact-item-icon">
                  <MapPin size={18} />
                </div>

                <div className="contact-item-content">
                  <span>Location</span>
                  <strong>
                    Pune, Maharashtra
                  </strong>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-item-icon">
                  <Clock size={18} />
                </div>

                <div className="contact-item-content">
                  <span>Response Time</span>
                  <strong>
                    Usually within 24 hours
                  </strong>
                </div>
              </div>

            </div>

            {/* Social Links */}
            <div className="social-section">

              <span className="social-label">
                Find me online
              </span>

              <div className="social-links">

                <a
                  href="https://github.com/Vaibhav-S551"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-card"
                >
                  <div className="social-icon github-icon">
                    <Github size={19} />
                  </div>

                  <div>
                    <strong>GitHub</strong>
                    <span>
                      View my projects
                    </span>
                  </div>

                  <ArrowUpRight size={15} />
                </a>

                <a
                  href="https://www.linkedin.com/in/vaibhav-satpute-524334254"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-card"
                >
                  <div className="social-icon linkedin-icon">
                    <Linkedin size={19} />
                  </div>

                  <div>
                    <strong>LinkedIn</strong>
                    <span>
                      Connect with me
                    </span>
                  </div>

                  <ArrowUpRight size={15} />
                </a>

              </div>

            </div>

            <div className="info-decoration" />

          </div>

          {/* =========================
              RIGHT CONTACT FORM
          ========================= */}
          <div className="contact-form-wrap">

            {status === 'success' ? (

              <div className="success-state">

                <div className="success-animation">
                  <div className="success-icon">
                    <CheckCircle size={42} />
                  </div>
                </div>

                <span className="success-label">
                  MESSAGE RECEIVED
                </span>

                <h3>
                  Thanks for reaching out! 🎉
                </h3>

                <p>
                   Your message has been received successfully.
  I'll review it and get back to you as soon
  as possible.
                </p>

                <button
                  className="btn btn-outline"
                  onClick={() => {
                    setStatus(null)
                    setErrorMsg('')
                  }}
                >
                  <MessageSquare size={16} />
                  Send Another Message
                </button>

              </div>

            ) : (

              <form
                onSubmit={handleSubmit}
                className="contact-form"
              >

                <div className="form-header">

                  <div className="form-header-icon">
                    <Send size={18} />
                  </div>

                  <div>
                    <h3 className="form-heading">
                      Send a Message
                    </h3>

                    <p>
                      I'll get back to you as soon as possible.
                    </p>
                  </div>

                </div>

                {/* Name + Email */}
                <div className="form-row">

                  <div className="form-group">

                    <label
                      htmlFor="contact-name"
                      className="form-label"
                    >
                      Your Name
                    </label>

                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      className="form-input"
                      placeholder="please write your name"
                      value={form.name}
                      onChange={handleChange}
                      disabled={status === 'loading'}
                      autoComplete="name"
                    />

                  </div>

                  <div className="form-group">

                    <label
                      htmlFor="contact-email"
                      className="form-label"
                    >
                      Email Address
                    </label>

                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      className="form-input"
                      placeholder="write your email"
                      value={form.email}
                      onChange={handleChange}
                      disabled={status === 'loading'}
                      autoComplete="email"
                    />

                  </div>

                </div>

                {/* Message */}
                <div className="form-group">

                  <div className="message-label-row">

                    <label
                      htmlFor="contact-message"
                      className="form-label"
                    >
                      Message
                    </label>

                    <span className="character-count">
                      {form.message.length}/1000
                    </span>

                  </div>

                  <textarea
                    id="contact-message"
                    name="message"
                    className="form-textarea"
                    placeholder="Tell me about your project, opportunity, or idea..."
                    value={form.message}
                    onChange={(e) => {
                      if (e.target.value.length <= 1000) {
                        handleChange(e)
                      }
                    }}
                    disabled={status === 'loading'}
                    rows={7}
                    maxLength={1000}
                  />

                </div>

                {/* Error */}
                {status === 'error' && (

                  <div className="alert alert-error">
                    <AlertCircle size={17} />
                    <span>{errorMsg}</span>
                  </div>

                )}

                {/* Submit */}
                <button
                  type="submit"
                  className="btn btn-primary submit-btn"
                  disabled={status === 'loading'}
                >

                  {status === 'loading' ? (
                    <>
                      <span className="button-spinner" />
                      Sending Message...
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Send Message
                      <ArrowUpRight size={15} />
                    </>
                  )}

                </button>

                <div className="form-footer">

                  <ShieldIcon />

                  <span>
                    Your information is only used to respond
                    to your message.
                  </span>

                </div>

              </form>

            )}

          </div>

        </div>

        {/* Bottom quote */}
        <div className="contact-bottom">

          <Sparkles size={15} />

          <span>
            Great ideas start with a conversation.
          </span>

        </div>

      </div>

      <style>{`

        /* =========================================
           CONTACT SECTION
        ========================================= */

        .contact-section {
          position: relative;
          overflow: hidden;
          padding: 110px 0 90px;
          background:
            radial-gradient(
              circle at 10% 20%,
              rgba(124, 58, 237, 0.08),
              transparent 30%
            ),
            radial-gradient(
              circle at 90% 75%,
              rgba(6, 182, 212, 0.06),
              transparent 30%
            ),
            var(--bg-secondary);
        }

        .contact-container {
          position: relative;
          z-index: 2;
        }

        /* =========================================
           BACKGROUND
        ========================================= */

        .contact-background {
          position: absolute;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
        }

        .contact-grid-pattern {
          position: absolute;
          inset: 0;
          opacity: 0.16;
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
          background-size: 65px 65px;

          mask-image: linear-gradient(
            to bottom,
            black,
            transparent 90%
          );
        }

        .contact-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
        }

        .contact-orb-one {
          width: 350px;
          height: 350px;
          left: -180px;
          top: 10%;
          background: rgba(124, 58, 237, 0.09);
        }

        .contact-orb-two {
          width: 320px;
          height: 320px;
          right: -160px;
          bottom: 5%;
          background: rgba(6, 182, 212, 0.07);
        }

        .floating-code {
          position: absolute;
          color: rgba(255,255,255,0.025);
          font-family: monospace;
          font-size: 5rem;
          font-weight: 800;
        }

        .code-one {
          top: 15%;
          right: 8%;
          transform: rotate(8deg);
        }

        .code-two {
          bottom: 20%;
          left: 4%;
          transform: rotate(-8deg);
        }

        .code-three {
          top: 50%;
          right: 3%;
          font-size: 3rem;
        }

        /* =========================================
           HEADER
        ========================================= */

        .contact-heading {
          max-width: 760px;
          margin: 0 auto 35px;
        }

        .contact-heading .section-title {
          margin-top: 14px;
        }

        .contact-heading .section-subtitle {
          max-width: 690px;
          margin-left: auto;
          margin-right: auto;
        }

        /* =========================================
           AVAILABILITY
        ========================================= */

        .availability-card {
          max-width: 900px;
          margin: 0 auto 35px;
          padding: 15px 18px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          border: 1px solid rgba(16,185,129,0.18);
          border-radius: 14px;
          background:
            linear-gradient(
              90deg,
              rgba(16,185,129,0.055),
              rgba(255,255,255,0.02)
            );
          backdrop-filter: blur(12px);
        }

        .availability-left {
          display: flex;
          align-items: center;
          gap: 13px;
        }

        .availability-left strong {
          display: block;
          color: var(--text-primary);
          font-size: 0.82rem;
          margin-bottom: 3px;
        }

        .availability-left p {
          margin: 0;
          color: var(--text-muted);
          font-size: 0.7rem;
        }

        .availability-dot {
          width: 12px;
          height: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: rgba(16,185,129,0.15);
          flex-shrink: 0;
        }

        .availability-dot span {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #34d399;
          box-shadow: 0 0 10px rgba(52,211,153,0.8);
          animation: availabilityPulse 2s infinite;
        }

        .availability-status {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 7px 11px;
          border-radius: 100px;
          border: 1px solid rgba(16,185,129,0.18);
          background: rgba(16,185,129,0.07);
          color: #34d399;
          font-size: 0.65rem;
          font-weight: 700;
          white-space: nowrap;
        }

        /* =========================================
           MAIN LAYOUT
        ========================================= */

        .contact-layout {
          display: grid;
          grid-template-columns: 0.9fr 1.1fr;
          gap: 24px;
          align-items: stretch;
        }

        /* =========================================
           INFO PANEL
        ========================================= */

        .contact-info {
          position: relative;
          overflow: hidden;
          padding: 34px;
          border: 1px solid var(--border);
          border-radius: 20px;
          background:
            linear-gradient(
              145deg,
              rgba(255,255,255,0.045),
              rgba(255,255,255,0.015)
            );
          box-shadow: 0 20px 60px rgba(0,0,0,0.16);
        }

        .info-top {
          position: relative;
          z-index: 2;
          display: flex;
          gap: 15px;
          align-items: flex-start;
        }

        .info-icon-large {
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          border-radius: 13px;
          color: var(--accent-light);
          background: rgba(124,58,237,0.1);
          border: 1px solid rgba(124,58,237,0.22);
        }

        .info-eyebrow {
          display: block;
          margin-bottom: 7px;
          color: var(--accent-light);
          font-size: 0.62rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        .info-heading {
          margin: 0;
          color: var(--text-primary);
          font-family: var(--font-display);
          font-size: 1.35rem;
          line-height: 1.25;
        }

        .info-heading span {
          color: var(--accent-light);
        }

        .info-text {
          position: relative;
          z-index: 2;
          margin: 22px 0 27px;
          color: var(--text-secondary);
          font-size: 0.82rem;
          line-height: 1.75;
        }

        .info-items {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          gap: 9px;
        }

        .contact-item {
          display: flex;
          align-items: center;
          gap: 12px;
          min-width: 0;
          padding: 12px;
          border: 1px solid transparent;
          border-radius: 12px;
          text-decoration: none;
          transition: all 0.25s ease;
        }

        .contact-item:hover {
          border-color: var(--border);
          background: rgba(255,255,255,0.025);
          transform: translateX(3px);
        }

        .contact-item-icon {
          width: 39px;
          height: 39px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          border-radius: 10px;
          color: var(--accent-light);
          background: rgba(124,58,237,0.08);
          border: 1px solid rgba(124,58,237,0.16);
        }

        .contact-item-content {
          min-width: 0;
          flex: 1;
        }

        .contact-item-content span {
          display: block;
          margin-bottom: 3px;
          color: var(--text-muted);
          font-size: 0.62rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.07em;
        }

        .contact-item-content strong {
          display: block;
          overflow: hidden;
          color: var(--text-secondary);
          font-size: 0.77rem;
          font-weight: 500;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .contact-arrow {
          color: var(--text-muted);
          transition: all 0.2s ease;
        }

        .contact-item:hover .contact-arrow {
          color: var(--accent-light);
          transform: translate(2px, -2px);
        }

        /* =========================================
           SOCIAL
        ========================================= */

        .social-section {
          position: relative;
          z-index: 2;
          margin-top: 28px;
          padding-top: 22px;
          border-top: 1px solid var(--border);
        }

        .social-label {
          display: block;
          margin-bottom: 11px;
          color: var(--text-muted);
          font-size: 0.65rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        .social-links {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 9px;
        }

        .social-card {
          display: flex;
          align-items: center;
          gap: 9px;
          min-width: 0;
          padding: 11px;
          border: 1px solid var(--border);
          border-radius: 11px;
          color: var(--text-secondary);
          text-decoration: none;
          background: rgba(255,255,255,0.018);
          transition: all 0.25s ease;
        }

        .social-card:hover {
          border-color: rgba(124,58,237,0.3);
          background: rgba(124,58,237,0.045);
          transform: translateY(-2px);
        }

        .social-icon {
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          border-radius: 8px;
        }

        .github-icon {
          color: white;
          background: rgba(255,255,255,0.08);
        }

        .linkedin-icon {
          color: #60a5fa;
          background: rgba(37,99,235,0.1);
        }

        .social-card div:nth-child(2) {
          flex: 1;
          min-width: 0;
        }

        .social-card strong {
          display: block;
          color: var(--text-primary);
          font-size: 0.72rem;
          margin-bottom: 2px;
        }

        .social-card span {
          display: block;
          color: var(--text-muted);
          font-size: 0.6rem;
        }

        .social-card > svg {
          color: var(--text-muted);
          flex-shrink: 0;
        }

        .info-decoration {
          position: absolute;
          width: 230px;
          height: 230px;
          right: -130px;
          bottom: -120px;
          border-radius: 50%;
          background: radial-gradient(
            circle,
            rgba(124,58,237,0.15),
            transparent 70%
          );
          pointer-events: none;
        }

        /* =========================================
           FORM
        ========================================= */

        .contact-form-wrap {
          position: relative;
          min-height: 100%;
          padding: 34px;
          border: 1px solid var(--border);
          border-radius: 20px;
          background:
            linear-gradient(
              145deg,
              rgba(255,255,255,0.05),
              rgba(255,255,255,0.018)
            );
          box-shadow: 0 20px 60px rgba(0,0,0,0.16);
          overflow: hidden;
        }

        .contact-form-wrap::before {
          content: '';
          position: absolute;
          top: 0;
          left: 12%;
          right: 12%;
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent,
            var(--accent),
            transparent
          );
          opacity: 0.6;
        }

        .contact-form {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          gap: 19px;
        }

        .form-header {
          display: flex;
          align-items: center;
          gap: 13px;
          margin-bottom: 5px;
        }

        .form-header-icon {
          width: 42px;
          height: 42px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 11px;
          color: var(--accent-light);
          background: rgba(124,58,237,0.1);
          border: 1px solid rgba(124,58,237,0.2);
        }

        .form-heading {
          margin: 0 0 3px;
          color: var(--text-primary);
          font-family: var(--font-display);
          font-size: 1.12rem;
        }

        .form-header p {
          margin: 0;
          color: var(--text-muted);
          font-size: 0.7rem;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 7px;
        }

        .form-label {
          color: var(--text-secondary);
          font-size: 0.7rem;
          font-weight: 650;
        }

        .form-input,
        .form-textarea {
          width: 100%;
          box-sizing: border-box;
          outline: none;
          color: var(--text-primary);
          background: rgba(0,0,0,0.18);
          border: 1px solid var(--border);
          border-radius: 10px;
          font-family: inherit;
          font-size: 0.8rem;
          transition:
            border-color 0.2s ease,
            box-shadow 0.2s ease,
            background 0.2s ease;
        }

        .form-input {
          height: 45px;
          padding: 0 13px;
        }

        .form-textarea {
          min-height: 150px;
          padding: 12px 13px;
          resize: vertical;
          line-height: 1.6;
        }

        .form-input::placeholder,
        .form-textarea::placeholder {
          color: var(--text-muted);
          opacity: 0.7;
        }

        .form-input:focus,
        .form-textarea:focus {
          border-color: rgba(124,58,237,0.55);
          background: rgba(124,58,237,0.025);
          box-shadow:
            0 0 0 3px rgba(124,58,237,0.08);
        }

        .form-input:disabled,
        .form-textarea:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .message-label-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .character-count {
          color: var(--text-muted);
          font-size: 0.62rem;
        }

        /* =========================================
           ALERT
        ========================================= */

        .alert {
          display: flex;
          align-items: center;
          gap: 9px;
          padding: 11px 13px;
          border-radius: 9px;
          font-size: 0.72rem;
        }

        .alert-error {
          color: #fca5a5;
          background: rgba(239,68,68,0.07);
          border: 1px solid rgba(239,68,68,0.18);
        }

        /* =========================================
           SUBMIT
        ========================================= */

        .submit-btn {
          width: 100%;
          min-height: 46px;
          justify-content: center;
          gap: 8px;
          border: none;
          cursor: pointer;
        }

        .submit-btn:disabled {
          opacity: 0.65;
          cursor: not-allowed;
        }

        .button-spinner {
          width: 15px;
          height: 15px;
          border: 2px solid rgba(255,255,255,0.25);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        .form-footer {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          color: var(--text-muted);
          font-size: 0.61rem;
          text-align: center;
        }

        .form-footer svg {
          flex-shrink: 0;
        }

        /* =========================================
           SUCCESS
        ========================================= */

        .success-state {
          min-height: 440px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          gap: 14px;
        }

        .success-animation {
          margin-bottom: 5px;
        }

        .success-icon {
          width: 82px;
          height: 82px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #34d399;
          border-radius: 50%;
          background: rgba(16,185,129,0.08);
          border: 1px solid rgba(16,185,129,0.25);
          box-shadow:
            0 0 0 10px rgba(16,185,129,0.025),
            0 0 45px rgba(16,185,129,0.08);
          animation: successPop 0.5s ease;
        }

        .success-label {
          color: #34d399;
          font-size: 0.62rem;
          font-weight: 800;
          letter-spacing: 0.12em;
        }

        .success-state h3 {
          margin: 0;
          color: var(--text-primary);
          font-family: var(--font-display);
          font-size: 1.45rem;
        }

        .success-state p {
          max-width: 390px;
          margin: 0 0 8px;
          color: var(--text-secondary);
          font-size: 0.8rem;
          line-height: 1.7;
        }

        /* =========================================
           BOTTOM
        ========================================= */

        .contact-bottom {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          margin-top: 38px;
          color: var(--text-muted);
          font-size: 0.7rem;
        }

        .contact-bottom svg {
          color: var(--accent-light);
        }

        /* =========================================
           ANIMATIONS
        ========================================= */

        @keyframes availabilityPulse {
          0%,
          100% {
            opacity: 1;
            transform: scale(1);
          }

          50% {
            opacity: 0.5;
            transform: scale(0.75);
          }
        }

        @keyframes successPop {
          0% {
            opacity: 0;
            transform: scale(0.7);
          }

          70% {
            transform: scale(1.08);
          }

          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        /* =========================================
           RESPONSIVE
        ========================================= */

        @media (max-width: 950px) {
          .contact-layout {
            grid-template-columns: 1fr;
          }

          .contact-info {
            min-height: auto;
          }
        }

        @media (max-width: 650px) {
          .contact-section {
            padding: 80px 0 70px;
          }

          .availability-card {
            align-items: flex-start;
            flex-direction: column;
          }

          .availability-status {
            align-self: flex-start;
          }

          .form-row {
            grid-template-columns: 1fr;
          }

          .contact-info,
          .contact-form-wrap {
            padding: 25px;
          }

          .social-links {
            grid-template-columns: 1fr;
          }

          .floating-code {
            display: none;
          }
        }

        @media (max-width: 450px) {
          .contact-info,
          .contact-form-wrap {
            padding: 20px;
            border-radius: 15px;
          }

          .info-top {
            gap: 11px;
          }

          .info-heading {
            font-size: 1.15rem;
          }

          .contact-item-content strong {
            font-size: 0.7rem;
          }

          .availability-left {
            align-items: flex-start;
          }

          .availability-left p {
            line-height: 1.5;
          }
        }

      `}</style>
    </section>
  )
}

/* Small inline shield icon so we don't need another package */
function ShieldIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  )
}