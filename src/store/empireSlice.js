import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import Axios from 'axios'
import { PURGE } from 'redux-persist'

const initialState = {
	status: 'idle',
	empire: null,
}

export const create = createAsyncThunk(
	'empire/created',
	async ({ values, game_id }, thunkAPI) => {
		try {
			console.log(values, game_id)
			// pass gameId as query param
			// const res = await Axios.post(`/empire?gameId=${gameId}`, values)
			const res = await Axios.post(`/empire?gameId=${game_id}`, values)
			// console.log(res)
			let data = res.data
			return data
		} catch (e) {
			console.log(e)
			return thunkAPI.rejectWithValue(e.response.data)
		}
	}
)

export const fetchEmpire = createAsyncThunk(
	'empire/fetch',
	async ({ uuid }, thunkAPI) => {
		try {
			// console.log(values)
			const res = await Axios.get(`/empire/${uuid}`)
			const data = res.data
			// console.log(data)
			return {
				empire: data,
			}
		} catch (e) {
			console.log(e)
			return thunkAPI.rejectWithValue(e.response.data)
		}
	}
)

export const createSession = createAsyncThunk(
	'empire/session',
	async ({ id }, thunkAPI) => {
		try {
			// console.log(id)
			const res = await Axios.post(`/session/${id}`)
			const data = res.data
			return data
		} catch (e) {
			console.log(e)
			return thunkAPI.rejectWithValue(e.response.data)
		}
	}
)

export const logoutEmpire = createAsyncThunk(
	'empire/logout',
	async (thunkAPI) => {
		try {
			return initialState
		} catch (e) {
			// console.log(e)
			return thunkAPI.rejectWithValue()
		}
	}
)

export const empireSlice = createSlice({
	name: 'empire',
	initialState: initialState,
	reducers: {
		empireLoaded: (state, { payload }) => ({
			empire: payload,
			status: 'succeeded',
		}),
		// turnsUsed(state, action) {
		// 	state = action.payload
		// },
		resetEmpire: () => initialState,
	},
	extraReducers: {
		[create.pending]: (state, action) => {
			state.status = 'loading'
		},
		[create.fulfilled]: (state, action) => {
			state.status = 'succeeded'
			state.empire = action.payload
		},
		[fetchEmpire.pending]: (state, action) => {
			state.status = 'loading'
		},
		[fetchEmpire.fulfilled]: (state, action) => {
			state.status = 'succeeded'
			state.empire = action.payload.empire
		},
		[logoutEmpire.fulfilled]: (state, action) => {
			state.status = 'idle'
			state.empire = null
		},
		[PURGE]: (state, action) => {
			// console.log(action)
			state = initialState
		},
	},
})

export const { empireLoaded } = empireSlice.actions

export const empireSelector = (state) => state.empire
