import { Title, Card, Avatar, Tabs, Text, Tooltip, Group, Indicator, Collapse } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { raceArray } from '../config/races'
import { eraArray } from '../config/eras'

import { Mountains, Scales, Hourglass, Alien } from "@phosphor-icons/react"
import ScoresAttack from './diplomacy/scoresAttack'
import ScoresSpell from './diplomacy/scoresSpell'
import ScoresNews from './news/scoresNews'
import ScoresIntel from './diplomacy/scoresIntel'


const ScoreCard = ({ empire, myId }) =>
{

    const [opened, { toggle }] = useDisclosure(false);

    let bgColor = 'white'
    if (empire.id === myId) {
        bgColor = 'blue'
    }

    let disabled = false
    if (empire.id === myId) {
        disabled = true
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
                <Tabs defaultValue="" keepMounted={false}>
                    <Tabs.List>
                        <Tabs.Tab value="Send Message" disabled={disabled}>Send Message</Tabs.Tab>
                        <Tabs.Tab value="Attack" disabled={disabled}>Attack</Tabs.Tab>
                        <Tabs.Tab value="Cast Spell" disabled={disabled}>Cast Spell</Tabs.Tab>
                        <Tabs.Tab value="Intel" disabled={disabled}>Intel</Tabs.Tab>
                        <Tabs.Tab value="Trade" disabled={disabled}>Trade</Tabs.Tab>
                        <Tabs.Tab value="Send Aid" disabled={disabled}>Send Aid</Tabs.Tab>
                        <Tabs.Tab value="Recent News" disabled={disabled}>Recent News</Tabs.Tab>
                    </Tabs.List>

                    <Tabs.Panel value="Send Message" pt="xs">
                        Send Message tab content
                    </Tabs.Panel>

                    <Tabs.Panel value="Attack" pt="xs">
                        <ScoresAttack enemy={empire} />
                    </Tabs.Panel>

                    <Tabs.Panel value="Cast Spell" pt="xs">
                        <ScoresSpell enemy={empire} />
                    </Tabs.Panel>

                    <Tabs.Panel value="Intel" pt="xs">
                        <ScoresIntel enemy={empire} />
                    </Tabs.Panel>

                    <Tabs.Panel value="Trade" pt="xs">
                        Trade tab content
                    </Tabs.Panel>

                    <Tabs.Panel value="Send Aid" pt="xs">
                        Send Aid tab content
                    </Tabs.Panel>

                    <Tabs.Panel value="Recent News" pt="xs">
                        <ScoresNews enemy={empire} />
                    </Tabs.Panel>
                </Tabs>
            </Collapse>

            <Card.Section sx={{ backgroundColor: 'white', height: '4px' }}>
            </Card.Section>
        </Card>
    )
}

export default ScoreCard