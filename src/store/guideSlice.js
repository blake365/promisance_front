import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	page: 'index',
	history: []
}

export const guideSlice = createSlice({
	name: 'guide',
	initialState: initialState,
	reducers: {
		setPage: (state, action) => {
			// For external navigation (no history)
			state.page = action.payload;
		},
		navigateWithHistory: (state, action) => {
			// For internal navigation (adds to history)
			state.history.push(state.page);
			state.page = action.payload;
		},
		goBack: (state) => {
			if (state.history.length > 0) {
				state.page = state.history.pop();
			}
		},
		clearHistory: (state) => {
			state.history = [];
			state.page = 'index';
		}
	},
})

export const guideSelector = (state) => state.guide

export const { setPage, navigateWithHistory, goBack, clearHistory } = guideSlice.actions
