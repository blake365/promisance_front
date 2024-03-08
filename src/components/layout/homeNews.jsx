import { Stack, Title, Loader, Text } from '@mantine/core'
import { useState, useEffect } from 'react'
import Axios from 'axios'
import WorldNewsItem from '../../components/news/worldNewsItem'


export default function HomeNews({ gameId })
{
    let body = {
        skip: 0,
        take: 10,
        view: true
    }
    // get news
    // news is a list of recent events ordered by date, newest to oldest
    // each event has a type, a date, and a message
    // types: attack, market, clan, etc

    const [loading, setLoading] = useState(true)
    const [news, setNews] = useState([])


    useEffect(() =>
    {
        const getNews = async () =>
        {
            try {
                const res = await Axios.post(`/news?gameId=${gameId}`, body);
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
        <section>
            <Stack spacing='sm' align='center' maw={500}>
                <Title order={1} align='center'>
                    Recent World News
                </Title>
                <Stack spacing='xs'>
                    {loading ? <Loader /> : (
                        news.map(item =>
                        {
                            return <WorldNewsItem item={item} key={item.id} now={new Date()} />
                        }))}
                    {news.length === 0 && <Text m='sm' p='xs'>No news to display</Text>}
                </Stack>
            </Stack>
        </section>
    )
}
