import { Button, NumberInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import Axios from 'axios'
import { eraArray } from '../../config/eras'
import { useLoadEmpire } from '../../hooks/useLoadEmpire'
import { showNotification } from '@mantine/notifications'
import { fetchMyItems } from '../../store/pubMarketSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

export default function MyItem({ element, empire })
{
    const { pubMktStart, pvtmTrpArm, pvtmTrpLnd, pvtmTrpFly, pvtmTrpSea, pvtmFood, pvtmRunes } = useSelector((state) => state.games.activeGame)
    const { t } = useTranslation(['finance', 'eras'])
    const dispatch = useDispatch()
    const loadEmpire = useLoadEmpire(empire.uuid)
    const prices = [pvtmTrpArm, pvtmTrpLnd, pvtmTrpFly, pvtmTrpSea, pvtmFood, pvtmRunes]

    const editForm = useForm({
        initialValues: {
            empireId: empire.id,
            type: 'edit',
            price: element.price,
            itemId: null
        }
    })

    const doEdit = async (values) =>
    {
        try {
            const res = await Axios.post(`/publicmarket/pubEditPrice?gameId=${empire.game_id}`, values)
            // setResult(res.data)
            showNotification({
                title: t('finance:publicMarket.responsePriceSuccess'),
                autoClose: 2000,
            })
            dispatch(fetchMyItems({ empireId: empire.id }))
            loadEmpire()
        } catch (error) {
            console.log(error)
            showNotification({
                title: t('finance:publicMarket.responsePriceError'),
                autoClose: 2000,
                color: 'orange'
            })
        }
    }

    const recallItem = async (id) =>
    {
        const body = { itemId: id, empireId: empire.id }
        try {
            const res = await Axios.post(`/publicmarket/pubRecall?gameId=${empire.game_id}`, body)
            // setResult(res.data)
            // console.log(values)
            showNotification({
                title: t('finance:publicMarket.responseRecallSuccess'),
                autoClose: 2000,
            })
            dispatch(fetchMyItems({ empireId: empire.id }))
            loadEmpire()
        } catch (error) {
            console.log(error)
            showNotification({
                title: t('finance:publicMarket.responseRecallError'),
                autoClose: 2000,
                color: 'orange'
            })
        }
    }
    const now = new Date()
    // console.log(now.getTime())

    const unitArray = [eraArray[empire.era].trparm, eraArray[empire.era].trplnd, eraArray[empire.era].trpfly, eraArray[empire.era].trpsea, eraArray[empire.era].food, eraArray[empire.era].runes]

    function truncate(value, precision)
    {
        const step = 10 ** (precision || 0);
        const temp = Math.trunc(step * value);
        return temp / step;
    }

    // console.log(element)
    let hoursOnMarketString = ''
    const createdAt = new Date(element.createdAt).getTime()
    let hoursOnMarket = truncate(((now - createdAt) / 3600000), 1)
    // hoursOnMarket -= pubMktStart
    const timeRemaining = Math.round((pubMktStart - hoursOnMarket) * 100) / 100
    if (hoursOnMarket < 6) {
        hoursOnMarketString = t('finance:publicMarket.inTransit', { time: timeRemaining })
    } else {
        hoursOnMarketString = `${truncate(hoursOnMarket - pubMktStart, 1)}`
        hoursOnMarket = Math.round((hoursOnMarket - pubMktStart) * 100) / 100
    }

    // console.log(hoursOnMarket)

    return (
        <tr key={element.id}>
            <td align='center'>{unitArray[element.type]}</td>
            <td align='center'>{Number.parseInt(element.amount).toLocaleString()}</td>
            <td align='center'>${element.price.toLocaleString()}</td>
            <td align='center'>{hoursOnMarketString}</td>
            {hoursOnMarket >= pubMktStart ? <td align='center'>
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
                        min={prices[element.type] * 0.25}
                        max={prices[element.type] * 2}
                        {...editForm.getInputProps('price')}
                        parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                        formatter={(value) =>
                            !Number.isNaN(Number.parseFloat(value))
                                ? `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                                : '$ '
                        }
                        sx={{ maxWidth: '80px' }}
                    />
                    <Button size='xs' compact type='submit'>{t('finance:publicMarket.edit')}</Button>
                    <Button color='orange' size='xs' compact onClick={() => recallItem(element.id)}>{t('finance:publicMarket.recallButton')}</Button>
                </form>
            </td> : <td align='center'>{t('finance:publicMarket.wait', { time: truncate(pubMktStart + timeRemaining, 1) })}</td>
            }
        </tr>
    )
}