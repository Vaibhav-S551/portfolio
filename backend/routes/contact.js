const express = require('express')
const router = express.Router()
const Contact = require('../models/Contact')
const nodemailer = require('nodemailer')

// ==================================================
// EMAIL TRANSPORTER
// ==================================================

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },

  // Keep SMTP connections reusable
  pool: true,
  maxConnections: 2,
  maxMessages: 100,

  // Prevent SMTP from hanging for too long
  connectionTimeout: 5000,
  greetingTimeout: 5000,
  socketTimeout: 8000
})

// ==================================================
// VERIFY EMAIL CONFIGURATION
// ==================================================

transporter.verify((error) => {
  if (error) {
    console.error('❌ Email transporter error:', error.message)
  } else {
    console.log('✅ Email server is ready')
  }
})

// ==================================================
// HTML ESCAPE
// ==================================================

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

// ==================================================
// POST /api/contact
// ==================================================

router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body

    // -------------------------------
    // Validation
    // -------------------------------

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      })
    }

    const cleanName = String(name).trim()
    const cleanEmail = String(email).trim()
    const cleanMessage = String(message).trim()

    if (!cleanName || !cleanEmail || !cleanMessage) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      })
    }

    if (cleanMessage.length < 10) {
      return res.status(400).json({
        success: false,
        message: 'Message must contain at least 10 characters'
      })
    }

    if (cleanMessage.length > 1000) {
      return res.status(400).json({
        success: false,
        message: 'Message must be under 1000 characters'
      })
    }

    // -------------------------------
    // Save message to MongoDB
    // -------------------------------

    const contact = new Contact({
      name: cleanName,
      email: cleanEmail,
      message: cleanMessage
    })

    await contact.save()

    console.log('✅ Contact message saved:', cleanEmail)

    // ==================================================
    // EMAIL
    // ==================================================

    const mailOptions = {
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO || process.env.EMAIL_USER,

      subject: `New Portfolio Message from ${cleanName}`,

      replyTo: cleanEmail,

      html: `
        <div style="
          font-family: Arial, sans-serif;
          max-width: 650px;
          margin: auto;
          padding: 25px;
          background: #f8f9fa;
          border-radius: 10px;
        ">

          <h2 style="color: #111827;">
            New Portfolio Contact Message
          </h2>

          <hr />

          <p>
            <strong>Name:</strong>
            ${escapeHtml(cleanName)}
          </p>

          <p>
            <strong>Email:</strong>
            ${escapeHtml(cleanEmail)}
          </p>

          <p>
            <strong>Message:</strong>
          </p>

          <div style="
            padding: 15px;
            background: white;
            border-radius: 8px;
            border: 1px solid #e5e7eb;
            white-space: pre-wrap;
          ">
            ${escapeHtml(cleanMessage)}
          </div>

          <br />

          <p style="color: #6b7280; font-size: 13px;">
            Sent from your portfolio contact form.
          </p>

        </div>
      `
    }

    // ==================================================
    // SEND EMAIL IN BACKGROUND
    // ==================================================
    //
    // IMPORTANT:
    // We intentionally DO NOT await sendMail().
    //
    // This allows the API to respond immediately after
    // MongoDB successfully stores the message.
    //
    // ==================================================

    transporter
      .sendMail(mailOptions)
      .then(() => {
        console.log('✅ Contact email sent successfully')
      })
      .catch((emailErr) => {
        console.error(
          '❌ Contact email sending failed:',
          emailErr.message
        )
      })

    // ==================================================
    // RESPOND IMMEDIATELY
    // ==================================================

    return res.status(201).json({
      success: true,
      message: 'Message received successfully'
    })

  } catch (err) {
    console.error('❌ Contact error:', err)

    return res.status(500).json({
      success: false,
      message: 'Unable to process your message right now'
    })
  }
})

// ==================================================
// GET /api/contact
// ==================================================

router.get('/', async (req, res) => {
  try {
    const contacts = await Contact
      .find()
      .sort({ timestamp: -1 })

    return res.json({
      success: true,
      data: contacts
    })

  } catch (err) {
    console.error('❌ Contact fetch error:', err)

    return res.status(500).json({
      success: false,
      message: 'Unable to fetch contact messages'
    })
  }
})

module.exports = router