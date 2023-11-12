import { Group, Card, Text, Box, Badge } from '@mantine/core'

import { Sword, Shield, ShoppingCart, ShieldStar, MagicWand, FirstAid, Handshake } from '@phosphor-icons/react'


export default function NewsItem({ item, now })
{

    let eventTime = new Date(item.createdAt)
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

    let highlight = ''
    if (item.result === 'success') highlight = 'green'
    if (item.result === 'fail') highlight = 'red'
    if (item.result === 'shielded') highlight = 'blue'

    const parseContent = (content) =>
    {
        let lines = content.split('/n')
        return lines.map((line, index) =>
        {
            let weight = 'normal'
            if (index === 0) weight = 'bold'
            return <Text key={index} size='sm' weight={weight}>{line}</Text>
        })
    }

    const selectIcon = (type, result) =>
    {
        if (type === 'attack' && result === 'success') return <Shield size={24} color={highlight} weight='fill' />
        if (type === 'attack' && result === 'fail') return <Sword size={24} color={highlight} weight='fill' />
        if (type === 'market' && result === 'success') return <ShoppingCart size={24} color={highlight} weight='fill' />
        if (type === 'market' && result === 'fail') return <ShoppingCart size={24} color={highlight} weight='fill' />
        if (type === 'spell' && result === 'success') return <Shield size={24} color={highlight} weight='fill' />
        if (type === 'spell' && result === 'fail') return <MagicWand size={24} color={highlight} weight='fill' />
        if (type === 'spell' && result === 'shielded') return <ShieldStar size={24} color={highlight} weight='fill' />
        if (type === 'aid' && result === 'success') return <FirstAid size={24} color={highlight} weight='fill' />
        if (type === 'war' && result === 'success') return <Sword size={24} color={highlight} weight='duotone' />
        if (type === 'peace' && result === 'success') return <Handshake size={24} color={highlight} weight='fill' />
        if (type === 'peace' && result === 'shielded') return <Handshake size={24} color={highlight} weight='fill' />
    }

    return (
        <Card shadow='sm' radius='sm' m='sm' p='xs' withBorder>
            <Card.Section p='xs'>
                <Group position='apart'>
                    <Text size='xs'>{eventTime.toLocaleString()} ({timeSince})</Text>
                    {!item.seen &&
                        <Badge color='green'>
                            new
                        </Badge>}
                </Group>
            </Card.Section>
            <Group noWrap spacing='xs'>
                <Box>
                    {selectIcon(item.type, item.result)}
                </Box>
                <Box>
                    {parseContent(item.personalContent)}
                </Box>
            </Group>
        </Card>
    )
}