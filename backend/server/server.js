// Routes
const homeRoute = require('./routes/const.js').home
const myPlaylistRoute = require('./routes/const.js').myPlaylist
/* --------------- */

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')

const Playlist = require('./models/model.js')

dotenv.config()

const app = express()

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
app.get(homeRoute, async (req, res) => {
  res.send('Welcome to the backend server 🤝')
})

// API endpoint
app.get(myPlaylistRoute, async (req, res) => {
  try {
    const playlist = await Playlist.find()
    res.status(200).json(playlist)
  } catch (err) {
    console.error('Error fetching playlist:', err)
    res.status(500).json({ error: 'Failed to fetch playlist' })
  }
})

// Add to playlist Endpoint
app.post(myPlaylistRoute, async (req, res) => {
  try {
    console.log('Request body:', req.body)

    const { title, artist, genre, album, duration, youtubeId } = req.body
    if (!title || !artist || !genre || !album || !duration) {
      return res.status(400).json({ error: 'All fields are required' })
    }

    const newSong = new Playlist({
      title,
      artist,
      genre,
      album,
      duration,
      youtubeId: youtubeId || undefined,
    })
    await newSong.save()
    res.status(201).json(newSong)
  } catch (err) {
    console.error('Error adding to playlist:', err)
    res.status(500).json({ error: 'Failed to add to playlist' })
  }
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
