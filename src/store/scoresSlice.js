import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import Axios from 'axios'

export const loadScores = createAsyncThunk(
	'scores/',
	async (gameId, thunkAPI) => {
		try {
			const res = await Axios.get(`empire/scores?gameId=${gameId}`)
			// console.log(res)
			let data = res.data
			// console.log(data)
			return data
		} catch (e) {
			console.log(e)
			return thunkAPI.rejectWithValue()
		}
	}
)

export const scoresSlice = createSlice({
	name: 'scores',
	initialState: {
		status: 'idle',
		scores: [],
	},
	reducers: {
		scoresLoaded: (state, { payload }) => ({
			scores: payload,
			status: 'succeeded',
		}),
	},
	extraReducers: {
		[loadScores.pending]: (state, action) => {
			state.status = 'loading'
		},
		[loadScores.fulfilled]: (state, action) => {
			state.status = 'succeeded'
			state.scores = action.payload
		},
	},
})

export const { scoresLoaded } = scoresSlice.actions

export const scoresSelector = (state) => state.scores
