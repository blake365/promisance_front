import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	config: {
		GAME_VERSION: 0.3,
		GAME_TITLE: 'NeoPromisance',
		GAME_ID: 0,

		ROUND_START: '2024-02-05T08:00:00',
		ROUND_END: '2024-02-29T23:30:00',

		ROUND_NAME: 'February 2024 - Beta',
		ROUND_DESCRIPTION: 'February 2024',

		EMPIRES_PER_USER: 1,
		TURNS_PROTECTION: 400,
		TURNS_INITIAL: 100,
		TURNS_MAXIMUM: 400,
		TURNS_STORED: 200,
		TURNS_VALIDATE: 150,
		TURNS_ERA: 500,
		TURNS_DEMO: 600,
		VACATION_START: 12,
		VACATION_LIMIT: 72,
		TURNS_FREQ: 12,
		TURNS_COUNT: 2,
		TURNS_UNSTORE: 1,

		LOTTERY_MAXTICKETS: 3,
		LOTTERY_JACKPOT: 1000000000,

		BUILD_COST: 10000,
		DROP_DELAY: 60 * 60 * 12,

		BANK_SAVERATE: 4.0,
		BANK_LOANRATE: 7.5,

		PUBMKT_START: 6,
		PUBMKT_MINTIME: -1,
		PUBMKT_MAXTIME: 72,
		PUBMKT_MINSELL: 0,
		PUBMKT_MAXSELL: 50,
		PUBMKT_MINFOOD: 0,
		PUBMKT_MAXFOOD: 90,
		PUBMKT_MINRUNES: 0,
		PUBMKT_MAXRUNES: 90,

		CLAN_ENABLE: true,
		CLAN_SIZE: 10,
		CLAN_MINJOIN: 72,
		CLAN_MINREJOIN: 24,
		CLAN_MINRELATE: 48,
		CLAN_MAXWAR: 3,

		PVTM_MAXSELL: 8000,
		PVTM_SHOPBONUS: 0.2,
		PVTM_TRPARM: 500,
		PVTM_TRPLND: 1000,
		PVTM_TRPFLY: 2000,
		PVTM_TRPSEA: 3000,
		PVTM_FOOD: 30,
		PVTM_RUNES: 1600,
		INDUSTRY_MULT: 2.5,
		MAX_ATTACKS: 30,
		MAX_SPELLS: 20,
		DR_RATE: 1.5,
		BASE_LUCK: 5,
		AID_ENABLE: true,
		AID_MAXCREDITS: 5,
		AID_DELAY: 60 * 60 * 3,
		SCORE_ENABLE: false,
		MAGIC_ALLOW_REGRESS: true,
	},
}

export const gameConfigSlice = createSlice({
	name: 'config',
	initialState: initialState,
	reducers: {
		setConfig: (state, action) => {
			return { config: action.payload }
		},
	},
})

export const configSelector = (state) => state.config

export const { setConfig } = gameConfigSlice.actions
