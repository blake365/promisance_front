import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import Axios from 'axios'

export const create = createAsyncThunk(
	'empire/created',
	async (values, thunkAPI) => {
		try {
			// console.log(values)
			const res = await Axios.post('/empire/', values)
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
			let data = res.data
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

export const empireSlice = createSlice({
	name: 'empire',
	initialState: {
		status: 'idle',
		empire: null,
	},
	reducers: {
		empireLoaded: (state, { payload }) => ({
			empire: payload,
			status: 'succeeded',
		}),
		// turnsUsed(state, action) {
		// 	state = action.payload
		// },
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
	},
})

// export const { turnsUsed } = empireSlice.actions
export const { empireLoaded } = empireSlice.actions

export const empireSelector = (state) => state.empire
