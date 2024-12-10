import { eraArray } from "../../../config/eras"
import GuideLink from "../../utilities/guidelink"
import { useTranslation } from "react-i18next"
import { parseGuideLinks } from "../../utilities/parseGuideLinks"

export default function MeditateGuide({ empire }) {
	const { t } = useTranslation(["guide", "eras"])
	const eraName = eraArray[empire.era].name.toLowerCase()

	return (
		<div>
			<h2>{t("guide:guide.content.meditate.title")}</h2>
			<p>
				{parseGuideLinks(
					t("guide:guide.content.meditate.description", {
						runeType: t(`eras:eras.${eraName}.runes`),
					}),
				)}
			</p>
			<p>
				{parseGuideLinks(
					t("guide:guide.content.meditate.bonus", {
						wizardType: t(`eras:eras.${eraName}.trpwiz`),
						runeType: t(`eras:eras.${eraName}.runes`),
					}),
				)}
			</p>
		</div>
	)
}
