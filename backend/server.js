require('dotenv').config()

const dns = require('dns')
dns.setDefaultResultOrder('ipv4first')

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')

const contactRoutes = require('./routes/contact')
const certificateRoutes = require('./routes/Certificates')
const chatRoutes = require('./routes/chat')

const app = express()

console.log('MONGODB_URI:', process.env.MONGODB_URI)

const allowedOrigins = [
  'http://localhost:5173',
  process.env.FRONTEND_URL
].filter(Boolean)

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true)
      }

      console.log('Blocked Origin:', origin)
      return callback(new Error('Not allowed by CORS'))
    },
    credentials: true
  })
)

app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))

app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.use('/api/contact', contactRoutes)
app.use('/api/certificates', certificateRoutes)
app.use('/api/chat', chatRoutes)

app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Portfolio API running'
  })
})

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  })
})

app.use((err, req, res, next) => {
  console.error(err.stack)

  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({
      success: false,
      message: 'Image must be under 5 MB'
    })
  }

  res.status(500).json({
    success: false,
    message: err.message || 'Internal server error'
  })
})

const PORT = process.env.PORT || 5000

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ MongoDB connected')

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`)
    })
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message)
    process.exit(1)
  })