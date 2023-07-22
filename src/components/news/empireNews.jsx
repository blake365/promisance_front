import { useSelector } from "react-redux"
import { Loader, Box, Title, Button, Group, Text } from "@mantine/core"
import { useState, useEffect } from "react"
import Axios from "axios"
import NewsItem from "./newsItem"


export default function EmpireNews()
{
    const { empire } = useSelector((state) => state.empire)

    const [news, setNews] = useState([])
    const [loading, setLoading] = useState(false)

    const loadNews = async () =>
    {
        try {
            const res = await Axios.get(`/news/${empire.id}`)
            console.log(res.data)
            return res.data
        } catch (error) {
            console.log(error)
        }
    }

    const markAsRead = async () =>
    {
        try {
            const res = await Axios.get(`/news/${empire.id}/read`)
            console.log(res.data)
            return res.data
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() =>
    {
        setLoading(true)
        loadNews().then((data) =>  
        {
            setNews(data)
            setLoading(false)
        }).catch((error) =>
        {
            console.error('Error setting news data:', error);

        });

    }, [])


    const handleMarkAsRead = () =>
    {
        setLoading(true);
        markAsRead()
            .then(() =>
            {
                // After marking as read, reload the news
                return loadNews();
            })
            .then((data) =>
            {
                setNews(data);
                setLoading(false);
            })
            .catch((error) =>
            {
                console.error("Error reloading news data:", error);
                setLoading(false);
            });
    };


    return (
        <section>
            <Group position='apart' px='sm' align="center">
                <Title>Your News</Title>
                <Button compact size='xs' mt='xs' onClick={handleMarkAsRead}>Mark as Read</Button>
            </Group>
            <Box>
                {loading ? <Loader /> : (
                    news.map((item) =>
                    {
                        return <NewsItem key={item.id} now={new Date()} item={item} />
                    }
                    )
                )}
                {news.length === 0 && <Text m='sm' p='xs'>No news to display</Text>}
            </Box>
        </section>
    )
}