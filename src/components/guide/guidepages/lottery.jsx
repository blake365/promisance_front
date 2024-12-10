import GuideLink from "../../utilities/guidelink"
import { useTranslation } from "react-i18next"
import { parseGuideLinks } from "../../utilities/parseGuideLinks"

export default function LotteryGuide() {
	const { t } = useTranslation(["guide"])

	return (
		<div>
			<h2>{t("guide:guide.content.lottery.title")}</h2>
			<p>{parseGuideLinks(t("guide:guide.content.lottery.description"))}</p>
		</div>
	)
}
