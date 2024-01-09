import { Button, Center, NumberInput, Text, Stack, Loader } from '@mantine/core'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from '@mantine/form'
import Axios from 'axios'
import { empireLoaded } from '../../store/empireSlice'
// import { useEffect, useState } from 'react'
import { eraArray } from '../../config/eras'
import { PUBMKT_MAXFOOD, PUBMKT_MAXSELL, PVTM_FOOD, PVTM_TRPARM, PVTM_TRPFLY, PVTM_TRPLND, PVTM_TRPSEA, PUBMKT_MAXRUNES, PVTM_RUNES, PUBMKT_START, PUBMKT_MAXTIME } from '../../config/config'
import { MaxButton } from '../utilities/maxbutton'

import classes from './markets.module.css'
import MyItem from './myItem'

// make it mobile friendly

export default function PublicMarketSell({ empire })
{
    // Public Market Workflow:
    // search empire for number of units available
    // player sets price and number of units to sell
    // add db entry with type, number, price, empireID, time to Market table
    // deduct items from selling empire
    // show items for sale for current empire
    // remove items after X hours and return to seller

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

    let now = new Date()

    const trpArmCost = getCost(empire, PVTM_TRPARM)
    const trpLndCost = getCost(empire, PVTM_TRPLND)
    const trpFlyCost = getCost(empire, PVTM_TRPFLY)
    const trpSeaCost = getCost(empire, PVTM_TRPSEA)

    const processItems = (items) =>
    {
        // console.log(items)
        let processedItems = []

        // take items that are on the market. 
        // create a new object that has the item type, and amount
        // if the item is greater than 12 hours old, do not add it
        // if the item is less than 12 hours old, add it to the array
        // if items are the same type, add them together to get the total amount
        // return the array

        items.forEach((item) =>
        {
            let age = Math.floor((now - new Date(item.createdAt)) / 1000 / 60 / 60)
            // console.log(age)
            if (age < 12) {
                let newItem = {
                    type: item.type,
                    amount: parseInt(item.amount),
                }

                processedItems.push(newItem)
            }
        })

        // take the processed items if the type is the same, add the amount together and consolidate into one object
        // console.log(processedItems)
        processedItems = processedItems.reduce((acc, curr) =>
        {
            let found = acc.find((item) => item.type === curr.type)

            if (found) {
                found.amount += curr.amount
            } else {
                acc.push(curr)
            }

            return acc
        }, [])
        // console.log(processedItems)
        return processedItems
    }

    let canSell = [Math.floor(empire.trpArm * (PUBMKT_MAXSELL / 100)), Math.floor(empire.trpLnd * (PUBMKT_MAXSELL / 100)), Math.floor(empire.trpFly * (PUBMKT_MAXSELL / 100)), Math.floor(empire.trpSea * (PUBMKT_MAXSELL / 100)), Math.floor(empire.food * (PUBMKT_MAXFOOD / 100)), Math.floor(empire.runes * (PUBMKT_MAXRUNES / 100))]

    let processedItems = processItems(myItems)

    if (processedItems) {
        // console.log(canSell)
        canSell = canSell.map((item, index) =>
        {
            if (processedItems.length > 0) {
                return processedItems.map((element) =>
                {
                    if (element.type === index) {
                        return canSell[index] -= element.amount
                    } else {
                        return canSell[index]
                    }
                })
            } else {
                return canSell[index]
            }
        })

        // console.log(canSell)
        canSell = canSell.map((item) =>
        {
            if (Array.isArray(item)) {
                if (item[item.length - 1] < 0) {
                    return 0
                } else
                    return item[item.length - 1]
            } else {
                if (item < 0) {
                    return 0
                } else
                    return item
            }
        })
    }

    // console.log(canSell)

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
            sellArm: (value) => value <= canSell[0],
            sellLnd: (value) => value <= canSell[1],
            sellFly: (value) => value <= canSell[2],
            sellSea: (value) => value <= canSell[3],
            sellFood: (value) => value <= canSell[4],
            sellRunes: (value) => value <= canSell[5],
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
            // dispatch(fetchMyItems())
            // setResult(res.data)
            // console.log(values)
            loadEmpireTest()
        } catch (error) {
            console.log(error)
        }
    }

    // console.log(result)

    const units = ['Arm', 'Lnd', 'Fly', 'Sea', 'Food', 'Runes']

    // console.log(myItems)

    const myItemsRows = myItems.map((element) =>
    {
        return <MyItem element={element} empire={empire} key={element.id} />
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

                                            // console.log(canSell[index])

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
                                                        />
                                                    </td>
                                                    <td align='center'>
                                                        {canSell[index].toLocaleString()}
                                                    </td>
                                                    <td>
                                                        <NumberInput
                                                            hideControls
                                                            min={0}
                                                            max={canSell[index]}
                                                            {...form.getInputProps(`${sell}`)}
                                                            rightSection={<MaxButton formName={form} fieldName={sell} maxValue={canSell[index]} />}
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


                        <div className={classes.tablecontainer}>
                            <table className={classes.widetable}>
                                <thead>
                                    <tr>
                                        <th>Item</th>
                                        <th>Amount</th>
                                        <th>Price</th>
                                        <th>Hours On Market</th>
                                        <th>Edit Price</th>
                                    </tr>
                                </thead>
                                <tbody>{myItemsRows}</tbody>
                            </table>
                        </div>
                        <Text weight='bold' align='center'>If you change the price of an item, 10% will be deducted from the amount.</Text>
                        <Text weight='bold' align='center'> If you recall items, only 75% will be returned to you. </Text>
                        <Text weight='bold' align='center'> Items on the market for {PUBMKT_MAXTIME} hours will be returned to you, only 75% will be returned. </Text>
                    </Stack>
                )}
            </Center>
        </main>
    )
}
