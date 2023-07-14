import { Button, Stack, Title, Loader } from '@mantine/core'
import { useState, useEffect } from 'react'
import Axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { loadScores } from '../store/scoresSlice'

import ScoreCard from './scoreCard'

// TODO: finish scores page
export default function Scores()
{

    const dispatch = useDispatch()

    // get scores
    // scores is a list of empires ordered by networth, highest to lowest

    // TODO: design empire card
    // TODO: add actions to card
    // TODO: add online indicator

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
                    return <ScoreCard empire={empire} myId={myId} key={empire.id} />
                })}

            </Stack>
        </main>
    )
}
