// functions that are shared between frontend and backend
import { raceArray } from '../config/races'
import { eraArray } from '../config/eras'
// math
/**
 * Generates a random integer between the specified minimum and maximum values (inclusive).
 * @param {number} min - The minimum value.
 * @param {number} max - The maximum value.
 * @returns {number} The random integer generated.
 */
export function randomIntFromInterval(min, max) {
	// min and max included
	return Math.floor(Math.random() * (max - min + 1) + min)
}

/**
 * Calculates the logarithm of a number with a specified base.
 * @param {number} number - The number to calculate the logarithm of.
 * @param {number} base - The base of the logarithm.
 * @returns {number} The calculated logarithm.
 */
export function generalLog(number, base) {
	let log = Math.log(number) / Math.log(base)
	// console.log(log)
	return log
}

// general
/**
 * Calculates the empire size bonus/penalty based on the net worth.
 * @param {Object} options - The options object.
 * @param {number} options.networth - The net worth of the empire.
 * @returns {number} - The calculated size bonus/penalty rounded to 3 decimal places.
 */
export function calcSizeBonus({ networth }) {
	// Calculates empire size bonus/penalty, mainly used for interest rates
	// Ranges from 0.5 to 1.7, rounded to 3 decimal places
	// console.log(networth)
	let net = Math.max(networth, 1)
	let size = Math.atan(generalLog(net, 10000) - 1.3) * 2.6 - 0.6
	size = Math.round(Math.min(Math.max(0.5, size), 1.7) * 1000) / 1000
	return size
}

// build

// attacks

// offensive power
/**
 * Calculates the offense power of an empire.
 * @param {object} empire - The empire object containing information about the empire.
 * @param {number} empire.era - The era of the empire.
 * @param {number} empire.trpArm - The number of armored troops in the empire.
 * @param {number} empire.trpLnd - The number of land troops in the empire.
 * @param {number} empire.trpFly - The number of flying troops in the empire.
 * @param {number} empire.trpSea - The number of sea troops in the empire.
 * @param {number} empire.race - The race of the empire.
 * @param {number} empire.health - The health of the empire.
 * @returns {number} - The calculated offense power of the empire.
 */
export function offense(empire) {
	let oPower =
		eraArray[empire.era].o_trparm * empire.trpArm +
		eraArray[empire.era].o_trplnd * empire.trpLnd +
		eraArray[empire.era].o_trpfly * empire.trpFly +
		eraArray[empire.era].o_trpsea * empire.trpSea

	oPower *= (100 + raceArray[empire.race].mod_offense) / 100

	oPower *= empire.health / 100
	return Math.round(oPower)
}
// defensive power
/**
 * Calculates the defense power of an empire.
 * @param {Object} empire - The empire object containing various properties.
 * @param {number} empire.era - The era of the empire.
 * @param {number} empire.trpArm - The number of armored troops in the empire.
 * @param {number} empire.trpLnd - The number of land troops in the empire.
 * @param {number} empire.trpFly - The number of flying troops in the empire.
 * @param {number} empire.trpSea - The number of sea troops in the empire.
 * @param {number} empire.race - The race of the empire.
 * @param {number} empire.health - The health of the empire.
 * @param {number} empire.bldDef - The defense bonus from buildings in the empire.
 * @param {number} empire.land - The land area of the empire.
 * @returns {number} - The calculated defense power.
 */
export function defense(empire) {
	let dPower =
		eraArray[empire.era].d_trparm * empire.trpArm +
		eraArray[empire.era].d_trplnd * empire.trpLnd +
		eraArray[empire.era].d_trpfly * empire.trpFly +
		eraArray[empire.era].d_trpsea * empire.trpSea

	dPower *= (100 + raceArray[empire.race].mod_defense) / 100

	dPower *= empire.health / 100

	let newTowerDef = 1 + empire.bldDef / empire.land
	if (newTowerDef > 1.5) {
		newTowerDef = 1.5
	}

	dPower *= newTowerDef
	return Math.round(dPower)
}

// explore
/**
 * Calculates the amount of new land to explore based on the empire's attributes.
 * @param {object} empire - The empire object containing information about land, era, and race.
 * @returns {number} - The amount of new land to explore.
 */
export function explore(empire) {
	const newLand = Math.ceil(
		(1 / (empire.land * 0.00008 + 1)) *
			100 *
			((100 +
				eraArray[empire.era].mod_explore +
				raceArray[empire.race].mod_explore) /
				100)
	)

	return newLand
}
// food
export function calcProvisions(empire, size) {

	let production =
		10 * empire.freeLand +
		empire.bldFood *
			70 *
			Math.sqrt(1 - (0.75 * empire.bldFood) / Math.max(empire.land, 1)) *
			Math.max(0.8, size * 1.25)

	production *=
		(100 +
			raceArray[empire.race].mod_foodpro +
			eraArray[empire.era].mod_foodpro) /
		100

	let foodpro = Math.round(production)

	let consumption =
		empire.trpArm * 0.0166 +
		empire.trpLnd * 0.025 +
		empire.trpFly * 0.0333 +
		empire.trpSea * 0.025 +
		empire.trpWiz * 0.17

	consumption *= (100 - raceArray[empire.race].mod_foodcon) / 100

	let foodcon = Math.round(consumption)

	return { foodpro: foodpro, foodcon: foodcon }
}

export function calcRot(empire, consumption) {
	let rot = 0
	let percentFarms = empire.bldFood / empire.land
	if (percentFarms < 0.1) percentFarms = 0.1
	if (empire.networth < 10000000) {
		rot = 0
	} else if (empire.food > empire.networth * 35 * percentFarms) {
		const multiples = Math.floor(empire.food / empire.networth) - 1
		rot = Math.round(
			(multiples / 2) * empire.food * 0.001 * 0.01 * (1 - percentFarms)
		)
	}
	return rot
}

// money
export function calcPCI(empire) {
	const { bldCash, land, race, era } = empire
	return Math.round(
		30 *
			(1 + bldCash / Math.max(land, 1)) *
			((100 + raceArray[race].mod_income + eraArray[era].mod_cashpro) / 100)
	)
}

// takes place of calcFinances function
export function calcFinances(pci, empire, size) {
	let income = Math.round(
		pci * (empire.tax / 100) * (empire.health / 100) * empire.peasants +
			empire.bldCash * 500 * Math.max(0.8, size * 1.25)
	)

	// income *= Math.max(0.8, size)

	// let loan = Math.round(empire.loan / 200)

	let expenses = Math.round(
		empire.trpArm * 0.13 +
			empire.trpLnd * 0.5 +
			empire.trpFly * 1.5 +
			empire.trpSea * 3 +
			empire.land * 3.2 +
			empire.trpWiz * 0.53
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

export const calcCorruption = (empire) => {
	let corruption = 0
	if (empire.cash > empire.networth * 110) {
		const multiples = Math.floor(empire.cash / empire.networth) - 1
		corruption = Math.round(multiples * empire.networth * 0.001 * 0.5)
	}
	return corruption
}

// Magic
export const baseCost = (empire) => {
	return (
		empire.land * 0.1 +
		100 +
		empire.bldWiz *
			0.35 *
			((100 - raceArray[empire.race].mod_magic) / 100) *
			calcSizeBonus(empire)
	)
}

export const getPower_self = (empire) => {
	return Math.min(
		Math.round(
			(empire.trpWiz * ((100 + raceArray[empire.race].mod_magic) / 100)) /
				Math.max(empire.bldWiz, 1)
		),
		100 + raceArray[empire.race].mod_magic
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
