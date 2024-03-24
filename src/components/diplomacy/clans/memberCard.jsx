import { Title, Card, Avatar, Tabs, Text, Group, Indicator, Collapse, Image, ThemeIcon, Tooltip, RingProgress, Center, Stack } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { raceArray } from '../../../config/races'
import { eraArray } from '../../../config/eras'
import { Mountains, Scales, Hourglass } from "@phosphor-icons/react"
import ScoresNews from '../../news/scoresNews'
import Intel from '../intel'
import { useEffect, useState } from 'react'
import Axios from 'axios'
import ScoresAid from '../scoresAid'
import { ShieldStar, Sword, CalendarCheck, HourglassMedium } from '@phosphor-icons/react'
import ClanRole from './clanRole'
import { useSelector } from 'react-redux'
import { ROUND_END, ROUND_START } from '../../../config/config'

const MemberCard = ({ empire, myId, clan, clanString }) =>
{
    const [active, setActive] = useState(false)
    const [opened, { toggle }] = useDisclosure(false)
    const [effects, setEffects] = useState(null)
    // console.log(empire)
    const { time } = useSelector((state) => state.time)

    const checkForSession = async () =>
    {
        try {
            const res = await Axios.get(`/session/${empire.id}`)
            // console.log(res.data)
            return res.data
        } catch (error) {
            console.log(error)
        }
    }

    const getEffects = async () =>
    {
        try {
            const effects = await Axios.post('/empire/effects', { empireId: empire.id, clanId: clan.id })
            return { effects: effects.data }
        } catch (error) {
            console.log(error)
        }
    }

    const now = new Date()

    useEffect(() =>
    {

        const actionDate = new Date(empire.lastAction.replace(' ', 'T'))

        // console.log(now - actionDate)
        if (now - actionDate < 300000) {
            setActive(true)
        }

        checkForSession().then((res) =>
        {
            if (res.result) {
                setActive(true)
            }
        })

        getEffects().then((res) =>
        {
            // console.log(res.effects)
            setEffects(res.effects)
        })

    }, [])


    let color = ''
    let disabled = false
    // console.log(clan.split(' ')[2])
    if (empire.id === myId) {
        color = 'deepskyblue'
    }

    if (empire.id === myId) {
        disabled = true
    }

    let role = clanString.split(' ')[2]

    let upcoming = ROUND_START - time
    let remaining = ROUND_END - time

    if (upcoming > 0) {
        disabled = true
    } else if (remaining < 0) {
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
                                    {empire.name} {clanString && clanString}
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
                        {effects &&
                            (<Group spacing='xs' ml='sm'>
                                {effects.map(effect =>
                                {
                                    let effectAge = (now.valueOf() - new Date(effect.updatedAt).getTime()) / 60000
                                    // age in minutes
                                    // console.log(effectAge)
                                    effectAge = Math.floor(effectAge)

                                    let remaining = effect.empireEffectValue - effectAge
                                    let percentRemaining = remaining / effect.empireEffectValue * 100

                                    let color = 'green'
                                    let icon = ''
                                    if (effect.empireEffectName === 'spell shield') {
                                        icon = <ShieldStar />
                                    } else if (effect.empireEffectName === 'attack boost') {
                                        icon = <Sword />
                                    } else if (effect.empireEffectName === 'time gate') {
                                        icon = <CalendarCheck />
                                    } else if (effect.empireEffectName === 'era delay') {
                                        icon = <HourglassMedium />
                                        color = 'red'
                                    }
                                    if (effect.empireEffectName === 'bonus turns' || effect.empireEffectName === 'join clan' || effect.empireEffectName === 'leave clan') {
                                        return
                                    }

                                    return (
                                        <Tooltip withinPortal
                                            label={
                                                <Stack spacing={0} align='center'>
                                                    <div>{effect.empireEffectName.toUpperCase()}</div>
                                                    <div>{Math.round(remaining / 60) + ' hours remaining'}</div>
                                                </Stack>
                                            } withArrow events={{ hover: true, focus: false, touch: true }} key={effect.id}>
                                            <RingProgress
                                                thickness={4}
                                                sections={[{ value: percentRemaining, color: color }]}
                                                size={39}
                                                label={
                                                    <Center>
                                                        <ThemeIcon size="sm" radius="lg" color={color}>
                                                            {icon}
                                                        </ThemeIcon>
                                                    </Center>
                                                } />
                                        </Tooltip>
                                    )
                                })}
                            </Group>)}
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
                        <Tabs.Tab value="Role">Role</Tabs.Tab>
                    </Tabs.List>

                    <Tabs.Panel value="Intel" pt="xs">
                        <Intel empire={empire} />
                    </Tabs.Panel>

                    <Tabs.Panel value="Role" pt="xs">
                        <ClanRole member={empire} role={role} clan={clan} />
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