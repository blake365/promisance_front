import { Button, Center, Group, NumberInput, Title, Card, SimpleGrid, Text, Stack } from '@mantine/core'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from '@mantine/form'
import Axios from 'axios'
import { empireLoaded } from '../../store/empireSlice'
import { useState } from 'react'
import { MaxButton } from '../utilities/maxbutton'
import { BANK_LOANRATE, BANK_SAVERATE } from '../../config/config'
import { calcSizeBonus } from '../../functions/functions'

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

    const size = calcSizeBonus(empire)
    const loanRate = (Math.round((BANK_LOANRATE + size) * 100) / 100 / 100).toFixed(2)
    const savingRate = (Math.round((BANK_SAVERATE - size) * 100) / 100 / 100).toFixed(2)
    const maxLoan = empire.networth * 50

    let bankCapacity = empire.networth * 100
    let remainingBankCapacity = bankCapacity - empire.bank

    let canSave = remainingBankCapacity
    if (remainingBankCapacity > empire.cash) {
        canSave = empire.cash
    }

    let remainingLoanCapacity = maxLoan - empire.loan
    let canLoan = remainingLoanCapacity
    if (maxLoan - empire.loan < 0) { canLoan = 0 }


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
            savingsForm.reset()
            loadEmpireTest()
        } catch (error) {
            console.log(error)
        }
    }

    // console.log(result[0].action)

    return (
        <main>
            <Center mb={10}>
                <Stack spacing='sm' align='center'>
                    <img src='/images/bank.webp' height='200' style={{ maxHeight: '200px', maxWidth: '100%', borderRadius: '10px' }} alt='world bank' />
                    <Title order={1} align='center'>
                        The Bank
                    </Title>
                    <Text align='center'>
                        Access your savings and loan accounts.
                    </Text>
                    <Text align='center'>
                        Interest is calculated per turn, 52 turns is one APR year.
                    </Text>
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
                                <Text align='right'>${bankCapacity.toLocaleString()}</Text>
                            </Group>
                            <Group direction='row' spacing='xs' noWrap grow>
                                <Text>Current Balance:</Text>
                                <Text align='right'>${empire.bank.toLocaleString()}</Text>
                            </Group>
                            <Group direction='row' spacing='xs' noWrap grow>
                                <Text>Interest Rate:</Text>
                                <Text align='right'>{savingRate * 100}%</Text>
                            </Group>
                            <Group direction='row' spacing='xs' noWrap grow>
                                <Text>Est. Interest Gain:</Text>
                                <Text align='right'>${Math.round(empire.bank * savingRate / 52).toLocaleString()}</Text>
                            </Group>
                            <form
                                onSubmit={
                                    savingsForm.onSubmit((values) =>
                                    {
                                        doBanking(values)
                                    })

                                }
                            >
                                <Stack align='center' spacing='sm'>
                                    <NumberInput
                                        hideControls
                                        label={`Deposit Money`}
                                        min={0}
                                        defaultValue={0}
                                        stepHoldDelay={500}
                                        stepHoldInterval={100}
                                        max={canSave}
                                        {...savingsForm.getInputProps('depositAmt')}
                                        rightSection={
                                            <MaxButton formName={savingsForm} fieldName='depositAmt' maxValue={canSave} />
                                        }
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
                                    <Button type='submit'>Submit</Button>
                                </Stack>
                            </form>
                        </Card>
                        <Card shadow='sm' padding='sm' withBorder sx={{ minWidth: '350px' }}>
                            <Title order={2} align='center'>Loans</Title>
                            <Group spacing='xs' noWrap grow>
                                <Text>Max Loan:</Text>
                                <Text align='right'>${maxLoan.toLocaleString()}</Text>
                            </Group>
                            <Group spacing='xs' noWrap grow>
                                <Text>Loan Balance:</Text>
                                <Text align='right'>${empire.loan.toLocaleString()}</Text>
                            </Group>

                            <Group spacing='xs' noWrap grow>
                                <Text>Interest Rate: </Text>
                                <Text align='right'>{loanRate * 100}%</Text>
                            </Group>
                            <Group spacing='xs' noWrap grow>
                                <Text>Est. Interest Cost:</Text>
                                <Text align='right'>${Math.floor(empire.loan * loanRate / 52).toLocaleString()}</Text>
                            </Group>
                            <form
                                onSubmit={
                                    loanForm.onSubmit((values) => { doBanking(values) })
                                }
                            >
                                <Stack align='center' spacing='sm'>
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
                                    <NumberInput
                                        hideControls
                                        label={`Take Out a Loan`}
                                        min={0}
                                        defaultValue={0}
                                        stepHoldDelay={500}
                                        stepHoldInterval={100}
                                        max={canLoan}
                                        {...loanForm.getInputProps('loanAmt')}
                                        rightSection={<MaxButton formName={loanForm} fieldName='loanAmt' maxValue={canLoan} />}
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
                                    <Button type='submit'>Submit</Button>
                                </Stack>
                            </form>
                        </Card>
                    </SimpleGrid>

                    {result &&
                        result.map((item, index) =>
                        {
                            if (item.action === 'deposit') {
                                return <div key={index}>You deposited ${item.amount.toLocaleString()} into the bank.</div>
                            }
                            if (item.action === 'withdraw') {
                                return <div key={index}>You withdrew ${item.amount.toLocaleString()} from the bank.</div>
                            }
                            if (item.action === 'loan') {
                                return <div key={index}>You took out a loan for ${item.amount.toLocaleString()}.</div>
                            }
                            if (item.action === 'repay') {
                                return <div key={index}>You repaid ${item.amount.toLocaleString()} toward your loan.</div>
                            }
                        })
                    }
                </Stack>
            </Center>
        </main>
    )
}
