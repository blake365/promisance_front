import { eraArray } from "../../../config/eras"
import GuideLink from "../../utilities/guidelink"
import { useSelector } from "react-redux"
import { useTranslation } from "react-i18next"
import { parseGuideLinks } from "../../utilities/parseGuideLinks"

export default function MagicCenterGuide({ empire }) {
	const { allowMagicRegress } = useSelector((state) => state.games.activeGame)
	const { t } = useTranslation(["guide", "eras"])
	const eraName = eraArray[empire.era].name.toLowerCase()

	return (
		<div>
			<h2>{t("guide:guide.content.magicCenter.title")}</h2>
			<p>
				{parseGuideLinks(
					t("guide:guide.content.magicCenter.description", {
						wizardType: t(`eras:eras.${eraName}.trpwiz`),
						runeType: t(`eras:eras.${eraName}.runes`),
					}),
				)}
			</p>
			<p>
				{parseGuideLinks(t("guide:guide.content.magicCenter.healthWarning"))}
			</p>
			<p>
				{parseGuideLinks(
					t("guide:guide.content.magicCenter.powerWarning", {
						wizardType: t(`eras:eras.${eraName}.trpwiz`),
					}),
				)}
			</p>

			<h3>{t("guide:guide.content.magicCenter.spells.title")}</h3>
			<dl>
				<dt>{t(`eras:eras.${eraName}.spell_shield`)}</dt>
				<dd>
					{parseGuideLinks(
						t("guide:guide.content.magicCenter.spells.shield.description"),
					)}
				</dd>

				<dt>{t(`eras:eras.${eraName}.spell_food`)}</dt>
				<dd>
					{parseGuideLinks(
						t("guide:guide.content.magicCenter.spells.food.description", {
							foodType: t(`eras:eras.${eraName}.food`),
							wizardType: t(`eras:eras.${eraName}.trpwiz`),
						}),
					)}
				</dd>

				<dt>{t(`eras:eras.${eraName}.spell_cash`)}</dt>
				<dd>
					{parseGuideLinks(
						t("guide:guide.content.magicCenter.spells.cash.description", {
							wizardType: t(`eras:eras.${eraName}.trpwiz`),
						}),
					)}
				</dd>

				<dt>{t(`eras:eras.${eraName}.spell_gate`)}</dt>
				<dd>
					{parseGuideLinks(
						t("guide:guide.content.magicCenter.spells.gate.description"),
					)}
				</dd>

				<dt>{t(`eras:eras.${eraName}.spell_ungate`)}</dt>
				<dd>
					{parseGuideLinks(
						t("guide:guide.content.magicCenter.spells.ungate.description"),
					)}
				</dd>

				<dt>{t(`eras:eras.${eraName}.spell_advance`)}</dt>
				<dd>
					{parseGuideLinks(
						t("guide:guide.content.magicCenter.spells.advance.description"),
					)}
				</dd>

				{allowMagicRegress && (
					<>
						<dt>{t(`eras:eras.${eraName}.spell_regress`)}</dt>
						<dd>
							{parseGuideLinks(
								t("guide:guide.content.magicCenter.spells.regress.description"),
							)}
						</dd>
					</>
				)}
			</dl>
		</div>
	)
}
