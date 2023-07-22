import { Group, Indicator, ThemeIcon, Tooltip } from '@mantine/core'
import { NewspaperClipping, Envelope } from '@phosphor-icons/react'

export default function CommunicationIcons(props)
{
    return (
        <Group position='right' mr='sm'>
            <Group spacing='xs' ml='sm'>
                <Tooltip label='Your News' withArrow events={{ hover: true, focus: false, touch: true }}>
                    <ThemeIcon size="md" radius="md" color='gray' onClick={(props.drawerState(true))}>
                        <NewspaperClipping />
                    </ThemeIcon>
                </Tooltip>
                <Tooltip label='Your Mail' withArrow events={{ hover: true, focus: false, touch: true }}>
                    <ThemeIcon size="md" radius="md" color='gray'>
                        <Envelope />
                    </ThemeIcon>
                </Tooltip>
            </Group>
        </Group>
    )
}
