import GuideLink from "../../utilities/guidelink"
import { useTranslation } from "react-i18next"
import { parseGuideLinks } from "../../utilities/parseGuideLinks"

export default function ExploreGuide() {
	const { t } = useTranslation(["guide"])

	return (
		<div>
			<h2>{t("guide:guide.content.explore.title")}</h2>
			<p>{parseGuideLinks(t("guide:guide.content.explore.description"))}</p>
			<p>{parseGuideLinks(t("guide:guide.content.explore.action"))}</p>
			<p>{parseGuideLinks(t("guide:guide.content.explore.warning"))}</p>
		</div>
	)
}
