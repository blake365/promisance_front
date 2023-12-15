import { raceArray } from "../../../config/races"
import GuideLink from "../../utilities/guidelink"
import { TURNS_PROTECTION } from "../../../config/config"

export default function NewTipsGuide({ empire })
{
    let raceStrength = ''

    switch (raceArray[empire.race].name) {
        case 'Human':
            raceStrength = 'being a generalist. You can go any direction you want with your empire. Your people can succeed in any era.'
            break
        case 'Elf':
            raceStrength = 'magic. You should focus your buildings on Mage Towers, use turns in Meditate, and cast spells in the Magic Center. Your people are best suited for the Past era.'
            break
        case 'Dwarf':
            raceStrength = 'industry. You should focus your buildings on Blacksmiths and use turns in Industry. Your people are best suited for the Future era.'
            break
        case 'Orc':
            raceStrength = 'industry and military. You should focus your buildings on Blacksmiths and use turns in Industry. Your people are best suited for the Future era.'
            break
        case 'Gnome':
            raceStrength = 'economy and markets. You should focus your buildings on Huts and Markets,  use turns in Cash, buy things from the Black Market. Your people are best suited for the Future era.'
            break
        case 'Troll':
            raceStrength = 'military. You should focus your buildings on Blacksmiths, Huts and Markets, and use your attack bonus to win battles. Your people are best suited for the Future era.'
            break
        case 'Drow':
            raceStrength = 'magic and military. You should focus your buildings on Mage Towers, use turns in Meditate, and cast spells in the Magic Center. Your people are best suited for the Past era.'
            break
        case 'Gremlin':
            raceStrength = 'food production. You should focus your buildings on Farms, use turns in Farm, sell your food on the Public Market. Your people are best suited for the Present era.'
            break
        case 'Goblin':
            raceStrength = 'industry. You should focus your buildings on Blacksmiths and use your turns in Industry. Your people are best suited for the Future era.'
            break
        case 'Hobbit':
            raceStrength = 'food production. You should focus your buildings on Farms and use turns in Farm. Your people are best suited for the Present era.'
            break
        case 'Ghoul':
            raceStrength = 'food production and industry. You should focus your buildings on Blacksmiths and Farms, and use your turns in either Industry or Farm. Your people are best suited for the Present and Future era.'
            break
        case 'Vampire':
            raceStrength = 'economy and industry. You should focus your buildings on Huts, Markets, and Blacksmiths, and use your turns in either Cash or Industry. Your people are best suited for the Future era.'
            break
        case 'Minotaur':
            raceStrength = 'military and economy. You should focus your buildings on Huts and Markets, and use your attack and defense bonuses to win battles. Your people are best suited for the Future era.'
            break
        case 'Pixie':
            raceStrength = 'magic and economy. You should focus your buildings on Mage Towers, Huts, and Markets, use turns in Meditate or Cash, and cast spells in the Magic Center. Beware of your low attack and defense stats. Your people are best suited for the Past era.'
            break
    }

    return (
        <div>
            <GuideLink text='Return to Index' page='Index' />

            <h2>Personalized Tips</h2>
            <p>
                You are the founder of a new empire in the world of Promisance. You are in the protection period until you have used {TURNS_PROTECTION} turns. This means that you cannot be attacked by other players. You can use this time to learn the game and build up your empire.
            </p>
            <p>If you are brand new to the game, the <strong>Tour</strong> and <strong>Game Guide</strong> will be very useful for you, each page has a <strong>Guide</strong> link that will take you to the relevant section of the Game Guide.
            </p>
            <p>
                You're goal is to build up your empire and become the most powerful empire in the world. To do this you will need to build up your <strong>land</strong> and <strong>army</strong>, but there are many paths to victory. You can focus on building up your economy, your military, your magic, or your food production. You can also focus on a combination of these things.
            </p>
            <p>
                As a <strong>{raceArray[empire.race].name}</strong> your people are strongest in {raceStrength}
            </p>
        </div>
    )
}
