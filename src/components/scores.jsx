import { Stack, Title, Loader, Text } from '@mantine/core'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { loadScores } from '../store/scoresSlice'
import { useTranslation } from 'react-i18next'
import ScoreCard from './scoreCard'

export default function Scores()
{
    const { t } = useTranslation(['summary'])
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const { empire } = useSelector((state) => state.empire)
    const { turnsFreq, name } = useSelector((state) => state.games.activeGame)

    const myEmpire = empire

    const { scores } = useSelector((state) => state.scores)
    // console.log(scores)

    useEffect(() =>
    {
        setLoading(true)
        dispatch(loadScores(empire.game_id))
        setLoading(false)
    }, [empire, dispatch])

    // console.log(scores.length)
    return (
        <main>
            <Stack spacing='xs' align='center'>
                <Title order={1} align='center'>
                    {name} {t('summary:summary.scores')}
                </Title>
                <Text size='sm'>{t('summary:summary.ranks', { turnsFreq })}</Text>
                {loading ? <Loader /> : (scores.map(empire =>
                {
                    // console.log(empire.clanReturn)
                    let role = ''
                    let clanString = null
                    let clanTag = null
                    if (empire.clanReturn) {
                        if (empire.id === empire.clanReturn.empireIdLeader) {
                            role = 'Leader'
                        } else if (empire.id === empire.clanReturn.empireIdAssistant) {
                            role = 'Assistant'
                        } else if (empire.id === empire.clanReturn.empireIdAgent1 || empire.id === empire.clanReturn.empireIdAgent2) {
                            role = 'Agent'
                        } else {
                            role = 'Member'
                        }
                        clanString = empire.clanReturn.clanName
                        clanTag = empire.clanReturn.clanTag
                    }

                    return <ScoreCard empire={empire} myEmpire={myEmpire} key={empire.id} home={false} clan={clanString} clanTag={clanTag} role={role} />
                }))}
            </Stack>
        </main>
    )
}
