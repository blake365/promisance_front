import { eraArray } from "../../../config/eras"
import GuideLink from "../../utilities/guidelink"
import { useSelector } from "react-redux"
import { useTranslation } from "react-i18next"
import { parseGuideLinks } from "../../utilities/parseGuideLinks"

export default function CasherGuide({ empire }) {
	const { turnsMax } = useSelector((state) => state.games.activeGame)
	const { t } = useTranslation(["guide", "eras"])
	const eraName = eraArray[empire.era].name.toLowerCase()

	return (
		<div>
			<GuideLink text={t("guide:guide.content.common.return")} page="Index" />

			<h2>{t("guide:guide.content.casher.title")}</h2>
			<p>{parseGuideLinks(t("guide:guide.content.casher.description"))}</p>

			<h3>{t("guide:guide.content.casher.setup.title")}</h3>
			<p>
				{parseGuideLinks(
					t("guide:guide.content.casher.setup.raceRecommendation", {
						futureEra: eraArray[2].name,
						cashBonus: eraArray[2].mod_cashpro,
					}),
				)}
			</p>
			<p>
				{parseGuideLinks(
					t("guide:guide.content.casher.setup.buildings", {
						housingBuilding: t(`eras:eras.${eraName}.bldpop`),
						economyBuilding: t(`eras:eras.${eraName}.bldcash`),
						barracksBuilding: t(`eras:eras.${eraName}.bldcost`),
						wizardBuilding: t(`eras:eras.${eraName}.bldwiz`),
						peasantName: t(`eras:eras.${eraName}.peasants`),
						spellShield: t(`eras:eras.${eraName}.spell_shield`),
					}),
				)}
			</p>

			<h3>{t("guide:guide.content.casher.turnsUsage.title")}</h3>
			<p>
				{parseGuideLinks(
					t("guide:guide.content.casher.turnsUsage.initialPhase", {
						maxTurns: turnsMax,
						housingBuilding: t(`eras:eras.${eraName}.bldpop`),
						economyBuilding: t(`eras:eras.${eraName}.bldcash`),
						peasantName: t(`eras:eras.${eraName}.peasants`),
					}),
				)}
			</p>
			<p>
				{parseGuideLinks(
					t("guide:guide.content.casher.turnsUsage.cashProduction", {
						housingBuilding: t(`eras:eras.${eraName}.bldpop`),
						economyBuilding: t(`eras:eras.${eraName}.bldcash`),
						peasantName: t(`eras:eras.${eraName}.peasants`),
					}),
				)}
			</p>
			<p>
				{parseGuideLinks(t("guide:guide.content.casher.turnsUsage.spending"))}
			</p>
		</div>
	)
}
