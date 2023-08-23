import { Stack, Title, Loader } from '@mantine/core'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { loadScores } from '../store/scoresSlice'

import ScoreCard from './scoreCard'

export default function Scores()
{

    const dispatch = useDispatch()

    // get scores
    // scores is a list of empires ordered by networth, highest to lowest

    // design empire card
    // add actions to card
    // add online indicator

    const [loading, setLoading] = useState(false)

    const { empire } = useSelector((state) => state.empire)

    let myId = empire.id

    const { scores } = useSelector((state) => state.scores)
    // console.log(scores)

    useEffect(() =>
    {
        setLoading(true)
        if (scores.length < 1) {
            dispatch(loadScores())
        }
        setLoading(false)
    }, [])


    return (
        <main>
            <Stack spacing='sm' align='center'>
                <Title order={1} align='center'>
                    Scores
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
