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
    Table
} from '@mantine/core'
import { useEffect, useState, forwardRef } from 'react'
import { useForm } from '@mantine/form'
import Axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { empireLoaded } from '../../store/empireSlice'
import { setResult } from '../../store/turnResultsSlice'
import { FavoriteButton } from '../utilities/maxbutton'
import { eraArray } from '../../config/eras'
import { raceArray } from '../../config/races'
import { Mountains, Scales, Hourglass, Alien } from "@phosphor-icons/react"
import { MAX_ATTACKS } from '../../config/config'
import { offense, defense } from '../../functions/functions'

export default function AttackMini()
{
    const { empire } = useSelector((state) => state.empire)

    const { time } = useSelector((state) => state.time)

    const dispatch = useDispatch()

    const [otherEmpires, setOtherEmpires] = useState()
    const [selectedEmpire, setSelectedEmpire] = useState('')
    const [selectedAttack, setSelectedAttack] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

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
        setLoading(true)
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
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)

        }
    }

    useEffect(() =>
    {
        const loadOtherEmpires = async () =>
        {
            try {
                const res = await Axios.post(`/empire/otherEmpires`, { empireId: empire.empireId })
                let otherEmpires = res.data.map(({ name, empireId, land, era, race, networth, diminishingReturns }) => ({ name, empireId, land, era, race, networth, diminishingReturns }))
                // let dataFormat = otherEmpires.map((empire) =>
                //     ({ value: empire.empireId.toLocaleString(), label: `(#${empire.empireId}) ${empire.name} - land: ${empire.land.toLocaleString()} era: ${eraArray[empire.era].name} race: ${raceArray[empire.race].name}` })
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
                    label: `(#${empire.empireId}) ${empire.name}`,
                    dr: empire.diminishingReturns
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
        ({ land, era, empireId, name, race, networth, dr, ...others }, ref) => (
            <div ref={ref} {...others}>
                <div>
                    <Text size='sm' weight='bold'>{name}</Text>
                    <Text size='sm'><Mountains /> {land} acres / DR {dr}%</Text>
                    <Text size='sm'><Scales /> ${networth}</Text>
                    <Text size='sm'><Hourglass /> {era}</Text>
                    <Text size='sm'><Alien /> {race}</Text>
                </div>
            </div>
        )
    );

    const SelectAttack = forwardRef(
        ({ label, sub, ...others }, ref) => (
            <div ref={ref} {...others}>
                <Text size='md'>{label}</Text>
                <Text size='xs' m={0}>{sub}</Text>
            </div>
        )
    )

    function formatNumber(num)
    {
        if (num >= 1e12) {
            return (num / 1e12).toFixed(2) + ' T';
        }
        if (num >= 1e9) {
            return (num / 1e9).toFixed(2) + ' B';
        }
        if (num >= 1e6) {
            return (num / 1e6).toFixed(2) + ' M';
        }
        return num.toLocaleString();
    }

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
                    <img src='/images/war.webp' height='200' style={{ maxHeight: '200px', maxWidth: '100%', borderRadius: '10px' }} alt='war council' />
                    <Title order={1} align='center'>
                        Attack <FavoriteButton title='Attack' empire={empire} />
                    </Title>
                    <Text align='center'>
                        Attack other players to take their land, kill their citizens, or steal their resources. Attacks take two turns.
                    </Text>
                    {error && (<Text color='red' weight='bold'>{error}</Text>)}
                    <Card sx={{ width: '300px' }}>
                        <Card.Section withBorder inheritPadding py="xs">
                            <Group position='apart'>
                                <Text weight={500}>Attack:</Text>
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
                                    itemComponent={SelectAttack}
                                    data={[
                                        { value: 'trparm', label: 'Guerilla Strike', sub: `attack with ${eraArray[empire.era].trparm}` },
                                        { value: 'trplnd', label: 'Lay Siege', sub: `attack with ${eraArray[empire.era].trplnd}` },
                                        { value: 'trpfly', label: 'Air Strike', sub: `attack with ${eraArray[empire.era].trpfly}` },
                                        { value: 'trpsea', label: 'Coastal Assault', sub: `attack with ${eraArray[empire.era].trpsea}` },
                                        { value: 'standard', label: 'All Out Attack', sub: 'attack with all units' },
                                        { value: 'surprise', label: 'Surprise Attack', sub: 'attack with all units' },
                                        { value: 'pillage', label: 'Pillage', sub: 'attack with all units' }
                                    ]}
                                    {...form.getInputProps('attackType')}
                                />

                                <Button color='red' type='submit' loading={loading} disabled={roundStatus}>
                                    Attack
                                </Button>
                                <Text size='sm'>{MAX_ATTACKS - empire.attacks} attacks remaining</Text>
                            </Stack>
                        </form>
                    </Card>
                    <Card>
                        <Card.Section withBorder inheritPadding py="xs" sx={{ display: 'flex', justifyContent: 'left', alignItems: 'baseline', height: '49px' }}>
                            <Text weight={500}>Your Army:</Text><Title ml='xs' order={4} color={eraArray[empire.era].color}>{eraArray[empire.era].name}</Title>
                        </Card.Section>
                        <Card.Section pt="sm">
                            <Table>
                                <thead>
                                    <tr>
                                        <th>
                                            Unit
                                        </th>
                                        <th style={{ textAlign: 'right' }}>
                                            Number
                                        </th>
                                        <th style={{ textAlign: 'right' }}>
                                            Attack
                                        </th>
                                        <th style={{ textAlign: 'right' }}>
                                            Defense
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{eraArray[empire.era].trparm}</td>
                                        <td align='right'>{empire?.trpArm.toLocaleString()}</td>
                                        <td align='right'>{formatNumber(Math.round(eraArray[empire.era].o_trparm * empire.trpArm * (1 + raceArray[empire.race].mod_offense / 100) * (empire.health / 100)))}</td>
                                        <td align='right'>{formatNumber(Math.round(eraArray[empire.era].d_trparm * empire.trpArm * (1 + raceArray[empire.race].mod_defense / 100) * (empire.health / 100)))}</td>
                                    </tr>
                                    <tr>
                                        <td>{eraArray[empire.era].trplnd}</td>
                                        <td align='right'>{empire?.trpLnd.toLocaleString()}</td>
                                        <td align='right'>{formatNumber(Math.round(eraArray[empire.era].o_trplnd * empire.trpLnd * (1 + raceArray[empire.race].mod_offense / 100) * (empire.health / 100)))}</td>
                                        <td align='right'>{formatNumber(Math.round(eraArray[empire.era].d_trplnd * empire.trpLnd * (1 + raceArray[empire.race].mod_defense / 100) * (empire.health / 100)))}</td>
                                    </tr>
                                    <tr>
                                        <td>{eraArray[empire.era].trpfly}</td>
                                        <td align='right'>{empire?.trpFly.toLocaleString()}</td>
                                        <td align='right'>{formatNumber(Math.round(eraArray[empire.era].o_trpfly * empire.trpFly * (1 + raceArray[empire.race].mod_offense / 100) * (empire.health / 100)))}</td>
                                        <td align='right'>{formatNumber(Math.round(eraArray[empire.era].d_trpfly * empire.trpFly * (1 + raceArray[empire.race].mod_defense / 100) * (empire.health / 100)))}</td>
                                    </tr>
                                    <tr>
                                        <td>{eraArray[empire.era].trpsea}</td>
                                        <td align='right'>{empire?.trpSea.toLocaleString()}</td>
                                        <td align='right'>{formatNumber(Math.round(eraArray[empire.era].o_trpsea * empire.trpSea * (1 + raceArray[empire.race].mod_offense / 100) * (empire.health / 100)))}</td>
                                        <td align='right'>{formatNumber(Math.round(eraArray[empire.era].d_trpsea * empire.trpSea * (1 + raceArray[empire.race].mod_defense / 100) * (empire.health / 100)))}</td>
                                    </tr>
                                    <tr>
                                        <td>All Units</td>
                                        <td></td>
                                        <td align='right'>{formatNumber(offense(empire))}</td>
                                        <td align='right'>{formatNumber(defense(empire))}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Card.Section>
                    </Card>
                </Stack>
            </Center>
        </section>
    )
}