import { eraArray } from "../../../config/eras"
import GuideLink from "../../utilities/guidelink"

export default function MeditateGuide({ empire })
{
    return (
        <div>
            <GuideLink text='Return to Index' page='Index' />

            <h2>Meditate</h2>
            <p>Here you may choose to spend time with extra focus placed on your empire's {eraArray[empire.era].runes} production.</p>
            <p>While spending turns here, your {eraArray[empire.era].trpwiz} {eraArray[empire.era].runes} production will increase by 25%.</p>
        </div>
    )
}
