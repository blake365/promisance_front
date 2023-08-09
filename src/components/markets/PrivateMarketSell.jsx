import { Button, Center, Group, NumberInput, Card, SimpleGrid, Text, Stack } from '@mantine/core'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from '@mantine/form'
import Axios from 'axios'
import { empireLoaded } from '../../store/empireSlice'
import { useState } from 'react'
import { eraArray } from '../../config/eras'
import { raceArray } from '../../config/races'
import { PVTM_FOOD, PVTM_MAXSELL, PVTM_SHOPBONUS, PVTM_TRPARM, PVTM_TRPFLY, PVTM_TRPLND, PVTM_TRPSEA } from '../../config/config'
import { MaxButton } from '../utilities/maxbutton'

// TODO: make it mobile friendly
// TODO: add sell max buttons

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

    const trpArmCost = getCost(empire, PVTM_TRPARM, 0.32)
    const trpLndCost = getCost(empire, PVTM_TRPLND, 0.34)
    const trpFlyCost = getCost(empire, PVTM_TRPFLY, 0.36)
    const trpSeaCost = getCost(empire, PVTM_TRPSEA, 0.38)
    const foodCost = Math.round(PVTM_FOOD * 0.40)

    // const priceArray = [trpArmCost, trpLndCost, trpFlyCost, trpSeaCost, foodCost]

    const form = useForm({
        initialValues: {
            empireId: empire.id,
            type: 'sell',
            sellArm: 0,
            sellLnd: 0,
            sellFly: 0,
            sellSea: 0,
            sellFood: 0,
        },

        validationRules: {
            sellArm: (value) => value <= empire.trpArm * (PVTM_MAXSELL / 10000),
            sellLnd: (value) => value <= empire.trpLnd * (PVTM_MAXSELL / 10000),
            sellFly: (value) => value <= empire.trpFly * (PVTM_MAXSELL / 10000),
            sellSea: (value) => value <= empire.trpSea * (PVTM_MAXSELL / 10000),
            sellFood: (value) => value <= empire.food,
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
                        <Stack spacing='sm' align='center'>
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
                                        ${trpArmCost}
                                    </Text>
                                    <Text align='center'>
                                        {Math.floor(empire.trpArm * (PVTM_MAXSELL / 10000)).toLocaleString()}
                                    </Text>
                                    <NumberInput
                                        hideControls
                                        min={0}
                                        max={empire.trpArm * (PVTM_MAXSELL / 10000)}
                                        {...form.getInputProps(`sellArm`)}
                                        rightSection={<MaxButton formName={form} fieldName='sellArm' maxValue={empire.trpArm * (PVTM_MAXSELL / 10000)} />}
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
                                        ${trpLndCost}
                                    </Text>
                                    <Text align='center'>
                                        {Math.floor(empire.trpLnd * (PVTM_MAXSELL / 10000)).toLocaleString()}
                                    </Text>
                                    <NumberInput
                                        hideControls
                                        min={0}
                                        max={empire.trpLnd * (PVTM_MAXSELL / 10000)}
                                        {...form.getInputProps(`sellLnd`)}
                                        rightSection={<MaxButton formName={form} fieldName='sellLnd' maxValue={empire.trpLnd * (PVTM_MAXSELL / 10000)} />}
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
                                        ${trpFlyCost}
                                    </Text>
                                    <Text align='center'>
                                        {Math.floor(empire.trpFly * (PVTM_MAXSELL / 10000)).toLocaleString()}
                                    </Text>
                                    <NumberInput
                                        hideControls
                                        min={0}
                                        max={empire.trpFly * (PVTM_MAXSELL / 10000)}
                                        {...form.getInputProps(`sellFly`)}
                                        rightSection={<MaxButton formName={form} fieldName='sellFly' maxValue={empire.trpFly * (PVTM_MAXSELL / 10000)} />}
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
                                        ${trpSeaCost}
                                    </Text>
                                    <Text align='center'>
                                        {Math.floor(empire.trpSea * (PVTM_MAXSELL / 10000)).toLocaleString()}
                                    </Text>
                                    <NumberInput
                                        hideControls
                                        min={0}
                                        max={empire.trpSea * (PVTM_MAXSELL / 10000)}
                                        {...form.getInputProps(`sellSea`)}
                                        rightSection={<MaxButton formName={form} fieldName='sellSea' maxValue={empire.trpSea * (PVTM_MAXSELL / 10000)} />}
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
                                        ${foodCost}
                                    </Text>
                                    <Text align='center'>
                                        {Math.floor(empire.food).toLocaleString()}
                                    </Text>
                                    <NumberInput
                                        hideControls
                                        min={0}
                                        max={empire.food}
                                        {...form.getInputProps(`sellFood`)}
                                        rightSection={<MaxButton formName={form} fieldName='sellFood' maxValue={empire.food} />}
                                    />
                                </Group>
                            </SimpleGrid>
                            <Button type='submit'> Sell Goods </Button>
                        </Stack>
                    </form>
                    {result &&
                        <Card shadow='sm' padding='sm' withBorder sx={(theme) => ({
                            backgroundColor: theme.colors.gray[1],
                            '&:hover': {
                                backgroundColor: theme.colors.gray[2],
                            },
                        })}>
                            <Stack spacing='xs' align='center'>
                                {result?.resultSellArm.amount > 0 ? <div>You Sold {result.resultSellArm.amount.toLocaleString()} {eraArray[empire.era].trparm} for ${result.resultSellArm.price.toLocaleString()}</div> : ''}
                                {result?.resultSellLnd.amount > 0 ? <div>You Sold {result.resultSellLnd.amount.toLocaleString()} {eraArray[empire.era].trplnd} for ${result.resultSellLnd.price.toLocaleString()}</div> : ''}
                                {result?.resultSellFly.amount > 0 ? <div>You Sold {result.resultSellFly.amount.toLocaleString()} {eraArray[empire.era].trpfly} for ${result.resultSellFly.price.toLocaleString()}</div> : ''}
                                {result?.resultSellSea.amount > 0 ? <div>You Sold {result.resultSellSea.amount.toLocaleString()} {eraArray[empire.era].trpsea} for ${result.resultSellSea.price.toLocaleString()}</div> : ''}
                                {result?.resultSellFood.amount > 0 ? <div>You Sold {result.resultSellFood.amount.toLocaleString()} {eraArray[empire.era].food} for ${result.resultSellFood.price.toLocaleString()}</div> : ''}
                            </Stack>
                        </Card>
                    }
                </Stack>

            </Center>
        </main>
    )
}
