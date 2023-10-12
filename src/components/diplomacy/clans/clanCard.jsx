import { Title, Card, Text, Group, Collapse, Stack } from '@mantine/core'
import { useDisclosure, useMediaQuery } from '@mantine/hooks'
import { Crown, Scales, UsersThree } from "@phosphor-icons/react"
import { useEffect, useState } from 'react'
import Axios from 'axios'
import ScoreCard from '../../scoreCard'

const ClanCard = ({ index, clan }) =>
{

    const [opened, { toggle }] = useDisclosure(false);
    const [loading, setLoading] = useState(false)
    const [members, setMembers] = useState([])

    const isLargeScreen = useMediaQuery('(min-width: 1024px)');

    // console.log(clan.clan)
    let body = {
        clanId: clan.clan.id,
    }
    // console.log(empire)
    useEffect(() =>
    {
        setLoading(true)
        async function fetchMembers()
        {
            const members = await Axios.post('/clans/getMembers', body)
            console.log(members.data)
            return members.data
        }

        // fetch clans
        if (clan.clan.id) {
            fetchMembers().then((data) =>
            {
                setMembers(data)
            }).catch((error) =>
            {
                console.error('Error setting members data:', error);
                setLoading(false);
            })
        }

        setLoading(false)
    }, [])

    // console.log(members)
    return (
        <Card shadow="sm" radius="sm" sx={{ width: isLargeScreen ? '800px' : '100%', maxWidth: '100%', margin: '0 auto' }} key={clan.id} withBorder >
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
                                {clan.clan.clanName}
                            </Title>
                        </Group>
                        <Group ml='sm' noWrap spacing='xs'>
                            <Crown size={22} weight='fill' />
                            <Text>{clan.leader.name}</Text></Group>
                    </Group>
                    <Group spacing='lg'>

                        <Group ml='sm' spacing='xs' noWrap >
                            <UsersThree size={22} weight='fill' />
                            <Text>{clan.clan.clanMembers}</Text></Group>
                        <Group ml='sm' spacing='xs' noWrap >
                            <Text weight='bold'>Avg</Text><Scales size={22} weight='fill' />
                            <Text>{Math.round(clan.avgNetworth).toLocaleString()}</Text></Group>
                        <Group ml='sm' spacing='xs' noWrap >
                            <Text weight='bold'>Total</Text><Scales size={22} weight='fill' />
                            <Text>{clan.totalNetworth.toLocaleString()}</Text>
                        </Group>
                    </Group>
                </Group>
            </Card.Section>


            <Collapse in={opened}>
                <Stack spacing='xs' mb='sm' maw={'100%'}>
                    {!loading ? (members.map((member, index) =>
                        <ScoreCard empire={member} key={index} myId={null} clan={null} home />)) : (<Text>Loading...</Text>
                    )}
                </Stack>
            </Collapse>

            <Card.Section sx={{ height: '2px' }}>
            </Card.Section>
        </Card>
    )
}

export default ClanCard