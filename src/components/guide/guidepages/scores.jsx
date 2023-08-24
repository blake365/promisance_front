import GuideLink from '../../utilities/guidelink'


export default function ScoresGuide()
{
    return (
        <div>
            <GuideLink text='Return to Index' page='Index' />

            <h2>Scores List</h2>
            <p>This page lists the empires in the game. A pulsing blue dot indicates that a player is currently or was recently online. It is best to not interrupt players as they are using their turns so as not to spark a damaging conflict. </p>
            <dl>
                <dt><span style={{ color: 'lightgreen' }}>Protected</span></dt>
                <dd>Empires in this color are protected from being attacked by other empires.</dd>
                <dt><span style={{ color: 'brown' }}>Demo Accounts</span></dt>
                <dd>Empires in this color are demo accounts.</dd>
                {/* <dt><span className="mclan">Clanmate</span></dt>
                <dd>Denotes empires which are members of your current clan.</dd>
                <dt><span className="mally">Ally</span></dt>
                <dd>Empires belonging to a clan allied with your own appear in this color.</dd>
                <dt><span className="mwar">War</span></dt>
                <dd>If your clan has declared war on another clan, its members will be listed in this color.</dd>*/}
                <dt><span style={{ color: 'red' }}>Locked</span></dt>
                <dd>These empires have been disabled by the Administration for violating the established Rules.</dd>
                <dt><span style={{ color: 'orange' }}>Administrator</span></dt>
                <dd>These empires are responsible for keeping the game running smoothly. To preserve game balance, they cannot be attacked, nor can they interact with others (aside from private messaging). If you're experiencing technical difficulties playing the game, these are the people to talk to.</dd>
                <dt><span style={{ color: 'deepskyblue' }}>Yourself</span></dt>
                <dd>Your own empire is always displayed in this color, making it easier to locate yourself in the score list.</dd>
            </dl>
            <p>Each empire is listed in the table with the following statistics displayed:</p>
            <dl>
                <dt>Rank</dt>
                <dd>The empire's rank (based on networth), compared to all other empires in the game.</dd>
                <dt>Empire</dt>
                <dd>The empire's icon, name, and identification number.</dd>
                <dt>Net Worth</dt>
                <dd>A calculated number indicating the empire's overall value.</dd>
                <dt>Land</dt>
                <dd>The total amount of land the empire occupies.</dd>
                {/* <dt>Clan</dt>
                <dd>Any clan the empire is currently a member of (shown as "None" otherwise).</dd>

                <dt>Score</dt>
                <dd>The empire's current score, influenced by their combat statistics.</dd>

                <dt>Kills</dt>
                <dd>How many other empires this empire has successfully destroyed.</dd> */}
                <dt>Era</dt>
                <dd>The time period in which the empire exists.</dd>
                <dt>Race</dt>
                <dd>The race of the empire's inhabitants.</dd>
            </dl>
            <p>
                Click on an empire to view their public profile, time of last action, and to see options on how to interact with them directly from the scores page. You can see recent news from that empire, view or get new intel, send an attack or cast a spell, all from the scores page.
            </p>
        </div>
    )
}
