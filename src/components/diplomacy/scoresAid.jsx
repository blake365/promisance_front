import { Center, Button, Text, Stack, Card, NumberInput } from "@mantine/core"
import { useState } from "react"
import { useForm } from "@mantine/form"
import Axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { setResult } from "../../store/turnResultsSlice"
import { MaxButton } from "../utilities/maxbutton"
import { loadScores } from "../../store/scoresSlice"
import { useLoadEmpire } from "../../hooks/useLoadEmpire"
import { eraArray } from "../../config/eras"
import classes from "./aid.module.css"
import { checkRoundStatus } from "../../functions/checkRoundStatus"
import { useTranslation } from "react-i18next"

export default function ScoresAid({ friend }) {
	const { t, i18n } = useTranslation(["diplomacy", "eras"])
	const { empire } = useSelector((state) => state.empire)
	const { turnsProtection } = useSelector((state) => state.games.activeGame)
	const loadEmpire = useLoadEmpire(empire.uuid)
	const dispatch = useDispatch()
	const eraName = eraArray[empire.era].name.toLowerCase()
	const [error, setError] = useState("")
	const [loading, setLoading] = useState(false)

	const form = useForm({
		initialValues: {
			empireId: empire.id,
			type: "aid",
			receiverId: friend.id,
			trpArm: 0,
			trpLnd: 0,
			trpFly: 0,
			trpSea: 0,
			food: 0,
			runes: 0,
			cash: 0,
		},

		validationRules: {
			sellArm: (value) => value <= Math.floor(empire.trpArm * 0.15),
			sellLnd: (value) => value <= Math.floor(empire.trpLnd * 0.15),
			sellFly: (value) => value <= Math.floor(empire.trpFly * 0.15),
			sellSea: (value) => value <= Math.floor(empire.trpSea * 0.15),
			sellFood: (value) => value <= Math.floor(empire.food * 0.15),
			sellRunes: (value) => value <= Math.floor(empire.runes * 0.15),
		},
	})

	if (form.values["trpArm"] === undefined) {
		form.setFieldValue("trpArm", 0)
	}
	if (form.values["trpLnd"] === undefined) {
		form.setFieldValue("trpLnd", 0)
	}
	if (form.values["trpFly"] === undefined) {
		form.setFieldValue("trpFly", 0)
	}
	if (form.values["trpSea"] === undefined) {
		form.setFieldValue("trpSea", 0)
	}
	if (form.values["cash"] === undefined) {
		form.setFieldValue("cash", 0)
	}
	if (form.values["food"] === undefined) {
		form.setFieldValue("food", 0)
	}
	if (form.values["runes"] === undefined) {
		form.setFieldValue("runes", 0)
	}

	const itemArray = [
		"trpArm",
		"trpLnd",
		"trpFly",
		"trpSea",
		"cash",
		"food",
		"runes",
	]

	const sendAid = async (values) => {
		// console.log('sending aid')
		if (
			values.trpArm === 0 &&
			values.trpLnd === 0 &&
			values.trpFly === 0 &&
			values.trpSea === 0 &&
			values.cash === 0 &&
			values.food === 0 &&
			values.runes === 0
		) {
			setError(t("diplomacy:aid.error"))
			return
		}
		setLoading(true)
		setError("")
		try {
			const res = await Axios.post(
				`/aid?gameId=${empire.game_id}&lang=${i18n.language}`,
				values,
			)
			console.log(res.data)
			if ("error" in res.data) {
				setError(res.data.error)
			} else {
				window.scroll({ top: 0, behavior: "smooth" })
				dispatch(setResult(res.data))
				loadEmpire()
				form.reset()
				dispatch(loadScores(empire.game_id))
			}
			setLoading(false)
		} catch (error) {
			console.log(error.response.data.error)
			setError(error.response.data.error)
			setLoading(false)
		}
	}

	let shipsNeeded = Math.round(empire.trpSea * 0.02)
	if (shipsNeeded < 10000) {
		shipsNeeded = 10000
	}

	const roundStatus = checkRoundStatus(true)

	return (
		<section>
			<Center>
				<Stack spacing="sm" align="center">
					{error && (
						<Text color="red" weight="bold">
							{error}
						</Text>
					)}
					{empire.mode === "demo" && (
						<Text color="red" weight="bold">
							{t("diplomacy:aid.demoDisabled")}
						</Text>
					)}
					{empire.turnsUsed < turnsProtection && (
						<Text color="red" weight="bold">
							{t("diplomacy:aid.turnsProtection", { turnsProtection })}
						</Text>
					)}
					{roundStatus && (
						<Text color="red" weight="bold" align="center">
							{t("diplomacy:aid.roundProtection")}
						</Text>
					)}
					<Card>
						<form
							onSubmit={form.onSubmit((values) => {
								// console.log(values)
								sendAid(values)
								// dispatch(clearResult)
								// window.scroll({ top: 0, behavior: 'smooth' })
							})}
						>
							<Stack spacing="sm" align="center">
								<div className={classes.tablecontainer}>
									<table className={classes.widetable}>
										<thead>
											<tr>
												<th align="left">{t("diplomacy:aid.units")}</th>
												<th align="right">{t("diplomacy:aid.owned")}</th>
												<th align="right">{t("diplomacy:aid.canSend")}</th>
												<th align="center">{t("diplomacy:aid.send")}</th>
											</tr>
										</thead>
										<tbody>
											{itemArray.map((item) => (
												<tr key={item}>
													<td>
														{item !== "cash"
															? t(`eras:eras.${eraName}.${item.toLowerCase()}`)
															: item[0].toUpperCase() + item.slice(1)}
													</td>
													<td align="right">{empire[item].toLocaleString()}</td>
													<td align="right">
														{Math.floor(empire[item] * 0.15).toLocaleString()}
													</td>
													<td>
														<NumberInput
															min={0}
															max={Math.floor(empire[item] * 0.15)}
															{...form.getInputProps(`${item}`)}
															rightSection={
																<MaxButton
																	maxValue={Math.floor(empire[item] * 0.15)}
																	formName={form}
																	fieldName={item}
																	style={{ marginRight: "20px" }}
																/>
															}
														/>
													</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
								<Button
									color="green"
									type="submit"
									disabled={
										roundStatus ||
										empire.turnsUsed < turnsProtection ||
										empire.mode === "demo" ||
										empire.turns < 2 ||
										empire.aidCredits < 1 ||
										empire.trpSea < shipsNeeded
									}
									loading={loading}
								>
									{t("diplomacy:aid.submit")}
								</Button>
								<Text size="sm">
									{empire.aidCredits} {t("diplomacy:aid.creditsRemaining")}
								</Text>
							</Stack>
						</form>
					</Card>
				</Stack>
			</Center>
		</section>
	)
}
