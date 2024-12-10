import { eraArray } from "../../../config/eras"
import GuideLink from "../../utilities/guidelink"
import { useTranslation } from "react-i18next"
import { parseGuideLinks } from "../../utilities/parseGuideLinks"

export default function BuildingsGuide({ empire }) {
	const { t } = useTranslation(["guide", "eras"])
	const eraName = eraArray[empire.era].name.toLowerCase()

	return (
		<div>
			<h2>{t("guide:guide.content.buildings.title")}</h2>
			<p>{parseGuideLinks(t("guide:guide.content.buildings.description"))}</p>
			<dl>
				<dt>{t(`eras:eras.${eraName}.bldpop`)}</dt>
				<dd>
					{parseGuideLinks(
						t("guide:guide.content.buildings.types.housing.description", {
							buildingName: t(`eras:eras.${eraName}.bldpop`),
							peasantName: t(`eras:eras.${eraName}.peasants`),
						}),
					)}
				</dd>
				<dt>{t(`eras:eras.${eraName}.bldcash`)}</dt>
				<dd>
					{parseGuideLinks(
						t("guide:guide.content.buildings.types.economy.description", {
							buildingName: t(`eras:eras.${eraName}.bldcash`),
						}),
					)}
				</dd>
				<dt>{t(`eras:eras.${eraName}.bldtrp`)}</dt>
				<dd>
					{parseGuideLinks(
						t("guide:guide.content.buildings.types.military.description", {
							buildingName: t(`eras:eras.${eraName}.bldtrp`),
						}),
					)}
				</dd>
				<dt>{t(`eras:eras.${eraName}.bldcost`)}</dt>
				<dd>
					{parseGuideLinks(
						t("guide:guide.content.buildings.types.barracks.description", {
							buildingName: t(`eras:eras.${eraName}.bldcost`),
						}),
					)}
				</dd>
				<dt>{t(`eras:eras.${eraName}.bldwiz`)}</dt>
				<dd>
					{parseGuideLinks(
						t("guide:guide.content.buildings.types.magic.description", {
							buildingName: t(`eras:eras.${eraName}.bldwiz`),
							wizardType: t(`eras:eras.${eraName}.trpwiz`),
							runeType: t(`eras:eras.${eraName}.runes`),
						}),
					)}
				</dd>
				<dt>{t(`eras:eras.${eraName}.bldfood`)}</dt>
				<dd>
					{parseGuideLinks(
						t("guide:guide.content.buildings.types.food.description", {
							buildingName: t(`eras:eras.${eraName}.bldfood`),
							peasantName: t(`eras:eras.${eraName}.peasants`),
						}),
					)}
				</dd>
				<dt>{t(`eras:eras.${eraName}.blddef`)}</dt>
				<dd>
					{parseGuideLinks(
						t("guide:guide.content.buildings.types.defense.description", {
							buildingName: t(`eras:eras.${eraName}.blddef`),
						}),
					)}
				</dd>
			</dl>
		</div>
	)
}
