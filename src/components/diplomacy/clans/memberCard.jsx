import { Title, Card, Avatar, Tabs, Text, Group, Indicator, Collapse, Image } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { raceArray } from '../../../config/races'
import { eraArray } from '../../../config/eras'
import { Mountains, Scales, Hourglass } from "@phosphor-icons/react"
import ScoresNews from '../../news/scoresNews'
import Intel from '../intel'
import { useEffect, useState } from 'react'
import Axios from 'axios'
import ScoresAid from '../scoresAid'

const MemberCard = ({ empire, myId, clan }) =>
{
    const [active, setActive] = useState(false)
    const [opened, { toggle }] = useDisclosure(false);
    // console.log(empire)

    const checkForSession = async () =>
    {
        try {
            const res = await Axios.get(`/session/${empire.id}`)
            // console.log(res)
            return res.data
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() =>
    {
        const now = new Date()
        const actionDate = new Date(empire.lastAction.replace(' ', 'T'))

        // console.log(now - actionDate)
        if (now - actionDate < 1200000) {
            setActive(true)
        }

        checkForSession().then((res) =>
        {
            if (res.length > 0) {
                setActive(true)
            }
        })
    }, [])


    let color = ''
    let disabled = false

    if (empire.turnsUsed <= 200) {
        color = 'lightgreen'
        disabled = true
    }
    if (empire.mode === 'demo') {
        color = 'brown'
    }
    if (empire.id === myId) {
        color = 'deepskyblue'
    }

    if (empire.id === myId) {
        disabled = true
    }

    // console.log(typeof home)
    // let actionDate = new Date()
    // console.log(empire.lastAction)

    let actionDate = new Date(empire.lastAction.replace(' ', 'T'))
    // console.log(actionDate)
    // console.log(clan)

    return (
        <Card shadow="sm" radius="sm" sx={{ width: '100%', }} key={empire.id} withBorder >
            <Card.Section sx={{ height: '2px' }}>
            </Card.Section>
            <Card.Section onClick={toggle} sx={{ cursor: 'pointer' }}>
                <Group spacing="xs" my='xs'>
                    <Group w='100%' noWrap>
                        <Text mx='xs' align='center' sx={{ width: 25 }} weight='bolder'>
                            {empire.rank}
                        </Text>
                        <Indicator color='blue' position='top-start' disabled={!active}>
                            <Group spacing='xs' noWrap>
                                <Avatar size="sm" src={empire.profileIcon} sx={(theme) => theme.colorScheme === 'dark' ? ({ filter: 'invert(1)', opacity: '75%' }) : ({ filter: 'invert(0)', })} />
                                <Title order={4} color={color}>
                                    {empire.name} (#{empire.id}) {clan && clan}
                                </Title>
                            </Group>
                        </Indicator>
                    </Group>
                    <Group spacing='lg'>
                        <Group ml='sm' sx={{ width: '180px' }} noWrap>
                            <Scales size={22} weight='fill' />
                            <Text>${empire.networth.toLocaleString()}</Text></Group>
                        <Group ml='sm' spacing='xs' noWrap sx={{ width: '100px' }}>
                            <Mountains size={22} weight='fill' />
                            <Text>{empire.land.toLocaleString()}</Text></Group>
                        <Group ml='sm' spacing='xs' noWrap sx={{ width: '100px' }}>
                            <Hourglass size={22} weight='regular' />
                            <Text>{eraArray[empire.era].name}</Text></Group>
                        <Group ml='sm' spacing='xs' noWrap sx={{ width: '100px' }}>
                            <Image src={`/icons/${raceArray[empire.race].name.toLowerCase()}.svg`} height={22} width={22} fit='contain' sx={(theme) => theme.colorScheme === 'dark' ? ({ filter: 'invert(1)', opacity: '75%' }) : ({ filter: 'invert(0)', })} />
                            {/* <img src={`/icons/${raceArray[empire.race].name.toLowerCase()}.svg`} alt={raceArray[empire.race].name} height={22} /> */}
                            <Text>{raceArray[empire.race].name}</Text>
                        </Group>

                    </Group>
                </Group>
            </Card.Section>


            <Collapse in={opened}>
                <Text size='sm'>Last Action: {actionDate.toLocaleString()}</Text>
                <Text>{empire.profile}</Text>
                <Tabs defaultValue="" keepMounted={false}>
                    <Tabs.List>
                        <Tabs.Tab value="Recent News" >Recent News</Tabs.Tab>
                        <Tabs.Tab value="Intel" >Stats</Tabs.Tab>
                        <Tabs.Tab value="Send Aid" disabled={disabled}>Send Aid</Tabs.Tab>
                    </Tabs.List>

                    <Tabs.Panel value="Intel" pt="xs">
                        <Intel empire={empire} />
                    </Tabs.Panel>

                    <Tabs.Panel value="Trade" pt="xs">
                        Trade tab content
                    </Tabs.Panel>

                    <Tabs.Panel value="Send Aid" pt="xs">
                        <ScoresAid friend={empire} />
                    </Tabs.Panel>

                    <Tabs.Panel value="Recent News" pt="xs">
                        <ScoresNews enemy={empire} />
                    </Tabs.Panel>
                </Tabs>
            </Collapse>

            <Card.Section sx={{ height: '2px' }}>
            </Card.Section>
        </Card>
    )
}

export default MemberCard