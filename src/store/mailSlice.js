import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import Axios from 'axios'

export const fetchMyMail = createAsyncThunk(
	'mail/newMail',
	async (values, thunkAPI) => {
		try {
			// console.log(values)
			const res = await Axios.get(`/news/${id}`)
			// console.log(res)
			let data = res.data
			return data
		} catch (e) {
			console.log(e)
			return thunkAPI.rejectWithValue()
		}
	}
)

export const mailSlice = createSlice({
	name: 'mail',
	initialState: {
		status: 'idle',
		myMail: 0,
	},
	reducers: {
		myMailLoaded: (state, { payload }) => ({
			myMail: payload,
			status: 'succeeded',
		}),
		mailRead: (state, { payload }) => ({
			myMail: 0,
			status: 'succeeded',
		}),
	},
	extraReducers: {
		[fetchMyMail.pending]: (state, action) => {
			state.status = 'loading'
		},
		[fetchMyMail.fulfilled]: (state, action) => {
			state.status = 'succeeded'
			state.myMail = action.payload
		},
	},
})

export const { myMailLoaded } = mailSlice.actions

export const mailSelector = (state) => state.mail
