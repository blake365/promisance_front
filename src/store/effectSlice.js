import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import Axios from 'axios'

export const fetchEffects = createAsyncThunk(
	'effects/fetch',
	async ({ id }, thunkAPI) => {
		try {
			const effects = await Axios.post(`/empire/effects`, { empireId: id })
			// console.log(effects.data)
			return {
				effects: effects.data,
			}
		} catch (e) {
			// console.log(e.response.data)
			return thunkAPI.rejectWithValue(e.response.data)
		}
	}
)

export const effectSlice = createSlice({
	name: 'effects',
	initialState: {
		status: 'idle',
		effects: null,
	},
	reducers: {
		effectLoaded: (state, { payload }) => ({
			effects: payload,
			// effects: payload.effects,
			status: 'succeeded',
		}),
		// turnsUsed(state, action) {
		// 	state = action.payload
		// },
	},
	extraReducers: {
		// [create.pending]: (state, action) => {
		// 	state.status = 'loading'
		// },
		// [create.fulfilled]: (state, action) => {
		// 	state.status = 'succeeded'
		// 	state.effects = action.payload
		// },
		[fetchEffects.pending]: (state, action) => {
			state.status = 'loading'
		},
		[fetchEffects.fulfilled]: (state, action) => {
			state.status = 'succeeded'
			state.effects = action.payload.effects
		},
	},
})

// export const { turnsUsed } = empireSlice.actions
export const { effectsLoaded } = effectSlice.actions

export const effectsSelector = (state) => state.effects
