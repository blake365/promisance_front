import { createStyles, Container, Title, Button, Group } from "@mantine/core"
import neoIcon from "../../icons/neoIcon.svg"
import {
	Compass,
	ListBullets,
	DiscordLogo,
	Archive,
} from "@phosphor-icons/react"
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { persistor } from "../../store/store"
import { logout } from "../../store/userSlice"
import { logoutEmpire } from "../../store/empireSlice"
import { useTranslation } from "react-i18next"

const useStyles = createStyles((theme) => ({
	root: {
		backgroundColor: "#000000",
		backgroundSize: "cover",
		backgroundPosition: "center",
		"@media (max-width: 480px)": {
			backgroundImage:
				"linear-gradient(250deg, rgba(250, 250, 250, 0) 0%, #000000 70%), url(/images/sitsmall2.webp)",
		},
		"@media (min-width: 480px)": {
			backgroundImage:
				"linear-gradient(250deg, rgba(250, 250, 250, 0) 0%, #000000 70%), url(/images/sit.webp)",
		},
		paddingTop: "3rem",
		paddingBottom: "3rem",
	},

	inner: {
		display: "flex",
		justifyContent: "space-between",
	},

	svg: {
		filter: "invert(1)",
		marginBottom: "1rem",
		"@media (max-width: 480px)": {
			height: "2.6rem",
		},
		"@media (min-width: 700px)": {
			height: "5rem",
		},
		height: "3.2rem",
	},

	title: {
		color: "white",
		fill: "white",
		"@media (max-width: 415px)": {
			fontSize: "2.5rem",
		},
		"@media (min-width: 700px)": {
			fontSize: "5rem",
		},
		fontSize: "3rem",
	},
}))

export function SlimHero() {
	const { user } = useSelector((state) => state.user)
	const dispatch = useDispatch()
	const { t } = useTranslation(["pages"])
	const { classes } = useStyles()
	return (
		<div className={classes.root}>
			<Container size="lg">
				<div className={classes.inner}>
					<div>
						<Group align="center" spacing={4}>
							<img src={neoIcon} className={classes.svg} alt="logo" />
							<Title component={Link} to="/" className={classes.title} mb="lg">
								NeoPromisance
							</Title>
						</Group>
					</div>
				</div>
				<Group mb="lg" spacing="lg">
					{!user ? (
						<>
							<Button component={Link} to="/register" size="lg">
								{t("pages:hero.register")}
							</Button>
							<Button component={Link} to="/login" size="lg" color="teal">
								{t("pages:hero.login")}
							</Button>
						</>
					) : (
						<>
							<Button component={Link} to="/select" size="lg">
								{t("pages:hero.select")}
							</Button>
							<Button
								onClick={() => {
									persistor.pause()
									persistor.flush().then(() => {
										return persistor.purge()
									})
									dispatch(logout())
									dispatch(logoutEmpire())
								}}
								size="lg"
								color="red"
							>
								{t("pages:hero.logout")}
							</Button>
							{user.role === "admin" && (
								<Button component={Link} to="/admin/" size="lg" color="teal">
									Admin
								</Button>
							)}
						</>
					)}
				</Group>
				<Group position="left">
					<Button
						leftIcon={<Compass size={14} />}
						component="a"
						href="https://guide.neopromisance.com"
						target="_blank"
						color="dark"
						compact
						size="md"
					>
						{t("pages:hero.guide")}
					</Button>
					<Button
						component={Link}
						to="/rules"
						leftIcon={<ListBullets size={14} />}
						color="dark"
						compact
						size="md"
					>
						{t("pages:hero.rules")}
					</Button>
					<Button
						component={Link}
						to="/archive"
						leftIcon={<Archive size={14} />}
						color="dark"
						compact
						size="md"
					>
						{t("pages:hero.archive")}
					</Button>
					<Button
						leftIcon={<DiscordLogo size={14} />}
						component="a"
						href="https://discord.gg/bnuVy2pdgM"
						target="_blank"
						color="dark"
						compact
						size="md"
					>
						Discord
					</Button>
				</Group>
			</Container>
		</div>
	)
}
