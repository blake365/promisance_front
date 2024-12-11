import {
	memo,
	useEffect,
	useState,
	Suspense,
	useMemo,
	useCallback,
} from "react"
import {
	Title,
	Card,
	Avatar,
	Tabs,
	Text,
	Group,
	Indicator,
	Collapse,
	Image,
} from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { raceArray } from "../config/races"
import { eraArray } from "../config/eras"
import {
	Mountains,
	Scales,
	Hourglass,
	Sword,
	Shield,
	Ranking,
} from "@phosphor-icons/react"
import lazy from "./utilities/lazyWrapper"
const ScoresAttack = lazy(() => import("./diplomacy/scoresAttack"))
const ScoresSpell = lazy(() => import("./diplomacy/scoresSpell"))
const ScoresNews = lazy(() => import("./news/scoresNews"))
const ScoresIntel = lazy(() => import("./diplomacy/scoresIntel"))
const ScoresAid = lazy(() => import("./diplomacy/scoresAid"))
const ScoresChat = lazy(() => import("./mail/scoresChat"))
import Axios from "axios"
import { useSelector } from "react-redux"
import { useTranslation } from "react-i18next"

// Extract card header into separate component
const EmpireStats = memo(({ empire, scoreEnabled }) => {
	return (
		<Group sx={{ gap: "7px" }}>
			{scoreEnabled && (
				<Group ml="xs" sx={{ width: "90px" }} spacing={3} noWrap>
					<Ranking size={22} weight="fill" />
					<Text>{empire.score}</Text>
				</Group>
			)}
			<Group ml="xs" sx={{ width: "160px" }} spacing={3} noWrap>
				<Scales size={22} weight="fill" />
				<Text>${empire.networth.toLocaleString()}</Text>
			</Group>

			<Group ml="xs" spacing={3} noWrap sx={{ width: "100px" }}>
				<Mountains size={22} weight="fill" />
				<Text>{empire.land.toLocaleString()}</Text>
			</Group>
			<Group ml="xs" spacing={3} noWrap sx={{ width: "90px" }}>
				<Hourglass size={22} weight="regular" />
				<Text>{eraArray[empire.era].name}</Text>
			</Group>
			<Group ml="xs" spacing={5} noWrap sx={{ width: "100px" }}>
				<Image
					src={`/icons/${raceArray[empire.race].name.toLowerCase()}.svg`}
					height={22}
					width={22}
					fit="contain"
					sx={(theme) =>
						theme.colorScheme === "dark"
							? { filter: "invert(1)", opacity: "75%" }
							: { filter: "invert(0)" }
					}
					alt={raceArray[empire.race].name.toLowerCase()}
				/>
				<Text>{raceArray[empire.race].name}</Text>
			</Group>
			<Group ml="xs" spacing={3} noWrap sx={{ width: "90px" }}>
				<Text>DR: {Math.round(empire.diminishingReturns * 100) / 100}%</Text>
			</Group>
		</Group>
	)
})

const ScoreCard = memo(({ empire, myEmpire, home, clan, clanTag, role }) => {
	const [active, setActive] = useState(false)
	const [opened, { toggle }] = useDisclosure(false)
	const { t } = useTranslation(["summary"])
	const { time } = useSelector((state) => state.time)

	// Move selectors outside of useMemo
	const gameSettings = useSelector((state) => state.games?.activeGame)

	// Memoize values that are computed from props/state
	const turnsProtection = useMemo(
		() => (home ? 400 : gameSettings?.turnsProtection),
		[home, gameSettings?.turnsProtection],
	)

	const scoreEnabled = useMemo(
		() => (home ? false : gameSettings?.scoreEnabled),
		[home, gameSettings?.scoreEnabled],
	)

	const aidEnable = useMemo(
		() => (home ? true : gameSettings?.aidEnable),
		[home, gameSettings?.aidEnable],
	)

	// Memoize the session check function
	const checkForSession = useCallback(async () => {
		try {
			const res = await Axios.get(`/session/${empire.id}`)
			return res.data.result
		} catch (error) {
			console.log(error)
		}
	}, [empire.id])

	// Fix color and disabled calculations
	const { color, disabled } = useMemo(() => {
		let color = ""
		let disabled = false

		if (empire.turnsUsed <= turnsProtection) {
			color = "lightgreen"
			disabled = true
		}
		if (empire.mode === "demo") {
			color = "brown"
		}
		if (empire.id === myEmpire?.id) {
			color = "deepskyblue"
			disabled = true
		}
		if (empire.flags === 1) {
			color = "red"
		}
		if (empire.mode === "admin") {
			color = "orange"
		}

		if (!home) {
			const upcoming = time.start - time.time
			const remaining = time.end - time.time

			if (upcoming > 0 || remaining < 0) {
				disabled = true
			}
		}

		return { color, disabled }
	}, [
		empire.turnsUsed,
		turnsProtection,
		empire.mode,
		empire.id,
		myEmpire?.id,

		empire.flags,
		home,
		time.start,
		time.end,
		time.time,
	])

	useEffect(() => {
		const now = new Date()
		const actionDate = new Date(empire.lastAction.replace(" ", "T"))

		if (now - actionDate < 300000) {
			setActive(true)
		}

		checkForSession().then((res) => {
			if (res) {
				setActive(true)
			}
		})
	}, [empire.lastAction, checkForSession])

	// Fix war check memoization
	const atWar = useMemo(() => {
		if (!myEmpire || !empire.clanReturn?.relation) return false

		return empire.clanReturn.relation.some(
			(relation) =>
				relation.clanRelationFlags === "war" &&
				relation.c_id2 === myEmpire.clanId,
		)
	}, [empire.clanReturn?.relation, myEmpire])

	const actionDate = useMemo(
		() => new Date(empire.lastAction.replace(" ", "T")),
		[empire.lastAction],
	)

	return (
		<Card
			shadow="sm"
			radius="sm"
			sx={{ width: "100%", overflowX: "hidden" }}
			key={empire.id}
			withBorder
		>
			<Card.Section sx={{ height: "2px" }}></Card.Section>
			<Card.Section onClick={toggle} sx={{ cursor: !home ? "pointer" : "" }}>
				<Group my="xs" spacing="xs">
					<Group w="100%" noWrap>
						<Text mx="xs" align="center" sx={{ width: 25 }} weight="bolder">
							{empire.rank}
						</Text>
						<Indicator color="blue" position="top-start" disabled={!active}>
							<Group spacing="xs" noWrap>
								<Avatar
									size="sm"
									alt={empire.profileIcon}
									src={empire.profileIcon}
									sx={(theme) =>
										theme.colorScheme === "dark"
											? { filter: "invert(1)", opacity: "75%" }
											: { filter: "invert(0)" }
									}
									imageProps={{ loading: "lazy" }}
								/>
								<Title order={4} color={color}>
									{empire.name}{" "}
									{!clanTag
										? !clan
											? null
											: `[${clan.slice(0, 4)}]`
										: `[${clanTag}]`}
								</Title>
							</Group>
						</Indicator>
					</Group>
					<EmpireStats empire={empire} scoreEnabled={scoreEnabled} />
				</Group>
			</Card.Section>

			{!home && (
				<Collapse in={opened}>
					<Group>
						<Text size="sm">
							{t("summary:card.lastAction", {
								time: actionDate.toLocaleString(),
							})}{" "}
						</Text>
						<Group ml="xs" spacing="xs" noWrap>
							<Sword size={22} weight="regular" />
							<Text>
								{empire.offTotal} (
								{empire.offSucc
									? Math.round((empire.offSucc / empire.offTotal) * 100)
									: "0"}
								%)
							</Text>
						</Group>
						<Group ml="xs" spacing="xs" noWrap>
							<Shield size={22} weight="regular" />
							<Text>
								{empire.defTotal} (
								{empire.defSucc
									? Math.round((empire.defSucc / empire.defTotal) * 100)
									: "0"}
								%)
							</Text>
						</Group>
					</Group>
					<Text>{empire.profile}</Text>
					<Text>{clan && `${role} of ${clan}`}</Text>
					<Suspense fallback={<div>Loading...</div>}>
						<Tabs defaultValue="" keepMounted={false}>
							<Tabs.List>
								<Tabs.Tab value="Recent News" disabled={disabled}>
									{t("summary:card.recentNews")}
								</Tabs.Tab>
								<Tabs.Tab value="Intel" disabled={disabled}>
									{t("summary:card.intel")}
								</Tabs.Tab>
								<Tabs.Tab value="Attack" disabled={disabled}>
									{t("summary:card.attack")}
								</Tabs.Tab>
								<Tabs.Tab value="Cast Spell" disabled={disabled}>
									{t("summary:card.castSpell")}
								</Tabs.Tab>
								{/* <Tabs.Tab value="Trade" disabled={disabled}>Trade</Tabs.Tab> */}
								{aidEnable && (
									<Tabs.Tab value="Send Aid" disabled={disabled}>
										{t("summary:card.sendAid")}
									</Tabs.Tab>
								)}
								<Tabs.Tab value="Chat">{t("summary:card.chat")}</Tabs.Tab>
							</Tabs.List>

							<Tabs.Panel value="Chat" pt="xs">
								<ScoresChat enemy={empire} />
							</Tabs.Panel>

							<Tabs.Panel value="Attack" pt="xs">
								<ScoresAttack enemy={empire} />
							</Tabs.Panel>

							<Tabs.Panel value="Cast Spell" pt="xs">
								<ScoresSpell enemy={empire} />
							</Tabs.Panel>

							<Tabs.Panel value="Intel" pt="xs">
								<ScoresIntel enemy={empire} />
							</Tabs.Panel>

							<Tabs.Panel value="Trade" pt="xs">
								Trade tab content
							</Tabs.Panel>

							<Tabs.Panel value="Send Aid" pt="xs">
								<ScoresAid friend={empire} />
							</Tabs.Panel>

							<Tabs.Panel value="Recent News" pt="xs">
								<ScoresNews enemy={empire} />
							</Tabs.Panel>
						</Tabs>
					</Suspense>
				</Collapse>
			)}
			<Card.Section sx={{ height: "2px" }}></Card.Section>
		</Card>
	)
})

// Make sure to set displayName for debugging
ScoreCard.displayName = "ScoreCard"
EmpireStats.displayName = "EmpireStats"

export default ScoreCard
