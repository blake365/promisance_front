// clan scoreboard
import { Stack, Title, Loader, Card, Button } from '@mantine/core'
import { useState, useEffect } from 'react'

import Axios from 'axios'
import ClanCard from './clanCard'
import { Link } from 'react-router-dom'

export default function ClanStats()
{

    const [loading, setLoading] = useState(false)
    const [clans, setClans] = useState(null)
    // console.log(scores)

    useEffect(() =>
    {
        setLoading(true)

        async function fetchScores()
        {
            const clans = await Axios.get('/clans/getClansData')
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
                    Clans Stats
                </Title>
                {loading && <Loader />}
                {clans ?
                    <Stack spacing='sm'>
                        {clans.sort((a, b) => b.avgNetworth - a.avgNetworth).map((clan, index) =>
                        {
                            return (
                                <ClanCard clan={clan} index={index} key={index} scores />
                            )
                        })}
                    </Stack> : <Card>
                        <Stack align='center'>
                            <Title order={4}>No Clans Created Yet</Title>
                            <Link to='/app/Clans'><Button>Create a Clan</Button></Link>
                        </Stack>
                    </Card>
                }
            </Stack>
        </main>
    )
}
