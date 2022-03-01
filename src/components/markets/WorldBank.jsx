import { Button, Center, Group, NumberInput, Table, Title, Card, SimpleGrid, Text } from '@mantine/core'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from '@mantine/hooks'
import Axios from 'axios'
import { empireLoaded } from '../../store/empireSlice'
import { clearResult, setResult } from '../../store/turnResultsSlice'
import { useState } from 'react'

function generalLog(number, base)
{
    return Math.log(base) / Math.log(number)
}

export default function WorldBank()
{
    const [result, setResult] = useState(null)

    let errors = {
        error: '',
    }
    const { empire } = useSelector((state) => state.empire)
    let loanDefault = empire.loan
    const dispatch = useDispatch()

    const calcSizeBonus = (networth) =>
    {
        let net = Math.max(networth, 1)
        let size = Math.atan(generalLog(net, 1000) - 1) * 2.1 - 0.65
        size = Math.round(Math.min(Math.max(0.5, size), 1.7) * 1000) / 1000
        return size
    }

    const size = calcSizeBonus(empire.networth)
    const loanRate = 7.5 + size
    const savingRate = 4 + size
    const maxLoan = empire.networth * 50
    const maxSavings = empire.networth * 100

    const savingsForm = useForm({
        initialValues: {
            empireId: empire.id,
            type: 'savings',
            withdrawAmt: 0,
            depositAmt: 0,
        },

        validationRules: {

        },

        errorMessages: {

        },
    })

    const loanForm = useForm({
        initialValues: {
            empireId: empire.id,
            type: 'loan',
            loanAmt: 0,
            repayAmt: empire.loan,
        },

        validationRules: {

        },

        errorMessages: {

        },
    })



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

    const doBanking = async (values) =>
    {
        try {
            const res = await Axios.post(`/empire/${empire.uuid}/bank`, values)
            console.log(res.data)
            setResult(res.data)
            loadEmpireTest()
        } catch (error) {
            console.log(error)
        }
    }

    // console.log(result[0].action)

    return (
        <main>
            <Center mb={10}>
                <Group direction='column' spacing='sm' align='center' grow>
                    <Title order={1} align='center'>
                        World Bank
                    </Title>
                    <div>
                        World bank description
                    </div>
                    <SimpleGrid
                        cols={2}
                        spacing="lg"
                        breakpoints={[
                            { maxWidth: 700, cols: 1, spacing: 'sm' },
                        ]}
                    >
                        <Card shadow='sm' padding='sm' withBorder sx={{ minWidth: '350px' }}>
                            <Title order={2} align='center'>Savings</Title>
                            <Group direction='row' spacing='xs' noWrap grow>
                                <Text>Current Balance:</Text>
                                <Text align='right'>${empire.bank.toLocaleString()}</Text>
                            </Group>
                            <Group direction='row' spacing='xs' noWrap grow>
                                <Text>Max Balance: </Text>
                                <Text align='right'>${maxSavings.toLocaleString()}</Text>
                            </Group>
                            <Group direction='row' spacing='xs' noWrap grow>
                                <Text>Interest Rate:</Text>
                                <Text align='right'>{savingRate}%</Text>
                            </Group>

                            {/* TODO: add 'max' buttons */}
                            <form
                                onSubmit={
                                    savingsForm.onSubmit((values) => { doBanking(values) })
                                }
                            >
                                <Group align='center' direction='column' spacing='sm'>
                                    <NumberInput
                                        label={`Deposit Money`}
                                        min={0}
                                        defaultValue={maxSavings - empire.bank}
                                        stepHoldDelay={500}
                                        stepHoldInterval={100}
                                        max={maxSavings - empire.bank}
                                        {...savingsForm.getInputProps('depositAmt')}
                                    />
                                    <NumberInput
                                        label={`Withdraw Money`}
                                        min={0}
                                        defaultValue={empire.bank}
                                        stepHoldDelay={500}
                                        stepHoldInterval={100}
                                        max={empire.bank}
                                        {...savingsForm.getInputProps('withdrawAmt')}
                                    />
                                    <Button type='submit'>Submit</Button>
                                </Group>
                            </form>

                        </Card>
                        <Card shadow='sm' padding='sm' withBorder sx={{ minWidth: '350px' }}>
                            <Title order={2} align='center'>Loans</Title>
                            <Group direction='row' spacing='xs' noWrap grow>
                                <Text>Loan Balance:</Text>
                                <Text align='right'>${empire.loan.toLocaleString()}</Text>
                            </Group>
                            <Group direction='row' spacing='xs' noWrap grow>
                                <Text>Available to Borrow:</Text>
                                <Text align='right'>${maxLoan.toLocaleString()}</Text>
                            </Group>
                            <Group direction='row' spacing='xs' noWrap grow>
                                <Text>Interest Rate: </Text>
                                <Text align='right'>{loanRate}%</Text>
                            </Group>

                            <form
                                onSubmit={
                                    loanForm.onSubmit((values) => { doBanking(values) })
                                }
                            >
                                <Group align='center' direction='column' spacing='sm'>
                                    <NumberInput
                                        label={`Repay Loan Balance`}
                                        min={0}
                                        defaultValue={empire.loan}
                                        stepHoldDelay={500}
                                        stepHoldInterval={100}
                                        max={empire.loan}
                                        {...loanForm.getInputProps('repayAmt')}
                                    />
                                    <NumberInput
                                        label={`Take Out a Loan`}
                                        min={0}
                                        defaultValue={0}
                                        stepHoldDelay={500}
                                        stepHoldInterval={100}
                                        {...loanForm.getInputProps('loanAmt')}
                                    />
                                    <Button type='submit'>Submit</Button>
                                </Group>
                            </form>
                        </Card>
                    </SimpleGrid>
                    {result &&
                        result.map(item =>
                        {
                            if (item.action === 'deposit') {
                                return <div>You deposited ${item.amount.toLocaleString()} into the bank.</div>
                            }
                            if (item.action === 'withdraw') {
                                return <div>You withdrew ${item.amount.toLocaleString()} from the bank.</div>
                            }
                            if (item.action === 'loan') {
                                return <div>You took out a loan for ${item.amount.toLocaleString()}. </div>
                            }
                            if (item.action === 'repay') {
                                return <div>You repaid ${item.amount.toLocaleString()} toward your loan.</div>
                            }
                        })
                    }
                </Group>
            </Center>
        </main>
    )
}
