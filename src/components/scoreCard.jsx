import { Title, Card, Avatar, Tabs, Text, Group, Indicator, Collapse, Image } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { raceArray } from '../config/races'
import { eraArray } from '../config/eras'
import { Mountains, Scales, Hourglass, Sword, Shield, Ranking } from "@phosphor-icons/react"
import { useEffect, useState, Suspense } from 'react'
import lazy from './utilities/lazyWrapper'
const ScoresAttack = lazy(() => import('./diplomacy/scoresAttack'));
const ScoresSpell = lazy(() => import('./diplomacy/scoresSpell'));
const ScoresNews = lazy(() => import('./news/scoresNews'));
const ScoresIntel = lazy(() => import('./diplomacy/scoresIntel'));
const ScoresAid = lazy(() => import('./diplomacy/scoresAid'));
const ScoresChat = lazy(() => import('./mail/scoresChat'));
import Axios from 'axios'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
const ScoreCard = ({ empire, myEmpire, home, clan, clanTag, role }) =>
{
    const [active, setActive] = useState(false)
    const [opened, { toggle }] = useDisclosure(false);
    // console.log(empire)

    const { t } = useTranslation(['summary'])

    const { time } = useSelector((state) => state.time)
    let turnsProtection = 400
    let scoreEnabled = false
    let aidEnable = true
    if (!home) {
        turnsProtection = useSelector((state) => state.games?.activeGame.turnsProtection)
        scoreEnabled = useSelector((state) => state.games?.activeGame.scoreEnabled)
        aidEnable = useSelector((state) => state.games?.activeGame.aidEnable)
    }


    const checkForSession = async () =>
    {
        try {
            const res = await Axios.get(`/session/${empire.id}`)
            // console.log(res.data.result)
            return res.data.result
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() =>
    {
        const now = new Date()
        const actionDate = new Date(empire.lastAction.replace(' ', 'T'))

        // console.log(now - actionDate)
        if (now - actionDate < 300000) {
            // console.log('recently active')
            setActive(true)
        }

        checkForSession().then((res) =>
        {
            // console.log(res)
            if (res) {
                setActive(true)
            }
        })

    }, [])

    // console.log(myEmpire)

    let atWar = false

    if (myEmpire && empire.clanReturn?.relation) {
        if (empire.clanReturn.relation.length > 0) {
            const myRelations = empire.clanReturn.relation.map((relation) =>
            {
                if (relation.clanRelationFlags === 'war') {
                    return relation.c_id2
                }
            })
            // console.log(myRelations)
            if (myRelations.includes(myEmpire.clanId)) {
                atWar = true
            }
        }
    }

    // console.log(atWar)

    let color = ''
    let disabled = false

    if (empire.turnsUsed <= turnsProtection) {
        color = 'lightgreen'
        disabled = true
    }
    if (empire.mode === 'demo') {
        color = 'brown'
    }
    if (empire.id === myEmpire?.id) {
        color = 'deepskyblue'
    }
    if (empire.id === myEmpire?.id) {
        disabled = true
    }
    if (empire.flags === 1) {
        color = 'red'
    }
    if (empire.mode === 'admin') {
        color = 'orange'
    }

    // console.log(typeof home)
    // let actionDate = new Date()
    // console.log(empire.lastAction)

    const actionDate = new Date(empire.lastAction.replace(' ', 'T'))
    // console.log(actionDate)
    // console.log(clan)
    let upcoming = 1000
    let remaining = 1000

    if (!home) {
        upcoming = time.start - time.time
        remaining = time.end - time.time

        if (upcoming > 0) {
            disabled = true
        } else if (remaining < 0) {
            disabled = true
        }
    }

    return (
        <Card shadow="sm" radius="sm" sx={{ width: '100%', overflowX: 'hidden' }} key={empire.id} withBorder>
            <Card.Section sx={{ height: '2px' }}>
            </Card.Section>
            <Card.Section onClick={toggle} sx={{ cursor: !home ? 'pointer' : '' }}>
                <Group my='xs' spacing='xs'>
                    <Group w='100%' noWrap >
                        <Text mx='xs' align='center' sx={{ width: 25 }} weight='bolder'>
                            {empire.rank}
                        </Text>
                        <Indicator color='blue' position='top-start' disabled={!active}>
                            <Group spacing='xs' noWrap>
                                <Avatar size="sm" alt={empire.profileIcon} src={empire.profileIcon} sx={(theme) => theme.colorScheme === 'dark' ? ({ filter: 'invert(1)', opacity: '75%' }) : ({ filter: 'invert(0)', })} imageProps={{ loading: 'lazy' }} />
                                <Title order={4} color={color}>
                                    {empire.name} {!clanTag
                                        ? !clan ? (null) : `[${clan.slice(0, 4)}]`
                                        : `[${clanTag}]`}
                                </Title>
                            </Group>
                        </Indicator>
                    </Group>
                    <Group sx={{ gap: '7px' }}>
                        {scoreEnabled && (
                            <Group ml="xs" sx={{ width: "90px" }} spacing={3} noWrap >
                                <Ranking size={22} weight="fill" />
                                <Text>
                                    {empire.score}
                                </Text>
                            </Group>
                        )}
                        <Group ml='xs' sx={{ width: '160px' }} spacing={3} noWrap>
                            <Scales size={22} weight='fill' />
                            <Text>${empire.networth.toLocaleString()}</Text></Group>

                        <Group ml='xs' spacing={3} noWrap sx={{ width: '100px' }}>
                            <Mountains size={22} weight='fill' />
                            <Text>{empire.land.toLocaleString()}</Text></Group>
                        <Group ml='xs' spacing={3} noWrap sx={{ width: '90px' }}>
                            <Hourglass size={22} weight='regular' />
                            <Text>{eraArray[empire.era].name}</Text></Group>
                        <Group ml='xs' spacing={5} noWrap sx={{ width: '100px' }}>
                            <Image src={`/icons/${raceArray[empire.race].name.toLowerCase()}.svg`} height={22} width={22} fit='contain' sx={(theme) => theme.colorScheme === 'dark' ? ({ filter: 'invert(1)', opacity: '75%' }) : ({ filter: 'invert(0)', })} alt={raceArray[empire.race].name.toLowerCase()} />
                            {/* <img src={`/icons/${raceArray[empire.race].name.toLowerCase()}.svg`} alt={raceArray[empire.race].name} height={22} /> */}
                            <Text>{raceArray[empire.race].name}</Text>
                        </Group>
                        <Group ml='xs' spacing={3} noWrap sx={{ width: '90px' }}>
                            {/* <img src={`/icons/${raceArray[empire.race].name.toLowerCase()}.svg`} alt={raceArray[empire.race].name} height={22} /> */}
                            <Text>DR: {Math.round(empire.diminishingReturns * 100) / 100}%</Text>
                        </Group>
                    </Group>
                </Group>
            </Card.Section>

            {!home &&
                <Collapse in={opened}>
                    <Group>
                        <Text size='sm'>{t('summary:card.lastAction', { time: actionDate.toLocaleString() })} </Text>
                        <Group ml='xs' spacing='xs' noWrap>
                            <Sword size={22} weight='regular' />
                            <Text>{empire.offTotal} ({empire.offSucc ? Math.round(empire.offSucc / empire.offTotal * 100) : ('0')}%)</Text>
                        </Group>
                        <Group ml='xs' spacing='xs' noWrap>
                            <Shield size={22} weight='regular' />
                            <Text>{empire.defTotal} ({empire.defSucc ? Math.round(empire.defSucc / empire.defTotal * 100) : ('0')}%)</Text>
                        </Group>
                    </Group>
                    <Text>{empire.profile}</Text>
                    <Text>{clan && `${role} of ${clan}`}</Text>
                    <Suspense fallback={<div>Loading...</div>}>
                        <Tabs defaultValue="" keepMounted={false}>
                            <Tabs.List>
                                <Tabs.Tab value="Recent News" disabled={disabled}>{t('summary:card.recentNews')}</Tabs.Tab>
                                <Tabs.Tab value="Intel" disabled={disabled}>{t('summary:card.intel')}</Tabs.Tab>
                                <Tabs.Tab value="Attack" disabled={disabled}>{t('summary:card.attack')}</Tabs.Tab>
                                <Tabs.Tab value="Cast Spell" disabled={disabled}>{t('summary:card.castSpell')}</Tabs.Tab>
                                {/* <Tabs.Tab value="Trade" disabled={disabled}>Trade</Tabs.Tab> */}
                                {aidEnable && <Tabs.Tab value="Send Aid" disabled={disabled}>{t('summary:card.sendAid')}</Tabs.Tab>}
                                <Tabs.Tab value="Chat">{t('summary:card.chat')}</Tabs.Tab>
                            </Tabs.List>

                            <Tabs.Panel value="Chat" pt="xs">
                                <ScoresChat enemy={empire} />
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
                                <ScoresAid friend={empire} />
                            </Tabs.Panel>

                            <Tabs.Panel value="Recent News" pt="xs">
                                <ScoresNews enemy={empire} />
                            </Tabs.Panel>
                        </Tabs>
                    </Suspense>
                </Collapse>
            }
            <Card.Section sx={{ height: '2px' }}>
            </Card.Section>
        </Card>
    )
}

export default ScoreCard