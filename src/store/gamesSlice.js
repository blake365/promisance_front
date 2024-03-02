import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import Axios from 'axios'

export const fetchGames = createAsyncThunk(
  'games/fetch',
  async (_, thunkAPI) => {
    try {
      const { data } = await Axios.get(`/games`)
      const { gamesUserIsIn, gamesUserNotIn } = data
      const games = [ ...gamesUserIsIn, ...gamesUserNotIn ]
      return { games }
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data)
    }
  }
)

export const createGame = createAsyncThunk(
  'games/create',
  async (payload, thunkAPI) => {
    try {
      const { data: game } = await Axios.post(`/games`, payload)
      return { game }
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data)
    }
  }
)

export const gamesSlice = createSlice({
  name: 'games',
  initialState: {
    games: [],
  },
  extraReducers: {
    [createGame.fulfilled]: (state, action) => {
      console.log('createGame.fulfilled')
      state.games = [ ...state.games, action.payload.game ]
    },
    [fetchGames.fulfilled]: (state, action) => {
      console.log('fetchGames.fulfilled', action)
      state.games = [ ...state.games, ...action.payload.games ]
    },
  },
})
