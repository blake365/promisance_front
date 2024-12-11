import {
	MantineProvider,
	ColorSchemeProvider,
	Card,
	Box,
	Title,
	Text,
	Button,
	Badge,
	Container,
	Flex,
	Grid,
	Group,
} from "@mantine/core"
import HeroImageRight from "./homeHero"
import { useEffect } from "react"
import FooterSocial from "../layout/footer"
import { useDispatch } from "react-redux"
import { useMediaQuery } from "@mantine/hooks"
import BigCarousel from "../layout/embla/Carousel"
// import { onLCP } from 'web-vitals'
import { fetchGames } from "../../store/gamesSlice"
import Axios from "axios"
import { persistor } from "../../store/store"
import { logoutEmpire } from "../../store/empireSlice"
import { resetUser } from "../../store/userSlice"
import {
	UsersFour,
	City,
	Sword,
	GitBranch,
	Alien,
	HourglassMedium,
	Envelope,
	ShoppingCart,
	Newspaper,
} from "@phosphor-icons/react"
import { useLocalStorage } from "@mantine/hooks"
import { useTranslation } from "react-i18next"

export default function Home() {
	const dispatch = useDispatch()
	// dispatch(getTime(1))
	const { t, i18n } = useTranslation(["pages"])
	console.log(i18n.language)
	useEffect(() => {
		dispatch(fetchGames())

		// console.log('hello?')
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
	})

	// onLCP(console.log)

	const features = [
		{
			name: t("pages:home.turnBased"),
			icon: <GitBranch size={20} />,
			description: t("pages:home.turnBasedText"),
		},
		{
			name: t("pages:home.pvp"),
			icon: <Sword size={20} />,
			description: t("pages:home.pvpText"),
		},
		{
			name: t("pages:home.market"),
			icon: <ShoppingCart size={20} />,
			description: t("pages:home.marketText"),
		},
		{
			name: t("pages:home.races"),
			icon: <Alien size={20} />,
			description: t("pages:home.racesText"),
		},
		{
			name: t("pages:home.buildings"),
			icon: <City size={20} />,
			description: t("pages:home.buildingsText"),
		},
		{
			name: t("pages:home.eras"),
			icon: <HourglassMedium size={20} />,
			description: t("pages:home.erasText"),
		},
		{
			name: t("pages:home.clan"),
			icon: <UsersFour size={20} />,
			description: t("pages:home.clanText"),
		},

		{
			name: t("pages:home.diplomacy"),
			icon: <Envelope size={20} />,
			description: t("pages:home.diplomacyText"),
		},

		{
			name: t("pages:home.news"),
			icon: <Newspaper size={20} />,
			description: t("pages:home.newsText"),
		},
	]

	const strategies = [
		{
			name: t("pages:home.farmer"),
			description: t("pages:home.farmerText"),
			races: ["Gremlin", "Hobbit", "Ghoul"],
			image: "/images/farm.webp",
			color: "green",
		},
		{
			name: t("pages:home.industrialist"),
			description: t("pages:home.industrialistText"),
			races: ["Dwarf", "Orc", "Goblin", "Ghoul"],
			image: "/images/industry.webp",
			color: "red",
		},
		{
			name: t("pages:home.economist"),
			description: t("pages:home.economistText"),
			races: ["Gnome", "Minotaur", "Vampire"],
			image: "/images/cash.webp",
			color: "yellow",
		},
		{
			name: t("pages:home.mage"),
			description: t("pages:home.mageText"),
			races: ["Elf", "Drow", "Pixie"],
			image: "/images/magic.webp",
			color: "indigo",
		},
	]

	const smScreen = useMediaQuery("(max-width: 768px)")

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
				<main>
					<HeroImageRight />
					<Container size="lg" align="center" mt="lg">
						<Grid justify="center" align="center" mb="lg">
							<Grid.Col md={5} sm={12}>
								<Box align="left" my="lg">
									<Title order={1}>{t("pages:home.about")}</Title>
									<Text size="lg">{t("pages:home.aboutText")}</Text>
									<Text size="lg" mt="xs">
										{t("pages:home.about2")}
									</Text>
								</Box>
							</Grid.Col>
							<Grid.Col md={7} sm={12}>
								{smScreen ? (
									<section className="sandbox__carousel">
										<BigCarousel
											slides={Array.from(Array(4).keys())}
											options={{}}
										/>
									</section>
								) : (
									<section className="sandbox__carousel">
										<BigCarousel
											slides={Array.from(Array(5).keys())}
											options={{}}
											big
										/>
									</section>
								)}
							</Grid.Col>
						</Grid>

						<Box my="lg">
							<Card p="lg" withBorder>
								<Title order={1} align="center" mb="lg">
									{t("pages:home.features")}
								</Title>
								<Flex justify="center" wrap="wrap">
									{features.map((feature) => (
										<Box key={feature.name} w={!smScreen ? 300 : 410} p="lg">
											<Group spacing="xs" noWrap>
												{feature.icon}
												<Title order={3} align="left">
													{feature.name}
												</Title>
											</Group>
											<Text size="sm" align="left">
												{feature.description}
											</Text>
										</Box>
									))}
								</Flex>
							</Card>
						</Box>

						<Box mt="xl">
							<Title order={1} ta="left">
								{t("pages:home.strategies")}
							</Title>
							<Text ta="left" size="lg">
								{t("pages:home.strategiesText")}
							</Text>
						</Box>
						<Flex justify="center" wrap="wrap">
							{strategies.map((strategy) => (
								<Card
									ta="left"
									withBorder
									mb="md"
									shadow="sm"
									key={strategy.name}
									w={!smScreen ? 350 : 400}
									m="lg"
								>
									<Card.Section h={175}>
										<img
											src={strategy.image}
											alt={strategy.name}
											style={{
												width: "100%",
												height: "100%",
												objectFit: "cover",
											}}
											loading="lazy"
										/>
									</Card.Section>
									<Title order={2} mt="xs">
										{strategy.name}
									</Title>
									<Text mt="xs" size="sm">
										{strategy.description}
									</Text>
									<Text size="sm" mt="sm" weight="bold">
										{t("pages:home.suggestedRaces")}:
									</Text>
									{strategy.races.map((race) => (
										<Badge
											key={race}
											variant="filled"
											mr="xs"
											color={strategy.color}
										>
											{race}
										</Badge>
									))}
								</Card>
							))}
						</Flex>

						<Box my="lg">
							<Card p="lg" withBorder maw={722}>
								<Title order={1} align="center" mb="lg">
									{t("pages:home.readyToPlay")}
								</Title>
								<Text>{t("pages:home.readyToPlayText")}</Text>
								<Button
									size="md"
									component="a"
									sx={{ marginTop: 10 }}
									href="/register"
								>
									{t("pages:home.register")}
								</Button>
							</Card>
						</Box>
					</Container>
					<FooterSocial />
				</main>
			</MantineProvider>
		</ColorSchemeProvider>
	)
}
