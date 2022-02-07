import { configureStore } from '@reduxjs/toolkit'
import { userSlice } from './userSlice'
import empireReducer from './empireSlice'
import { turnResults } from './turnResultsSlice'

export const store = configureStore({
	reducer: {
		empire: empireReducer,
		user: userSlice.reducer,
		results: turnResults.reducer,
	},
})
