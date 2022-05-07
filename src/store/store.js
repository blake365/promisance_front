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

const persistConfig = {
	key: 'root',
	storage,
	whitelist: [],
}

const reducers = combineReducers({
	empire: empireSlice.reducer,
	user: userSlice.reducer,
	results: turnResults.reducer,
	guide: guideSlice.reducer,
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
