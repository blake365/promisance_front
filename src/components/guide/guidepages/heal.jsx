import GuideLink from "../../utilities/guidelink"
import { eraArray } from "../../../config/eras"

export default function HealGuide({ empire })
{
    return (
        <div>
            <GuideLink text='Return to Index' page='Index' />

            <h2>Healing Focus</h2>
            <p>Here you may choose to spend time with extra focus placed on healing your Military and {eraArray[empire.era].trpwiz}.</p>
            <p>While spending turns here, your empire's gross production of all resources will be 75% of their baseline value. In return you will gain 1 additional health point per turn up to 100%. Having a high health value is very important for successfully attacking and defending. </p>
        </div>
    )
}