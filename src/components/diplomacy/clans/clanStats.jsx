// clan scoreboard
import { Stack, Title, Loader } from '@mantine/core'
import { useState, useEffect } from 'react'

import ScoreCard from './scoreCard'
import { Axios } from 'axios'

export default function ClanStats()
{

    const dispatch = useDispatch()

    const [loading, setLoading] = useState(false)
    const [clans, setClans] = useState(null)
    const [members, setMembers] = useState(null)
    // console.log(scores)

    useEffect(() =>
    {
        setLoading(true)

        async function fetchScores()
        {
            const clans = await Axios.get('/api/clans/getClans')
            console.log(clans.data)
            // setClans(clans.data)


        }
        // fetch clans

        // fetch empires in clans


        setLoading(false)
    }, [])


    return (
        <main>
            <Stack spacing='sm' align='center'>
                <Title order={1} align='center'>
                    Clans Stats
                </Title>
                {loading && <Loader />}
                {scores && scores.map(empire =>
                {
                    return <ScoreCard empire={empire} myId={myId} key={empire.id} home={false} />
                })}

            </Stack>
        </main>
    )
}
