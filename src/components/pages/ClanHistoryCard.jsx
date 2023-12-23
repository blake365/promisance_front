import { Title, Card, Text, Group, Collapse, Stack } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { Crown, Scales, UsersThree } from "@phosphor-icons/react"
import { useEffect, useState } from 'react'
import Axios from 'axios'
import HistoryCard from './HistoryCard'

const ClanHistoryCard = ({ clan, index }) =>
{

    const [opened, { toggle }] = useDisclosure(false);
    const [loading, setLoading] = useState(false)
    const [members, setMembers] = useState([])

    // console.log(empire)
    useEffect(() =>
    {
        setLoading(true)
        async function fetchMembers()
        {
            const members = await Axios.get(`/archives/empires/${clan.clanHistory_id}`)
            console.log(members.data)
            return members.data
        }

        fetchMembers().then((data) =>
        {
            setMembers(data)
        }).catch((error) =>
        {
            console.error('Error setting members data:', error);
            setLoading(false);
        })

        setLoading(false)
    }, [])

    // console.log(members)
    return (
        <Card shadow="sm" my='sm' radius="sm" sx={{ width: '100%', maxWidth: 600 }} key={clan.id} withBorder >
            <Card.Section sx={{ height: '2px' }}>
            </Card.Section>
            <Card.Section onClick={toggle} sx={{ cursor: 'pointer' }}>
                <Group spacing="xs" my='xs'>
                    <Group w='100%' noWrap>
                        <Text mx='xs' align='center' sx={{ width: 25 }} weight='bolder' size='xl'>
                            {index + 1}
                        </Text>
                        <Group spacing='xs' noWrap>
                            <Title order={3} >
                                {clan.clanHistoryName}
                            </Title>
                        </Group>
                        <Group ml='sm' noWrap spacing='xs'>
                            <Crown size={22} weight='fill' />
                            {/* <Text>{clan.leader.name}</Text> */}
                        </Group>
                    </Group>
                    <Group spacing='lg'>
                        <Group ml='sm' spacing='xs' noWrap >
                            <UsersThree size={22} weight='fill' />
                            <Text>{clan.clanHistoryMembers}</Text></Group>
                        <Group ml='sm' spacing='xs' noWrap >
                            <Text weight='bold'>Avg</Text><Scales size={22} weight='fill' />
                            <Text>${Math.round(clan.clanHistoryTotalNet / clan.clanHistoryMembers).toLocaleString()}</Text></Group>
                        <Group ml='sm' spacing='xs' noWrap >
                            <Text weight='bold'>Total</Text><Scales size={22} weight='fill' />
                            <Text>${Number(clan.clanHistoryTotalNet).toLocaleString()}</Text>
                        </Group>
                    </Group>
                </Group>
            </Card.Section>

            <Collapse in={opened}>
                <Stack spacing='xs' mb='sm' maw={'100%'}>
                    {!loading ? (members.map((member, index) =>
                        <HistoryCard empire={member} key={index} />)) : (<Text>Loading...</Text>
                    )}
                </Stack>
            </Collapse>

            <Card.Section sx={{ height: '2px' }}>
            </Card.Section>
        </Card>
    )
}

export default ClanHistoryCard