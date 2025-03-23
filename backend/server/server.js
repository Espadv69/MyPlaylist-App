// Routes
const home = require('./routes/const.js').home
const myPlaylist = require('./routes/const.js').myPlaylist
/* --------------- */

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')

dotenv.config()

const app = express()
const PORT = process.env.PORT

// Middleware
app.use(cors())
app.use(express.json())

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('🟢 Connected to MongoDB')
  } catch (err) {
    console.error('🔴 MongoDB Connection Error:', err)
    process.exit(1)
  }
}

// Entry point
app.get(home, async (req, res) => {
  res.send('Welcome to the backend server 🤝')
})

// Start Server
const startServer = async () => {
  await connectDB()

  const PORT = process.env.PORT || 5000
  const server = app.listen(PORT, () =>
    console.log(`🚀 Server running on http://localhost:${PORT}`),
  )

  // CleanUp function
  const cleanUp = async () => {
    console.log('\n🔻 Closing server...')

    try {
      await mongoose.connection.close()
      console.log('🗑️ MongoDB connection closed.')
    } catch (err) {
      console.error('❌ MongoDB connection failed to close.', err)
    }

    server.close(() => {
      console.log('✅ Server shut down.')
      process.exit(0)
    })
  }

  // Handle termination signals
  process.on('SIGINT', cleanUp)
  process.on('SIGTERM', cleanUp)
}

startServer()
