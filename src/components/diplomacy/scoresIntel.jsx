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
import { raceArray } from '../../config/races'
import { loadScores } from '../../store/scoresSlice'
import Intel from './intel'


export default function ScoresIntel({ enemy })
{

    const { empire } = useSelector((state) => state.empire)
    const [intel, setIntel] = useState()
    const [error, setError] = useState('')

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

    const getPower = (empire) =>
    {
        return Math.floor(empire.trpWiz * ((100 + raceArray[empire.race].mod_magic) / 100) / Math.max(empire.bldWiz, 1))
    }

    function generalLog(number, base)
    {
        return Math.log(base) / Math.log(number)
    }

    const calcSizeBonus = ({ networth }) =>
    {
        let net = Math.max(networth, 1)
        let size = Math.atan(generalLog(net, 1000) - 1) * 2.1 - 0.65
        size = Math.round(Math.min(Math.max(0.5, size), 1.7) * 1000) / 1000
        return size
    }

    const baseCost = (empire) =>
    {
        return (empire.land * 0.10) + 100 + (empire.bldWiz * 0.20) * ((100 + raceArray[empire.race].mod_magic) / 100) * calcSizeBonus(empire)
    }

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
        setError('')
        try {
            const res = await Axios.post(`/magic/attack`, values)
            // console.log(res.data)
            if ("error" in res.data) {
                setError(res.data.error)
            } else {
                dispatch(setResult([res.data]))
                loadEmpireTest()
                dispatch(loadScores())
            }
        } catch (error) {
            console.log(error)
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
                                <Text align='center'>Magic Power: {getPower(empire)}</Text>
                                <Text align='center'>Cost: {Math.ceil(baseCost(empire))} {eraArray[empire.era].runes}</Text>
                            </Card.Section>
                            <Card.Section>
                                <form onSubmit={spellForm.onSubmit((values) =>
                                {
                                    // console.log(values)
                                    sendSpellAttack(values)
                                })}>
                                    <Stack spacing='sm' align='center'>
                                        <Button color='indigo' type='submit'>
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
