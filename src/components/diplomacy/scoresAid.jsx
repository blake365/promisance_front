import
{
    Center,
    Button,
    Text,
    Stack,
    Card,
    NumberInput,
} from '@mantine/core'
import { useState } from 'react'
import { useForm } from '@mantine/form'
import Axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { empireLoaded } from '../../store/empireSlice'
import { setResult } from '../../store/turnResultsSlice'
import { MaxButton } from '../utilities/maxbutton'
import { loadScores } from '../../store/scoresSlice'

import { eraArray } from '../../config/eras'
import { TURNS_PROTECTION, ROUND_END, ROUND_START } from '../../config/config'
import classes from './aid.module.css'

export default function ScoresAid({ friend })
{
    const { empire } = useSelector((state) => state.empire)
    const { time } = useSelector((state) => state.time)

    const dispatch = useDispatch()

    const [error, setError] = useState('')

    const form = useForm({
        initialValues: {
            empireId: empire.id,
            type: 'aid',
            receiverId: friend.id,
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
        console.log('sending aid')
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
                dispatch(loadScores())
            }
        } catch (error) {
            console.log(error.response.data.error)
            setError(error.response.data.error)
        }
    }


    let shipsNeeded = Math.round(empire.trpSea * 0.02)
    if (shipsNeeded < 10000) {
        shipsNeeded = 10000
    }

    let roundStatus = false
    let upcoming = ROUND_START - time
    let remaining = ROUND_END - time

    // console.log(upcoming / 60 / 10000 / 60, remaining)
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

                    {error && (<Text color='red' weight='bold'>{error}</Text>)}
                    {empire.mode === 'demo' && (<Text color='red' weight='bold'>You cannot send or receive aid with a demo empire.</Text>)}
                    {empire.turnsUsed < TURNS_PROTECTION && (<Text color='red' weight='bold'>You cannot send or receive aid until you have used {TURNS_PROTECTION} turns.</Text>)}
                    <Card>
                        <form onSubmit={form.onSubmit((values) =>
                        {
                            // console.log(values)
                            sendAid(values)
                            // dispatch(clearResult)
                            // window.scroll({ top: 0, behavior: 'smooth' })
                        })}>
                            <Stack spacing='sm' align='center'>
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
                                <Button color='green' type='submit' disabled={empire.turnsUsed < TURNS_PROTECTION || empire.mode === 'demo' || empire.turns < 2 || empire.aidCredits < 1 || empire.trpSea < shipsNeeded}>
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