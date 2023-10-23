import { eraArray } from "../../../config/eras"
import GuideLink from "../../utilities/guidelink"

export default function BuildingsGuide({ empire })
{

    return (
        <div>
            <GuideLink text='Return to Index' page='Index' />
            <h2>Structures</h2>
            <p>Your empire's land can be allocated for the following purposes:</p>
            <dl>
                <dt>{eraArray[empire.era].bldpop}</dt>
                <dd>While {eraArray[empire.era].peasants} will live on unused land, these are specifically designed for housing. As a result, they allow you to house a great deal more {eraArray[empire.era].peasants} than otherwise.</dd>
                <dt>{eraArray[empire.era].bldcash}</dt>
                <dd>These allow your empire's economy to grow, helping to increase your Per Capita Income, as well as directly producing money themselves.</dd>
                <dt>{eraArray[empire.era].bldtrp}</dt>
                <dd>These produce your military units; the percentage of resources allocated to each unit type produced is controlled through the industry settings on the industrial focus page.</dd>
                <dt>{eraArray[empire.era].bldcost}</dt>
                <dd>These allow you to reduce your military expenses by more efficiently housing your units. They will also lower the price of all military units purchased from the Private Market. These also increase the rate at which your Private Market refills.</dd>
                <dt>{eraArray[empire.era].bldwiz}</dt>
                <dd>These serve to train and house {eraArray[empire.era].trpwiz}, as well as produce {eraArray[empire.era].runes} with which they may cast their spells.</dd>
                <dt>{eraArray[empire.era].bldfood}</dt>
                <dd>These are vital for feeding your {eraArray[empire.era].peasants} and military; without food, your population and army will starve and desert your empire.</dd>
                <dt>{eraArray[empire.era].blddef}</dt>
                <dd>These are a strictly defensive building, for every 1% of land built as {eraArray[empire.era].blddef}, your defense is increased by 1% (up to 50%) and your diminishing returns (DR) rate increases by 0.01.</dd>
            </dl>
        </div>
    )
}
