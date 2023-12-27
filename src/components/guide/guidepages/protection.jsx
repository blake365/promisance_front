import { TURNS_MAXIMUM, TURNS_PROTECTION } from '../../../config/config'
import { eraArray } from '../../../config/eras'
import GuideLink from '../../utilities/guidelink'

export default function ProtectionGuide({ empire })
{
    return (
        <div>
            <GuideLink text='Return to Index' page='Index' />

            <h2>Your First Turns in Protection</h2>

            <p>Your empire is protected until you have used {TURNS_PROTECTION} turns. You cannot attack nor be attacked during this time. </p>
            <p>The first order of business should be expanding your lands by <GuideLink text='exploring' page='Explore' />
                . Once you have some land to work with, you need to <GuideLink text='build structures' page='Build' />
                . The optimum structures will depend on your race and strategy choices. Finding your niche within the game is essential for having the most success. For example, if you notice a lack of food on the <GuideLink text='Public Market' page='Public%20Market' />, farming could be a good choice.</p>
            <p>It is recommended that every empire build some amount of {eraArray[empire.era].bldwiz} in order to advance between eras and <GuideLink text='cast spell shields' page='Magic%20Center' /> for protection against Mages.</p>
            <p>Once you have used {TURNS_PROTECTION - 1} turns, it is best to wait until you have {TURNS_MAXIMUM} turns again before breaking out of protection. Going forward it is recommended that you have full turns and use as many turns as possible in one session. When you are out of protection, you will be vulnerable to <GuideLink text='attacks' page='War%20Council' /> from other players. On the other hand, you should be ready to launch your first attacks as soon as you can. Attacking is a much faster way to gain land than exploring. It can be beneficial to select one or two troop types to focus on in your army. <GuideLink text='Military units' page='Military' /> have different attack and defense capabilities in each <GuideLink text='era' page='Era' /> so find the one that works for you. </p>
        </div>
    )
}
