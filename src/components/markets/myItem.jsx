import { Button, NumberInput } from '@mantine/core'
import { useDispatch } from 'react-redux'
import { useForm } from '@mantine/form'
import Axios from 'axios'
import { empireLoaded } from '../../store/empireSlice'
// import { useEffect, useState } from 'react'
import { eraArray } from '../../config/eras'
import { PUBMKT_START } from '../../config/config'


export default function MyItem({ element, empire })
{

    // console.log(element)
    // console.log(empire)

    const dispatch = useDispatch()

    const loadEmpireTest = async () =>
    {
        try {
            const res = await Axios.get(`/empire/${empire.uuid}`)
            // setResult(res.data)
            dispatch(empireLoaded(res.data))
        } catch (error) {
            console.log(error)
        }
    }

    const editForm = useForm({
        initialValues: {
            empireId: empire.id,
            type: 'edit',
            price: 1,
            itemId: null
        }
    })

    const doEdit = async (values) =>
    {
        try {
            const res = await Axios.post('/publicmarket/pubEditPrice', values)
            // dispatch(fetchMyItems())
            // setResult(res.data)
            // console.log(values)
            loadEmpireTest()
        } catch (error) {
            console.log(error)
        }
    }

    const recallItem = async (id) =>
    {
        const body = { itemId: id, empireId: empire.id }
        try {
            const res = await Axios.post('/publicmarket/pubRecall', body)
            // setResult(res.data)
            // console.log(values)
            // dispatch(fetchMyItems())
            // dispatch(fetchOtherItems(marketValues))
            loadEmpireTest()
        } catch (error) {
            console.log(error)
        }
    }
    let now = new Date()
    // console.log(now.getTime())


    let unitArray = [eraArray[empire.era].trparm, eraArray[empire.era].trplnd, eraArray[empire.era].trpfly, eraArray[empire.era].trpsea, eraArray[empire.era].food, eraArray[empire.era].runes]

    function truncate(value, precision)
    {
        let step = Math.pow(10, precision || 0);
        let temp = Math.trunc(step * value);
        return temp / step;
    }

    // console.log(element)
    let createdAt = new Date(element.createdAt)
    createdAt = createdAt.getTime()
    let hoursOnMarket = truncate(((now - createdAt) / 3600000), 1)
    // hoursOnMarket -= PUBMKT_START
    let timeRemaining = Math.round((PUBMKT_START - hoursOnMarket) * 100) / 100
    if (hoursOnMarket < 6) {
        hoursOnMarket = `${timeRemaining} hours remaining`
    } else {
        hoursOnMarket = Math.round((hoursOnMarket - 6) * 100) / 100
    }

    // console.log(timeRemaining)

    return (
        <tr tr key={element.id}>
            <td align='center'>{unitArray[element.type]}</td>
            <td align='center'>{parseInt(element.amount).toLocaleString()}</td>
            <td align='center'>${element.price.toLocaleString()}</td>
            <td align='center'>{hoursOnMarket}</td>
            {hoursOnMarket >= 6 && <td align='center'>
                <form style={{ display: 'flex', alignItems: 'center', width: '200px', justifyContent: 'space-between' }} onSubmit={
                    editForm.onSubmit((values) =>
                    {
                        // console.log(values)
                        const body = {
                            itemId: element.id,
                            empireId: empire.id,
                            price: values.price
                        }
                        // console.log(body)
                        doEdit(body)

                    })}>
                    <NumberInput
                        hideControls
                        min={1}
                        {...editForm.getInputProps('price')}
                        parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                        formatter={(value) =>
                            !Number.isNaN(parseFloat(value))
                                ? `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                                : '$ '
                        }
                        sx={{ maxWidth: '80px' }}
                    />
                    <Button size='xs' compact type='submit'>Edit</Button>
                    <Button color='orange' size='xs' compact onClick={() => recallItem(element.id)}>Recall</Button>
                </form>
            </td>
            }

        </tr>
    )
}