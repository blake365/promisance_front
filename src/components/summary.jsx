import {
	Card,
	Grid,
	Stack,
	Table,
	Title,
	Group,
	Text,
	Avatar,
	Button,
	Center,
} from "@mantine/core"
import { useSelector } from "react-redux"
import { eraArray } from "../config/eras"
import { raceArray } from "../config/races"
import { Link, useNavigate } from "react-router-dom"
import { useTour } from "@reactour/tour"
import { steps } from "../tour/steps"
import { Compass } from "@phosphor-icons/react"
import { setBgImage } from "../functions/setBgImage"
import NewPlayerModal from "./layout/newPlayerModal"
import { useEffect, useMemo, memo } from "react"
import { raceTutorials } from "../tour/raceTutorials"
import CountdownTimer from "./utilities/countdownTimer"
import { useTranslation } from "react-i18next"

const formatTimeParts = (milliseconds) => {
	const days = Math.floor(milliseconds / (1000 * 60 * 60 * 24))
	const hours = Math.floor(
		(milliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
	)
	const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60))

	return { days, hours, minutes }
}

const StatText = memo(({ label, value }) => (
	<tr>
		<td style={{ width: "50%" }}>{label}</td>
		<td align="right">{value}</td>
	</tr>
))

const RoundStatus = memo(({ time }) => {
	const { t } = useTranslation(["time"])
	const status = useMemo(() => {
		const upcoming = time.start - time.time
		const remaining = time.end - time.time

		if (upcoming > 0) {
			const parts = formatTimeParts(upcoming)
			return t("time:round.willStart", parts)
		}
		if (remaining < 0) return t("time:round.ended")

		const parts = formatTimeParts(remaining)
		return t("time:round.willEnd", parts)
	}, [time.start, time.end, time.time, t])

	return <Text align="center">{status}</Text>
})

export default function Summary() {
	const { t } = useTranslation(["eras", "summary", "time"])
	const { empire } = useSelector((state) => state.empire)
	const { setIsOpen, setSteps, setMeta, setCurrentStep } = useTour()
	const { time } = useSelector((state) => state.time)
	const game = useSelector((state) => state.games.activeGame)

	const navigate = useNavigate()
	const bgimage = setBgImage(empire, game.turnsProtection)

	const memoizedTime = useMemo(() => ({ ...time }), [time])

	useEffect(() => {
		if (!game) {
			navigate("/select")
		}
	}, [game, navigate])

	return (
		<main>
			<Stack spacing="sm" align="center">
				<img
					src={bgimage}
					style={{
						maxHeight: "100px",
						maxWidth: "100%",
						height: "auto",
						borderRadius: "10px",
					}}
					alt="summary"
				/>
				<Title order={1} align="center">
					{t("summary:summary.title")}
				</Title>
				<div className="dwarf0 elf0 gremlin0 drow0 ghoul0 gnome0 pixie0 minotaur0 goblin0 orc0 hobbit0 vampire0">
					<NewPlayerModal empire={empire} time={memoizedTime} />
					<Card>
						<Group position="center" align="center" spacing={5}>
							<Avatar
								size="sm"
								src={empire.profileIcon}
								sx={(theme) =>
									theme.colorScheme === "dark"
										? { filter: "invert(1)", opacity: "75%" }
										: { filter: "invert(0)" }
								}
							/>
							<Title order={2} align="center">
								{empire?.name}
							</Title>
						</Group>
						{empire.turnsUsed < game.turnsProtection && (
							<Center my="sm">
								<Button
									compact
									variant="outline"
									align="center"
									onClick={() => {
										setMeta("new player tour")
										setSteps(steps)
										setCurrentStep(0)
										setIsOpen(true)
									}}
									leftIcon={<Compass size={20} />}
									sx={{
										border: "1px solid #40c057",
										boxShadow: "0 0 2px 1px #40c057",
										color: "#40c057",
									}}
									className="sixth-step"
								>
									{t("summary.tour")}
								</Button>
							</Center>
						)}

						<Text align="center" mb="sm">
							{empire.profile ? (
								empire.profile
							) : (
								<Link to="/app/Empire Settings" style={{ color: "#2882cb" }}>
									{t("summary:summary.profile")}
								</Link>
							)}
						</Text>

						<Grid justify="space-between" grow>
							<Grid.Col sm={6} md={6}>
								<Table
									verticalSpacing="xs"
									striped
									style={{
										minWidth: "300px",
										// maxWidth: '400px',
									}}
								>
									<tbody>
										<StatText
											label={t("summary:summary.turns")}
											value={`${empire?.turns} (${t("summary:summary.max")} ${
												game.turnsMax
											})`}
										/>
										<StatText
											label={t("summary:summary.storedturns")}
											value={`${empire?.storedturns} (${t(
												"summary:summary.max",
											)} ${game.turnsStored})`}
										/>
										<StatText
											label={t("summary:summary.rank")}
											value={empire?.rank}
										/>
										<StatText
											label={t(
												`eras:eras.${eraArray[
													empire.era
												].name.toLowerCase()}.peasants`,
											)}
											value={empire?.peasants?.toLocaleString()}
										/>
										<StatText
											label={t("summary:summary.land")}
											value={empire?.land?.toLocaleString()}
										/>
										<StatText
											label={t("summary:summary.cash")}
											value={`${empire?.cash?.toLocaleString()}`}
										/>
										<StatText
											label={t(
												`eras:eras.${eraArray[
													empire.era
												].name.toLowerCase()}.food`,
											)}
											value={empire?.food?.toLocaleString()}
										/>
										<StatText
											label={t(
												`eras:eras.${eraArray[
													empire.era
												].name.toLowerCase()}.runes`,
											)}
											value={empire?.runes?.toLocaleString()}
										/>
										<StatText
											label={t("summary:summary.networth")}
											value={`${empire?.networth?.toLocaleString()}`}
										/>
									</tbody>
								</Table>
							</Grid.Col>
							<Grid.Col sm={6} md={6}>
								<Table
									verticalSpacing="xs"
									striped
									style={{
										minWidth: "300px",
										// maxWidth: '400px',
									}}
								>
									<tbody>
										<StatText
											label={t("summary:summary.era")}
											value={t(
												`eras:eras.${eraArray[
													empire.era
												].name.toLowerCase()}.name`,
											)}
										/>
										<StatText
											label={t("summary:summary.race")}
											value={raceArray[empire.race].name}
										/>
										<StatText
											label={t("summary:summary.health")}
											value={`${empire?.health}%`}
										/>
										<StatText
											label={t("summary:summary.tax")}
											value={`${empire?.tax}%`}
										/>
										<StatText
											label={t(
												`eras:eras.${eraArray[
													empire.era
												].name.toLowerCase()}.trparm`,
											)}
											value={empire?.trpArm.toLocaleString()}
										/>
										<StatText
											label={t(
												`eras:eras.${eraArray[
													empire.era
												].name.toLowerCase()}.trplnd`,
											)}
											value={empire?.trpLnd.toLocaleString()}
										/>
										<StatText
											label={t(
												`eras:eras.${eraArray[
													empire.era
												].name.toLowerCase()}.trpfly`,
											)}
											value={empire?.trpFly.toLocaleString()}
										/>
										<StatText
											label={t(
												`eras:eras.${eraArray[
													empire.era
												].name.toLowerCase()}.trpsea`,
											)}
											value={empire?.trpSea.toLocaleString()}
										/>
										<StatText
											label={t(
												`eras:eras.${eraArray[
													empire.era
												].name.toLowerCase()}.trpwiz`,
											)}
											value={empire?.trpWiz.toLocaleString()}
										/>
									</tbody>
								</Table>
							</Grid.Col>
						</Grid>
						<Stack align="center" spacing={0} mt="xs">
							{empire.turnsUsed < game.turnsProtection ? (
								<>
									<Text align="center" mb="sm" color="green">
										{t("summary:summary.protection", {
											protectionRemaining:
												game.turnsProtection - empire.turnsUsed,
										})}
										<br />
										{t("summary:summary.protection2", {
											turnsProtection: game.turnsProtection,
										})}
									</Text>
								</>
							) : (
								""
							)}
							<Text align="center">
								{t("summary:summary.turnsInfo", {
									count: game.turnsCount,
									freq: game.turnsFreq,
								})}
							</Text>
							<Text>
								{t("summary:summary.nextTurns")}:{" "}
								<CountdownTimer intervalMinutes={game.turnsFreq} />
							</Text>
							<Text align="center">
								{t("summary:summary.serverTime", {
									time: new Date(time.time).toUTCString(),
								})}
							</Text>
							<RoundStatus time={memoizedTime} />
							{empire.race !== 0 || empire.race !== 3 ? (
								<Button
									mt="md"
									fullWidth
									onClick={() => startTutorial(raceArray[empire.race].name)}
								>
									{raceArray[empire.race].name} Tutorial
								</Button>
							) : null}
						</Stack>
					</Card>
				</div>
			</Stack>
		</main>
	)
}
