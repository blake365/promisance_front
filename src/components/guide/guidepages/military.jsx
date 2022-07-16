import { Button, Group, Table } from "@mantine/core"
import { useState } from "react"
import { PVTM_TRPARM, PVTM_TRPFLY, PVTM_TRPLND, PVTM_TRPSEA } from "../../../config/config"
import { eraArray } from "../../../config/eras"
import GuideLink from "../../utilities/guidelink"

export default function MilitaryGuide({ empire })
{

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
                <dd>The basic military unit. Not the strongest unit, but with a cheaper price tag these can be mobilized in large groups to cause plenty of damage to your enemy.<br />Base cost ${PVTM_TRPARM}, offensive power {eraArray[era].o_trparm}, defensive power {eraArray[era].d_trparm}.</dd>
                <dt>{eraArray[era].trplnd}</dt>
                <dd>A strong
                    {eraArray[era].o_trplnd > eraArray[era].d_trplnd ? 'offensive' : 'defensive'} unit.  Can be used in attacks to gain land from your enemies.<br />Base cost ${PVTM_TRPLND}, offensive power {eraArray[era].o_trplnd}, defensive power {eraArray[era].d_trplnd}.</dd>
                <dt>{eraArray[era].trpfly}</dt>
                <dd>An aerial attack is sometimes the best way to go; these can also capture land in special attacks and have an edge in {eraArray[era].o_trpfly > eraArray[era].d_trpfly ? 'offense' : 'defense'}.<br />Base cost ${PVTM_TRPFLY}, offensive power {eraArray[era].o_trpfly}, defensive power {eraArray[era].d_trpfly}.</dd>
                <dt>{eraArray[era].trpsea}</dt>
                <dd>These are used not only for military purposes, but also to ship foreign aid to other empires.  With both strong offensive and defensive capabilities, it is the most expensive unit, but also the most powerful.<br />Base cost ${PVTM_TRPSEA}, offensive power {eraArray[era].o_trpsea}, defensive power {eraArray[era].d_trpsea}.</dd>
            </dl>
        </div>
    )
}
