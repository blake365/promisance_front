import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
	page: 'index',
}

export const guideSlice = createSlice({
	name: 'guide',
	initialState: initialState,
	reducers: {
		setPage: (state, action) => {
			return { guidePage: action.payload }
		},
	},
})

export const guideSelector = (state) => state.guide

export const { setPage } = guideSlice.actions
