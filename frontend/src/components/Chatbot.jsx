import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { MessageCircle, X, Send, Bot, User, Sparkles, RefreshCw } from 'lucide-react'
const API_URL = import.meta.env.VITE_API_URL;

const QUICK_ACTIONS = [
  { label: '🛠️ Skills', query: 'What are your skills?' },
  { label: '🚀 Projects', query: 'Tell me about your projects' },
  { label: '💼 Experience', query: 'What is your work experience?' },
  { label: '📬 Contact', query: 'How can I contact you?' },
]

function Message({ msg }) {
  const isBot = msg.role === 'bot'
  return (
    <div className={`msg-wrap ${isBot ? 'bot' : 'user'}`}>
      {isBot && (
        <div className="msg-avatar bot-avatar">
          <Bot size={14} />
        </div>
      )}
      <div className={`msg-bubble ${isBot ? 'bot-bubble' : 'user-bubble'}`}>
        <div
          className="msg-text"
          dangerouslySetInnerHTML={{
            __html: msg.text
              .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
              .replace(/\n/g, '<br />')
          }}
        />
        <div className="msg-time">{msg.time}</div>
      </div>
      {!isBot && (
        <div className="msg-avatar user-avatar">
          <User size={14} />
        </div>
      )}
    </div>
  )
}

export default function Chatbot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      role: 'bot',
      text: "👋 Hi there! I'm Vaibhav's AI assistant. I can help you learn about skills, projects, experience, and more. What would you like to know?",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [showQuick, setShowQuick] = useState(true)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300)
  }, [open])

  const getTime = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

  const sendMessage = async (text = input.trim()) => {
    if (!text || loading) return
    setInput('')
    setShowQuick(false)
    const userMsg = { role: 'user', text, time: getTime() }
    setMessages(m => [...m, userMsg])
    setLoading(true)

    try {
     const res = await axios.post(`${API_URL}/api/chat`,{ message: text });
      const botMsg = {
        role: 'bot',
        text: res.data.reply || "I'm not sure about that. Try asking about my skills or projects!",
        time: getTime()
      }
      setMessages(m => [...m, botMsg])
    } catch {
      setMessages(m => [...m, {
        role: 'bot',
        text: '⚠️ I\'m having trouble connecting to the server. Please try again!',
        time: getTime()
      }])
    } finally {
      setLoading(false)
    }
  }

  const handleKey = e => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage() }
  }

  const resetChat = () => {
    setMessages([{
      role: 'bot',
      text: "Chat reset! 👋 What would you like to know about Vaibhav?",
      time: getTime()
    }])
    setShowQuick(true)
  }

  return (
    <>
      {/* Floating button */}
      <button
        className={`chat-toggle ${open ? 'active' : ''}`}
        onClick={() => setOpen(!open)}
        aria-label="Open chatbot"
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
        {!open && <span className="chat-badge">Ask me!</span>}
      </button>

      {/* Chat window */}
      <div className={`chat-window ${open ? 'visible' : ''}`}>
        {/* Header */}
        <div className="chat-header">
          <div className="chat-header-info">
            <div className="chat-avatar-wrap">
              <Bot size={18} />
              <span className="chat-online-dot" />
            </div>
            <div>
              <div className="chat-header-name">Vaibhav's Assistant</div>
              <div className="chat-header-status">
                <Sparkles size={11} />
                <span>Powered by AI</span>
              </div>
            </div>
          </div>
          <div className="chat-header-actions">
            <button className="chat-action-btn" onClick={resetChat} title="Reset chat">
              <RefreshCw size={15} />
            </button>
            <button className="chat-action-btn" onClick={() => setOpen(false)} title="Close">
              <X size={15} />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="chat-messages">
          {messages.map((msg, i) => <Message key={i} msg={msg} />)}

          {loading && (
            <div className="msg-wrap bot">
              <div className="msg-avatar bot-avatar"><Bot size={14} /></div>
              <div className="typing-indicator">
                <span /><span /><span />
              </div>
            </div>
          )}

          {/* Quick actions */}
          {showQuick && messages.length <= 1 && !loading && (
            <div className="quick-actions">
              <div className="quick-label">Quick questions:</div>
              <div className="quick-btns">
                {QUICK_ACTIONS.map(qa => (
                  <button key={qa.label} className="quick-btn" onClick={() => sendMessage(qa.query)}>
                    {qa.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="chat-input-wrap">
          <div className="chat-input-row">
            <textarea
              ref={inputRef}
              className="chat-input"
              placeholder="Ask about skills, projects, experience..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              rows={1}
              disabled={loading}
            />
            <button
              className="chat-send"
              onClick={() => sendMessage()}
              disabled={!input.trim() || loading}
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .chat-toggle {
          position: fixed;
          bottom: 28px;
          right: 28px;
          z-index: 1000;
          width: 58px; height: 58px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--accent), var(--accent-light));
          border: none;
          color: #fff;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 8px 32px var(--accent-glow), 0 4px 12px rgba(0,0,0,0.3);
          transition: var(--transition);
          animation: pulse-glow 3s ease-in-out infinite;
        }
        .chat-toggle:hover { transform: scale(1.1); }
        .chat-toggle.active { background: var(--bg-card); border: 1px solid var(--border); animation: none; }
        .chat-badge {
          position: absolute;
          top: -8px; right: -8px;
          background: var(--accent-2);
          color: #fff;
          font-size: 0.65rem;
          font-weight: 700;
          padding: 3px 8px;
          border-radius: 100px;
          white-space: nowrap;
          border: 2px solid var(--bg-primary);
        }
        .chat-window {
          position: fixed;
          bottom: 100px;
          right: 28px;
          z-index: 999;
          width: 380px;
          max-height: 580px;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 20px;
          display: flex;
          flex-direction: column;
          box-shadow: 0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(124,58,237,0.1);
          overflow: hidden;
          transform: scale(0.9) translateY(20px);
          opacity: 0;
          pointer-events: none;
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          transform-origin: bottom right;
        }
        .chat-window.visible {
          transform: scale(1) translateY(0);
          opacity: 1;
          pointer-events: all;
        }
        .chat-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 18px;
          background: linear-gradient(135deg, rgba(124,58,237,0.15) 0%, rgba(6,182,212,0.08) 100%);
          border-bottom: 1px solid var(--border);
        }
        .chat-header-info { display: flex; align-items: center; gap: 12px; }
        .chat-avatar-wrap {
          position: relative;
          width: 36px; height: 36px;
          background: linear-gradient(135deg, var(--accent), var(--accent-light));
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
        }
        .chat-online-dot {
          position: absolute;
          bottom: 0; right: 0;
          width: 10px; height: 10px;
          background: #34d399;
          border-radius: 50%;
          border: 2px solid var(--bg-card);
        }
        .chat-header-name {
          font-family: var(--font-display);
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--text-primary);
        }
        .chat-header-status {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 0.72rem;
          color: var(--accent-light);
        }
        .chat-header-actions { display: flex; gap: 6px; }
        .chat-action-btn {
          background: rgba(255,255,255,0.05);
          border: 1px solid var(--border);
          color: var(--text-secondary);
          width: 30px; height: 30px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: var(--transition);
        }
        .chat-action-btn:hover { color: var(--text-primary); border-color: var(--border-hover); }
        .chat-messages {
          flex: 1;
          overflow-y: auto;
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          min-height: 0;
          max-height: 380px;
        }
        .chat-messages::-webkit-scrollbar { width: 4px; }
        .chat-messages::-webkit-scrollbar-thumb { background: var(--border); border-radius: 2px; }
        .msg-wrap {
          display: flex;
          align-items: flex-end;
          gap: 8px;
        }
        .msg-wrap.user { flex-direction: row-reverse; }
        .msg-avatar {
          width: 28px; height: 28px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .bot-avatar {
          background: linear-gradient(135deg, var(--accent), var(--accent-light));
          color: #fff;
        }
        .user-avatar {
          background: var(--bg-secondary);
          border: 1px solid var(--border);
          color: var(--text-secondary);
        }
        .msg-bubble {
          max-width: 80%;
          padding: 10px 14px;
          border-radius: 16px;
          position: relative;
        }
        .bot-bubble {
          background: var(--bg-secondary);
          border: 1px solid var(--border);
          border-bottom-left-radius: 4px;
        }
        .user-bubble {
          background: linear-gradient(135deg, var(--accent), var(--accent-light));
          color: #fff;
          border-bottom-right-radius: 4px;
        }
        .msg-text {
          font-size: 0.85rem;
          line-height: 1.6;
          color: inherit;
        }
        .bot-bubble .msg-text { color: var(--text-primary); }
        .msg-time {
          font-size: 0.65rem;
          margin-top: 4px;
          opacity: 0.5;
        }
        .typing-indicator {
          display: flex;
          align-items: center;
          gap: 4px;
          background: var(--bg-secondary);
          border: 1px solid var(--border);
          border-radius: 16px;
          border-bottom-left-radius: 4px;
          padding: 12px 16px;
        }
        .typing-indicator span {
          width: 6px; height: 6px;
          background: var(--text-muted);
          border-radius: 50%;
          animation: bounce 1.2s ease-in-out infinite;
        }
        .typing-indicator span:nth-child(2) { animation-delay: 0.2s; }
        .typing-indicator span:nth-child(3) { animation-delay: 0.4s; }
        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-6px); }
        }
        .quick-actions { margin-top: 4px; }
        .quick-label { font-size: 0.72rem; color: var(--text-muted); margin-bottom: 8px; }
        .quick-btns { display: flex; flex-wrap: wrap; gap: 6px; }
        .quick-btn {
          background: rgba(124,58,237,0.08);
          border: 1px solid rgba(124,58,237,0.2);
          color: var(--accent-light);
          font-family: var(--font-body);
          font-size: 0.75rem;
          font-weight: 500;
          padding: 6px 12px;
          border-radius: 100px;
          cursor: pointer;
          transition: var(--transition);
        }
        .quick-btn:hover { background: rgba(124,58,237,0.15); transform: translateY(-1px); }
        .chat-input-wrap {
          padding: 12px 16px;
          border-top: 1px solid var(--border);
          background: var(--bg-secondary);
        }
        .chat-input-row {
          display: flex;
          gap: 8px;
          align-items: flex-end;
        }
        .chat-input {
          flex: 1;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 10px 14px;
          color: var(--text-primary);
          font-family: var(--font-body);
          font-size: 0.85rem;
          outline: none;
          resize: none;
          line-height: 1.5;
          transition: var(--transition);
          max-height: 100px;
          overflow-y: auto;
        }
        .chat-input:focus { border-color: var(--accent); box-shadow: 0 0 0 2px var(--accent-glow); }
        .chat-input::placeholder { color: var(--text-muted); }
        .chat-send {
          width: 38px; height: 38px;
          border-radius: 10px;
          background: linear-gradient(135deg, var(--accent), var(--accent-light));
          border: none;
          color: #fff;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: var(--transition);
          flex-shrink: 0;
        }
        .chat-send:hover:not(:disabled) { transform: scale(1.05); }
        .chat-send:disabled { opacity: 0.4; cursor: not-allowed; }
        @media (max-width: 480px) {
          .chat-window { width: calc(100vw - 32px); right: 16px; bottom: 90px; }
          .chat-toggle { right: 16px; bottom: 16px; }
        }
      `}</style>
    </>
  )
}
