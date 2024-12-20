import { Button, Stack, Title } from "@mantine/core"
import { Fragment, memo } from "react"
import { Link, useLocation } from "react-router-dom"
import { ArrowSquareOut } from "@phosphor-icons/react"
import { useTour } from "@reactour/tour"
import { useTranslation } from "react-i18next"

const Sidebar = memo(({ game }) => {
	const { t } = useTranslation(["layout"])
	const { setCurrentStep, meta } = useTour()

	const infoLinks = [
		{ key: "Summary", i18nKey: "layout.sidebar.summary" },
		{ key: "Overview", i18nKey: "layout.sidebar.overview" },
		{ key: "Scores", i18nKey: "layout.sidebar.scores" },
		{ key: "Clan Stats", i18nKey: "layout.sidebar.clanStats" },
		{ key: "Mailbox", i18nKey: "layout.sidebar.mailbox" },
		{ key: "World News", i18nKey: "layout.sidebar.worldNews" },
	]

	const turnLinks = [
		{ key: "Favorites", i18nKey: "layout.sidebar.favorites" },
		{ key: "Explore", i18nKey: "layout.sidebar.explore" },
		{ key: "Build", i18nKey: "layout.sidebar.build" },
		{ key: "Farm", i18nKey: "layout.sidebar.farm" },
		{ key: "Cash", i18nKey: "layout.sidebar.cash" },
		{ key: "Industry", i18nKey: "layout.sidebar.industry" },
		{ key: "Meditate", i18nKey: "layout.sidebar.meditate" },
		{ key: "Magic Center", i18nKey: "layout.sidebar.magicCenter" },
		{ key: "Heal", i18nKey: "layout.sidebar.heal" },
	]
	const financeLinks = [
		{ key: "Black Market", i18nKey: "layout.sidebar.blackMarket" },
		{ key: "Public Market", i18nKey: "layout.sidebar.publicMarket" },
		{ key: "The Bank", i18nKey: "layout.sidebar.theBank" },
		{ key: "Lottery", i18nKey: "layout.sidebar.lottery" },
	]
	const foreignLinks = [
		{ key: "Clans", i18nKey: "layout.sidebar.clans" },
		{ key: "War Council", i18nKey: "layout.sidebar.warCouncil" },
		{ key: "Intel Center", i18nKey: "layout.sidebar.intelCenter" },
		{ key: "Foreign Aid", i18nKey: "layout.sidebar.foreignAid" },
	]
	const statsLinks = [
		{ key: "Achievements", i18nKey: "layout.sidebar.achievements" },
		{ key: "Charts", i18nKey: "layout.sidebar.charts" },
	]
	const managementLinks = [
		{ key: "Empire Settings", i18nKey: "layout.sidebar.empireSettings" },
	]

	const location = useLocation()
	// console.log(location.pathname.split('/app/')[1])
	let locationString = location.pathname.split("/app")[1]
	// remove the first character if it is a '/'
	if (locationString[0] === "/") {
		locationString = locationString.slice(1)
	}
	// console.log(locationString.split('%').length > 1)

	const setTutorialClassnames = (link) => {
		if (link === "Explore") {
			return "first-step gremlin1 dwarf1 elf1 drow1 ghoul1 gnome1 pixie1 minotaur1 goblin1 orc1 hobbit1 vampire1"
		}
		if (link === "Build") {
			return "third-step gremlin3 dwarf3 elf3 drow3 ghoul3 gnome3 pixie3 minotaur3 goblin3 orc3 hobbit3 vampire3"
		}
		if (link === "Farm") {
			return "gremlin5 hobbit5"
		}
		if (link === "Magic Center") {
			return "gremlin11 dwarf11 elf7 gremlin11 drow7 ghoul11 gnome11 pixie7 minotaur11 goblin11 orc11 hobbit11 vampire11 "
		}
		if (link === "Industry") {
			return "dwarf5 orc5 goblin5"
		}
		if (link === "Meditate") {
			return "drow5 elf5 pixie5"
		}
		if (link === "Cash") {
			return "gnome5 minotaur5 vampire5"
		}
		if (link === "Public Market") {
			return "gremlin7 dwarf7 ghoul7 goblin7 orc7 hobbit7"
		}
		if (link === "The Bank") {
			return "gnome7 minotaur7 vampire7"
		}
		if (link === "Black Market") {
			// return "gnome8 minotaur8"; // vampire8
		}
	}

	return (
		<Fragment>
			<Stack
				spacing="xs"
				sx={{
					marginBottom: "1rem",
					marginRight: "0.5rem",
					marginTop: "0.5rem",
				}}
			>
				<Button radius={0} component={Link} to="/select">
					<Title order={3} align="center" color="white" w={"100%"}>
						{game.name}
					</Title>
				</Button>
				<Title order={4}>{t("layout.sidebar.headings.information")}</Title>
				{infoLinks.map(({ key, i18nKey }) => {
					let variant = "subtle"
					if (
						locationString.split("%").length > 1 &&
						locationString.split("%")[0] === key.split(" ")[0]
					) {
						variant = "filled"
					} else if (locationString === key) {
						variant = "filled"
					}

					if (!game.clanEnable && key === "clanStats") {
						return null
					}

					return (
						<Button
							component={Link}
							compact
							to={`/app/${key}`}
							variant={variant}
							key={key}
						>
							{t(i18nKey)}
						</Button>
					)
				})}
				<Button
					component="a"
					compact
					href="https://discord.gg/bnuVy2pdgM"
					target="_blank"
					variant="subtle"
					rightIcon={<ArrowSquareOut />}
				>
					{t("layout.sidebar.headings.discord")}
				</Button>
				<Button component={Link} compact to="/app/Tips" variant="subtle">
					{t("layout.sidebar.headings.gameTips")}
				</Button>
				<Title order={4}>{t("layout.sidebar.headings.useTurns")}</Title>
				{turnLinks.map(({ key, i18nKey }) => {
					let variant = "subtle"
					if (
						locationString.split("%").length > 1 &&
						locationString.split("%")[0] === key.split(" ")[0]
					) {
						variant = "filled"
					} else if (locationString === key) {
						variant = "filled"
					}
					return (
						<Button
							component={Link}
							compact
							to={`/app/${key}`}
							variant={variant}
							fullWidth
							key={key}
							className={setTutorialClassnames(key)}
							onClick={() => {
								if (
									meta &&
									meta !== "attacking tour" &&
									meta !== "build tour"
								) {
									console.log(meta)
									if (key === "Explore" && meta !== "new player tour") {
										setCurrentStep(2)
									} else if (key === "Explore") {
										setCurrentStep(1)
									}

									if (key === "Build") {
										setCurrentStep(4)
									}

									if (
										key === "Farm" &&
										(meta === "Gremlin tutorial" || meta === "Hobbit tutorial")
									) {
										// console.log("farm tutorial");
										setCurrentStep(6)
									}

									if (
										key === "Cash" &&
										(meta === "Gnome tutorial" ||
											meta === "Minotaur tutorial" ||
											meta === "Vampire tutorial")
									) {
										setCurrentStep(6)
									}

									if (
										key === "Industry" &&
										(meta === "Dwarf tutorial" ||
											meta === "Orc tutorial" ||
											meta === "Goblin tutorial")
									) {
										setCurrentStep(6)
									}

									if (
										key === "Meditate" &&
										(meta === "Elf tutorial" ||
											meta === "Drow tutorial" ||
											meta === "Pixie tutorial")
									) {
										setCurrentStep(6)
									}

									if (
										key === "Magic Center" &&
										meta.includes("tutorial") &&
										!meta.includes("Elf") &&
										!meta.includes("Drow") &&
										!meta.includes("Pixie")
									) {
										setCurrentStep(12)
									}

									if (
										key === "Magic Center" &&
										(meta === "Elf tutorial" ||
											meta === "Drow tutorial" ||
											meta === "Pixie tutorial")
									) {
										setCurrentStep(8)
									}
								}
							}}
						>
							{t(i18nKey)}
						</Button>
					)
				})}
				<Title order={4}>{t("layout.sidebar.headings.finance")}</Title>
				{financeLinks.map(({ key, i18nKey }) => {
					let variant = "subtle"
					if (
						locationString.split("%").length > 1 &&
						locationString.split("%")[0] === key.split(" ")[0]
					) {
						variant = "filled"
					} else if (locationString === key) {
						variant = "filled"
					}
					return (
						<Button
							component={Link}
							compact
							to={`/app/${key}`}
							variant={variant}
							fullWidth
							key={key}
							className={setTutorialClassnames(key)}
							onClick={() => {
								console.log(
									meta && meta !== "attacking tour" && meta !== "build tour",
								)
								if (meta) {
									if (key === "Public Market" && meta !== "new player tour") {
										setCurrentStep(8)
									}

									if (
										key === "Public Market" &&
										(meta.includes("Gnome") ||
											meta.includes("Minotaur") ||
											meta.includes("Vampire"))
									) {
										setCurrentStep(10)
									}

									if (key === "The Bank" && meta !== "new player tour") {
										setCurrentStep(8)
									}

									if (key === "Black Market" && meta !== "new player tour") {
										setCurrentStep(9)
									}
								}
							}}
						>
							{t(i18nKey)}
						</Button>
					)
				})}
				<Title order={4}>{t("layout.sidebar.headings.diplomacy")}</Title>
				{foreignLinks.map(({ key, i18nKey }) => {
					let variant = "subtle"
					if (
						locationString.split("%").length > 1 &&
						locationString.split("%")[0] === key.split(" ")[0]
					) {
						variant = "filled"
					} else if (locationString === key) {
						variant = "filled"
					}

					if (!game.clanEnable && key === "clans") {
						return null
					}

					if (!game.aidEnable && key === "foreignAid") {
						return null
					}

					return (
						<Button
							component={Link}
							compact
							to={`/app/${key}`}
							variant={variant}
							fullWidth
							key={key}
						>
							{t(i18nKey)}
						</Button>
					)
				})}
				<Title order={4}>{t("layout.sidebar.headings.additionalStats")}</Title>
				{statsLinks.map(({ key, i18nKey }) => {
					let variant = "subtle"
					if (
						locationString.split("%").length > 1 &&
						locationString.split("%")[0] === key.split(" ")[0]
					) {
						variant = "filled"
					} else if (locationString === key) {
						variant = "filled"
					}
					return (
						<Button
							component={Link}
							compact
							to={`/app/${key}`}
							variant={variant}
							fullWidth
							key={key}
						>
							{t(i18nKey)}
						</Button>
					)
				})}
				<Title order={4}>{t("layout.sidebar.headings.settings")}</Title>
				{managementLinks.map(({ key, i18nKey }) => {
					let variant = "subtle"
					if (
						locationString.split("%").length > 1 &&
						locationString.split("%")[0] === key.split(" ")[0]
					) {
						variant = "filled"
					} else if (locationString === key) {
						variant = "filled"
					}
					return (
						<Button
							component={Link}
							compact
							to={`/app/${key}`}
							variant={variant}
							fullWidth
							key={key}
						>
							{t(i18nKey)}
						</Button>
					)
				})}
				<Button
					component={"a"}
					compact
					href="https://www.buymeacoffee.com/blakemorgan"
					fullWidth
					variant="subtle"
					target="_blank"
					rightIcon={<ArrowSquareOut />}
				>
					{t("layout.sidebar.headings.donate")}
				</Button>
			</Stack>
		</Fragment>
	)
})

Sidebar.displayName = "Sidebar"
export default Sidebar
