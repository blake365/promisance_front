import { createSlice } from '@reduxjs/toolkit'
const initialState = { turnResult: [] }

export const turnResults = createSlice({
	name: 'results',
	initialState,
	reducers: {
		setResult: (state, action) => {
			return { turnResult: action.payload }
		},
		clearResult: () => {
			return { turnResult: '' }
		},
	},
	extraReducers: {},
})

export const resultsSelector = (state) => state.results

export const { setResult, clearResult } = turnResults.actions
