import { useForm } from "@mantine/form";
import { useLoadEmpire } from "../../hooks/useLoadEmpire";
import { useDispatch } from "react-redux";
import { Card, Select, Stack, Text, Button, Group } from "@mantine/core";
import { useState, forwardRef } from "react";
import { FavoriteButton } from '../utilities/maxbutton'
import { useLoadOtherEmpires } from "../../hooks/useLoadOtherEmpires";
import { eraArray } from "../../config/eras";
import { MAX_ATTACKS } from "../../config/config";
import { Mountains, Scales, Hourglass, Alien } from "@phosphor-icons/react"
import Axios from "axios";
import { setResult } from '../../store/turnResultsSlice'
import { loadScores } from '../../store/scoresSlice'

const AttackForm = ({ empire, roundStatus, defenderId }) =>
{
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [selectedEmpire, setSelectedEmpire] = useState('')
    const [selectedAttack, setSelectedAttack] = useState('')

    const loadEmpire = useLoadEmpire(empire.uuid)
    let otherEmpires = null
    if (!defenderId) {
        otherEmpires = useLoadOtherEmpires(empire.id, empire.offTotal)
    }
    const dispatch = useDispatch()

    const form = useForm({
        initialValues: {
            empireId: empire.id,
            type: 'attack',
            number: 1,
            defenderId: defenderId ? defenderId : '',
            attackType: ''
        },

        validationRules: {
            number: (value) => empire.turns >= 2 && value > 0,
        },

        errorMessages: {
            number: "Can't attack that many times",
        },
    })

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
                loadEmpire()
            }
            if (defenderId) {
                dispatch(loadScores())
            }
            setLoading(false)
        } catch (error) {
            console.log(error)
            setError(error)
            setLoading(false)
        }
    }

    const SelectAttack = forwardRef(
        ({ label, sub, ...others }, ref) => (
            <div ref={ref} {...others}>
                <Text size='md'>{label}</Text>
                <Text size='xs' m={0}>{sub}</Text>
            </div>
        )
    )

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
                            { value: 'trparm', label: 'Guerrilla Strike', sub: `attack with ${eraArray[empire.era].trparm}` },
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
                    {error && (<Text color='red' weight='bold' align="center">{error}</Text>)}
                </Stack>
            </form>
        </Card>
    )
}

export default AttackForm;