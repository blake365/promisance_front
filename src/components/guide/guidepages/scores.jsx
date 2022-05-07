import { TURNS_FREQ } from '../../../config/config'


export default function ScoresGuide({ empire })
{
    return (
    <div>
<h2>Scores List</h2>
<p>This page lists the top 10 empires in the game, as well as up to 30 empires ranked near your own. Each empire is color-coded to indicate its current status:</p>
<dl>
    <dt><span class="mprotected">Protected</span></dt>
        <dd>Empires in this color are protected from being attacked by other empires, either due to not having left New Player Protection or from having gone on vacation.</dd>
    <dt><span class="mdead">Dead</span></dt>
        <dd>Once an empire has been destroyed, it is shown in this color.</dd>
    <dt><span class="mclan">Clanmate</span></dt>
        <dd>Denotes empires which are members of your current clan.</dd>
    <dt><span class="mally">Ally</span></dt>
        <dd>Empires belonging to a clan allied with your own appear in this color.</dd>
    <dt><span class="mwar">War</span></dt>
        <dd>If your clan has declared war on another clan, its members will be listed in this color.</dd>
    <dt><span class="mdisabled">Locked</span></dt>
        <dd>These empires have been disabled by the Administration for violating the established Rules.</dd>
    <dt><span class="madmin">Administrator</span></dt>
        <dd>These empires are responsible for keeping the game running smoothly. To preserve game balance, they cannot be attacked, nor can they interact with others (aside from private messaging). If you're experiencing technical difficulties playing the game, these are the people to talk to.</dd>
    <dt><span class="mself">Yourself</span></dt>
        <dd>Your own empire is always displayed in this color, making it easier to locate yourself in the score list.</dd>
</dl>
<p>Each empire is listed in the table with the following statistics displayed:</p>
<dl>
    <dt>Rank</dt>
        <dd>The empire's rank (based on networth), compared to all other empires in the game.</dd>
    <dt>Empire</dt>
        <dd>The empire's name and identification number.</dd>
    <dt>Land</dt>
        <dd>The total amount of land the empire occupies.</dd>
    <dt>Net Worth</dt>
        <dd>A calculated number indicating the empire's overall value.</dd>

    <dt>Clan</dt>
        <dd>Any clan the empire is currently a member of (shown as "None" otherwise).</dd>

    <dt>Score</dt>
        <dd>The empire's current score, influenced by their combat statistics.</dd>

    <dt>Kills</dt>
        <dd>How many other empires this empire has successfully destroyed.</dd>
    <dt>Race</dt>
        <dd>The race of the empire's inhabitants.</dd>
    <dt>Era</dt>
        <dd>The time period in which the empire exists.</dd>
</dl>
<p>Rankings on this page are updated every {TURNS_FREQ} minutes.</p>
    </div>
    )
}
