import
{
    Center,
    Title,
    Button,
    Select,
    Text,
    Stack,
    Card,
    Group,
    Loader,
    Accordion
} from '@mantine/core'
import { useEffect, useState, forwardRef } from 'react'
import { useForm } from '@mantine/form'
import Axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { empireLoaded } from '../../store/empireSlice'
import { setResult } from '../../store/turnResultsSlice'
import { eraArray } from '../../config/eras'
import { raceArray } from '../../config/races'
import { Mountains, Scales, Hourglass, Alien } from "@phosphor-icons/react"
import Intel from './intel'
import { ROUND_END, ROUND_START } from '../../config/config'

import { baseCost } from '../../functions/functions'

export default function IntelCenter()
{
    const { empire } = useSelector((state) => state.empire)
    const { time } = useSelector((state) => state.time)

    const dispatch = useDispatch()

    const [otherEmpires, setOtherEmpires] = useState()
    const [selectedEmpire, setSelectedEmpire] = useState('')
    const [intel, setIntel] = useState()
    const [loading, setLoading] = useState(false)

    const form = useForm({
        initialValues: {
            attackerId: empire.id,
            type: 'magic attack',
            defenderId: '',
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

    useEffect(() =>
    {
        const loadOtherEmpires = async () =>
        {
            try {
                const res = await Axios.post(`/empire/otherEmpires`, { empireId: empire.empireId })
                let otherEmpires = res.data.map(({ name, empireId, land, era, race, networth }) => ({ name, empireId, land, era, race, networth }))

                let dataFormat = otherEmpires.map((empire) =>
                ({
                    value: empire.empireId.toLocaleString(),
                    land: empire.land.toLocaleString(),
                    networth: empire.networth.toLocaleString(),
                    race: raceArray[empire.race].name,
                    era: eraArray[empire.era].name,
                    name: empire.name,
                    empireId: empire.empireId,
                    label: `${empire.name}`
                })
                )
                // console.log(otherEmpires)
                setOtherEmpires(dataFormat)
            } catch (error) {
                console.log(error)
            }
        }
        loadOtherEmpires()
    }, [])

    const SelectItem = forwardRef(
        ({ land, era, empireId, name, race, networth, ...others }, ref) => (
            <div ref={ref} {...others}>
                <div>
                    <Text size='sm' weight='bold'>{name}</Text>
                    <Text size='sm'><Mountains /> {land} acres</Text>
                    <Text size='sm'><Scales /> ${networth}</Text>
                    <Text size='sm'><Hourglass /> {era}</Text>
                    <Text size='sm'><Alien /> {race}</Text>
                </div>
            </div>
        )
    );


    const sendSpellAttack = async (values) =>
    {
        setLoading(true)
        try {
            const res = await Axios.post(`/magic/attack`, values)
            // console.log(res.data)
            dispatch(setResult([res.data]))
            loadEmpireTest()
            form.reset()
            window.scroll({ top: 0, behavior: 'smooth' })
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }


    // load intel
    useEffect(() =>
    {
        const loadIntel = async () =>
        {
            try {
                const res = await Axios.get(`/intel/${empire.id}`)
                // console.log(res.data)
                return res.data
            } catch (error) {
                console.log(error)
            }
        }
        loadIntel().then((data) => setIntel(data))
    }, [empire.turns])

    // console.log(intel)
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
        <section>
            <Center>
                <Stack spacing='sm' align='center'>
                    <img src='/images/intel.webp' height='200' style={{ maxHeight: '200px', maxWidth: '100%', borderRadius: '10px' }} alt='intel center' />
                    <Title order={1} align='center'>
                        Intel Center
                    </Title>
                    <Text align='center'>
                        Cast a spell to view another empire's stats. This will take two turns.
                    </Text>
                    {empire.mode === 'demo' && <Text align='center' color='red'>Intel is disabled for demo accounts.</Text>}
                    <Card sx={{ width: '350px' }}>
                        <Card.Section withBorder inheritPadding py="xs">
                            <Group position='apart'>
                                <Text weight={500}>Cast Spell:</Text>
                            </Group>
                        </Card.Section>
                        <Text align='left' py='xs'>
                            Ratio Needed: 1x, Cost: {Math.ceil(baseCost(empire)).toLocaleString()} {eraArray[empire.era].runes}
                        </Text>
                        <Text align='center'>

                        </Text >
                        <form onSubmit={form.onSubmit((values) =>
                        {
                            console.log(values)
                            sendSpellAttack(values)
                            window.scroll({ top: 0, behavior: 'smooth' })
                            // dispatch(clearResult)
                        })}>
                            <Stack spacing='sm' align='center'>
                                {otherEmpires && (
                                    <Select
                                        searchable
                                        searchValue={selectedEmpire}
                                        onSearchChange={setSelectedEmpire}
                                        label="Select an Empire to Get Stats"
                                        placeholder="Pick one"
                                        withAsterisk
                                        itemComponent={SelectItem}
                                        data={otherEmpires}
                                        withinPortal
                                        sx={{ width: '100%' }}
                                        {...form.getInputProps('defenderId')}
                                    />
                                )}
                                <Button color='indigo' type='submit' disabled={roundStatus || empire.mode === 'demo'} loading={loading}>
                                    Cast Spell
                                </Button>
                            </Stack>
                        </form>
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
                                    <Accordion.Control>{item.name} - {new Date(item.createdAt).toLocaleString()}</Accordion.Control>
                                    <Accordion.Panel>
                                        <Intel empire={item} />
                                    </Accordion.Panel>
                                </Accordion.Item>)
                            })}

                        </Accordion>
                    ) : (<div>No Intel Gathered</div>)}
                </Stack>
            </Center>
        </section>
    )
}