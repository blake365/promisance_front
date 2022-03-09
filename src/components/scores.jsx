import { Grid, Group, Table, Title } from '@mantine/core'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Axios from 'axios'
import { raceArray } from '../config/races'
import { eraArray } from '../config/eras'

export default function Scores()
{
    // get scores
    // scores is a list of empires ordered by networth, highest to lowest

    // set up with container and map entries into component
    // table?
    const [scores, setScores] = useState()

    useEffect(() =>
    {
        async function loadScores()
        {
            try {
                const res = await Axios.get('empire/scores')
                console.log(res.data)
                setScores(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        loadScores()
    }, [])

    const singleScore = (empire) =>
    {
        return (<tr>
            <td>{empire.rank}</td>
            <td>{empire.name} (#{empire.id})</td>
            <td>{empire.land.toLocaleString()}</td>
            <td>${empire.networth.toLocaleString()}</td>
            <td>{raceArray[empire.race].name}</td>
            <td>{eraArray[empire.era].name}</td>
            <td>{empire.turnsUsed.toLocaleString()}</td>
        </tr>)
    }

    return (
        <main style={{ paddingTop: '1rem' }}>
            <Group direction='column' spacing='sm' align='center' grow>
                <Title order={1} align='center'>
                    Scores
                </Title>
                <Table>
                    <thead>
                        <tr>
                            <th>Rank</th>
                            <th>Empire</th>
                            <th>Land</th>
                            <th>Networth</th>
                            <th>Race</th>
                            <th>Era</th>
                            <th>Turns Used</th>
                        </tr>
                    </thead>
                    <tbody>
                        {scores && scores.map(empire =>
                        {
                            return singleScore(empire)
                        })}
                    </tbody>
                </Table>
            </Group>
        </main>
    )
}
