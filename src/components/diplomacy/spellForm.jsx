import { useForm } from "@mantine/form"
import { useLoadEmpire } from "../../hooks/useLoadEmpire"
import { useDispatch, useSelector } from "react-redux"
import { Card, Select, Stack, Text, Button, Group } from "@mantine/core"
import { useState, forwardRef, useCallback, useMemo, memo } from "react"
import { FavoriteButton } from "../utilities/maxbutton"
import { useLoadOtherEmpires } from "../../hooks/useLoadOtherEmpires"
import { eraArray } from "../../config/eras"
import { baseCost } from "../../functions/functions"
import { Mountains, Scales, Hourglass, Alien } from "@phosphor-icons/react"
import Axios from "axios"
import { setResult } from "../../store/turnResultsSlice"
import { loadScores } from "../../store/scoresSlice"
import { setRepeat } from "../../store/repeatSlice"
import { useTranslation } from "react-i18next"

const SpellForm = memo(({ empire, roundStatus, spy, defenderId }) => {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState("")
	const [spellSelectedEmpire, spellSetSelectedEmpire] = useState("")
	const [spellSelectedAttack, spellSetSelectedAttack] = useState("")

	const { t, i18n } = useTranslation(["diplomacy", "eras"])
	const dispatch = useDispatch()

	const maxSpells = useSelector((state) => state.games.activeGame.maxSpells)
	const eraName = useMemo(
		() => eraArray[empire.era].name.toLowerCase(),
		[empire.era],
	)

	const loadEmpire = useLoadEmpire(empire.uuid)
	const otherEmpires = useLoadOtherEmpires(
		empire.game_id,
		empire.id,
		empire.offTotal,
	)

	const spellData = useMemo(
		() => [
			{
				value: "fight",
				label: t(`eras:eras.${eraName}.spell_fight`),
				ratio: "2.2x",
				cost: Math.ceil(baseCost(empire) * 27.5),
			},
			{
				value: "blast",
				label: t(`eras:eras.${eraName}.spell_blast`),
				ratio: "1.5x",
				cost: Math.ceil(baseCost(empire) * 25),
			},
			{
				value: "steal",
				label: t(`eras:eras.${eraName}.spell_steal`),
				ratio: "1.75x",
				cost: Math.ceil(baseCost(empire) * 30.75),
			},
			{
				value: "storm",
				label: t(`eras:eras.${eraName}.spell_storm`),
				ratio: "1.21x",
				cost: Math.ceil(baseCost(empire) * 22.25),
			},
			{
				value: "runes",
				label: t(`eras:eras.${eraName}.spell_runes`),
				ratio: "1.3x",
				cost: Math.ceil(baseCost(empire) * 24.5),
			},
			{
				value: "struct",
				label: t(`eras:eras.${eraName}.spell_struct`),
				ratio: "1.7x",
				cost: Math.ceil(baseCost(empire) * 23),
			},
		],
		[eraName, t, empire],
	)

	const sendSpellAttack = useCallback(
		async (values) => {
			setLoading(true)
			setError("")
			try {
				const res = await Axios.post(
					`/magic/attack?gameId=${empire.game_id}&lang=${i18n.language}`,
					values,
				)
				dispatch(
					setRepeat({
						route: `/magic/attack?gameId=${empire.game_id}&lang=${i18n.language}`,
						body: values,
						color: "indigo",
					}),
				)
				if ("error" in res.data) {
					setError(res.data.error)
				} else {
					window.scroll({ top: 0, behavior: "smooth" })
					dispatch(setResult([res.data]))
					loadEmpire()
				}
				if (defenderId) {
					dispatch(loadScores(empire.game_id))
				}
			} catch (error) {
				console.log(error)
				setError(error)
			} finally {
				setLoading(false)
			}
		},
		[empire.game_id, i18n.language, dispatch, loadEmpire, defenderId],
	)

	const spellForm = useForm({
		initialValues: {
			attackerId: empire.id,
			type: "magic attack",
			defenderId: defenderId ? defenderId : "",
			spell: spy ? "spy" : "",
		},
		validationRules: {
			number: (value) => empire.turns >= 2 && value > 0,
		},
		errorMessages: {
			number: t("diplomacy:warCouncil.attackError"),
		},
	})

	const handleSubmit = useCallback(
		(values) => {
			sendSpellAttack(values)
		},
		[sendSpellAttack],
	)

	const SelectSpell = memo(
		forwardRef(({ label, ratio, cost, ...others }, ref) => (
			<div ref={ref} {...others}>
				<Text size="md">{label}</Text>
				<Text size="xs">
					{t("diplomacy:warCouncil.spellRatio")}: {ratio}
				</Text>
				<Text size="xs">
					{t("diplomacy:warCouncil.spellCost")}: {cost.toLocaleString()}{" "}
					{t(`eras:eras.${eraName}.runes`)}
				</Text>
			</div>
		)),
	)

	const SelectItem = memo(
		forwardRef(
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
		),
	)

	return (
		<Card sx={{ width: "300px" }} className="attk-fifth-step">
			{!spy && (
				<Card.Section withBorder inheritPadding py="xs">
					<Group position="apart">
						<Text weight={500}>{t("diplomacy:warCouncil.castSpell")}:</Text>
						<FavoriteButton title="Spell" empire={empire} />
					</Group>
				</Card.Section>
			)}
			<form onSubmit={spellForm.onSubmit(handleSubmit)}>
				<Stack spacing="sm" align="center">
					{otherEmpires && (
						<Select
							searchable
							searchValue={spellSelectedEmpire}
							onSearchChange={spellSetSelectedEmpire}
							label={`${t("diplomacy:warCouncil.select")} ${
								spy
									? t("diplomacy:warCouncil.getStats")
									: t("diplomacy:warCouncil.attack")
							}`}
							placeholder={t("diplomacy:warCouncil.pickOne")}
							withAsterisk
							itemComponent={SelectItem}
							data={otherEmpires}
							withinPortal
							sx={{ width: "100%" }}
							{...spellForm.getInputProps("defenderId")}
						/>
					)}
					{!spy && (
						<Select
							value={spellSelectedAttack}
							onChange={spellSetSelectedAttack}
							label={t("diplomacy:warCouncil.spellSelect")}
							placeholder={t("diplomacy:warCouncil.pickOne")}
							withAsterisk
							withinPortal
							itemComponent={SelectSpell}
							data={spellData}
							{...spellForm.getInputProps("spell")}
						/>
					)}
					<Button
						color="indigo"
						type="submit"
						disabled={roundStatus || empire.mode === "demo"}
						loading={loading}
					>
						{t("diplomacy:warCouncil.castSpell")}
					</Button>
					<Text size="sm">
						{maxSpells - empire.spells}{" "}
						{t("diplomacy:warCouncil.spellRemaining")}
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
})

SpellForm.displayName = "SpellForm"
export default SpellForm
