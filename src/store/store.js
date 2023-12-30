import { combineReducers, configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from 'redux-persist'
import { userSlice } from './userSlice'
import { turnResults } from './turnResultsSlice'
import { empireSlice } from './empireSlice'
import { guideSlice } from './guideSlice'
import { pubMarketSlice } from './pubMarketSlice'
import { effectSlice } from './effectSlice'
import { scoresSlice } from './scoresSlice'
import { timeSlice } from './timeSlice'
import { achievementSlice } from './achievementSlice'

const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['user', 'time', 'achievements'],
}

const reducers = combineReducers({
	time: timeSlice.reducer,
	empire: empireSlice.reducer,
	user: userSlice.reducer,
	results: turnResults.reducer,
	guide: guideSlice.reducer,
	market: pubMarketSlice.reducer,
	effects: effectSlice.reducer,
	scores: scoresSlice.reducer,
	achievements: achievementSlice.reducer,
})

const persistedReducer = persistReducer(persistConfig, reducers)

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
})

export let persistor = persistStore(store)
