// clan scoreboard
import { Stack, Loader } from '@mantine/core'
import { useState, useEffect } from 'react'
import Axios from 'axios'
import ClanCard from './clanCard'

export default function ClanRelations({ myClan, empireId, gameId })
{
    const [loading, setLoading] = useState(false)
    const [clans, setClans] = useState(null)
    // console.log(scores)

    useEffect(() =>
    {
        setLoading(true)
        async function fetchScores()
        {
            const clans = await Axios.get(`/clans/getClansData?gameId=${gameId}`)
            // console.log(clans.data)
            setClans(clans.data)
        }
        // fetch clans
        fetchScores()
        setLoading(false)
    }, [])

    let officer = false
    if (myClan.empireIdLeader === empireId || myClan.empireIdAssistant === empireId) {
        officer = true
    }

    return (
        <main>
            <Stack spacing='sm' align='center'>
                {loading && <Loader />}
                {clans &&
                    <Stack spacing='sm'>
                        {clans.sort((a, b) => b.avgNetworth - a.avgNetworth).map((clan, index) =>
                        {
                            // console.log(clan)
                            if (myClan.id !== clan.clan.id) {
                                return (
                                    <ClanCard clan={clan} index={index} key={index} officer={officer} myClan={myClan} empireId={empireId} />
                                )
                            }
                        })}
                    </Stack>
                }
            </Stack>
        </main>
    )
}
