import { eraArray } from "../../../config/eras"
import GuideLink from "../../utilities/guidelink"
import { useSelector } from "react-redux"
import { useTranslation } from "react-i18next"
import { parseGuideLinks } from "../../utilities/parseGuideLinks"

export default function ProtectionGuide({ empire }) {
	const { turnsMax, turnsProtection } = useSelector(
		(state) => state.games.activeGame,
	)
	const { t } = useTranslation(["guide", "eras"])

	return (
		<div>
			<GuideLink text={t("guide:guide.content.common.return")} page="Index" />

			<h2>{t("guide:guide.content.protection.title")}</h2>

			<p>
				{parseGuideLinks(
					t("guide:guide.content.protection.description", { turnsProtection }),
				)}
			</p>

			<p>
				{parseGuideLinks(
					t("guide:guide.content.protection.gettingStarted.exploring", {
						wizardBuilding: eraArray[empire.era].bldwiz,
					}),
				)}
			</p>

			<p>
				{parseGuideLinks(
					t("guide:guide.content.protection.gettingStarted.magicTip", {
						wizardBuilding: eraArray[empire.era].bldwiz,
					}),
				)}
			</p>

			<p>
				{parseGuideLinks(
					t("guide:guide.content.protection.leavingProtection.timing", {
						protectionEndTurns: turnsProtection - 1,
						maxTurns: turnsMax,
					}),
				)}
			</p>

			<p>
				{parseGuideLinks(
					t("guide:guide.content.protection.leavingProtection.vulnerability"),
				)}
			</p>

			<p>
				{parseGuideLinks(
					t("guide:guide.content.protection.leavingProtection.militaryTip"),
				)}
			</p>
		</div>
	)
}
