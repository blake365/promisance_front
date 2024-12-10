import { raceArray } from "../../../config/races"
import { eraArray } from "../../../config/eras"
import GuideLink from "../../utilities/guidelink"
import { Compass } from "@phosphor-icons/react"
import { Table, Text } from "@mantine/core"
import { useTranslation } from "react-i18next"
import { parseGuideLinks } from "../../utilities/parseGuideLinks"
import classes from "../guide.module.css"
import { useSelector } from "react-redux"

export default function NewTipsGuide({ empire }) {
	const { turnsProtection } = useSelector((state) => state.games.activeGame)
	const { t } = useTranslation(["guide", "eras"])
	const eraName = eraArray[empire.era].name.toLowerCase()

	const renderRaceStats = (race) => {
		const stats = [
			{ key: "offense", mod: race.mod_offense },
			{ key: "defense", mod: race.mod_defense },
			{ key: "building", mod: race.mod_buildrate },
			{ key: "upkeep", mod: race.mod_expenses },
			{ key: "magic", mod: race.mod_magic },
			{ key: "industry", mod: race.mod_industry },
			{ key: "economy", mod: race.mod_income },
			{ key: "exploration", mod: race.mod_explore },
			{ key: "market", mod: race.mod_market },
			{ key: "consumption", mod: race.mod_foodcon },
			{ key: "energy", mod: race.mod_runepro },
			{ key: "agriculture", mod: race.mod_foodpro },
		]

		return (
			<div className={classes.guideTable}>
				<Table mt="xs">
					<thead>
						<tr>
							<th>{t("guide:guide.pages.race")}</th>
							{stats.map((stat) => (
								<th key={stat.key}>
									{t(`guide:guide.content.race.attributes.${stat.key}.name`)}
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>{race.name}</td>
							{stats.map((stat) => (
								<td
									key={stat.key}
									style={stat.mod >= 0 ? { color: "green" } : { color: "red" }}
								>
									{stat.mod}%
								</td>
							))}
						</tr>
					</tbody>
				</Table>
			</div>
		)
	}

	const renderEraStats = (era) => {
		const stats = [
			{ key: "economy", mod: era.mod_cashpro },
			{ key: "foodProduction", mod: era.mod_foodpro },
			{ key: "industry", mod: era.mod_industry },
			{ key: "energy", mod: era.mod_runepro },
			{ key: "exploration", mod: era.mod_explore },
		]

		return (
			<div className={classes.guideTable}>
				<Table mt="xs">
					<thead>
						<tr>
							<th>{t("guide:guide.pages.era")}</th>
							{stats.map((stat) => (
								<th key={stat.key}>
									{t(`guide:guide.content.era.attributes.${stat.key}.name`)}
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>{era.name}</td>
							{stats.map((stat) => (
								<td
									key={stat.key}
									style={stat.mod >= 0 ? { color: "green" } : { color: "red" }}
								>
									{stat.mod}%
								</td>
							))}
						</tr>
					</tbody>
				</Table>
			</div>
		)
	}

	const renderRaceDescription = (race) => {
		const raceName = race.name.toLowerCase()
		return (
			<Text>
				{parseGuideLinks(
					t("guide:guide.content.newPlayer.raceTraits.intro", {
						raceName: race.name,
						strength: t(`guide:guide.content.newPlayer.raceTraits.${raceName}`),
					}),
				)}
			</Text>
		)
	}

	return (
		<div>
			<h2>{t("guide:guide.content.newPlayer.title")}</h2>

			{empire.turnsUsed <= turnsProtection && (
				<p>
					{parseGuideLinks(
						t("guide:guide.content.newPlayer.protection", {
							turnsProtection,
						}),
					)}
				</p>
			)}

			<p>
				{parseGuideLinks(t("guide:guide.content.newPlayer.newPlayerGuide"))}
			</p>

			<p>{parseGuideLinks(t("guide:guide.content.newPlayer.goal"))}</p>

			<p>
				{parseGuideLinks(
					t("guide:guide.content.newPlayer.magicTip", {
						wizardBuilding: t(`eras:eras.${eraName}.bldwiz`),
					}),
				)}
			</p>

			<div>
				{renderRaceDescription(raceArray[empire.race])}
				{renderRaceStats(raceArray[empire.race])}
				{renderEraStats(eraArray[empire.era])}
			</div>
		</div>
	)
}
