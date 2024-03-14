import { Stack, Title, Loader } from '@mantine/core'
import { useState, useEffect } from 'react'
import Axios from 'axios'

import ScoreCard from '../../components/scoreCard'

export default function HomeScores({ gameId })
{
    const [loading, setLoading] = useState(false)
    const [scores, setScores] = useState([])

    useEffect(() =>
    {
        const getScores = async () =>
        {
            try {
                const res = await Axios.get(`/empire/scores?gameId=${gameId}`);
                const data = res.data;
                return data;
            } catch (error) {
                // Handle error if the API request fails
                console.error('Error fetching news:', error);
                return [];
            }
        };

        getScores()
            .then((data) =>
            {
                data = data.slice(0, 10)
                setScores(data);
                setLoading(false);
            })
            .catch((error) =>
            {
                console.error('Error setting scores data:', error);
                setLoading(false);
            });

    }, []);


    // let { scores } = useSelector((state) => state.scores)
    // // console.log(scores)

    // useEffect(() =>
    // {
    //     setLoading(true)
    //     if (scores.length < 1) {
    //         dispatch(loadScores(gameId))
    //     }
    //     setLoading(false)
    // }, [])

    // scores = scores.slice(0, 10)

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