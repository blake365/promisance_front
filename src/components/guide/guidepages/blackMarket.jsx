import { eraArray } from "../../../config/eras"
import GuideLink from "../../utilities/guidelink"
import { useSelector } from "react-redux"
import { useTranslation } from "react-i18next"
import { parseGuideLinks } from "../../utilities/parseGuideLinks"

export default function BlackMarketGuide({ empire }) {
	const { pvtmMaxSell } = useSelector((state) => state.games.activeGame)
	const { t } = useTranslation(["guide", "eras"])
	const eraName = eraArray[empire.era].name.toLowerCase()

	return (
		<div>
			<GuideLink text={t("guide:guide.content.common.return")} page="Index" />

			<h2>{t("guide:guide.content.blackMarket.buying.title")}</h2>
			<p>
				{parseGuideLinks(
					t("guide:guide.content.blackMarket.buying.description", {
						militaryBuilding: t(`eras:eras.${eraName}.bldtrp`),
						farmBuilding: t(`eras:eras.${eraName}.bldfood`),
					}),
				)}
			</p>
			<p>
				{parseGuideLinks(
					t("guide:guide.content.blackMarket.buying.replenishment", {
						barracksBuilding: t(`eras:eras.${eraName}.bldcost`),
						farmBuilding: t(`eras:eras.${eraName}.bldfood`),
					}),
				)}
			</p>
			<p>
				{parseGuideLinks(
					t("guide:guide.content.blackMarket.buying.pricing", {
						economyBuilding: t(`eras:eras.${eraName}.bldcash`),
						barracksBuilding: t(`eras:eras.${eraName}.bldcost`),
					}),
				)}
			</p>

			<h2>{t("guide:guide.content.blackMarket.selling.title")}</h2>
			<p>
				{parseGuideLinks(
					t("guide:guide.content.blackMarket.selling.description"),
				)}
			</p>
			<p>
				{parseGuideLinks(
					t("guide:guide.content.blackMarket.selling.pricing", {
						economyBuilding: t(`eras:eras.${eraName}.bldcash`),
						barracksBuilding: t(`eras:eras.${eraName}.bldcost`),
					}),
				)}
			</p>
			<p>
				{parseGuideLinks(
					t("guide:guide.content.blackMarket.selling.limit", {
						maxSellPercent: pvtmMaxSell / 100,
					}),
				)}
			</p>
		</div>
	)
}
