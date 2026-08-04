import { useState } from 'react'
import axios from 'axios'
import { Send, Mail, MapPin, Github, Linkedin, MessageSquare, CheckCircle, AlertCircle } from 'lucide-react'
const API_URL = import.meta.env.VITE_API_URL;

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState(null) // null | 'loading' | 'success' | 'error'
  const [errorMsg, setErrorMsg] = useState('')

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) {
      setStatus('error')
      setErrorMsg('Please fill in all fields.')
      return
    }
    setStatus('loading')
    try {
     const res = await axios.post(`${API_URL}/api/contact`, form)
      if (res.data.success) {
        setStatus('success')
        setForm({ name: '', email: '', message: '' })
      } else {
        throw new Error(res.data.message)
      }
    } catch (err) {
      setStatus('error')
      setErrorMsg(err.response?.data?.message || 'Something went wrong. Please try again.')
    }
  }

  return (
    <section id="contact" style={{ background: 'var(--bg-secondary)' }}>
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <MessageSquare size={12} style={{ display: 'inline', marginRight: '6px' }} />
            Get In Touch
          </div>
          <h2 className="section-title">Let's <span className="gradient-text">Connect</span></h2>
          <p className="section-subtitle">Have a project in mind or just want to chat? I'd love to hear from you.</p>
        </div>

        <div className="contact-layout">
          {/* Info panel */}
          <div className="contact-info">
            <h3 className="info-heading">Ready to build something great?</h3>
            <p className="info-text">
              I'm currently available for freelance projects and full-time opportunities. 
              Whether you have a question or just want to say hi, my inbox is always open!
            </p>

            <div className="info-items">
              {[
                { icon: <Mail size={18} />, label: 'Email', value: 'vaibhav.satpute2494@email.com', href: 'mailto:vaibhav.satpute2494@email.com' },
                { icon: <MapPin size={18} />, label: 'Location', value: 'Pune Maharashtra', href: null },
                { icon: <Github size={18} />, label: 'GitHub', value: 'github.com/vaibhav_Satpute', href: 'https://github.com/Vaibhav-S551' },
                { icon: <Linkedin size={18} />, label: 'LinkedIn', value: 'linkedin.com/in/vaibhav_satpute', href: 'https://www.linkedin.com/in/vaibhav-satpute-524334254r' },
              ].map(item => (
                <div key={item.label} className="info-item">
                  <div className="info-icon">{item.icon}</div>
                  <div>
                    <div className="info-label">{item.label}</div>
                    {item.href
                      ? <a href={item.href} target="_blank" rel="noopener noreferrer" className="info-value link">{item.value}</a>
                      : <div className="info-value">{item.value}</div>
                    }
                  </div>
                </div>
              ))}
            </div>

            <div className="contact-decoration" />
          </div>

          {/* Form */}
          <div className="contact-form-wrap card">
            {status === 'success' ? (
              <div className="success-state">
                <div className="success-icon">
                  <CheckCircle size={40} />
                </div>
                <h3>Message Sent! 🎉</h3>
                <p>Thanks for reaching out. I'll get back to you within 24 hours.</p>
                <button className="btn btn-outline" onClick={() => setStatus(null)}>Send Another</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <h3 className="form-heading">Send a Message</h3>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      name="name"
                      className="form-input"
                      placeholder="Vaibhav Satpute"
                      value={form.name}
                      onChange={handleChange}
                      disabled={status === 'loading'}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      name="email"
                      className="form-input"
                      placeholder="vaibhav@gmail.com"
                      value={form.email}
                      onChange={handleChange}
                      disabled={status === 'loading'}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Message</label>
                  <textarea
                    name="message"
                    className="form-textarea"
                    placeholder="How can i Help you"
                    value={form.message}
                    onChange={handleChange}
                    disabled={status === 'loading'}
                  />
                </div>

                {status === 'error' && (
                  <div className="alert alert-error">
                    <AlertCircle size={16} />
                    {errorMsg}
                  </div>
                )}

                <button type="submit" className="btn btn-primary submit-btn" disabled={status === 'loading'}>
                  {status === 'loading'
                    ? <><div className="spinner" /> Sending...</>
                    : <><Send size={16} /> Send Message</>
                  }
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .contact-layout {
          display: grid;
          grid-template-columns: 1fr 1.3fr;
          gap: 40px;
          align-items: start;
        }
        .contact-info {
          position: relative;
          overflow: hidden;
          padding: 40px;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius);
        }
        .contact-decoration {
          position: absolute;
          bottom: -60px; right: -60px;
          width: 200px; height: 200px;
          background: radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%);
          border-radius: 50%;
          pointer-events: none;
        }
        .info-heading {
          font-family: var(--font-display);
          font-size: 1.4rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 16px;
          line-height: 1.2;
        }
        .info-text {
          font-size: 0.9rem;
          color: var(--text-secondary);
          line-height: 1.7;
          margin-bottom: 36px;
        }
        .info-items { display: flex; flex-direction: column; gap: 20px; }
        .info-item {
          display: flex;
          align-items: flex-start;
          gap: 14px;
        }
        .info-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 42px; height: 42px;
          background: rgba(124,58,237,0.1);
          border: 1px solid rgba(124,58,237,0.2);
          border-radius: var(--radius-sm);
          color: var(--accent-light);
          flex-shrink: 0;
        }
        .info-label {
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--text-muted);
          margin-bottom: 2px;
        }
        .info-value {
          font-size: 0.9rem;
          color: var(--text-secondary);
        }
        .info-value.link {
          color: var(--accent-light);
          text-decoration: none;
          transition: var(--transition);
        }
        .info-value.link:hover { color: var(--accent-2); }
        .contact-form-wrap { padding: 40px; }
        .form-heading {
          font-family: var(--font-display);
          font-size: 1.3rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 28px;
        }
        .contact-form { display: flex; flex-direction: column; gap: 20px; }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .submit-btn { align-self: flex-start; min-width: 180px; justify-content: center; }
        .success-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 16px;
          padding: 40px 0;
        }
        .success-icon {
          width: 80px; height: 80px;
          background: rgba(16,185,129,0.1);
          border: 1px solid rgba(16,185,129,0.3);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #34d399;
        }
        .success-state h3 {
          font-family: var(--font-display);
          font-size: 1.5rem;
          color: var(--text-primary);
        }
        .success-state p { color: var(--text-secondary); font-size: 0.95rem; }
        @media (max-width: 900px) {
          .contact-layout { grid-template-columns: 1fr; }
        }
        @media (max-width: 560px) {
          .form-row { grid-template-columns: 1fr; }
          .contact-info, .contact-form-wrap { padding: 24px; }
        }
      `}</style>
    </section>
  )
}
