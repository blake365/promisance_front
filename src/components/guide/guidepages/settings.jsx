import GuideLink from "../../utilities/guidelink"
import { useTranslation } from "react-i18next"
import { parseGuideLinks } from "../../utilities/parseGuideLinks"

export default function SettingsGuide() {
	const { t } = useTranslation(["guide"])

	return (
		<div>
			<h2>{t("guide:guide.content.empireSettings.title")}</h2>
			<p>{parseGuideLinks(t("guide:guide.content.empireSettings.profile"))}</p>
			<p>{parseGuideLinks(t("guide:guide.content.empireSettings.race"))}</p>
		</div>
	)
}
