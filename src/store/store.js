import { configureStore } from '@reduxjs/toolkit'
import { userSlice } from './userSlice'
import { turnResults } from './turnResultsSlice'
import {empireSlice} from './empireSlice'

export const store = configureStore({
	reducer: {
		empire: empireSlice.reducer,
		user: userSlice.reducer,
		results: turnResults.reducer,
	},
})
