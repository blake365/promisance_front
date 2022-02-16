import { Button, Center, Group, NumberInput, Table, Title } from '@mantine/core'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from '@mantine/hooks'
import Axios from 'axios'
import { empireLoaded } from '../../store/empireSlice'



export default function PrivateMarket()
{
    let buyNumberArray = []
    let totalBuy = 0
    let errors = {
        error: '',
    }
    const empire = useSelector((state) => state.empire)

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



    const form = useForm({
        initialValues: {
            empireId: empire.id,
            type: 'buy',
            // turns: 0,
            buyArm: 0,
            buyLnd: 0,
            buyFly: 0,
            buySea: 0,
            buyFood: 0,
            // totalBuild: totalBuild,
        },

        validationRules: {

        },

        errorMessages: {

        },
    })

    const MarketRow = (props) =>
    {
        let action = props.action
        let owned = props.type.toLowerCase()
        let avail = 'mkt' + props.type
        if (!props.food) {
            owned = 'trp' + props.type
        }
        let max = Math.floor(props.empire.cash / props.cost)

        // console.log(props.type, avail, owned)
        return (

            <tr style={{ textAlign: 'right' }}>
                <td style={{ textAlign: 'left' }}>{props.unit}</td>
                <td>
                    {props.empire[owned].toLocaleString()}
                </td>
                <td>{props.empire[avail].toLocaleString()}</td>
                <td>${props.cost.toLocaleString()}</td>
                <td>{max.toLocaleString()} <Button size='xs' onClick={() => form.setFieldValue(action, max)}> {'>'}</Button></td>
                <td>
                    <NumberInput
                        hideControls
                        min={0}
                        max={props.empire.cash / props.cost}
                        {...form.getInputProps(`${action}`)}
                    />
                </td>
            </tr>

        )
    }

    // if (form.values['buyArm'] === undefined) {
    //     form.setFieldValue('buyArm', 0)
    // }
    // if (form.values['buyLnd'] === undefined) {
    //     form.setFieldValue('buyLnd', 0)
    // }
    // if (form.values['buyFly'] === undefined) {
    //     form.setFieldValue('buyFly', 0)
    // }
    // if (form.values['buySea'] === undefined) {
    //     form.setFieldValue('buySea', 0)
    // }
    // if (form.values['buyFood'] === undefined) {
    //     form.setFieldValue('buyFood', 0)
    // }

    buyNumberArray = Object.values(form.values).slice(2)
    console.log(buyNumberArray)

    // totalBuild = buildNumberArray
    //     .filter(Number)
    //     .reduce((partialSum, a) => partialSum + a, 0)
    // // console.log(totalBuild)
    // // console.log(value)

    // function setErrors(error)
    // {
    //     errors.error = error
    // }

    const loadEmpireTest = async () =>
    {
        try {
            const res = await Axios.get(`/empire/${empire.uuid}`)
            console.log(res.data)

            dispatch(empireLoaded(res.data))
        } catch (error) {
            console.log(error)
        }
    }

    // const doBuy = async (values) =>
    // {
    //     try {
    //         const res = await Axios.post('/buy', values)
    //         console.log(res.data)
    //         loadEmpireTest()
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

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
                            form.onSubmit((values) => console.log(values))
                        }
                    >
                        <Table verticalSpacing='xs' striped>
                            <thead>
                                <tr>
                                    <th>Unit</th>
                                    <th>Owned</th>
                                    <th>Available</th>
                                    <th>Price</th>
                                    <th>Can Buy</th>
                                    <th>Buy</th>
                                </tr>
                            </thead>
                            <tbody>
                                <MarketRow unit='Infantry' empire={empire} cost={trpArmCost} action='buyArm' type='Arm' />

                                <MarketRow unit='Tanks' empire={empire} cost={trpLndCost} action='buyLnd' type='Lnd' />

                                <MarketRow unit='Jets' empire={empire} cost={trpFlyCost} action='buyFly' type='Fly' />

                                <MarketRow unit='Battleships' empire={empire} cost={trpSeaCost} action='buySea' type='Sea' />

                                <MarketRow unit='Food' empire={empire} cost={30} action='buyFood' type='Food' food />

                            </tbody>
                        </Table>
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
                </Group>
            </Center>
        </main>
    )
}
