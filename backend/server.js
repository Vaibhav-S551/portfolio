require('dotenv').config()

const dns = require('dns')

// --------------------------------------------------
// DNS CONFIGURATION
// --------------------------------------------------

// Fix MongoDB Atlas SRV DNS resolution
dns.setServers(['8.8.8.8', '1.1.1.1'])
dns.setDefaultResultOrder('ipv4first')

// --------------------------------------------------
// IMPORTS
// --------------------------------------------------

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')

// --------------------------------------------------
// ROUTES
// --------------------------------------------------

const contactRoutes = require('./routes/contact')
const certificateRoutes = require('./routes/Certificates')
const chatRoutes = require('./routes/chat')

// --------------------------------------------------
// APP
// --------------------------------------------------

const app = express()

// --------------------------------------------------
// CORS CONFIGURATION
// --------------------------------------------------

const allowedOrigins = [
  // Local development
  'http://localhost:5173',
  'http://localhost:3000',

  // Older Vercel deployment
  'https://portfolio-topaz-seven-g1w4cq7any.vercel.app',

  // Previous Vercel deployment
  'https://portfolio-fareyr0j7-vaibhav-s551s-projects.vercel.app',

  // Previous/current deployment
  'https://portfolio-gdrc-7m742z57z-vaibhav-s551s-projects.vercel.app',

  // Current Vercel deployment
  'https://portfolio-gdrc-tan.vercel.app',

  // Render environment variable
  process.env.FRONTEND_URL
].filter(Boolean)

console.log('----------------------------------------')
console.log('Allowed Origins:')
console.log(allowedOrigins)
console.log('----------------------------------------')

app.use(
  cors({
    origin: function (origin, callback) {

      // Allow requests without an Origin header.
      // Useful for Postman, curl and server-to-server requests.
      if (!origin) {
        return callback(null, true)
      }

      // Allow explicitly configured origins
      if (allowedOrigins.includes(origin)) {
        console.log('✅ Allowed Origin:', origin)
        return callback(null, true)
      }

      // Allow Vercel deployments for this portfolio.
      //
      // Example:
      // https://portfolio-gdrc-tan.vercel.app
      //
      // This prevents CORS from breaking whenever Vercel
      // generates another deployment URL.
      const isPortfolioVercelOrigin =
        /^https:\/\/portfolio-[a-z0-9-]+\.vercel\.app$/.test(origin)

      if (isPortfolioVercelOrigin) {
        console.log('✅ Allowed Vercel Origin:', origin)
        return callback(null, true)
      }

      console.log('❌ Blocked CORS Origin:', origin)

      return callback(new Error('Not allowed by CORS'))
    },

    methods: [
      'GET',
      'POST',
      'PUT',
      'PATCH',
      'DELETE',
      'OPTIONS'
    ],

    allowedHeaders: [
      'Content-Type',
      'Authorization'
    ],

    // Your portfolio currently does not require
    // cookie-based authentication.
    credentials: false,

    optionsSuccessStatus: 204
  })
)

// --------------------------------------------------
// BODY PARSERS
// --------------------------------------------------

app.use(
  express.json({
    limit: '10mb'
  })
)

app.use(
  express.urlencoded({
    extended: true
  })
)

// --------------------------------------------------
// STATIC FILES
// --------------------------------------------------

app.use(
  '/uploads',
  express.static(
    path.join(__dirname, 'uploads')
  )
)

// --------------------------------------------------
// API ROUTES
// --------------------------------------------------

app.use(
  '/api/contact',
  contactRoutes
)

app.use(
  '/api/certificates',
  certificateRoutes
)

app.use(
  '/api/chat',
  chatRoutes
)

// --------------------------------------------------
// HEALTH CHECK
// --------------------------------------------------

app.get('/api/health', (req, res) => {
  res.status(200).json({
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
    message: 'Route not found',
    path: req.originalUrl
  })
})

// --------------------------------------------------
// ERROR HANDLER
// --------------------------------------------------

app.use((err, req, res, next) => {
  console.error('❌ Server Error:', err.message)

  // Multer file size error
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({
      success: false,
      message: 'Image must be under 5 MB'
    })
  }

  // CORS error
  if (err.message === 'Not allowed by CORS') {
    return res.status(403).json({
      success: false,
      message: 'CORS policy blocked this request'
    })
  }

  // General server error
  return res.status(500).json({
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
      console.log(
        `🚀 Server running on port ${PORT}`
      )
    })
  })
  .catch((err) => {

    console.error(
      '❌ MongoDB connection error:',
      err.message
    )

    process.exit(1)
  })