import {
	Container,
	Group,
	Loader,
	MantineProvider,
	ColorSchemeProvider,
	Center,
} from "@mantine/core"
import { Suspense } from "react"
import { SlimHero } from "./slimHero"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { fetchGames } from "../../store/gamesSlice"
import { load, resetUser } from "../../store/userSlice"
import Axios from "axios"
import FooterSocial from "../layout/footer"
import ModeCard from "./ModeCard"
import { persistor } from "../../store/store"
import { logoutEmpire } from "../../store/empireSlice"
import { useLocalStorage } from "@mantine/hooks"

function LoadingFallback() {
	return (
		<Center style={{ width: "100%", height: "100vh" }}>
			<Loader size="xl" />
		</Center>
	)
}

export default function ModeSelect() {
	const dispatch = useDispatch()
	const { user } = useSelector((state) => state.user)

	const params = new URLSearchParams(window.location.search)
	const token = params.get("token")

	if (token) {
		dispatch(load(token))
	}
	// console.log(games)

	useEffect(() => {
		dispatch(fetchGames())
		async function loadUser() {
			try {
				const res = await Axios.get("auth/me")
				// console.log(res)
			} catch (error) {
				// console.log(error)
				// localStorage.removeItem('persist:root');
				persistor.pause()
				persistor.flush().then(() => {
					return persistor.purge()
				})
				dispatch(resetUser())
				dispatch(logoutEmpire())
			}
		}

		loadUser()
	}, [dispatch])

	const { status, games } = useSelector((state) => state.games)

	// get game data from scores to show information on the page
	// useEffect(() =>
	// {

	// }, [games])

	// logged in user can join both game modes
	// if they have not joined, clicking button will send them to create an empire for that mode
	// if they have joined, clicking button will send them into the game for that mode

	const [colorScheme, setColorScheme] = useLocalStorage({
		key: "prom-color-scheme",
		defaultValue: "dark",
	})
	const toggleColorScheme = (value) =>
		setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"))

	return (
		<ColorSchemeProvider
			colorScheme={colorScheme}
			toggleColorScheme={toggleColorScheme}
		>
			<MantineProvider theme={{ colorScheme }} withGlobalStyles>
				<Suspense fallback={<LoadingFallback />}>
					<SlimHero />
					<Container size="lg" align="center" py="xl">
						<Group mt="md" position="center" key="owjojd">
							{status === "succeeded" && games.length > 0 ? (
								games.map((game) => {
									if (game.isActive === false) return null
									let empireFound = false
									if (user?.empires?.length > 0) {
										const empire = user.empires.find(
											(empire) => empire.game_id === game.game_id,
										)
										if (empire) {
											empireFound = true
										}
									}

									return (
										<ModeCard
											game={game}
											empireFound={empireFound}
											user={user}
											key={game.id}
										/>
									)
								})
							) : (
								<Loader size="xl" />
							)}
						</Group>
					</Container>
					<FooterSocial />
				</Suspense>
			</MantineProvider>
		</ColorSchemeProvider>
	)
}
