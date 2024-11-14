import { Button, Center, Group, NumberInput, Title, Card, SimpleGrid, Text, Stack } from '@mantine/core'
import { useSelector } from 'react-redux'
import { useForm } from '@mantine/form'
import Axios from 'axios'
import { useRef } from 'react'
import { MaxButton } from '../utilities/maxbutton'
import { calcSizeBonus } from '../../functions/functions'
import { useLoadEmpire } from '../../hooks/useLoadEmpire'
import { checkRoundStatus } from '../../functions/checkRoundStatus'
import { showNotification } from '@mantine/notifications'
import { useTranslation } from 'react-i18next'

export default function WorldBank()
{

    const { empire } = useSelector((state) => state.empire)
    const { bankSaveRate, bankLoanRate } = useSelector((state) => state.games.activeGame)
    const loadEmpire = useLoadEmpire(empire.uuid)
    // let loanDefault = empire.loan
    const bankRef = useRef()
    const loanRef = useRef()
    const size = calcSizeBonus(empire)
    const loanRate = (Math.round((bankLoanRate + size) * 100) / 100 / 100).toFixed(2)
    const savingRate = (Math.round((bankSaveRate - size) * 100) / 100 / 100).toFixed(2)
    const maxLoan = empire.networth * 50

    const { t } = useTranslation('finance')

    const bankCapacity = empire.networth * 100
    const remainingBankCapacity = bankCapacity - empire.bank

    let canSave = remainingBankCapacity
    if (remainingBankCapacity > empire.cash) {
        canSave = empire.cash
    }

    const remainingLoanCapacity = maxLoan - empire.loan
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
            withdrawAmt: t('bank.withdrawError'),
            depositAmt: t('bank.depositError')
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
            loanAmt: t('bank.loanError'),
            repayAmt: t('bank.repayError')
        },
    })

    if (loanForm.values['loanAmt'] === undefined) {
        loanForm.setFieldValue('loanAmt', 0)
    }
    if (loanForm.values['repayAmt'] === undefined) {
        loanForm.setFieldValue('repayAmt', 0)
    }

    const doBanking = async (values) =>
    {
        try {
            const res = await Axios.post(`/empire/${empire.uuid}/bank?gameId=${empire.game_id}`, values)
            // console.log(res.data)
            const result = res.data
            showNotification({
                title: 'Banking',
                message: result.map((item, index) =>
                {
                    if (item.action === 'deposit') {
                        return <div key={index}>{t('bank.depositSuccess', { amount: item.amount })}</div>
                    }
                    if (item.action === 'withdraw') {
                        return <div key={index}>{t('bank.withdrawSuccess', { amount: item.amount })}</div>
                    }
                    if (item.action === 'loan') {
                        return <div key={index}>{t('bank.loanSuccess', { amount: item.amount })}</div>
                    }
                    if (item.action === 'repay') {
                        return <div key={index}>{t('bank.repaySuccess', { amount: item.amount })}</div>
                    }
                }),
                autoClose: 2000
            })
            result.map((item) =>
            {
                if (item.action === 'deposit' || item.action === 'withdraw') {
                    return bankRef.current.focus()
                }

                return loanRef.current.focus()

            })
            savingsForm.reset()
            loadEmpire()
        } catch (error) {
            console.log(error)
            showNotification({
                title: t('bank.bankError'),
                autoClose: 2000,
                color: 'orange'
            })
        }
    }

    const roundStatus = checkRoundStatus()
    const loanStatus = checkRoundStatus(true)
    // console.log(loanStatus)

    return (
        <main className='gnome8 vampire8 minotaur8'>
            <Center mb={10}>
                <Stack spacing='sm' align='center'>
                    <img src='/images/bank.webp' height='200' style={{ maxHeight: '200px', maxWidth: '100%', borderRadius: '10px' }} alt='world bank' />
                    <Title order={1} align='center'>
                        {t('bank.title')}
                    </Title>
                    <Text align='center'>
                        {t('bank.description')}
                    </Text>
                    <Text align='center'>
                        {t('bank.interest')}
                    </Text>
                    <SimpleGrid
                        cols={2}
                        spacing="lg"
                        breakpoints={[
                            { maxWidth: 700, cols: 1, spacing: 'sm' },
                        ]}
                    >
                        <Card shadow='sm' padding='sm' withBorder sx={{ minWidth: '350px' }}>
                            <Title order={2} align='center'>{t('bank.savings')}</Title>
                            <Group direction='row' spacing='xs' noWrap grow>
                                <Text>{t('bank.maxBalance')}: </Text>
                                <Text align='right'>${bankCapacity.toLocaleString()}</Text>
                            </Group>
                            <Group direction='row' spacing='xs' noWrap grow>
                                <Text>{t('bank.currentBalance')}:</Text>
                                <Text align='right'>${empire.bank.toLocaleString()}</Text>
                            </Group>
                            <Group direction='row' spacing='xs' noWrap grow>
                                <Text>{t('bank.interestRateSave')}:</Text>
                                <Text align='right'>{savingRate * 100}%</Text>
                            </Group>
                            <Group direction='row' spacing='xs' noWrap grow>
                                <Text>{t('bank.interestGain')}:</Text>
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
                                        label={t('bank.deposit')}
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
                                            return !Number.isNaN(Number.parseFloat(value))
                                                ? `${value}`.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
                                                : ''
                                        }
                                        }
                                    />
                                    <NumberInput
                                        hideControls
                                        label={t('bank.withdraw')}
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
                                            return !Number.isNaN(Number.parseFloat(value))
                                                ? `${value}`.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
                                                : ''
                                        }
                                        }
                                    />
                                    <Button type='submit' disabled={roundStatus} ref={bankRef}>{t('bank.submit')}</Button>
                                </Stack>
                            </form>
                        </Card>
                        <Card shadow='sm' padding='sm' withBorder sx={{ minWidth: '350px' }}>
                            <Title order={2} align='center'>{t('bank.loans')}</Title>
                            <Group spacing='xs' noWrap grow>
                                <Text>{t('bank.maxLoan')}:</Text>
                                <Text align='right'>${maxLoan.toLocaleString()}</Text>
                            </Group>
                            <Group spacing='xs' noWrap grow>
                                <Text>{t('bank.loanBalance')}:</Text>
                                <Text align='right'>${empire.loan.toLocaleString()}</Text>
                            </Group>

                            <Group spacing='xs' noWrap grow>
                                <Text>{t('bank.interestRateLoan')}: </Text>
                                <Text align='right'>{loanRate * 100}%</Text>
                            </Group>
                            <Group spacing='xs' noWrap grow>
                                <Text>{t('bank.interestCost')}:</Text>
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
                                        label={t('bank.repayLoan')}
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
                                            return !Number.isNaN(Number.parseFloat(value))
                                                ? `${value}`.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
                                                : ''
                                        }
                                        }
                                    />
                                    <NumberInput
                                        hideControls
                                        label={t('bank.takeLoan')}
                                        min={0}
                                        defaultValue={0}
                                        stepHoldDelay={500}
                                        stepHoldInterval={100}
                                        max={canLoan}
                                        {...loanForm.getInputProps('loanAmt')}
                                        rightSection={!loanStatus && <MaxButton formName={loanForm} fieldName='loanAmt' maxValue={canLoan} />}
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
                                        disabled={loanStatus}
                                    />
                                    <Button type='submit' disabled={roundStatus} ref={loanRef}>{t('bank.submit')}</Button>
                                </Stack>
                            </form>
                        </Card>
                    </SimpleGrid>
                </Stack>
            </Center>
        </main>
    )
}
