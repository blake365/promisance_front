import { Button, Stack, Title, Loader } from '@mantine/core'
import { useState, useEffect } from 'react'
import Axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'


// TODO: finish scores page
export default function WorldNews()
{

    // get news
    // news is a list of recent events ordered by date, newest to oldest
    // each event has a type, a date, and a message
    // types: attack, market, clan, etc
    // search by empire ids, time, type, etc

    const [loading, setLoading] = useState(true)
    const [news, setNews] = useState([])

    const { empire } = useSelector((state) => state.empire)

    let myId = empire.id

    useEffect(() =>
    {
        const getNews = async () =>
        {
            try {
                const res = await Axios.get('/news/');
                const data = res.data;
                return data;
            } catch (error) {
                // Handle error if the API request fails
                console.error('Error fetching news:', error);
                return [];
            }
        };

        getNews()
            .then((data) =>
            {
                setNews(data);
                setLoading(false);
            })
            .catch((error) =>
            {
                console.error('Error setting news data:', error);
                setLoading(false);
            });
    }, []);


    return (
        <main>
            <Stack spacing='sm' align='center'>
                <Title order={1} align='center'>
                    World News
                </Title>
                {loading ? <Loader /> : (
                    news.map(item =>
                    {
                        return <div key={item.id}>{item.content}</div>
                    }))}
            </Stack>
        </main>
    )
}
