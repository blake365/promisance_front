import { AID_DELAY, AID_MAXCREDITS } from "../../../config/config"
import { eraArray } from "../../../config/eras"
import GuideLink from "../../utilities/guidelink"


export default function AidGuide({ empire })
{
    return (
        <div>
            <GuideLink text='Return to Index' page='Index' />
            <h2>Sending Foreign Aid</h2>
            <p>If one of your friends or clan mates is in trouble and needs help, you can send some of your {eraArray[empire.era].trpsea} with a shipment of troops and supplies. Up to {AID_MAXCREDITS} can be sent at any given time, and one additional shipment can be sent every {AID_DELAY / 60 / 60} hours.</p>
            <p>In a single aid shipment, you can send up to 15% of your empire's currently available troops, money, {eraArray[empire.era].runes}, and {eraArray[empire.era].food} to another empire.</p>
            <p>No matter what you wish to send, you must send a minimum number of {eraArray[empire.era].trpsea} to deliver your shipment, where the amount is based on the size of your empire. </p>
            <p>Aid can only be sent to those who actually need it - an empire whose net worth is significantly greater than yours likely has no need for your goods. However, if you are in a clan, you will be allowed to send goods to clan mates many times your size.</p>
            <p>It is not possible to send aid to those you are at war with.</p>
        </div>
    )
}