import { Table } from "@mantine/core"
import { eraArray } from "../../../config/eras"
import GuideLink from "../../utilities/guidelink"

import classes from '../guide.module.css'

export default function EraGuide({ empire })
{
    return (
        <div>
            <GuideLink text='Return to Index' page='Index' />

            <h2>Time Periods</h2>
            <p>Empires in this world exist in 3 different time periods. Interacting directly with an empire in another era requires an open Time Gate.</p>
            <p>The offensive and defensive power of <GuideLink page='Military' text='military units' /> varies with one's era. Additionally, empires in different eras receive the following bonuses and penalties:</p>
            <dl>
                <dt>Industry</dt>
                <dd>Your ability to produce military units.</dd>
                <dt>Energy</dt>
                <dd>The rate at which your {eraArray[empire.era].trpwiz} produce {eraArray[empire.era].runes}.</dd>
                <dt>Exploration</dt>
                <dd>How much land you gain per turn spent <GuideLink page='Explore' text='exploring' />.</dd>
            </dl>
            <div className={classes.guideTable}>
                <Table highlightOnHover striped>
                    <thead>
                        <tr>
                            <th>Era</th>
                            <th>Industry</th>
                            <th>Energy</th>
                            <th>Exploration</th>
                        </tr>
                    </thead>
                    <tbody>
                        {eraArray.map(era => 
                        {
                            return (
                                <tr key={era.name}>
                                    <td>{era.name}</td>
                                    <td style={era.mod_industry >= 0 ? { color: 'green' } : { color: 'red' }}>{era.mod_industry}%</td>

                                    <td style={era.mod_runepro >= 0 ? { color: 'green' } : { color: 'red' }}>{era.mod_runepro}%</td>

                                    <td style={era.mod_explore >= 0 ? { color: 'green' } : { color: 'red' }}>{era.mod_explore}%</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </div>
        </div>
    )
}
