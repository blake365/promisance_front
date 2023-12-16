import { raceArray } from "../../../config/races"
import { eraArray } from "../../../config/eras"
import GuideLink from "../../utilities/guidelink"
import { TURNS_PROTECTION } from "../../../config/config"
import { Compass } from "@phosphor-icons/react"
import { Table, Text } from "@mantine/core"
import classes from '../guide.module.css'

export default function NewTipsGuide({ empire })
{
    const yourTraits = (empire) =>
    {
        let raceStrength = ''
        let preferredEra = 0

        const race = raceArray[empire.race]
        switch (race.name) {
            case 'Human':
                raceStrength = 'being a generalist. You can go any direction you want with your empire. Your people can succeed in any era.'
                preferredEra = empire.era
                break
            case 'Elf':
                raceStrength = 'magic. You should focus your buildings on Mage Towers, use turns in Meditate, and cast spells in the Magic Center. Your people are best suited for the Past era.'
                preferredEra = 0
                break
            case 'Dwarf':
                raceStrength = 'industry. You should focus your buildings on Blacksmiths and use turns in Industry. Your people are best suited for the Future era.'
                preferredEra = 2
                break
            case 'Orc':
                raceStrength = 'industry and military. You should focus your buildings on Blacksmiths and use turns in Industry. Your people are best suited for the Future era.'
                preferredEra = 2
                break
            case 'Gnome':
                raceStrength = 'economy and markets. You should focus your buildings on Huts and Markets,  use turns in Cash, buy things from the Black Market. Your people are best suited for the Future era.'
                preferredEra = 2
                break
            case 'Troll':
                raceStrength = 'military. You should focus your buildings on Blacksmiths, Huts and Markets, and use your attack bonus to win battles. Your people are best suited for the Future era.'
                preferredEra = 2
                break
            case 'Drow':
                raceStrength = 'magic and military. You should focus your buildings on Mage Towers, use turns in Meditate, and cast spells in the Magic Center. Your people are best suited for the Past era.'
                preferredEra = 0
                break
            case 'Gremlin':
                raceStrength = 'food production. You should focus your buildings on Farms, use turns in Farm, sell your food on the Public Market. Your people are best suited for the Present era.'
                preferredEra = 1
                break
            case 'Goblin':
                raceStrength = 'industry. You should focus your buildings on Blacksmiths and use your turns in Industry. Your people are best suited for the Future era.'
                preferredEra = 2
                break
            case 'Hobbit':
                raceStrength = 'food production. You should focus your buildings on Farms and use turns in Farm. Your people are best suited for the Present era.'
                preferredEra = 1
                break
            case 'Ghoul':
                raceStrength = 'food production and industry. You should focus your buildings on Blacksmiths and Farms, and use your turns in either Industry or Farm. Your people are best suited for the Present and Future era.'
                preferredEra = 1
                break
            case 'Vampire':
                raceStrength = 'economy and industry. You should focus your buildings on Huts, Markets, and Blacksmiths, and use your turns in either Cash or Industry. Your people are best suited for the Future era.'
                preferredEra = 2
                break
            case 'Minotaur':
                raceStrength = 'military and economy. You should focus your buildings on Huts and Markets, and use your attack and defense bonuses to win battles. Your people are best suited for the Future era.'
                preferredEra = 2
                break
            case 'Pixie':
                raceStrength = 'magic and economy. You should focus your buildings on Mage Towers, Huts, and Markets, use turns in Meditate or Cash, and cast spells in the Magic Center. Beware of your low attack and defense stats. Your people are best suited for the Past era.'
                preferredEra = 0
                break
        }

        let era = eraArray[preferredEra]

        let eraStats = <div className={classes.guideTable}>
            <Table mt='xs'>
                <thead>
                    <tr>
                        <th>Era</th>
                        <th>Economy</th>
                        <th>Food Production</th>
                        <th>Industry</th>
                        <th>Energy</th>
                        <th>Exploration</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{era.name}</td>
                        <td style={era.mod_cashpro >= 0 ? { color: 'green' } : { color: 'red' }}>{era.mod_cashpro}%</td>
                        <td style={era.mod_foodpro >= 0 ? { color: 'green' } : { color: 'red' }}>{era.mod_foodpro}%</td>
                        <td style={era.mod_industry >= 0 ? { color: 'green' } : { color: 'red' }}>{era.mod_industry}%</td>
                        <td style={era.mod_runepro >= 0 ? { color: 'green' } : { color: 'red' }}>{era.mod_runepro}%</td>
                        <td style={era.mod_explore >= 0 ? { color: 'green' } : { color: 'red' }}>{era.mod_explore}%</td>
                    </tr>
                </tbody>
            </Table>
        </div>

        let raceStats = <div className={classes.guideTable}>
            <Table mt='xs'>
                <thead>
                    <tr>
                        <th>Race</th>
                        <th>Offense</th>
                        <th>Defense</th>
                        <th>Building</th>
                        <th>Upkeep*</th>
                        <th>Magic</th>
                        <th>Industry</th>
                        <th>Economy</th>
                        <th>Exploration</th>
                        <th>Market*</th>
                        <th>Consumption*</th>
                        <th>Energy</th>
                        <th>Agriculture</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{race.name}</td>
                        <td style={race.mod_offense >= 0 ? { color: 'green' } : { color: 'red' }}>{race.mod_offense}%</td>
                        <td style={race.mod_defense >= 0 ? { color: 'green' } : { color: 'red' }}>{race.mod_defense}%</td>
                        <td style={race.mod_buildrate >= 0 ? { color: 'green' } : { color: 'red' }}>{race.mod_buildrate}%</td>
                        <td style={race.mod_expenses >= 0 ? { color: 'green' } : { color: 'red' }}>{race.mod_expenses}%</td>
                        <td style={race.mod_magic >= 0 ? { color: 'green' } : { color: 'red' }}>{race.mod_magic}%</td>
                        <td style={race.mod_industry >= 0 ? { color: 'green' } : { color: 'red' }}>{race.mod_industry}%</td>
                        <td style={race.mod_income >= 0 ? { color: 'green' } : { color: 'red' }}>{race.mod_income}%</td>
                        <td style={race.mod_explore >= 0 ? { color: 'green' } : { color: 'red' }}>{race.mod_explore}%</td>
                        <td style={race.mod_market >= 0 ? { color: 'green' } : { color: 'red' }}>{race.mod_market}%</td>
                        <td style={race.mod_foodcon >= 0 ? { color: 'green' } : { color: 'red' }}>{race.mod_foodcon}%</td>
                        <td style={race.mod_runepro >= 0 ? { color: 'green' } : { color: 'red' }}>{race.mod_runepro}%</td>
                        <td style={race.mod_foodpro >= 0 ? { color: 'green' } : { color: 'red' }}>{race.mod_foodpro}%</td>
                    </tr>
                </tbody>
            </Table>
        </div>

        return (
            <div>
                <Text>
                    As a <strong>{race.name}</strong> your people are strongest in {raceStrength}
                </Text>
                {raceStats}
                {eraStats}
            </div>
        )
    }

    return (
        <div>
            <GuideLink text='Return to Index' page='Index' />

            <h2>Personalized Tips</h2>
            {empire.turnsUsed <= TURNS_PROTECTION && (<p>
                You are the founder of a new empire in the world of Promisance. You are in the protection period until you have used {TURNS_PROTECTION} turns. This means that you cannot be attacked by other players. You can use this time to learn the game and build up your empire.
            </p>)}
            <p>
                If you are brand new to the game, the <strong>Tours</strong> <Compass color='#40c057' /> and <strong>Game Guide</strong> will be very useful for you, each page has a <strong>Guide</strong> link that will take you to the relevant section of the Game Guide. Tours are available on the Build and War Council pages.
            </p>
            <p>
                You're goal is to build up your empire and become the most powerful empire in the world. To do this you will need to build up your <strong>land</strong> and <strong>army</strong>, but there are many paths to victory. You can focus on building up your economy, your military, your magic, or your food production. You can also focus on a combination of these things.
            </p>
            <div>
                {yourTraits(empire)}
            </div>
        </div>
    )
}
