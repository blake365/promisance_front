import GuideLink from "../../utilities/guidelink"
import { useTranslation } from "react-i18next"
import { parseGuideLinks } from "../../utilities/parseGuideLinks"

export default function AchievementsGuide() {
	const { t } = useTranslation(["guide"])

	return (
		<div>
			<h2>{t("guide:guide.content.achievements.title")}</h2>
			<p>
				{parseGuideLinks(t("guide:guide.content.achievements.description"))}
			</p>
		</div>
	)
}
