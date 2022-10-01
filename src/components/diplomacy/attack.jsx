import
{
    Center,
    Title,
    NumberInput,
    Button,
    Select,
    Text,
    Stack,
    Card,
    Table,
} from '@mantine/core'
import { useEffect, useState, forwardRef } from 'react'
import { useForm } from '@mantine/form'
import Axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { empireLoaded } from '../../store/empireSlice'
import { clearResult, setResult } from '../../store/turnResultsSlice'

import { eraArray } from '../../config/eras'
import { raceArray } from '../../config/races'

// TODO: build attacking page
// show your army information
// show attack and def value of your troops
// get list of other empires
// select empire to attack
// show other empire id, name, era, networth, land...
// select attack type
// show attack type information (allow to hide?)


export default function Attack()
{
    const { empire } = useSelector((state) => state.empire)

    const dispatch = useDispatch()

    const [otherEmpires, setOtherEmpires] = useState()
    const [selectedEmpire, setSelectedEmpire] = useState()

    const form = useForm({
        initialValues: {
            empireId: empire.id,
            type: 'attack',
            number: 1,
            empire: ''
        },

        validationRules: {
            number: (value) => value <= Math.floor(empire.turns / 2) && value > 0,
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

    useEffect(() =>
    {
        const loadOtherEmpires = async () =>
        {
            try {
                const res = await Axios.post(`/empire/otherEmpires`, { empireId: empire.empireId })
                let otherEmpires = res.data.map(({ name, empireId, land, era, race }) => ({ name, empireId, land, era, race }))
                // let dataFormat = otherEmpires.map((empire) =>
                //     ({ value: empire.empireId.toLocaleString(), label: `(#${empire.empireId}) ${empire.name} - land: ${empire.land.toLocaleString()} era: ${eraArray[empire.era].name} race: ${raceArray[empire.race].name}` })
                // )
                let dataFormat = otherEmpires.map((empire) =>
                ({
                    value: empire.empireId.toLocaleString(), land: empire.land.toLocaleString(), race: raceArray[empire.race].name, era: eraArray[empire.era].name, name: empire.name, empireId: empire.empireId, label: `(#${empire.empireId}) ${empire.name}`
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
        ({ land, era, empireId, name, race, ...others }, ref) => (
            <div ref={ref} {...others}>
                <div>
                    <Text size='md'>(#{empireId}) {name}</Text>
                    <Text size='xs'>Land: {land}</Text>
                    <Text size='xs'>Era: {era}</Text>
                    <Text size='xs'>Race: {race}</Text>
                </div>

            </div>
        )
    );

    console.log(selectedEmpire)

    // console.log(otherEmpires)

    return (
        <section style={{ paddingTop: '1rem' }}>
            <Center>
                <Stack spacing='sm' align='center'>
                    <Title order={1} align='center'>
                        War Council
                    </Title>
                    <div>
                        Attack other players to take their land, kill their citizens, or steal their resources. Attacks take two turns.
                    </div>

                    <Card>
                        <Card.Section withBorder inheritPadding py="xs">
                            <Text weight={500}>Your Army:</Text>
                        </Card.Section>
                        <Card.Section inheritPadding py="xs">
                            <Table striped>
                                <thead>
                                    <tr>
                                        <th>
                                            Unit
                                        </th>
                                        <th>
                                            Number
                                        </th>
                                        <th>
                                            Attack
                                        </th>
                                        <th>
                                            Defense
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{eraArray[empire.era].trparm}</td>
                                        <td align='right'>{empire?.trpArm.toLocaleString()}</td>
                                        <td align='right'>{eraArray[empire.era].o_trparm}</td>
                                        <td align='right'>{eraArray[empire.era].d_trparm}</td>
                                    </tr>
                                    <tr>
                                        <td>{eraArray[empire.era].trplnd}</td>
                                        <td align='right'>{empire?.trpLnd.toLocaleString()}</td>
                                        <td align='right'>{eraArray[empire.era].o_trplnd}</td>
                                        <td align='right'>{eraArray[empire.era].d_trplnd}</td>
                                    </tr>
                                    <tr>
                                        <td>{eraArray[empire.era].trpfly}</td>
                                        <td align='right'>{empire?.trpFly.toLocaleString()}</td>
                                        <td align='right'>{eraArray[empire.era].o_trpfly}</td>
                                        <td align='right'>{eraArray[empire.era].d_trpfly}</td>
                                    </tr>
                                    <tr>
                                        <td>{eraArray[empire.era].trpsea}</td>
                                        <td align='right'>{empire?.trpSea.toLocaleString()}</td>
                                        <td align='right'>{eraArray[empire.era].o_trpsea}</td>
                                        <td align='right'>{eraArray[empire.era].d_trpsea}</td>
                                    </tr>
                                    <tr>
                                        <td>{eraArray[empire.era].trpwiz}</td>
                                        <td align='right'>{empire?.trpWiz.toLocaleString()}</td>
                                        <td align='right'>N/A</td>
                                        <td align='right'>N/A</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Card.Section>
                    </Card>

                    <form onSubmit={form.onSubmit((values) =>
                    {
                        console.log(values)
                        // dispatch(clearResult)

                    })}>

                        <Stack spacing='sm' align='center'>
                            {otherEmpires && (
                                <Select
                                    searchable
                                    value={selectedEmpire}
                                    onChange={setSelectedEmpire}
                                    label="Select an Empire to Attack"
                                    placeholder="Pick one"
                                    withAsterisk
                                    itemComponent={SelectItem}
                                    data={otherEmpires}
                                />
                            )}
                            {/* <NumberInput
                                label={`Cast Spell How Many Times?`}
                                min={0}
                                defaultValue={0}
                                stepHoldDelay={500}
                                stepHoldInterval={100}
                                max={empire.turns / 2}
                                {...form.getInputProps('number')}
                            /> */}

                            <Button color='' type='submit'>
                                Attack
                            </Button>
                        </Stack>
                    </form>
                </Stack>
            </Center>
        </section>
    )
}