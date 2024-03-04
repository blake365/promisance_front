import { Box, Stack, Loader, Text } from '@mantine/core'
import { useState, useEffect } from 'react'
import Axios from 'axios'
import WorldNewsItem from './worldNewsItem'

export default function ScoresNews({ enemy })
{
    let body = {
        take: 20,
        view: true,
        empire: enemy.id,
    }
    // get news
    // news is a list of recent events ordered by date, newest to oldest
    // each event has a type, a date, and a message
    // types: attack, market, clan, etc
    // search by empire ids, time, type, etc

    const [loading, setLoading] = useState(true)
    const [news, setNews] = useState([])

    useEffect(() =>
    {
        const getNews = async () =>
        {
            try {
                const res = await Axios.post(`/news/scores?gameId=${enemy.game_id}`, body);
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

    }, [enemy]);

    return (
        <Box sx={{ maxHeight: '300px', overflow: 'scroll' }}>
            <Stack spacing='sm' align='center' >
                {loading ? <Loader /> : (
                    news.map(item =>
                    {
                        return <WorldNewsItem item={item} key={item.id} now={new Date()} />
                    }))}
                {news.length === 0 && <Text m='sm' p='xs'>No news to display</Text>}
            </Stack>
        </Box>
    )
}