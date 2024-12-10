import GuideLink from "../../utilities/guidelink"
import { useTranslation } from "react-i18next"
import { parseGuideLinks } from "../../utilities/parseGuideLinks"

export default function FavoritesGuide() {
	const { t } = useTranslation(["guide"])

	return (
		<div>
			<h2>{t("guide:guide.content.favorites.title")}</h2>
			<p>{parseGuideLinks(t("guide:guide.content.favorites.description"))}</p>
		</div>
	)
}
