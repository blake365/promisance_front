import { Button, Stack, Title, Text, Tabs, Select, Group, Card, Textarea } from '@mantine/core'
import { useState, useEffect } from 'react'
import Axios from 'axios'
import { useSelector } from 'react-redux'
import { useForm } from '@mantine/form'
import Chatbox from './chatbox'

const getMail = async (body) =>
{
    try {
        const res = await Axios.post('/messages/conversations', body);
        const data = res.data;
        // console.log(data)
        return data;
    } catch (error) {
        // Handle error if the API request fails
        console.error('Error fetching news:', error);
        return [];
    }
};

export default function Mailbox()
{
    const [convos, setConvos] = useState([])
    const [loading, setLoading] = useState(false)
    const [empires, setEmpires] = useState()
    const [selectedEmpire1, setEmpire1] = useState()
    const [activeTab, setActiveTab] = useState()
    const { empire } = useSelector((state) => state.empire)

    // let myId = empire.id

    let body = {
        empireId: empire.id,
    }

    useEffect(() =>
    {
        getMail(body)
            .then((data) =>
            {
                setConvos(data);
                setActiveTab(data[0].conversationId.toString())
            })
            .catch((error) =>
            {
                console.error('Error setting conversation data:', error);
            });
    }, []);

    useEffect(() =>
    {
        const loadEmpires = async () =>
        {
            try {
                const res = await Axios.get(`/empire?gameId=${empire.game_id}`, { empireId: empire.empireId })
                let empires = res.data.map(({ name, empireId }) => ({ name, empireId }))
                let dataFormat = empires.map((empire) =>
                ({
                    value: `${empire.empireId.toLocaleString()}` + ',' + `${empire.name}`,
                    label: `${empire.name}`
                }))
                // console.log(otherEmpires)
                setEmpires(dataFormat)
            } catch (error) {
                console.log(error)
            }
        }

        loadEmpires()
        // setLoading(false)
    }, []);

    const form = useForm({
        initialValues: {
            sourceId: empire.id,
            sourceName: empire.name,
            destinationId: '',
            destinationName: null,
            message: ''
        },
    })

    const startConversation = async (values) =>
    {
        setLoading(true)
        try {
            const res = await Axios.post(`/messages/message/new`, values)
            const data = res.data
            // console.log(data)
            let destination = data.conversationId.toString()
            getMail(body)
                .then((data) =>
                {
                    setConvos(data);
                    setActiveTab(destination)
                    setLoading(false);
                })
                .catch((error) =>
                {
                    console.error('Error setting conversation data:', error);
                    setLoading(false);
                });
            window.scroll({ top: 0, behavior: 'smooth' })
        } catch (error) {
            console.error('Error sending message:', error)
        }
    }

    return (
        <main>
            <Stack spacing='sm' align='center'>
                <Title order={1} align='center'>
                    Mailbox
                </Title>

                <Stack spacing='sm'>
                    {convos.length > 0 ? (
                        <Tabs value={activeTab} onTabChange={setActiveTab} orientation="vertical" keepMounted={false} variant='pills' key='39i2390'>
                            <Tabs.List h='70vh' sx={{ overflowY: 'scroll' }} key='930i2'>
                                {convos.map((item, index) =>
                                {
                                    // console.log(item)
                                    let otherEmpire = item.empireSourceName === empire.name ? item.empireDestinationName : item.empireSourceName
                                    // console.log(item)
                                    return (<Tabs.Tab key={index} value={item.conversationId.toString()}
                                        sx={{
                                            maxWidth: 110,
                                            overflowX: 'scroll',
                                            paddingLeft: 5,
                                            scrollbarWidth: 'none'
                                        }}>{otherEmpire}</Tabs.Tab>)
                                })}
                            </Tabs.List>

                            {convos.map((item) =>
                            {
                                let otherEmpireName = item.empireSourceName === empire.name ? item.empireDestinationName : item.empireSourceName

                                let otherEmpireId = item.empireIdSource === empire.id ? item.empireIdDestination : item.empireIdSource

                                return (
                                    <Tabs.Panel key={item.uuid} value={item.conversationId.toString()}><Chatbox conversation={item} source={empire.id} sourceName={empire.name} destinationId={otherEmpireId} destinationName={otherEmpireName} /></Tabs.Panel>
                                )
                            })}
                        </Tabs>
                    ) : (<Text align='center'>Start a conversation below</Text>)}
                    <Card>
                        <Card.Section pt='sm'>
                            <Text align='center'>Start a new conversation</Text>
                            <Text size='xs' color='dimmed' align='center'>Messages are not encrypted and can be read by anyone with access to the database.</Text>
                        </Card.Section>
                        <Card.Section>
                            <form onSubmit={form.onSubmit((values) =>
                            {
                                // console.log(values)
                                startConversation(values)
                            })}>
                                <Group align='flex-end' position='center' spacing='sm' m='sm'>
                                    {empires && (
                                        <>
                                            <Select
                                                searchable
                                                clearable
                                                searchValue={selectedEmpire1}
                                                onSearchChange={setEmpire1}
                                                label="Send a message to:"
                                                placeholder="Pick one"
                                                data={empires}
                                                withinPortal
                                                {...form.getInputProps('destinationId')}
                                                size='xs'
                                            />
                                        </>
                                    )}
                                    <Textarea label='Message'
                                        {...form.getInputProps('message')}
                                        size='xs'
                                        row={2}
                                        w='100%'
                                    />
                                    <Button type='submit' size='xs'>Send</Button>
                                </Group>
                            </form>
                        </Card.Section>
                    </Card>
                </Stack>
            </Stack>
        </main>
    )
}