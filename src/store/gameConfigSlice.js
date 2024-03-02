import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	config: {
		gameVersion: 0.3,
		gameTitle: 'NeoPromisance',
		gameId: 1,

		roundStart: '2024-02-05T08:00:00',
		roundEnd: '2024-02-29T23:30:00',

		roundName: 'February 2024 - Beta',
		roundDescription: 'February 2024',

		empiresPerUser: 1,
		turnsProtection: 400,
		turnsInitial: 100,
		turnsMaximum: 400,
		turnsStored: 200,
		turnsValidate: 150,
		turnsEra: 500,
		turnsDemo: 600,
		vacationStart: 12,
		vacationLimit: 72,
		turnsFreq: 12,
		turnsCount: 2,
		turnsUnstore: 1,

		lotteryMaxTickets: 3,
		lotteryJackpot: 1000000000,

		buildCost: 10000,
		dropDelay: 60 * 60 * 12,

		bankSaveRate: 4.0,
		bankLoanRate: 7.5,

		pubMktStart: 6,
		pubMktMinTime: -1,
		pubMktMaxTime: 72,
		pubMktMinSell: 0,
		pubMktMaxSell: 50,
		pubMktMinFood: 0,
		pubMktMaxFood: 90,
		pubMktMinRunes: 0,
		pubMktMaxRunes: 90,

		clanEnable: true,
		clanSize: 10,
		clanMinJoin: 72,
		clanMinRejoin: 24,
		clanMinRelate: 48,
		clanMaxWar: 3,

		pvtmMaxSell: 8000,
		pvtmShopBonus: 0.2,
		pvtmTrpArm: 500,
		pvtmTrpLnd: 1000,
		pvtmTrpFly: 2000,
		pvtmTrpSea: 3000,
		pvtmFood: 30,
		pvtmRunes: 1600,
		industryMult: 2.8,
		maxAttacks: 40,
		maxSpells: 20,
		drRate: 1.5,
		baseLuck: 5,
		aidEnable: true,
		aidMaxCredits: 5,
		aidDelay: 60 * 60 * 3,
		scoreEnable: false,
		magicAllowRegress: true,
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
