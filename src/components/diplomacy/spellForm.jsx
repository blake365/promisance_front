import { useForm } from "@mantine/form";
import { useLoadEmpire } from "../../hooks/useLoadEmpire";
import { useDispatch } from "react-redux";
import { Card, Select, Stack, Text, Button, Group } from "@mantine/core";
import { useState, forwardRef } from "react";
import { FavoriteButton } from '../utilities/maxbutton'
import { useLoadOtherEmpires } from "../../hooks/useLoadOtherEmpires";
import { eraArray } from "../../config/eras";
import { MAX_SPELLS } from "../../config/config";
import { baseCost } from '../../functions/functions'
import { Mountains, Scales, Hourglass, Alien } from "@phosphor-icons/react"
import Axios from "axios";
import { setResult } from '../../store/turnResultsSlice'
import { loadScores } from '../../store/scoresSlice'
import { setRepeat } from "../../store/repeatSlice";

const SpellForm = ({ empire, roundStatus, spy, defenderId }) =>
{
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [spellSelectedEmpire, spellSetSelectedEmpire] = useState('')
    const [spellSelectedAttack, spellSetSelectedAttack] = useState('')

    const loadEmpire = useLoadEmpire(empire.uuid)
    const dispatch = useDispatch()
    let otherEmpires = null
    if (!defenderId) {
        otherEmpires = useLoadOtherEmpires(empire.game_id, empire.id, empire.offTotal)
    }

    const spellForm = useForm({
        initialValues: {
            attackerId: empire.id,
            type: 'magic attack',
            defenderId: defenderId ? defenderId : '',
            spell: spy ? 'spy' : ''
        },

        validationRules: {
            number: (value) => empire.turns >= 2 && value > 0,
        },

        errorMessages: {
            number: "Can't attack that many times",
        },
    })

    const sendSpellAttack = async (values) =>
    {
        setLoading(true)
        setError('')
        try {
            const res = await Axios.post(`/magic/attack?gameId=${empire.game_id}`, values)
            dispatch(setRepeat({ route: `/magic/attack?gameId=${empire.game_id}`, body: values, color: 'indigo' }))
            // console.log(res.data)
            if ("error" in res.data) {
                setError(res.data.error)
            } else {
                window.scroll({ top: 0, behavior: 'smooth' })
                dispatch(setResult([res.data]))
                loadEmpire()
            }
            if (defenderId) {
                dispatch(loadScores(empire.game_id))
            }
            setLoading(false)
        } catch (error) {
            console.log(error)
            setError(error)
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

    return (
        <Card sx={{ width: '300px' }} className='attk-fifth-step'>
            {!spy && <Card.Section withBorder inheritPadding py="xs">
                <Group position='apart'>
                    <Text weight={500}>Cast Spell:</Text>
                    <FavoriteButton title='Spell' empire={empire} />
                </Group>
            </Card.Section>}
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
                            label={`Select an Empire to ${spy ? 'Get Stats' : 'Attack'}`}
                            placeholder="Pick one"
                            withAsterisk
                            itemComponent={SelectItem}
                            data={otherEmpires}
                            withinPortal
                            sx={{ width: '100%' }}
                            {...spellForm.getInputProps('defenderId')}
                        />
                    )}
                    {!spy && <Select
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
                    />}
                    <Button color='indigo' type='submit' disabled={roundStatus || empire.mode === 'demo'} loading={loading}>
                        Cast Spell
                    </Button>
                    <Text size='sm'>{MAX_SPELLS - empire.spells} spells remaining</Text>
                    {error && (<Text color='red' weight='bold' align="center">{error}</Text>)}
                </Stack>
            </form>
        </Card>
    )
}

export default SpellForm;