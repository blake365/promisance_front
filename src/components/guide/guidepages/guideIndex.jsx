import { Group } from "@mantine/core"
import GuideLink from "../../utilities/guidelink"

export default function GuideIndex()
{
    return (
        <div>
            <h2>Index of Topics</h2>
            <div>
                <h4>Getting Started</h4>
                <Group>
                    <GuideLink text='Introduction' page='Introduction' />
                    <GuideLink text='Structures' page='Buildings' />
                    <GuideLink text='Military Units' page='Military' />
                    <GuideLink text='Races' page='Race' />
                    <GuideLink text='Time Periods' page='Era' />
                </Group>
                <h4>Information</h4>
                <Group>
                    <GuideLink text='Empire Summary' page='Summary' />
                    <GuideLink text='Detailed Status' page='Overview' />
                    <GuideLink text='Scores List' page='Scores' />
                    <GuideLink text='The Graveyard' page='Graveyard' />
                    <GuideLink text='Searching for Empires' page='Empire Search' />
                    <GuideLink text='News Search' page='News Search' />
                    <GuideLink text='Clan Contacts' page='Clan Contacts' />
                    <GuideLink text='Clan Statistics' page='Clan Statistics' />
                </Group>
                <h4>Spending Turns</h4>
                <Group>
                    <GuideLink text='Agriculture Focus' page='Farm' />
                    <GuideLink text='Economic Focus' page='Cash' />
                    <GuideLink text='Exploration' page='Explore' />
                    <GuideLink text='Industrial Focus' page='Industry' />
                    <GuideLink text='Healing Focus' page='Healing' />
                    <GuideLink text='Meditate' page='Meditate' />
                    <GuideLink text='Construction' page='Build' />
                    <GuideLink text='Demolition' page='demolish' />
                </Group>
                <h4>Finances</h4>
                <Group>
                    <GuideLink text='Black Market' page='Black%20Market' />
                    <GuideLink text='Public Market' page='Public%20Market' />
                    <GuideLink text='World Bank' page='World%20Bank' />
                    <GuideLink text='The Lottery' page='Lottery' />

                </Group>
                <h4>Foreign Affairs</h4>
                <Group>
                    <GuideLink text='Sending Foreign Aid' page='Aid' />
                    <GuideLink text='Clans' page='Clans' />
                    <GuideLink text='Clan Forum' page='Forum' />
                    <GuideLink text='Your Army' page='Army' />
                    <GuideLink text='Casting Spells' page='Magic%20Center' />
                    <GuideLink text='Intel Center' page='Intel' />
                </Group>
                <h4>Management</h4>
                <Group>
                    <GuideLink text='Your Mailbox' page='Mailbox' />
                    <GuideLink text='Managing Your Account' page='Account' />
                    <GuideLink text='Managing Your Empire' page='Manage%20Empire' />
                    <GuideLink text='Managing Your Clan' page='Manage%20Clan' />
                </Group>

            </div>
        </div>
    )
}