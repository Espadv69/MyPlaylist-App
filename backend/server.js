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
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('🟢 Connected to MongoDB')
  } catch (err) {
    console.error('🔴 Unable to connect to MongoDB', err)
    process.exit(1)
  }
}
