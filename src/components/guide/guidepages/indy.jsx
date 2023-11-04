import { TURNS_MAXIMUM, TURNS_PROTECTION } from '../../../config/config'
import { eraArray } from '../../../config/eras'
import { raceArray } from '../../../config/races'
import GuideLink from '../../utilities/guidelink'

export default function IndyGuide({ empire })
{
    return (
        <div>
            <GuideLink text='Return to Index' page='Index' />

            <h2>Industrialist Strategy</h2>

            <p>As an Indy (Industrialist), your primary goal is to produce troops and sell them to other players. Your troops will be in high demand from other players looking to expand their armies. </p>

            <h3>Set up</h3>
            <p>The best <GuideLink text='races' page='Race' /> for an Indy strategy are Dwarf, Orc, or Goblin due to their industry bonus. Indys are also best suited for the <GuideLink text={eraArray[2].name} page='Era' /> due to the {eraArray[2].mod_industry}% increase to industry output. Players should aim to advance to this era as soon as possible.</p>
            <p>Indys need to focus on a few building types: {eraArray[empire.era].bldtrp}, {eraArray[empire.era].bldcost} and {eraArray[empire.era].bldwiz}. {eraArray[empire.era].bldtrp} produces new troops. {eraArray[empire.era].bldcost} reduce the upkeep cost of troops and reduce the prices on the <GuideLink text='black market' page='Black%20Market' />. {eraArray[empire.era].bldwiz} are needed in small quantities to advance eras and protect yourself from magical attacks with {eraArray[empire.era].spell_shield}. </p>
            <h3>Using Turns</h3>
            <p>In order to produce the most troops you can, you will need a lot of land. Start your session with full turns ({TURNS_MAXIMUM}). Use your initial turns attacking other players. Your health will drop as you attack. When your health is less than 70% or you fail an attack, it is time to stop and build. Build {eraArray[empire.era].bldtrp} so that they make up around 85% of your buildings. After you build, <GuideLink text='indy' page='Industry' /> until you are back to 100% health. Repeat this process until you are out of attacks. </p>
            <p>Now that you have a lot of land and {eraArray[empire.era].bldtrp}, focus the rest of your time producing troops. Don't forget to cast a spell shield before you run out of turns. If you start to run low on cash or food, you can sell some troops on the black market for quick cash. </p>
            <p>Take excess troops you just made and sell them on the <GuideLink text='public market' page='Public%20Market' /> for a reasonable price. If they are too expensive, other players may not want to buy them. If they are too cheap, you will not make as much money as you could have. It can be good to sell troops in batches at different price points to see what works best.
            </p>
            <p>Hopefully when you return to use more turns, someone will have purchased your troops. The cash you made will be in your <GuideLink text='bank' page='The%20Bank' /> account. Use the proceeds to purchase food and keep some left over for expenses. </p>
        </div>
    )
}
