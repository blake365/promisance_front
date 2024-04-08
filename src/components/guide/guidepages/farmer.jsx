import { eraArray } from '../../../config/eras'
import GuideLink from '../../utilities/guidelink'
import { useSelector } from 'react-redux'

export default function FarmerGuide({ empire })
{
    const { turnsMax } = useSelector((state) => state.games.activeGame)

    return (
        <div>
            <GuideLink text='Return to Index' page='Index' />

            <h2>Farmer Strategy</h2>

            <p>As a farmer, your primary goal is to produce food and sell it to other players. Food is in high demand from most players in the game because troops and {eraArray[empire.era].trpwiz} consume a lot of a food. </p>

            <h3>Set up</h3>
            <p>The best <GuideLink text='races' page='Race' /> for a farming strategy are Gremlin, and Goblin due to their lower food consumption and higher food production. Farmers are also best suited for the <GuideLink text={eraArray[1].name} page='Era' /> due to the {eraArray[1].mod_foodpro}% increase in food production. Players should aim to advance to this era as soon as possible.</p>
            <p>Farmers only need to focus on two primary building types: {eraArray[empire.era].bldfood} and {eraArray[empire.era].bldwiz}. {eraArray[empire.era].bldfood}  obviously produce food. {eraArray[empire.era].bldwiz} are needed in small quantities to advance eras and protect yourself from magical attacks with {eraArray[empire.era].spell_shield}. </p>
            <h3>Using Turns</h3>
            <p>In order to produce the most food you can, you will need a lot of land. Start your session with full turns ({turnsMax}). Use your initial turns attacking other players. Your health will drop as you attack. When your health is less than 70% or you fail an attack, it is time to stop and build. Build {eraArray[empire.era].bldfood} so that they make up around 95% of your buildings. After you build, <GuideLink text='farm' page='Farm' /> until you are back to 100% health. Repeat this process until you are out of attacks. </p>
            <p>Now that you have a lot of land and farms built, focus the rest of your time producing food. Don't forget to cast a spell shield before you run out of turns.</p>
            <p>Take your overflowing bounty of food and sell it on the <GuideLink text='public market' page='Public%20Market' /> for a reasonable price. If it is too expensive, other players may not want to buy it. If it is too cheap, you will not make as much money as you could have. It can be good to sell food in batches at different price points to see what works best. Food may also be in greater demand at different times in the round.
            </p>
            <p>Hopefully when you return to use more turns, someone will have purchased your food. The cash you made will be in your <GuideLink text='bank' page='The%20Bank' /> account. Use the proceeds to purchase troops and keep some left over for expenses. </p>
        </div>
    )
}
