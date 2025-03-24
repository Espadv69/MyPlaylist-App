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
    default: undefined,
  },
  duration: {
    type: String,
    default: undefined,
  },
  youtubeId: {
    type: String,
    default: undefined,
  },
})

module.exports = mongoose.model('Playlist', PlaylistSchema)
