import
{
    Center,
    Button,
    Select,
    Text,
    Stack,
    Card,
    Group,
} from '@mantine/core'
import { useState, forwardRef } from 'react'
import { useForm } from '@mantine/form'
import Axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { empireLoaded } from '../../store/empireSlice'
import { setResult } from '../../store/turnResultsSlice'

import { eraArray } from '../../config/eras'
import { loadScores } from '../../store/scoresSlice'
import { getPower_self, baseCost } from '../../functions/functions'

import { MAX_SPELLS } from '../../config/config'

export default function ScoresSpell({ enemy })
{

    const { empire } = useSelector((state) => state.empire)
    const dispatch = useDispatch()

    const [spellSelectedAttack, spellSetSelectedAttack] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const spellForm = useForm({
        initialValues: {
            attackerId: empire.id,
            type: 'magic attack',
            defenderId: enemy.id,
            spell: ''
        },

        validationRules: {
            number: (value) => empire.turns >= 2 && value > 0,
        },

        errorMessages: {
            number: "Can't attack that many times",
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

    const sendSpellAttack = async (values) =>
    {
        setLoading(true)
        setError('')
        try {
            const res = await Axios.post(`/magic/attack`, values)
            // console.log(res.data)
            if ("error" in res.data) {
                setError(res.data.error)
            } else {
                window.scroll({ top: 0, behavior: 'smooth' })
                dispatch(setResult([res.data]))
                loadEmpireTest()
                dispatch(loadScores())
            }
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    const SelectSpell = forwardRef(
        ({ label, ratio, cost, ...others }, ref) => (
            <div ref={ref} {...others}>
                <Text size='md'>{label}</Text>
                <Text size='xs'>Ratio: {ratio}</Text>
                <Text size='xs'>Cost: {cost.toLocaleString()} {eraArray[empire.era].runes}</Text>
            </div>
        )
    );


    return (
        <section>
            <Center>
                <Stack spacing='sm' align='center'>
                    {error && (<Text color='red' weight='bold'>{error}</Text>)}

                    <Group position='center'>
                        <Card sx={{ width: '300px' }} py='lg'>
                            <Card.Section>
                                <Text align='center'>Magic Power: {getPower_self(empire)}</Text>
                            </Card.Section>
                            <Card.Section>
                                <form onSubmit={spellForm.onSubmit((values) =>
                                {
                                    // console.log(values)
                                    sendSpellAttack(values)
                                    // window.scroll({ top: 0, behavior: 'smooth' })
                                })}>
                                    <Stack spacing='sm' align='center'>
                                        <Select
                                            value={spellSelectedAttack}
                                            onChange={spellSetSelectedAttack}
                                            label="Select a Spell"
                                            placeholder="Pick one"
                                            withAsterisk
                                            withinPortal
                                            itemComponent={SelectSpell}
                                            data={[
                                                { value: 'fight', label: eraArray[empire.era].spell_fight, ratio: '2.2x', cost: Math.ceil(baseCost(empire) * 22.5) },
                                                { value: 'blast', label: eraArray[empire.era].spell_blast, ratio: '1.15x', cost: Math.ceil(baseCost(empire) * 2.5) },
                                                { value: 'steal', label: eraArray[empire.era].spell_steal, ratio: '1.75x', cost: Math.ceil(baseCost(empire) * 25.75) },
                                                { value: 'storm', label: eraArray[empire.era].spell_storm, ratio: '1.21x', cost: Math.ceil(baseCost(empire) * 7.25) },
                                                { value: 'runes', label: eraArray[empire.era].spell_runes, ratio: '1.3x', cost: Math.ceil(baseCost(empire) * 9.5) },
                                                { value: 'struct', label: eraArray[empire.era].spell_struct, ratio: '1.7x', cost: Math.ceil(baseCost(empire) * 18) },
                                            ]}
                                            {...spellForm.getInputProps('spell')}
                                        />

                                        <Button color='indigo' type='submit' loading={loading}>
                                            Cast Spell
                                        </Button>
                                        <Text size='sm'>{MAX_SPELLS - empire.spells} spells remaining</Text>
                                    </Stack>
                                </form>
                            </Card.Section>

                        </Card>
                    </Group>
                </Stack>
            </Center>
        </section>
    )
}
