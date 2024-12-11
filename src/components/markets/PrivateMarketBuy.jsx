import { memo, useRef, useMemo } from "react"
import { Button, Center, NumberInput, Stack, Text } from "@mantine/core"
import { useSelector } from "react-redux"
import { useForm } from "@mantine/form"
import Axios from "axios"
import { eraArray } from "../../config/eras"
import { raceArray } from "../../config/races"
import { MaxButton } from "../utilities/maxbutton"
import { useLoadEmpire } from "../../hooks/useLoadEmpire"
import { showNotification } from "@mantine/notifications"
import { useTranslation } from "react-i18next"
import classes from "./markets.module.css"

const MarketRow = memo(({ label, children }) => (
	<tr>
		<td align="center">{label}</td>
		{children}
	</tr>
))

function PrivateMarketBuy() {
	const { t } = useTranslation(["finance", "eras"])
	const buttonRef = useRef()
	const { empire } = useSelector((state) => state.empire)
	const gameSettings = useSelector((state) => state.games.activeGame)
	const loadEmpire = useLoadEmpire(empire.uuid)
	const eraName = eraArray[empire.era].name.toLowerCase()

	const getCost = useMemo(
		() => (emp, base) => {
			const costBonus =
				1 -
				((1 - gameSettings.pvtmShopBonus) * (emp.bldCost / emp.land) +
					gameSettings.pvtmShopBonus * (emp.bldCash / emp.land))

			let cost =
				base * costBonus * (2 - (100 + raceArray[emp.race].mod_market) / 100)
			return Math.max(cost, base * 0.6)
		},
		[gameSettings.pvtmShopBonus],
	)

	const { costs, availArray } = useMemo(() => {
		const costs = {
			arm: Math.round(getCost(empire, gameSettings.pvtmTrpArm)),
			lnd: Math.round(getCost(empire, gameSettings.pvtmTrpLnd)),
			fly: Math.round(getCost(empire, gameSettings.pvtmTrpFly)),
			sea: Math.round(getCost(empire, gameSettings.pvtmTrpSea)),
			food: gameSettings.pvtmFood,
			runes: gameSettings.pvtmRunes,
		}

		const availArray = [
			empire.mktArm,
			empire.mktLnd,
			empire.mktFly,
			empire.mktSea,
			empire.mktFood,
			empire.mktRunes,
		].map((item, index) => {
			const price = Object.values(costs)[index]
			return Math.min(item, Math.floor(empire.cash / price))
		})

		return { costs, availArray }
	}, [empire, getCost, gameSettings])

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
		validate: {
			buyArm: (value) => value <= empire.cash / costs.arm,
			buyLnd: (value) => value <= empire.cash / costs.lnd,
			buyFly: (value) => value <= empire.cash / costs.fly,
			buySea: (value) => value <= empire.cash / costs.sea,
			buyFood: (value) => value <= empire.cash / costs.food,
			buyRunes: (value) => value <= empire.cash / costs.runes,
		},
	})

	const totalPrice = useMemo(() => {
		const values = Object.values(form.values).slice(2)
		return values.reduce(
			(sum, value, index) => sum + value * Object.values(costs)[index],
			0,
		)
	}, [form.values, costs])

	const doBuy = async (values) => {
		try {
			const res = await Axios.post(
				`/privatemarket/buy?gameId=${empire.game_id}`,
				values,
			)
			showNotification({
				title: t("finance:blackMarket.responseBuySuccess"),
				message: interpretResult(res.data).map((item, i) => (
					<Text key={item}>{item}</Text>
				)),
				color: "blue",
			})
			loadEmpire()
			buttonRef.current?.focus()
			form.reset()
		} catch (error) {
			console.error(error)
			showNotification({
				title: t("finance:blackMarket.responseBuyFail"),
				color: "orange",
			})
		}
	}

	const units = ["Arm", "Lnd", "Fly", "Sea", "Food", "Runes"]

	return (
		<main>
			<Center my={10}>
				<Stack spacing="sm" align="center">
					<form onSubmit={form.onSubmit(doBuy)}>
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
										const troop =
											unit === "Food" || unit === "Runes"
												? unit.toLowerCase()
												: `trp${unit}`
										const buy = `buy${unit}`
										const price = Object.values(costs)[index]

										return (
											<MarketRow
												key={unit}
												label={t(
													`eras:eras.${eraName}.${
														unit === "Food" || unit === "Runes"
															? unit.toLowerCase()
															: `trp${unit.toLowerCase()}`
													}`,
												)}
											>
												<td align="center">{empire[troop].toLocaleString()}</td>
												<td align="center">
													{empire[`mkt${unit}`].toLocaleString()}
												</td>
												<td align="center">${price}</td>
												<td align="center">
													{availArray[index].toLocaleString()}
												</td>
												<td align="center">
													<NumberInput
														w={130}
														min={0}
														max={availArray[index]}
														{...form.getInputProps(buy)}
														parser={(value) => value.replace(/[^\d]/g, "")}
														formatter={(value) =>
															value
																? value.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
																: ""
														}
														rightSection={
															<MaxButton
																formName={form}
																fieldName={buy}
																maxValue={availArray[index]}
															/>
														}
													/>
												</td>
												<td align="center">
													${(price * form.values[buy]).toLocaleString()}
												</td>
											</MarketRow>
										)
									})}
								</tbody>
							</table>
						</div>
						<Center>
							<Button
								type="submit"
								ref={buttonRef}
								disabled={totalPrice > empire.cash}
							>
								{t("finance:blackMarket.buySubmit")}
							</Button>
						</Center>
					</form>
				</Stack>
			</Center>
		</main>
	)
}

export default memo(PrivateMarketBuy)
