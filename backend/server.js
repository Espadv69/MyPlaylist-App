const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

require('dotenv').config()

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('🟢 Connected to MongoDB'))
  .catch((err) => console.error('🔴 Error connecting to MongoDB', err))
