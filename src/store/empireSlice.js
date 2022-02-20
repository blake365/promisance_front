import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import Axios from 'axios'

// const initialState = {
// 	id: 3,
// 	uuid: '3b207ad3-0e7b-4f68-8ecb-982da364f035',
// 	createdAt: '2022-01-20T00:30:24.633Z',
// 	updatedAt: '2022-01-22T06:08:11.915Z',
// 	empireId: 3,
// 	clanId: 0,
// 	clanOldId: 0,
// 	attacks: 0,
// 	bank: 0,
// 	bldCash: 2000,
// 	bldCost: 2000,
// 	bldDef: 0,
// 	bldFood: 2000,
// 	bldPop: 2000,
// 	bldTroop: 2000,
// 	bldWiz: 2000,
// 	cash: 1000000,
// 	defSucc: 0,
// 	defTotal: 0,
// 	era: 1,
// 	flags: 0,
// 	food: 50000,
// 	freeLand: 2000,
// 	health: 100,
// 	e_id: 0,
// 	idle: 0,
// 	indArmy: 25,
// 	indFly: 25,
// 	indLnd: 25,
// 	indSea: 25,
// 	killClan: 0,
// 	killedBy: 0,
// 	kills: 0,
// 	land: 14000,
// 	loan: 0,
// 	mktArm: 0,
// 	mktFly: 0,
// 	mktFood: 0,
// 	mktLnd: 0,
// 	mktSea: 0,
// 	mktPerArm: 0,
// 	mktPerFly: 0,
// 	mktPerLnd: 0,
// 	mktPerSea: 0,
// 	name: 'Yikay',
// 	networth: 0,
// 	offSucc: 0,
// 	offTotal: 0,
// 	peasants: 20000,
// 	race: 'Elf',
// 	rank: 0,
// 	reason: 0,
// 	runes: 1000,
// 	score: 0,
// 	sharing: 0,
// 	tax: 10,
// 	trpArm: 500,
// 	trpFly: 500,
// 	trpLnd: 500,
// 	trpSea: 500,
// 	trpWiz: 0,
// 	turns: 1000,
// 	turnsUsed: 0,
// 	vacation: 0,
// 	valCode: 0,
// }

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
			return thunkAPI.rejectWithValue()
		}
	}
)

export const fetchEmpire = createAsyncThunk(
	'empire/fetch', 
	async (uuid, thunkAPI) =>
	{
		try {
			// console.log(values)
			const res = await Axios.get(`/empire/${uuid}`)
			let data = res.data
			// console.log(data)
			return {empire: data}
		} catch (e) {
			console.log(e)
			return thunkAPI.rejectWithValue()
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
			status: 'succeeded'
		}),
		// turnsUsed(state, action) {
		// 	state = action.payload
		// },
	},
	extraReducers: {
		[create.pending]: (state, action) =>
		{
			state.status = 'loading'
		},
		[create.fulfilled]: (state, action) =>
		{
			state.status = 'succeeded'
			state.empire = action.payload
		},
		[fetchEmpire.pending]: (state, action) =>
		{
			state.status = 'loading'
		},
		[fetchEmpire.fulfilled]: (state, action) =>
		{
			state.status = 'succeeded'
			state.empire = action.payload.empire
		}
	}
})

export const { turnsUsed } = empireSlice.actions
export const { empireLoaded } = empireSlice.actions

export const empireSelector = (state) => state.empire
