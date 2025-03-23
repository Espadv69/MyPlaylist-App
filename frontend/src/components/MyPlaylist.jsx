import { useState, useEffect } from 'react'
import './MyPlaylist.css'

const MyPlaylist = () => {
  const [playlist, setPlaylist] = useState([])
  const [title, setTitle] = useState('')
  const [artist, setArtist] = useState('')
  const [genre, setGenre] = useState('')
  const [album, setAlbum] = useState('')
  const [duration, setDuration] = useState('')
  const [youtubeId, setYoutubeId] = useState('')

  const fetchPlaylist = async () => {}

  useEffect(() => {
    fetchPlaylist()
  }, [])
}

export default MyPlaylist
