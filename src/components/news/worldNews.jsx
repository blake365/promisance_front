import { Button, Stack, Title, Loader, Text, NumberInput, Select, Group } from '@mantine/core'
import { useState, useEffect } from 'react'
import Axios from 'axios'
import { useSelector } from 'react-redux'
import WorldNewsItem from './worldNewsItem'
import { useForm } from '@mantine/form'
import { useTranslation } from 'react-i18next'

export default function WorldNews()
{
    let body = {
        skip: 0,
        take: 50,
        view: true
    }
    // get news
    // news is a list of recent events ordered by date, newest to oldest
    // each event has a type, a date, and a message
    // types: attack, market, clan, etc
    // search by empire ids, time, type, etc

    const { t } = useTranslation('diplomacy')
    const [loading, setLoading] = useState(true)
    const [news, setNews] = useState([])
    const [loaded, setLoaded] = useState(body.take)
    const [empires, setEmpires] = useState()
    const [selectedEmpire1, setEmpire1] = useState()
    const [selectedEmpire2, setEmpire2] = useState()

    const { empire } = useSelector((state) => state.empire)

    let myId = empire.id

    useEffect(() =>
    {
        const getNews = async () =>
        {
            try {
                const res = await Axios.post(`/news?gameId=${empire.game_id}`, body);
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

        const loadEmpires = async () =>
        {
            try {
                const res = await Axios.get(`/empire?gameId=${empire.game_id}`)
                let empires = res.data.map(({ name, empireId }) => ({ name, empireId }))
                let dataFormat = empires.map((empire) =>
                ({
                    value: empire.empireId.toLocaleString(),
                    label: `${empire.name}`
                })
                )
                // console.log(otherEmpires)
                setEmpires(dataFormat)
            } catch (error) {
                console.log(error)
            }
        }

        loadEmpires()
    }, []);

    const form = useForm({
        initialValues: {
            empire: null,
            type: null,
            number: 50
        },
    })

    // const loadMore = async () =>
    // {
    //     body.skip = loaded;
    //     setLoading(true);
    //     try {

    //         const res = await Axios.post(`/news?gameId=${empire.game_id}`, body);
    //         const data = res.data;
    //         setNews([...news, ...data]);
    //         setLoaded(loaded + body.take)
    //         setLoading(false);
    //     } catch (error) {
    //         // Handle error if the API request fails
    //         console.error('Error fetching news:', error);
    //         return [];
    //     }
    // }

    const searchNews = async (values) =>
    {
        let searchBody = {
            skip: 0,
            take: values.number,
            view: true,
            empire: null,
            type: null
        }

        if (values.empire) searchBody.empire = values.empire
        // if (values.empire2) searchBody.empire2 = values.empire2
        if (values.type !== 'all') searchBody.type = values.type

        console.log(searchBody)
        setLoading(true);
        try {
            const res = await Axios.post(`/news/search?gameId=${empire.game_id}`, searchBody);
            const data = res.data;
            setNews(data);
            setLoading(false);
        } catch (error) {
            // Handle error if the API request fails
            console.error('Error fetching news:', error);
            return [];
        }
    }

    return (
        <main>
            <Stack spacing='sm' align='center'>
                <Title order={1} align='center'>
                    {t('diplomacy:worldNews.worldNews')}
                </Title>
                <form onSubmit={form.onSubmit((values) =>
                {
                    console.log(values)
                    searchNews(values)
                })}>
                    <Group align='flex-end' position='center'>
                        {empires && (
                            <>
                                <Select
                                    searchable
                                    clearable
                                    searchValue={selectedEmpire1}
                                    onSearchChange={setEmpire1}
                                    label={t('diplomacy:forms.empire')}
                                    placeholder={t('diplomacy:forms.pickOne')}
                                    data={empires}
                                    withinPortal
                                    {...form.getInputProps('empire')}
                                    size='xs'
                                />
                                {/* <Select
                                    searchable
                                    clearable
                                    searchValue={selectedEmpire2}
                                    onSearchChange={setEmpire2}
                                    label="Empire 2"
                                    placeholder="Pick one"
                                    data={empires}
                                    withinPortal
                                    {...form.getInputProps('empire2')}
                                /> */}
                            </>
                        )}
                        <Select
                            label={t('diplomacy:worldNews.event')}
                            placeholder={t('diplomacy:forms.pickOne')}
                            data={[
                                { value: null, label: t('diplomacy:forms.all') },
                                { value: 'attack', label: t('diplomacy:forms.attack') },
                                { value: 'market', label: t('diplomacy:forms.market') },
                                { value: 'spell', label: t('diplomacy:forms.magic') },
                                { value: 'aid', label: t('diplomacy:forms.aid') },
                                { value: 'lottery', label: t('diplomacy:forms.lottery') },
                            ]}
                            {...form.getInputProps('type')}
                            size='xs'
                        />
                        <NumberInput label={t('diplomacy:worldNews.number')} min={1} hideControls defaultValue={20}
                            {...form.getInputProps('number')}
                            size='xs'
                        />
                        <Button type='submit' size='xs'>{t('diplomacy:forms.search')}</Button>
                    </Group>
                </form>
                <Stack spacing='xs'>
                    {loading ? <Loader /> : (
                        news.map(item =>
                        {
                            return <WorldNewsItem item={item} key={item.id} now={new Date()} />
                        }))}
                    {news.length === 0 && <Text m='sm' p='xs' align='center'>{t('diplomacy:worldNews.none')}</Text>}
                </Stack>
            </Stack>
        </main>
    )
}
