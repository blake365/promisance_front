import { Button, Stack, Title, Loader, Text, Tabs, Select, Group, TextInput, Card, Textarea } from '@mantine/core'
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
    const [loading, setLoading] = useState(true)
    const [convos, setConvos] = useState([])
    // const [loaded, setLoaded] = useState(body.take)
    const [empires, setEmpires] = useState()
    const [selectedEmpire1, setEmpire1] = useState()

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
                setLoading(false);
            })
            .catch((error) =>
            {
                console.error('Error setting conversation data:', error);
                setLoading(false);
            });
    }, []);

    useEffect(() =>
    {
        const loadEmpires = async () =>
        {
            try {
                const res = await Axios.post(`/empire/otherEmpires`, { empireId: empire.empireId })
                let empires = res.data.map(({ name, empireId }) => ({ name, empireId }))
                let dataFormat = empires.map((empire) =>
                ({
                    value: `${empire.empireId.toLocaleString()}` + ',' + `${empire.name}`,
                    label: `${empire.name}(#${empire.empireId})`
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
            getMail(body)
                .then((data) =>
                {
                    setConvos(data);
                    setLoading(false);
                })
                .catch((error) =>
                {
                    console.error('Error setting conversation data:', error);
                    setLoading(false);
                });
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
                        <Tabs defaultValue={convos[0].conversationId.toString()} orientation="vertical" keepMounted={false} variant='pills'>
                            <Tabs.List h='70vh' sx={{ overflowY: 'scroll' }} key='930i2'>
                                {convos.map((item) =>
                                {
                                    // console.log(item)
                                    let otherEmpire = item.empireSourceName === empire.name ? item.empireDestinationName : item.empireSourceName
                                    // console.log(item)
                                    return (<Tabs.Tab key={item.uuid} value={item.conversationId.toString()}>{otherEmpire}</Tabs.Tab>)
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