import { useState, useEffect } from 'react'
import './MyPlaylist.css'

const API_URL = 'http://localhost:5000/api/playlists'

const MyPlaylist = () => {
  const [playlist, setPlaylist] = useState([])
  const [title, setTitle] = useState('')
  const [artist, setArtist] = useState('')
  const [genre, setGenre] = useState('')
  const [album, setAlbum] = useState('')
  const [duration, setDuration] = useState('')
  const [youtubeId, setYoutubeId] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [songToDelete, setSongToDelete] = useState(null)

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

  // Add a song to the playlist
  const addToPlaylist = async () => {
    if (!title || !artist || !genre) return

    const newSong = {
      title: title,
      artist: artist,
      genre: genre,
      album: album,
      duration: duration,
      youtubeId: youtubeId,
    }

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newSong),
      })

      if (!response.ok) throw new Error('Failed to add song to playlist 🛑')

      const data = await response.json()
      setPlaylist((prevList) => [...prevList, data])

      setTitle('')
      setArtist('')
      setGenre('')
      setAlbum('')
      setDuration('')
      setYoutubeId('')
    } catch (err) {
      console.error('Error adding song to playlist:', err)
    }
  }

  // Confirm deletion of a song
  const confirmDelete = (songId) => {
    setSongToDelete(songId)
    setShowModal(true)
  }

  // Delete a song from the playlist
  const deleteSong = async () => {
    if (!songToDelete) return

    try {
      const response = await fetch(`${API_URL}/${songToDelete}`, {
        method: 'DELETE',
      })

      if (!response.ok) throw new Error('Failed to delete song 🛑')

      setPlaylist((prevList) =>
        prevList.filter((song) => song._id !== songToDelete),
      )
      setShowModal(false)
      setSongToDelete(null)
    } catch (err) {
      console.error('Error deleting song:', err)
    }
  }

  // Render the playlist when the component mounts
  useEffect(() => {
    fetchPlaylist()
  }, [])

  return (
    <section className="playlist--container">
      <header className="playlist--header">
        <h1>My Playlist</h1>
      </header>

      <main>
        <div className="playlist--form">
          <input
            type="text"
            placeholder="Title (required)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Artist (required)"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
          />
          <input
            type="text"
            placeholder="Genre (required)"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          />
          <input
            type="text"
            placeholder="Album (optional)"
            value={album}
            onChange={(e) => setAlbum(e.target.value)}
          />
          <input
            type="text"
            placeholder="Duration (optional)"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
          <input
            type="text"
            placeholder="YouTube ID (optional)"
            value={youtubeId}
            onChange={(e) => setYoutubeId(e.target.value)}
          />
          <button onClick={addToPlaylist}>Add Song</button>
        </div>
      </main>

      <footer className="playlist--footer">
        {playlist.length > 0 ? (
          <ul>
            {playlist.map((song) => (
              <li key={song._id}>
                <h3>{song.title}</h3>
                <p>
                  <strong>Artist:</strong> {song.artist}
                </p>
                <p>
                  <strong>Genre:</strong> {song.genre}
                </p>
                {song.album && (
                  <p>
                    <strong>Album:</strong> {song.album}
                  </p>
                )}
                {song.duration && (
                  <p>
                    <strong>Duration:</strong> {song.duration}
                  </p>
                )}
                {song.youtubeId && (
                  <p>
                    <strong>YouTube ID:</strong>{' '}
                    <a
                      className="id"
                      href={song.youtubeId}
                      target="_blank"
                      rel="noopener"
                    >
                      {song.youtubeId}
                    </a>
                  </p>
                )}
                <button onClick={() => confirmDelete(song._id)}>Delete</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No songs in the playlist</p>
        )}
      </footer>

      {showModal && (
        <div className="modal">
          <div className="modal--content">
            <h2>Are you sure you want to delete this song?</h2>
            <div className="modal--actions">
              <button onClick={deleteSong}>Yes</button>
              <button onClick={() => setShowModal(false)}>No</button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default MyPlaylist
