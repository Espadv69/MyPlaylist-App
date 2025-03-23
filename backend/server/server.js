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

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected ✅'))
  .catch((err) => console.error('MongoDB connection failed ❌', err))

// Entry point
app.get(home, async (req, res) => {
  res.send('Welcome to the backend server 🤝')
})

// Listen
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT} 🚀`)
})
