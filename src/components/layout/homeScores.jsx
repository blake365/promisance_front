import { Button, Stack, Title, Loader } from '@mantine/core'
import { useState, useEffect } from 'react'
import Axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { loadScores } from '../../store/scoresSlice'

import ScoreCard from '../../components/scoreCard'

// finish scores page
export default function HomeScores()
{

    const dispatch = useDispatch()

    // get scores
    // scores is a list of empires ordered by networth, highest to lowest

    // design empire card
    // add actions to card
    // add online indicator

    const [loading, setLoading] = useState(false)

    let { scores } = useSelector((state) => state.scores)
    // console.log(scores)

    useEffect(() =>
    {
        setLoading(true)
        if (scores.length < 1) {
            dispatch(loadScores())
        }
        setLoading(false)
    }, [])

    scores = scores.slice(0, 10)

    return (
        <section style={{ maxWidth: '100%' }}>
            <Stack spacing='xs' align='center' maw={500}>
                <Title order={1} align='center'>
                    Top Ten
                </Title>
                {loading && <Loader />}
                {scores && scores.map(empire =>
                {
                    return <ScoreCard empire={empire} myId={null} key={empire.id} home={true} />
                })}
            </Stack>
        </section>
    )
}