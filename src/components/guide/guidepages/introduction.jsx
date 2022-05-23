import { eraArray } from "../../../config/eras"
import {GAME_TITLE, TURNS_COUNT, TURNS_FREQ, TURNS_MAXIMUM, TURNS_PROTECTION, TURNS_STORED, } from "../../../config/config"
import GuideLink from "../../utilities/guidelink"

export default function IntroGuide({empire})
{
    return (
    <div>
        <h2>Introduction</h2>
<p>As leader of a newly founded empire, your goal is to become supreme to all others. Using everything from diplomacy to war, you must strive to build an empire wealthier than all others. Through this all, you will compete against anywhere from hundreds to thousands of other players, all aiming to achieve the same goals.</p>
<h2>About Turn-Based Games</h2>
<p>QM Promisance is a turn-based game - that is, there is a limit to how often your empire can advance itself or interact with others.</p>
<p>In {GAME_TITLE}, you receive {TURNS_COUNT} of these turns every {TURNS_FREQ} minutes. You can only accumulate {TURNS_MAXIMUM} turns at once - if you receive more, they will go into your Stored Turns, of which you may have up to {TURNS_STORED}; every time you receive additional turns, 1 of your stored turns will be released for you to use.</p>
<p>All of the actions listed in the "Use Turns" section of the side menu will consume a variable number of turns when you perform them - the <GuideLink page='Cash' text='cash' />, <GuideLink page='Farm' text='farm' />, and <GuideLink page='Explore' text='explore' /> options allow you to specify how much time to spend, while <GuideLink page='Build' text='building' /> and <GuideLink page='Demolish' text='demolishing' /> consume turns based on how quickly your empire can perform these actions.</p>
<p><GuideLink page='Attack' text='attacking' /> an empire, sending <GuideLink page='Aid' text='aid' />, or casting a <GuideLink page='Magic' text='spell' /> (whether on yourself or on another empire) consumes <b>2</b> turns.</p>
<p>Other actions, such as participating in the <GuideLink page='Black%20Market' text='black market' /> or <GuideLink page='Public%20Market' text='public market' />, joining or managing a <GuideLink page='Clan' text='clan' />, <GuideLink page='Manage' text='managing your empire' />, or sending <GuideLink page='Mail' text='messages' /> to other empires, do not consume any turns.</p>
<p>Each time you take a turn, your empire will collect taxes from its citizens and harvest food. Tax revenue will then be spent maintaining your empire and its military, and food will be used to feed your population. Be careful to not run out of money or food - while the <GuideLink page='World%20Bank' text='world bank' /> can help you with the former, the latter can have disastrous results.</p>
<p>When your empire is first created, it is placed under protection so that other empires cannot harm it during its initial stages of development. During this period of protection, your empire also may not attack others, send foreign aid, or participate on the Public Market. Once you have used {TURNS_PROTECTION} turns, protection will be lifted and your empire will be exposed to the rest of the world. Once the end of the round draws near, however, this protection will be removed.</p>
<h2>The Status Bar</h2>
<p>At the top and bottom of every page is your Status Bar. This allows you to quickly check the crucial statistics of your empire:</p>
<dl>
    <dt>Mail Box</dt>
        <dd>A shortcut link to <GuideLink page='Mail' text='mail box' /> - the text of this link will change to "<b>New Mail</b>" if you have unread messages waiting.</dd>
    <dt>Turns</dt>
        <dd>How many turns you have available to use.</dd>
    <dt>Cash</dt>
        <dd>The amount of money your empire has on hand, not counting any funds you may have stored in the <GuideLink page='World%20Bank' text='world bank' />.</dd>
    <dt>Land</dt>
        <dd>The current size of your empire.</dd>
    <dt>{eraArray[empire.era].runes}</dt>
        <dd>The amount of {eraArray[empire.era].runes} your empire's {eraArray[empire.era].trpwiz} have available for casting spells.</dd>
    <dt>{eraArray[empire.era].food}</dt>
        <dd>The amount of food your empire has stockpiled.</dd>
    <dt>Health</dt>
        <dd>The health and happiness of your empire's citizens and army.</dd>
    <dt>Networth</dt>
        <dd>The estimated value of your empire, taking all significant assets into account.</dd>
</dl>
    </div>
    )
}
