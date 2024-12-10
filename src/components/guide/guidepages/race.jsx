import { Table } from "@mantine/core"
import { eraArray } from "../../../config/eras"
import { raceArray } from "../../../config/races"
import GuideLink from "../../utilities/guidelink"
import { useTranslation } from "react-i18next"
import { parseGuideLinks } from "../../utilities/parseGuideLinks"
import classes from "../guide.module.css"

export default function RaceGuide({ empire }) {
	const { t } = useTranslation(["guide", "eras"])

	return (
		<div>
			<h2>{t("guide:guide.content.race.title")}</h2>
			<p>{parseGuideLinks(t("guide:guide.content.race.description"))}</p>
			<dl>
				<dt>{t("guide:guide.content.race.attributes.offense.name")}</dt>
				<dd>
					{parseGuideLinks(
						t("guide:guide.content.race.attributes.offense.description"),
					)}
				</dd>
				<dt>{t("guide:guide.content.race.attributes.defense.name")}</dt>
				<dd>
					{parseGuideLinks(
						t("guide:guide.content.race.attributes.defense.description"),
					)}
				</dd>
				<dt>{t("guide:guide.content.race.attributes.building.name")}</dt>
				<dd>
					{parseGuideLinks(
						t("guide:guide.content.race.attributes.building.description"),
					)}
				</dd>
				<dt>{t("guide:guide.content.race.attributes.upkeep.name")}</dt>
				<dd>
					{parseGuideLinks(
						t("guide:guide.content.race.attributes.upkeep.description"),
					)}
				</dd>
				<dt>{t("guide:guide.content.race.attributes.magic.name")}</dt>
				<dd>
					{parseGuideLinks(
						t("guide:guide.content.race.attributes.magic.description"),
					)}
				</dd>
				<dt>{t("guide:guide.content.race.attributes.industry.name")}</dt>
				<dd>
					{parseGuideLinks(
						t("guide:guide.content.race.attributes.industry.description"),
					)}
				</dd>
				<dt>{t("guide:guide.content.race.attributes.economy.name")}</dt>
				<dd>
					{parseGuideLinks(
						t("guide:guide.content.race.attributes.economy.description"),
					)}
				</dd>
				<dt>{t("guide:guide.content.race.attributes.exploration.name")}</dt>
				<dd>
					{parseGuideLinks(
						t("guide:guide.content.race.attributes.exploration.description"),
					)}
				</dd>
				<dt>{t("guide:guide.content.race.attributes.market.name")}</dt>
				<dd>
					{parseGuideLinks(
						t("guide:guide.content.race.attributes.market.description"),
					)}
				</dd>
				<dt>{t("guide:guide.content.race.attributes.consumption.name")}</dt>
				<dd>
					{parseGuideLinks(
						t("guide:guide.content.race.attributes.consumption.description", {
							foodType: t(
								`eras:eras.${eraArray[empire.era].name.toLowerCase()}.food`,
							),
						}),
					)}
				</dd>
				<dt>{t("guide:guide.content.race.attributes.energy.name")}</dt>
				<dd>
					{parseGuideLinks(
						t("guide:guide.content.race.attributes.energy.description", {
							wizardType: t(
								`eras:eras.${eraArray[empire.era].name.toLowerCase()}.trpwiz`,
							),
							runeType: t(
								`eras:eras.${eraArray[empire.era].name.toLowerCase()}.runes`,
							),
						}),
					)}
				</dd>
				<dt>{t("guide:guide.content.race.attributes.agriculture.name")}</dt>
				<dd>
					{parseGuideLinks(
						t("guide:guide.content.race.attributes.agriculture.description", {
							farmType: t(
								`eras:eras.${eraArray[empire.era].name.toLowerCase()}.bldfood`,
							),
							foodType: t(
								`eras:eras.${eraArray[empire.era].name.toLowerCase()}.food`,
							),
						}),
					)}
				</dd>
			</dl>
			<i>{t("guide:guide.content.race.scroll")}</i>
			<div className={classes.guideTable}>
				<Table highlightOnHover striped>
					<thead>
						<tr>
							<th>{t("guide:guide.content.race.attributes.name")}</th>
							<th>{t("guide:guide.content.race.attributes.offense.name")}</th>
							<th>{t("guide:guide.content.race.attributes.defense.name")}</th>
							<th>{t("guide:guide.content.race.attributes.building.name")}</th>
							<th>{t("guide:guide.content.race.attributes.upkeep.name")}</th>
							<th>{t("guide:guide.content.race.attributes.magic.name")}</th>
							<th>{t("guide:guide.content.race.attributes.industry.name")}</th>
							<th>{t("guide:guide.content.race.attributes.economy.name")}</th>
							<th>
								{t("guide:guide.content.race.attributes.exploration.name")}
							</th>
							<th>{t("guide:guide.content.race.attributes.market.name")}</th>
							<th>
								{t("guide:guide.content.race.attributes.consumption.name")}
							</th>
							<th>{t("guide:guide.content.race.attributes.energy.name")}</th>
							<th>
								{t("guide:guide.content.race.attributes.agriculture.name")}
							</th>
						</tr>
					</thead>
					<tbody>
						{raceArray.map((race) => {
							return (
								<tr key={race.name}>
									<td>{race.name}</td>
									<td
										style={
											race.mod_offense >= 0
												? { color: "green" }
												: { color: "red" }
										}
									>
										{race.mod_offense}%
									</td>
									<td
										style={
											race.mod_defense >= 0
												? { color: "green" }
												: { color: "red" }
										}
									>
										{race.mod_defense}%
									</td>
									<td
										style={
											race.mod_buildrate >= 0
												? { color: "green" }
												: { color: "red" }
										}
									>
										{race.mod_buildrate}%
									</td>
									<td
										style={
											race.mod_expenses >= 0
												? { color: "green" }
												: { color: "red" }
										}
									>
										{race.mod_expenses}%
									</td>
									<td
										style={
											race.mod_magic >= 0
												? { color: "green" }
												: { color: "red" }
										}
									>
										{race.mod_magic}%
									</td>
									<td
										style={
											race.mod_industry >= 0
												? { color: "green" }
												: { color: "red" }
										}
									>
										{race.mod_industry}%
									</td>
									<td
										style={
											race.mod_income >= 0
												? { color: "green" }
												: { color: "red" }
										}
									>
										{race.mod_income}%
									</td>
									<td
										style={
											race.mod_explore >= 0
												? { color: "green" }
												: { color: "red" }
										}
									>
										{race.mod_explore}%
									</td>
									<td
										style={
											race.mod_market >= 0
												? { color: "green" }
												: { color: "red" }
										}
									>
										{race.mod_market}%
									</td>
									<td
										style={
											race.mod_foodcon >= 0
												? { color: "green" }
												: { color: "red" }
										}
									>
										{race.mod_foodcon}%
									</td>
									<td
										style={
											race.mod_runepro >= 0
												? { color: "green" }
												: { color: "red" }
										}
									>
										{race.mod_runepro}%
									</td>
									<td
										style={
											race.mod_foodpro >= 0
												? { color: "green" }
												: { color: "red" }
										}
									>
										{race.mod_foodpro}%
									</td>
								</tr>
							)
						})}
					</tbody>
				</Table>
			</div>
			<p>{parseGuideLinks(t("guide:guide.content.race.note"))}</p>
		</div>
	)
}
