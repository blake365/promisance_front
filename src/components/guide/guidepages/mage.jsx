import { eraArray } from '../../../config/eras'
import GuideLink from '../../utilities/guidelink'
import { useSelector } from 'react-redux'

export default function MageGuide({ empire })
{
    const { turnsMax } = useSelector((state) => state.games.activeGame)

    return (
        <div>
            <GuideLink text='Return to Index' page='Index' />

            <h2>Mage Strategy</h2>

            <p>As an Mage, your primary goal is to produce cash through magical spells. </p>

            <h3>Set up</h3>
            <p>The best <GuideLink text='races' page='Race' /> for a Mage strategy are Elf and Drow due to their magic and {eraArray[empire.era].runes} production bonus. Mages are also best suited for the <GuideLink text={eraArray[0].name} page='Era' /> due to the {eraArray[0].mod_runepro}% increase to {eraArray[empire.era].runes} production. Players do not need to advance eras as a Mage.</p>
            <p>Mages need to focus on one main building: {eraArray[empire.era].bldwiz}. {eraArray[empire.era].bldwiz} produce {eraArray[empire.era].runes} and bring {eraArray[empire.era].trpwiz} to your empire. You may also want to build some {eraArray[empire.era].bldfood} because {eraArray[empire.era].trpwiz} like to eat a lot.</p>
            <h3>Using Turns</h3>
            <p>In order to produce the most {eraArray[empire.era].runes} and resources as possible, you will need a lot of land. Start your session with full turns ({turnsMax}). Use your initial turns attacking other players. Your health will drop as you attack. When your health is less than 70% or you fail an attack, it is time to stop and build. Build {eraArray[empire.era].bldwiz} so that they make up around 95% of your buildings. After you build, <GuideLink text='meditate' page='Meditate' /> until you are back to 100% health. Repeat this process until you are out of attacks. </p>
            <p>Now that you have a lot of land and {eraArray[empire.era].trpwiz}, focus some of your turns producing more {eraArray[empire.era].runes}. When you have enough {eraArray[empire.era].runes}, go to the <GuideLink text='Magic Center' page='Magic%20Center' /> and cast {eraArray[empire.era].spell_cash} as many times as you can. If you run low on food you can buy some from the markets or cast {eraArray[empire.era].spell_food} to make some yourself. </p>
            <p>Take cash you just made and spend it on the <GuideLink text='public market' page='Public%20Market' /> or private market. You will likely want to buy food and troops. Compare prices to get the best deal.
            </p>
        </div>
    )
}
