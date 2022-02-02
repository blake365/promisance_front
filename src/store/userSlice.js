import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import Axios from 'axios'
import { RootState } from './store'

export const userSlice = createSlice({
	name: 'user',
	initialState: {
		username: '',
		email: '',
		isFetching: false,
		isSuccess: false,
		isError: false,
		errorMessage: '',
	},
	reducers: {
		// Reducer comes here
	},
	extraReducers: {
		// Extra reducer comes here
	},
})

export const userSelector = (state) => state.user

export const signupUser = createAsyncThunk(
	'users/signupUser',
	async (values, thunkAPI) => {
		try {
			const response = await Axios.post('/auth/register', values)
			let data = await response.json()
			console.log('data', data)

			if (response.status === 200) {
				localStorage.setItem('token', data.token)
				return { ...data }
			} else {
				return thunkAPI.rejectWithValue(data)
			}
		} catch (e) {
			console.log('Error', e.response.data)
			return thunkAPI.rejectWithValue(e.response.data)
		}
	}
)
