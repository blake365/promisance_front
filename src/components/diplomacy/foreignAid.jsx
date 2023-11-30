import
{
    Center,
    Title,
    Button,
    Select,
    Text,
    Stack,
    Card,
    NumberInput,
} from '@mantine/core'
import { useEffect, useState, forwardRef } from 'react'
import { useForm } from '@mantine/form'
import Axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { empireLoaded } from '../../store/empireSlice'
import { setResult } from '../../store/turnResultsSlice'
import { MaxButton } from '../utilities/maxbutton'

import { eraArray } from '../../config/eras'
import { Scales } from "@phosphor-icons/react"
import { TURNS_PROTECTION, ROUND_END, ROUND_START } from '../../config/config'
import classes from './aid.module.css'

export default function ForeignAid()
{
    const { empire } = useSelector((state) => state.empire)
    const { time } = useSelector((state) => state.time)

    const dispatch = useDispatch()

    const [otherEmpires, setOtherEmpires] = useState()
    const [selectedEmpire, setSelectedEmpire] = useState('')
    const [error, setError] = useState('')

    const form = useForm({
        initialValues: {
            empireId: empire.id,
            type: 'aid',
            receiverId: '',
            trpArm: 0,
            trpLnd: 0,
            trpFly: 0,
            trpSea: 0,
            food: 0,
            runes: 0,
            cash: 0,
        },
    })

    if (form.values['trpArm'] === undefined) {
        form.setFieldValue('trpArm', 0)
    }
    if (form.values['trpLnd'] === undefined) {
        form.setFieldValue('trpLnd', 0)
    }
    if (form.values['trpFly'] === undefined) {
        form.setFieldValue('trpFly', 0)
    }
    if (form.values['trpSea'] === undefined) {
        form.setFieldValue('trpSea', 0)
    }
    if (form.values['cash'] === undefined) {
        form.setFieldValue('cash', 0)
    }
    if (form.values['food'] === undefined) {
        form.setFieldValue('food', 0)
    }
    if (form.values['runes'] === undefined) {
        form.setFieldValue('runes', 0)
    }

    const itemArray = [
        'trpArm', 'trpLnd', 'trpFly', 'trpSea', 'cash', 'food', 'runes'
    ]

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

    const sendAid = async (values) =>
    {
        // console.log('sending aid')
        setError('')
        try {
            const res = await Axios.post(`/aid/`, values)
            console.log(res.data)
            if ("error" in res.data) {
                setError(res.data.error)
            } else {
                window.scroll({ top: 0, behavior: 'smooth' })
                dispatch(setResult(res.data))
                loadEmpireTest()
                form.reset()
            }
        } catch (error) {
            console.log(error.response.data.error)
            setError(error.response.data.error)
        }
    }


    useEffect(() =>
    {
        const loadOtherEmpires = async () =>
        {
            try {
                const res = await Axios.post(`/empire/otherEmpires`, { empireId: empire.empireId })
                let otherEmpires = res.data.map(({ name, empireId, networth, mode }) => ({ name, empireId, networth, mode }))

                let dataFormat = otherEmpires.map((empire) =>
                {
                    if (empire.mode !== 'demo') {
                        return {
                            value: empire.empireId.toLocaleString(),
                            networth: empire.networth.toLocaleString(),
                            name: empire.name,
                            empireId: empire.empireId,
                            label: `${empire.name}`
                        }
                    }
                }
                ).filter((empire) => empire !== undefined)
                // console.log(dataFormat)
                setOtherEmpires(dataFormat)
            } catch (error) {
                console.log(error)
            }
        }
        loadOtherEmpires()
    }, [empire.networth])


    const SelectItem = forwardRef(
        ({ empireId, name, networth, mode, ...others }, ref) => (
            <div ref={ref} {...others}>
                <div>
                    <Text size='sm' weight='bold'>{name}</Text>
                    <Text size='sm'><Scales /> ${networth}</Text>
                </div>
            </div>
        )
    );

    let shipsNeeded = Math.round(empire.trpSea * 0.02)
    if (shipsNeeded < 10000) {
        shipsNeeded = 10000
    }

    let roundStatus = false
    let upcoming = ROUND_START - time
    let remaining = ROUND_END - time

    console.log(upcoming / 60 / 10000 / 60, remaining)
    if (upcoming > 0) {
        roundStatus = true
    } else if (remaining < 0 || remaining / 10000 / 60 / 60 < 24) {
        roundStatus = true
    } else {
        roundStatus = false
    }

    return (
        <section>
            <Center>
                <Stack spacing='sm' align='center'>
                    <img src='/images/aid.webp' height='200' style={{ maxHeight: '200px', maxWidth: '100%', borderRadius: '10px' }} alt='foreign aid' />
                    <Title order={1} align='center'>
                        Foreign Aid
                    </Title>
                    <Text align='center'>
                        Send resources and troops to other players.
                    </Text>
                    <Text align='center'>
                        Sending aid requires two turns, one aid credit, and {shipsNeeded.toLocaleString()} {eraArray[empire.era].trpsea}. One aid credit is given each hour, up to a maximum of 4.
                    </Text>
                    {error && (<Text color='red' weight='bold'>{error}</Text>)}
                    {empire.mode === 'demo' && (<Text color='red' weight='bold'>You cannot send or receive aid with a demo empire.</Text>)}
                    {empire.turnsUsed < TURNS_PROTECTION && (<Text color='red' weight='bold'>You cannot send or receive aid until you have used {TURNS_PROTECTION} turns.</Text>)}
                    <Card>
                        <form onSubmit={form.onSubmit((values) =>
                        {
                            console.log(values)
                            sendAid(values)
                            // dispatch(clearResult)
                            window.scroll({ top: 0, behavior: 'smooth' })
                        })}>
                            <Stack spacing='sm' align='center'>
                                {otherEmpires && (
                                    <Select
                                        searchable
                                        searchValue={selectedEmpire}
                                        onSearchChange={setSelectedEmpire}
                                        label="Select an Empire to Aid"
                                        placeholder="Pick one"
                                        withAsterisk
                                        itemComponent={SelectItem}
                                        data={otherEmpires}
                                        withinPortal

                                        {...form.getInputProps('receiverId')}
                                    />
                                )}
                                <div className={classes.tablecontainer}>
                                    <table className={classes.widetable}>
                                        <thead>
                                            <tr>
                                                <th align='left'>Unit</th>
                                                <th align='right'>Owned</th>
                                                <th align='right'>Can Send</th>
                                                <th align='center'>Send</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {itemArray.map((item, index) => (<tr key={index}>
                                                <td>{item !== 'cash' ? eraArray[empire.era][item.toLowerCase()] : item[0].toUpperCase() + item.slice(1,)}</td>
                                                <td align='right'>{empire[item].toLocaleString()}</td>
                                                <td align='right'>{Math.floor(empire[item] * 0.15).toLocaleString()}</td>
                                                <td>
                                                    <NumberInput min={0} max={Math.floor(empire[item] * 0.15)} {...form.getInputProps(`${item}`)}
                                                        rightSection={<MaxButton maxValue={Math.floor(empire[item] * 0.15)} formName={form} fieldName={item} style={{ marginRight: '20px' }} />}
                                                    />
                                                </td>
                                            </tr>))}
                                        </tbody>
                                    </table>
                                </div>
                                <Button color='green' type='submit' disabled={roundStatus || empire.turnsUsed < TURNS_PROTECTION || empire.mode === 'demo' || empire.turns < 2 || empire.aidCredits < 1 || empire.trpSea < shipsNeeded}>
                                    Send Aid
                                </Button>
                                <Text size='sm'>{empire.aidCredits} credits remaining</Text>
                            </Stack>
                        </form>
                    </Card>
                </Stack>
            </Center>
        </section>
    )
}