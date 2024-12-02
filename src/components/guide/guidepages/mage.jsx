import { eraArray } from "../../../config/eras"
import GuideLink from "../../utilities/guidelink"
import { useSelector } from "react-redux"
import { useTranslation } from "react-i18next"
import { parseGuideLinks } from "../../utilities/parseGuideLinks"

export default function MageGuide({ empire }) {
	const { turnsMax } = useSelector((state) => state.games.activeGame)
	const { t } = useTranslation(["guide", "eras"])
	const eraName = eraArray[empire.era].name.toLowerCase()

	return (
		<div>
			<GuideLink text={t("guide:guide.content.common.return")} page="Index" />

			<h2>{t("guide:guide.content.mage.title")}</h2>
			<p>{parseGuideLinks(t("guide:guide.content.mage.description"))}</p>

			<h3>{t("guide:guide.content.mage.setup.title")}</h3>
			<p>
				{parseGuideLinks(
					t("guide:guide.content.mage.setup.raceRecommendation", {
						pastEra: eraArray[0].name,
						runeType: t(`eras:eras.${eraName}.runes`),
						runeBonus: eraArray[0].mod_runepro,
					}),
				)}
			</p>
			<p>
				{parseGuideLinks(
					t("guide:guide.content.mage.setup.buildings", {
						wizardBuilding: t(`eras:eras.${eraName}.bldwiz`),
						runeType: t(`eras:eras.${eraName}.runes`),
						wizardType: t(`eras:eras.${eraName}.trpwiz`),
						farmType: t(`eras:eras.${eraName}.bldfood`),
					}),
				)}
			</p>

			<h3>{t("guide:guide.content.mage.turnsUsage.title")}</h3>
			<p>
				{parseGuideLinks(
					t("guide:guide.content.mage.turnsUsage.initialPhase", {
						maxTurns: turnsMax,
						runeType: t(`eras:eras.${eraName}.runes`),
						wizardBuilding: t(`eras:eras.${eraName}.bldwiz`),
					}),
				)}
			</p>
			<p>
				{parseGuideLinks(
					t("guide:guide.content.mage.turnsUsage.spellCasting", {
						wizardType: t(`eras:eras.${eraName}.trpwiz`),
						runeType: t(`eras:eras.${eraName}.runes`),
						cashSpell: t(`eras:eras.${eraName}.spell_cash`),
						foodSpell: t(`eras:eras.${eraName}.spell_food`),
					}),
				)}
			</p>
			<p>
				{parseGuideLinks(t("guide:guide.content.mage.turnsUsage.spending"))}
			</p>
		</div>
	)
}
