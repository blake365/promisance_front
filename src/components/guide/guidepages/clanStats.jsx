import GuideLink from "../../utilities/guidelink"
import { useTranslation } from "react-i18next"
import { parseGuideLinks } from "../../utilities/parseGuideLinks"

export default function ClanStatsGuide() {
	const { t } = useTranslation(["guide"])

	return (
		<div>
			<h2>{t("guide:guide.content.clanStats.title")}</h2>
			<p>{parseGuideLinks(t("guide:guide.content.clanStats.description"))}</p>
			<p>{parseGuideLinks(t("guide:guide.content.clanStats.interaction"))}</p>
		</div>
	)
}
