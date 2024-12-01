import { Center, Stack, Text, Button } from "@mantine/core"
import { useSelector } from "react-redux"
import { useTranslation } from "react-i18next"

export default function Disabled() {
	const { empire } = useSelector((state) => state.empire)
	const { t } = useTranslation("pages")
	return (
		<section>
			<Center>
				<Stack spacing="sm" align="center">
					<Text align="center">
						{t("pages:disabled.title")}
						<a href="/rules">{t("pages:disabled.seeRules")}</a>
					</Text>
					<Text align="center">{t("pages:disabled.appeal")}</Text>
					<Button
						component="a"
						href={`mailto:admin@neopromisance.com?subject=${empire.name} (#${empire.id}) Disabled Appeal`}
					>
						{t("pages:disabled.email")}
					</Button>
				</Stack>
			</Center>
		</section>
	)
}
