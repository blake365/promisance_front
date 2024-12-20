import { Title, Card, Text, Group, Collapse, Stack, Button, ThemeIcon } from '@mantine/core'
import { useDisclosure, useMediaQuery } from '@mantine/hooks'
import { Crown, Scales, UsersThree } from "@phosphor-icons/react"
import { useEffect, useState } from 'react'
import Axios from 'axios'
import ScoreCard from '../../scoreCard'
import { Sword, Handshake } from '@phosphor-icons/react'
import { useSelector } from 'react-redux'
import { useLoadEmpire } from '../../../hooks/useLoadEmpire'
import { showNotification } from '@mantine/notifications'
import { useTranslation } from 'react-i18next'

const ClanCard = ({ index, clan, officer, myClan, empireId, scores }) =>
{
    const uuid = useSelector((state) => state.empire.empire.uuid)
    const loadEmpire = useLoadEmpire(uuid)
    const [opened, { toggle }] = useDisclosure(false);
    const [loading, setLoading] = useState(false)
    const [members, setMembers] = useState([])
    const { t, i18n } = useTranslation(['diplomacy'])
    const isLargeScreen = useMediaQuery('(min-width: 1024px)');

    // console.log(clan.clan)
    const body = {
        clanId: clan.clan.id,
    }

    // console.log(empire)
    useEffect(() =>
    {
        setLoading(true)
        async function fetchMembers()
        {
            const members = await Axios.post('/clans/getMembers', body)
            // console.log(members.data)
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

    const declareWar = async () =>
    {
        console.log('declaring war');
        try {
            const res = await Axios.post(`/clans/declareWar?lang=${i18n.language}`, { clanId: myClan.id, enemyClanId: clan.clan.id, empireId: empireId });
            console.log(res);
            showNotification({
                title: t('diplomacy:clans.warDeclared'),
                color: 'red',
            });
            loadEmpire();
        } catch (error) {
            console.log(error);
            showNotification({
                title: t('diplomacy:clans.errorDeclaringWar'),
                color: 'orange',
            });
        }
    };

    const offerPeace = async () =>
    {
        console.log('offering peace')
        try {
            const res = await Axios.post(`/clans/offerPeace?lang=${i18n.language}`, { clanId: myClan.id, enemyClanId: clan.clan.id, empireId: empireId })
            console.log(res.data)
            // return res.data
            showNotification({
                title: t('diplomacy:clans.peaceOffered'),
                color: 'green',
            })
            loadEmpire()
        }
        catch (error) {
            console.log(error)
            showNotification({
                title: t('diplomacy:clans.errorOfferingPeace'),
                color: 'orange',
            })
        }
    }

    let atWar = false
    let peaceOfferedMe = false
    let peaceOfferedEnemy = false

    if (myClan) {
        // console.log(myClan)
        // console.log(clan.clan)
        const myRelations = myClan.relation.map((relation) =>
        {
            if (relation.clanRelationFlags === 'war') {
                return relation.c_id2
            }
        })

        // console.log(myRelations)

        if (myRelations.includes(clan.clan.id)) {
            atWar = true
        }

        const peaceOffers = myClan.relation.map((relation) =>
        {
            if (relation.clanRelationFlags === 'peace') {
                return relation.c_id2
            }
        })

        // console.log(peaceOffers)
        if (peaceOffers.includes(clan.clan.id)) {
            peaceOfferedMe = true
        }

        const enemyPeaceOffers = clan.clan.relation.map((relation) =>
        {
            if (relation.clanRelationFlags === 'peace') {
                return relation.c_id2
            }
        })

        if (enemyPeaceOffers.includes(myClan.id)) {
            peaceOfferedEnemy = true
        }

    }



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
                                {clan.clan.clanName} {clan.clan.clanTag ? `[${clan.clan.clanTag}]` : clan.clan.clanName.slice(0, 4)}
                            </Title>
                        </Group>

                    </Group>
                    <Group ml='sm' noWrap spacing='xs'>
                        <Crown size={22} weight='fill' />
                        <Text>{clan.leader.name}</Text>
                    </Group>
                    <Group spacing='lg'>
                        <Group ml='sm' spacing='xs' noWrap >
                            <UsersThree size={22} weight='fill' />
                            <Text>{clan.clan.clanMembers}</Text></Group>
                        <Group ml='sm' spacing='xs' noWrap >
                            <Text weight='bold'>Avg</Text><Scales size={22} weight='fill' />
                            <Text>${Math.round(clan.avgNetworth).toLocaleString()}</Text></Group>
                        <Group ml='sm' spacing='xs' noWrap >
                            <Text weight='bold'>Total</Text><Scales size={22} weight='fill' />
                            <Text>${clan.totalNetworth.toLocaleString()}</Text>
                        </Group>
                    </Group>
                    {scores ? ('') : (
                        <Group>
                            {/* if clan is in enemies list, option to offer peace, else option to declare war */}
                            {atWar ? (
                                peaceOfferedMe ? (
                                    <Group ml='lg'>
                                        <ThemeIcon size="md" radius="sm" color='red' >
                                            <Sword />
                                        </ThemeIcon>
                                        <Text color='green' weight='bold'>{t('diplomacy:clans.youOfferedPeace')}</Text>
                                    </Group>
                                ) : (
                                    peaceOfferedEnemy ? (<Group ml='lg'>
                                        <ThemeIcon size="md" radius="sm" color='red' >
                                            <Sword />
                                        </ThemeIcon>
                                        <Button size='sm' disabled={!officer} compact color='green' leftIcon={<Handshake />} onClick={() =>
                                        {
                                            offerPeace()
                                        }}>
                                            {t('diplomacy:clans.acceptPeace')}
                                        </Button>
                                    </Group>) : (
                                        <Group ml='lg'>
                                            <ThemeIcon size="md" radius="sm" color='red' >
                                                <Sword />
                                            </ThemeIcon>
                                            <Button size='sm' disabled={!officer} compact color='green' leftIcon={<Handshake />} onClick={() =>
                                            {
                                                offerPeace()
                                            }}>
                                                {t('diplomacy:clans.offerPeace')}
                                            </Button>
                                        </Group>
                                    )
                                )) : (
                                <Button size='sm' disabled={!officer} compact color='red' ml='lg' leftIcon={<Sword />} onClick={() =>
                                {
                                    declareWar()
                                }}>
                                    {t('diplomacy:clans.declareWar')}
                                </Button>
                            )}
                        </Group>)}
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