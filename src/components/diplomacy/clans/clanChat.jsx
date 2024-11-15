import { Button, Group, Card, Text, Loader, Stack, Box, Textarea, Center } from '@mantine/core'
import { useState, useEffect, useRef } from 'react'
import Axios from 'axios'
import { useForm } from '@mantine/form'
import { PaperPlaneRight } from '@phosphor-icons/react'
import { useTranslation } from 'react-i18next'
// rewrite for clan chat

const getMessages = async (body) =>
{
    // console.log(body)

    try {
        const res = await Axios.post(`/messages/clan`, body)
        const data = res.data
        // console.log(data)

        if (data && data.length > 0) {
            const lastMessage = data[data.length - 1]
            // console.log(lastMessage)
            // console.log(body.reader === lastMessage.empireId)
            // console.log(data)
            if (body.reader !== lastMessage.empireId) {
                await Axios.post(`/messages/clan/read`, { clanId: body.clanId, empireId: body.reader })
            }
        }
        return data
    } catch (error) {
        console.error('Error fetching messages:', error)
    }
}

export default function ClanChat({ empire })
{

    const [loading, setLoading] = useState(true)
    const [messages, setMessages] = useState([])
    const messageContainerRef = useRef(null)
    const { t } = useTranslation('diplomacy')

    let body = {
        clanId: empire.clanId,
        reader: empire.id
    }

    // console.log(body)

    useEffect(() =>
    {
        setLoading(true)
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
        setLoading(false)
    }, [])

    // console.log(conversation)

    const form = useForm({
        initialValues: {
            empireId: empire.id,
            empireName: empire.name,
            clanId: empire.clanId,
            clanMessageBody: ''
        },
    })

    const sendMessage = async (values) =>
    {
        setLoading(true)
        try {
            const res = await Axios.post(`/messages/clan/new?gameId=${empire.game_id}`, values)
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

    return (
        <Center>
            <Card radius='sm' mx='xs' p='xs' h='70vh' sx={{
                '@media (max-width: 800px)': {
                    width: '94%',
                },
                '@media (min-width: 800px)': {
                    width: '500px',
                }
            }} withBorder>
                <Stack gap='sm' justify='space-between' h='100%'>
                    {loading ? (<Loader />) : (
                        <Box mt='auto' justify='flex-end' sx={{ overflowY: 'auto' }} pb='xs' ref={messageContainerRef}>
                            {messages.length < 1 && <Text align='center'>{t('diplomacy:mail.startConversation')}</Text>}
                            {messages.map((message, index) =>
                            {
                                let now = new Date()
                                let eventTime = new Date(message.createdAt)
                                let diff = now - eventTime
                                let minutes = Math.floor(diff / 60000)
                                let hours = Math.floor(minutes / 60)
                                let days = Math.floor(hours / 24)
                                let timeSince = ''

                                if (days > 0) {
                                    timeSince = `${days} ${t('diplomacy:mail.daysAgo')}`
                                } else if (hours > 0) {
                                    timeSince = `${hours} ${t('diplomacy:mail.hoursAgo')}`
                                } else if (minutes > 0) {
                                    timeSince = `${minutes} ${t('diplomacy:mail.minutesAgo')}`
                                } else {
                                    timeSince = t('diplomacy:mail.just now')
                                }
                                let ml = 0
                                if (message.empireId === empire.id) ml = 'auto'
                                let align = 'left'
                                if (message.empireId === empire.id) align = 'right'
                                let color = ''
                                if (message.empireId === empire.id) color = 'cornflowerblue'
                                let fontColor = ''
                                if (message.empireId === empire.id) fontColor = 'black'
                                const messageContainer = messageContainerRef.current
                                if (messageContainer) messageContainer.scrollTop = messageContainer.scrollHeight
                                return (
                                    <Card key={index} radius='sm' my='xs' p={8} maw='80%' ml={ml} withBorder shadow='sm' bg={color} >
                                        <Group position='apart'>
                                            <Text size='xs' align={align} color={fontColor}>{message.empireId !== empire.id ? (message.empireName) : ('')}</Text>
                                            <Text size='xs' color={fontColor}>{timeSince}</Text>
                                        </Group>

                                        <Text align={align} color={fontColor}>{message.clanMessageBody}</Text>
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
                            <Textarea minRows={2} w='100%' {...form.getInputProps('clanMessageBody')} />
                            <Button type='submit' loading={loading} size='sm' p='sm'><PaperPlaneRight weight='fill' /></Button>
                        </Group>
                    </form>
                </Stack>
            </Card >
        </Center>
    )
}