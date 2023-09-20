// functions that are shared between frontend and backend

import { raceArray } from '../config/races'
import { eraArray } from '../config/eras'
// math
export function randomIntFromInterval(min, max) {
	// min and max included
	return Math.floor(Math.random() * (max - min + 1) + min)
}

export function generalLog(number, base) {
	let log = Math.log(number) / Math.log(base)
	console.log(log)
	return log
}

// general
export function calcSizeBonus({ networth }) {
	// Calculates empire size bonus/penalty, mainly used for interest rates
	// Ranges from 0.5 to 1.7, rounded to 3 decimal places
	// console.log(networth)
	let net = Math.max(networth, 1)
	let size = Math.atan(generalLog(net, 1000) - 1) * 2.1 - 0.65
	size = Math.round(Math.min(Math.max(0.5, size), 1.7) * 1000) / 1000

	// console.log(size)
	// let size = 0
	// if (networth <= 1000000) {
	// 	size = 0.524
	// } else if (networth <= 25000000) {
	// 	size = 0.887
	// } else if (networth <= 50000000) {
	// 	size = 1.145
	// } else if (networth <= 100000000) {
	// 	size = 1.294
	// } else if (networth <= 150000000) {
	// 	size = 1.454
	// } else {
	// 	size = 1.674
	// }
	return size
}

// build

// attacks

// offensive power
export function offense(empire) {
	let oPower =
		eraArray[empire.era].o_trparm * empire.trpArm +
		eraArray[empire.era].o_trplnd * empire.trpLnd +
		eraArray[empire.era].o_trpfly * empire.trpFly +
		eraArray[empire.era].o_trpsea * empire.trpSea

	return oPower
}
// defensive power
export function defense(empire) {
	let dPower =
		eraArray[empire.era].d_trparm * empire.trpArm +
		eraArray[empire.era].d_trplnd * empire.trpLnd +
		eraArray[empire.era].d_trpfly * empire.trpFly +
		eraArray[empire.era].d_trpsea * empire.trpSea

	return dPower
}

// explore
export function explore(empire) {
	const newLand = Math.ceil(
		(1 / (empire.land * 0.00019 + 0.25)) *
			100 *
			((100 +
				eraArray[empire.era].mod_explore +
				raceArray[empire.race].mod_explore) /
				100)
	)

	return newLand
}
// food
export function calcProvisions(empire) {
	let production =
		10 * empire.freeLand +
		empire.bldFood *
			85 *
			Math.sqrt(1 - (0.75 * empire.bldFood) / Math.max(empire.land, 1))
	production *= (100 + raceArray[empire.race].mod_foodpro) / 100

	let foodpro = Math.round(production)

	let consumption =
		empire.trpArm * 0.05 +
		empire.trpLnd * 0.03 +
		empire.trpFly * 0.02 +
		empire.trpSea * 0.01 +
		empire.peasants * 0.01 +
		empire.trpWiz * 0.25

	consumption *= (100 + raceArray[empire.race].mod_foodcon) / 100

	let foodcon = Math.round(consumption)

	return { foodpro: foodpro, foodcon: foodcon }
}

// money
export function calcPCI(empire) {
	const { bldCash, land } = empire
	return Math.round(30 * (1 + bldCash / Math.max(land, 1)))
}

// takes place of calcFinances function
export function calcFinances(cpi, empire, size) {
	let income = Math.round(
		(cpi * (empire.tax / 100) * (empire.health / 100) * empire.peasants +
			empire.bldCash * 500) /
			size
	)

	// let loan = Math.round(empire.loan / 200)

	let expenses = Math.round(
		empire.trpArm * 0.5 +
			empire.trpLnd * 1.25 +
			empire.trpFly * 2 +
			empire.trpSea * 3.5 +
			empire.land * 4 +
			empire.trpWiz * 0.25
	)

	// console.log(empire.loan)
	let loanpayed = 0
	if (empire.loan > 0) {
		loanpayed = Math.min(Math.round(empire.loan / 200), income - expenses)
	}
	// console.log(loanpayed)
	let expensesBonus = Math.min(
		0.5,
		(raceArray[empire.race].mod_expenses + 100) / 100 -
			1 +
			empire.bldCost / Math.max(empire.land, 1)
	)

	expenses -= Math.round(expenses * expensesBonus)

	return { income: income, expenses: expenses, loanpayed: loanpayed }
}

// Magic
export const baseCost = (empire) => {
	return (
		empire.land * 0.1 +
		100 +
		empire.bldWiz *
			0.3 *
			((100 + raceArray[empire.race].mod_magic) / 100) *
			calcSizeBonus(empire)
	)
}

export const getPower_self = (empire) => {
	return Math.round(
		(empire.trpWiz * ((100 + raceArray[empire.race].mod_magic) / 100)) /
			Math.max(empire.bldWiz, 1)
	)
}

// getPower_enemy
// Determine wizard power when casting spells on an enemy
export const getPower_enemy = (yourEmpire, enemyEmpire) => {
	let uratio =
		(yourEmpire.trpWiz / ((yourEmpire.land + enemyEmpire.land) / 2)) *
		((100 + raceArray[yourEmpire.race].mod_magic) / 100)

	let eratio = Math.max(
		(enemyEmpire.trpWiz / enemyEmpire.land) *
			1.05 *
			((100 + raceArray[enemyEmpire.race].mod_magic) / 100)
	)

	return uratio / eratio
}

// Determine wizard loss when failing to cast a spell on an yourself
export const getWizLoss_self = (empire) => {
	let wizLoss = randomIntFromInterval(
		Math.ceil(empire.trpWiz * 0.01),
		Math.ceil(empire.trpWiz * 0.05 + 1)
	)

	if (wizLoss > empire.trpWiz) {
		wizLoss = empire.trpWiz
	}

	return wizLoss
}

// wizloss enemy
// Determine wizard loss when failing to cast a spell on an enemy
export const getWizLoss_enemy = (empire) => {
	let wizLoss = randomIntFromInterval(
		Math.ceil(empire.trpWiz * 0.01),
		Math.ceil(empire.trpWiz * 0.05 + 1)
	)

	if (wizLoss > empire.trpWiz) {
		wizLoss = empire.trpWiz
	}

	return wizLoss
}
