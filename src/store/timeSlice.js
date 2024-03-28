import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import Axios from 'axios'
import { PURGE } from 'redux-persist'

export const getTime = createAsyncThunk('time/', async (game_id, thunkAPI) => {
	try {
		const res = await Axios.get(`/time?gameId=${game_id}`)
		// console.log(res)
		const { time, start, end } = res.data
		// console.log(time, start, end)
		return { time, start, end }
	} catch (e) {
		console.log(e)
		return thunkAPI.rejectWithValue()
	}
})

const initialState = {
	status: 'idle',
	time: null,
}

export const timeSlice = createSlice({
	name: 'time',
	initialState: initialState,
	reducers: {
		timeLoaded: (state, { payload }) => ({
			time: payload,
			status: 'succeeded',
		}),
	},
	extraReducers: {
		[getTime.pending]: (state, action) => {
			state.status = 'loading'
		},
		[getTime.fulfilled]: (state, action) => {
			state.status = 'succeeded'
			state.time = action.payload
		},
		[PURGE]: (state, action) => {
			// console.log(action)
			state = initialState
		},
	},
})

export const { timeLoaded } = timeSlice.actions

export const timeSelector = (state) => state.time
