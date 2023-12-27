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
    ActionIcon,
} from '@mantine/core'
import { useEffect, useState, forwardRef } from 'react'
import { useForm } from '@mantine/form'
import Axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { empireLoaded } from '../../store/empireSlice'
import { setResult } from '../../store/turnResultsSlice'
import { baseCost, defense, getPower_self, offense } from '../../functions/functions'
import { FavoriteButton } from '../utilities/maxbutton'

import { eraArray } from '../../config/eras'
import { raceArray } from '../../config/races'
import { Mountains, Scales, Hourglass, Alien, Compass } from "@phosphor-icons/react"
import { MAX_ATTACKS, MAX_SPELLS, ROUND_END, ROUND_START } from '../../config/config'

import { useTour } from '@reactour/tour';
import { attackSteps } from '../../tour/attackSteps';

export default function Attack()
{
    const { empire } = useSelector((state) => state.empire)
    const { time } = useSelector((state) => state.time)

    const dispatch = useDispatch()

    const [otherEmpires, setOtherEmpires] = useState()
    const [selectedEmpire, setSelectedEmpire] = useState('')
    const [selectedAttack, setSelectedAttack] = useState('')
    const [spellSelectedEmpire, spellSetSelectedEmpire] = useState('')
    const [spellSelectedAttack, spellSetSelectedAttack] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const { setIsOpen, setSteps, setMeta, setCurrentStep } = useTour()


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
            setError(error)
            setLoading(false)
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
            }
            setLoading(false)
        } catch (error) {
            console.log(error)
            setError(error)
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
                    label: `${empire.name}`,
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

    const SelectSpell = forwardRef(
        ({ label, ratio, cost, ...others }, ref) => (
            <div ref={ref} {...others}>
                <Text size='md'>{label}</Text>
                <Text size='xs'>Ratio: {ratio}</Text>
                <Text size='xs'>Cost: {cost.toLocaleString()} {eraArray[empire.era].runes}</Text>
            </div>
        )
    );

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

    // console.log(selectedAttack)
    // console.log(otherEmpires)
    const eraDisplay = [0, 1, 2]

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
                    <Group position='center' spacing='xs'>
                        <Title order={1} align='center'>
                            War Council
                            <ActionIcon size='md' ml='xs' onClick={() =>
                            {
                                setMeta('attacking tour')
                                setSteps(attackSteps)
                                setCurrentStep(0)
                                setIsOpen(true)
                            }}
                                sx={{
                                    color: '#40c057',
                                    display: 'inline',
                                }}><Compass size={24} /></ActionIcon>
                        </Title>
                    </Group>
                    <div className='attk-first-step attk-sixth-step'>
                        <Text align='center'>
                            Attack other players to take their land, kill their citizens, or steal their resources. Attacks take two turns.
                        </Text>
                        <Text align='center'>
                            Cast spells with your {eraArray[empire.era].trpwiz} to capture land, steal resources, or destroy enemy resources. Spells take two turns.
                        </Text>
                    </div>
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
                                            className='attk-third-step'
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
                                        className='attk-fourth-step'
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

                                    <Button color='red' type='submit' disabled={roundStatus} loading={loading}>
                                        Attack
                                    </Button>
                                    <Text size='sm'>{MAX_ATTACKS - empire.attacks} attacks remaining</Text>
                                </Stack>
                            </form>

                        </Card>
                        <Card className='attk-step-twopointfive'>
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
                        <Card sx={{ width: '300px' }} className='attk-fifth-step'>
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

                                    <Button color='indigo' type='submit' disabled={roundStatus} loading={loading}>
                                        Cast Spell
                                    </Button>
                                    <Text size='sm'>{MAX_SPELLS - empire.spells} spells remaining</Text>
                                </Stack>
                            </form>
                        </Card>


                    </Group>
                    <Title order={3}>Base Unit Values</Title>
                    <Group position='center' className='attk-second-step'>
                        {eraDisplay.map((era) =>
                        {
                            return (
                                <Card key={era} sx={{ width: 255 }}>
                                    <Card.Section withBorder inheritPadding py="xs">
                                        <Title align='center' order={4} color={eraArray[era].color}>{eraArray[era].name}</Title>
                                    </Card.Section>
                                    <Card.Section pt="xs">
                                        <Table>
                                            <thead>
                                                <tr>
                                                    <th>
                                                        Unit
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