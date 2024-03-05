import { Button, Group } from "@mantine/core"
import { useState } from "react"
import { eraArray } from "../../../config/eras"
import GuideLink from "../../utilities/guidelink"
import { useSelector } from 'react-redux'

export default function MilitaryGuide({ empire })
{

    const { pvtmTrpArm, pvtmTrpFly, pvtmTrpLnd, pvtmTrpSea } = useSelector((state) => state.games.activeGame)
    const [era, setEra] = useState(empire.era)

    return (
        <div>
            <GuideLink text='Return to Index' page='Index' />

            <h2>Military Units</h2>
            <p>Your military serves not only to protect your empire from harm, but to strike out against others who threaten you.</p>

            <Group>
                <Button onClick={() => setEra(0)} compact color={eraArray[0].color}>
                    Past
                </Button>
                <Button onClick={() => setEra(1)} compact color={eraArray[1].color}>
                    Present
                </Button>
                <Button onClick={() => setEra(2)} compact color={eraArray[2].color}>
                    Future
                </Button>
            </Group>
            <dl>
                <dt>{eraArray[era].trparm}</dt>
                <dd>The basic military unit used in Guerrilla Strikes. Not the strongest unit, but with a cheaper price tag these can be mobilized in large groups to cause plenty of damage to your enemy.<br />Base cost ${pvtmTrpArm}, offensive power {eraArray[era].o_trparm}, defensive power {eraArray[era].d_trparm}.</dd>
                <dt>{eraArray[era].trplnd}</dt>
                <dd>A strong
                    {eraArray[era].o_trplnd > eraArray[era].d_trplnd ? 'offensive' : 'defensive'} unit used in Seige Attacks.  Can be used in attacks to gain land from your enemies.<br />Base cost ${pvtmTrpLnd}, offensive power {eraArray[era].o_trplnd}, defensive power {eraArray[era].d_trplnd}.</dd>
                <dt>{eraArray[era].trpfly}</dt>
                <dd>An Air Strike attack is sometimes the best way to go; these can also capture land in special attacks and have an edge in {eraArray[era].o_trpfly > eraArray[era].d_trpfly ? 'offense' : 'defense'}.<br />Base cost ${pvtmTrpFly}, offensive power {eraArray[era].o_trpfly}, defensive power {eraArray[era].d_trpfly}.</dd>
                <dt>{eraArray[era].trpsea}</dt>
                <dd>This unit is used in Coastal Assaults but they are used not only for military purposes as they are needed to ship foreign aid to other empires.  With both strong offensive and defensive capabilities, it is the most expensive unit, but also the most powerful.<br />Base cost ${pvtmTrpSea}, offensive power {eraArray[era].o_trpsea}, defensive power {eraArray[era].d_trpsea}.</dd>
            </dl>
        </div>
    )
}
