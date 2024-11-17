import { Button, Group, Card, Text, Loader, Stack, Box, Textarea, Anchor } from '@mantine/core'
import { useState, useEffect, useRef } from 'react'
import Axios from 'axios'
import { useForm } from '@mantine/form'
import { useSelector } from 'react-redux'
import { PaperPlaneRight } from '@phosphor-icons/react'
import { useTranslation } from 'react-i18next'

const getMessages = async (body) =>
{
    // console.log(body)

    try {
        const res = await Axios.post('/messages/messages', body)
        const data = res.data
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

export default function Chatbox({ conversation, source, sourceName, destinationId, destinationName })
{
    const { t } = useTranslation('diplomacy')
    const { empire } = useSelector((state) => state.empire)
    const [loading, setLoading] = useState(true)
    const [messages, setMessages] = useState([])
    const [report, setReport] = useState(false)
    const messageContainerRef = useRef(null)

    const body = {
        conversationId: conversation.conversationId,
        empireId: source,
        reader: empire.id
    }

    // console.log(body)

    useEffect(() =>
    {
        if (empire) {
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

    }, [conversation, empire, source])


    const form = useForm({
        initialValues: {
            sourceId: source,
            sourceName: sourceName,
            destinationId: destinationId,
            destinationName: destinationName,
            message: ''
        },
    })

    const sendMessage = async (values) =>
    {
        // console.log(values)
        if (values.message === '') return
        setLoading(true)
        try {
            const res = await Axios.post(`/messages/message/new?gameId=${empire.game_id}`, values)
            const data = res.data
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
            const res = await Axios.post('/messages/report', { conversationId: conversation.conversationId })
            const data = res.data
            // console.log(data)
            setReport(true)
        } catch (error) {
            console.error('Error reporting messages:', error)
        }
    }

    return (
        <Card radius='sm' mx='xs' p='xs' h='70vh' sx={{
            '@media (max-width: 800px)': {
                width: '94%',
            },
            '@media (min-width: 800px)': {
                width: '500px',
            }
        }}>
            <Stack gap='sm' justify='space-between' h='100%'>
                {loading ? (<Loader />) : (
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
                                timeSince = `${days} ${t('diplomacy:mail.daysAgo')}`
                            } else if (hours > 0) {
                                timeSince = `${hours} ${t('diplomacy:mail.hoursAgo')}`
                            } else if (minutes > 0) {
                                timeSince = `${minutes} ${t('diplomacy:mail.minutesAgo')}`
                            } else {
                                timeSince = t('diplomacy:mail.justNow')
                            }
                            let ml = 0
                            if (message.empireIdSource === source) ml = 'auto'
                            let align = 'left'
                            if (message.empireIdSource === source) align = 'right'
                            let color = ''
                            if (message.empireIdSource === source) color = 'lightblue'
                            let fontColor = ''
                            if (message.empireIdSource === source) fontColor = 'black'
                            const messageContainer = messageContainerRef.current
                            if (messageContainer) messageContainer.scrollTop = messageContainer.scrollHeight
                            return (
                                <Card key={message.id} radius='sm' my='xs' p={8} maw='80%' ml={ml} withBorder shadow='sm' bg={color} >
                                    <Group position='apart'>
                                        <Text size='xs' align={align} color={fontColor}>{message.empireIdSource !== source ? (message.empireSourceName) : ('')}</Text>
                                        <Text size='xs' color={fontColor}>{timeSince}</Text>
                                    </Group>
                                    <Text align={align} color={fontColor} sx={{
                                        overflowWrap: 'break-word',
                                        wordBreak: 'break-word',
                                    }}>{message.messageBody}</Text>
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
                {report ? (<Text align='center' size='xs' color='red'>{t('diplomacy:mail.reported')}</Text>) : (<Anchor size='xs' color='red' align='center' onClick={reportMessages} underline>{t('diplomacy:mail.report')}</Anchor>)
                }
            </Stack>
        </Card >
    )
}