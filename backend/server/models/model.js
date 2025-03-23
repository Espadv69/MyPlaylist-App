const mongoose = require('mongoose')

const PlaylistSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  artist: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  album: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  youtubeId: {
    type: String,
    required: true,
  },
})

module.exports = mongoose.model('Playlist', PlaylistSchema)
