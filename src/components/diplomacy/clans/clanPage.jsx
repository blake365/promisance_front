// forms to create and join a clan
import { Group, Title, Text } from "@mantine/core"
import CreateClan from "./createClan"
import JoinClan from "./joinClan"
import MyClan from "./myClan"
import { useSelector } from "react-redux"
import { checkRoundStatus } from "../../../functions/checkRoundStatus"

// if in a clan, show clan info, clan members, clan chat
function ClanPage()
{
    const { empire } = useSelector((state) => state.empire)
    const { turnsProtection } = useSelector((state) => state.games.activeGame)

    let disabled = false
    if (empire.turnsUsed < turnsProtection || empire.mode === 'demo') {
        disabled = true
    }

    const roundStatus = checkRoundStatus(true)

    return (
        <main>
            {empire.clanId === 0 ? (
                <div>
                    <Title order={1} align='center' sx={{ marginBottom: '1rem' }}>Clans</Title>
                    <Text align="center">Create or join a clan to team up with other players.</Text>
                    <Text align="center">Clan mates can view stats for each member, a shared news feed, shared intel, and receive a defense bonus. </Text>
                    {empire.mode === 'demo' && <Text align="center" color='red'>Clans are disabled for demo accounts.</Text>}
                    <Group position="center" mt={10}>
                        <CreateClan disabled={disabled || roundStatus} />
                        <JoinClan disabled={disabled || roundStatus} />
                    </Group>
                </div>) : (<MyClan />)}
        </main>
    )
}

export default ClanPage