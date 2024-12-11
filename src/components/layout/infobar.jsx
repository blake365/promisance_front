import { Paper, Grid, Text, Center, Progress, Popover } from "@mantine/core"
import { eraArray } from "../../config/eras"
import {
	Mountains,
	Coins,
	Scales,
	ForkKnife,
	Brain,
	Heart,
	GitBranch,
	Ranking,
} from "@phosphor-icons/react"
import { useEffect, useState, useRef, memo } from "react"
import classes from "./numberChange.module.css"
import { useSelector } from "react-redux"
import CountdownTimer from "../utilities/countdownTimer"
import { useTranslation } from "react-i18next"

const AnimateNumberChange = memo(({ number, type }) => {
	const [prevNumber, setPrevNumber] = useState(number)
	const numberDisplayRef = useRef(null)

	useEffect(() => {
		if (number !== prevNumber) {
			const clas = getNumberClassName()
			setPrevNumber(number)

			// Apply the class to trigger the animation
			numberDisplayRef.current.classList.add(clas)

			// Remove the class after the animation duration to reset for the next change
			setTimeout(() => {
				numberDisplayRef.current.classList.remove(clas)
			}, 1000) // Duration of the 'fadeBack' animation defined in CSS (1s)
		}
	}, [number, prevNumber])

	const getNumberClassName = () => {
		if (number > prevNumber) {
			return classes.increased
		}

		if (number < prevNumber) {
			return classes.decreased
		}
		return "same"
	}

	return (
		<Text
			align="center"
			ref={numberDisplayRef}
			className={classes.numberDisplay}
		>
			{type === "networth" || type === "cash" ? "$" : ""}
			{number.toLocaleString()}
			{type === "health" ? "%" : ""}
		</Text>
	)
})

// Optional: Add a display name for better debugging
AnimateNumberChange.displayName = "AnimateNumberChange"

// console.log(roundPercent)

export default function InfoBar({ data }) {
	// console.log(data.empire)
	const empire = data
	const { t, i18n } = useTranslation(["layout", "eras"])
	// i18n.changeLanguage('es')
	// console.log(i18n.language)

	const { time } = useSelector((state) => state.time)
	const roundLength = time.end - time.start
	const roundProgress = time.time - time.start
	const roundPercent = (roundProgress / roundLength) * 100
	const { turnsProtection, scoreEnabled, turnsFreq } = useSelector(
		(state) => state.games.activeGame,
	)

	let roundStatus = ""
	const upcoming = time.start - time.time
	// console.log(upcoming)
	const remaining = time.end - time.time
	// console.log(remaining)

	// TODO: Translate round status
	if (upcoming > 0) {
		roundStatus = `The round will start in ${Math.floor(
			upcoming / (1000 * 60 * 60 * 24),
		)} days and ${Math.floor(
			(upcoming % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
		)} hours`
	} else if (remaining < 0) {
		roundStatus =
			"The round has ended, thanks for playing! A new round will start soon."
	} else if (remaining < 48 * 60 * 60 * 1000) {
		roundStatus = `The round will end in ${Math.floor(
			remaining / (1000 * 60 * 60),
		)} hours and ${Math.floor(
			(remaining % (1000 * 60 * 60)) / (1000 * 60),
		)} minutes`
	}

	return (
		<Paper
			shadow="xs"
			radius="xs"
			withBorder
			pb="xs"
			sx={() => {
				if (empire.turnsUsed <= turnsProtection) {
					return {
						border: "1px solid #40c057",
						boxShadow: "0 0 7px 1px #40c057",
					}
				}
			}}
		>
			<Progress
				color={eraArray[empire.era].color}
				value={roundPercent}
				size="xs"
				radius={0}
				mb="xs"
			/>
			<Text align="center" weight="bold" mb="xs">
				{roundStatus}
			</Text>
			<Grid
				justify="space-between"
				grow
				columns={scoreEnabled ? 21 : 19}
				pl="xs"
				pr="xs"
			>
				<Grid.Col span={2} sx={{ cursor: "pointer" }}>
					<Popover withArrow shadow="sm">
						<Popover.Target>
							<div>
								<Center>
									<GitBranch size={20} color={eraArray[empire.era].color} />
									<Text
										weight="bold"
										align="center"
										color={eraArray[empire.era].color}
										ml={1}
									>
										{t("layout.infobar.turns")}
									</Text>
								</Center>
								<AnimateNumberChange type="turns" number={empire.turns} />
							</div>
						</Popover.Target>
						<Popover.Dropdown>
							<Text align="center" color={eraArray[empire.era].color}>
								<CountdownTimer intervalMinutes={turnsFreq} approximately />
							</Text>
						</Popover.Dropdown>
					</Popover>
				</Grid.Col>
				{scoreEnabled && (
					<Grid.Col span={2}>
						<Center>
							<Ranking size={20} color={eraArray[empire.era].color} />
							<Text
								weight="bold"
								align="center"
								color={eraArray[empire.era].color}
								ml={2}
							>
								{t("layout.infobar.score")}
							</Text>
						</Center>
						<AnimateNumberChange type="score" number={empire.score} />
					</Grid.Col>
				)}
				<Grid.Col span={3}>
					<Center>
						<Scales size={20} color={eraArray[empire.era].color} />
						<Text
							weight="bold"
							align="center"
							color={eraArray[empire.era].color}
							ml={2}
						>
							{t("layout.infobar.networth")}
						</Text>
					</Center>
					<AnimateNumberChange type="networth" number={empire.networth} />
				</Grid.Col>
				<Grid.Col span={3}>
					<Center>
						<Mountains size={20} color={eraArray[empire.era].color} />
						<Text
							weight="bold"
							align="center"
							color={eraArray[empire.era].color}
							ml={2}
						>
							{t("layout.infobar.land")}
						</Text>
					</Center>
					<AnimateNumberChange type="land" number={empire.land} />
				</Grid.Col>
				<Grid.Col span={3}>
					<Center>
						<Coins size={20} color={eraArray[empire.era].color} />
						<Text
							weight="bold"
							align="center"
							color={eraArray[empire.era].color}
							ml={2}
						>
							{t("layout.infobar.money")}
						</Text>
					</Center>
					<AnimateNumberChange type="cash" number={empire.cash} />
				</Grid.Col>
				<Grid.Col span={3}>
					<Center>
						<ForkKnife size={20} color={eraArray[empire.era].color} />
						<Text
							weight="bold"
							align="center"
							color={eraArray[empire.era].color}
							ml={2}
						>
							{t(`eras:eras.${eraArray[empire.era].name.toLowerCase()}.food`)}
						</Text>
					</Center>

					<AnimateNumberChange type="food" number={empire.food} />
				</Grid.Col>
				<Grid.Col span={3}>
					<Center>
						<Brain size={20} color={eraArray[empire.era].color} />
						<Text
							weight="bold"
							align="center"
							color={eraArray[empire.era].color}
							ml={2}
						>
							{t(`eras:eras.${eraArray[empire.era].name.toLowerCase()}.runes`)}
						</Text>
					</Center>
					<AnimateNumberChange type="runes" number={empire.runes} />
				</Grid.Col>
				<Grid.Col span={2}>
					<Center>
						<Heart size={20} color={eraArray[empire.era].color} />
						<Text
							weight="bold"
							align="center"
							color={eraArray[empire.era].color}
							ml={2}
						>
							{t("layout.infobar.health")}
						</Text>
					</Center>
					<AnimateNumberChange type="health" number={empire.health} />
				</Grid.Col>
			</Grid>
		</Paper>
	)
}
