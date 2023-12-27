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
import { empireLoaded } from '../../store/empireSlice'
import { clearResult, setResult } from '../../store/turnResultsSlice'
import { forwardRef } from 'react'
import { getPower_self, baseCost } from '../../functions/functions'
import { ROUND_START, ROUND_END } from '../../config/config'
import { eraArray } from '../../config/eras'
import { FavoriteButton } from '../utilities/maxbutton'
import { useState } from 'react'

// DONE: show rune cost for spells, show current magic power, show required magic power for spells

export default function MagicCenter()
{
    const { empire } = useSelector((state) => state.empire)
    const { time } = useSelector((state) => state.time)
    const [loading, setLoading] = useState(false)

    const dispatch = useDispatch()

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

    const loadEmpireTest = async () =>
    {
        try {
            const res = await Axios.get(`/empire/${empire.uuid}`)
            // console.log(res.data)
            dispatch(empireLoaded(res.data))
        } catch (error) {
            console.log(error)
        }
    }

    const doMagic = async (values) =>
    {
        setLoading(true)
        // console.log(values)
        try {
            const res = await Axios.post('/magic', values)
            // console.log(res.data)
            dispatch(setResult(res.data))
            window.scroll({ top: 0, behavior: 'smooth' })
            loadEmpireTest()
            setLoading(false)
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
        let nextEra
        if (eraArray[empire.era].era_next !== -1) {
            nextEra = eraArray[eraArray[empire.era].era_next].name
        } else { nextEra = null }

        let canAdvance
        if (nextEra) {
            canAdvance = true
        } else canAdvance = false

        let prevEra
        if (eraArray[empire.era].era_prev !== -1) {
            prevEra = eraArray[eraArray[empire.era].era_prev].name
        } else { prevEra = null }

        let canRegress
        if (prevEra) {
            canRegress = true
        } else canRegress = false

        return { nextEra, canAdvance, prevEra, canRegress }
    }

    const { nextEra, canAdvance, prevEra, canRegress } = eraCheck(empire)

    let roundStatus = false
    let upcoming = time.start - time.time
    let remaining = time.end - time.time

    if (upcoming > 0) {
        roundStatus = true
    } else if (remaining < 0) {
        roundStatus = true
    } else {
        roundStatus = false
    }


    return (
        <section >
            <Center>
                <Stack spacing='sm' align='center'>
                    <img src='/images/magic.webp' height='200' style={{ maxHeight: '200px', maxWidth: '100%', borderRadius: '10px' }} alt='magic center' />
                    <Title order={1} align='center'>
                        Magic Center <FavoriteButton empire={empire} title='MagicCenter' />
                    </Title>
                    <Text align='center'>
                        Cast spells to create a shield, generate food or money, or change eras. Spells take two turns to cast.
                    </Text>
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
                                    { value: 6, label: 'Close Time Gate', power: 75, cost: Math.ceil(baseCost(empire) * 14.5) },
                                    { value: 3, label: `Advance to ${nextEra}`, power: 80, cost: Math.ceil(baseCost(empire) * 47.5), disabled: !canAdvance },
                                    { value: 4, label: `Regress to ${prevEra}`, power: 80, cost: Math.ceil(baseCost(empire) * 47.5), disabled: !canRegress },
                                ]}
                                {...form.getInputProps('spell')}
                            />
                            <NumberInput
                                label={`Cast Spell How Many Times?`}
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