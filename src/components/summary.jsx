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
import { useEffect } from "react"
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

export default function Summary() {
	const { t } = useTranslation(["eras", "summary", "time"])
	const { empire } = useSelector((state) => state.empire)
	const { setIsOpen, setSteps, setMeta, setCurrentStep } = useTour()
	const { time } = useSelector((state) => state.time)
	const game = useSelector((state) => state.games.activeGame)

	const navigate = useNavigate()
	const bgimage = setBgImage(empire, game.turnsProtection)

	useEffect(() => {
		if (!game) {
			navigate("/select")
		}
	}, [game, navigate])

	let roundStatus = t("time:round.notStarted")
	const upcoming = time.start - time.time
	const remaining = time.end - time.time

	if (upcoming > 0) {
		const time = formatTimeParts(upcoming)
		roundStatus = t("time:round.willStart", {
			days: time.days,
			hours: time.hours,
			minutes: time.minutes,
		})
	} else if (remaining < 0) {
		roundStatus = t("time:round.ended")
	} else {
		const time = formatTimeParts(remaining)
		roundStatus = t("time:round.willEnd", {
			days: time.days,
			hours: time.hours,
			minutes: time.minutes,
		})
	}

	const startTutorial = (race) => {
		function findSteps(array, selector) {
			for (let i = 0; i < array.length; i++) {
				if (array[i][0].selector === `.${selector}0`) {
					return array[i]
				}
			}
		}

		const steps = findSteps(raceTutorials, race.toLowerCase())
		setSteps(steps)
		setMeta(`${race} tutorial`)
		setCurrentStep(0)
		setIsOpen(true)
	}

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
					<NewPlayerModal empire={empire} time={time} />
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
										<tr>
											<td style={{ width: "50%" }}>
												{t("summary:summary.turns")}
											</td>
											<td align="right">
												{empire?.turns} ({t("summary:summary.max")}{" "}
												{game.turnsMax})
											</td>
										</tr>
										<tr>
											<td>{t("summary:summary.storedturns")}</td>
											<td align="right">
												{empire?.storedturns} ({t("summary:summary.max")}{" "}
												{game.turnsStored})
											</td>
										</tr>
										<tr>
											<td>{t("summary:summary.rank")}</td>
											<td align="right">{empire?.rank}</td>
										</tr>
										<tr>
											<td>
												{t(
													`eras:eras.${eraArray[
														empire.era
													].name.toLowerCase()}.peasants`,
												)}
											</td>
											<td align="right">
												{empire?.peasants?.toLocaleString()}
											</td>
										</tr>
										<tr>
											<td>{t("summary:summary.land")}</td>
											<td align="right">{empire?.land?.toLocaleString()}</td>
										</tr>
										<tr>
											<td>{t("summary:summary.cash")}</td>
											<td align="right">${empire?.cash?.toLocaleString()}</td>
										</tr>
										<tr>
											<td>
												{t(
													`eras:eras.${eraArray[
														empire.era
													].name.toLowerCase()}.food`,
												)}
											</td>
											<td align="right">{empire?.food?.toLocaleString()}</td>
										</tr>
										<tr>
											<td>
												{t(
													`eras:eras.${eraArray[
														empire.era
													].name.toLowerCase()}.runes`,
												)}
											</td>
											<td align="right">{empire?.runes?.toLocaleString()}</td>
										</tr>
										<tr>
											<td>{t("summary:summary.networth")}</td>
											<td align="right">
												${empire?.networth?.toLocaleString()}
											</td>
										</tr>
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
										<tr>
											<td style={{ width: "50%" }}>
												{t("summary:summary.era")}
											</td>
											<td align="right">
												{t(
													`eras:eras.${eraArray[
														empire.era
													].name.toLowerCase()}.name`,
												)}
											</td>
										</tr>
										<tr>
											<td>{t("summary:summary.race")}</td>
											<td align="right">{raceArray[empire.race].name}</td>
										</tr>
										<tr>
											<td>{t("summary:summary.health")}</td>
											<td align="right">{empire?.health}%</td>
										</tr>
										<tr>
											<td>{t("summary:summary.tax")}</td>
											<td align="right">{empire?.tax}%</td>
										</tr>
										<tr>
											<td>
												{t(
													`eras:eras.${eraArray[
														empire.era
													].name.toLowerCase()}.trparm`,
												)}
											</td>
											<td align="right">{empire?.trpArm.toLocaleString()}</td>
										</tr>
										<tr>
											<td>
												{t(
													`eras:eras.${eraArray[
														empire.era
													].name.toLowerCase()}.trplnd`,
												)}
											</td>
											<td align="right">{empire?.trpLnd.toLocaleString()}</td>
										</tr>
										<tr>
											<td>
												{t(
													`eras:eras.${eraArray[
														empire.era
													].name.toLowerCase()}.trpfly`,
												)}
											</td>
											<td align="right">{empire?.trpFly.toLocaleString()}</td>
										</tr>
										<tr>
											<td>
												{t(
													`eras:eras.${eraArray[
														empire.era
													].name.toLowerCase()}.trpsea`,
												)}
											</td>
											<td align="right">{empire?.trpSea.toLocaleString()}</td>
										</tr>
										<tr>
											<td>
												{t(
													`eras:eras.${eraArray[
														empire.era
													].name.toLowerCase()}.trpwiz`,
												)}
											</td>
											<td align="right">{empire?.trpWiz.toLocaleString()}</td>
										</tr>
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
							<Text align="center">{roundStatus}</Text>
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
