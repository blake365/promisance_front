import { Button, Center, NumberInput, Text, Stack } from '@mantine/core'
import { useSelector } from 'react-redux'
import { useForm } from '@mantine/form'
import Axios from 'axios'
import { eraArray } from '../../config/eras'
import { raceArray } from '../../config/races'
import { MaxButton } from '../utilities/maxbutton'
import { useTranslation } from 'react-i18next'
import classes from './markets.module.css'
import { useLoadEmpire } from '../../hooks/useLoadEmpire'
import { showNotification } from '@mantine/notifications'
import { useRef } from 'react'

export default function PrivateMarketSell()
{
    const { t } = useTranslation(['finance', 'eras'])
    const { empire } = useSelector((state) => state.empire)
    const { pvtmShopBonus, pvtmTrpArm, pvtmTrpLnd, pvtmTrpFly, pvtmTrpSea, pvtmFood, pvtmRunes, pvtmMaxSell } = useSelector((state) => state.games.activeGame)
    const loadEmpire = useLoadEmpire(empire.uuid)
    const buttonRef = useRef()

    const getCost = (emp, base, multiplier) =>
    {
        let cost = base * multiplier
        let costBonus = 1 + ((1 - pvtmShopBonus) * (emp.bldCost / emp.land) + pvtmShopBonus * (emp.bldCash / emp.land))

        cost *= costBonus
        cost /= (2 - ((100 + raceArray[emp.race].mod_market) / 100))

        if (cost > base * 0.5) {
            cost = base * 0.5
        }

        return Math.round(cost)
    }

    const eraName = eraArray[empire.era].name.toLowerCase()

    const units = ['Arm', 'Lnd', 'Fly', 'Sea', 'Food', 'Runes']

    const trpArmCost = getCost(empire, pvtmTrpArm, 0.38)
    const trpLndCost = getCost(empire, pvtmTrpLnd, 0.4)
    const trpFlyCost = getCost(empire, pvtmTrpFly, 0.42)
    const trpSeaCost = getCost(empire, pvtmTrpSea, 0.44)
    const foodCost = Math.round(pvtmFood * 0.38)
    const runesCost = Math.round(pvtmRunes * 0.20)

    const priceArray = [trpArmCost, trpLndCost, trpFlyCost, trpSeaCost, foodCost, runesCost]

    const form = useForm({
        initialValues: {
            empireId: empire.id,
            type: 'sell',
            sellArm: 0,
            sellLnd: 0,
            sellFly: 0,
            sellSea: 0,
            sellFood: 0,
            sellRunes: 0,
        },

        validationRules: {
            sellArm: (value) => value <= empire.trpArm * (pvtmMaxSell / 10000),
            sellLnd: (value) => value <= empire.trpLnd * (pvtmMaxSell / 10000),
            sellFly: (value) => value <= empire.trpFly * (pvtmMaxSell / 10000),
            sellSea: (value) => value <= empire.trpSea * (pvtmMaxSell / 10000),
            sellFood: (value) => value <= empire.food,
            sellRunes: (value) => value <= empire.runes,
        },

        errorMessages: {
            sellArm: t('finance:blackMarket.sellError', { item: t(`eras:eras.${eraName}.trparm`) }),
            sellLnd: t('finance:blackMarket.sellError', { item: t(`eras:eras.${eraName}.trplnd`) }),
            sellFly: t('finance:blackMarket.sellError', { item: t(`eras:eras.${eraName}.trpfly`) }),
            sellSea: t('finance:blackMarket.sellError', { item: t(`eras:eras.${eraName}.trpsea`) }),
            sellFood: t('finance:blackMarket.sellError', { item: t(`eras:eras.${eraName}.food`) }),
            sellRunes: t('finance:blackMarket.sellError', { item: t(`eras:eras.${eraName}.runes`) }),
        },
    })

    if (form.values['sellArm'] === undefined) {
        form.setFieldValue('sellArm', 0)
    }
    if (form.values['sellLnd'] === undefined) {
        form.setFieldValue('sellLnd', 0)
    }
    if (form.values['sellFly'] === undefined) {
        form.setFieldValue('sellFly', 0)
    }
    if (form.values['sellSea'] === undefined) {
        form.setFieldValue('sellSea', 0)
    }
    if (form.values['sellFood'] === undefined) {
        form.setFieldValue('sellFood', 0)
    }
    if (form.values['sellRunes'] === undefined) {
        form.setFieldValue('sellRunes', 0)
    }

    const interpretResult = (result) =>
    {
        let returnArray = []
        if (result.resultSellArm.amount > 0) {
            returnArray.push(t('finance:blackMarket.sellResultArray', { amount: result.resultSellArm.amount.toLocaleString(), item: t(`eras:eras.${eraName}.trparm`), price: result.resultSellArm.price.toLocaleString() }))
        }
        if (result.resultSellLnd.amount > 0) {
            returnArray.push(t('finance:blackMarket.sellResultArray', { amount: result.resultSellLnd.amount.toLocaleString(), item: t(`eras:eras.${eraName}.trplnd`), price: result.resultSellLnd.price.toLocaleString() }))
        }
        if (result.resultSellFly.amount > 0) {
            returnArray.push(t('finance:blackMarket.sellResultArray', { amount: result.resultSellFly.amount.toLocaleString(), item: t(`eras:eras.${eraName}.trpfly`), price: result.resultSellFly.price.toLocaleString() }))
        }
        if (result.resultSellSea.amount > 0) {
            returnArray.push(t('finance:blackMarket.sellResultArray', { amount: result.resultSellSea.amount.toLocaleString(), item: t(`eras:eras.${eraName}.trpsea`), price: result.resultSellSea.price.toLocaleString() }))
        }
        if (result.resultSellFood.amount > 0) {
            returnArray.push(t('finance:blackMarket.sellResultArray', { amount: result.resultSellFood.amount.toLocaleString(), item: t(`eras:eras.${eraName}.food`), price: result.resultSellFood.price.toLocaleString() }))
        }
        if (result.resultSellRunes.amount > 0) {
            returnArray.push(t('finance:blackMarket.sellResultArray', { amount: result.resultSellRunes.amount.toLocaleString(), item: t(`eras:eras.${eraName}.runes`), price: result.resultSellRunes.price.toLocaleString() }))
        }
        return returnArray
    }

    const doSell = async (values) =>
    {
        try {
            const res = await Axios.post(`/privatemarket/sell?gameId=${empire.game_id}`, values)
            const result = res.data
            const resultArray = interpretResult(result)
            showNotification({
                title: t('finance:blackMarket.sellSuccess'),
                message: resultArray.map((item) => <Text>{item}</Text>),
                color: 'blue',
            })
            loadEmpire()
            buttonRef.current.focus()
            form.reset()
        } catch (error) {
            console.log(error)
            showNotification({
                title: t('finance:blackMarket.responseSellError'),
                color: 'orange',
            })
        }
    }

    return (
        <main>
            <Center my={10}>
                <Stack spacing='sm' align='center'>
                    <form
                        onSubmit={form.onSubmit((values) =>
                        {
                            // console.log(values)
                            doSell(values)
                        })
                        }
                    >
                        <div className={classes.tablecontainer}>
                            <table
                                className={classes.widetable}
                            >
                                <thead>
                                    <tr>
                                        <th weight='bold' align='center'>
                                            {t('finance:blackMarket.unit')}
                                        </th>
                                        <th weight='bold' align='center'>
                                            {t('finance:blackMarket.owned')}
                                        </th>
                                        <th weight='bold' align='center'>
                                            {t('finance:blackMarket.price')}
                                        </th>
                                        <th weight='bold' align='center'>
                                            {t('finance:blackMarket.canSell')}
                                        </th>
                                        <th weight='bold' align='center'>
                                            {t('finance:blackMarket.sell')}
                                        </th>
                                        <th weight='bold' align='center'>
                                            {t('finance:blackMarket.revenue')}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {units.map((unit, index) =>
                                    {
                                        let eraTroop = 'trp' + unit.toLowerCase()
                                        let troop = `trp${unit}`
                                        let sell = `sell${unit}`

                                        if (unit === 'Food') {
                                            troop = 'food'
                                            eraTroop = 'food'
                                        } else if (unit === 'Runes') {
                                            troop = 'runes'
                                            eraTroop = 'runes'
                                        }

                                        return (
                                            <tr key={index}>
                                                <td align='center'>
                                                    {t(`eras:eras.${eraName}.${eraTroop}`)}
                                                </td>
                                                <td align='center'>
                                                    {empire[troop].toLocaleString()}
                                                </td>
                                                <td align='center'>
                                                    ${Math.floor(priceArray[index]).toLocaleString()}
                                                </td>
                                                <td align='center'>
                                                    {Math.floor(empire[troop] * (pvtmMaxSell / 10000)).toLocaleString()}
                                                </td>
                                                <td align='center'>
                                                    <NumberInput
                                                        hideControls
                                                        min={0}
                                                        max={empire[troop] * (pvtmMaxSell / 10000)}
                                                        parser={(value) =>
                                                            value.split(' ').join('').replace(/\$\s?|(,*)|\s/g, '')
                                                        }
                                                        formatter={(value) =>
                                                        {
                                                            // console.log(typeof value)
                                                            return !Number.isNaN(parseFloat(value))
                                                                ? `${value}`.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
                                                                : ''
                                                        }
                                                        }
                                                        {...form.getInputProps(sell)}
                                                        rightSection={<MaxButton formName={form} fieldName={sell} maxValue={empire[troop] * (pvtmMaxSell / 10000)} />}
                                                    />
                                                </td>
                                                <td align='center'>
                                                    ${Math.floor(priceArray[index] * form.values[sell]).toLocaleString()}
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                        <Center mt='md'>
                            <Button type='submit' ref={buttonRef}>{t('finance:blackMarket.sellSubmit')}</Button>
                        </Center>
                    </form>
                </Stack>
            </Center>
        </main>
    )
}
