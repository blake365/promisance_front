import { eraArray } from "../../../config/eras"
import GuideLink from "../../utilities/guidelink"
import { useSelector } from "react-redux"
import { useTranslation } from "react-i18next"
import { parseGuideLinks } from "../../utilities/parseGuideLinks"

export default function FarmerGuide({ empire }) {
	const { turnsMax } = useSelector((state) => state.games.activeGame)
	const { t } = useTranslation(["guide", "eras"])
	const eraName = eraArray[empire.era].name.toLowerCase()

	return (
		<div>
			<h2>{t("guide:guide.content.farmer.title")}</h2>

			<p>
				{parseGuideLinks(
					t("guide:guide.content.farmer.description", {
						wizardType: t(`eras:eras.${eraName}.trpwiz`),
					}),
				)}
			</p>

			<h3>{t("guide:guide.content.farmer.setup.title")}</h3>
			<p>
				{parseGuideLinks(
					t("guide:guide.content.farmer.setup.raceRecommendation", {
						presentEra: eraArray[1].name,
						foodBonus: eraArray[1].mod_foodpro,
					}),
				)}
			</p>
			<p>
				{parseGuideLinks(
					t("guide:guide.content.farmer.setup.buildings", {
						farmType: t(`eras:eras.${eraName}.bldfood`),
						wizardBuilding: t(`eras:eras.${eraName}.bldwiz`),
						spellShield: t(`eras:eras.${eraName}.spell_shield`),
					}),
				)}
			</p>

			<h3>{t("guide:guide.content.farmer.turnsUsage.title")}</h3>
			<p>
				{parseGuideLinks(
					t("guide:guide.content.farmer.turnsUsage.initialPhase", {
						maxTurns: turnsMax,
						farmType: t(`eras:eras.${eraName}.bldfood`),
					}),
				)}
			</p>
			<p>
				{parseGuideLinks(
					t("guide:guide.content.farmer.turnsUsage.foodProduction"),
				)}
			</p>
			<p>
				{parseGuideLinks(t("guide:guide.content.farmer.turnsUsage.selling"))}
			</p>
			<p>
				{parseGuideLinks(t("guide:guide.content.farmer.turnsUsage.profits"))}
			</p>
		</div>
	)
}
