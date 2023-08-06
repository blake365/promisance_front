import { Button, Stack, Title, Loader, Text, Tabs, Select, Group, TextInput } from '@mantine/core'
import { useState, useEffect } from 'react'
import Axios from 'axios'
import { useSelector } from 'react-redux'
import { useForm } from '@mantine/form'
import Chatbox from './chatbox'

// TODO: finish scores page
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
        const getMail = async () =>
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

        getMail()
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

        const loadEmpires = async () =>
        {
            try {
                const res = await Axios.get(`/empire/`)
                let empires = res.data.map(({ name, empireId }) => ({ name, empireId }))
                let dataFormat = empires.map((empire) =>
                ({
                    value: empire.empireId.toLocaleString(),
                    label: `${empire.name}(#${empire.empireId}) `
                })
                )
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
            recipient: null,
            type: null,
            message: ''
        },
    })

    return (
        <main>
            <Stack spacing='sm' align='center'>
                <Title order={1} align='center'>
                    Mailbox
                </Title>

                <Stack spacing={0}>
                    {convos.length > 0 ? (
                        <Tabs defaultValue={convos[0].conversationId.toString()} orientation="vertical" keepMounted={false} color='teal'>
                            <Tabs.List h='70vh' sx={{ overflowY: 'scroll' }}>
                                {convos.map((item) =>
                                {
                                    console.log(item)
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
                    ) : (<Loader />)}
                    <form onSubmit={form.onSubmit((values) =>
                    {
                        console.log(values)
                    })}>
                        <Group align='flex-end' position='center'>
                            {empires && (
                                <>
                                    <Select
                                        searchable
                                        clearable
                                        searchValue={selectedEmpire1}
                                        onSearchChange={setEmpire1}
                                        label="Empire"
                                        placeholder="Pick one"
                                        data={empires}
                                        withinPortal
                                        {...form.getInputProps('recipient')}
                                        size='xs'
                                    />
                                </>
                            )}
                            <TextInput label='Start Chat'
                                {...form.getInputProps('message')}
                                size='xs'
                            />
                            <Button type='submit' size='xs'>Send</Button>
                        </Group>
                    </form>
                </Stack>
            </Stack>
        </main>
    )
}