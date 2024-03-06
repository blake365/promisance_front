import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import Axios from 'axios'

export const fetchGames = createAsyncThunk(
	'games/fetch',
	async (_, thunkAPI) => {
		try {
			const { data } = await Axios.get(`/games/games`)
			console.log(data)
			return data
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
		activeGame: null,
	},
	reducers: {
		setActiveGame: (state, action) => {
			return {
				games: [state.games],
				activeGame: action.payload,
			}
		},
	},
	extraReducers: {
		[createGame.fulfilled]: (state, action) => {
			// console.log('createGame.fulfilled')
			state.games = [...state.games, action.payload.game]
		},
		[fetchGames.fulfilled]: (state, action) => {
			// console.log('fetchGames.fulfilled', action)
			state.games = action.payload
		},
	},
})

export const gamesSelector = (state) => state.games
export const { setActiveGame } = gamesSlice.actions
