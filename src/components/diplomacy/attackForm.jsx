import { useForm } from "@mantine/form"
import { useLoadEmpire } from "../../hooks/useLoadEmpire"
import { useDispatch, useSelector } from "react-redux"
import { Card, Select, Stack, Text, Button, Group } from "@mantine/core"
import { useState, forwardRef } from "react"
import { FavoriteButton } from "../utilities/maxbutton"
import { useLoadOtherEmpires } from "../../hooks/useLoadOtherEmpires"
import { eraArray } from "../../config/eras"
import { Mountains, Scales, Hourglass, Alien } from "@phosphor-icons/react"
import Axios from "axios"
import { setResult } from "../../store/turnResultsSlice"
import { loadScores } from "../../store/scoresSlice"
import { setRepeat } from "../../store/repeatSlice"
import { useTranslation } from "react-i18next"

const AttackForm = ({ empire, roundStatus, defenderId }) => {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState("")
	const [selectedEmpire, setSelectedEmpire] = useState("")
	const [selectedAttack, setSelectedAttack] = useState("")

	const { t, i18n } = useTranslation(["diplomacy", "eras"])

	const eraName = eraArray[empire.era].name.toLowerCase()

	const { maxAttacks } = useSelector((state) => state.games.activeGame)

	const loadEmpire = useLoadEmpire(empire.uuid)
	let otherEmpires = null
	if (!defenderId) {
		otherEmpires = useLoadOtherEmpires(
			empire.game_id,
			empire.id,
			empire.offTotal,
		)
	}
	const dispatch = useDispatch()

	const form = useForm({
		initialValues: {
			empireId: empire.id,
			type: "attack",
			number: 1,
			defenderId: defenderId ? defenderId : "",
			attackType: "",
		},

		validationRules: {
			number: (value) => empire.turns >= 2 && value > 0,
		},

		errorMessages: {
			number: t("diplomacy:attackError"),
		},
	})

	const sendAttack = async (values) => {
		setLoading(true)
		setError("")
		try {
			const res = await Axios.post(
				`/attack?gameId=${empire.game_id}&lang=${i18n.language}`,
				values,
			)
			dispatch(
				setRepeat({
					route: `/attack?gameId=${empire.game_id}&lang=${i18n.language}`,
					body: values,
					color: "red",
				}),
			)
			// console.log(res.data)
			if ("error" in res.data) {
				setError(res.data.error)
			} else {
				window.scroll({ top: 0, behavior: "smooth" })
				dispatch(setResult(res.data))
				loadEmpire()
			}
			if (defenderId) {
				dispatch(loadScores(empire.game_id))
			}
			setLoading(false)
		} catch (error) {
			console.log(error)
			setError(error)
			setLoading(false)
		}
	}

	const SelectAttack = forwardRef(({ label, sub, ...others }, ref) => (
		<div ref={ref} {...others}>
			<Text size="md">{label}</Text>
			<Text size="xs" m={0}>
				{sub}
			</Text>
		</div>
	))

	const SelectItem = forwardRef(
		({ land, era, empireId, name, race, networth, dr, ...others }, ref) => (
			<div ref={ref} {...others}>
				<div>
					<Text size="sm" weight="bold">
						{name}
					</Text>
					<Text size="sm">
						<Mountains /> {land} {t("diplomacy:warCouncil.landDR")} {dr}%
					</Text>
					<Text size="sm">
						<Scales /> ${networth}
					</Text>
					<Text size="sm">
						<Hourglass /> {era}
					</Text>
					<Text size="sm">
						<Alien /> {race}
					</Text>
				</div>
			</div>
		),
	)

	return (
		<Card sx={{ width: "300px" }}>
			<Card.Section withBorder inheritPadding py="xs">
				<Group position="apart">
					<Text weight={500}>{t("diplomacy:warCouncil.attack")}:</Text>
					<FavoriteButton title="Attack" empire={empire} />
				</Group>
			</Card.Section>
			<form
				onSubmit={form.onSubmit((values) => {
					// console.log(values)
					sendAttack(values)
					// dispatch(clearResult)
					// window.scroll({ top: 0, behavior: 'smooth' })
				})}
			>
				<Stack spacing="sm" align="center">
					{otherEmpires && (
						<Select
							className="attk-third-step"
							searchable
							searchValue={selectedEmpire}
							onSearchChange={setSelectedEmpire}
							label={t("diplomacy:warCouncil.selectAttack")}
							placeholder={t("diplomacy:warCouncil.pickOne")}
							withAsterisk
							itemComponent={SelectItem}
							data={otherEmpires}
							withinPortal
							sx={{ width: "100%" }}
							{...form.getInputProps("defenderId")}
						/>
					)}
					<Select
						className="attk-fourth-step"
						value={selectedAttack}
						onChange={setSelectedAttack}
						label={t("diplomacy:warCouncil.attackType")}
						placeholder={t("diplomacy:warCouncil.pickOne")}
						withAsterisk
						withinPortal
						itemComponent={SelectAttack}
						data={[
							{
								value: "trparm",
								label: t(`eras:eras.${eraName}.guerrillaStrike`),
								sub: t("diplomacy:warCouncil.attackDescription", {
									trp: t(`eras:eras.${eraName}.trparm`),
								}),
							},
							{
								value: "trplnd",
								label: t(`eras:eras.${eraName}.laySiege`),
								sub: t("diplomacy:warCouncil.attackDescription", {
									trp: t(`eras:eras.${eraName}.trplnd`),
								}),
							},
							{
								value: "trpfly",
								label: t(`eras:eras.${eraName}.airStrike`),
								sub: t("diplomacy:warCouncil.attackDescription", {
									trp: t(`eras:eras.${eraName}.trpfly`),
								}),
							},
							{
								value: "trpsea",
								label: t(`eras:eras.${eraName}.coastalAssault`),
								sub: t("diplomacy:warCouncil.attackDescription", {
									trp: t(`eras:eras.${eraName}.trpsea`),
								}),
							},
							{
								value: "standard",
								label: t(`eras:eras.${eraName}.allOutAttack`),
								sub: t("diplomacy:warCouncil.allUnitsDescription"),
							},
							{
								value: "surprise",
								label: t(`eras:eras.${eraName}.surpriseAttack`),
								sub: t("diplomacy:warCouncil.allUnitsDescription"),
							},
							{
								value: "pillage",
								label: t(`eras:eras.${eraName}.pillage`),
								sub: t("diplomacy:warCouncil.pillageDescription"),
							},
						]}
						{...form.getInputProps("attackType")}
					/>

					<Button
						color="red"
						type="submit"
						disabled={roundStatus}
						loading={loading}
					>
						{t("diplomacy:warCouncil.attack")}
					</Button>
					<Text size="sm">
						{maxAttacks - empire.attacks} {t("diplomacy:warCouncil.remaining")}
					</Text>
					{error && (
						<Text color="red" weight="bold" align="center">
							{error}
						</Text>
					)}
				</Stack>
			</form>
		</Card>
	)
}

export default AttackForm
