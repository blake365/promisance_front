import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	status: 'idle',
	repeat: {
		route: '',
		body: null,
		color: null,
	},
}

export const repeatSlice = createSlice({
	name: 'repeat',
	initialState: initialState,
	reducers: {
		setRepeat: (state, { payload }) => ({
			status: 'success',
			repeat: {
				route: payload.route,
				body: payload.body,
				color: payload.color,
			},
		}),
		clearRepeat: (state) => {
			return initialState
		},
	},
})

export const repeatSelector = (state) => state.repeat

export const { setRepeat, clearRepeat } = repeatSlice.actions
