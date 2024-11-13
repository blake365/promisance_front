// clan scoreboard
import { Stack, Title, Loader, Card, Button } from '@mantine/core'
import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import Axios from 'axios'
import ClanCard from './clanCard'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function ClanStats()
{
    const { t } = useTranslation('diplomacy')
    const [loading, setLoading] = useState(false)
    const [clans, setClans] = useState(null)
    // console.log(scores)
    const { game_id } = useSelector(state => state.games.activeGame)

    useEffect(() =>
    {
        setLoading(true)

        async function fetchScores()
        {
            const clans = await Axios.get(`/clans/getClansData?gameId=${game_id}`)
            // console.log(clans.data)
            setClans(clans.data)
        }
        // fetch clans
        fetchScores()

        setLoading(false)
    }, [])


    return (
        <main>
            <Stack spacing='sm' align='center'>
                <Title order={1} align='center'>
                    {t('diplomacy:clans.clanStats')}
                </Title>
                {loading && <Loader />}
                {clans ?
                    <Stack spacing='sm'>
                        {clans.sort((a, b) => b.avgNetworth - a.avgNetworth).map((clan, index) =>
                        {
                            // console.log(clan)
                            return (
                                <ClanCard clan={clan} index={index} key={clan.clan.id} scores />
                            )
                        })}
                    </Stack> : <Card>
                        <Stack align='center'>
                            <Title order={4}>{t('diplomacy:clans.noClans')}</Title>
                            <Link to='/app/Clans'><Button>{t('diplomacy:clans.createClan')}</Button></Link>
                        </Stack>
                    </Card>
                }
            </Stack>
        </main>
    )
}
