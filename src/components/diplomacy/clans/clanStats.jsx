// clan scoreboard
import { Stack, Title, Loader, Text, Table, Card, } from '@mantine/core'
import { useState, useEffect } from 'react'

import Axios from 'axios'

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
            console.log(clans.data)
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
                {clans &&
                    <Card>
                        <Table striped>
                            <thead>
                                <tr>
                                    <th>Rank</th>
                                    <th>Clan Name</th>
                                    <th>Leader</th>
                                    <th>Members</th>
                                    <th>Average Net Worth</th>
                                    <th>Total Net Worth</th>
                                </tr>
                            </thead>
                            <tbody>
                                {clans.sort((a, b) => b.avgNetworth - a.avgNetworth).map((clan, index) =>
                                {
                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{clan.clan.clanName}</td>
                                            <td>{clan.leader.name}</td>
                                            <td>{clan.clan.clanMembers}</td>
                                            <td>${clan.avgNetworth.toLocaleString()}</td>
                                            <td>${clan.totalNetworth.toLocaleString()}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </Table>
                    </Card>
                }
            </Stack>
        </main>
    )
}
