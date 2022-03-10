import { Button, Center, Group, NumberInput, Title, Card, SimpleGrid, Text } from '@mantine/core'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from '@mantine/hooks'
import Axios from 'axios'
import { empireLoaded } from '../../store/empireSlice'
import { useState } from 'react'
import { MaxButton } from '../utilities/maxbutton'

function generalLog(number, base)
{
    return Math.log(base) / Math.log(number)
}

// DONE: change display: max, current, interest rate, interest rate gain or loss per turn (X * interest rate / 52)
// DONE: form validation
// DONE: added max buttons

export default function WorldBank()
{
    const [result, setResult] = useState(null)

    // let errors = {
    //     error: '',
    // }
    const { empire } = useSelector((state) => state.empire)
    // let loanDefault = empire.loan
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

    let depositAmount = maxSavings - empire.bank
    if (depositAmount < 0) depositAmount = 0

    const savingsForm = useForm({
        initialValues: {
            empireId: empire.id,
            type: 'savings',
            withdrawAmt: 0,
            depositAmt: 0,
        },

        validationRules: {
            withdrawAmt: (value) => value <= empire.bank && value >= 0,
            depositAmt: (value) => value <= depositAmount && value >= 0
        },

        errorMessages: {
            withdrawAmt: "Can't withdraw that much money",
            depositAmt: "Can't deposit that much money"
        },
    })

    if (savingsForm.values['depositAmt'] === undefined) {
        savingsForm.setFieldValue('depositAmt', 0)
    }
    if (savingsForm.values['withdrawAmt'] === undefined) {
        savingsForm.setFieldValue('withdrawAmt', 0)
    }

    const loanForm = useForm({
        initialValues: {
            empireId: empire.id,
            type: 'loan',
            loanAmt: 0,
            repayAmt: 0,
        },

        validationRules: {
            loanAmt: (value) => value <= maxLoan && value >= 0,
            repayAmt: (value) => value <= empire.loan && value >= 0
        },

        errorMessages: {
            loanAmt: "Can't take out a loan for that amount",
            repayAmt: "Can't repay that amount"
        },
    })

    if (loanForm.values['loanAmt'] === undefined) {
        loanForm.setFieldValue('loanAmt', 0)
    }
    if (loanForm.values['repayAmt'] === undefined) {
        loanForm.setFieldValue('repayAmt', 0)
    }

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
            // console.log(res.data)
            setResult(res.data)
            loadEmpireTest()
        } catch (error) {
            console.log(error)
        }
    }

    // console.log(result[0].action)

    return (
        <main style={{ paddingTop: '1rem' }}>
            <Center mb={10}>
                <Group direction='column' spacing='sm' align='center' grow>
                    <Title order={1} align='center'>
                        World Bank
                    </Title>
                    <div>
                        Access your savings and loan accounts.
                    </div>
                    <div>
                        Interest is calculated per turn, 52 turns is one APR year.
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
                                <Text>Max Balance: </Text>
                                <Text align='right'>${maxSavings.toLocaleString()}</Text>
                            </Group>
                            <Group direction='row' spacing='xs' noWrap grow>
                                <Text>Current Balance:</Text>
                                <Text align='right'>${empire.bank.toLocaleString()}</Text>
                            </Group>
                            <Group direction='row' spacing='xs' noWrap grow>
                                <Text>Interest Rate:</Text>
                                <Text align='right'>{savingRate}%</Text>
                            </Group>
                            <Group direction='row' spacing='xs' noWrap grow>
                                <Text>Est. Interest Gain:</Text>
                                <Text align='right'>${Math.floor(empire.bank * savingRate / 52).toLocaleString()}</Text>
                            </Group>
                            <form
                                onSubmit={
                                    savingsForm.onSubmit((values) =>
                                    {
                                        doBanking(values)
                                    })
                                }
                            >
                                <Group align='center' direction='column' spacing='sm'>
                                    <NumberInput
                                        hideControls
                                        label={`Deposit Money`}
                                        min={0}
                                        defaultValue={0}
                                        stepHoldDelay={500}
                                        stepHoldInterval={100}
                                        max={maxSavings - empire.bank}
                                        {...savingsForm.getInputProps('depositAmt')}
                                        rightSection={
                                            <MaxButton formName={savingsForm} fieldName='depositAmt' maxValue={maxSavings - empire.bank > 0 ? maxSavings - empire.bank : 0} />
                                            }
                                    />
                                    <NumberInput
                                        hideControls
                                        label={`Withdraw Money`}
                                        min={0}
                                        defaultValue={empire.bank}
                                        stepHoldDelay={500}
                                        stepHoldInterval={100}
                                        max={empire.bank}
                                        {...savingsForm.getInputProps('withdrawAmt')}
                                        rightSection={<MaxButton formName={savingsForm} fieldName='withdrawAmt' maxValue={empire.bank} />}
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
                            <Group direction='row' spacing='xs' noWrap grow>
                                <Text>Est. Interest Cost:</Text>
                                <Text align='right'>${Math.floor(empire.loan * loanRate / 52).toLocaleString()}</Text>
                            </Group>
                            <form
                                onSubmit={
                                    loanForm.onSubmit((values) => { doBanking(values) })
                                }
                            >
                                <Group align='center' direction='column' spacing='sm'>
                                    <NumberInput
                                        hideControls
                                        label={`Repay Loan Balance`}
                                        min={0}
                                        defaultValue={empire.loan}
                                        stepHoldDelay={500}
                                        stepHoldInterval={100}
                                        max={empire.loan}
                                        {...loanForm.getInputProps('repayAmt')}
                                        rightSection={<MaxButton formName={loanForm} fieldName='repayAmt' maxValue={empire.loan} />}
                                    />
                                    <NumberInput
                                        hideControls
                                        label={`Take Out a Loan`}
                                        min={0}
                                        defaultValue={0}
                                        stepHoldDelay={500}
                                        stepHoldInterval={100}
                                        max={maxLoan}
                                        {...loanForm.getInputProps('loanAmt')}
                                        rightSection={<MaxButton formName={loanForm} fieldName='loanAmt' maxValue={maxLoan} />}
                                    />
                                    <Button type='submit'>Submit</Button>
                                </Group>
                            </form>
                        </Card>
                    </SimpleGrid>

                    {/* TODO: figure out how to solve warning */}
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
                                return <div>You took out a loan for ${item.amount.toLocaleString()}.</div>
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
