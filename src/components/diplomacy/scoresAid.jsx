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
import { setResult } from '../../store/turnResultsSlice'
import { MaxButton } from '../utilities/maxbutton'
import { loadScores } from '../../store/scoresSlice'
import { useLoadEmpire } from '../../hooks/useLoadEmpire'
import { eraArray } from '../../config/eras'
import { TURNS_PROTECTION } from '../../config/config'
import classes from './aid.module.css'

export default function ScoresAid({ friend })
{
    const { empire } = useSelector((state) => state.empire)
    const loadEmpire = useLoadEmpire(empire.uuid)
    const dispatch = useDispatch()

    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

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

    const sendAid = async (values) =>
    {
        // console.log('sending aid')
        setLoading(true)
        setError('')
        try {
            const res = await Axios.post(`/aid/`, values)
            console.log(res.data)
            if ("error" in res.data) {
                setError(res.data.error)
            } else {
                window.scroll({ top: 0, behavior: 'smooth' })
                dispatch(setResult(res.data))
                loadEmpire()
                form.reset()
                dispatch(loadScores())
            }
            setLoading(false)
        } catch (error) {
            console.log(error.response.data.error)
            setError(error.response.data.error)
            setLoading(false)
        }
    }


    let shipsNeeded = Math.round(empire.trpSea * 0.02)
    if (shipsNeeded < 10000) {
        shipsNeeded = 10000
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
                                <Button color='green' type='submit' disabled={empire.turnsUsed < TURNS_PROTECTION || empire.mode === 'demo' || empire.turns < 2 || empire.aidCredits < 1 || empire.trpSea < shipsNeeded} loading={loading}>
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