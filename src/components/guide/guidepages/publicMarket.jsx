import GuideLink from "../../utilities/guidelink"
import { useSelector } from "react-redux"
import { useTranslation } from "react-i18next"
import { parseGuideLinks } from "../../utilities/parseGuideLinks"

export default function PublicMarketGuide() {
	const { pubMktMaxTime, pubMktStart } = useSelector(
		(state) => state.games.activeGame,
	)
	const { t } = useTranslation(["guide"])

	return (
		<div>
			<h2>{t("guide:guide.content.publicMarket.buying.title")}</h2>
			<p>
				{parseGuideLinks(
					t("guide:guide.content.publicMarket.buying.description"),
				)}
			</p>
			<p>
				{parseGuideLinks(
					t("guide:guide.content.publicMarket.buying.bestPrices"),
				)}
			</p>
			<p>
				{parseGuideLinks(
					t("guide:guide.content.publicMarket.buying.priceChanges"),
				)}
			</p>
			<p>
				{parseGuideLinks(t("guide:guide.content.publicMarket.buying.ownGoods"))}
			</p>

			<h2>{t("guide:guide.content.publicMarket.selling.title")}</h2>
			<p>
				{parseGuideLinks(
					t("guide:guide.content.publicMarket.selling.description"),
				)}
			</p>
			<p>
				{parseGuideLinks(
					t("guide:guide.content.publicMarket.selling.listingDelay", {
						startHours: pubMktStart,
					}),
				)}
			</p>
			<p>
				{parseGuideLinks(
					t("guide:guide.content.publicMarket.selling.removal.manual"),
				)}
			</p>
			<p>
				{parseGuideLinks(
					t("guide:guide.content.publicMarket.selling.removal.automatic", {
						maxHours: pubMktMaxTime,
					}),
				)}
			</p>
			<p>
				{parseGuideLinks(
					t("guide:guide.content.publicMarket.selling.priceEditing"),
				)}
			</p>
			<p>
				{parseGuideLinks(
					t("guide:guide.content.publicMarket.selling.warWarning"),
				)}
			</p>
		</div>
	)
}
