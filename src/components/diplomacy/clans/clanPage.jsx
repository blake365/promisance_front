// forms to create and join a clan
import { Group, Title, Text } from "@mantine/core"

import CreateClan from "./createClan"
import JoinClan from "./joinClan"
import MyClan from "./myClan"
import { useSelector } from "react-redux"
import { TURNS_PROTECTION } from "../../../config/config"

// if in a clan, show clan info, clan members, clan chat
function ClanPage()
{
    const { empire } = useSelector((state) => state.empire)
    const { time } = useSelector((state) => state.time)

    let disabled = false
    if (empire.turnsUsed < TURNS_PROTECTION || empire.mode === 'demo') {
        disabled = true
    }

    let roundStatus = false
    let upcoming = time.start - time.time
    let remaining = time.end - time.time

    if (upcoming > 0) {
        roundStatus = true
    } else if (remaining < 0 || remaining / 1000 / 60 / 60 < 24) {
        roundStatus = true
    } else {
        roundStatus = false
    }


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