import GuideLink from "../../utilities/guidelink"
import { useTranslation } from "react-i18next"
import { parseGuideLinks } from "../../utilities/parseGuideLinks"

export default function CashGuide() {
	const { t } = useTranslation(["guide"])

	return (
		<div>
			<GuideLink text={t("guide:guide.content.common.return")} page="Index" />

			<h2>{t("guide:guide.content.cash.title")}</h2>
			<p>{parseGuideLinks(t("guide:guide.content.cash.description"))}</p>
			<p>{parseGuideLinks(t("guide:guide.content.cash.bonus"))}</p>
			<p>{parseGuideLinks(t("guide:guide.content.cash.taxRate"))}</p>
		</div>
	)
}
