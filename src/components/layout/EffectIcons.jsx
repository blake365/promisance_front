import { Paper, Group, Badge, Avatar, Text } from '@mantine/core'
import { useSelector } from 'react-redux'
import { eraArray } from '../../config/eras'


// add a whole new redux slice for empire effects

export default function EffectIcons()
{
    // console.log(data.empire)
    const effects = useSelector((state) => state.effects.effects)

    // console.log(effects)
    let activeEffects = effects.map(effect => (effect.empireEffectName))

    // console.log(activeEffects)
    return (
        <Group>
            <Badge size="md" radius="xl" color={activeEffects.includes('spell shield') ? "teal" : 'red'}>
                Spell Shield
            </Badge>
            <Badge size="md" radius="xl" color={activeEffects.includes('time gate') ? "teal" : 'red'}>
                Time Gate
            </Badge>
            <Badge size="md" radius="xl" color={activeEffects.includes('attack boost') ? "teal" : 'red'}>
                Attack Boost
            </Badge>


        </Group>
    )
}
