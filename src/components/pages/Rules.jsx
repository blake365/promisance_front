import { Container, ColorSchemeProvider, MantineProvider } from "@mantine/core"
import FooterSocial from "../layout/footer"
import { SlimHero } from "./slimHero"
import { useLocalStorage } from "@mantine/hooks"
import { useTranslation } from "react-i18next"

const GameRules = () => {
	const [colorScheme, setColorScheme] = useLocalStorage({
		key: "prom-color-scheme",
		defaultValue: "dark",
	})
	const toggleColorScheme = (value) =>
		setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"))
	const { t } = useTranslation(["pages"])

	return (
		<ColorSchemeProvider
			colorScheme={colorScheme}
			toggleColorScheme={toggleColorScheme}
		>
			<MantineProvider theme={{ colorScheme }} withGlobalStyles>
				<SlimHero />
				<Container size="lg" mt="lg">
					<h2>{t("pages:rules.title")}</h2>
					<p>{t("pages:rules.text")}</p>
					<ol>
						<li>{t("pages:rules.rule1")}</li>
						<li>
							{t("pages:rules.rule2")}{" "}
							<a href="mailto:admin@neopromisance.com">
								{t("pages:rules.admin")}
							</a>{" "}
							{t("pages:rules.rule3b")}
						</li>
						<p>{t("pages:rules.rule3c")}</p>
						<li>{t("pages:rules.rule4")}</li>
						<li>{t("pages:rules.rule5")}</li>
						<li>{t("pages:rules.rule6")}</li>
						<li>{t("pages:rules.rule7")}</li>
						<li>{t("pages:rules.rule8")}</li>
						<li>{t("pages:rules.rule9")}</li>
					</ol>
				</Container>
				<FooterSocial />
			</MantineProvider>
		</ColorSchemeProvider>
	)
}

export default GameRules
