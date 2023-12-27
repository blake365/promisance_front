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
} from '@mantine/core'
import { useEffect, useState, forwardRef } from 'react'
import { useForm } from '@mantine/form'
import Axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { empireLoaded } from '../../store/empireSlice'
import { setResult } from '../../store/turnResultsSlice'
import { baseCost } from '../../functions/functions'
import { FavoriteButton } from '../utilities/maxbutton'

import { eraArray } from '../../config/eras'
import { raceArray } from '../../config/races'
import { Mountains, Scales, Hourglass, Alien } from "@phosphor-icons/react"
import { MAX_SPELLS } from '../../config/config'


export default function SpellMini()
{
    const { empire } = useSelector((state) => state.empire)
    const { time } = useSelector((state) => state.time)

    const dispatch = useDispatch()

    const [otherEmpires, setOtherEmpires] = useState()
    const [spellSelectedEmpire, spellSetSelectedEmpire] = useState('')
    const [spellSelectedAttack, spellSetSelectedAttack] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

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
                let otherEmpires = res.data.map(({ name, empireId, land, era, race, networth }) => ({ name, empireId, land, era, race, networth }))
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
                    label: `(#${empire.empireId}) ${empire.name}`
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
                        Cast Spell <FavoriteButton title='Spell' empire={empire} />
                    </Title>
                    <Text align='center'>
                        Cast spells with your {eraArray[empire.era].trpwiz} to capture land, steal resources, or destroy enemy resources. Spells take two turns.
                    </Text>
                    {error && (<Text color='red' weight='bold'>{error}</Text>)}

                    <Card sx={{ width: '300px' }}>
                        <Card.Section withBorder inheritPadding py="xs">
                            <Group position='apart'>
                                <Text weight={500}>Cast Spell:</Text>
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

                                <Button color='indigo' type='submit' loading={loading} disabled={roundStatus}>
                                    Cast Spell
                                </Button>
                                <Text size='sm'>{MAX_SPELLS - empire.spells} spells remaining</Text>
                            </Stack>
                        </form>
                    </Card>
                </Stack>
            </Center>
        </section>
    )
}