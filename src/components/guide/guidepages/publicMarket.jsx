import { eraArray } from "../../../config/eras"
import { PUBMKT_MAXTIME, PUBMKT_MINTIME, PUBMKT_START, PVTM_MAXSELL } from "../../../config/config"
import GuideLink from "../../utilities/guidelink"

export default function PublicMarketGuide()
{

    return (
        <div>
            <GuideLink text='Return to Index' page='Index' />
            <h2>The Public Market - Buying</h2>
            <p>While the private market is convenient and reliable, its prices may be prohibitive if your empire does not focus strongly on its economy. Goods can be purchased from other empires via the public market, often at much better prices.</p>
            <p>Of all goods available on the public market, the least expensive will be shown to you. The identities of the empires you are purchasing from are not revealed to you, nor is your identity revealed to them.</p>
            <p>If less expensive goods become available while you are browsing, you will automatically purchase as many as possible at the reduced price before buying the rest at the price you originally were quoted. If somebody else buys goods while you are browsing, you will only buy what remains at the price you requested - if you require more units, you can purchase them separately at a higher price.</p>
            <p>When browsing, your own goods will never be listed for sale to you.</p>

            <h2>The Public Market - Selling</h2>
            <p>While the private market is a convenient place to rid yourself of excess food and equipment, you likely will not be well compensated. Using the public market, you can sell your goods to other empires willing to purchase them, often at much better prices.</p>
            <p>Once you place items on the public market, they will take {PUBMKT_START} hour(s) to reach the marketplace and become available for sale.
            </p>
            <p>
                Once items are available on the market, you will be allowed to remove them at your own discretion. Removing items from the market will result in only 75% of them being returned to you.
            </p>
            <p>
                Items are automatically removed from the market and returned to your empire after {PUBMKT_MAXTIME} hours. Only 75% of them will be returned to you.
            </p>
            <p>
                You may edit the price of items currently on the market, however there is a 10% fee for doing so.
            </p>
            <p>Be wary about selling during times of war, because the market coalition does not concern itself with inter-empire relations and will gladly sell your goods to your enemies.</p>
        </div>
    )
}
