const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const nodemailer = require('nodemailer');

// Create transporter ONCE (not inside route)
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // TLS
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS // App Password (NO spaces)
  }
});

// Verify transporter (helps debugging)
transporter.verify((error, success) => {
  if (error) {
    console.error("❌ Email transporter error:", error.message);
  } else {
    console.log("✅ Email server is ready");
  }
});

// POST /api/contact
router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    // Save to MongoDB
    const contact = new Contact({ name, email, message });
    await contact.save();

    // Email content
    const mailOptions = {
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO || process.env.EMAIL_USER,
      subject: `New Portfolio Message from ${name}`,
      replyTo: email, // 👈 important improvement
      html: `
        <div style="font-family: Arial; padding:20px;">
          <h2>New Contact Message</h2>
          <p><b>Name:</b> ${name}</p>
          <p><b>Email:</b> ${email}</p>
          <p><b>Message:</b> ${message}</p>
        </div>
      `
    };

    // Send email
    try {
      await transporter.sendMail(mailOptions);
      console.log("✅ Email sent successfully");
    } catch (emailErr) {
      console.error('❌ Email sending failed:', emailErr.message);
    }

    res.status(201).json({
      success: true,
      message: "Message saved & processed successfully"
    });

  } catch (err) {
    console.error("Contact error:", err);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
});

// GET /api/contact
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ timestamp: -1 });
    res.json({ success: true, data: contacts });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

module.exports = router;