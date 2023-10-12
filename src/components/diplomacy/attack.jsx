import
{
    Center,
    Title,
    Button,
    Select,
    Text,
    Stack,
    Card,
    Table,
    Group,
    Badge,
} from '@mantine/core'
import { useEffect, useState, forwardRef } from 'react'
import { useForm } from '@mantine/form'
import Axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { empireLoaded } from '../../store/empireSlice'
import { setResult, clearResult } from '../../store/turnResultsSlice'
import { baseCost, getPower_self } from '../../functions/functions'
import { FavoriteButton } from '../utilities/maxbutton'

import { eraArray } from '../../config/eras'
import { raceArray } from '../../config/races'
import { Mountains, Scales, Hourglass, Alien } from "@phosphor-icons/react"
import { MAX_ATTACKS, MAX_SPELLS } from '../../config/config'

// TODO: build attacking page
// show your army information
// show attack and def value of your troops
// get list of other empires
// select empire to attack
// show other empire id, name, era, networth, land...
// select attack type
// show attack type information (allow to hide?)
// submit empire to attack and attack type
// HERE --> figure out time gate situation
// return results and update troop info


export default function Attack()
{
    const { empire } = useSelector((state) => state.empire)

    const dispatch = useDispatch()

    const [otherEmpires, setOtherEmpires] = useState()
    const [selectedEmpire, setSelectedEmpire] = useState('')
    const [selectedAttack, setSelectedAttack] = useState('')
    const [spellSelectedEmpire, spellSetSelectedEmpire] = useState('')
    const [spellSelectedAttack, spellSetSelectedAttack] = useState('')
    const [error, setError] = useState('')

    const form = useForm({
        initialValues: {
            empireId: empire.id,
            type: 'attack',
            number: 1,
            defenderId: '',
            attackType: ''
        },

        validationRules: {
            number: (value) => empire.turns >= 2 && value > 0,
        },

        errorMessages: {
            number: "Can't attack that many times",
        },
    })

    const spellForm = useForm({
        initialValues: {
            attackerId: empire.id,
            type: 'magic attack',
            defenderId: '',
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

    const sendAttack = async (values) =>
    {
        setError('')
        try {
            const res = await Axios.post(`/attack`, values)
            // console.log(res.data)
            if ("error" in res.data) {
                setError(res.data.error)
            } else {
                window.scroll({ top: 0, behavior: 'smooth' })
                dispatch(setResult(res.data))
                loadEmpireTest()
            }
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
                window.scroll({ top: 0, behavior: 'smooth' })
                dispatch(setResult([res.data]))
                loadEmpireTest()
            }
        } catch (error) {
            console.log(error)
            setError(error)
        }
    }

    useEffect(() =>
    {
        const loadOtherEmpires = async () =>
        {
            try {
                const res = await Axios.post(`/empire/otherEmpires`, { empireId: empire.empireId })
                let otherEmpires = res.data.map(({ name, empireId, land, era, race, networth }) => ({ name, empireId, land, era, race, networth }))
                // let dataFormat = otherEmpires.map((empire) =>
                //     ({ value: empire.empireId.toLocaleString(), label: `${empire.name} - land: ${empire.land.toLocaleString()} era: ${eraArray[empire.era].name} race: ${raceArray[empire.race].name}` })
                // )
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
    }, [empire.offTotal])


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

    const SelectSpell = forwardRef(
        ({ label, ratio, cost, ...others }, ref) => (
            <div ref={ref} {...others}>
                <Text size='md'>{label}</Text>
                <Text size='xs'>Ratio: {ratio}</Text>
                <Text size='xs'>Cost: {cost.toLocaleString()} {eraArray[empire.era].runes}</Text>
            </div>
        )
    );

    // console.log(selectedAttack)
    // console.log(otherEmpires)
    const eraDisplay = [0, 1, 2]

    return (
        <section>
            <Center>
                <Stack spacing='sm' align='center'>
                    <img src='/images/war.webp' height='200' style={{ maxHeight: '200px', maxWidth: '100%', borderRadius: '10px' }} alt='war council' />
                    <Title order={1} align='center'>
                        War Council
                    </Title>
                    <Text align='center'>
                        Attack other players to take their land, kill their citizens, or steal their resources. Attacks take two turns.
                    </Text>
                    <Text align='center'>
                        Cast spells to capture land, steal resources, or destroy enemy resources. Spells take two turns.
                    </Text>
                    {error && (<Text color='red' weight='bold'>{error}</Text>)}
                    <Group position='center' align='flex-start'>
                        <Card sx={{ width: '300px' }}>
                            <Card.Section withBorder inheritPadding py="xs">
                                <Group position='apart'>
                                    <Text weight={500}>Attack:</Text><FavoriteButton title='Attack' empire={empire} />
                                </Group>
                            </Card.Section>
                            <form onSubmit={form.onSubmit((values) =>
                            {
                                // console.log(values)
                                sendAttack(values)
                                // dispatch(clearResult)
                                // window.scroll({ top: 0, behavior: 'smooth' })
                            })}>
                                <Stack spacing='sm' align='center'>
                                    {otherEmpires && (
                                        <Select
                                            searchable
                                            searchValue={selectedEmpire}
                                            onSearchChange={setSelectedEmpire}
                                            label="Select an Empire to Attack"
                                            placeholder="Pick one"
                                            withAsterisk
                                            itemComponent={SelectItem}
                                            data={otherEmpires}
                                            withinPortal
                                            sx={{ width: '100%' }}
                                            {...form.getInputProps('defenderId')}
                                        />
                                    )}
                                    <Select
                                        value={selectedAttack}
                                        onChange={setSelectedAttack}
                                        label="Select an Attack Type"
                                        placeholder="Pick one"
                                        withAsterisk
                                        withinPortal
                                        // itemComponent={SelectAttack}
                                        data={[
                                            // { value: 'standard', label: 'Standard Attack' },
                                            // { value: 'surprise', label: 'Surprise Attack' },
                                            { value: 'trparm', label: 'Guerilla Strike' },
                                            { value: 'trplnd', label: 'Lay Siege' },
                                            { value: 'trpfly', label: 'Air Strike' },
                                            { value: 'trpsea', label: 'Coastal Assault' }
                                        ]}
                                        {...form.getInputProps('attackType')}
                                    />

                                    <Button color='red' type='submit'>
                                        Attack
                                    </Button>
                                    <Text size='sm'>{MAX_ATTACKS - empire.attacks} attacks remaining</Text>
                                </Stack>
                            </form>

                        </Card>
                        <Card sx={{ width: '300px' }}>
                            <Card.Section withBorder inheritPadding py="xs">
                                <Group position='apart'>
                                    <Text weight={500}>Cast Spell:</Text>
                                    <FavoriteButton title='Spell' empire={empire} />
                                </Group>
                            </Card.Section>
                            <form onSubmit={spellForm.onSubmit((values) =>
                            {
                                // console.log(values)
                                sendSpellAttack(values)
                                // dispatch(clearResult)
                                // window.scroll({ top: 0, behavior: 'smooth' })
                            })}>
                                <Stack spacing='sm' align='center'>
                                    {otherEmpires && (
                                        <Select
                                            searchable
                                            searchValue={spellSelectedEmpire}
                                            onSearchChange={spellSetSelectedEmpire}
                                            label="Select an Empire to Attack"
                                            placeholder="Pick one"
                                            withAsterisk
                                            itemComponent={SelectItem}
                                            data={otherEmpires}
                                            withinPortal
                                            sx={{ width: '100%' }}
                                            {...spellForm.getInputProps('defenderId')}
                                        />
                                    )}
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

                                    <Button color='indigo' type='submit'>
                                        Cast Spell
                                    </Button>
                                    <Text size='sm'>{MAX_SPELLS - empire.spells} spells remaining</Text>
                                </Stack>
                            </form>
                        </Card>
                        <Card>
                            <Card.Section withBorder inheritPadding py="xs" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                                <Text weight={500}>Your Army:</Text><Badge color={eraArray[empire.era].color}>{eraArray[empire.era].name}</Badge>
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
                                            <td colSpan={2} align='center'>Power: {getPower_self(empire)}</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </Card.Section>

                        </Card>

                    </Group>

                    <Group position='center' >
                        {eraDisplay.map((era) =>
                        {
                            if (era !== empire.era) return (
                                <Card key={era}>
                                    <Card.Section withBorder inheritPadding py="xs">
                                        <Badge color={eraArray[era].color}>{eraArray[era].name}</Badge>
                                    </Card.Section>
                                    <Card.Section inheritPadding py="xs">
                                        <Table striped>
                                            <thead>
                                                <tr>
                                                    <th>
                                                        Unit
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
                                                    <td>{eraArray[era].trparm}</td>
                                                    <td align='right'>{eraArray[era].o_trparm}</td>
                                                    <td align='right'>{eraArray[era].d_trparm}</td>
                                                </tr>
                                                <tr>
                                                    <td>{eraArray[era].trplnd}</td>
                                                    <td align='right'>{eraArray[era].o_trplnd}</td>
                                                    <td align='right'>{eraArray[era].d_trplnd}</td>
                                                </tr>
                                                <tr>
                                                    <td>{eraArray[era].trpfly}</td>
                                                    <td align='right'>{eraArray[era].o_trpfly}</td>
                                                    <td align='right'>{eraArray[era].d_trpfly}</td>
                                                </tr>
                                                <tr>
                                                    <td>{eraArray[era].trpsea}</td>
                                                    <td align='right'>{eraArray[era].o_trpsea}</td>
                                                    <td align='right'>{eraArray[era].d_trpsea}</td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                    </Card.Section>
                                </Card>
                            )
                        })
                        }
                    </Group>
                </Stack>
            </Center>
        </section>
    )
}