import
{
    Group,
    Button,
    Text
} from '@mantine/core'
import Axios from 'axios'
import { useSelector } from 'react-redux'
import { useLoadEmpire } from '../../../hooks/useLoadEmpire'


export default function ClanRole({ member, role, clan })
{
    const { empire } = useSelector((state) => state.empire)
    const loadEmpire = useLoadEmpire(empire.uuid)
    // if you are the leader, you can promote to assistant, demote to member, or remove from clan
    // console.log(clan)
    // console.log(member)
    // if you are assistant or member, you cannot do anything
    // console.log(role)

    let permission = false
    if (empire.id === clan.empireIdLeader) {
        permission = true
    }

    // promote to assistant
    const promote = async () =>
    {
        try {
            const res = await Axios.post('/clans/assignRole', { memberId: member.id, clanRole: 'assistant', empireId: empire.id })
            // console.log(res)
            loadEmpire()
        } catch (error) {
            console.log(error)
        }
    }
    // demote to member
    const demote = async () =>
    {
        try {
            const res = await Axios.post('/clans/removeRole', { memberId: member.id, clanRole: role.toLowerCase(), empireId: empire.id })
            // console.log(res)
            loadEmpire()
        } catch (error) {
            console.log(error)
        }
    }
    // remove from clan
    const remove = async () =>  
    {
        try {
            const res = await Axios.post(`/clans/kick?gameId=${empire.game_id}`, { empireId: member.id })
            // console.log(res)
            loadEmpire()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <section>
            <Text>Current Role: {role}</Text>
            {permission &&
                <Group p='sm'>
                    {role === 'member' ? (<Button onClick={promote}>Promote to Assistant</Button>) : null}
                    {role === 'Assistant' ? (<Button onClick={demote} color='red'>Demote to Member</Button>) : null}
                    {member.id !== empire.id && <Button onClick={remove} color='red'>Remove from Clan</Button>}
                </Group>}
        </section>
    )
}