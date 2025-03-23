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
    type: String,
    required: true,
  },
  youtubeId: {
    type: String,
    default: undefined,
  },
})

module.exports = mongoose.model('Playlist', PlaylistSchema)
