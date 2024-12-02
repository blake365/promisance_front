import { eraArray } from "../../../config/eras"
import GuideLink from "../../utilities/guidelink"
import { useSelector } from "react-redux"
import { useTranslation } from "react-i18next"
import { parseGuideLinks } from "../../utilities/parseGuideLinks"

export default function IndyGuide({ empire }) {
	const { turnsMax } = useSelector((state) => state.games.activeGame)
	const { t } = useTranslation(["guide", "eras"])
	const eraName = eraArray[empire.era].name.toLowerCase()

	return (
		<div>
			<GuideLink text={t("guide:guide.content.common.return")} page="Index" />

			<h2>{t("guide:guide.content.indy.title")}</h2>

			<p>{parseGuideLinks(t("guide:guide.content.indy.description"))}</p>

			<h3>{t("guide:guide.content.indy.setup.title")}</h3>
			<p>
				{parseGuideLinks(
					t("guide:guide.content.indy.setup.raceRecommendation", {
						futureEra: eraArray[2].name,
						industryBonus: eraArray[2].mod_industry,
					}),
				)}
			</p>
			<p>
				{parseGuideLinks(
					t("guide:guide.content.indy.setup.buildings", {
						militaryBuilding: t(`eras:eras.${eraName}.bldtrp`),
						barracksBuilding: t(`eras:eras.${eraName}.bldcost`),
						wizardBuilding: t(`eras:eras.${eraName}.bldwiz`),
						spellShield: t(`eras:eras.${eraName}.spell_shield`),
					}),
				)}
			</p>

			<h3>{t("guide:guide.content.indy.turnsUsage.title")}</h3>
			<p>
				{parseGuideLinks(
					t("guide:guide.content.indy.turnsUsage.initialPhase", {
						maxTurns: turnsMax,
						militaryBuilding: t(`eras:eras.${eraName}.bldtrp`),
					}),
				)}
			</p>
			<p>
				{parseGuideLinks(
					t("guide:guide.content.indy.turnsUsage.troopProduction", {
						militaryBuilding: t(`eras:eras.${eraName}.bldtrp`),
					}),
				)}
			</p>
			<p>{parseGuideLinks(t("guide:guide.content.indy.turnsUsage.selling"))}</p>
			<p>{parseGuideLinks(t("guide:guide.content.indy.turnsUsage.profits"))}</p>
		</div>
	)
}
