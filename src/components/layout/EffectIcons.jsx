import { Group, ThemeIcon, Tooltip, RingProgress, Center, Stack } from '@mantine/core'
import { useSelector } from 'react-redux'
import { ShieldStar, Sword, CalendarCheck, HourglassMedium } from '@phosphor-icons/react'

// add a whole new redux slice for empire effects

export default function EffectIcons()
{
    // console.log(data.empire)
    let effects = useSelector((state) => state.effects.effects)
    let now = new Date()

    // console.log(effects)
    // console.log(now)

    return (
        <div>
            {effects &&
                (<Group spacing='xs' ml='sm'>
                    {effects.map(effect =>
                    {
                        let effectAge = (now.valueOf() - new Date(effect.updatedAt).getTime()) / 60000
                        // age in minutes
                        // console.log(effectAge)
                        effectAge = Math.floor(effectAge)
                        // console.log(effectAge)

                        let remaining = (effect.empireEffectValue - effectAge)
                        // console.log(remaining)
                        let percentRemaining = remaining / effect.empireEffectValue * 100

                        let color = 'green'
                        let icon = ''
                        if (effect.empireEffectName === 'spell shield') {
                            icon = <ShieldStar />
                        } else if (effect.empireEffectName === 'attack boost') {
                            icon = <Sword />
                        } else if (effect.empireEffectName === 'time gate') {
                            icon = <CalendarCheck />
                        } else if (effect.empireEffectName === 'era delay') {
                            icon = <HourglassMedium />
                            color = 'red'
                        }
                        if (effect.empireEffectName === 'bonus turns' || effect.empireEffectName === 'join clan' || effect.empireEffectName === 'leave clan') {
                            return
                        }


                        return (
                            <Tooltip
                                label={
                                    <Stack spacing={0} align='center'>
                                        <div>{effect.empireEffectName.toUpperCase()}</div>
                                        <div>{Math.round(remaining / 60) + ' hours remaining'}</div>
                                    </Stack>
                                } withArrow events={{ hover: true, focus: false, touch: true }} key={effect.id}>
                                <RingProgress
                                    thickness={4}
                                    sections={[{ value: percentRemaining, color: color }]}
                                    size={39}
                                    label={
                                        <Center>
                                            <ThemeIcon size="sm" radius="lg" color={color}>
                                                {icon}
                                            </ThemeIcon>
                                        </Center>
                                    } />
                            </Tooltip>
                        )
                    })}
                </Group>)}
        </div>
    )
}
