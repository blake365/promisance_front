import { configureStore } from '@reduxjs/toolkit'
import { userSlice } from './userSlice'
import empireReducer from './empireSlice'

export const store = configureStore({
	reducer: {
		empire: empireReducer,
		user: userSlice.reducer,
	},
})
