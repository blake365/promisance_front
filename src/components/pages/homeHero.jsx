import { memo, useCallback } from "react"
import {
	createStyles,
	Container,
	Title,
	Text,
	Button,
	Group,
} from "@mantine/core"
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
import { LanguageSelector } from "../utilities/LanguageSelector"

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

const ExternalLink = memo(({ href, icon, children }) => (
	<Button
		leftIcon={icon}
		component="a"
		href={href}
		target="_blank"
		color="dark"
		compact
		size="md"
	>
		{children}
	</Button>
))

const InternalLink = memo(({ to, icon, children }) => (
	<Button
		component={Link}
		to={to}
		leftIcon={icon}
		color="dark"
		compact
		size="md"
	>
		{children}
	</Button>
))

const AuthButtons = memo(({ user, onLogout }) => {
	const { t } = useTranslation(["pages"])

	if (!user) {
		return (
			<>
				<Button component={Link} to="/register" size="lg">
					{t("pages:hero.register")}
				</Button>
				<Button component={Link} to="/login" size="lg" color="teal">
					{t("pages:hero.login")}
				</Button>
			</>
		)
	}

	return (
		<>
			<Button component={Link} to="/select" size="lg">
				{t("pages:hero.select")}
			</Button>
			<Button onClick={onLogout} size="lg" color="red">
				{t("pages:hero.logout")}
			</Button>
			{user.role === "admin" && (
				<Button component={Link} to="/admin/" size="lg" color="teal">
					Admin
				</Button>
			)}
		</>
	)
})

function HeroImageRight() {
	const { user } = useSelector((state) => state.user)
	const dispatch = useDispatch()
	const { classes } = useStyles()
	const { t } = useTranslation(["pages"])

	const handleLogout = useCallback(() => {
		persistor.pause()
		persistor.flush().then(() => {
			return persistor.purge()
		})
		dispatch(logout())
		dispatch(logoutEmpire())
	}, [dispatch])

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
						<Title color="white" size="h3" maw="24rem" mb="lg">
							{t("pages:hero.about")}
						</Title>
						<Text color="white" maw="24rem">
							{t("pages:hero.description")}
						</Text>
					</div>
				</div>

				<Group my="lg" spacing="lg">
					<AuthButtons user={user} onLogout={handleLogout} />
				</Group>

				<Group position="left">
					<ExternalLink
						href="https://guide.neopromisance.com"
						icon={<Compass size={14} />}
					>
						{t("pages:hero.guide")}
					</ExternalLink>

					<InternalLink to="/rules" icon={<ListBullets size={14} />}>
						{t("pages:hero.rules")}
					</InternalLink>

					<InternalLink to="/archive" icon={<Archive size={14} />}>
						{t("pages:hero.archive")}
					</InternalLink>

					<ExternalLink
						href="https://discord.gg/bnuVy2pdgM"
						icon={<DiscordLogo size={14} />}
					>
						Discord
					</ExternalLink>

					<LanguageSelector />
				</Group>
			</Container>
		</div>
	)
}

export default memo(HeroImageRight)
