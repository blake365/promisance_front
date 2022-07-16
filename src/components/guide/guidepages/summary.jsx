import { eraArray } from '../../../config/eras'
import GuideLink from '../../utilities/guidelink'

export default function SummaryGuide({ empire })
{
    return (
        <div>
            <GuideLink text='Return to Index' page='Index' />

            <h2>Empire Summary</h2>
            <p>This is the first page you will see each time you login. On it is displayed brief statistics for your empire, any recent events, and when you should expect to receive your next set of turns.</p>

            <p>In the center of the page, a table will display the following vital statistics of your empire:</p>
            <dl>
                <dt>Turns</dt>
                <dd>The number of turns you currently have available to use (and the maximum you are allowed to accumulate).</dd>
                <dt>Stored Turns</dt>
                <dd>The number of turns you have stored in reserve (and the maximum allowed). See the <GuideLink page='Introduction' text='Introduction' /> for more information.</dd>
                <dt>Rank</dt>
                <dd>Your empire's current rank among all other empires, based on its networth.</dd>
                <dt>{eraArray[empire.era].peasants}</dt>
                <dd>The current population of your empire.</dd>
                <dt>Land Acres</dt>
                <dd>The current size of your empire.</dd>
                <dt>Money</dt>
                <dd>The amount of money your empire has on hand, not counting any funds you may have stored in the <GuideLink page='World%20Bank' text='World Bank' /> .</dd>
                <dt>{eraArray[empire.era].food}</dt>
                <dd>The amount of food your empire has stockpiled. Without food, your citizens and army will starve!</dd>
                <dt>{eraArray[empire.era].runes}</dt>
                <dd>The amount of energy your empire's {eraArray[empire.era].trpwiz} have available for casting spells.</dd>
                <dt>Net Worth</dt>
                <dd>The estimated value of your empire, taking all significant assets into account.</dd>
                <dt>Era</dt>
                <dd>The <GuideLink page='Era' text='Time Period' />  during which your empire exists.</dd>
                <dt>Race</dt>
                <dd>The <GuideLink page='Race' text='Race' /> of your empire's inhabitants.</dd>
                <dt>Health</dt>
                <dd>The health and happiness of your empire's citizens and army.</dd>
                <dt>Tax Rate</dt>
                <dd>Your empire's tax rate, which influences both the income of your empire's government and the happiness of its citizens.</dd>
                <dt>{eraArray[empire.era].trparm}, {eraArray[empire.era].trplnd}, {eraArray[empire.era].trpfly}, {eraArray[empire.era].trpsea}</dt>
                <dd>The number of units of each type your empire currently employs or maintains in its army.</dd>
                <dt>{eraArray[empire.era].trpwiz}</dt>
                <dd>The number of spellcasters your empire has at its disposal.</dd>
            </dl>
            <p>Below this table is displayed the game server's current time (in your configured time zone) and the state of the current round (e.g. how long before it starts or ends), as well as the rate at which turns are given out and how long you should expect to wait before receiving additional turns.</p>
            <p>If you are currently in a clan, the latest post in the clan's News thread will be displayed as a reminder.</p>
            <p>A Personal Notes section can be found on this page, allowing you to store pieces of information relevant to your gameplay strategy or any tasks you need to perform.</p>
            <p>A summary of your <GuideLink page='Mail' text='Mail Box' />  is displayed below, indicating how many new messages you have received lately and how many old messages are remaining in your mailbox.</p>
            <p>If any other empires have interacted with you recently, whether it be via the public market, your clan, or a rival empire attacking you, a list of events will be displayed. Clicking the "Mark News as Read" link will dismiss all recent events, and clicking the "View New Archive" link will allow you to re-examine any events which have occurred during the past few days.</p>
        </div>
    )
}
