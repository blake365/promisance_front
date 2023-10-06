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

    let disabled = false
    if (empire.turnsUsed < TURNS_PROTECTION) {
        disabled = true
    }

    return (
        <main>
            {empire.clanId === 0 ? (
                <div>
                    <Title order={1} align='center' sx={{ marginBottom: '1rem' }}>Clans</Title>
                    <Text align="center">Create or join a clan to team up with other players</Text>
                    <Group position="center" mt={10}>
                        <CreateClan disabled={disabled} />
                        <JoinClan disabled={disabled} />
                    </Group>
                </div>) : (<MyClan />)}
        </main>
    )
}

export default ClanPage