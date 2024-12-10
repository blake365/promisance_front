import { eraArray } from "../../../config/eras"
import GuideLink from "../../utilities/guidelink"
import { useSelector } from "react-redux"
import { useTranslation } from "react-i18next"
import { parseGuideLinks } from "../../utilities/parseGuideLinks"

export default function AidGuide({ empire }) {
	const { aidDelay, aidMaxCredits } = useSelector(
		(state) => state.games.activeGame,
	)
	const { t } = useTranslation(["guide", "eras"])
	const eraName = eraArray[empire.era].name.toLowerCase()

	return (
		<div>
			<h2>{t("guide:guide.content.foreignAid.title")}</h2>
			<p>
				{parseGuideLinks(
					t("guide:guide.content.foreignAid.description", {
						seaUnit: t(`eras:eras.${eraName}.trpsea`),
						maxCredits: aidMaxCredits,
						delayHours: aidDelay,
					}),
				)}
			</p>
			<p>
				{parseGuideLinks(
					t("guide:guide.content.foreignAid.limits", {
						runeType: t(`eras:eras.${eraName}.runes`),
						foodType: t(`eras:eras.${eraName}.food`),
					}),
				)}
			</p>
			<p>
				{parseGuideLinks(
					t("guide:guide.content.foreignAid.requirements", {
						seaUnit: t(`eras:eras.${eraName}.trpsea`),
					}),
				)}
			</p>
			<p>
				{parseGuideLinks(
					t("guide:guide.content.foreignAid.restrictions.netWorth"),
				)}
			</p>
			<p>
				{parseGuideLinks(t("guide:guide.content.foreignAid.restrictions.war"))}
			</p>
		</div>
	)
}
