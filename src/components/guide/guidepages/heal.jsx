import { eraArray } from "../../../config/eras"
import GuideLink from "../../utilities/guidelink"
import { useTranslation } from "react-i18next"
import { parseGuideLinks } from "../../utilities/parseGuideLinks"

export default function HealGuide({ empire }) {
	const { t } = useTranslation(["guide", "eras"])
	const eraName = eraArray[empire.era].name.toLowerCase()

	return (
		<div>
			<GuideLink text={t("guide:guide.content.common.return")} page="Index" />

			<h2>{t("guide:guide.content.healing.title")}</h2>
			<p>
				{parseGuideLinks(
					t("guide:guide.content.healing.description", {
						wizardType: t(`eras:eras.${eraName}.trpwiz`),
					}),
				)}
			</p>
			<p>{parseGuideLinks(t("guide:guide.content.healing.effect"))}</p>
		</div>
	)
}
