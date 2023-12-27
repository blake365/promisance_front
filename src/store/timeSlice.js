import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import Axios from 'axios'
import { ROUND_START, ROUND_END } from '../config/config'

export const getTime = createAsyncThunk('time/', async (thunkAPI) => {
	try {
		const res = await Axios.get('time')
		// console.log(res)
		const { time, start, end } = res.data
		// console.log(time, start, end)
		return { time, start, end }
	} catch (e) {
		console.log(e)
		return thunkAPI.rejectWithValue()
	}
})

export const timeSlice = createSlice({
	name: 'time',
	initialState: {
		status: 'idle',
		time: null,
	},
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
	},
})

export const { timeLoaded } = timeSlice.actions

export const timeSelector = (state) => state.time
