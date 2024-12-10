import { eraArray } from "../../../config/eras"
import GuideLink from "../../utilities/guidelink"
import { useTranslation } from "react-i18next"
import { parseGuideLinks } from "../../utilities/parseGuideLinks"

export default function FarmGuide({ empire }) {
	const { t } = useTranslation(["guide", "eras"])
	const eraName = eraArray[empire.era].name.toLowerCase()

	return (
		<div>
			<h2>{t("guide:guide.content.farm.title")}</h2>
			<p>
				{parseGuideLinks(
					t("guide:guide.content.farm.description", {
						foodType: t(`eras:eras.${eraName}.food`),
					}),
				)}
			</p>
			<p>
				{parseGuideLinks(
					t("guide:guide.content.farm.bonus", {
						foodType: t(`eras:eras.${eraName}.food`),
					}),
				)}
			</p>
		</div>
	)
}
