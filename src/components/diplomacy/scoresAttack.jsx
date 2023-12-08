import
{
    Center,
    Button,
    Select,
    Text,
    Stack,
    Card,
    Table,
    Group,
    Title
} from '@mantine/core'
import { useState, forwardRef } from 'react'
import { useForm } from '@mantine/form'
import Axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { empireLoaded } from '../../store/empireSlice'
import { setResult } from '../../store/turnResultsSlice'
import { raceArray } from '../../config/races'
import { eraArray } from '../../config/eras'
import { loadScores } from '../../store/scoresSlice'
import { offense, defense } from '../../functions/functions'

import { MAX_ATTACKS } from '../../config/config'

export default function ScoresAttack({ enemy })
{
    const { empire } = useSelector((state) => state.empire)
    const dispatch = useDispatch()

    const [selectedAttack, setSelectedAttack] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const form = useForm({
        initialValues: {
            empireId: empire.id,
            type: 'attack',
            number: 1,
            defenderId: enemy.id,
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
                dispatch(loadScores())
            }
            setLoading(false)
        } catch (error) {
            console.log(error)
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

    return (
        <section>
            <Center>
                <Stack spacing='sm' align='center'>
                    {error && (<Text color='red' weight='bold'>{error}</Text>)}
                    <Group position='center'>
                        <Card sx={{ width: '300px' }}>

                            <form onSubmit={form.onSubmit((values) =>
                            {
                                // console.log(values)
                                sendAttack(values)
                                // window.scroll({ top: 0, behavior: 'smooth' })
                                // dispatch(clearResult)
                            })}>
                                <Stack spacing='sm' align='center'>
                                    <Select
                                        value={selectedAttack}
                                        onChange={setSelectedAttack}
                                        label="Select an Attack Type"
                                        placeholder="Pick one"
                                        withAsterisk
                                        withinPortal
                                        itemComponent={SelectAttack}
                                        data={[
                                            { value: 'standard', label: 'Standard Attack', sub: 'attack with all units' },
                                            { value: 'surprise', label: 'Surprise Attack', sub: 'attack with all units' },
                                            { value: 'trparm', label: 'Guerilla Strike', sub: `attack with ${eraArray[empire.era].trparm}` },
                                            { value: 'trplnd', label: 'Lay Siege', sub: `attack with ${eraArray[empire.era].trplnd}` },
                                            { value: 'trpfly', label: 'Air Strike', sub: `attack with ${eraArray[empire.era].trpfly}` },
                                            { value: 'trpsea', label: 'Coastal Assault', sub: `attack with ${eraArray[empire.era].trpsea}` },
                                            { value: 'pillage', label: 'Pillage', sub: 'attack with all units' }
                                        ]}
                                        {...form.getInputProps('attackType')}
                                    />

                                    <Button color='red' type='submit' loading={loading}>
                                        Attack
                                    </Button>
                                    <Text size='sm'>{MAX_ATTACKS - empire.attacks} attacks remaining</Text>
                                </Stack>
                            </form>

                        </Card>
                        <Card mb='sm'>
                            <Card.Section withBorder inheritPadding py="xs" sx={{ display: 'flex', justifyContent: 'left', alignItems: 'baseline', height: '49px' }}>
                                <Text weight={500}>Your Army:</Text>
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
                    </Group>

                </Stack>
            </Center>
        </section>
    )
}
