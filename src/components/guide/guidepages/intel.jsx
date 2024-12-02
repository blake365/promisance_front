import { eraArray } from "../../../config/eras"
import GuideLink from "../../utilities/guidelink"
import { useTranslation } from "react-i18next"
import { parseGuideLinks } from "../../utilities/parseGuideLinks"

export default function IntelGuide({ empire }) {
	const { t } = useTranslation(["guide", "eras"])
	const eraName = eraArray[empire.era].name.toLowerCase()

	return (
		<div>
			<GuideLink text={t("guide:guide.content.common.return")} page="Index" />

			<h2>{t("guide:guide.content.intelCenter.title")}</h2>
			<p>{parseGuideLinks(t("guide:guide.content.intelCenter.description"))}</p>
			<p>
				{parseGuideLinks(
					t("guide:guide.content.intelCenter.spying.description", {
						wizardType: t(`eras:eras.${eraName}.trpwiz`),
						spellSpy: t(`eras:eras.${eraName}.spell_spy`),
					}),
				)}
			</p>
			<p>
				{parseGuideLinks(
					t("guide:guide.content.intelCenter.spying.magicRatio.intro"),
				)}
			</p>
			<p>
				{parseGuideLinks(
					t("guide:guide.content.intelCenter.spying.magicRatio.offense", {
						wizardType: t(`eras:eras.${eraName}.trpwiz`),
					}),
				)}
			</p>
			<p>
				{parseGuideLinks(
					t("guide:guide.content.intelCenter.spying.magicRatio.defense", {
						wizardType: t(`eras:eras.${eraName}.trpwiz`),
					}),
				)}
			</p>
			<p>
				{parseGuideLinks(
					t("guide:guide.content.intelCenter.spying.magicRatio.ratio"),
				)}
			</p>
			<dt>{t(`eras:eras.${eraName}.spell_spy`)}</dt>
			<dd>
				{parseGuideLinks(
					t("guide:guide.content.intelCenter.spying.spell.description"),
				)}
			</dd>
			<p>{parseGuideLinks(t("guide:guide.content.intelCenter.viewing"))}</p>
		</div>
	)
}
