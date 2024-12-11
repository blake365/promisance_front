import { memo, useMemo } from "react"
import { Title, Notification, Group, Box } from "@mantine/core"
import { processAchievement } from "../../functions/processAchievement"
import { eraArray } from "../../config/eras"
import { useSelector } from "react-redux"

function categoryName(name, era) {
	if (name === "income") return "Income"
	if (name === "expenses") return "Expenses"
	if (name === "indy") return "Industrial Production"
	if (name === "magic") return "Magical Production"
	if (name === "foodcon") return "Food Consumption"
	if (name === "food") return "Food Production"
	if (name === "exploreGains") return "Exploration"
	if (name === "land") return "Total Land"
	if (name === "networth") return "Net Worth"
	if (name === "peasants") return "Population"
	if (name === "trpArm") return `${eraArray[era].trparm}`
	if (name === "trpLnd") return `${eraArray[era].trplnd}`
	if (name === "trpFly") return `${eraArray[era].trpfly}`
	if (name === "trpSea") return `${eraArray[era].trpsea}`
	if (name === "trpWiz") return `${eraArray[era].trpwiz}`
	if (name === "attackGains") return "Attack Gains"
	if (name === "turns") return "Turns Used"
	if (name === "attacks") return "Successful Attacks"
	if (name === "defends") return "Successful Defenses"
	if (name === "rank") return "Rank"
	if (name === "build") return "Buildings"
	if (name === "joinClan") return "Clans"
}

const AchievementNotification = memo(({ achievement }) => {
	const { message, icon } = processAchievement(achievement.name)
	return (
		<Notification
			title={message}
			color={achievement.awarded ? "blue" : "gray"}
			icon={icon}
			disallowClose
			shadow={0}
			radius={0}
			h={87}
		>
			{achievement.awarded
				? "Awarded on " + new Date(achievement.time).toLocaleDateString()
				: ""}
		</Notification>
	)
})

function Achievements() {
	const { empire } = useSelector((state) => state.empire)

	const achievementsByCategory = useMemo(() => {
		const achievements = empire.achievements
		const achievementArray = Object.keys(achievements).map((key) => {
			if (key === "indy" || key === "magic") {
				return
			}
			return {
				name: key,
				awarded: achievements[key].awarded,
				time: achievements[key].timeAwarded,
			}
		})

		const categories = [
			"turns",
			"exploreGains",
			"income",
			"expenses",
			"food",
			"foodcon",
			"networth",
			"peasants",
			"land",
			"indy",
			"magic",
			"trpArm",
			"trpLnd",
			"trpFly",
			"trpSea",
			"trpWiz",
			"attackGains",
			"attacks",
			"defends",
			"rank",
			"build",
			"joinClan",
		]

		const food = achievementArray.filter(
			(achievement) =>
				achievement.name.includes("food") &&
				!achievement.name.includes("foodcon"),
		)

		return categories.map((category) => ({
			category,
			achievements:
				category === "food"
					? food
					: achievementArray
							.filter((achievement) => achievement.name.includes(category))
							.sort((a, b) => a.name.localeCompare(b.name)),
		}))
	}, [empire.achievements, empire.era])

	return (
		<div>
			<Title order={1} align="center" mb="sm">
				Achievements
			</Title>

			<Group
				position="center"
				sx={{ display: "flex", alignItems: "flex-start" }}
			>
				{achievementsByCategory.map(({ category, achievements }) => (
					<Box w={400} key={category} mt="sm">
						<Title order={3} align="center" mb="sm">
							{categoryName(category, empire.era)}
						</Title>
						{achievements.map(
							(achievement) =>
								achievement && (
									<AchievementNotification
										key={achievement.name}
										achievement={achievement}
									/>
								),
						)}
					</Box>
				))}
			</Group>
		</div>
	)
}

export default memo(Achievements)
