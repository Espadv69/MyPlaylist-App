const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

require('dotenv').config()

const app = express()

// Middleware
app.use(cors())
app.use(express.json())
