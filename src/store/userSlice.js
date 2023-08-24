import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import Axios from 'axios'

// const initialState = user
// 	? { isLoggedIn: true, user }
// 	: { isLoggedIn: false, user: null }

const initialState = {
	isLoggedIn: false,
	user: null,
}

export const register = createAsyncThunk(
	'user/register',
	async (values, thunkAPI) => {
		try {
			const response = await Axios.post('/auth/register', values)
			// console.log(response)
			let data = response.data
			console.log('data', data)
			return { data }
			// redirect to login page
		} catch (e) {
			console.log(e)
			return thunkAPI.rejectWithValue(e.response.data)
		}
	}
)

export const demo = createAsyncThunk('user/demo', async (values, thunkAPI) => {
	try {
		const res = await Axios.post('/auth/demo')
		// console.log(res)
		let data = res.data
		return { user: data }
	} catch (e) {
		console.log(e.response.data)
		return thunkAPI.rejectWithValue(e.response.data)
	}
})

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
			return thunkAPI.rejectWithValue(e.response.data)
		}
	}
)

export const load = createAsyncThunk('user/load', async (thunkAPI) => {
	try {
		const res = await Axios.get('/auth/me')
		// console.log(res)
		let data = res.data
		return { user: data }
	} catch (e) {
		console.log(e)
		return thunkAPI.rejectWithValue(e.response.data)
	}
})

export const logout = createAsyncThunk('user/logout', async (thunkAPI) => {
	try {
		await Axios.get('/auth/logout')
		return initialState
	} catch (e) {
		console.log(e)
		return thunkAPI.rejectWithValue()
	}
})

export const userSlice = createSlice({
	name: 'user',
	initialState: initialState,
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
		[logout.fulfilled]: (state, action) => {
			state.isLoggedIn = false
			state.user = null
		},
	},
})

export const userSelector = (state) => state.user

export const { userLoaded } = userSlice.actions
