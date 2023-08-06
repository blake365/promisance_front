// component that will contain an individual chat box
// this will be a child of the chat component
// component will receive the two empires in the conversation
// component will fetch the messages between the two empires
// component will render the messages in a list
// component will render a form for sending a new message
// component will refresh when a new message is sent

import { Button, TextInput, Group, Card, Text, Loader, Stack, Box } from '@mantine/core'
import { useState, useEffect, useRef } from 'react'
import Axios from 'axios'
import { useForm } from '@mantine/form'

// import { } from '@phosphor-icons/react'

const getMessages = async (body) =>
{
    try {
        const res = await Axios.post(`/messages/messages`, body)
        const data = res.data
        // console.log(data)
        return data
    } catch (error) {
        console.error('Error fetching messages:', error)
    }
}

export default function Chatbox({ conversation, source, sourceName, destinationId, destinationName })
{

    const [loading, setLoading] = useState(true)
    const [messages, setMessages] = useState([])
    const messageContainerRef = useRef(null)

    let body = {
        conversationId: conversation.conversationId,
        empireId: source
    }

    // console.log(body)

    useEffect(() =>
    {
        getMessages(body)
            .then((data) =>
            {
                setMessages(data)
                setLoading(false)
            }
            )
            .catch((error) =>
            {
                console.error('Error setting messages:', error)
                // setLoading(false)
            })

        const messageContainer = messageContainerRef.current
        if (messageContainer) messageContainer.scrollTop = messageContainer.scrollHeight

    }, [])

    // console.log(conversation)

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
        setLoading(true)
        try {
            const res = await Axios.post(`/messages/message/new`, values)
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
        <Card radius='sm' mx='sm' p='xs' w='500px' h='70vh'>
            <Stack gap='sm' justify='space-between' h='100%'>
                {loading ? (<Loader />) : (
                    <Box mt='auto' justify='flex-end' sx={{ overflow: 'auto' }} pb='xs' ref={messageContainerRef}>
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
                                timeSince = `${days} days ago`
                            } else if (hours > 0) {
                                timeSince = `${hours} hours ago`
                            } else if (minutes > 0) {
                                timeSince = `${minutes} minutes ago`
                            } else {
                                timeSince = 'just now'
                            }
                            let ml = 0
                            if (message.empireIdSource === source) ml = 'auto'
                            let align = 'left'
                            if (message.empireIdSource === source) align = 'right'
                            let color = ''
                            if (message.empireIdSource === source) color = 'cornflowerblue'
                            let fontColor = ''
                            if (message.empireIdSource === source) fontColor = 'black'
                            return (
                                <Card key={index} radius='sm' my='xs' p='xs' maw='70%' ml={ml} withBorder shadow='sm' bg={color} >
                                    <Group position='apart'>
                                        <Text size='xs' align={align} color={fontColor}>{message.empireIdSource !== source ? (message.empireSourceName) : ('')}</Text>
                                        <Text size='xs' color={fontColor}>{timeSince}</Text>
                                    </Group>

                                    <Text align={align} color={fontColor}>{message.messageBody}</Text>
                                </Card>
                            )
                        })}
                    </Box>
                )}
                <form onSubmit={form.onSubmit((values) =>
                {
                    console.log(values)
                    sendMessage(values)
                    form.reset()
                })}>
                    <Group >
                        <TextInput {...form.getInputProps('message')} w='80%' />
                        <Button type='submit' loading={loading} size='sm'>Send</Button>
                    </Group>
                </form>
            </Stack>
        </Card>
    )
}