import { Button, Center, NumberInput, Text, Table, Stack, Loader } from '@mantine/core'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from '@mantine/form'
import Axios from 'axios'
import { empireLoaded } from '../../store/empireSlice'
// import { useEffect, useState } from 'react'
import { eraArray } from '../../config/eras'
import { PUBMKT_MAXFOOD, PUBMKT_MAXSELL, PVTM_FOOD, PVTM_TRPARM, PVTM_TRPFLY, PVTM_TRPLND, PVTM_TRPSEA, PUBMKT_MAXRUNES, PVTM_RUNES, PUBMKT_START } from '../../config/config'
import { MaxButton } from '../utilities/maxbutton'
import { fetchMyItems } from '../../store/pubMarketSlice'

import classes from './markets.module.css'


// make it mobile friendly

export default function PublicMarketSell({ empire })
{
    // Public Market Workflow:
    // search empire for number of units available
    // player sets price and number of units to sell
    // add db entry with type, number, price, empireID, time to Market table
    // deduct items from selling empire
    // show items for sale for current empire
    // TODO: remove items after X hours and return to seller

    const dispatch = useDispatch()
    // const [result, setResult] = useState(null)

    // console.log(result)
    const { myItems } = useSelector((state) => state.market)

    // console.log(myItems)

    const getCost = (emp, base) =>
    {
        let cost = base

        return Math.round(cost)
    }

    const trpArmCost = getCost(empire, PVTM_TRPARM)
    const trpLndCost = getCost(empire, PVTM_TRPLND)
    const trpFlyCost = getCost(empire, PVTM_TRPFLY)
    const trpSeaCost = getCost(empire, PVTM_TRPSEA)

    const form = useForm({
        initialValues: {
            empireId: empire.id,
            type: 'sell',
            sellArm: 0,
            priceArm: trpArmCost,
            sellLnd: 0,
            priceLnd: trpLndCost,
            sellFly: 0,
            priceFly: trpFlyCost,
            sellSea: 0,
            priceSea: trpSeaCost,
            sellFood: 0,
            priceFood: PVTM_FOOD,
            sellRunes: 0,
            priceRunes: PVTM_RUNES,
        },

        validationRules: {
            sellArm: (value) => value <= empire.trpArm * (PUBMKT_MAXSELL / 100),
            sellLnd: (value) => value <= empire.trpLnd * (PUBMKT_MAXSELL / 100),
            sellFly: (value) => value <= empire.trpFly * (PUBMKT_MAXSELL / 100),
            sellSea: (value) => value <= empire.trpSea * (PUBMKT_MAXSELL / 100),
            sellFood: (value) => value <= empire.food * (PUBMKT_MAXFOOD / 100),
            sellRunes: (value) => value <= empire.food * (PUBMKT_MAXRUNES / 100)
        },

        errorMessages: {
            sellArm: `You can't sell that many ${eraArray[empire.era].trparm}`,
            sellLnd: `You can't sell that many ${eraArray[empire.era].trplnd}`,
            sellFly: `You can't sell that many ${eraArray[empire.era].trpfly}`,
            sellSea: `You can't sell that many ${eraArray[empire.era].trpsea}`,
            sellFood: `You can't sell that many ${eraArray[empire.era].food}`,
            sellRunes: `You can't sell that many ${eraArray[empire.era].runes}`
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
    if (form.values['priceArm'] === undefined) {
        form.setFieldValue('priceArm', 0)
    }
    if (form.values['priceLnd'] === undefined) {
        form.setFieldValue('priceLnd', 0)
    }
    if (form.values['priceFly'] === undefined) {
        form.setFieldValue('priceFly', 0)
    }
    if (form.values['priceSea'] === undefined) {
        form.setFieldValue('priceSea', 0)
    }
    if (form.values['priceFood'] === undefined) {
        form.setFieldValue('priceFood', 0)
    }
    if (form.values['priceRunes'] === undefined) {
        form.setFieldValue('priceRunes', 0)
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
            const res = await Axios.post('/publicmarket/pubSell', values)
            dispatch(fetchMyItems())
            // setResult(res.data)
            // console.log(values)
            loadEmpireTest()
        } catch (error) {
            console.log(error)
        }
    }

    // console.log(result)

    let now = new Date()
    // console.log(now.getTime())

    const units = ['Arm', 'Lnd', 'Fly', 'Sea', 'Food', 'Runes']

    let unitArray = [eraArray[empire.era].trparm, eraArray[empire.era].trplnd, eraArray[empire.era].trpfly, eraArray[empire.era].trpsea, eraArray[empire.era].food, eraArray[empire.era].runes]

    function truncate(value, precision)
    {
        var step = Math.pow(10, precision || 0);
        var temp = Math.trunc(step * value);

        return temp / step;
    }

    const myItemsRows = myItems.map((element) =>
    {
        let createdAt = new Date(element.createdAt)
        createdAt = createdAt.getTime()
        let hoursOnMarket = truncate(((now - createdAt) / 3600000), 1)
        let timeRemaining = PUBMKT_START - hoursOnMarket
        if (hoursOnMarket < 6) {
            hoursOnMarket = `${timeRemaining} hours remaining`
        }
        return (
            <tr tr key={element.id}>
                <td>{unitArray[element.type]}</td>
                <td>{parseInt(element.amount).toLocaleString()}</td>
                <td>${element.price.toLocaleString()}</td>
                <td>{hoursOnMarket}</td>
            </tr>
        )
    });





    return (
        <main>
            <Center my={10}>

                {!myItems ? (
                    <Loader />) : (

                    <Stack spacing='sm' align='center'>
                        <Text weight='bold' align='center'>Items you sell will take {PUBMKT_START} hours to appear on the market.</Text>
                        <form
                            onSubmit={form.onSubmit((values) =>
                            {
                                // console.log(values)
                                doSell(values)
                            })
                            }
                        >

                            <div className={classes.tablecontainer}>
                                <table className={classes.widetable}>
                                    <thead>
                                        <tr>
                                            <th weight='bold' align='center'>
                                                Item:
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
                                            let price = `price${unit}`
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
                                                        <NumberInput
                                                            hideControls
                                                            min={1}
                                                            {...form.getInputProps(`${price}`)}
                                                            styles={{ input: { textAlign: 'center' } }}
                                                            parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                                                            formatter={(value) =>
                                                                !Number.isNaN(parseFloat(value))
                                                                    ? `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                                                                    : '$ '
                                                            }
                                                        />
                                                    </td>
                                                    <td align='center'>
                                                        {Math.floor(empire[troop] * (PUBMKT_MAXSELL / 100)).toLocaleString()}
                                                    </td>
                                                    <td>
                                                        <NumberInput
                                                            hideControls
                                                            min={0}
                                                            max={Math.floor(empire[troop] * (PUBMKT_MAXSELL / 100))}
                                                            {...form.getInputProps(`${sell}`)}
                                                            rightSection={<MaxButton formName={form} fieldName={sell} maxValue={empire[troop] * (PUBMKT_MAXSELL / 100)} />}
                                                            parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                                                            formatter={(value) =>
                                                                !Number.isNaN(parseFloat(value))
                                                                    ? `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                                                                    : ''
                                                            }
                                                        />
                                                    </td>
                                                </tr>)
                                        })}

                                    </tbody>
                                </table>
                            </div>
                            <Center mt='md'>
                                <Button type='submit'> Sell Goods </Button>
                            </Center>
                        </form>
                        <Table>
                            <thead>
                                <tr>
                                    <th>Item</th>
                                    <th>Amount</th>
                                    <th>Price</th>
                                    <th>Hours On Market</th>
                                </tr>
                            </thead>
                            <tbody>{myItemsRows}</tbody>
                        </Table>
                    </Stack>
                )}
            </Center>
        </main>
    )
}
