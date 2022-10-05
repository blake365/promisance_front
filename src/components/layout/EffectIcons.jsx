import { Paper, Group, Badge, Avatar, Text, ThemeIcon, Tooltip } from '@mantine/core'
import { useSelector } from 'react-redux'
import { eraArray } from '../../config/eras'
import { GiMagicGate, GiCheckedShield, GiBroadsword } from 'react-icons/gi'


// add a whole new redux slice for empire effects

export default function EffectIcons()
{
    // console.log(data.empire)
    const effects = useSelector((state) => state.effects.effects)

    // console.log(effects)
    let activeEffects = effects.map(effect => (effect.empireEffectName))

    // console.log(activeEffects)
    return (
        <Group spacing='xs' ml='sm'>
            <Tooltip label='Spell Shield' withArrow events={{ hover: true, focus: false, touch: true }}>
                <ThemeIcon size="md" radius="md" color={activeEffects.includes('spell shield') ? "green" : 'gray'}>
                    <GiCheckedShield />
                </ThemeIcon>
            </Tooltip>
            <Tooltip label='Time Gate' withArrow events={{ hover: true, focus: false, touch: true }}>
                <ThemeIcon size="md" radius="md" color={activeEffects.includes('time gate') ? "green" : 'gray'}>
                    <GiMagicGate />
                </ThemeIcon>
            </Tooltip>
            <Tooltip label='Attack Boost' withArrow events={{ hover: true, focus: false, touch: true }}>
                <ThemeIcon size="md" radius="md" color={activeEffects.includes('attack boost') ? "green" : 'gray'}>
                    <GiBroadsword />
                </ThemeIcon>
            </Tooltip>
        </Group>
    )
}
