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

    let myEmpire = empire

    const { scores } = useSelector((state) => state.scores)
    // console.log(scores)

    useEffect(() =>
    {
        setLoading(true)
        dispatch(loadScores())
        setLoading(false)
    }, [])

    // console.log(scores[0])

    return (
        <main>
            <Stack spacing='sm' align='center'>
                <Title order={1} align='center'>
                    Scores
                </Title>
                {loading ? <Loader /> : (scores.map(empire =>
                {
                    // console.log(empire.clanReturn)
                    let role = ''
                    let clanString = null
                    if (empire.clanReturn) {
                        if (empire.id === empire.clanReturn.empireIdLeader) {
                            role = 'Leader'
                        } else if (empire.id === empire.clanReturn.empireIdAssistant) {
                            role = 'Assistant'
                        } else if (empire.id === empire.clanReturn.empireIdAgent1 || empire.id === empire.clanReturn.empireIdAgent2) {
                            role = 'Agent'
                        } else {
                            role = 'member'
                        }
                        clanString = ` - ${role} of ${empire.clanReturn.clanName}`
                    }

                    return <ScoreCard empire={empire} myEmpire={myEmpire} key={empire.id} home={false} clan={clanString} />
                }))}

            </Stack>
        </main>
    )
}
