import GuideLink from "../../utilities/guidelink"
import { eraArray } from "../../../config/eras"

export default function IntelGuide({ empire })
{
    return (
        <div>
            <GuideLink text='Return to Index' page='Index' />

            <h2>Intel Center</h2>
            <p>This section allows you to see and acquire information on other empires to find out their strengths and weaknesses.</p>
            <p>To get intel on other empires your {eraArray[empire.era].trpwiz} will cast {eraArray[empire.era].spell_spy} on another empire. To succeed you will need a ratio of 1x your opponent. </p>
            <p>To determine the ratio you can use the following formulas: </p>
            <p>Your magic offense power is: your {eraArray[empire.era].trpwiz} / ((your land + enemy land ) / 2) * race magic bonus</p>
            <p>
                Enemy magic defense power is: enemy {eraArray[empire.era].trpwiz} / enemy land * 1.05 * enemy race magic bonus
            </p>
            <p>Magic ratio: your magic offense / enemy magic defense</p>
            <dt>{eraArray[empire.era].spell_spy}</dt>
            <dd>If successful, this will allow you to see the vital statistics of your target's empire, just as is shown on your Summary Page.</dd>
            <p>Once you've gathered some intel, you can view them here. The most recent intel will be on the top of the list. It is risky to rely on outdated intel. </p>
        </div>
    )
}
