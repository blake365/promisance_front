import
{
    Center,
    Group,
    Title,
    NumberInput,
    Button,
    Select
} from '@mantine/core'
import { useForm } from '@mantine/hooks'
import Axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { empireLoaded } from '../../store/empireSlice'
import { clearResult, setResult } from '../../store/turnResultsSlice'

// TODO: move advance and regress out of select form into separate ui?
// TODO: show rune cost for spells, show current magic power, show required magic power for spells

export default function MagicCenter()
{
    const { empire } = useSelector((state) => state.empire)

    const dispatch = useDispatch()

    const form = useForm({
        initialValues: {
            empireId: empire.id,
            type: 'magic',
            spell: null,
            number: 0,
        },

        validationRules: {
            turns: (value) => value <= empire.turns && value > 0,
        },

        errorMessages: {
            turns: 'Invalid number of turns',
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
        try {
            const res = await Axios.post('/magic', values)
            console.log(res.data)
            dispatch(setResult(res.data))
            loadEmpireTest()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <section style={{ paddingTop: '1rem' }}>
            <Center>
                <Group direction='column' spacing='sm' align='center'>
                    <Title order={1} align='center'>
                        Magic Center
                    </Title>
                    <div>
                        Cast spells on yourself to generate food, money, and change eras. Spells take two turns to cast.
                    </div>
                    <form onSubmit={form.onSubmit((values) =>
                    {
                        console.log(values)
                        dispatch(clearResult)
                        doMagic(values)
                    })}>
                        <Group direction='column' spacing='sm' align='center'>
                            <Select
                                label="Select Spell to Cast"
                                placeholder="Pick one"
                                required
                                data={[
                                    // { value: 0, label: 'Spell Shield' },
                                    { value: 1, label: 'Cornucopia' },
                                    { value: 2, label: 'Tree of Gold' },
                                    { value: 3, label: 'Advance to Present' },
                                    { value: 4, label: 'Regress' },
                                    // { value: 5, label: 'Open Time Gate' },
                                    // { value: 6, label: 'Close Time Gate' },

                                ]}
                                {...form.getInputProps('spell')}
                            />
                            <NumberInput
                                label={`Cast Spell How Many Times?`}
                                min={0}
                                defaultValue={0}
                                stepHoldDelay={500}
                                stepHoldInterval={100}
                                max={empire.turns}
                                {...form.getInputProps('number')}
                            />

                            <Button color='grape' type='submit'>
                                Cast Spells
                            </Button>
                        </Group>
                    </form>
                </Group>
            </Center>
        </section>
    )
}