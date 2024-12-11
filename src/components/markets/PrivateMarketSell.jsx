import { memo, useRef, useMemo } from "react"
import { Button, Center, NumberInput, Text, Stack } from "@mantine/core"
import { useSelector } from "react-redux"
import { useForm } from "@mantine/form"
import Axios from "axios"
import { eraArray } from "../../config/eras"
import { raceArray } from "../../config/races"
import { MaxButton } from "../utilities/maxbutton"
import { useTranslation } from "react-i18next"
import classes from "./markets.module.css"
import { useLoadEmpire } from "../../hooks/useLoadEmpire"
import { showNotification } from "@mantine/notifications"

const MarketRow = memo(({ label, children }) => (
	<tr>
		<td align="center">{label}</td>
		{children}
	</tr>
))

function PrivateMarketSell() {
	const { t } = useTranslation(["finance", "eras"])
	const { empire } = useSelector((state) => state.empire)
	const gameSettings = useSelector((state) => state.games.activeGame)
	const loadEmpire = useLoadEmpire(empire.uuid)
	const buttonRef = useRef()
	const eraName = eraArray[empire.era].name.toLowerCase()

	const getCost = useMemo(
		() => (emp, base, multiplier) => {
			const costBonus =
				1 +
				((1 - gameSettings.pvtmShopBonus) * (emp.bldCost / emp.land) +
					gameSettings.pvtmShopBonus * (emp.bldCash / emp.land))

			let cost = base * multiplier * costBonus
			cost /= 2 - (100 + raceArray[emp.race].mod_market) / 100
			return Math.min(cost, base * 0.5)
		},
		[gameSettings.pvtmShopBonus],
	)

	const costs = useMemo(
		() => ({
			arm: Math.round(getCost(empire, gameSettings.pvtmTrpArm, 0.38)),
			lnd: Math.round(getCost(empire, gameSettings.pvtmTrpLnd, 0.4)),
			fly: Math.round(getCost(empire, gameSettings.pvtmTrpFly, 0.42)),
			sea: Math.round(getCost(empire, gameSettings.pvtmTrpSea, 0.44)),
			food: Math.round(gameSettings.pvtmFood * 0.38),
			runes: Math.round(gameSettings.pvtmRunes * 0.2),
		}),
		[empire, getCost, gameSettings],
	)

	const form = useForm({
		initialValues: {
			empireId: empire.id,
			type: "sell",
			sellArm: 0,
			sellLnd: 0,
			sellFly: 0,
			sellSea: 0,
			sellFood: 0,
			sellRunes: 0,
		},
		validate: {
			sellArm: (value) =>
				value <= empire.trpArm * (gameSettings.pvtmMaxSell / 10000),
			sellLnd: (value) =>
				value <= empire.trpLnd * (gameSettings.pvtmMaxSell / 10000),
			sellFly: (value) =>
				value <= empire.trpFly * (gameSettings.pvtmMaxSell / 10000),
			sellSea: (value) =>
				value <= empire.trpSea * (gameSettings.pvtmMaxSell / 10000),
			sellFood: (value) => value <= empire.food,
			sellRunes: (value) => value <= empire.runes,
		},
	})

	const interpretResult = useMemo(
		() => (result) => {
			const resultMap = {
				resultSellArm: "trparm",
				resultSellLnd: "trplnd",
				resultSellFly: "trpfly",
				resultSellSea: "trpsea",
				resultSellFood: "food",
				resultSellRunes: "runes",
			}

			return Object.entries(resultMap)
				.filter(([key]) => result[key]?.amount > 0)
				.map(([key, item]) =>
					t("finance:blackMarket.sellResultArray", {
						amount: result[key].amount.toLocaleString(),
						item: t(`eras:eras.${eraName}.${item}`),
						price: result[key].price.toLocaleString(),
					}),
				)
		},
		[t, eraName],
	)

	const doSell = async (values) => {
		try {
			const res = await Axios.post(
				`/privatemarket/sell?gameId=${empire.game_id}`,
				values,
			)
			const resultArray = interpretResult(res.data)
			showNotification({
				title: t("finance:blackMarket.responseSellSuccess"),
				message: resultArray.map((item) => <Text key={item}>{item}</Text>),
				color: "blue",
			})
			loadEmpire()
			buttonRef.current?.focus()
			form.reset()
		} catch (error) {
			console.error(error)
			showNotification({
				title: t("finance:blackMarket.responseSellError"),
				color: "orange",
			})
		}
	}

	const units = ["Arm", "Lnd", "Fly", "Sea", "Food", "Runes"]

	return (
		<main>
			<Center my={10}>
				<Stack spacing="sm" align="center">
					<form onSubmit={form.onSubmit(doSell)}>
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
											{t("finance:blackMarket.price")}
										</th>
										<th weight="bold" align="center">
											{t("finance:blackMarket.canSell")}
										</th>
										<th weight="bold" align="center">
											{t("finance:blackMarket.sell")}
										</th>
										<th weight="bold" align="center">
											{t("finance:blackMarket.revenue")}
										</th>
									</tr>
								</thead>
								<tbody>
									{units.map((unit) => {
										const troop =
											unit === "Food" || unit === "Runes"
												? unit.toLowerCase()
												: `trp${unit}`
										const sell = `sell${unit}`
										const price = costs[unit.toLowerCase()]
										const maxSell =
											unit === "Food" || unit === "Runes"
												? empire[troop]
												: Math.floor(
														empire[troop] * (gameSettings.pvtmMaxSell / 10000),
												  )

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
												<td align="center">${price.toLocaleString()}</td>
												<td align="center">{maxSell.toLocaleString()}</td>
												<td align="center">
													<NumberInput
														hideControls
														min={0}
														max={maxSell}
														{...form.getInputProps(sell)}
														parser={(value) => value.replace(/[^\d]/g, "")}
														formatter={(value) =>
															value
																? value.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
																: ""
														}
														rightSection={
															<MaxButton
																formName={form}
																fieldName={sell}
																maxValue={maxSell}
															/>
														}
													/>
												</td>
												<td align="center">
													${(price * form.values[sell]).toLocaleString()}
												</td>
											</MarketRow>
										)
									})}
								</tbody>
							</table>
						</div>
						<Center mt="md">
							<Button type="submit" ref={buttonRef}>
								{t("finance:blackMarket.sellSubmit")}
							</Button>
						</Center>
					</form>
				</Stack>
			</Center>
		</main>
	)
}

export default memo(PrivateMarketSell)
