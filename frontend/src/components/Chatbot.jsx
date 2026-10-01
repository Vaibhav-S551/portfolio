import { useState, useEffect, useRef } from 'react'
import axios from 'axios'

import {
  MessageCircle,
  X,
  Send,
  Bot,
  User,
  Sparkles,
  RefreshCw,
  Copy,
  Check,
  ThumbsUp,
  ThumbsDown,
  ExternalLink,
  FileText,
  Github,
  Linkedin,
  Mail,
  Code2,
  FolderGit2,
  Cpu,
  ChevronRight,
  Download,
  Layers,
  Search
} from 'lucide-react'

/*
|--------------------------------------------------------------------------
| PORTFOLIO PROJECTS
|--------------------------------------------------------------------------
|
| IMPORTANT:
| Replace the githubUrl values with your actual GitHub repository URLs.
|
*/

const PROJECTS = [
  {
    id: 'taskboard',

    name: 'TaskBoard',

    shortName: 'TaskBoard',

    description:
      'A full-stack Kanban task-management and collaboration platform where users can create boards, lists, cards, tasks, checklists and collaborate with other users.',

    technologies: [
      'Java',
      'Spring Boot',
      'Spring Security',
      'JWT',
      'Hibernate / JPA',
      'MySQL',
      'React.js',
      'Vite',
      'Axios',
      'REST APIs'
    ],

    features: [
      'JWT authentication and authorization',
      'Kanban boards',
      'Lists and cards',
      'Task management',
      'Checklists',
      'Activity tracking',
      'Notifications',
      'Search history',
      'REST APIs',
      'Role-based security'
    ],

    githubUrl: 'https://github.com/Vaibhav-S551/taskboard.git',

    projectUrl: '',

    icon: '📋'
  },

  {
    id: 'legacylens',

    name: 'AI Code Modernization System',

    shortName: 'LegacyLens',

    description:
      'An AI-powered legacy Java code modernization assistant that analyzes older Java code, identifies code smells and security issues, explains legacy code and provides modernization suggestions.',

    technologies: [
      'Java',
      'Spring Boot',
      'Spring Security',
      'JWT',
      'JavaParser',
      'React',
      'Vite',
      'Axios',
      'AI'
    ],

    features: [
      'Legacy Java code analysis',
      'JavaParser AST analysis',
      'Code smell detection',
      'Security issue analysis',
      'Java modernization suggestions',
      'Java 8 to Java 17 modernization',
      'Code explanations',
      'Documentation generation',
      'Test generation',
      'Project/codebase upload'
    ],

    githubUrl: 'https://github.com/Vaibhav-S551/AI-code-moderization-system.git',

    projectUrl: '',

    icon: '🤖'
  },

  {
    id: 'student-management',

    name: 'Student Management System',

    shortName: 'Student Management',

    description:
      'A role-based student management platform designed for administrators, teachers and students, with dashboards, academic management and AI-assisted functionality.',

    technologies: [
      'Java',
      'Spring Boot',
      'React',
      'Vite',
      'JWT',
      'REST APIs',
      'Role-Based Access',
      'AI Integration'
    ],

    features: [
      'Admin dashboard',
      'Teacher dashboard',
      'Student dashboard',
      'Role-based access',
      'JWT authentication',
      'Student management',
      'Academic management',
      'AI assistant',
      'REST API integration'
    ],

    githubUrl: '',

    projectUrl: '',

    icon: '🎓'
  }
]

/*
|--------------------------------------------------------------------------
| Quick Questions
|--------------------------------------------------------------------------
*/

const QUICK_ACTIONS = [
  {
    label: '🛠️ Skills',
    query: 'What are your skills?'
  },

  {
    label: '🚀 Projects',
    query: 'Show me your projects'
  },

  {
    label: '📋 TaskBoard',
    query: 'Tell me about TaskBoard'
  },

  {
    label: '🤖 LegacyLens',
    query: 'Tell me about LegacyLens'
  },

  {
    label: '🎓 Student Management',
    query: 'Tell me about the Student Management System'
  },

  {
    label: '📄 Resume',
    query: 'I want to download your resume'
  },

  {
    label: '📬 Contact',
    query: 'How can I contact you?'
  }
]

/*
|--------------------------------------------------------------------------
| Default Follow-Up Questions
|--------------------------------------------------------------------------
*/

const DEFAULT_FOLLOWUPS = [
  'What technologies do you use?',
  'Tell me about your other projects',
  'How can I contact you?'
]

/*
|--------------------------------------------------------------------------
| Portfolio Links
|--------------------------------------------------------------------------
*/

const PORTFOLIO_ACTIONS = [
  {
    label: 'Resume',
    icon: <FileText size={14} />,
    href: '/resume.pdf',
    download: true
  },

  {
    label: 'GitHub',
    icon: <Github size={14} />,
    href: 'https://github.com/Vaibhav-S551'
  },

  {
    label: 'LinkedIn',
    icon: <Linkedin size={14} />,
    href: 'https://www.linkedin.com/in/vaibhav-satpute-524334254'
  },

  {
    label: 'Contact',
    icon: <Mail size={14} />,
    href: 'mailto:vaibhav.satpute2494@email.com'
  }
]

/*
|--------------------------------------------------------------------------
| Find Project From Message
|--------------------------------------------------------------------------
*/

function findProjectFromMessage(text = '') {
  const message = text.toLowerCase()

  if (
    message.includes('taskboard') ||
    message.includes('task board') ||
    message.includes('kanban')
  ) {
    return PROJECTS.find(
      (project) => project.id === 'taskboard'
    )
  }

  if (
    message.includes('legacylens') ||
    message.includes('legacy lens') ||
    message.includes('modernization') ||
    message.includes('modernisation') ||
    message.includes('legacy code') ||
    message.includes('code modernization')
  ) {
    return PROJECTS.find(
      (project) => project.id === 'legacylens'
    )
  }

  if (
    message.includes('student management') ||
    message.includes('student system') ||
    message.includes('student project')
  ) {
    return PROJECTS.find(
      (project) =>
        project.id === 'student-management'
    )
  }

  return null
}

/*
|--------------------------------------------------------------------------
| Check If User Wants Projects
|--------------------------------------------------------------------------
*/

function wantsProjectList(text = '') {
  const message = text.toLowerCase()

  return (
    message.includes('your projects') ||
    message.includes('show projects') ||
    message.includes('list projects') ||
    message.includes('projects you built') ||
    message.includes('projects have you') ||
    message.includes('all projects')
  )
}

/*
|--------------------------------------------------------------------------
| Check If User Wants Resume
|--------------------------------------------------------------------------
*/

function wantsResume(text = '') {
  const message = text.toLowerCase()

  return (
    message.includes('resume') ||
    message.includes('cv') ||
    message.includes('download resume') ||
    message.includes('download cv')
  )
}

/*
|--------------------------------------------------------------------------
| Safe Message Formatting
|--------------------------------------------------------------------------
*/

function formatMessage(text = '') {
  const parts = text.split(
    /(\*\*.*?\*\*|https?:\/\/[^\s]+|\n)/g
  )

  return parts.map((part, index) => {
    if (!part) {
      return null
    }

    if (part === '\n') {
      return <br key={index} />
    }

    if (
      part.startsWith('**') &&
      part.endsWith('**')
    ) {
      return (
        <strong key={index}>
          {part.slice(2, -2)}
        </strong>
      )
    }

    if (
      part.startsWith('http://') ||
      part.startsWith('https://')
    ) {
      return (
        <a
          key={index}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="chat-link"
        >
          {part}
          <ExternalLink size={11} />
        </a>
      )
    }

    return (
      <span key={index}>
        {part}
      </span>
    )
  })
}

/*
|--------------------------------------------------------------------------
| Project Card
|--------------------------------------------------------------------------
*/

function ProjectCard({
  project,
  onAsk
}) {
  return (
    <div className="project-card">

      {/* Project Header */}

      <div className="project-card-header">

        <div className="project-icon">
          {project.icon}
        </div>

        <div className="project-title-area">

          <h4>
            {project.name}
          </h4>

          <span>
            {project.shortName}
          </span>

        </div>

      </div>

      {/* Description */}

      <p className="project-description">
        {project.description}
      </p>

      {/* Technologies */}

      <div className="project-section">

        <div className="project-section-title">

          <Cpu size={13} />

          Technologies

        </div>

        <div className="technology-list">

          {project.technologies.map(
            (technology) => (
              <span
                className="technology-tag"
                key={technology}
              >
                {technology}
              </span>
            )
          )}

        </div>

      </div>

      {/* Features */}

      <div className="project-section">

        <div className="project-section-title">

          <Layers size={13} />

          Key Features

        </div>

        <ul className="project-features">

          {project.features
            .slice(0, 5)
            .map((feature) => (
              <li key={feature}>
                <span className="feature-dot">
                  ✓
                </span>

                {feature}
              </li>
            ))}

        </ul>

      </div>

      {/* Actions */}

      <div className="project-actions">

        {project.githubUrl ? (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="project-action primary"
          >
            <Github size={14} />

            View GitHub

            <ExternalLink size={11} />
          </a>
        ) : (
          <button
            type="button"
            className="project-action disabled"
            title="Add the GitHub repository URL in Chatbot.jsx"
          >
            <Github size={14} />

            GitHub not added
          </button>
        )}

        {project.projectUrl ? (
          <a
            href={project.projectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="project-action"
          >
            <ExternalLink size={14} />

            Live Project
          </a>
        ) : (
          <button
            type="button"
            className="project-action"
            onClick={() =>
              onAsk(
                `How does ${project.shortName} work?`
              )
            }
          >
            <Search size={14} />

            Ask about it
          </button>
        )}

      </div>

    </div>
  )
}

/*
|--------------------------------------------------------------------------
| Project List
|--------------------------------------------------------------------------
*/

function ProjectList({
  onAsk
}) {
  return (
    <div className="project-list">

      <div className="project-list-heading">

        <FolderGit2 size={15} />

        <span>
          Vaibhav's Projects
        </span>

      </div>

      {PROJECTS.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          onAsk={onAsk}
        />
      ))}

    </div>
  )
}

/*
|--------------------------------------------------------------------------
| Message Component
|--------------------------------------------------------------------------
*/

function Message({
  msg,
  index,
  onFeedback
}) {
  const isBot =
    msg.role === 'bot'

  const [copied, setCopied] =
    useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(
        msg.text
      )

      setCopied(true)

      setTimeout(() => {
        setCopied(false)
      }, 1800)

    } catch (error) {
      console.error(
        'Copy failed:',
        error
      )
    }
  }

  return (
    <div
      className={`msg-wrap ${
        isBot ? 'bot' : 'user'
      }`}
    >

      {isBot && (
        <div className="msg-avatar bot-avatar">
          <Bot size={14} />
        </div>
      )}

      <div className="message-content">

        <div
          className={`msg-bubble ${
            isBot
              ? 'bot-bubble'
              : 'user-bubble'
          }`}
        >

          <div className="msg-text">
            {formatMessage(msg.text)}
          </div>

          <div className="msg-time">
            {msg.time}
          </div>

        </div>

        {isBot && !msg.error && (
          <div className="message-actions">

            <button
              type="button"
              className={`message-action ${
                copied ? 'active' : ''
              }`}
              onClick={handleCopy}
              title="Copy response"
            >
              {copied ? (
                <>
                  <Check size={12} />
                  Copied
                </>
              ) : (
                <>
                  <Copy size={12} />
                  Copy
                </>
              )}
            </button>

            <button
              type="button"
              className={`message-icon-action ${
                msg.feedback === 'up'
                  ? 'selected'
                  : ''
              }`}
              onClick={() =>
                onFeedback(
                  index,
                  'up'
                )
              }
              title="Helpful"
            >
              <ThumbsUp size={12} />
            </button>

            <button
              type="button"
              className={`message-icon-action ${
                msg.feedback === 'down'
                  ? 'selected'
                  : ''
              }`}
              onClick={() =>
                onFeedback(
                  index,
                  'down'
                )
              }
              title="Not helpful"
            >
              <ThumbsDown size={12} />
            </button>

          </div>
        )}

      </div>

      {!isBot && (
        <div className="msg-avatar user-avatar">
          <User size={14} />
        </div>
      )}

    </div>
  )
}

/*
|--------------------------------------------------------------------------
| Typing Indicator
|--------------------------------------------------------------------------
*/

function TypingIndicator() {
  return (
    <div className="msg-wrap bot">

      <div className="msg-avatar bot-avatar">
        <Bot size={14} />
      </div>

      <div className="typing-container">

        <div className="typing-label">
          Vaibhav's Assistant is typing
        </div>

        <div className="typing-indicator">

          <span />
          <span />
          <span />

        </div>

      </div>

    </div>
  )
}

/*
|--------------------------------------------------------------------------
| Main Chatbot
|--------------------------------------------------------------------------
*/

export default function Chatbot() {

  const [open, setOpen] =
    useState(false)

  const [messages, setMessages] =
    useState([
      {
        role: 'bot',

        text:
          "👋 Hi there! I'm Vaibhav's AI assistant.\n\nI can help you explore my skills, projects, technologies, experience, certifications and resume.\n\nYou can also ask me about a specific project and I'll show you its technologies and GitHub code.",

        time: new Date().toLocaleTimeString(
          [],
          {
            hour: '2-digit',
            minute: '2-digit'
          }
        )
      }
    ])

  const [input, setInput] =
    useState('')

  const [loading, setLoading] =
    useState(false)

  const [showQuick, setShowQuick] =
    useState(true)

  const [followUps, setFollowUps] =
    useState([])

  const [showNotification, setShowNotification] =
    useState(true)

  const messagesEndRef =
    useRef(null)

  const inputRef =
    useRef(null)

  /*
  |--------------------------------------------------------------------------
  | Scroll
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth'
    })
  }, [
    messages,
    loading
  ])

  /*
  |--------------------------------------------------------------------------
  | Focus
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    if (open) {

      setShowNotification(false)

      setTimeout(() => {
        inputRef.current?.focus()
      }, 300)
    }
  }, [open])

  /*
  |--------------------------------------------------------------------------
  | Time
  |--------------------------------------------------------------------------
  */

  const getTime = () =>
    new Date().toLocaleTimeString(
      [],
      {
        hour: '2-digit',
        minute: '2-digit'
      }
    )

  /*
  |--------------------------------------------------------------------------
  | Add Project Information To Chat
  |--------------------------------------------------------------------------
  */

  const showProject = (
    project
  ) => {

    if (!project) {
      return
    }

    setMessages((current) => [
      ...current,

      {
        role: 'bot',

        text:
          `🚀 **${project.name}**\n\n${project.description}\n\n🛠️ **Technologies:**\n${project.technologies.map(
            (tech) => `• ${tech}`
          ).join('\n')}\n\n⭐ **Key Features:**\n${project.features
            .map(
              (feature) =>
                `• ${feature}`
            )
            .join('\n')}`,

        time: getTime(),

        projectId: project.id
      }
    ])

    setFollowUps([
      `What technologies were used in ${project.shortName}?`,
      `What are the main features of ${project.shortName}?`,
      `Show me the GitHub code for ${project.shortName}`
    ])
  }

  /*
  |--------------------------------------------------------------------------
  | Send Message
  |--------------------------------------------------------------------------
  */

  const sendMessage = async (
    text = input.trim()
  ) => {

    if (!text || loading) {
      return
    }

    const userText =
      text.trim()

    setInput('')
    setShowQuick(false)
    setFollowUps([])

    const userMsg = {
      role: 'user',
      text: userText,
      time: getTime()
    }

    /*
    |--------------------------------------------------------------------------
    | Local Project Detection
    |--------------------------------------------------------------------------
    */

    const matchedProject =
      findProjectFromMessage(
        userText
      )

    /*
    |--------------------------------------------------------------------------
    | Resume
    |--------------------------------------------------------------------------
    */

    if (
      wantsResume(userText)
    ) {

      setMessages((current) => [
        ...current,
        userMsg,

        {
          role: 'bot',

          text:
            "📄 Absolutely! You can download Vaibhav's resume using the button below.",

          time: getTime(),

          resumeAction: true
        }
      ])

      setFollowUps([
        'Show me your projects',
        'What are your skills?',
        'How can I contact you?'
      ])

      return
    }

    /*
    |--------------------------------------------------------------------------
    | Project List
    |--------------------------------------------------------------------------
    */

    if (
      wantsProjectList(userText)
    ) {

      setMessages((current) => [
        ...current,
        userMsg,

        {
          role: 'bot',

          text:
            "🚀 Here are some of the projects Vaibhav has built. Select a project to learn about its technologies, features and GitHub code.",

          time: getTime(),

          projectList: true
        }
      ])

      return
    }

    /*
    |--------------------------------------------------------------------------
    | Specific Project
    |--------------------------------------------------------------------------
    */

    if (matchedProject) {

      setMessages((current) => [
        ...current,
        userMsg
      ])

      setTimeout(() => {
        showProject(
          matchedProject
        )
      }, 250)

      return
    }

    /*
    |--------------------------------------------------------------------------
    | Conversation History
    |--------------------------------------------------------------------------
    */

    const conversationHistory =
      messages.map((msg) => ({
        role:
          msg.role === 'bot'
            ? 'assistant'
            : 'user',

        content:
          msg.text
      }))

    setMessages((current) => [
      ...current,
      userMsg
    ])

    setLoading(true)

    try {

      /*
      |--------------------------------------------------------------------------
      | Chat API
      |--------------------------------------------------------------------------
      */

      const res =
        await axios.post(
          '/api/chat',
          {
            message:
              userText,

            history:
              conversationHistory
          }
        )

      const reply =
        res.data?.reply ||
        "I'm not sure about that. Try asking about my skills, projects or experience."

      const botMsg = {
        role: 'bot',

        text: reply,

        time: getTime()
      }

      setMessages((current) => [
        ...current,
        botMsg
      ])

      /*
      |--------------------------------------------------------------------------
      | Backend Suggestions
      |--------------------------------------------------------------------------
      */

      if (
        Array.isArray(
          res.data?.suggestions
        ) &&
        res.data.suggestions.length > 0
      ) {

        setFollowUps(
          res.data.suggestions.slice(
            0,
            3
          )
        )

      } else {

        setFollowUps(
          DEFAULT_FOLLOWUPS
        )
      }

    } catch (err) {

      console.error(
        'Chat request failed:',
        err.response?.data ||
          err.message
      )

      setMessages((current) => [
        ...current,

        {
          role: 'bot',

          text:
            "⚠️ I'm having trouble connecting to the server. Please make sure the backend is running and try again.",

          time: getTime(),

          error: true
        }
      ])

      setFollowUps([
        'Try again'
      ])

    } finally {

      setLoading(false)
    }
  }

  /*
  |--------------------------------------------------------------------------
  | Retry
  |--------------------------------------------------------------------------
  */

  const retryLastMessage = () => {

    const lastUserMessage =
      [...messages]
        .reverse()
        .find(
          (msg) =>
            msg.role === 'user'
        )

    if (lastUserMessage) {
      sendMessage(
        lastUserMessage.text
      )
    }
  }

  /*
  |--------------------------------------------------------------------------
  | Keyboard
  |--------------------------------------------------------------------------
  */

  const handleKey = (e) => {

    if (
      e.key === 'Enter' &&
      !e.shiftKey
    ) {

      e.preventDefault()

      sendMessage()
    }
  }

  /*
  |--------------------------------------------------------------------------
  | Reset
  |--------------------------------------------------------------------------
  */

  const resetChat = () => {

    setMessages([
      {
        role: 'bot',

        text:
          "Chat reset! 👋\n\nWhat would you like to know about Vaibhav?",

        time: getTime()
      }
    ])

    setInput('')

    setShowQuick(true)

    setFollowUps([])
  }

  /*
  |--------------------------------------------------------------------------
  | Feedback
  |--------------------------------------------------------------------------
  */

  const handleFeedback = (
    messageIndex,
    feedback
  ) => {

    setMessages((current) =>
      current.map(
        (msg, index) =>
          index === messageIndex
            ? {
                ...msg,

                feedback:
                  msg.feedback ===
                  feedback
                    ? null
                    : feedback
              }
            : msg
      )
    )
  }

  /*
  |--------------------------------------------------------------------------
  | Render
  |--------------------------------------------------------------------------
  */

  return (
    <>
      {/* ================================================================
          Floating Button
      ================================================================= */}

      <button
        className={`chat-toggle ${
          open ? 'active' : ''
        }`}
        onClick={() =>
          setOpen(!open)
        }
        type="button"
        aria-label={
          open
            ? 'Close chatbot'
            : 'Open chatbot'
        }
      >

        {open ? (
          <X size={22} />
        ) : (
          <MessageCircle size={22} />
        )}

        {!open && (
          <>
            <span className="chat-badge">
              Ask me!
            </span>

            {showNotification && (
              <span className="notification-dot" />
            )}
          </>
        )}

      </button>

      {/* ================================================================
          Chat Window
      ================================================================= */}

      <div
        className={`chat-window ${
          open ? 'visible' : ''
        }`}
      >

        {/* ==============================================================
            Header
        =============================================================== */}

        <div className="chat-header">

          <div className="chat-header-info">

            <div className="chat-avatar-wrap">

              <Bot size={18} />

              <span className="chat-online-dot" />

            </div>

            <div>

              <div className="chat-header-name">
                Vaibhav's Assistant
              </div>

              <div className="chat-header-status">

                <Sparkles size={11} />

                AI Portfolio Assistant

              </div>

            </div>

          </div>

          <div className="chat-header-actions">

            <button
              className="chat-action-btn"
              onClick={resetChat}
              title="Reset conversation"
              type="button"
            >
              <RefreshCw size={15} />
            </button>

            <button
              className="chat-action-btn"
              onClick={() =>
                setOpen(false)
              }
              title="Close"
              type="button"
            >
              <X size={15} />
            </button>

          </div>

        </div>

        {/* ==============================================================
            Status
        =============================================================== */}

        <div className="chat-subheader">

          <div className="status-dot" />

          <span>
            Ask me about My projects,
            skills and experience
          </span>

        </div>

        {/* ==============================================================
            Messages
        =============================================================== */}

        <div className="chat-messages">

          {messages.map(
            (msg, index) => (
              <div key={index}>

                <Message
                  msg={msg}
                  index={index}
                  onFeedback={
                    handleFeedback
                  }
                />

                {/* Project List */}

                {msg.projectList && (
                  <ProjectList
                    onAsk={sendMessage}
                  />
                )}

                {/* Resume */}

                {msg.resumeAction && (
                  <div className="resume-card">

                    <div className="resume-icon">
                      <FileText size={22} />
                    </div>

                    <div className="resume-info">

                      <strong>
                        Vaibhav Satpute
                      </strong>

                      <span>
                        Java Full Stack Developer
                      </span>

                    </div>

                    <a
                      href="/resume.pdf"
                      download="Vaibhav-Satpute-Resume.pdf"
                      className="resume-download"
                    >
                      <Download size={15} />

                      Download

                    </a>

                  </div>
                )}

                {/* Specific project card */}

                {msg.projectId && (
                  <div className="project-mini-card">

                    {(() => {

                      const project =
                        PROJECTS.find(
                          (item) =>
                            item.id ===
                            msg.projectId
                        )

                      if (!project) {
                        return null
                      }

                      return (
                        <>
                          <div className="project-mini-header">

                            <span>
                              {project.icon}
                            </span>

                            <strong>
                              {project.shortName}
                            </strong>

                          </div>

                          <div className="mini-tech-list">

                            {project.technologies
                              .slice(0, 6)
                              .map(
                                (
                                  tech
                                ) => (
                                  <span
                                    key={
                                      tech
                                    }
                                  >
                                    {tech}
                                  </span>
                                )
                              )}

                          </div>

                          <div className="mini-project-actions">

                            {project.githubUrl ? (
                              <a
                                href={
                                  project.githubUrl
                                }
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <Github
                                  size={13}
                                />

                                GitHub Code

                                <ExternalLink
                                  size={10}
                                />
                              </a>
                            ) : (
                              <span className="not-configured">
                                <Github
                                  size={13}
                                />

                                Add GitHub URL
                              </span>
                            )}

                            {project.projectUrl && (
                              <a
                                href={
                                  project.projectUrl
                                }
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <ExternalLink
                                  size={13}
                                />

                                Live Demo
                              </a>
                            )}

                          </div>

                        </>
                      )
                    })()}

                  </div>
                )}

              </div>
            )
          )}

          {/* Typing */}

          {loading && (
            <TypingIndicator />
          )}

          {/* ============================================================
              Quick Actions
          ============================================================= */}

          {showQuick &&
            messages.length === 1 &&
            !loading && (

              <div className="quick-actions">

                <div className="quick-label">

                  <Sparkles size={12} />

                  Explore My portfolio

                </div>

                <div className="quick-btns">

                  {QUICK_ACTIONS.map(
                    (qa) => (
                      <button
                        key={
                          qa.label
                        }
                        className="quick-btn"
                        onClick={() =>
                          sendMessage(
                            qa.query
                          )
                        }
                        type="button"
                      >
                        {qa.label}
                      </button>
                    )
                  )}

                </div>

              </div>
            )}

          {/* ============================================================
              Follow Ups
          ============================================================= */}

          {!loading &&
            followUps.length > 0 && (

              <div className="followup-section">

                <div className="followup-label">
                  You might also ask:
                </div>

                <div className="followup-list">

                  {followUps.map(
                    (
                      question,
                      index
                    ) => (
                      <button
                        key={`${question}-${index}`}
                        className="followup-btn"
                        onClick={() =>
                          question ===
                          'Try again'
                            ? retryLastMessage()
                            : sendMessage(
                                question
                              )
                        }
                        type="button"
                      >
                        <ChevronRight
                          size={12}
                        />

                        {question}

                      </button>
                    )
                  )}

                </div>

              </div>
            )}

          <div
            ref={
              messagesEndRef
            }
          />

        </div>

        {/* ==============================================================
            Portfolio Actions
        ============================================================== */}

        <div className="portfolio-actions">

          {PORTFOLIO_ACTIONS.map(
            (action) => (
              <a
                key={action.label}
                href={action.href}
                download={
                  action.download
                    ? 'Vaibhav-Satpute-Resume.pdf'
                    : undefined
                }
                target={
                  action.href.startsWith(
                    'http'
                  )
                    ? '_blank'
                    : undefined
                }
                rel={
                  action.href.startsWith(
                    'http'
                  )
                    ? 'noopener noreferrer'
                    : undefined
                }
                className="portfolio-action"
              >
                {action.icon}

                {action.label}

              </a>
            )
          )}

        </div>

        {/* ==============================================================
            Input
        ============================================================== */}

        <div className="chat-input-wrap">

          <div className="chat-input-row">

            <textarea
              ref={inputRef}
              className="chat-input"
              placeholder="Ask about projects, technologies, resume..."
              value={input}
              onChange={(e) =>
                setInput(
                  e.target.value
                )
              }
              onKeyDown={handleKey}
              rows={1}
              disabled={loading}
              aria-label="Chat message"
            />

            <button
              className="chat-send"
              onClick={() =>
                sendMessage()
              }
              disabled={
                !input.trim() ||
                loading
              }
              type="button"
              aria-label="Send message"
            >
              <Send size={16} />
            </button>

          </div>

          <div className="input-hint">
            Enter to send · Shift + Enter for new line
          </div>

        </div>

      </div>

      {/* ================================================================
          CSS
      ================================================================= */}

      <style>{`

        /* ==============================================================
           Floating Button
        ============================================================== */

        .chat-toggle {
          position: fixed;

          bottom: 28px;
          right: 28px;

          z-index: 1000;

          width: 58px;
          height: 58px;

          border-radius: 50%;

          background:
            linear-gradient(
              135deg,
              var(--accent),
              var(--accent-light)
            );

          border: none;

          color: #fff;

          cursor: pointer;

          display: flex;
          align-items: center;
          justify-content: center;

          box-shadow:
            0 8px 32px
              var(--accent-glow),
            0 4px 12px
              rgba(0,0,0,0.3);

          transition:
            var(--transition);

          animation:
            chatbot-pulse 3s
            ease-in-out infinite;
        }

        .chat-toggle:hover {
          transform:
            scale(1.08);
        }

        .chat-toggle.active {
          background:
            var(--bg-card);

          border:
            1px solid
            var(--border);

          animation: none;
        }

        @keyframes chatbot-pulse {

          0%,
          100% {
            box-shadow:
              0 8px 32px
              var(--accent-glow),
              0 4px 12px
              rgba(0,0,0,0.3);
          }

          50% {
            box-shadow:
              0 8px 42px
              var(--accent-glow),
              0 4px 12px
              rgba(0,0,0,0.3);
          }
        }

        .chat-badge {
          position: absolute;

          top: -8px;
          right: -8px;

          background:
            var(--accent-2);

          color: #fff;

          font-size: 0.63rem;

          font-weight: 700;

          padding:
            3px 8px;

          border-radius:
            100px;

          white-space: nowrap;

          border:
            2px solid
            var(--bg-primary);
        }

        .notification-dot {
          position: absolute;

          top: 1px;
          right: 1px;

          width: 10px;
          height: 10px;

          background:
            #34d399;

          border-radius: 50%;

          border:
            2px solid
            var(--bg-primary);
        }

        /* ==============================================================
           Chat Window
        ============================================================== */

        .chat-window {
          position: fixed;

          bottom: 100px;
          right: 28px;

          z-index: 999;

          width: 400px;

          max-height: 700px;

          background:
            var(--bg-card);

          border:
            1px solid
            var(--border);

          border-radius:
            20px;

          display: flex;

          flex-direction: column;

          overflow: hidden;

          box-shadow:
            0 20px 60px
              rgba(0,0,0,0.5);

          transform:
            scale(0.9)
            translateY(20px);

          opacity: 0;

          pointer-events: none;

          transition:
            all 0.3s
            cubic-bezier(
              0.34,
              1.56,
              0.64,
              1
            );

          transform-origin:
            bottom right;
        }

        .chat-window.visible {
          transform:
            scale(1)
            translateY(0);

          opacity: 1;

          pointer-events:
            all;
        }

        /* ==============================================================
           Header
        ============================================================== */

        .chat-header {
          display: flex;

          align-items: center;

          justify-content:
            space-between;

          padding:
            16px 18px;

          background:
            linear-gradient(
              135deg,
              rgba(
                124,
                58,
                237,
                0.15
              ),
              rgba(
                6,
                182,
                212,
                0.08
              )
            );

          border-bottom:
            1px solid
            var(--border);
        }

        .chat-header-info {
          display: flex;

          align-items: center;

          gap: 12px;
        }

        .chat-avatar-wrap {
          position: relative;

          width: 38px;
          height: 38px;

          background:
            linear-gradient(
              135deg,
              var(--accent),
              var(--accent-light)
            );

          border-radius: 50%;

          display: flex;

          align-items: center;
          justify-content: center;

          color: #fff;
        }

        .chat-online-dot {
          position: absolute;

          bottom: 0;
          right: 0;

          width: 10px;
          height: 10px;

          background:
            #34d399;

          border-radius: 50%;

          border:
            2px solid
            var(--bg-card);
        }

        .chat-header-name {
          font-family:
            var(--font-display);

          font-size: 0.95rem;

          font-weight: 700;

          color:
            var(--text-primary);
        }

        .chat-header-status {
          display: flex;

          align-items: center;

          gap: 4px;

          font-size: 0.7rem;

          color:
            var(--accent-light);

          margin-top: 2px;
        }

        .chat-header-actions {
          display: flex;

          gap: 6px;
        }

        .chat-action-btn {
          background:
            rgba(
              255,
              255,
              255,
              0.05
            );

          border:
            1px solid
            var(--border);

          color:
            var(--text-secondary);

          width: 30px;
          height: 30px;

          border-radius: 50%;

          display: flex;

          align-items: center;
          justify-content: center;

          cursor: pointer;

          transition:
            var(--transition);
        }

        .chat-action-btn:hover {
          color:
            var(--text-primary);

          border-color:
            var(--border-hover);
        }

        /* ==============================================================
           Subheader
        ============================================================== */

        .chat-subheader {
          display: flex;

          align-items: center;

          gap: 7px;

          padding:
            8px 16px;

          font-size: 0.68rem;

          color:
            var(--text-muted);

          background:
            var(--bg-secondary);

          border-bottom:
            1px solid
            var(--border);
        }

        .status-dot {
          width: 6px;
          height: 6px;

          border-radius: 50%;

          background:
            #34d399;

          box-shadow:
            0 0 6px
            rgba(
              52,
              211,
              153,
              0.7
            );
        }

        /* ==============================================================
           Messages
        ============================================================== */

        .chat-messages {
          flex: 1;

          overflow-y: auto;

          padding:
            16px;

          display: flex;

          flex-direction: column;

          gap: 13px;

          min-height: 0;

          max-height: 410px;

          scroll-behavior:
            smooth;
        }

        .chat-messages::-webkit-scrollbar {
          width: 4px;
        }

        .chat-messages::-webkit-scrollbar-thumb {
          background:
            var(--border);

          border-radius: 2px;
        }

        .msg-wrap {
          display: flex;

          align-items:
            flex-end;

          gap: 8px;

          animation:
            message-in
            0.25s
            ease-out;
        }

        @keyframes message-in {

          from {
            opacity: 0;

            transform:
              translateY(7px)
              scale(0.98);
          }

          to {
            opacity: 1;

            transform:
              translateY(0)
              scale(1);
          }
        }

        .msg-wrap.user {
          flex-direction:
            row-reverse;
        }

        .msg-avatar {
          width: 28px;
          height: 28px;

          border-radius: 50%;

          display: flex;

          align-items: center;
          justify-content: center;

          flex-shrink: 0;
        }

        .bot-avatar {
          background:
            linear-gradient(
              135deg,
              var(--accent),
              var(--accent-light)
            );

          color: #fff;
        }

        .user-avatar {
          background:
            var(--bg-secondary);

          border:
            1px solid
            var(--border);

          color:
            var(--text-secondary);
        }

        .message-content {
          max-width: 82%;
        }

        .msg-bubble {
          padding:
            10px 14px;

          border-radius:
            16px;
        }

        .bot-bubble {
          background:
            var(--bg-secondary);

          border:
            1px solid
            var(--border);

          border-bottom-left-radius:
            4px;
        }

        .user-bubble {
          background:
            linear-gradient(
              135deg,
              var(--accent),
              var(--accent-light)
            );

          color: #fff;

          border-bottom-right-radius:
            4px;
        }

        .msg-text {
          font-size:
            0.85rem;

          line-height:
            1.6;

          word-break:
            break-word;
        }

        .msg-text strong {
          font-weight:
            700;
        }

        .chat-link {
          display: inline-flex;

          align-items: center;

          gap: 3px;

          color:
            var(--accent-light);

          text-decoration:
            none;

          word-break:
            break-all;
        }

        .chat-link:hover {
          text-decoration:
            underline;
        }

        .msg-time {
          font-size:
            0.62rem;

          margin-top: 5px;

          opacity: 0.5;
        }

        /* ==============================================================
           Message Actions
        ============================================================== */

        .message-actions {
          display: flex;

          align-items: center;

          gap: 4px;

          margin-top: 4px;

          padding-left: 3px;
        }

        .message-action,
        .message-icon-action {
          border: none;

          background:
            transparent;

          color:
            var(--text-muted);

          cursor: pointer;

          font-size:
            0.62rem;

          display: flex;

          align-items: center;

          gap: 4px;

          padding:
            3px 5px;

          border-radius: 5px;
        }

        .message-action:hover,
        .message-icon-action:hover,
        .message-icon-action.selected {
          background:
            rgba(
              124,
              58,
              237,
              0.1
            );

          color:
            var(--accent-light);
        }

        .message-action.active {
          color:
            #34d399;
        }

        /* ==============================================================
           Project List
        ============================================================== */

        .project-list {
          margin-left: 36px;

          display: flex;

          flex-direction: column;

          gap: 10px;

          animation:
            message-in
            0.3s
            ease-out;
        }

        .project-list-heading {
          display: flex;

          align-items: center;

          gap: 6px;

          font-size:
            0.72rem;

          font-weight: 700;

          color:
            var(--text-secondary);

          margin-bottom: 2px;
        }

        /* ==============================================================
           Project Card
        ============================================================== */

        .project-card {
          background:
            linear-gradient(
              145deg,
              var(--bg-secondary),
              rgba(
                124,
                58,
                237,
                0.04
              )
            );

          border:
            1px solid
            var(--border);

          border-radius:
            14px;

          padding:
            13px;

          transition:
            var(--transition);
        }

        .project-card:hover {
          border-color:
            rgba(
              124,
              58,
              237,
              0.4
            );

          transform:
            translateY(-1px);
        }

        .project-card-header {
          display: flex;

          align-items: center;

          gap: 10px;

          margin-bottom:
            9px;
        }

        .project-icon {
          width: 34px;
          height: 34px;

          border-radius:
            9px;

          background:
            rgba(
              124,
              58,
              237,
              0.1
            );

          display: flex;

          align-items: center;
          justify-content: center;

          font-size:
            1.1rem;
        }

        .project-title-area h4 {
          margin: 0;

          font-size:
            0.82rem;

          color:
            var(--text-primary);
        }

        .project-title-area span {
          font-size:
            0.62rem;

          color:
            var(--text-muted);
        }

        .project-description {
          margin:
            0 0 11px;

          color:
            var(--text-secondary);

          font-size:
            0.7rem;

          line-height:
            1.5;
        }

        .project-section {
          margin-top:
            10px;
        }

        .project-section-title {
          display: flex;

          align-items: center;

          gap: 5px;

          font-size:
            0.65rem;

          font-weight: 700;

          color:
            var(--text-secondary);

          margin-bottom:
            6px;
        }

        .technology-list {
          display: flex;

          flex-wrap: wrap;

          gap: 4px;
        }

        .technology-tag {
          font-size:
            0.58rem;

          color:
            var(--accent-light);

          background:
            rgba(
              124,
              58,
              237,
              0.08
            );

          border:
            1px solid
            rgba(
              124,
              58,
              237,
              0.18
            );

          padding:
            3px 6px;

          border-radius:
            5px;
        }

        .project-features {
          list-style:
            none;

          padding: 0;
          margin: 0;

          display: flex;

          flex-direction:
            column;

          gap: 4px;
        }

        .project-features li {
          display: flex;

          align-items:
            flex-start;

          gap: 6px;

          font-size:
            0.63rem;

          color:
            var(--text-muted);

          line-height:
            1.35;
        }

        .feature-dot {
          color:
            #34d399;

          font-weight:
            700;
        }

        .project-actions {
          display: flex;

          gap: 6px;

          margin-top:
            12px;
        }

        .project-action {
          flex: 1;

          display: flex;

          align-items:
            center;

          justify-content:
            center;

          gap: 5px;

          text-decoration:
            none;

          border:
            1px solid
            var(--border);

          background:
            var(--bg-card);

          color:
            var(--text-secondary);

          border-radius:
            7px;

          padding:
            7px 8px;

          font-size:
            0.63rem;

          cursor:
            pointer;

          transition:
            var(--transition);
        }

        .project-action:hover {
          color:
            var(--accent-light);

          border-color:
            var(--accent);
        }

        .project-action.primary {
          background:
            rgba(
              124,
              58,
              237,
              0.1
            );

          color:
            var(--accent-light);

          border-color:
            rgba(
              124,
              58,
              237,
              0.25
            );
        }

        .project-action.disabled {
          opacity:
            0.55;

          cursor:
            not-allowed;
        }

        /* ==============================================================
           Mini Project Card
        ============================================================== */

        .project-mini-card {
          margin-left:
            36px;

          margin-top:
            8px;

          padding:
            11px;

          background:
            var(--bg-secondary);

          border:
            1px solid
            var(--border);

          border-radius:
            12px;
        }

        .project-mini-header {
          display: flex;

          align-items: center;

          gap: 7px;

          font-size:
            0.75rem;

          color:
            var(--text-primary);
        }

        .mini-tech-list {
          display: flex;

          flex-wrap: wrap;

          gap: 4px;

          margin-top:
            8px;
        }

        .mini-tech-list span {
          font-size:
            0.56rem;

          padding:
            3px 5px;

          border-radius:
            4px;

          background:
            rgba(
              6,
              182,
              212,
              0.08
            );

          color:
            var(--accent-light);
        }

        .mini-project-actions {
          display: flex;

          gap: 6px;

          margin-top:
            9px;
        }

        .mini-project-actions a,
        .not-configured {
          display: inline-flex;

          align-items:
            center;

          gap: 4px;

          padding:
            5px 7px;

          border-radius:
            6px;

          background:
            var(--bg-card);

          border:
            1px solid
            var(--border);

          color:
            var(--text-secondary);

          text-decoration:
            none;

          font-size:
            0.6rem;
        }

        .mini-project-actions a:hover {
          color:
            var(--accent-light);

          border-color:
            var(--accent);
        }

        .not-configured {
          opacity:
            0.5;
        }

        /* ==============================================================
           Resume
        ============================================================== */

        .resume-card {
          margin-left:
            36px;

          margin-top:
            8px;

          padding:
            12px;

          display: flex;

          align-items:
            center;

          gap: 9px;

          background:
            linear-gradient(
              135deg,
              rgba(
                124,
                58,
                237,
                0.1
              ),
              rgba(
                6,
                182,
                212,
                0.05
              )
            );

          border:
            1px solid
            rgba(
              124,
              58,
              237,
              0.25
            );

          border-radius:
            12px;
        }

        .resume-icon {
          width: 35px;
          height: 35px;

          flex-shrink: 0;

          border-radius:
            8px;

          background:
            rgba(
              124,
              58,
              237,
              0.15
            );

          color:
            var(--accent-light);

          display: flex;

          align-items:
            center;

          justify-content:
            center;
        }

        .resume-info {
          display: flex;

          flex-direction:
            column;

          flex: 1;

          min-width: 0;
        }

        .resume-info strong {
          font-size:
            0.72rem;

          color:
            var(--text-primary);
        }

        .resume-info span {
          font-size:
            0.58rem;

          color:
            var(--text-muted);

          margin-top:
            2px;
        }

        .resume-download {
          display: inline-flex;

          align-items:
            center;

          gap: 5px;

          background:
            var(--accent);

          color: #fff;

          text-decoration:
            none;

          padding:
            7px 9px;

          border-radius:
            7px;

          font-size:
            0.62rem;

          white-space:
            nowrap;

          transition:
            var(--transition);
        }

        .resume-download:hover {
          transform:
            translateY(-1px);

          background:
            var(--accent-light);
        }

        /* ==============================================================
           Typing
        ============================================================== */

        .typing-container {
          display: flex;

          flex-direction:
            column;

          gap: 4px;
        }

        .typing-label {
          font-size:
            0.62rem;

          color:
            var(--text-muted);
        }

        .typing-indicator {
          display: flex;

          align-items:
            center;

          gap: 4px;

          background:
            var(--bg-secondary);

          border:
            1px solid
            var(--border);

          border-radius:
            16px;

          border-bottom-left-radius:
            4px;

          padding:
            12px 16px;

          width:
            fit-content;
        }

        .typing-indicator span {
          width: 6px;
          height: 6px;

          background:
            var(--text-muted);

          border-radius:
            50%;

          animation:
            bounce
            1.2s
            ease-in-out
            infinite;
        }

        .typing-indicator span:nth-child(2) {
          animation-delay:
            0.2s;
        }

        .typing-indicator span:nth-child(3) {
          animation-delay:
            0.4s;
        }

        @keyframes bounce {

          0%,
          80%,
          100% {
            transform:
              translateY(0);
          }

          40% {
            transform:
              translateY(-6px);
          }
        }

        /* ==============================================================
           Quick Buttons
        ============================================================== */

        .quick-label {
          display: flex;

          align-items:
            center;

          gap: 5px;

          font-size:
            0.72rem;

          color:
            var(--text-muted);

          margin-bottom:
            8px;
        }

        .quick-btns {
          display: flex;

          flex-wrap:
            wrap;

          gap: 6px;
        }

        .quick-btn {
          background:
            rgba(
              124,
              58,
              237,
              0.08
            );

          border:
            1px solid
            rgba(
              124,
              58,
              237,
              0.2
            );

          color:
            var(--accent-light);

          font-size:
            0.7rem;

          padding:
            7px 10px;

          border-radius:
            100px;

          cursor:
            pointer;

          transition:
            var(--transition);
        }

        .quick-btn:hover {
          background:
            rgba(
              124,
              58,
              237,
              0.15
            );

          transform:
            translateY(-1px);
        }

        /* ==============================================================
           Follow Ups
        ============================================================== */

        .followup-section {
          margin-top:
            2px;
        }

        .followup-label {
          font-size:
            0.68rem;

          color:
            var(--text-muted);

          margin-bottom:
            7px;
        }

        .followup-list {
          display: flex;

          flex-direction:
            column;

          gap: 5px;
        }

        .followup-btn {
          display: flex;

          align-items:
            center;

          gap: 4px;

          text-align:
            left;

          background:
            var(--bg-card);

          border:
            1px solid
            var(--border);

          color:
            var(--text-secondary);

          font-size:
            0.7rem;

          padding:
            7px 10px;

          border-radius:
            8px;

          cursor:
            pointer;

          transition:
            var(--transition);
        }

        .followup-btn:hover {
          color:
            var(--accent-light);

          border-color:
            var(--accent);

          transform:
            translateX(2px);
        }

        /* ==============================================================
           Portfolio Actions
        ============================================================== */

        .portfolio-actions {
          display: flex;

          align-items:
            center;

          gap: 5px;

          padding:
            8px 12px;

          border-top:
            1px solid
            var(--border);

          background:
            var(--bg-secondary);

          overflow-x:
            auto;
        }

        .portfolio-action {
          display: inline-flex;

          align-items:
            center;

          justify-content:
            center;

          gap: 5px;

          white-space:
            nowrap;

          text-decoration:
            none;

          color:
            var(--text-secondary);

          background:
            var(--bg-card);

          border:
            1px solid
            var(--border);

          border-radius:
            7px;

          padding:
            5px 8px;

          font-size:
            0.62rem;

          transition:
            var(--transition);
        }

        .portfolio-action:hover {
          color:
            var(--accent-light);

          border-color:
            var(--accent);
        }

        /* ==============================================================
           Input
        ============================================================== */

        .chat-input-wrap {
          padding:
            12px 16px 10px;

          border-top:
            1px solid
            var(--border);

          background:
            var(--bg-secondary);
        }

        .chat-input-row {
          display: flex;

          gap: 8px;

          align-items:
            flex-end;
        }

        .chat-input {
          flex: 1;

          background:
            var(--bg-card);

          border:
            1px solid
            var(--border);

          border-radius:
            12px;

          padding:
            10px 14px;

          color:
            var(--text-primary);

          font-family:
            inherit;

          font-size:
            0.83rem;

          outline:
            none;

          resize:
            none;

          line-height:
            1.5;

          max-height:
            100px;

          transition:
            var(--transition);
        }

        .chat-input:focus {
          border-color:
            var(--accent);

          box-shadow:
            0 0 0 2px
            var(--accent-glow);
        }

        .chat-input::placeholder {
          color:
            var(--text-muted);
        }

        .chat-input:disabled {
          opacity:
            0.6;
        }

        .chat-send {
          width: 38px;
          height: 38px;

          border-radius:
            10px;

          background:
            linear-gradient(
              135deg,
              var(--accent),
              var(--accent-light)
            );

          border:
            none;

          color:
            #fff;

          cursor:
            pointer;

          display: flex;

          align-items:
            center;

          justify-content:
            center;

          transition:
            var(--transition);

          flex-shrink: 0;
        }

        .chat-send:hover:not(:disabled) {
          transform:
            scale(1.05);
        }

        .chat-send:disabled {
          opacity:
            0.4;

          cursor:
            not-allowed;
        }

        .input-hint {
          font-size:
            0.57rem;

          color:
            var(--text-muted);

          text-align:
            center;

          margin-top:
            6px;
        }

        /* ==============================================================
           Mobile
        ============================================================== */

        @media (max-width: 480px) {

          .chat-window {
            width:
              calc(100vw - 20px);

            right:
              10px;

            bottom:
              82px;

            max-height:
              calc(100vh - 100px);

            border-radius:
              16px;
          }

          .chat-toggle {
            right:
              16px;

            bottom:
              16px;
          }

          .chat-messages {
            max-height:
              calc(100vh - 310px);
          }

          .project-list,
          .project-mini-card,
          .resume-card {
            margin-left:
              0;
          }

          .message-content {
            max-width:
              84%;
          }

          .quick-btn {
            font-size:
              0.67rem;

            padding:
              6px 9px;
          }

          .input-hint {
            display:
              none;
          }

          .resume-card {
            flex-wrap:
              wrap;
          }

          .resume-download {
            width:
              100%;

            justify-content:
              center;
          }

          .project-actions {
            flex-direction:
              column;
          }

        }

      `}</style>
    </>
  )
}