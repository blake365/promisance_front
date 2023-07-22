import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import Axios from 'axios'

export const fetchMyNews = createAsyncThunk(
	'news/myNews',
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

export const newsSlice = createSlice({
	name: 'news',
	initialState: {
		status: 'idle',
		myNews: [],
	},
	reducers: {
		myNewsLoaded: (state, { payload }) => ({
			myNews: payload,
			status: 'succeeded',
		}),
	},
	extraReducers: {
		[fetchMyNews.pending]: (state, action) => {
			state.status = 'loading'
		},
		[fetchMyNews.fulfilled]: (state, action) => {
			state.status = 'succeeded'
			state.myNews = action.payload
		},
	},
})

export const { myNewsLoaded } = newsSlice.actions

export const newsSelector = (state) => state.news
