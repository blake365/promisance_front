import { Button, Center, Group, NumberInput, Card, SimpleGrid, Text } from '@mantine/core'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from '@mantine/hooks'
import Axios from 'axios'
import { empireLoaded } from '../../store/empireSlice'
import { useState } from 'react'
import { eraArray } from '../../config/eras'
import { raceArray } from '../../config/races'
import { PUBMKT_MAXFOOD, PUBMKT_MAXSELL, PVTM_FOOD, PVTM_SHOPBONUS, PVTM_TRPARM, PVTM_TRPFLY, PVTM_TRPLND, PVTM_TRPSEA } from '../../config/config'
import { MaxButton } from '../utilities/maxbutton'

// TODO: make it mobile friendly

export default function PublicMarketSell({ empire })
{
    // Public Market Workflow:
    // search empire for number of units available
    // player sets price and number of units to sell
    // add db entry with type, number, price, empireID, time to Market table
    // deduct items from selling empire

    const [result, setResult] = useState(null)

    // console.log(result)

    // const { marketItems } = useSelector((state) => state.marketItems)


    const dispatch = useDispatch()

    const getCost = (emp, base) =>
    {
        let cost = base
        // let costBonus = 1 - ((1 - PVTM_SHOPBONUS) * (emp.bldCost / emp.land) + PVTM_SHOPBONUS * (emp.bldCash / emp.land))

        // cost *= costBonus
        // cost *= (2 - ((100 + raceArray[emp.race].mod_market) / 100))

        // if (cost < base * 0.6) {
        //     cost = base * 0.6
        // }

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
            priceFood: PVTM_FOOD
        },

        validationRules: {
            sellArm: (value) => value <= empire.trpArm * (PUBMKT_MAXSELL / 100),
            sellLnd: (value) => value <= empire.trpLnd * (PUBMKT_MAXSELL / 100),
            sellFly: (value) => value <= empire.trpFly * (PUBMKT_MAXSELL / 100),
            sellSea: (value) => value <= empire.trpSea * (PUBMKT_MAXSELL / 100),
            sellFood: (value) => value <= empire.food * (PUBMKT_MAXFOOD / 100),

        },

        errorMessages: {
            sellArm: `You can't sell that many ${eraArray[empire.era].trparm}`,
            sellLnd: `You can't sell that many ${eraArray[empire.era].trplnd}`,
            sellFly: `You can't sell that many ${eraArray[empire.era].trpfly}`,
            sellSea: `You can't sell that many ${eraArray[empire.era].trpsea}`,
            sellFood: `You can't sell that many ${eraArray[empire.era].food}`,
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

    let sumObject = {}

    sumObject.kiy = 'cool'
    sumObject.num = 34



    // const loadMarketItems = async () =>
    // {
    //     try {
    //         const res = await Axios.get(`/market/${empire.uuid}`)

    //     }
    //     catch (error) {
    //         console.log(error)
    //     }
    // }

    const doSell = async (values) =>
    {
        try {
            const res = await Axios.post('/market/pubSell', values)
            setResult(res.data)
            // console.log(values)
            loadEmpireTest()
        } catch (error) {
            console.log(error)
        }
    }

    console.log(result)


    return (
        <main>
            <Center mb={10}>
                <Group direction='column' spacing='sm' align='center'>
                    <form
                        onSubmit={form.onSubmit((values) =>
                        {
                            console.log(values)
                            doSell(values)
                        })
                        }
                    >
                        <Group direction='column' spacing='sm' align='center'>
                            <SimpleGrid
                                cols={1}
                                spacing='xs'
                                sx={{ width: '99%' }}
                            >
                                <Group direction='row' spacing='md' noWrap grow>
                                    <Text weight='bold' align='center'>
                                        Unit:
                                    </Text>
                                    <Text weight='bold' align='center'>
                                        Owned:
                                    </Text>
                                    <Text weight='bold' align='center'>
                                        Price:
                                    </Text>
                                    <Text weight='bold' align='center'>
                                        Can Sell:
                                    </Text>
                                    <Text weight='bold' align='center'>
                                        Sell:
                                    </Text>
                                </Group>
                                <Group direction='row' spacing='md' noWrap grow>
                                    <Text align='center'>
                                        {eraArray[empire.era].trparm}
                                    </Text>
                                    <Text align='center'>
                                        {empire.trpArm.toLocaleString()}
                                    </Text>
                                    <Text align='center'>
                                        <NumberInput
                                            hideControls
                                            min={1}
                                            {...form.getInputProps(`priceArm`)}
                                            styles={{ input: { textAlign: 'center' } }}
                                            parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                                            formatter={(value) =>
                                                !Number.isNaN(parseFloat(value))
                                                    ? `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                                                    : '$ '
                                            }
                                        />
                                    </Text>
                                    <Text align='center'>
                                        {Math.floor(empire.trpArm * (PUBMKT_MAXSELL / 100)).toLocaleString()}
                                    </Text>
                                    <NumberInput
                                        hideControls
                                        min={0}
                                        max={Math.floor(empire.trpArm * (PUBMKT_MAXSELL / 100))}
                                        {...form.getInputProps(`sellArm`)}
                                        rightSection={<MaxButton formName={form} fieldName='sellArm' maxValue={empire.trpArm * (PUBMKT_MAXSELL / 100)} />}
                                        parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                                        formatter={(value) =>
                                            !Number.isNaN(parseFloat(value))
                                                ? ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                                                : ' '
                                        }
                                    />
                                </Group>
                                <Group direction='row' spacing='md' noWrap grow>
                                    <Text align='center'>
                                        {eraArray[empire.era].trplnd}
                                    </Text>
                                    <Text align='center'>
                                        {empire.trpLnd.toLocaleString()}
                                    </Text>

                                    <Text align='center'>
                                        <NumberInput
                                            hideControls
                                            min={1}
                                            {...form.getInputProps(`priceLnd`)}
                                            styles={{ input: { textAlign: 'center' } }}
                                            parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                                            formatter={(value) =>
                                                !Number.isNaN(parseFloat(value))
                                                    ? `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                                                    : '$ '
                                            }
                                        />
                                    </Text>
                                    <Text align='center'>
                                        {Math.floor(empire.trpLnd * (PUBMKT_MAXSELL / 100)).toLocaleString()}
                                    </Text>
                                    <NumberInput
                                        hideControls
                                        min={0}
                                        max={Math.floor(empire.trpLnd * (PUBMKT_MAXSELL / 100))}
                                        {...form.getInputProps(`sellLnd`)}
                                        rightSection={<MaxButton formName={form} fieldName='sellLnd' maxValue={empire.trpLnd * (PUBMKT_MAXSELL / 100)} />}
                                        parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                                        formatter={(value) =>
                                            !Number.isNaN(parseFloat(value))
                                                ? ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                                                : ' '
                                        }
                                    />
                                </Group>
                                <Group direction='row' spacing='md' noWrap grow>
                                    <Text align='center'>
                                        {eraArray[empire.era].trpfly}
                                    </Text>
                                    <Text align='center'>
                                        {empire.trpFly.toLocaleString()}
                                    </Text>

                                    <Text align='center'>
                                        <NumberInput
                                            hideControls
                                            min={1}
                                            {...form.getInputProps(`priceFly`)}
                                            styles={{ input: { textAlign: 'center' } }}
                                            parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                                            formatter={(value) =>
                                                !Number.isNaN(parseFloat(value))
                                                    ? `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                                                    : '$ '
                                            }
                                        />
                                    </Text>
                                    <Text align='center'>
                                        {Math.floor(empire.trpFly * (PUBMKT_MAXSELL / 100)).toLocaleString()}
                                    </Text>
                                    <NumberInput
                                        hideControls
                                        min={0}
                                        max={Math.floor(empire.trpFly * (PUBMKT_MAXSELL / 100))}
                                        {...form.getInputProps(`sellFly`)}
                                        rightSection={<MaxButton formName={form} fieldName='sellFly' maxValue={empire.trpFly * (PUBMKT_MAXSELL / 100)} />}
                                        parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                                        formatter={(value) =>
                                            !Number.isNaN(parseFloat(value))
                                                ? ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                                                : ' '
                                        }
                                    />
                                </Group>
                                <Group direction='row' spacing='md' noWrap grow>
                                    <Text align='center'>
                                        {eraArray[empire.era].trpsea}
                                    </Text>
                                    <Text align='center'>
                                        {empire.trpSea.toLocaleString()}
                                    </Text>

                                    <Text align='center'>
                                        <NumberInput
                                            hideControls
                                            min={1}
                                            {...form.getInputProps(`priceSea`)}
                                            styles={{ input: { textAlign: 'center' } }}
                                            parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                                            formatter={(value) =>
                                                !Number.isNaN(parseFloat(value))
                                                    ? `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                                                    : '$ '
                                            }
                                        />
                                    </Text>
                                    <Text align='center'>
                                        {Math.floor(empire.trpSea * (PUBMKT_MAXSELL / 100)).toLocaleString()}
                                    </Text>
                                    <NumberInput
                                        hideControls
                                        min={0}
                                        max={Math.floor(empire.trpSea * (PUBMKT_MAXSELL / 100))}
                                        {...form.getInputProps(`sellSea`)}
                                        rightSection={<MaxButton formName={form} fieldName='sellSea' maxValue={empire.trpSea * (PUBMKT_MAXSELL / 100)} />}
                                        parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                                        formatter={(value) =>
                                            !Number.isNaN(parseFloat(value))
                                                ? ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                                                : ' '
                                        }
                                    />
                                </Group>
                                <Group direction='row' spacing='md' noWrap grow>
                                    <Text align='center'>
                                        {eraArray[empire.era].food}
                                    </Text>
                                    <Text align='center'>
                                        {empire.food.toLocaleString()}
                                    </Text>

                                    <Text align='center'>
                                        <NumberInput
                                            hideControls
                                            min={1}

                                            {...form.getInputProps(`priceFood`)}
                                            styles={{ input: { textAlign: 'center' } }}
                                            parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                                            formatter={(value) =>
                                                !Number.isNaN(parseFloat(value))
                                                    ? `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                                                    : '$ '
                                            }
                                        />
                                    </Text>
                                    <Text align='center'>
                                        {Math.floor(empire.food * (PUBMKT_MAXFOOD / 100)).toLocaleString()}
                                    </Text>
                                    <NumberInput
                                        hideControls
                                        min={0}
                                        max={Math.floor(empire.food * (PUBMKT_MAXFOOD / 100))}
                                        {...form.getInputProps(`sellFood`)}
                                        rightSection={<MaxButton formName={form} fieldName='sellFood' maxValue={empire.food * (PUBMKT_MAXFOOD / 100)} />}
                                        parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                                        formatter={(value) =>
                                            !Number.isNaN(parseFloat(value))
                                                ? ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                                                : ' '
                                        }
                                    />
                                </Group>
                            </SimpleGrid>
                            <Button type='submit'> Sell Goods </Button>
                        </Group>
                    </form>

                </Group>

            </Center>
        </main>
    )
}
