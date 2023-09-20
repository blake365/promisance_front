import { Button, Center, Group, NumberInput, Card, SimpleGrid, Text, Stack } from '@mantine/core'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from '@mantine/form'
import Axios from 'axios'
import { empireLoaded } from '../../store/empireSlice'
import { useState } from 'react'
import { eraArray } from '../../config/eras'
import { raceArray } from '../../config/races'
import { PVTM_FOOD, PVTM_MAXSELL, PVTM_SHOPBONUS, PVTM_TRPARM, PVTM_TRPFLY, PVTM_TRPLND, PVTM_TRPSEA, PVTM_RUNES } from '../../config/config'
import { MaxButton } from '../utilities/maxbutton'

import classes from './markets.module.css'


// TODO: make it mobile friendly
// add sell max buttons

export default function PrivateMarketSell()
{
    const [result, setResult] = useState(null)

    const { empire } = useSelector((state) => state.empire)

    const dispatch = useDispatch()

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


    const trpArmCost = getCost(empire, PVTM_TRPARM, 0.32)
    const trpLndCost = getCost(empire, PVTM_TRPLND, 0.34)
    const trpFlyCost = getCost(empire, PVTM_TRPFLY, 0.36)
    const trpSeaCost = getCost(empire, PVTM_TRPSEA, 0.38)
    const foodCost = Math.round(PVTM_FOOD * 0.40)
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

    const doSell = async (values) =>
    {
        try {
            const res = await Axios.post('/privatemarket/sell', values)
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
                        onSubmit={form.onSubmit((values) =>
                        {
                            console.log(values)
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
                                                        {...form.getInputProps(sell)}
                                                        rightSection={<MaxButton formName={form} fieldName={sell} maxValue={empire[troop] * (PVTM_MAXSELL / 10000)} />}
                                                    />
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                        <Center mt='md'>
                            <Button type='submit'> Sell Goods </Button>
                        </Center>
                    </form>
                    {result &&
                        <Card shadow='sm' padding='sm' withBorder >
                            <Stack spacing='xs' align='center'>
                                {result?.resultSellArm.amount > 0 ? <Text>You Sold {result.resultSellArm.amount.toLocaleString()} {eraArray[empire.era].trparm} for ${result.resultSellArm.price.toLocaleString()}</Text> : ''}
                                {result?.resultSellLnd.amount > 0 ? <Text>You Sold {result.resultSellLnd.amount.toLocaleString()} {eraArray[empire.era].trplnd} for ${result.resultSellLnd.price.toLocaleString()}</Text> : ''}
                                {result?.resultSellFly.amount > 0 ? <Text>You Sold {result.resultSellFly.amount.toLocaleString()} {eraArray[empire.era].trpfly} for ${result.resultSellFly.price.toLocaleString()}</Text> : ''}
                                {result?.resultSellSea.amount > 0 ? <Text>You Sold {result.resultSellSea.amount.toLocaleString()} {eraArray[empire.era].trpsea} for ${result.resultSellSea.price.toLocaleString()}</Text> : ''}
                                {result?.resultSellFood.amount > 0 ? <Text>You Sold {result.resultSellFood.amount.toLocaleString()} {eraArray[empire.era].food} for ${result.resultSellFood.price.toLocaleString()}</Text> : ''}
                                {result?.resultSellRunes.amount > 0 ? <Text>You Sold {result.resultSellRunes.amount.toLocaleString()} {eraArray[empire.era].runes} for ${result.resultSellRunes.price.toLocaleString()}</Text> : ''}
                            </Stack>
                        </Card>
                    }
                </Stack>

            </Center>
        </main>
    )
}
