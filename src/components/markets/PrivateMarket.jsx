import { Button, Center, Group, NumberInput, Table, Title, Card, SimpleGrid, Text } from '@mantine/core'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from '@mantine/hooks'
import Axios from 'axios'
import { empireLoaded } from '../../store/empireSlice'
import { clearResult, setResult } from '../../store/turnResultsSlice'
import { useState } from 'react'


export default function PrivateMarket()
{
    const [result, setResult] = useState(null)

    let buyNumberArray = []
    let totalBuy = 0
    let totalPrice = 0
    let errors = {
        error: '',
    }
    const { empire } = useSelector((state) => state.empire)

    const dispatch = useDispatch()

    const getCost = (emp, base) =>
    {
        let cost = base
        let costBonus = 1 - ((1 - 0.2) * (emp.bldCost / emp.land) + 0.2 * (emp.bldCost / emp.land))

        cost *= costBonus
        //TODO: race modifier here

        if (cost < base * 0.6) {
            cost = base * 0.6
        }

        return Math.round(cost)
    }

    const trpArmCost = getCost(empire, 500)
    const trpLndCost = getCost(empire, 1000)
    const trpFlyCost = getCost(empire, 2000)
    const trpSeaCost = getCost(empire, 3000)

    const priceArray = [trpArmCost, trpLndCost, trpFlyCost, trpSeaCost, 30]

    const form = useForm({
        initialValues: {
            empireId: empire.id,
            type: 'buy',
            buyArm: 0,
            buyLnd: 0,
            buyFly: 0,
            buySea: 0,
            buyFood: 0,
        },

        validationRules: {
            buyArm: (value) => value <= empire.cash / trpArmCost,
            buyLnd: (value) => value <= empire.cash / trpLndCost,
            buyFly: (value) => value <= empire.cash / trpFlyCost,
            buySea: (value) => value <= empire.cash / trpSeaCost,
            buyFood: (value) => value <= empire.cash / 30,
        },

        errorMessages: {
            buyArm: 'Not Enough Money',
            buyLnd: 'Not Enough Money',
            buyFly: 'Not Enough Money',
            buySea: 'Not Enough Money',
            buyFood: 'Not Enough Money',
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

    buyNumberArray = Object.values(form.values).slice(2)
    // console.log(buyNumberArray)

    const spendArray = buyNumberArray.map((value, index) =>
    {
        value = value * priceArray[index]
        return value
    })

    // console.log(spendArray)

    totalBuy = buyNumberArray
        .filter(Number)
        .reduce((partialSum, a) => partialSum + a, 0)
    console.log(totalBuy)

    totalPrice = spendArray
        .filter(Number)
        .reduce((partialSum, a) => partialSum + a, 0)
    console.log(totalPrice)
    // console.log(value)

    function setErrors(error)
    {
        errors.error = error
    }

    console.log(result)

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
            const res = await Axios.post('/buy', values)
            setResult(res.data)
            loadEmpireTest()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <main>
            <Center mb={10}>
                <Group direction='column' spacing='sm' align='center'>
                    <Title order={1} align='center'>
                        Black Market
                    </Title>
                    <div>
                        Purchase or sell food and troops on the Black Market
                    </div>

                    <form
                        onSubmit={
                            totalPrice <= empire.cash
                                ? form.onSubmit((values) =>
                                {
                                    dispatch(clearResult)
                                    console.log(values)
                                    doBuy(values)
                                })
                                : setErrors("Not Enough Money")
                        }
                    >
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
                                    Available:
                                </Text>
                                <Text weight='bold' align='center'>
                                    Price:
                                </Text>
                                <Text weight='bold' align='center'>
                                    Can Buy:
                                </Text>
                                <Text weight='bold' align='center'>
                                    Buy:
                                </Text>
                            </Group>
                            <Group direction='row' spacing='md' noWrap grow>
                                <Text align='center'>
                                    Footmen
                                </Text>
                                <Text align='center'>
                                    {empire.trpArm.toLocaleString()}
                                </Text>
                                <Text align='center'>
                                    {empire.mktArm.toLocaleString()}
                                </Text>
                                <Text align='center'>
                                    ${trpArmCost}
                                </Text>
                                <Text align='center'>
                                    {Math.floor(empire.cash / trpArmCost).toLocaleString()}
                                </Text>
                                <NumberInput
                                    hideControls
                                    min={0}
                                    max={empire.cash / trpArmCost}
                                    {...form.getInputProps(`buyArm`)}
                                />
                            </Group>
                            <Group direction='row' spacing='md' noWrap grow>
                                <Text align='center'>
                                    Catapults
                                </Text>
                                <Text align='center'>
                                    {empire.trpLnd.toLocaleString()}
                                </Text>
                                <Text align='center'>
                                    {empire.mktLnd.toLocaleString()}
                                </Text>
                                <Text align='center'>
                                    ${trpLndCost}
                                </Text>
                                <Text align='center'>
                                    {Math.floor(empire.cash / trpLndCost).toLocaleString()}
                                </Text>
                                <NumberInput
                                    hideControls
                                    min={0}
                                    max={empire.cash / trpLndCost}
                                    {...form.getInputProps(`buyLnd`)}
                                />
                            </Group>
                            <Group direction='row' spacing='md' noWrap grow>
                                <Text align='center'>
                                    Zeppelins
                                </Text>
                                <Text align='center'>
                                    {empire.trpFly.toLocaleString()}
                                </Text>
                                <Text align='center'>
                                    {empire.mktFly.toLocaleString()}
                                </Text>
                                <Text align='center'>
                                    ${trpFlyCost}
                                </Text>
                                <Text align='center'>
                                    {Math.floor(empire.cash / trpFlyCost).toLocaleString()}
                                </Text>
                                <NumberInput
                                    hideControls
                                    min={0}
                                    max={empire.cash / trpFlyCost}
                                    {...form.getInputProps(`buyFly`)}
                                />
                            </Group>
                            <Group direction='row' spacing='md' noWrap grow>
                                <Text align='center'>
                                    Galleons
                                </Text>
                                <Text align='center'>
                                    {empire.trpSea.toLocaleString()}
                                </Text>
                                <Text align='center'>
                                    {empire.mktSea.toLocaleString()}
                                </Text>
                                <Text align='center'>
                                    ${trpSeaCost}
                                </Text>
                                <Text align='center'>
                                    {Math.floor(empire.cash / trpSeaCost).toLocaleString()}
                                </Text>
                                <NumberInput
                                    hideControls
                                    min={0}
                                    max={empire.cash / trpSeaCost}
                                    {...form.getInputProps(`buySea`)}
                                />
                            </Group>
                            <Group direction='row' spacing='md' noWrap grow>
                                <Text align='center'>
                                    Food
                                </Text>
                                <Text align='center'>
                                    {empire.food.toLocaleString()}
                                </Text>
                                <Text align='center'>
                                    {empire.mktFood.toLocaleString()}
                                </Text>
                                <Text align='center'>
                                    $30
                                </Text>
                                <Text align='center'>
                                    {Math.floor(empire.cash / 30).toLocaleString()}
                                </Text>
                                <NumberInput
                                    hideControls
                                    min={0}
                                    max={empire.cash / 30}
                                    {...form.getInputProps(`buyFood`)}
                                />
                            </Group>
                        </SimpleGrid>
                        <div style={{ color: 'red' }}>{errors.error}</div>
                        {errors.error ? (
                            <Button color='black' type='submit' disabled>
                                Buy
                            </Button>
                        ) : (
                            <Button color='black' type='submit'>
                                Buy
                            </Button>
                        )}
                    </form>
                    {result &&
                        <Card shadow='sm' padding='sm' withBorder sx={(theme) => ({
                            backgroundColor: theme.colors.gray[1],
                            '&:hover': {
                                backgroundColor: theme.colors.gray[2],
                            },
                        })}>
                            <Group direction='column' spacing='xs'>
                                {result?.resultBuyArm.amount > 0 ? <div>You purchased {result.resultBuyArm.amount.toLocaleString()} footmen for ${result.resultBuyArm.price.toLocaleString()}</div> : ''}
                                {result?.resultBuyLnd.amount > 0 ? <div>You purchased {result.resultBuyLnd.amount.toLocaleString()} catapults for ${result.resultBuyLnd.price.toLocaleString()}</div> : ''}
                                {result?.resultBuyFly.amount > 0 ? <div>You purchased {result.resultBuyFly.amount.toLocaleString()} zeppelins for ${result.resultBuyFly.price.toLocaleString()}</div> : ''}
                                {result?.resultBuySea.amount > 0 ? <div>You purchased {result.resultBuySea.amount.toLocaleString()} galleons for ${result.resultBuySea.price.toLocaleString()}</div> : ''}
                                {result?.resultBuyFood.amount > 0 ? <div>You purchased {result.resultBuyFood.amount.toLocaleString()} food for ${result.resultBuyFood.price.toLocaleString()}</div> : ''}
                            </Group>
                        </Card>
                    }
                </Group>

            </Center>
        </main>
    )
}
