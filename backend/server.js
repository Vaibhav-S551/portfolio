require('dotenv').config()

const dns = require('dns')

// Fix MongoDB Atlas SRV DNS resolution
dns.setServers(['8.8.8.8', '1.1.1.1'])
dns.setDefaultResultOrder('ipv4first')

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')

const contactRoutes = require('./routes/contact')
const certificateRoutes = require('./routes/Certificates')
const chatRoutes = require('./routes/chat')

const app = express()

// --------------------------------------------------
// CORS
// --------------------------------------------------

const allowedOrigins = [
  'http://localhost:5173',

  // Older Vercel deployment
  'https://portfolio-topaz-seven-g1w4cq7any.vercel.app',

  // Current Vercel deployment
  'https://portfolio-fareyr0j7-vaibhav-s551s-projects.vercel.app',

  // Render environment variable
  process.env.FRONTEND_URL
].filter(Boolean)

console.log('Allowed Origins:', allowedOrigins)

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests without an Origin header
      // such as Postman/server-to-server requests
      if (!origin) {
        return callback(null, true)
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true)
      }

      console.log('Blocked Origin:', origin)

      return callback(new Error('Not allowed by CORS'))
    },

    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],

    allowedHeaders: [
      'Content-Type',
      'Authorization'
    ],

    credentials: true
  })
)

// --------------------------------------------------
// BODY PARSERS
// --------------------------------------------------

app.use(express.json({ limit: '10mb' }))

app.use(express.urlencoded({ extended: true }))

// --------------------------------------------------
// STATIC FILES
// --------------------------------------------------

app.use(
  '/uploads',
  express.static(path.join(__dirname, 'uploads'))
)

// --------------------------------------------------
// API ROUTES
// --------------------------------------------------

app.use('/api/contact', contactRoutes)

app.use('/api/certificates', certificateRoutes)

app.use('/api/chat', chatRoutes)

// --------------------------------------------------
// HEALTH CHECK
// --------------------------------------------------

app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Portfolio API running'
  })
})

// --------------------------------------------------
// 404 HANDLER
// --------------------------------------------------

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  })
})

// --------------------------------------------------
// ERROR HANDLER
// --------------------------------------------------

app.use((err, req, res, next) => {
  console.error(err.stack)

  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({
      success: false,
      message: 'Image must be under 5 MB'
    })
  }

  if (err.message === 'Not allowed by CORS') {
    return res.status(403).json({
      success: false,
      message: 'CORS policy blocked this request'
    })
  }

  res.status(500).json({
    success: false,
    message: err.message || 'Internal server error'
  })
})

// --------------------------------------------------
// SERVER PORT
// --------------------------------------------------

const PORT = process.env.PORT || 5000

// --------------------------------------------------
// MONGODB CONNECTION
// --------------------------------------------------

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ MongoDB connected')

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`)
    })
  })
  .catch((err) => {
    console.error(
      '❌ MongoDB connection error:',
      err.message
    )

    process.exit(1)
  })