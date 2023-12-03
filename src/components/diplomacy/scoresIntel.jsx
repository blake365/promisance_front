import
{
    Center,
    Button,
    Text,
    Stack,
    Card,
    Group,
    Accordion,
} from '@mantine/core'
import { useState, useEffect } from 'react'
import { useForm } from '@mantine/form'
import Axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { empireLoaded } from '../../store/empireSlice'
import { setResult } from '../../store/turnResultsSlice'

import { eraArray } from '../../config/eras'
import { loadScores } from '../../store/scoresSlice'
import Intel from './intel'
import { baseCost } from '../../functions/functions'

export default function ScoresIntel({ enemy })
{

    const { empire } = useSelector((state) => state.empire)
    const [intel, setIntel] = useState()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const dispatch = useDispatch()

    const body = {
        ownerId: empire.id,
        spiedEmpireId: enemy.id,
    }

    // console.log(typeof body.spiedEmpireId)
    // console.log(typeof body.ownerId)
    // load intel
    useEffect(() =>
    {
        const loadIntel = async () =>
        {
            console.log(body)
            try {
                const res = await Axios.post(`/intel/scores`, body)
                // console.log(res.data)
                return res.data
            } catch (error) {
                console.log(error)
            }
        }
        loadIntel().then((data) => setIntel(data))
    }, [empire.turns])

    const spellForm = useForm({
        initialValues: {
            attackerId: empire.id,
            type: 'magic attack',
            defenderId: enemy.id,
            spell: 'spy'
        },

        validationRules: {
            number: (value) => empire.turns >= 2 && value > 0,
        },

        errorMessages: {
            number: "Not enough turns",
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

    return (
        <section>
            <Center>
                <Stack spacing='sm' align='center'>
                    {error && (<Text color='red' weight='bold'>{error}</Text>)}

                    <Group position='center'>

                        <Card py='lg'>
                            <Card.Section>
                                <Text align='left' py='xs'>
                                    Ratio Needed: 1x, Cost: {Math.ceil(baseCost(empire)).toLocaleString()} {eraArray[empire.era].runes}
                                </Text>
                            </Card.Section>
                            <Card.Section>
                                <form onSubmit={spellForm.onSubmit((values) =>
                                {
                                    // console.log(values)
                                    sendSpellAttack(values)
                                    window.scroll({ top: 0, behavior: 'smooth' })
                                })}>
                                    <Stack spacing='sm' align='center'>
                                        <Button color='indigo' type='submit' loading={loading}>
                                            Cast Spell
                                        </Button>
                                    </Stack>
                                </form>
                            </Card.Section>

                        </Card>
                        {intel && intel.length > 0 ? (
                            <Accordion variant="separated" defaultValue={intel[0].uuid} sx={{
                                minWidth: 350, width: 700,
                                '@media (max-width: 650px)': {
                                    width: 700,
                                },

                                '@media (max-width: 700px)': {
                                    width: 350,
                                },
                                '@media (max-width: 400px)': {
                                    width: 350,
                                },
                            }}>
                                {intel.map((item) =>
                                {
                                    return (<Accordion.Item value={item.uuid} key={item.uuid}>
                                        <Accordion.Control>{item.name}(#{item.spiedEmpireId}) - {new Date(item.createdAt).toLocaleString()}</Accordion.Control>
                                        <Accordion.Panel>
                                            <Intel empire={item} />
                                        </Accordion.Panel>
                                    </Accordion.Item>)
                                })}
                            </Accordion>
                        ) : ('')}
                    </Group>
                </Stack>
            </Center>
        </section>
    )
}
