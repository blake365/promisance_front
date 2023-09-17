import { eraArray } from '../../../config/eras'
import GuideLink from '../../utilities/guidelink'

export default function OverviewGuide({ empire })
{
    return (
        <div>
            <GuideLink text='Return to Index' page='Index' />

            <h2>Detailed Status</h2>
            <p>This page provides detailed statistics about your empire and its economy, divided into 6 overall sections. The red or green numbers indicate how your stats have been effected by Race or Era modifiers.</p>
            <h3>Empire</h3>
            <dl>
                <dt>Turns Used</dt>
                <dd>This is the number of turns you have used since your empire was first created.</dd>
                <dt>Money</dt>
                <dd>Funds your empire has available on-hand.</dd>
                <dt>Rank</dt>
                <dd>Your empire's rank, determined by its networth, compared to other empires in the game.</dd>
                <dt>Net Worth</dt>
                <dd>Your empire's networth is calculated based on all of its available assets - acres of land, cash, {eraArray[empire.era].food}, your citizens, and your military - and provides a rough indication of how much your empire is worth.</dd>
                <dt>Population</dt>
                <dd>This is the number of {eraArray[empire.era].peasants} that live in your empire.  {eraArray[empire.era].peasants} are necessary for making money to finance your empire.</dd>
                <dt>Race</dt>
                <dd>The <GuideLink text='Race' page='Race' /> of your empire's inhabitants.</dd>
                <dt>Era</dt>
                <dd>The <GuideLink text='Time Period' page='Era' /> during which your empire exists.</dd>
            </dl>
            <h3>Agriculture</h3>
            <dl>
                <dt>Production</dt>
                <dd>{eraArray[empire.era].bldfood} and unused land both help to produce {eraArray[empire.era].food} with which to feed your citizens and army. This number indicates approximately how much they will produce each turn.</dd>
                <dt>Consumption</dt>
                <dd>Your military, {eraArray[empire.era].peasants}, and {eraArray[empire.era].trpwiz} all require {eraArray[empire.era].food} to survive. This number shows your estimated consumption per turn.</dd>
                <dt>Net</dt>
                <dd>This number indicates whether you are gaining or losing {eraArray[empire.era].food} overall per turn. It is usually a good idea to keep an eye on this number, lest you run out and your people starve.</dd>
            </dl>
            <h3>Other</h3>
            <dl>
                <dt>Exploration</dt>
                <dd>How much land you will gain from one turn exploring</dd>
                <dt>Black Market</dt>
                <dd>Shows your racial bonus relating to price discounts or penalties on your Black Market</dd>
                <dt>Luck</dt>
                <dd>Luck is the percent chance to have a turn yield 1.5x production. This applies to new land when exploring, {eraArray[empire.era].food} when farming, income when cashing, troop production when doing industry, and {eraArray[empire.era].runes} when meditating. </dd>
            </dl>
            <h3>Land Division</h3>
            <p>Each row in this table indicates the number of each type of structure your empire has built on its land, as well as how many acres are currently unused.</p>
            <h3>Finances</h3>
            <dl>
                <dt>Per Cap Income</dt>
                <dd>This is your empire's per capita income, indicating how much money each of its {eraArray[empire.era].peasants} make each turn.  A percentage of this income is gained based on tax rate.</dd>
                <dt>Income</dt>
                <dd>Your empire's income is determined by the number of {eraArray[empire.era].peasants} it has, its per capita income, its tax rate, and its overall health.</dd>
                <dt>Expenses</dt>
                <dd>Your empire's expenses consist mainly of military upkeep and land taxes. {eraArray[empire.era].bldcost}can help to lower these expenses.</dd>
                <dt>Loan Payment</dt>
                <dd>If you have borrowed any money from the World Bank, 0.5% of your loan is paid off each turn.  Your loan payment for the next turn you take is indicated here.</dd>
                <dt>Net</dt>
                <dd>This indicates your empire's net income, whether it is gaining or losing money overall each turn.  It is highly recommended to keep an eye on this value, lest you run out of money and are forced to take out a potentially expensive loan.</dd>
                <dt>Savings Balance</dt>
                <dd>This indicates how much money your empire currently has saved in the World Bank. Your account's interest rate is indicated in parentheses.</dd>
                <dt>Loan Balance</dt>
                <dd>Here is indicated the amount of money your empire currently owes to the World Bank. The loan's interest rate is shown in parentheses.</dd>
            </dl>
            <h3>Military</h3>
            <p>The top rows indicate how many of each unit your empire currently has in its army.</p>
            <dl>
                <dt>Offensive Power</dt>
                <dd>This number indicates your empire's total calculated offensive power (see
                    <GuideLink text='Military Units' page='Military' />
                    for more information).</dd>
                <dt>Defensive Power</dt>
                <dd>Your empire's total calculated defensive power is shown here.</dd>
            </dl>
            <h3>Relations</h3>
            <dl>
                <dt>Member of Clan</dt>
                <dd>If you are in a clan, its name is indicated here.  If you are independent, this will simply say "None."</dd>
                <dt>Allies</dt>
                <dd>If you are in a clan, other clans which you are allied with will be listed here.</dd>
                <dt>Enemies</dt>
                <dd>If you are in a clan, clans you are at war with are listed here.</dd>
                <dt>Offensive Actions</dt>
                <dd>Indicates how many times you have attacked other empires, as well as the percentage of successful attacks (in parentheses).</dd>
                <dt>Defenses</dt>
                <dd>Indicates how many times your empire has been attacked by others, as well as the percentage of attacks that have been successfully resisted (in parentheses).</dd>
            </dl>
        </div>
    )
}
