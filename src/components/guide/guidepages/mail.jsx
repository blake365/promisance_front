import GuideLink from "../../utilities/guidelink"
import { useTranslation } from "react-i18next"
import { parseGuideLinks } from "../../utilities/parseGuideLinks"

export default function MailGuide() {
	const { t } = useTranslation(["guide"])

	return (
		<div>
			<h2>{t("guide:guide.content.mail.title")}</h2>
			<p>{parseGuideLinks(t("guide:guide.content.mail.description"))}</p>
			<p>{parseGuideLinks(t("guide:guide.content.mail.rules"))}</p>
		</div>
	)
}
