import { Button, Center, NumberInput, Text, Stack } from '@mantine/core'
import { useSelector } from 'react-redux'
import { useForm } from '@mantine/form'
import Axios from 'axios'
import { eraArray } from '../../config/eras'
import { raceArray } from '../../config/races'
import { PVTM_FOOD, PVTM_MAXSELL, PVTM_SHOPBONUS, PVTM_TRPARM, PVTM_TRPFLY, PVTM_TRPLND, PVTM_TRPSEA, PVTM_RUNES } from '../../config/config'
import { MaxButton } from '../utilities/maxbutton'

import classes from './markets.module.css'
import { useLoadEmpire } from '../../hooks/useLoadEmpire'
import { showNotification } from '@mantine/notifications'
import { useRef } from 'react'


// TODO: make it mobile friendly
// add sell max buttons

export default function PrivateMarketSell()
{
    const { empire } = useSelector((state) => state.empire)
    const loadEmpire = useLoadEmpire(empire.uuid)
    const buttonRef = useRef()

    const getCost = (emp, base, multiplier) =>
    {
        let cost = base * multiplier
        let costBonus = 1 + ((1 - PVTM_SHOPBONUS) * (emp.bldCost / emp.land) + PVTM_SHOPBONUS * (emp.bldCash / emp.land))

        cost *= costBonus
        cost /= (2 - ((100 + raceArray[emp.race].mod_market) / 100))

        if (cost > base * 0.5) {
            cost = base * 0.5
        }

        return Math.round(cost)
    }

    const units = ['Arm', 'Lnd', 'Fly', 'Sea', 'Food', 'Runes']

    const trpArmCost = getCost(empire, PVTM_TRPARM, 0.38)
    const trpLndCost = getCost(empire, PVTM_TRPLND, 0.4)
    const trpFlyCost = getCost(empire, PVTM_TRPFLY, 0.42)
    const trpSeaCost = getCost(empire, PVTM_TRPSEA, 0.44)
    const foodCost = Math.round(PVTM_FOOD * 0.30)
    const runesCost = Math.round(PVTM_RUNES * 0.20)

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
            sellArm: (value) => value <= empire.trpArm * (PVTM_MAXSELL / 10000),
            sellLnd: (value) => value <= empire.trpLnd * (PVTM_MAXSELL / 10000),
            sellFly: (value) => value <= empire.trpFly * (PVTM_MAXSELL / 10000),
            sellSea: (value) => value <= empire.trpSea * (PVTM_MAXSELL / 10000),
            sellFood: (value) => value <= empire.food,
            sellRunes: (value) => value <= empire.runes,
        },

        errorMessages: {
            sellArm: `You can't sell that many ${eraArray[empire.era].trparm}`,
            sellLnd: `You can't sell that many ${eraArray[empire.era].trplnd}`,
            sellFly: `You can't sell that many ${eraArray[empire.era].trpfly}`,
            sellSea: `You can't sell that many ${eraArray[empire.era].trpsea}`,
            sellFood: `You can't sell that many ${eraArray[empire.era].food}`,
            sellRunes: `You can't sell that many ${eraArray[empire.era].runes}`,
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
            returnArray.push(`You Sold ${result.resultSellArm.amount.toLocaleString()} ${eraArray[empire.era].trparm} for $${result.resultSellArm.price.toLocaleString()}`)
        }
        if (result.resultSellLnd.amount > 0) {
            returnArray.push(`You Sold ${result.resultSellLnd.amount.toLocaleString()} ${eraArray[empire.era].trplnd} for $${result.resultSellLnd.price.toLocaleString()}`)
        }
        if (result.resultSellFly.amount > 0) {
            returnArray.push(`You Sold ${result.resultSellFly.amount.toLocaleString()} ${eraArray[empire.era].trpfly} for $${result.resultSellFly.price.toLocaleString()}`)
        }
        if (result.resultSellSea.amount > 0) {
            returnArray.push(`You Sold ${result.resultSellSea.amount.toLocaleString()} ${eraArray[empire.era].trpsea} for $${result.resultSellSea.price.toLocaleString()}`)
        }
        if (result.resultSellFood.amount > 0) {
            returnArray.push(`You Sold ${result.resultSellFood.amount.toLocaleString()} ${eraArray[empire.era].food} for $${result.resultSellFood.price.toLocaleString()}`)
        }
        if (result.resultSellRunes.amount > 0) {
            returnArray.push(`You Sold ${result.resultSellRunes.amount.toLocaleString()} ${eraArray[empire.era].runes} for $${result.resultSellRunes.price.toLocaleString()}`)
        }
        return returnArray
    }

    const doSell = async (values) =>
    {
        try {
            const res = await Axios.post('/privatemarket/sell', values)
            const result = res.data
            const resultArray = interpretResult(result)
            showNotification({
                title: 'Items Sold',
                message: resultArray.map((item) => <Text>{item}</Text>),
                color: 'blue',
            })
            loadEmpire()
            buttonRef.current.focus()
            form.reset()
        } catch (error) {
            console.log(error)
            showNotification({
                title: 'Error Selling Goods',
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
                                            Unit:
                                        </th>
                                        <th weight='bold' align='center'>
                                            Owned:
                                        </th>
                                        <th weight='bold' align='center'>
                                            Price:
                                        </th>
                                        <th weight='bold' align='center'>
                                            Can Sell:
                                        </th>
                                        <th weight='bold' align='center'>
                                            Sell:
                                        </th>
                                        <th weight='bold' align='center'>
                                            Revenue:
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
                                                    {eraArray[empire.era][eraTroop]}
                                                </td>
                                                <td align='center'>
                                                    {empire[troop].toLocaleString()}
                                                </td>
                                                <td align='center'>
                                                    ${Math.floor(priceArray[index]).toLocaleString()}
                                                </td>
                                                <td align='center'>
                                                    {Math.floor(empire[troop] * (PVTM_MAXSELL / 10000)).toLocaleString()}
                                                </td>
                                                <td align='center'>
                                                    <NumberInput
                                                        hideControls
                                                        min={0}
                                                        max={empire[troop] * (PVTM_MAXSELL / 10000)}
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
                                                        rightSection={<MaxButton formName={form} fieldName={sell} maxValue={empire[troop] * (PVTM_MAXSELL / 10000)} />}
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
                            <Button type='submit' ref={buttonRef}>Sell Goods</Button>
                        </Center>
                    </form>
                </Stack>
            </Center>
        </main>
    )
}
