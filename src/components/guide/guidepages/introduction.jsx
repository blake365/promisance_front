import { eraArray } from "../../../config/eras"
import GuideLink from "../../utilities/guidelink"
import { useSelector } from "react-redux"

export default function IntroGuide({ empire })
{

    const { turnsCount, turnsFreq, turnsMax, turnsProtection, turnsStored } = useSelector((state) => state.games.activeGame)

    return (
        <div>
            <GuideLink text='Return to Index' page='Index' />

            <h2>Introduction</h2>
            <p>As leader of a newly founded empire, your goal is to become supreme to all others. Using everything from diplomacy to war, you must strive to build an empire wealthier than all others. Through this all, you will compete against anywhere from hundreds to thousands of other players, all aiming to achieve the same goals.</p>
            <h2>About Turn-Based Games</h2>
            <p>NeoPromisance is a turn-based game - that is, there is a limit to how often your empire can advance itself or interact with others.</p>
            <p>In NeoPromisance, you receive {turnsCount} of these turns every {turnsFreq} minutes. You can only accumulate {turnsMax} turns at once - if you receive more, they will go into your Stored Turns, of which you may have up to {turnsStored}; every time you receive additional turns, 1 of your stored turns will be released for you to use.</p>
            <p>All of the actions listed in the "Use Turns" section of the side menu will consume a variable number of turns when you perform them - the <GuideLink page='Cash' text='cash' />, <GuideLink page='Farm' text='farm' />, and <GuideLink page='Explore' text='explore' /> options allow you to specify how much time to spend, while <GuideLink page='Build' text='building' /> and <GuideLink page='demolish' text='demolishing' /> consume turns based on how quickly your empire can perform these actions.</p>
            <p><GuideLink page='War%20Council' text='Attacking' /> an empire, sending <GuideLink page='Foreign%20Aid' text='aid' />, or casting a <GuideLink page='Magic%20Center' text='spell' /> (whether on yourself or on another empire) consumes <b>2</b> turns.</p>
            <p>Other actions, such as participating in the <GuideLink page='Black%20Market' text='black market' /> or <GuideLink page='Public%20Market' text='public market' />, joining or managing a <GuideLink page='Clans' text='clan' />, <GuideLink page='Empire%20Settings' text='managing your empire' />, or sending <GuideLink page='Mailbox' text='messages' /> to other empires, do not consume any turns.</p>
            <p>Each time you take a turn, your empire will collect taxes from its citizens and harvest food. Tax revenue will then be spent maintaining your empire and its military, and food will be used to feed your population. Be careful to not run out of money or food - while  <GuideLink page='The%20Bank' text='the bank' /> can help you with the former, the latter can have disastrous results.</p>
            <p>When your empire is first created, it is placed under protection so that other empires cannot harm it during its initial stages of development. During this period of protection, your empire also may not attack others, send foreign aid, or participate on the Public Market. Once you have used {turnsProtection} turns, protection will be lifted and your empire will be exposed to the rest of the world. Once the end of the round draws near, however, this protection will be removed.</p>
            <h2>The Status Bar</h2>
            <p>At the top and bottom of every page is your Status Bar. This allows you to quickly check the crucial statistics of your empire:</p>
            <dl>
                <dt>Turns</dt>
                <dd>How many turns you have available to use.</dd>
                <dt>Net worth</dt>
                <dd>The estimated value of your empire, taking all significant assets into account.</dd>
                <dt>Land</dt>
                <dd>The current size of your empire.</dd>
                <dt>Cash</dt>
                <dd>The amount of money your empire has on hand, not counting any funds you may have stored in  <GuideLink page='The%20Bank' text='the bank' />.</dd>
                <dt>{eraArray[empire.era].food}</dt>
                <dd>The amount of food your empire has stockpiled.</dd>
                <dt>{eraArray[empire.era].runes}</dt>
                <dd>The amount of {eraArray[empire.era].runes} your empire's {eraArray[empire.era].trpwiz} have available for casting spells.</dd>
                <dt>Health</dt>
                <dd>The health and happiness of your empire's citizens and army.</dd>
            </dl>
            <h2>Other Icons</h2>
            <p>Below the status bar icons for any status effects your empire is facing will be shown. The icons will show how much time is left and show the name and time remaining when hovered or tapped on. There are also links to your <GuideLink page='Mailbox' text='mail box' /> and News which will show an indicator if there is something new. </p>
        </div>
    )
}
