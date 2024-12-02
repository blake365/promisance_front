import { Table } from "@mantine/core"
import { eraArray } from "../../../config/eras"
import GuideLink from "../../utilities/guidelink"
import { useTranslation } from "react-i18next"
import { parseGuideLinks } from "../../utilities/parseGuideLinks"
import classes from "../guide.module.css"

export default function EraGuide({ empire }) {
	const { t } = useTranslation(["guide", "eras"])
	const eraName = eraArray[empire.era].name.toLowerCase()

	return (
		<div>
			<GuideLink text={t("guide:guide.content.common.return")} page="Index" />

			<h2>{t("guide:guide.content.era.title")}</h2>
			<p>{parseGuideLinks(t("guide:guide.content.era.description"))}</p>
			<p>{parseGuideLinks(t("guide:guide.content.era.militaryNote"))}</p>

			<dl>
				<dt>{t("guide:guide.content.era.attributes.economy.name")}</dt>
				<dd>
					{parseGuideLinks(
						t("guide:guide.content.era.attributes.economy.description"),
					)}
				</dd>

				<dt>{t("guide:guide.content.era.attributes.foodProduction.name")}</dt>
				<dd>
					{parseGuideLinks(
						t("guide:guide.content.era.attributes.foodProduction.description", {
							farmType: t(`eras:eras.${eraName}.bldfood`),
						}),
					)}
				</dd>

				<dt>{t("guide:guide.content.era.attributes.industry.name")}</dt>
				<dd>
					{parseGuideLinks(
						t("guide:guide.content.era.attributes.industry.description"),
					)}
				</dd>

				<dt>{t("guide:guide.content.era.attributes.energy.name")}</dt>
				<dd>
					{parseGuideLinks(
						t("guide:guide.content.era.attributes.energy.description", {
							wizardType: t(`eras:eras.${eraName}.trpwiz`),
							runeType: t(`eras:eras.${eraName}.runes`),
						}),
					)}
				</dd>

				<dt>{t("guide:guide.content.era.attributes.exploration.name")}</dt>
				<dd>
					{parseGuideLinks(
						t("guide:guide.content.era.attributes.exploration.description"),
					)}
				</dd>
			</dl>

			<div className={classes.guideTable}>
				<Table highlightOnHover striped>
					<thead>
						<tr>
							<th>{t("guide:guide.pages.era")}</th>
							<th>{t("guide:guide.content.era.attributes.economy.name")}</th>
							<th>
								{t("guide:guide.content.era.attributes.foodProduction.name")}
							</th>
							<th>{t("guide:guide.content.era.attributes.industry.name")}</th>
							<th>{t("guide:guide.content.era.attributes.energy.name")}</th>
							<th>
								{t("guide:guide.content.era.attributes.exploration.name")}
							</th>
						</tr>
					</thead>
					<tbody>
						{eraArray.map((era) => {
							return (
								<tr key={era.name}>
									<td>{era.name}</td>
									<td
										style={
											era.mod_cashpro >= 0
												? { color: "green" }
												: { color: "red" }
										}
									>
										{era.mod_cashpro}%
									</td>
									<td
										style={
											era.mod_foodpro >= 0
												? { color: "green" }
												: { color: "red" }
										}
									>
										{era.mod_foodpro}%
									</td>
									<td
										style={
											era.mod_industry >= 0
												? { color: "green" }
												: { color: "red" }
										}
									>
										{era.mod_industry}%
									</td>
									<td
										style={
											era.mod_runepro >= 0
												? { color: "green" }
												: { color: "red" }
										}
									>
										{era.mod_runepro}%
									</td>
									<td
										style={
											era.mod_explore >= 0
												? { color: "green" }
												: { color: "red" }
										}
									>
										{era.mod_explore}%
									</td>
								</tr>
							)
						})}
					</tbody>
				</Table>
			</div>
		</div>
	)
}
