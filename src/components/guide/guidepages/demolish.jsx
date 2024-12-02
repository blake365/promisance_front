import GuideLink from "../../utilities/guidelink"
import { useTranslation } from "react-i18next"
import { parseGuideLinks } from "../../utilities/parseGuideLinks"

export default function DemolishGuide() {
	const { t } = useTranslation(["guide"])

	return (
		<div>
			<GuideLink text={t("guide:guide.content.common.return")} page="Index" />

			<h2>{t("guide:guide.content.demolish.title")}</h2>
			<p>{parseGuideLinks(t("guide:guide.content.demolish.description"))}</p>
			<p>{parseGuideLinks(t("guide:guide.content.demolish.speed"))}</p>
			<p>{parseGuideLinks(t("guide:guide.content.demolish.landReduction"))}</p>
		</div>
	)
}
