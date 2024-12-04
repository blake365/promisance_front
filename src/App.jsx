import { useEffect, useState } from "react"
import { Outlet, useNavigate, Link } from "react-router-dom"
import Axios from "axios"
import { useLocalStorage } from "@mantine/hooks"
import useInterval from "./hooks/useInterval"
import {
	ColorSchemeProvider,
	Group,
	Loader,
	MantineProvider,
	Grid,
	AppShell,
	Burger,
	Header,
	MediaQuery,
	Navbar,
	Title,
	ScrollArea,
	Button,
	Image,
	Center,
	Box,
} from "@mantine/core"
import { NotificationsProvider, showNotification } from "@mantine/notifications"
import neoIcon from "./icons/neoIcon.svg"
import Sidebar from "./components/layout/sidebar"
import InfoBar from "./components/layout/infobar"
import { useDispatch, useSelector } from "react-redux"
import TurnResultContainer from "./components/useTurns/TurnResultContainer"
import { fetchEmpire, empireLoaded, logoutEmpire } from "./store/empireSlice"
import { load } from "./store/userSlice"
import ThemeToggle from "./components/utilities/themeToggle"
import { useLocation } from "react-router-dom"
import { setPage } from "./store/guideSlice"
import { getTime } from "./store/timeSlice"
import EffectIcons from "./components/layout/EffectIcons"
import BonusTurns from "./components/layout/bonusTurns"
import { persistor } from "./store/store"
import { resetUser } from "./store/userSlice"
import { useTour } from "@reactour/tour"
import { processAchievement } from "./functions/processAchievement"
import GuideModalButton from "./components/guide/guideModalButton"
import NewsDrawerButton from "./components/news/newsDrawerButton"
import RefreshButton from "./components/utilities/refreshButton"
import MailButton from "./components/mail/mailButton"
import ClanMailButton from "./components/diplomacy/clans/clanMessagesButton"
import RepeatButton from "./components/utilities/repeatButton"
import { fetchGames, setActiveGame } from "./store/gamesSlice"
import * as Sentry from "@sentry/react"
import ResumeTutorialButton from "./components/utilities/resumeTutorialButton"
import { LanguageSelector } from "./components/utilities/LanguageSelector"

function App() {
	const [opened, setOpened] = useState(false)
	const dispatch = useDispatch()
	const location = useLocation()
	const empireStatus = useSelector((state) => state.empire.status)
	const { isLoggedIn, user } = useSelector((state) => state.user)
	const { empire } = useSelector((state) => state.empire)

	// handle condition where there is no active game in redux store
	const games = useSelector((state) => state.games.games)
	const activeGame = useSelector((state) => state.games.activeGame)

	// const { time } = useSelector((state) => state.time)
	const kickOut = (error) => {
		console.log(error)
		persistor.pause()
		persistor.flush().then(() => {
			return persistor.purge()
		})
		dispatch(resetUser())
		dispatch(logoutEmpire())
		navigate("/select")
	}
	// console.log(empire)
	// const achievements = empire?.achievements
	// console.log(achievements)

	const navigate = useNavigate()

	const { setIsOpen, currentStep, meta } = useTour()

	useEffect(() => {
		if (!activeGame) {
			console.log("no active game")
			navigate("/select")
		} else {
			dispatch(getTime(activeGame.game_id))
		}
	}, [activeGame])

	useEffect(() => {
		async function loadUser() {
			// console.log('loading user')
			const res = await Axios.get("auth/me")
			// console.log('status', res.data)
			if (res.status !== 200) {
				console.log("not 200")
				kickOut(res)
			} else if (res.data) {
				dispatch(load())
			}
		}

		if (!isLoggedIn) {
			loadUser()
		}

		if (
			isLoggedIn &&
			user.empires.length > 0 &&
			(empireStatus === "idle" || empireStatus === "loading") &&
			activeGame
		) {
			const { uuid } = user.empires.find(
				(empire) => empire.game_id === activeGame.game_id,
			)
			// console.log('logged in but no empire')
			dispatch(
				fetchEmpire({
					uuid: uuid,
				}),
			).then((data) => {
				// console.log(data.error)
				if (data.error) {
					kickOut(data.error)
				}
			})
		} else if (isLoggedIn && user.empires.length === 0) {
			if (user.role === "demo") {
				navigate("/demo")
			} else {
				navigate("/create")
			}
		}

		if (!activeGame && empire) {
			dispatch(fetchGames())
			if (empire?.game_id) {
				// match game id to game in games array and set active game
				// console.log('hello')
				const game = games.find((game) => game.game_id === empire.game_id)
				// console.log(game)
				dispatch(setActiveGame(game))
				dispatch(getTime(game.game_id))
			}
		}

		dispatch(setPage(pageState))
		dispatch(getTime(activeGame?.game_id))

		if (empireStatus === "succeeded") {
			if (empire.flags === 1 && location.pathname !== "/app/disabled") {
				navigate("/app/disabled")
			}
		}
	})

	let achievements = {} // Extract achievements from empire
	if (empire) {
		achievements = empire.achievements
		// console.log(achievements)
	}

	useEffect(() => {
		for (const key of Object.keys(achievements)) {
			if (
				achievements[key].awarded &&
				new Date(achievements[key].timeAwarded).getTime() + 1000 > Date.now()
			) {
				// console.log(key)
				const { message, icon } = processAchievement(key)
				showNotification({
					title: "Achievement Awarded",
					message: message,
					icon: icon,
				})
			}
		}
	}, [achievements])

	useEffect(() => {
		if (meta === "new player tour") {
			if (currentStep === 3 || currentStep === 0) {
				setOpened(true)
			} else {
				setOpened(false)
			}
			if (currentStep === 1 && pageName !== "Explore") {
				navigate("/app/Explore")
			}
			if (currentStep === 4 && pageName !== "Build") {
				navigate("/app/Build")
			}
		}
	}, [currentStep, setIsOpen, meta])

	useInterval(async () => {
		if (empireStatus === "succeeded" && pageName !== "Public Market") {
			try {
				const res = await Axios.get(`/empire/${empire.uuid}`)
				// console.log(res.data)
				dispatch(empireLoaded(res.data))
			} catch (error) {
				kickOut(error)
			}
		}
	}, 120000)

	const locationArr = location.pathname.split("/")
	const last = locationArr.length - 1
	const pageState = locationArr[last]
	const pageName = pageState.replace("%20", " ")
	// console.log(pageState)
	// console.log(clanMail)
	// useEffect(() =>
	// {
	// 	let pathAfterApp = location.pathname.split('/app')[1];
	// 	if (pathAfterApp === '') {
	// 		navigate('/app/');
	// 	}
	// }, [location, navigate]);

	const [colorScheme, setColorScheme] = useLocalStorage({
		key: "prom-color-scheme",
		defaultValue: "dark",
	})
	const toggleColorScheme = (value) =>
		setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"))

	function FallbackComponent() {
		return (
			<Center h="100vh">
				<Title>An error has occurred, please refresh the website</Title>
			</Center>
		)
	}

	const myFallback = <FallbackComponent />

	return (
		<Sentry.ErrorBoundary fallback={myFallback}>
			<ColorSchemeProvider
				colorScheme={colorScheme}
				toggleColorScheme={toggleColorScheme}
			>
				<MantineProvider theme={{ colorScheme }} withGlobalStyles>
					<NotificationsProvider autoClose={4000}>
						<AppShell
							styles={(theme) => ({
								main: {
									backgroundColor:
										theme.colorScheme === "dark"
											? theme.colors.dark[8]
											: theme.colors.gray[1],
								},
							})}
							className="gnome9 vampire9 minotaur9 gnome8 vampire8 minotaur8"
							navbarOffsetBreakpoint="sm"
							fixed
							navbar={
								<Navbar
									padding="sm"
									hiddenBreakpoint="sm"
									hidden={!opened}
									width={{ sm: 200, base: 200 }}
									zIndex={110}
									sx={{
										paddingBottom: "calc(1em + env(safe-area-inset-bottom))",
									}}
								>
									<Navbar.Section
										grow
										component={ScrollArea}
										ml={10}
										onClick={() => setOpened(false)}
									>
										<Sidebar game={activeGame} />
									</Navbar.Section>
									<Navbar.Section>
										<Button
											component={Link}
											to="/select"
											variant="subtle"
											color="red"
											fullWidth
										>
											Mode Select
										</Button>
									</Navbar.Section>
								</Navbar>
							}
							header={
								<Header height={60} p="sm" zIndex={120}>
									<Group position="apart" spacing={2}>
										<MediaQuery largerThan="sm" styles={{ display: "none" }}>
											<Burger
												opened={opened}
												onClick={() => setOpened((o) => !o)}
												size="sm"
											/>
										</MediaQuery>
										<a
											style={{ textDecoration: "none", color: "inherit" }}
											href="/"
										>
											<Group align="center" spacing={4}>
												<MediaQuery
													smallerThan={400}
													styles={{ display: "none" }}
												>
													<Image
														src={neoIcon}
														height={38}
														width={38}
														sx={
															colorScheme === "dark"
																? { filter: "invert(1)", opacity: "75%" }
																: { filter: "invert(0)" }
														}
													/>
												</MediaQuery>
												<Title order={1} ml={0}>
													NeoPromisance
												</Title>
											</Group>
										</a>
										<Group>
											{user?.role === "admin" ? (
												<Button
													component="a"
													href="/admin/"
													compact
													variant="light"
												>
													Admin
												</Button>
											) : (
												""
											)}
											<MediaQuery smallerThan="sm" styles={{ display: "none" }}>
												<Box>
													<LanguageSelector />
												</Box>
											</MediaQuery>
											<ThemeToggle />
										</Group>
									</Group>
								</Header>
							}
						>
							<main
								style={{
									paddingBottom: "calc(15px + env(safe-area-inset-bottom))",
								}}
								onClick={() => setOpened(false)}
								className="gremlin14 dwarf14 ghoul14 goblin14 orc14 hobbit14 elf10 drow10 pixie10 gnome14 vampire14 minotaur14"
							>
								{empireStatus !== "succeeded" ? (
									<Loader />
								) : (
									<>
										<InfoBar data={empire} />
										<Grid
											grow
											justify="center"
											sx={{ marginTop: "0.5rem", marginBottom: "0.25rem" }}
										>
											<Grid.Col span={2}>
												<EffectIcons pageState={pageState} empire={empire} />
											</Grid.Col>
											<Grid.Col span={3}>
												<Group spacing="xs" position="center">
													<GuideModalButton
														pageName={pageName}
														empire={empire}
														protection={activeGame?.turnsProtection}
													/>
													<RefreshButton empire={empire} />
												</Group>
											</Grid.Col>
											<Grid.Col span={2}>
												<Group spacing="xs" mr="sm" position="right">
													<BonusTurns />
													{empire.clanId !== 0 && (
														<ClanMailButton empire={empire} kickOut={kickOut} />
													)}
													<MailButton
														empire={empire}
														kickOut={kickOut}
														pageState={pageState}
													/>
													<NewsDrawerButton
														kickOut={kickOut}
														empire={empire}
														pageState={pageState}
													/>
												</Group>
											</Grid.Col>
										</Grid>
										<TurnResultContainer empire={empire} />
										<ResumeTutorialButton />
										<RepeatButton empire={empire} kickOut={kickOut} />
										<Outlet />
									</>
								)}
							</main>
						</AppShell>
					</NotificationsProvider>
				</MantineProvider>
			</ColorSchemeProvider>
		</Sentry.ErrorBoundary>
	)
}

export default App
