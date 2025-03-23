import { useState, useEffect } from 'react'
import './MyPlaylist.css'

const API_URL = 'http://localhost:5000/api/playlist'

const MyPlaylist = () => {
  const [playlist, setPlaylist] = useState([])
  const [title, setTitle] = useState('')
  const [artist, setArtist] = useState('')
  const [genre, setGenre] = useState('')
  const [album, setAlbum] = useState('')
  const [duration, setDuration] = useState('')
  const [youtubeId, setYoutubeId] = useState('')

  // Get playlist from the server
  const fetchPlaylist = async () => {
    try {
      const response = await fetch(API_URL)
      if (!response.ok) throw new Error('Server error occurred 🛑')

      const data = await response.json()
      setPlaylist(data)
    } catch (err) {
      console.error('Error loading playlist:', err)
    }
  }

  // Render the playlist when the component mounts
  useEffect(() => {
    fetchPlaylist()
  }, [])

  return (
    <section className="my-playlist">
      {playlist.length > 0 ? '' : <p>No songs in the playlist</p>}
    </section>
  )
}

export default MyPlaylist
