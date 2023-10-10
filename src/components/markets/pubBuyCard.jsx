import { Button, Center, Card, Text, NumberInput, SimpleGrid } from '@mantine/core'
import Axios from 'axios'

import { useForm } from '@mantine/form'
import { MaxButton } from '../utilities/maxbutton'
import { useDispatch } from 'react-redux'
import { empireLoaded } from '../../store/empireSlice'

export default function PubBuyCard({ eraItem, type, owned, item, base, cash, empireId, empireUUID })
{

    const dispatch = useDispatch()

    let formType = null
    if (type === 'arm') {
        formType = 0
    } else if (type === 'lnd') {
        formType = 1
    } else if (type === 'fly') {
        formType = 2
    } else if (type === 'sea') {
        formType = 3
    } else if (type === 'food') {
        formType = 4
    } else if (type === 'runes') {
        formType = 5
    }

    // console.log(type, item[0])

    const form = useForm({
        initialValues: {
            empireId: empireId,
            action: 'buy',
            type: formType,
            buy: 0,
            item: item[0],
        },

        validationRules: {
            buy: (value) => value <= cash / item[0].price,
        },

        errorMessages: {
            buy: 'Not Enough Money',
        },
    })

    if (form.values['buy'] === undefined) {
        form.setFieldValue('buy', 0)
    }

    const loadEmpireTest = async () =>
    {
        try {
            const res = await Axios.get(`/empire/${empireUUID}`)
            // setResult(res.data)
            dispatch(empireLoaded(res.data))
        } catch (error) {
            console.log(error)
        }
    }

    const buyItem = async (values) =>
    {
        try {
            // console.log(values)
            const res = await Axios.post('/publicmarket/pubBuy2', values)
            // setResult(res.data)
            // console.log(res.data)
            loadEmpireTest()
            // dispatch(fetchOtherItems())
        } catch (error) {
            console.log(error)
        }
    }

    // console.log(item.length)

    return (
        <Card w='300px' p='sm' shadow='sm'>
            <Card.Section withBorder p='xs'>
                <Text align='center' weight='bold' size='lg'>
                    {eraItem}
                </Text>
            </Card.Section>
            <Card.Section p='sm'>
                <SimpleGrid cols={2} spacing={1}>
                    <Text>
                        Owned:
                    </Text>
                    <Text align='right'>{owned.toLocaleString()}</Text>
                    <Text>
                        Available:
                    </Text>
                    <Text align='right'>{parseInt(item[0].amount).toLocaleString()}</Text>
                    <Text>
                        Base Price:
                    </Text>
                    <Text align='right'>${base.toLocaleString()}</Text>
                    <Text>
                        Sale Price:
                    </Text>
                    <Text align='right'>${item[0].price.toLocaleString()}</Text>
                    <Text>
                        Can Afford:
                    </Text>
                    <Text align='right'>{cash / item[0].price > parseInt(item[0].amount) ? parseInt(item[0].amount).toLocaleString() : Math.floor(cash / item[0].price).toLocaleString()}</Text>
                </SimpleGrid>
            </Card.Section>
            <Card.Section p='sm' withBorder>
                <form onSubmit={form.onSubmit((values) =>
                {
                    // console.log(values)
                    if (values.buy > 0) {
                        buyItem(values)
                    }
                })}>
                    <Center>
                        <NumberInput
                            hideControls
                            align='center'
                            w='50%'
                            min={0}
                            max={cash / item[0].price > parseInt(item[0].amount) ? parseInt(item[0].amount) : Math.floor(cash / item[0].price)}
                            {...form.getInputProps(`buy`)}
                            rightSection={<MaxButton formName={form} fieldName='buy' maxValue={cash / item[0].price > parseInt(item[0].amount) ? parseInt(item[0].amount) : Math.floor(cash / item[0].price)} />}
                        />
                        <Button type='submit' ml='sm' disabled={item[0].amount === 0}>Buy</Button>
                    </Center>
                </form>
            </Card.Section>
        </Card>
    )
}
