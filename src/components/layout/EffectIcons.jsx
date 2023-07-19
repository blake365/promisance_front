import { Group, ThemeIcon, Tooltip } from '@mantine/core'
import { useSelector } from 'react-redux'
import { ShieldStar, Sword, CalendarCheck, NewspaperClipping, Envelope } from '@phosphor-icons/react'

// add a whole new redux slice for empire effects

export default function EffectIcons()
{
    // console.log(data.empire)
    let effects = useSelector((state) => state.effects.effects)

    // function isOld(createdAt, effectValue)
    // {
    //     let effectAge =
    //         (Date.now().valueOf() - new Date(createdAt).getTime()) / 60000
    //     effectAge = Math.floor(effectAge)

    //     // console.log(effectAge)
    //     // console.log(effectValue)

    //     if (effectAge > effectValue) {
    //         return false
    //     } else { return true }
    // }

    // let filterEffects = effects.filter((effect) =>
    //     isOld(effect.createdAt, effect.empireEffectValue)
    // )

    // console.log(effects)
    let activeEffects = []
    if (effects && effects.length > 0) {
        activeEffects = effects.map(effect => (effect.empireEffectName))
    }

    // console.log(activeEffects)
    return (
        <div>
            {effects &&
                (<Group spacing='xs' ml='sm'>
                    <Tooltip label='Spell Shield' withArrow events={{ hover: true, focus: false, touch: true }}>
                        <ThemeIcon size="md" radius="md" color={activeEffects.includes('spell shield') ? "green" : 'gray'}>
                            <ShieldStar />
                        </ThemeIcon>
                    </Tooltip>
                    <Tooltip label='Time Gate' withArrow events={{ hover: true, focus: false, touch: true }}>
                        <ThemeIcon size="md" radius="md" color={activeEffects.includes('time gate') ? "green" : 'gray'}>
                            <CalendarCheck />
                        </ThemeIcon>
                    </Tooltip>
                    <Tooltip label='Attack Boost' withArrow events={{ hover: true, focus: false, touch: true }}>
                        <ThemeIcon size="md" radius="md" color={activeEffects.includes('attack boost') ? "green" : 'gray'}>
                            <Sword />
                        </ThemeIcon>
                    </Tooltip>
                </Group>)}

        </div>
    )
}
