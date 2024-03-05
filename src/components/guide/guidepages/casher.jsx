import { eraArray } from '../../../config/eras'
import GuideLink from '../../utilities/guidelink'
import { useSelector } from 'react-redux'

export default function CasherGuide({ empire })
{

    const { turnsMax } = useSelector((state) => state.games.activeGame)

    return (
        <div>
            <GuideLink text='Return to Index' page='Index' />

            <h2>Casher Strategy</h2>

            <p>As a casher, your primary goal is to produce cash for yourself. You will rely on other players to purchase food and troops from the markets. </p>

            <h3>Set up</h3>
            <p>The best <GuideLink text='races' page='Race' /> for a casher strategy are Gnome, and Troll due to their lower troop upkeep, higher per capita income, and market bonus (Gnome only). Cashers are also best suited for the <GuideLink text={eraArray[2].name} page='Era' /> due to the {eraArray[2].mod_cashpro}% increase in income. Players should aim to advance to this era as soon as possible.</p>
            <p>Cashers need to focus on a few building types: {eraArray[empire.era].bldpop}, {eraArray[empire.era].bldcash}, {eraArray[empire.era].bldcost} and {eraArray[empire.era].bldwiz}. {eraArray[empire.era].bldpop} brings more {eraArray[empire.era].peasants} to your empire increasing your population. {eraArray[empire.era].bldcash} produce income and increase your per capita income. {eraArray[empire.era].bldcost} reduce the upkeep cost of troops and reduce the prices on the <GuideLink text='black market' page='Black%20Market' />. {eraArray[empire.era].bldwiz} are needed in small quantities to advance eras and protect yourself from magical attacks with {eraArray[empire.era].spell_shield}. </p>
            <h3>Using Turns</h3>
            <p>In order to produce the most cash you can, you will need a lot of land. Start your session with full turns ({turnsMax}). Use your initial turns attacking other players. Your health will drop as you attack. When your health is less than 70% or you fail an attack, it is time to stop and build. Build {eraArray[empire.era].bldpop} and {eraArray[empire.era].bldcash} so that they make up around 45% of your buildings each. After you build, <GuideLink text='cash' page='Cash' /> until you are back to 100% health. Repeat this process until you are out of attacks. During this time it can be beneficial to lower your tax rate to encourage {eraArray[empire.era].peasants} to come to your empire. </p>
            <p>Now that you have a lot of land, {eraArray[empire.era].bldpop}, {eraArray[empire.era].bldcash}, and {eraArray[empire.era].peasants}, focus the rest of your time producing food. During this time it can be good to raise your tax rate, just remember it will cause some of your peasants to leave. Don't forget to cast a spell shield before you run out of turns.</p>
            <p>Take cash you just made and spend it on the <GuideLink text='public market' page='Public%20Market' /> or private market. You will likely want to buy food and troops. Compare prices to get the best deal.
            </p>
        </div>
    )
}
