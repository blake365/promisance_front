import { Button, Center, NumberInput, Stack, Text } from "@mantine/core"
import { useSelector } from "react-redux"
import { useForm } from "@mantine/form"
import Axios from "axios"
import { eraArray } from "../../config/eras"
import { raceArray } from "../../config/races"
import { MaxButton } from "../utilities/maxbutton"
import { useRef } from "react"
import classes from "./markets.module.css"
import { useLoadEmpire } from "../../hooks/useLoadEmpire"
import { showNotification } from "@mantine/notifications"
import { useTranslation } from "react-i18next"

// DONE: build sell side of market
// make it mobile friendly
// DONE: add buy max buttons
// FIXED: max buy can be higher than available

export default function PrivateMarketBuy() {
	const { t } = useTranslation(["finance", "eras"])

	const buttonRef = useRef()
	const { empire } = useSelector((state) => state.empire)
	const {
		pvtmShopBonus,
		pvtmTrpArm,
		pvtmTrpLnd,
		pvtmTrpFly,
		pvtmTrpSea,
		pvtmFood,
		pvtmRunes,
	} = useSelector((state) => state.games.activeGame)

	let buyNumberArray = []
	let totalPrice = 0
	let errors = {
		error: "",
	}

	const loadEmpire = useLoadEmpire(empire.uuid)

	const getCost = (emp, base) => {
		let cost = base
		let costBonus =
			1 -
			((1 - pvtmShopBonus) * (emp.bldCost / emp.land) +
				pvtmShopBonus * (emp.bldCash / emp.land))

		cost *= costBonus
		cost *= 2 - (100 + raceArray[emp.race].mod_market) / 100

		if (cost < base * 0.6) {
			cost = base * 0.6
		}

		return Math.round(cost)
	}

	const units = ["Arm", "Lnd", "Fly", "Sea", "Food", "Runes"]

	const trpArmCost = getCost(empire, pvtmTrpArm)
	const trpLndCost = getCost(empire, pvtmTrpLnd)
	const trpFlyCost = getCost(empire, pvtmTrpFly)
	const trpSeaCost = getCost(empire, pvtmTrpSea)

	const priceArray = [
		trpArmCost,
		trpLndCost,
		trpFlyCost,
		trpSeaCost,
		pvtmFood,
		pvtmRunes,
	]

	let availArray = [
		empire.mktArm,
		empire.mktLnd,
		empire.mktFly,
		empire.mktSea,
		empire.mktFood,
		empire.mktRunes,
	]

	availArray = availArray.map((item, index) => {
		if (item < Math.floor(empire.cash / priceArray[index])) {
			return item
		}

		return Math.floor(empire.cash / priceArray[index])
	})

	const form = useForm({
		initialValues: {
			empireId: empire.id,
			type: "buy",
			buyArm: 0,
			buyLnd: 0,
			buyFly: 0,
			buySea: 0,
			buyFood: 0,
			buyRunes: 0,
		},

		validationRules: {
			buyArm: (value) => value <= empire.cash / trpArmCost,
			buyLnd: (value) => value <= empire.cash / trpLndCost,
			buyFly: (value) => value <= empire.cash / trpFlyCost,
			buySea: (value) => value <= empire.cash / trpSeaCost,
			buyFood: (value) => value <= empire.cash / pvtmFood,
			buyRunes: (value) => value <= empire.cash / pvtmRunes,
		},

		errorMessages: {
			buyArm: t("finance:blackMarket.buyError"),
			buyLnd: t("finance:blackMarket.buyError"),
			buyFly: t("finance:blackMarket.buyError"),
			buySea: t("finance:blackMarket.buyError"),
			buyFood: t("finance:blackMarket.buyError"),
			buyRunes: t("finance:blackMarket.buyError"),
		},
	})

	if (form.values["buyArm"] === undefined) {
		form.setFieldValue("buyArm", 0)
	}
	if (form.values["buyLnd"] === undefined) {
		form.setFieldValue("buyLnd", 0)
	}
	if (form.values["buyFly"] === undefined) {
		form.setFieldValue("buyFly", 0)
	}
	if (form.values["buySea"] === undefined) {
		form.setFieldValue("buySea", 0)
	}
	if (form.values["buyFood"] === undefined) {
		form.setFieldValue("buyFood", 0)
	}
	if (form.values["buyRunes"] === undefined) {
		form.setFieldValue("buyRunes", 0)
	}

	buyNumberArray = Object.values(form.values).slice(2)
	// console.log(buyNumberArray)

	const spendArray = buyNumberArray.map((value, index) => {
		value = value * priceArray[index]
		return value
	})

	totalPrice = spendArray
		.filter(Number)
		.reduce((partialSum, a) => partialSum + a, 0)
	// console.log(totalPrice)
	// console.log(value)

	function setErrors(error) {
		errors.error = error
	}

	const eraName = eraArray[empire.era].name.toLowerCase()

	const interpretResult = (result) => {
		let returnArray = []
		if (result?.resultBuyArm.amount > 0) {
			console.log("test")
			returnArray.push(
				t("finance:blackMarket.buyResultArray", {
					amount: result.resultBuyArm.amount.toLocaleString(),
					item: t(`eras:eras.${eraName}.trparm`),
					price: result.resultBuyArm.price.toLocaleString(),
				}),
			)
		}
		if (result?.resultBuyLnd.amount > 0) {
			console.log("test")

			returnArray.push(
				t("finance:blackMarket.buyResultArray", {
					amount: result.resultBuyLnd.amount.toLocaleString(),
					item: t(`eras:eras.${eraName}.trplnd`),
					price: result.resultBuyLnd.price.toLocaleString(),
				}),
			)
		}
		if (result?.resultBuyFly.amount > 0) {
			console.log("test")

			returnArray.push(
				t("finance:blackMarket.buyResultArray", {
					amount: result.resultBuyFly.amount.toLocaleString(),
					item: t(`eras:eras.${eraName}.trpfly`),
					price: result.resultBuyFly.price.toLocaleString(),
				}),
			)
		}
		if (result?.resultBuySea.amount > 0) {
			console.log("test")

			returnArray.push(
				t("finance:blackMarket.buyResultArray", {
					amount: result.resultBuySea.amount.toLocaleString(),
					item: t(`eras:eras.${eraName}.trpsea`),
					price: result.resultBuySea.price.toLocaleString(),
				}),
			)
		}
		if (result?.resultBuyFood.amount > 0) {
			console.log("test")

			returnArray.push(
				t("finance:blackMarket.buyResultArray", {
					amount: result.resultBuyFood.amount.toLocaleString(),
					item: t(`eras:eras.${eraName}.food`),
					price: result.resultBuyFood.price.toLocaleString(),
				}),
			)
		}
		if (result?.resultBuyRunes.amount > 0) {
			console.log("test")

			returnArray.push(
				t("finance:blackMarket.buyResultArray", {
					amount: result.resultBuyRunes.amount.toLocaleString(),
					item: t(`eras:eras.${eraName}.runes`),
					price: result.resultBuyRunes.price.toLocaleString(),
				}),
			)
		}
		return returnArray
	}

	const doBuy = async (values) => {
		try {
			const res = await Axios.post(
				`/privatemarket/buy?gameId=${empire.game_id}`,
				values,
			)
			const result = res.data
			const resultArray = interpretResult(result)
			showNotification({
				title: t("finance:blackMarket.responseBuySuccess"),
				message: resultArray.map((item, index) => (
					<Text key={index}>{item}</Text>
				)),
				color: "blue",
			})
			loadEmpire()
			buttonRef.current.focus()
			form.reset()
		} catch (error) {
			console.log(error)
			showNotification({
				title: t("finance:blackMarket.responseBuyFail"),
				color: "orange",
			})
		}
	}

	return (
		<main>
			<Center my={10}>
				<Stack spacing="sm" align="center">
					<form
						onSubmit={
							totalPrice < empire.cash
								? form.onSubmit((values) => {
										// console.log(values)
										doBuy(values)
								  })
								: setErrors(t("finance:blackMarket.buyError"))
						}
					>
						<div className={classes.tablecontainer}>
							<table className={classes.widetable}>
								<thead>
									<tr>
										<th weight="bold" align="center">
											{t("finance:blackMarket.unit")}
										</th>
										<th weight="bold" align="center">
											{t("finance:blackMarket.owned")}
										</th>
										<th weight="bold" align="center">
											{t("finance:blackMarket.available")}
										</th>
										<th weight="bold" align="center">
											{t("finance:blackMarket.price")}
										</th>
										<th weight="bold" align="center">
											{t("finance:blackMarket.canAfford")}
										</th>
										<th weight="bold" align="center">
											{t("finance:blackMarket.headerBuy")}
										</th>
										<th weight="bold" align="center">
											{t("finance:blackMarket.spend")}
										</th>
									</tr>
								</thead>
								<tbody>
									{units.map((unit, index) => {
										let eraTroop = "trp" + unit.toLocaleLowerCase()
										let troop = `trp${unit}`
										let mktTroop = `mkt${unit}`
										let price = priceArray[index]
										let avail = availArray[index]
										let buy = `buy${unit}`

										if (unit === "Food") {
											troop = "food"
											eraTroop = "food"
										} else if (unit === "Runes") {
											troop = "runes"
											eraTroop = "runes"
										}

										return (
											<tr key={index}>
												<td align="center">
													{t(`eras:eras.${eraName}.${eraTroop}`)}
												</td>
												<td align="center">{empire[troop].toLocaleString()}</td>
												<td align="center">
													{empire[mktTroop].toLocaleString()}
												</td>
												<td align="center">${price}</td>
												<td align="center">{avail.toLocaleString()}</td>
												<td align="center">
													<NumberInput
														w={130}
														hideControls
														min={0}
														max={avail}
														parser={(value) =>
															value
																.split(" ")
																.join("")
																.replace(/\$\s?|(,*)|\s/g, "")
														}
														formatter={(value) => {
															// console.log(typeof value)
															return !Number.isNaN(parseFloat(value))
																? `${value}`.replace(
																		/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
																		",",
																  )
																: ""
														}}
														{...form.getInputProps(buy)}
														rightSection={
															<MaxButton
																formName={form}
																fieldName={buy}
																maxValue={avail}
															/>
														}
													/>
												</td>
												<td align="center">
													${(price * form.values[buy]).toLocaleString()}
												</td>
											</tr>
										)
									})}
								</tbody>
							</table>
						</div>
						<Stack align="center">
							<Text style={{ color: "red" }}>{errors.error}</Text>
							<Button type="submit" disabled={errors.error} ref={buttonRef}>
								{t("finance:blackMarket.buySubmit")}
							</Button>
						</Stack>
					</form>
				</Stack>
			</Center>
		</main>
	)
}
