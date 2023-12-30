import { Title, Notification, Group, Box } from "@mantine/core";
import { processAchievement } from "../../functions/processAchievement"
import { eraArray } from "../../config/eras";
import { useSelector } from "react-redux";

function categoryName(name, era)
{
    if (name === 'income') {
        return 'Income'
    } else if (name === 'expenses') {
        return 'Expenses'
    } else if (name === 'indy') {
        return 'Industrial Production'
    } else if (name === 'magic') {
        return 'Magical Production'
    } else if (name === 'foodcon') {
        return 'Food Consumption'
    } else if (name === 'food') {
        return 'Food Production'
    } else if (name === 'exploreGains') {
        return 'Exploration'
    } else if (name === 'land') {
        return 'Total Land'
    } else if (name === 'networth') {
        return 'Net Worth'
    } else if (name === 'peasants') {
        return 'Population'
    } else if (name === 'trpArm') {
        return `${eraArray[era].trparm}`
    } else if (name === 'trpLnd') {
        return `${eraArray[era].trplnd}`
    } else if (name === 'trpFly') {
        return `${eraArray[era].trpfly}`
    } else if (name === 'trpSea') {
        return `${eraArray[era].trpsea}`
    } else if (name === 'trpWiz') {
        return `${eraArray[era].trpwiz}`
    } else if (name === 'attackGains') {
        return 'Attack Gains'
    } else if (name === 'turns') {
        return 'Turns Used'
    } else if (name === 'attacks') {
        return 'Successful Attacks'
    } else if (name === 'defends') {
        return 'Successful Defenses'
    } else if (name === 'rank') {
        return 'Rank'
    } else if (name === 'build') {
        return 'Buildings'
    } else if (name === 'joinClan') {
        return 'Clans'
    } else {
        return name
    }
}

function Achievements()
{

    const { empire } = useSelector((state) => state.empire)

    const era = empire.era
    const achievements = empire.achievements
    // console.log(achievements)
    let achievementArray = Object.keys(achievements).map((key) =>
    {
        // console.log(key, achievements[key].awarded)
        return { name: key, awarded: achievements[key].awarded, time: achievements[key].timeAwarded }
    })

    let categories = ['turns', 'exploreGains', 'income', 'expenses', 'food', 'foodcon', 'networth', 'peasants', 'land', 'indy', 'magic', 'trpArm', 'trpLnd', 'trpFly', 'trpSea', 'trpWiz', 'attackGains', 'attacks', 'defends', 'rank', 'build', 'joinClan']
    // console.log(achievementArray)
    // split array into arrays for each category

    let food = achievementArray.filter((achievement) =>
        achievement.name.includes('food') && !achievement.name.includes('foodcon')
    );


    return (
        <div>
            <Title order={1} align='center' mb='sm'>Achievements</Title>

            <Group position='center'>
                {categories.map((category) =>
                {
                    // console.log(category)
                    let categoryArray = []
                    if (category === 'food') {
                        categoryArray = food.sort((a, b) => a.name.localeCompare(b.name))
                    } else {
                        categoryArray = achievementArray.filter((achievement) => achievement.name.includes(category)).sort((a, b) => a.name.localeCompare(b.name))
                    }
                    // console.log(categoryArray)
                    let categoryAchievements = categoryArray.map((achievement) =>
                    {
                        // console.log(achievement)
                        if (achievement) {
                            const { message, icon } = processAchievement(achievement.name)

                            return (
                                <div key={achievement.name}>
                                    <Notification
                                        title={message}
                                        color={achievement.awarded ? 'blue' : 'gray'}
                                        icon={icon}
                                        withCloseButton={false}
                                        disallowClose
                                        shadow={0}
                                        radius={0}
                                    >
                                        {achievement.awarded ? 'Awarded on ' + new Date(achievement.time).toLocaleDateString() : '...'}
                                    </Notification>
                                </div>
                            )
                        }

                    })
                    return (
                        <Box h={375} w={400}>
                            <Title order={3} align='center' mb='sm'>{categoryName(category, era)}</Title>
                            {categoryAchievements}
                        </Box>
                    )
                })}
            </Group>
        </div>
    );
}

export default Achievements;
