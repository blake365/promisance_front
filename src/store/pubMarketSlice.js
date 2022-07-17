import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import Axios from 'axios'

export const fetchMyItems = createAsyncThunk(
	'market/myItems',
	async (values, thunkAPI) => {
		try {
			// console.log(values)
			const res = await Axios.post('/market/pubSellMine', values)
			// console.log(res)
			let data = res.data
			return data
		} catch (e) {
			console.log(e)
			return thunkAPI.rejectWithValue()
		}
	}
)

export const fetchOtherItems = createAsyncThunk(
	'market/otherItems',
	async (values, thunkAPI) => {
		try {
			// console.log(values)
			const res = await Axios.post('/market/pubSellOthers', values)
			let data = res.data
			// console.log(data)
			return data
		} catch (e) {
			console.log(e)
			return thunkAPI.rejectWithValue()
		}
	}
)

export const pubMarketSlice = createSlice({
	name: 'market',
	initialState: {
		status: 'idle',
		myItems: null,
		otherItems: null,
	},
	reducers: {
		myItemsLoaded: (state, { payload }) => ({
			myItems: payload,
			status: 'succeeded',
		}),
		otherItemsLoaded: (state, { payload }) => ({
			otherItems: payload,
			status: 'succeeded',
		}),
	},
	extraReducers: {
		[fetchMyItems.pending]: (state, action) => {
			state.status = 'loading'
		},
		[fetchMyItems.fulfilled]: (state, action) => {
			state.status = 'succeeded'
			state.myItems = action.payload
		},
		[fetchOtherItems.pending]: (state, action) => {
			state.status = 'loading'
		},
		[fetchOtherItems.fulfilled]: (state, action) => {
			state.status = 'succeeded'
			state.otherItems = action.payload
		},
	},
})

export const { myItemsLoaded } = pubMarketSlice.actions
export const { otherItemsLoaded } = pubMarketSlice.actions

export const marketSelector = (state) => state.market
