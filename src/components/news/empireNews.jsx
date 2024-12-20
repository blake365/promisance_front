import { useSelector } from "react-redux"
import { Loader, Title, Button, Group, Text } from "@mantine/core"
import { useState, useEffect } from "react"
import Axios from "axios"
import NewsItem from "./newsItem"
import { useTranslation } from 'react-i18next'

export default function EmpireNews(props)
{
    const { t } = useTranslation('diplomacy')
    const { empire } = useSelector((state) => state.empire)

    const [news, setNews] = useState([])
    const [loading, setLoading] = useState(false)

    const loadNews = async () =>
    {
        try {
            const res = await Axios.get(`/news/${empire.id}`)
            // console.log(res.data)
            return res.data
        } catch (error) {
            console.log(error)
        }
    }

    const markAsRead = async () =>
    {
        try {
            const res = await Axios.get(`/news/${empire.id}/read`)
            // console.log(res.data)
            // props.onNewsRead('read')
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
                <Title>{t('diplomacy:news.title')}</Title>
                <Button compact size='xs' mt='xs' onClick={handleMarkAsRead}>{t('diplomacy:news.markAsRead')}</Button>
            </Group>
            <div style={{ height: '90vh', overflow: 'scroll' }}>
                {loading ? <Loader /> : (
                    news.map((item) =>
                    {
                        return <NewsItem key={item.id} now={new Date()} item={item} />
                    }
                    )
                )}
                {news.length === 0 && <Text m='sm' p='xs'>{t('diplomacy:news.none')}</Text>}
            </div>
        </section>
    )
}