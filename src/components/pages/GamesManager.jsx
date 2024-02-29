import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { createGame, fetchGames } from '../../store/gamesSlice'

const GamesManager = () => {
  const dispatch = useDispatch()
  const { games } = useSelector((state) => state.games)
  const { user } = useSelector((state) => state.user)
  const isAdmin = user?.role === 'admin'
  const [selectedGame, setSelectedGame] = useState(null)
  const [newGame, setNewGame] = useState({ name: '', roundDescription: '' })

  useEffect(() => {
    dispatch(fetchGames())
  }, [])

  const handleGameClick = (game) => {
    setSelectedGame(game)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewGame((prevGame) => ({ ...prevGame, [name]: value }))
  }

  const handleCreateGame = () => {
    dispatch(createGame(newGame))
    setNewGame({ name: '', roundDescription: '' })
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', padding: 10 }}>
      <div>
        <h2>Games List</h2>
        <ul>
          {
            isAdmin && (
              <li>
                <button onClick={() => setSelectedGame(null)}>+</button>
              </li>
            )
          }
          {games.map((game, index) => (
            <li key={index} onClick={() => handleGameClick(game)}>
              {game.name}
            </li>
          ))}
        </ul>
      </div>
      <div>
        {selectedGame ? (
          <div>
            <h2>Game Details</h2>
            <p>Name: {selectedGame.name}</p>
            <p>Description: {selectedGame.roundDescription}</p>
          </div>
        ) : (
          isAdmin && (
            <div>
              <h2>Create New Game</h2>
              <input
                type="text"
                name="name"
                value={newGame.name}
                onChange={handleInputChange}
                placeholder="Enter game name"
              />
              <input
                type="text"
                name="roundDescription"
                value={newGame.roundDescription}
                onChange={handleInputChange}
                placeholder="Enter description"
              />
              <button type='submit' onClick={handleCreateGame}>Create</button>
            </div>
          )
        )}
      </div>
    </div>
  )
}

export default GamesManager
