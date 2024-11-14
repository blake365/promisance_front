import { Button, Center, Card, Text, NumberInput, SimpleGrid, Loader } from '@mantine/core'
import Axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { useForm } from '@mantine/form'
import { MaxButton } from '../utilities/maxbutton'
import { useLoadEmpire } from '../../hooks/useLoadEmpire'
import { showNotification } from '@mantine/notifications'
import { fetchOtherItems } from '../../store/pubMarketSlice'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function PubBuyCard({ eraItem, type, owned, base, item, cash, empireId, empireUUID, status, game_id })
{
    // const { otherItems } = useSelector((state) => state.market)
    const dispatch = useDispatch()
    // const item = otherItems[type]
    const loadEmpire = useLoadEmpire(empireUUID)
    const [loading, setLoading] = useState(false)
    // console.log(item[0])
    const { t } = useTranslation(['finance', 'eras'])

    let formType = null
    if (type === 'arm') {
        formType = 0
    } else if (type === 'lnd') {
        formType = 1
    } else if (type === 'fly') {
        formType = 2
    } else if (type === 'sea') {
        formType = 3
    } else if (type === 'food') {
        formType = 4
    } else if (type === 'runes') {
        formType = 5
    }

    // console.log(type, item[0])

    const form = useForm({
        initialValues: {
            empireId: empireId,
            action: 'buy',
            type: formType,
            buy: 0,
            item: item[0],
        },

        validationRules: {
            buy: (value) => value <= cash / item[0].price,
        },

        errorMessages: {
            buy: t('finance:blackMarket.buyError'),
        },
    })

    if (form.values['buy'] === undefined) {
        form.setFieldValue('buy', 0)
    }

    const buyItem = async (values) =>
    {
        console.log(values)
        values.item = item[0]
        // setLoading(true)
        try {
            // console.log(values)
            const res = await Axios.post(`/publicmarket/pubBuy2?gameId=${game_id}`, values)
            // setResult(res.data)
            // console.log(res.data)
            const result = res.data.success
            showNotification({
                title: t('finance:publicMarket.responseBuySuccess'),
                message: result,
            })
            form.reset()
            dispatch(fetchOtherItems({ empireId: empireId, gameId: game_id }))
            loadEmpire()
        } catch (error) {
            console.log(error)
            showNotification({
                title: t('finance:publicMarket.responseBuyError'),
                message: '',
                color: 'orange',
            })
        }
        // setLoading(false)
    }

    // console.log(marketStatus)

    return (

        <Card w='300px' p='sm' shadow='sm'>
            <Card.Section withBorder p='xs'>
                <Text align='center' weight='bold' size='lg'>
                    {eraItem}
                </Text>
            </Card.Section>
            {status !== 'succeeded' ? <Loader /> : (
                <Card.Section p='sm'>
                    <SimpleGrid cols={2} spacing={1}>
                        <Text>
                            {t('finance:blackMarket.owned')}
                        </Text>
                        <Text align='right'>{owned.toLocaleString()}</Text>
                        <Text>
                            {t('finance:blackMarket.available')}
                        </Text>
                        <Text align='right'>{Number.parseInt(item[0].amount).toLocaleString()}</Text>
                        <Text>
                            {t('finance:publicMarket.basePrice')}
                        </Text>
                        <Text align='right'>${base.toLocaleString()}</Text>
                        <Text>
                            {t('finance:publicMarket.salePrice')}
                        </Text>
                        <Text align='right'>${item[0].price.toLocaleString()}</Text>
                        <Text>
                            {t('finance:blackMarket.canAfford')}
                        </Text>
                        {cash === 0 ? <Text align='right'>0</Text> : (<Text align='right'>{cash / item[0].price > Number.parseInt(item[0].amount) ? Number.parseInt(item[0].amount).toLocaleString() : Math.floor(cash / item[0].price).toLocaleString()}</Text>)}
                        <Text italic>
                            {t('finance:publicMarket.spend')}
                        </Text>
                        <Text align='right' italic>
                            ${(form.values.buy * item[0].price).toLocaleString()}
                        </Text>
                    </SimpleGrid>
                </Card.Section>
            )}
            <Card.Section p='sm' withBorder>
                <form onSubmit={form.onSubmit((values) =>
                {
                    console.log(values)
                    if (values.buy > 0) {
                        buyItem(values)
                    }
                })}>
                    <Center>
                        <NumberInput
                            hideControls
                            align='center'
                            w='50%'
                            min={0}
                            max={cash / item[0].price > Number.parseInt(item[0].amount) ? Number.parseInt(item[0].amount) : Math.floor(cash / item[0].price)}
                            parser={(value) =>
                                value.split(' ').join('').replace(/\$\s?|(,*)|\s/g, '')
                            }
                            formatter={(value) =>
                            {
                                // console.log(typeof value)
                                return !Number.isNaN(Number.parseFloat(value))
                                    ? `${value}`.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
                                    : ''
                            }
                            }
                            {...form.getInputProps('buy')}
                            rightSection={<MaxButton formName={form} fieldName='buy' maxValue={cash / item[0].price > Number.parseInt(item[0].amount) ? Number.parseInt(item[0].amount) : Math.floor(cash / item[0].price)} />}
                        />
                        <Button type='submit' ml='sm' disabled={item[0].amount === 0} loading={loading}>{t('finance:blackMarket.buySubmit')}</Button>
                    </Center>
                </form>
            </Card.Section>
        </Card>

    )
}
