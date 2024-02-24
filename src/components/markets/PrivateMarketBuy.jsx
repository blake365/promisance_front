import { Button, Center, NumberInput, Stack, Text } from '@mantine/core'
import { useSelector } from 'react-redux'
import { useForm } from '@mantine/form'
import Axios from 'axios'
import { eraArray } from '../../config/eras'
import { raceArray } from '../../config/races'
import { PVTM_FOOD, PVTM_RUNES, PVTM_SHOPBONUS, PVTM_TRPARM, PVTM_TRPFLY, PVTM_TRPLND, PVTM_TRPSEA } from '../../config/config'
import { MaxButton } from '../utilities/maxbutton'
import { useRef } from 'react'
import classes from './markets.module.css'
import { useLoadEmpire } from '../../hooks/useLoadEmpire'
import { showNotification } from '@mantine/notifications'


// DONE: build sell side of market
// make it mobile friendly
// DONE: add buy max buttons
// FIXED: max buy can be higher than available

export default function PrivateMarketBuy()
{

    let buyNumberArray = []
    let totalPrice = 0
    let errors = {
        error: '',
    }

    const buttonRef = useRef()
    const { empire } = useSelector((state) => state.empire)
    const loadEmpire = useLoadEmpire(empire.uuid)

    const getCost = (emp, base) =>
    {
        let cost = base
        let costBonus = 1 - ((1 - PVTM_SHOPBONUS) * (emp.bldCost / emp.land) + PVTM_SHOPBONUS * (emp.bldCash / emp.land))

        cost *= costBonus
        cost *= (2 - ((100 + raceArray[emp.race].mod_market) / 100))

        if (cost < base * 0.6) {
            cost = base * 0.6
        }

        return Math.round(cost)
    }

    const units = ['Arm', 'Lnd', 'Fly', 'Sea', 'Food', 'Runes']

    const trpArmCost = getCost(empire, PVTM_TRPARM)
    const trpLndCost = getCost(empire, PVTM_TRPLND)
    const trpFlyCost = getCost(empire, PVTM_TRPFLY)
    const trpSeaCost = getCost(empire, PVTM_TRPSEA)

    const priceArray = [trpArmCost, trpLndCost, trpFlyCost, trpSeaCost, PVTM_FOOD, PVTM_RUNES]

    let availArray = [empire.mktArm, empire.mktLnd, empire.mktFly, empire.mktSea, empire.mktFood, empire.mktRunes]

    availArray = availArray.map((item, index) =>
    {
        if (item < Math.floor(empire.cash / priceArray[index])) {
            return item
        } else {
            return Math.floor(empire.cash / priceArray[index])
        }
    })

    const form = useForm({
        initialValues: {
            empireId: empire.id,
            type: 'buy',
            buyArm: 0,
            buyLnd: 0,
            buyFly: 0,
            buySea: 0,
            buyFood: 0,
            buyRunes: 0,
        },

        validationRules: {
            buyArm: (value) => value <= empire.cash / trpArmCost,
            buyLnd: (value) => value <= empire.cash / trpLndCost,
            buyFly: (value) => value <= empire.cash / trpFlyCost,
            buySea: (value) => value <= empire.cash / trpSeaCost,
            buyFood: (value) => value <= empire.cash / PVTM_FOOD,
            buyRunes: (value) => value <= empire.cash / PVTM_RUNES,
        },

        errorMessages: {
            buyArm: 'Not Enough Money',
            buyLnd: 'Not Enough Money',
            buyFly: 'Not Enough Money',
            buySea: 'Not Enough Money',
            buyFood: 'Not Enough Money',
            buyRunes: 'Not Enough Money',
        },
    })

    if (form.values['buyArm'] === undefined) {
        form.setFieldValue('buyArm', 0)
    }
    if (form.values['buyLnd'] === undefined) {
        form.setFieldValue('buyLnd', 0)
    }
    if (form.values['buyFly'] === undefined) {
        form.setFieldValue('buyFly', 0)
    }
    if (form.values['buySea'] === undefined) {
        form.setFieldValue('buySea', 0)
    }
    if (form.values['buyFood'] === undefined) {
        form.setFieldValue('buyFood', 0)
    }
    if (form.values['buyRunes'] === undefined) {
        form.setFieldValue('buyRunes', 0)
    }

    buyNumberArray = Object.values(form.values).slice(2)
    // console.log(buyNumberArray)

    const spendArray = buyNumberArray.map((value, index) =>
    {
        value = value * priceArray[index]
        return value
    })

    totalPrice = spendArray
        .filter(Number)
        .reduce((partialSum, a) => partialSum + a, 0)
    // console.log(totalPrice)
    // console.log(value)

    function setErrors(error)
    {
        errors.error = error
    }

    const interpretResult = (result) =>
    {
        let returnArray = []
        if (result?.resultBuyArm.amount > 0) {
            returnArray.push(`You purchased ${result.resultBuyArm.amount.toLocaleString()} ${eraArray[empire.era].trparm} for $${result.resultBuyArm.price.toLocaleString()}`)
        }
        if (result?.resultBuyLnd.amount > 0) {
            returnArray.push(`You purchased ${result.resultBuyLnd.amount.toLocaleString()} ${eraArray[empire.era].trplnd} for $${result.resultBuyLnd.price.toLocaleString()}`)
        }
        if (result?.resultBuyFly.amount > 0) {
            returnArray.push(`You purchased ${result.resultBuyFly.amount.toLocaleString()} ${eraArray[empire.era].trpfly} for $${result.resultBuyFly.price.toLocaleString()}`)
        }
        if (result?.resultBuySea.amount > 0) {
            returnArray.push(`You purchased ${result.resultBuySea.amount.toLocaleString()} ${eraArray[empire.era].trpsea} for $${result.resultBuySea.price.toLocaleString()}`)
        }
        if (result?.resultBuyFood.amount > 0) {
            returnArray.push(`You purchased ${result.resultBuyFood.amount.toLocaleString()} ${eraArray[empire.era].food} for $${result.resultBuyFood.price.toLocaleString()}`)
        }
        if (result?.resultBuyRunes.amount > 0) {
            returnArray.push(`You purchased ${result.resultBuyRunes.amount.toLocaleString()} ${eraArray[empire.era].runes} for $${result.resultBuyRunes.price.toLocaleString()}`)
        }
        return returnArray
    }

    const doBuy = async (values) =>
    {
        try {
            const res = await Axios.post('/privatemarket/buy', values)
            const result = res.data
            const resultArray = interpretResult(result)
            showNotification({
                title: 'Purchase Successful',
                message: resultArray.map((item) => <Text>{item}</Text>),
                color: 'blue',
            })
            loadEmpire()
            buttonRef.current.focus()
            form.reset()
        } catch (error) {
            console.log(error)
            showNotification({
                title: 'Error Purchasing Goods',
                color: 'orange',
            })
        }
    }

    return (
        <main>
            <Center my={10}>
                <Stack spacing='sm' align='center'>
                    <form
                        onSubmit={
                            totalPrice < empire.cash
                                ? form.onSubmit((values) =>
                                {
                                    // console.log(values)
                                    doBuy(values)
                                })
                                : setErrors("Not Enough Money")
                        }
                    >
                        <div className={classes.tablecontainer}>
                            <table className={classes.widetable}>
                                <thead>
                                    <tr>
                                        <th weight='bold' align='center'>
                                            Unit:
                                        </th>
                                        <th weight='bold' align='center'>
                                            Owned:
                                        </th>
                                        <th weight='bold' align='center'>
                                            Available:
                                        </th>
                                        <th weight='bold' align='center'>
                                            Price:
                                        </th>
                                        <th weight='bold' align='center'>
                                            Can Afford:
                                        </th>
                                        <th weight='bold' align='center'>
                                            Buy:
                                        </th>
                                        <th weight='bold' align='center'>
                                            Spend:
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {units.map((unit, index) =>
                                    {
                                        let eraTroop = 'trp' + unit.toLocaleLowerCase()
                                        let troop = `trp${unit}`
                                        let mktTroop = `mkt${unit}`
                                        let price = priceArray[index]
                                        let avail = availArray[index]
                                        let buy = `buy${unit}`

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
                                                    {empire[mktTroop].toLocaleString()}
                                                </td>
                                                <td align='center'>
                                                    ${price}
                                                </td>
                                                <td align='center'>
                                                    {avail.toLocaleString()}
                                                </td>
                                                <td align='center'>
                                                    <NumberInput
                                                        w={130}
                                                        hideControls
                                                        min={0}
                                                        max={avail}
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
                                                        {...form.getInputProps(buy)}
                                                        rightSection={<MaxButton formName={form} fieldName={buy} maxValue={avail} />}
                                                    />
                                                </td>
                                                <td align='center'>
                                                    ${(price * form.values[buy]).toLocaleString()}
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                        <Stack align='center'>
                            <Text style={{ color: 'red' }}>{errors.error}</Text>
                            <Button type='submit' disabled={errors.error} ref={buttonRef}>
                                Buy Goods
                            </Button>
                        </Stack>
                    </form>
                </Stack>
            </Center>
        </main>
    )
}
