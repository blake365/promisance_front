import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import Axios from 'axios'

// const initialState = user
// 	? { isLoggedIn: true, user }
// 	: { isLoggedIn: false, user: null }

export const register = createAsyncThunk(
	'user/register',
	async (values, thunkAPI) => {
		try {
			const response = await Axios.post('/auth/register', values)
			let data = await response.json()
			// console.log('data', data)
			return { data }
			// redirect to login page
		} catch (e) {
			console.log(e)
			return thunkAPI.rejectWithValue()
		}
	}
)

export const demo = createAsyncThunk(
	'user/demo',
	async (thunkAPI) => {
		try {
			const res = await Axios.post('/auth/demo')
			// console.log(res)
			let data = res.data
			return { user: data }
			// redirect to login page
		} catch (e) {
			console.log(e)
			return thunkAPI.rejectWithValue()
		}
	}
)

export const login = createAsyncThunk(
	'user/login',
	async (values, thunkAPI) => {
		try {
			// console.log(values)
			const res = await Axios.post('/auth/login', values)
			// console.log(res)
			let data = res.data
			return { user: data }
		} catch (e) {
			console.log(e)
			return thunkAPI.rejectWithValue()
		}
	}
)

export const load = createAsyncThunk(
	'user/load',
	async  (thunkAPI) => {
		try {
			const res = await Axios.get('/auth/me')
			// console.log(res)
			let data = res.data
			return { user: data }
		} catch (e) {
			console.log(e)
			return thunkAPI.rejectWithValue()
		}
	}
)

//TODO: export const logout = createAsyncThunk('user/logout', )

export const userSlice = createSlice({
	name: 'user',
	initialState: {
		isLoggedIn: false,
		user: null,
	},
	reducers: {
		userLoaded: (state, { payload }) => ({
			isLoggedIn: true,
			user: payload,
		}),
	},
	extraReducers: {
		[register.fulfilled]: (state, action) => {
			state.isLoggedIn = false
		},
		[register.rejected]: (state, action) => {
			state.isLoggedIn = false
		},
		[demo.fulfilled]: (state, action) => {
			state.isLoggedIn = true
			state.user = action.payload.user
		},
		[login.fulfilled]: (state, action) => {
			state.isLoggedIn = true
			state.user = action.payload.user
		},
		[login.rejected]: (state, action) => {
			state.isLoggedIn = false
			state.user = null
		},
		[load.fulfilled]: (state, action) => {
			state.isLoggedIn = true
			state.user = action.payload.user
		},
		[load.rejected]: (state, action) => {
			state.isLoggedIn = false
			state.user = null
		},
	},
})

export const userSelector = (state) => state.user

export const { userLoaded } = userSlice.actions
