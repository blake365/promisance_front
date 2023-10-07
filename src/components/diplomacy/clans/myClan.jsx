// forms to create and join a clan
import { Group, Title, Text, Stack, Tabs, Paper, Loader } from "@mantine/core"

import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import Axios from "axios"
import ScoreCard from "../../scoreCard"
import MemberCard from "./memberCard"
import ClanIntel from "./clanIntel"
import ClanNews from "./clanNews"

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
            // console.log(clan.data)
            setClan(clan.data)

            const members = await Axios.post('/clans/getMembers', { clanId: empire.clanId })
            // console.log(members.data)
            setMembers(members.data)
        }

        getClan()
    }, [empire.networth])

    let intelMembers = members && members.map((member) => member.id)
    // console.log(intelMembers)

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
                            } else {
                                role = 'member'
                            }
                            let clanString = ` - ${role} of ${clan.clanName}`

                            {/* show active effects for each member */ }
                            return <MemberCard empire={member} myId={empire.id} key={member.id} clan={clanString} />
                        })}
                    </Stack>
                    {/* leader and assistant can assign roles */}

                    {/* leader and assistant can kick members */}

                </div>}

                {/* leader and assistant can declare war or peace */}

                {/* mandatory shared defense with clan mates */}

                {/* leader and assistant can invite members */}

                {/* option to leave clan */}


                <Paper mt={20}>
                    <Tabs p='md' keepMounted='false'>
                        <Tabs.List>
                            <Tabs.Tab value="Clan Chat">
                                Clan Chat
                            </Tabs.Tab>
                            <Tabs.Tab value="Clan News">
                                Shared News
                            </Tabs.Tab>
                            <Tabs.Tab value="Clan Intel">
                                Shared Intel
                            </Tabs.Tab>
                            <Tabs.Tab value="Clan Relations">
                                Clan Relations
                            </Tabs.Tab>
                        </Tabs.List>

                        <Tabs.Panel value='Clan Chat' pt="xs">
                            Clan Chat
                        </Tabs.Panel>

                        <Tabs.Panel value='Clan News' pt="xs">
                            {/* show combined news of all clan members */}
                            {intelMembers ? (<ClanNews memberIds={intelMembers} />) : <Loader />}
                        </Tabs.Panel>

                        <Tabs.Panel value='Clan Intel' pt="xs">
                            {/* show intel of clan members */}
                            {intelMembers ? (<ClanIntel members={intelMembers} />) : <Loader />}
                        </Tabs.Panel>

                        <Tabs.Panel value='Clan Relations' pt="xs">
                            Clan Relations
                        </Tabs.Panel>

                    </Tabs>
                </Paper>
            </div>
            }
        </section>
    )
}

export default MyClan