import { Button, Center, NumberInput, Card, Stack } from '@mantine/core'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from '@mantine/form'
import Axios from 'axios'
import { empireLoaded } from '../../store/empireSlice'
import { useState } from 'react'
import { eraArray } from '../../config/eras'
import { raceArray } from '../../config/races'
import { PVTM_FOOD, PVTM_RUNES, PVTM_SHOPBONUS, PVTM_TRPARM, PVTM_TRPFLY, PVTM_TRPLND, PVTM_TRPSEA } from '../../config/config'
import { MaxButton } from '../utilities/maxbutton'

import classes from './markets.module.css'


// DONE: build sell side of market
// make it mobile friendly
// DONE: add buy max buttons
// FIXED: max buy can be higher than available

export default function PrivateMarketBuy()
{
    const [result, setResult] = useState(null)

    let buyNumberArray = []

    let totalPrice = 0
    let errors = {
        error: '',
    }
    const { empire } = useSelector((state) => state.empire)

    const dispatch = useDispatch()

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



    // console.log(availArray)
    // console.log(priceArray)

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

    // console.log(spendArray)

    // totalBuy = buyNumberArray
    //     .filter(Number)
    //     .reduce((partialSum, a) => partialSum + a, 0)
    // console.log(totalBuy)

    totalPrice = spendArray
        .filter(Number)
        .reduce((partialSum, a) => partialSum + a, 0)
    // console.log(totalPrice)
    // console.log(value)

    function setErrors(error)
    {
        errors.error = error
    }

    // console.log(result)

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

    const doBuy = async (values) =>
    {
        try {
            const res = await Axios.post('/privatemarket/buy', values)
            setResult(res.data)
            loadEmpireTest()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <main>
            <Center my={10}>
                <Stack spacing='sm' align='center'>
                    <form
                        onSubmit={
                            totalPrice <= empire.cash
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
                                            Can Buy:
                                        </th>
                                        <th weight='bold' align='center'>
                                            Buy:
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
                                                        hideControls
                                                        min={0}
                                                        max={avail}
                                                        {...form.getInputProps(buy)}
                                                        rightSection={<MaxButton formName={form} fieldName={buy} maxValue={avail} />}
                                                    />
                                                </td>
                                            </tr>
                                        )
                                    })}


                                </tbody>
                            </table>
                        </div>
                        <Center mt='md'>
                            <div style={{ color: 'red' }}>{errors.error}</div>
                            {errors.error ? (
                                <Button color='black' type='submit' disabled>
                                    Buy Goods
                                </Button>
                            ) : (
                                <Button color='black' type='submit'>
                                    Buy Goods
                                </Button>
                            )}
                        </Center>
                    </form>
                    {result &&
                        <Card shadow='sm' padding='sm' withBorder sx={(theme) => ({
                            backgroundColor: theme.colors.gray[1],
                            '&:hover': {
                                backgroundColor: theme.colors.gray[2],
                            },
                        })}>
                            <Stack spacing='xs' align='center'>
                                {result?.resultBuyArm.amount > 0 ? <div>You purchased {result.resultBuyArm.amount.toLocaleString()} {eraArray[empire.era].trparm} for ${result.resultBuyArm.price.toLocaleString()}</div> : ''}
                                {result?.resultBuyLnd.amount > 0 ? <div>You purchased {result.resultBuyLnd.amount.toLocaleString()} {eraArray[empire.era].trplnd} for ${result.resultBuyLnd.price.toLocaleString()}</div> : ''}
                                {result?.resultBuyFly.amount > 0 ? <div>You purchased {result.resultBuyFly.amount.toLocaleString()} {eraArray[empire.era].trpfly} for ${result.resultBuyFly.price.toLocaleString()}</div> : ''}
                                {result?.resultBuySea.amount > 0 ? <div>You purchased {result.resultBuySea.amount.toLocaleString()} {eraArray[empire.era].trpsea} for ${result.resultBuySea.price.toLocaleString()}</div> : ''}
                                {result?.resultBuyFood.amount > 0 ? <div>You purchased {result.resultBuyFood.amount.toLocaleString()} {eraArray[empire.era].food} for ${result.resultBuyFood.price.toLocaleString()}</div> : ''}
                                {result?.resultBuyRunes.amount > 0 ? <div>You purchased {result.resultBuyRunes.amount.toLocaleString()} {eraArray[empire.era].runes} for ${result.resultBuyRunes.price.toLocaleString()}</div> : ''}
                            </Stack>
                        </Card>
                    }
                </Stack>

            </Center>
        </main>
    )
}
