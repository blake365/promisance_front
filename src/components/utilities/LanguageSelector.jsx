import { SegmentedControl, Box } from "@mantine/core"
import { useTranslation } from "react-i18next"
import { IconLanguage } from "@tabler/icons-react"

const languages = [
	{ label: "EN", value: "en" },
	{ label: "ES", value: "es" },
	// { label: "FR", value: "fr" },
]

export function LanguageSelector() {
	const { i18n } = useTranslation()

	return (
		<Box sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
			<IconLanguage size={20} />
			<SegmentedControl
				size="xs"
				value={i18n.language}
				onChange={(value) => i18n.changeLanguage(value)}
				data={languages}
				sx={(theme) => ({
					backgroundColor:
						theme.colorScheme === "dark"
							? theme.colors.dark[6]
							: theme.colors.gray[0],
				})}
			/>
		</Box>
	)
}
