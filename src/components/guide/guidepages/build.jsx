import GuideLink from "../../utilities/guidelink"
import { useTranslation } from "react-i18next"
import { parseGuideLinks } from "../../utilities/parseGuideLinks"

export default function BuildGuide() {
	const { t } = useTranslation(["guide"])

	return (
		<div>
			<h2>{t("guide:guide.content.build.title")}</h2>
			<p>{parseGuideLinks(t("guide:guide.content.build.description"))}</p>
			<p>{parseGuideLinks(t("guide:guide.content.build.speed"))}</p>
			<p>{parseGuideLinks(t("guide:guide.content.build.landReduction"))}</p>
		</div>
	)
}
