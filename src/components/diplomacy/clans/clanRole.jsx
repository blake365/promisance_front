import
{
    Center,
    Stack,
    Accordion,
    Group,
    Button,
    Text
} from '@mantine/core'
import { useEffect, useState } from 'react'
import Axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'

import Intel from '../intel'

export default function ClanRole({ member, role, clan })
{
    const { empire } = useSelector((state) => state.empire)
    // if you are the leader, you can promote to assistant, demote to member, or remove from clan
    console.log(clan)
    console.log(member)
    // if you are assistant or member, you cannot do anything
    console.log(role)

    let permission = false
    if (empire.id === clan.empireIdLeader) {
        permission = true
    }

    // promote to assistant

    // demote to member

    // remove from clan

    return (
        <section>
            <Text>Current Role: {role}</Text>
            {permission &&
                <Group p='sm'>
                    {role === 'member' ? (<Button>Promote to Assistant</Button>) : null}
                    {role === 'assistant' ? (<Button color='red'>Demote to Member</Button>) : null}
                    {member.id !== empire.id && <Button color='red'>Remove from Clan</Button>}
                </Group>}
        </section>
    )
}