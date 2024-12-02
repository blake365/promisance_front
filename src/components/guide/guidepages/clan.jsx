import GuideLink from "../../utilities/guidelink"
import { useTranslation } from "react-i18next"
import { parseGuideLinks } from "../../utilities/parseGuideLinks"

export default function ClanGuide() {
	const { t } = useTranslation(["guide"])

	return (
		<div>
			<GuideLink text={t("guide:guide.content.common.return")} page="Index" />

			<h2>{t("guide:guide.content.clans.title")}</h2>
			<p>{parseGuideLinks(t("guide:guide.content.clans.description"))}</p>
			<p>{parseGuideLinks(t("guide:guide.content.clans.defense"))}</p>
			<p>{parseGuideLinks(t("guide:guide.content.clans.information"))}</p>
			<p>{parseGuideLinks(t("guide:guide.content.clans.war"))}</p>

			<h3>{t("guide:guide.content.clans.joining.title")}</h3>
			<p>{parseGuideLinks(t("guide:guide.content.clans.joining.creation"))}</p>
			<p>{parseGuideLinks(t("guide:guide.content.clans.joining.joining"))}</p>
		</div>
	)
}
