import { Table } from "@mantine/core"
import { eraArray } from "../../../config/eras"
import { raceArray } from "../../../config/races"
import GuideLink from "../../utilities/guidelink"
import '../guide.css'

export default function RaceGuide({ empire })
{
    return (
        <div>
            <GuideLink text='Return to Index' page='Index' />

            <h2>Races</h2>
            <p>There are many different races in the world, each with their own distinct advantages and disadvantages in the following areas:</p>
            <dl>
                <dt>Offense</dt>
                <dd>Your offensive power while attacking other empires.</dd>
                <dt>Defense</dt>
                <dd>Your defensive power when being attacked by other empires.</dd>
                <dt>Building</dt>
                <dd>How quickly you can construct (and demolish) structures.</dd>
                <dt>Upkeep*</dt>
                <dd>The amount of money you must pay for upkeep on your military units.</dd>
                <dt>Magic</dt>
                <dd>Your magical power, used when casting spells and when other empires cast spells on you.</dd>
                <dt>Industry</dt>
                <dd>Your ability to produce military units.</dd>
                <dt>Economy</dt>
                <dd>Your Per Capita Income, how much money your citizens make each turn.</dd>
                <dt>Exploration</dt>
                <dd>How much land you gain per turn spent exploring.</dd>
                <dt>Market*</dt>
                <dd>The prices of military units on the private market.</dd>
                <dt>Consumption*</dt>
                <dd>The amount of {eraArray[empire.era].food} your population and military consumes each turn.</dd>
                <dt>Energy</dt>
                <dd>The rate at which your {eraArray[empire.era].trpwiz} produce {eraArray[empire.era].runes}.</dd>
                <dt>Agriculture</dt>
                <dd>The rate at which your {eraArray[empire.era].bldfood} produce {eraArray[empire.era].food}.</dd>
            </dl>
            <i>Scroll to see more attributes</i>
            <div className="guideTable">
                <Table highlightOnHover striped style={{ width: 1300 }}>
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
                        {raceArray.map((race, index) => 
                        {
                            return (
                                <tr key={index}>
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
                            )
                        })}
                    </tbody>
                </Table>
            </div>
            <p>For all of the above values, a positive percentage works to your empire's advantage while a negative percentage acts as a penalty. For attributes noted with a "*", this may seem backwards - for example, a food consumption penalty (negative) will <i>increase</i> how much food your units require, while an upkeep bonus (positive) will <i>decrease</i> your expenses.</p>
        </div>
    )
}
