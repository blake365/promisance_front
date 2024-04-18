import { Button, Center, NumberInput, Text, Stack, Loader } from '@mantine/core'
import { useSelector, useDispatch } from 'react-redux'
import { useForm } from '@mantine/form'
import Axios from 'axios'
// import { useEffect, useState } from 'react'
import { eraArray } from '../../config/eras'
import { MaxButton } from '../utilities/maxbutton'
import classes from './markets.module.css'
import MyItem from './myItem'
import { useLoadEmpire } from '../../hooks/useLoadEmpire'
import { showNotification } from '@mantine/notifications'
import { fetchMyItems } from '../../store/pubMarketSlice'
import { useRef } from 'react'
import { checkRoundStatus } from '../../functions/checkRoundStatus'
import { useTour } from "@reactour/tour"
// make it mobile friendly

export default function PublicMarketSell({ empire })
{
    const dispatch = useDispatch()
    const loadEmpire = useLoadEmpire(empire.uuid)
    // console.log(result)
    const { myItems } = useSelector((state) => state.market)
    const { otherItems } = useSelector((state) => state.market)
    const { pvtmShopBonus, pvtmTrpArm, pvtmTrpLnd, pvtmTrpFly, pvtmTrpSea, pvtmFood, pvtmRunes, pubMktMaxFood, pubMktMaxSell, pubMktMaxRunes, pubMktStart, pubMktMaxTime } = useSelector((state) => state.games.activeGame)
    const { setCurrentStep, meta } = useTour()
    // console.log(otherItems)
    const buttonRef = useRef()

    const getCost = (unit, base) =>
    {
        let cost = base
        const postedItem = otherItems[unit][0].price

        // console.log(postedItem)
        if (postedItem > 0) {
            cost = postedItem
        }

        return Math.round(cost)
    }

    const now = new Date()

    const trpArmCost = getCost('arm', pvtmTrpArm)
    const trpLndCost = getCost('lnd', pvtmTrpLnd)
    const trpFlyCost = getCost('fly', pvtmTrpFly)
    const trpSeaCost = getCost('sea', pvtmTrpSea)
    const foodCost = getCost('food', pvtmFood)
    const runesCost = getCost('runes', pvtmRunes)

    const processItems = (items) =>
    {
        // console.log(items)
        let processedItems = []
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

    let canSell = [Math.floor(empire.trpArm * (pubMktMaxSell / 100)), Math.floor(empire.trpLnd * (pubMktMaxSell / 100)), Math.floor(empire.trpFly * (pubMktMaxSell / 100)), Math.floor(empire.trpSea * (pubMktMaxSell / 100)), Math.floor(empire.food * (pubMktMaxFood / 100)), Math.floor(empire.runes * (pubMktMaxRunes / 100))]

    const processedItems = processItems(myItems)

    if (processedItems) {
        // console.log(canSell)
        canSell = canSell.map((item, index) =>
        {
            if (processedItems.length > 0) {
                return processedItems.map((element) =>
                {
                    if (element.type === index) {
                        return canSell[index] -= element.amount
                    }
                    return canSell[index]

                })
            }
            return canSell[index]

        })

        // console.log(canSell)
        canSell = canSell.map((item) =>
        {
            if (Array.isArray(item)) {
                if (item[item.length - 1] < 0) {
                    return 0
                }
                return item[item.length - 1]
            }
            if (item < 0) {
                return 0
            }
            return item

        })
    }

    // console.log(canSell)

    // console.log(trpArmCost)
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
            priceFood: foodCost,
            sellRunes: 0,
            priceRunes: runesCost,
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
    const interpretResults = (result) =>
    {
        return result.map((element, index) =>
        {
            let item = ''
            if (index === 0) {
                item = 'trparm'
            } else if (index === 1) {
                item = 'trplnd'
            } else if (index === 2) {
                item = 'trpfly'
            } else if (index === 3) {
                item = 'trpsea'
            } else if (index === 4) {
                item = 'food'
            } else if (index === 5) {
                item = 'runes'
            }

            if (element.amount > 0) {
                return <Text key={index}>Listed {element.amount.toLocaleString()} {eraArray[empire.era][item]} for ${element.price}</Text>
            }
        })
    }

    const doSell = async (values) =>
    {
        try {
            const res = await Axios.post(`/publicmarket/pubSell?gameId=${empire.game_id}`, values)
            // dispatch(fetchMyItems())
            // console.log(res.data)
            // console.log(values)
            showNotification({
                title: 'Items Listed On Market',
                message: interpretResults(res.data),
            })
            dispatch(fetchMyItems({ empireId: empire.id }))
            buttonRef.current.focus()
            form.reset()
            loadEmpire()
            if (meta !== 'new player tutorial' && meta) {
                setCurrentStep(10)
            }
        } catch (error) {
            console.log(error)
        }
    }

    // console.log(result)

    const units = ['Arm', 'Lnd', 'Fly', 'Sea', 'Food', 'Runes']
    const prices = [trpArmCost, trpLndCost, trpFlyCost, trpSeaCost, pvtmFood, pvtmRunes]

    // console.log(myItems)

    const myItemsRows = myItems.map((element) =>
    {
        return <MyItem element={element} empire={empire} key={element.id} />
    });

    const roundStatus = checkRoundStatus(true)

    return (
        <main>
            <Center my={10}>
                {!myItems ? (
                    <Loader />) : (
                    <Stack spacing='sm' align='center'>
                        <Text weight='bold' align='center'>Items you sell will take {pubMktStart} hours to appear on the market.</Text>
                        {roundStatus && <Text weight='bold' color='red' align='center'>The market has closed for the remainder of the round.</Text>}
                        <form
                            onSubmit={form.onSubmit((values) =>
                            {
                                // console.log(values)
                                doSell(values)
                            })
                            }
                            className='dwarf9 ghoul9 goblin9 orc9'
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
                                            <th weight='bold' align='center'>
                                                Revenue:
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody >
                                        {units.map((unit, index) =>
                                        {
                                            let eraTroop = 'trp' + unit.toLowerCase()
                                            let troop = `trp${unit}`
                                            const price = `price${unit}`
                                            const sell = `sell${unit}`
                                            let classN = '' // indy races
                                            let defPrice = getCost(unit.toLowerCase(), form.values[price])
                                            // console.log(otherItems[unit.toLowerCase()][0].price
                                            if (otherItems[unit.toLowerCase()][0].price !== 0 && otherItems[unit.toLowerCase()][0].price !== form.values[price]) {
                                                defPrice = otherItems[unit.toLowerCase()][0].price
                                            }
                                            if (unit === 'Food') {
                                                troop = 'food'
                                                eraTroop = 'food'
                                                classN = 'gremlin9 hobbit9'
                                            } else if (unit === 'Runes') {
                                                troop = 'runes'
                                                eraTroop = 'runes'
                                                classN = ''
                                            }

                                            return (
                                                <tr key={unit} className={classN}>
                                                    <td align='center'>
                                                        {eraArray[empire.era][eraTroop]}
                                                    </td>
                                                    <td align='center'>
                                                        {empire[troop].toLocaleString()}
                                                    </td>
                                                    <td align='center'>
                                                        <NumberInput
                                                            hideControls
                                                            min={prices[index] * 0.25}
                                                            max={prices[index] * 2}
                                                            defaultValue={defPrice}
                                                            {...form.getInputProps(`${price}`)}
                                                            styles={{ input: { textAlign: 'center' } }}
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
                                                                return !Number.isNaN(Number.parseFloat(value))
                                                                    ? `${value}`.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
                                                                    : ''
                                                            }
                                                            }
                                                        />
                                                    </td>
                                                    <td align='center'>
                                                        ${(form.values[sell] * form.values[price]).toLocaleString()}
                                                    </td>
                                                </tr>
                                            )
                                        })}

                                    </tbody>
                                </table>
                            </div>
                            <Center mt='md'>
                                <Button type='submit' ref={buttonRef} disabled={roundStatus}>Sell Goods</Button>
                            </Center>
                        </form>

                        <div className='gremlin10 dwarf10 ghoul10 goblin10 orc10 hobbit10 '>
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
                            <Text weight='bold' align='center'> Items on the market for {pubMktMaxTime} hours will be returned to you, only 75% will be returned. </Text>
                        </div>
                    </Stack>
                )}
            </Center>
        </main>
    )
}
