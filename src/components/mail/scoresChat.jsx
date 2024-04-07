import { Button, Group, Card, Text, Stack, Box, Textarea, Center, Anchor } from '@mantine/core'
import { useState, useEffect, useRef } from 'react'
import Axios from 'axios'
import { useForm } from '@mantine/form'
import { PaperPlaneRight } from '@phosphor-icons/react'
import { useSelector } from 'react-redux'

export const concatenateIntegers = (a, b) =>
{
    const strA = a.toString()
    const strB = b.toString()

    return Number.parseInt(strA + strB)
}

const getMessages = async (body) =>
{
    try {
        const res = await Axios.post('/messages/messages', body)
        const data = res.data
        if (data.length < 1) return data
        const lastMessage = data[data.length - 1]
        // console.log(lastMessage)
        // console.log(body.reader === lastMessage.empireIdDestination)
        // console.log(data)
        if (body.reader === lastMessage.empireIdDestination) {
            await Axios.get(`/messages/${body.conversationId}/read`)
        }
        return data
    } catch (error) {
        console.error('Error fetching messages:', error)
    }
}


export default function ScoresChat({ enemy })
{

    const { empire } = useSelector((state) => state.empire)
    const [loading, setLoading] = useState(true)
    const [messages, setMessages] = useState([])
    const messageContainerRef = useRef(null)
    const [report, setReport] = useState(false)

    const conversationId = concatenateIntegers(enemy.id, empire.id)

    const body = {
        empireId: empire.id,
        conversationId: conversationId,
        reader: empire.id
    }

    const form = useForm({
        initialValues: {
            sourceId: empire.id,
            sourceName: empire.name,
            destinationId: enemy.id,
            destinationName: enemy.name,
            message: ''
        },
    })

    useEffect(() =>
    {
        setLoading(true)
        if (empire && body.conversationId) {
            getMessages(body)
                .then((data) =>
                {
                    setMessages(data)
                    setLoading(false)
                    const messageContainer = messageContainerRef.current
                    if (messageContainer) messageContainer.scrollTop = messageContainer.scrollHeight
                }
                )
                .catch((error) =>
                {
                    console.error('Error setting messages:', error)
                    // setLoading(false)
                })
        }
        setLoading(false)
    }, [])

    const sendMessage = async (values) =>
    {
        if (values.message === '') return
        setLoading(true)
        try {
            const res = await Axios.post(`/messages/message/new?gameId=${empire.game_id}`, values)
            // const data = res.data
            // console.log(data)
            getMessages(body).then((data) =>
            {
                setMessages(data)
                setLoading(false)
                const messageContainer = messageContainerRef.current
                if (messageContainer) messageContainer.scrollTop = messageContainer.scrollHeight
            }).catch((error) => console.error('Error setting messages:', error))
        } catch (error) {
            console.error('Error sending message:', error)
        }
    }

    const reportMessages = async () =>
    {
        try {
            const res = await Axios.post('/messages/report', { conversationId: body.conversationId })
            const data = res.data
            // console.log(data)
            setReport(true)
        } catch (error) {
            console.error('Error reporting messages:', error)
        }
    }

    return (
        <Center>
            <Stack gap={0} justify='space-between' mb='sm' mah={300} sx={{
                '@media (max-width: 800px)': {
                    width: '94%',
                },
                '@media (min-width: 800px)': {
                    width: '500px',
                }
            }}>
                {messages.length < 1 ? (<Text align='center' color='dimmed'>Start the conversation</Text>) : (
                    <Box mt='auto' justify='flex-end' sx={{ overflowY: 'auto' }} pb='xs' ref={messageContainerRef}>
                        {messages.map((message) =>
                        {
                            const now = new Date()
                            const eventTime = new Date(message.createdAt)
                            const diff = now - eventTime
                            const minutes = Math.floor(diff / 60000)
                            const hours = Math.floor(minutes / 60)
                            const days = Math.floor(hours / 24)
                            let timeSince = ''

                            if (days > 0) {
                                timeSince = `${days} days ago`
                            } else if (hours > 0) {
                                timeSince = `${hours} hours ago`
                            } else if (minutes > 0) {
                                timeSince = `${minutes} minutes ago`
                            } else {
                                timeSince = 'just now'
                            }
                            let ml = 0
                            if (message.empireIdSource === empire.id) ml = 'auto'
                            let align = 'left'
                            if (message.empireIdSource === empire.id) align = 'right'
                            let color = ''
                            if (message.empireIdSource === empire.id) color = 'lightblue'
                            let fontColor = ''
                            if (message.empireIdSource === empire.id) fontColor = 'black'
                            const messageContainer = messageContainerRef.current
                            if (messageContainer) messageContainer.scrollTop = messageContainer.scrollHeight
                            return (
                                <Card key={message.id} radius='sm' my='xs' p={8} maw='80%' ml={ml} withBorder shadow='sm' bg={color} >
                                    <Group position='apart'>
                                        <Text size='xs' align={align} color={fontColor}>{message.empireIdSource !== empire.id ? (message.empireSourceName) : ('')}</Text>
                                        <Text size='xs' color={fontColor}>{timeSince}</Text>
                                    </Group>
                                    <Text align={align} color={fontColor}
                                        sx={{
                                            overflowWrap: 'break-word',
                                            wordBreak: 'break-word',
                                        }}
                                    >{message.messageBody}</Text>
                                </Card>
                            )
                        })}
                    </Box>
                )}
                <form onSubmit={form.onSubmit((values) =>
                {
                    // console.log(values)
                    sendMessage(values)
                    form.reset()
                })}>
                    <Group position='right' noWrap>
                        <Textarea minRows={2} w='100%' {...form.getInputProps('message')} />
                        <Button type='submit' loading={loading} size='sm' p='sm'><PaperPlaneRight weight='fill' /></Button>
                    </Group>
                </form>
                {report ? (<Text align='center' size='xs' color='red' >Conversation reported to admins</Text>) : (<Anchor size='xs' color='red' align='center' onClick={reportMessages} underline>Report conversation for inappropriate or abusive language.</Anchor>)
                }
            </Stack>
        </Center>
    )
}