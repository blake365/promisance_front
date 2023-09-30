// forms to create and join a clan
import { Group } from "@mantine/core"

import CreateClan from "./createClan"
import JoinClan from "./joinClan"
import { useSelector } from "react-redux"

// if in a clan, show clan info, clan members, clan chat



function ClanPage()
{
    const { empire } = useSelector((state) => state.empire)

    return (
        <main>
            {empire.clanId === 0 ? <Group><CreateClan />
                <JoinClan /></Group> : <h1>In a clan</h1>}

        </main>
    )
}

export default ClanPage