// forms to create and join a clan
import { Group, Title, Text, Stack } from "@mantine/core"

import { useSelector } from "react-redux"
import { TURNS_PROTECTION } from "../../../config/config"
import { useEffect, useState } from "react"
import Axios from "axios"
import ScoreCard from "../../scoreCard"

// show clan info, clan members, clan chat
function MyClan()
{
    const { empire } = useSelector((state) => state.empire)
    const [clan, setClan] = useState(null)
    const [members, setMembers] = useState(null)

    // get clan info
    useEffect(() =>
    {
        async function getClan()
        {
            const clan = await Axios.post('/clans/get', { clanId: empire.clanId })
            console.log(clan.data)
            setClan(clan.data)

            const members = await Axios.post('/clans/getMembers', { clanId: empire.clanId })
            console.log(members.data)
            setMembers(members.data)
        }

        getClan()
    }, [])


    return (
        <section>
            {clan && <div>
                <Title order={1} align='center' sx={{ marginBottom: '1rem' }}>{clan.clanName}</Title>

                {members && <div>
                    <Title order={3} align="left" m={10}>Members</Title>
                    <Stack spacing='xs'>
                        {members.map((member, index) =>
                        {
                            // console.log(member)
                            let role = ''
                            if (member.id === clan.empireIdLeader) {
                                role = 'Leader'
                            } else if (member.id === clan.empireIdAssistant) {
                                role = 'Assistant'
                            } else if (member.id === clan.empireIdAgent1 || member.id === clan.empireIdAgent2) {
                                role = 'Agent'
                            }
                            let clanString = `${role} of ${clan.clanName}`

                            return <ScoreCard empire={member} myId={empire.id} key={member.id} home={true} clan={clanString} />
                        })}
                    </Stack>
                    {/* leader and assistant can assign roles */}

                    {/* leader and assistant can kick members */}

                    {/* show stats of each member */}
                </div>}

                {/* leader and assistant can declare war or peace */}

                {/* leader can select a clan icon */}

                {/* option to share defenses with clan mates */}

                {/* show combined news of all clan members */}
            </div>
            }
        </section>
    )
}

export default MyClan