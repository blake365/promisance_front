import
{
    Center,
    Title,
    NumberInput,
    Button,
    Select,
    Text,
    Stack
} from '@mantine/core'
import { useForm } from '@mantine/form'
import Axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { clearResult, setResult } from '../../store/turnResultsSlice'
import { forwardRef } from 'react'
import { getPower_self, baseCost } from '../../functions/functions'
import { eraArray } from '../../config/eras'
import { FavoriteButton } from '../utilities/maxbutton'
import { useState } from 'react'
import { useLoadEmpire } from '../../hooks/useLoadEmpire'
import { checkRoundStatus } from '../../functions/checkRoundStatus'
import { setRepeat } from '../../store/repeatSlice'
import { useTour } from '@reactour/tour'

// DONE: show rune cost for spells, show current magic power, show required magic power for spells

export default function MagicCenter({ size })
{
    const { empire } = useSelector((state) => state.empire)
    const [loading, setLoading] = useState(false)
    const effects = useSelector((state) => state.effects.effects)
    const { setCurrentStep, meta } = useTour()
    // console.log(effects)

    const dispatch = useDispatch()
    const loadEmpire = useLoadEmpire(empire.uuid)
    const form = useForm({
        initialValues: {
            empireId: empire.id,
            type: 'magic',
            number: 1,
        },

        validationRules: {
            number: (value) => value <= Math.floor(empire.turns / 2) && value > 0,
        },

        errorMessages: {
            number: "Can't cast spell that many times",
        },
    })

    const doMagic = async (values) =>
    {
        setLoading(true)
        // console.log(values)
        try {
            const res = await Axios.post(`/magic?gameId=${empire.game_id}`, values)
            dispatch(setRepeat({ route: `/magic?gameId=${empire.game_id}`, body: values, color: 'grape' }))
            // console.log(res.data)
            dispatch(setResult(res.data))
            window.scroll({ top: 0, behavior: 'smooth' })
            loadEmpire()
            setLoading(false)
            if (meta && meta !== 'new player tutorial') {
                if (
                    !meta.includes("Elf") &&
                    !meta.includes("Drow") &&
                    !meta.includes("Pixie")
                ) {
                    setCurrentStep(13);
                }
            }

        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    const magicPower = getPower_self(empire)

    const SelectItem = forwardRef(
        ({ label, power, cost, ...others }, ref) => (
            <div ref={ref} {...others}>
                <div>
                    <Text size='md'>{label}</Text>
                    <Text size='xs'>Power: {power}</Text>
                    <Text size='xs'>Cost: {cost.toLocaleString()} {eraArray[empire.era].runes}</Text>
                </div>
            </div>
        )
    );

    // check era to see if they can advance or regress
    const eraCheck = (empire) =>
    {
        let nextEra = 'None'
        if (eraArray[empire.era].era_next !== -1) {
            nextEra = eraArray[eraArray[empire.era].era_next].name
        }

        let canAdvance = false
        if (nextEra !== 'None') {
            canAdvance = true
        }

        let prevEra = 'None'
        if (eraArray[empire.era].era_prev !== -1) {
            prevEra = eraArray[eraArray[empire.era].era_prev].name
        }

        let canRegress = false
        if (prevEra !== 'None') {
            canRegress = true
        }

        return { nextEra, canAdvance, prevEra, canRegress }
    }

    const timeGateCheck = (effects) =>
    {
        let timeGate = false
        for (const effect of effects) {
            if (effect.empireEffectName === 'time gate') {
                timeGate = true
            }
        }
        return timeGate
    }

    const { nextEra, canAdvance, prevEra, canRegress } = eraCheck(empire)
    const timeGate = timeGateCheck(effects)

    const roundStatus = checkRoundStatus()

    return (
        <section >
            <Center>
                <Stack spacing='sm' align='center' className='gremlin12 gremlin13 dwarf12 ghoul12 goblin12 orc12 hobbit12 dwarf13 ghoul13 goblin13 orc13 hobbit13 elf8 drow8 pixie8 elf9 drow9 pixie9 gnome12 vampire12 minotaur12 gnome13 vampire13 minotaur13'>
                    {!size && <>
                        <img src='/images/magic.webp' height='200' style={{ maxHeight: '200px', maxWidth: '100%', borderRadius: '10px' }} alt='magic center' />
                        <Title order={1} align='center'>
                            Magic Center <FavoriteButton empire={empire} title='MagicCenter' />
                        </Title>
                        <Text align='center'>
                            Cast spells to create a shield, generate food or money, or change eras. Spells take two turns to cast.
                        </Text>
                    </>}
                    <Text align='center'>
                        Your current magic power is {magicPower}.
                    </Text>
                    <form onSubmit={form.onSubmit((values) =>
                    {
                        // console.log(values)
                        dispatch(clearResult)
                        doMagic(values)
                    })}>
                        <Stack spacing='sm' align='center'>
                            <Select
                                label="Select Spell to Cast"
                                placeholder="Pick one"
                                required
                                itemComponent={SelectItem}
                                data={[
                                    { value: 0, label: `${eraArray[empire.era].spell_shield}`, power: 15, cost: Math.ceil(baseCost(empire) * 4.9) },
                                    { value: 1, label: 'Cornucopia', power: 30, cost: Math.ceil(baseCost(empire) * 17) },
                                    { value: 2, label: 'Tree of Gold', power: 30, cost: Math.ceil(baseCost(empire) * 17.5) },
                                    { value: 5, label: 'Open Time Gate', power: 65, cost: Math.ceil(baseCost(empire) * 20) },
                                    { value: 6, label: 'Close Time Gate', power: 75, cost: Math.ceil(baseCost(empire) * 14.5), disabled: !timeGate },
                                    { value: 3, label: `Advance to ${nextEra}`, power: 80, cost: Math.ceil(baseCost(empire) * 47.5), disabled: !canAdvance },
                                    { value: 4, label: `Regress to ${prevEra}`, power: 80, cost: Math.ceil(baseCost(empire) * 47.5), disabled: !canRegress },
                                ]}
                                {...form.getInputProps('spell')}
                            />
                            <NumberInput
                                label={'Cast Spell How Many Times?'}
                                min={1}
                                defaultValue={1}
                                stepHoldDelay={500}
                                stepHoldInterval={100}
                                max={empire.turns / 2}
                                {...form.getInputProps('number')}
                            />

                            <Button color='grape' type='submit' disabled={roundStatus} loading={loading}>
                                Cast Spell
                            </Button>
                        </Stack>
                    </form>
                </Stack>
            </Center>
        </section>
    )
}