import { Title, Card, Avatar, Badge, Text, Tooltip, Group, Indicator, Collapse, Button } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { raceArray } from '../config/races'
import { eraArray } from '../config/eras'
import { useState } from 'react'

import { Mountains, Scales, Hourglass, Alien } from "@phosphor-icons/react"
import ScoresAttack from './diplomacy/scoresAttack'



const ScoreCard = ({ empire, myId }) =>
{

    const [opened, { toggle }] = useDisclosure(false);
    const [openedAttack, setOpenedAttack] = useState(false);


    let bgColor = 'white'
    if (empire.id === myId) {
        bgColor = 'blue'
    }

    return (
        <Card shadow="sm" radius="xs" sx={{ width: '100%', }} key={empire.id}  >
            <Card.Section sx={{ backgroundColor: bgColor, height: '4px' }}>
            </Card.Section>

            <Card.Section onClick={toggle} sx={{ cursor: 'pointer' }}>
                <Group spacing="xs" my='xs'>
                    <Text mx='xs' align='center' sx={{ width: 25 }} weight='bolder'>
                        {empire.rank}
                    </Text>
                    <Indicator color='blue' position='top-start' disabled>
                        <Group spacing='xs' sx={{ width: '250px', overflow: 'scroll' }} noWrap>
                            <Avatar size="md" />
                            <Title order={4} >
                                {empire.name}(#{empire.id})
                            </Title>
                        </Group>
                    </Indicator>
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
                            <Alien size={22} weight='regular' />
                            <Text>{raceArray[empire.race].name}</Text>
                        </Group>
                        <Group ml='sm' spacing='xs' noWrap>
                            <Text>{empire.turnsUsed.toLocaleString()}</Text>
                        </Group>
                    </Group>
                </Group>
            </Card.Section>
            <Collapse in={opened}>
                <Text>{empire.profile}</Text>
                <Group spacing='xs'>
                    <Button size='xs' compact disabled={empire.id === myId}>Send Message</Button>
                    <Button onClick={() => setOpenedAttack(!openedAttack)} size='xs' compact disabled={empire.id === myId}>Attack</Button>
                    <Button size='xs' compact disabled={empire.id === myId}>Cast Spell</Button>
                    <Button size='xs' compact disabled={empire.id === myId}>Trade</Button>
                    <Button size='xs' compact disabled={empire.id === myId}>Send Aid</Button>
                    <Button size='xs' compact>Recent News</Button>
                </Group>
                <Collapse in={openedAttack}>
                    <ScoresAttack enemy={empire} />
                </Collapse>
            </Collapse>

            <Card.Section sx={{ backgroundColor: 'white', height: '4px' }}>
            </Card.Section>
        </Card>
    )
}

export default ScoreCard