import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import Axios from 'axios'

export const fetchAchievements = createAsyncThunk(
	'achievements/fetch',
	async ({ uuid }, thunkAPI) => {
		try {
			const achievements = await Axios.get(`/empire/${uuid}/achievements`)
			console.log(achievements.data)
			return {
				achievements: achievements.data,
			}
		} catch (e) {
			console.log(e.response.data)
			return thunkAPI.rejectWithValue(e.response.data)
		}
	}
)

export const achievementSlice = createSlice({
	name: 'achievements',
	initialState: {
		status: 'idle',
		achievements: {},
	},
	reducers: {
		achievementLoaded: (state, { payload }) => ({
			achievements: payload,
			// achievements: payload.achievements,
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
		// 	state.achievements = action.payload
		// },
		[fetchAchievements.pending]: (state, action) => {
			state.status = 'loading'
		},
		[fetchAchievements.fulfilled]: (state, action) => {
			state.status = 'succeeded'
			state.achievements = action.payload.achievements
		},
	},
})

// export const { turnsUsed } = empireSlice.actions
export const { achievementsLoaded } = achievementSlice.actions

export const achievementsSelector = (state) => state.achievements
