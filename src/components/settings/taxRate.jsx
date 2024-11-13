import
{
    Text,
    Center,
    Stack,
    Title,
    NumberInput,
    Button,
    Group,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import Axios from 'axios'
import { useDispatch } from 'react-redux'
import { empireLoaded } from '../../store/empireSlice'
import { showNotification } from '@mantine/notifications'
import { useTranslation } from 'react-i18next'

export default function TaxRate({ empire, tiny })
{
    const dispatch = useDispatch()
    const { t } = useTranslation('turns')
    let initialTax = empire.tax

    const form = useForm({
        initialValues: {
            empireId: empire.id,
            tax: initialTax,
        },

        validationRules: {
            tax: (value) => value <= 100 && value > 0,
        },

        errorMessages: {
            tax: t('turns:cash.error'),
        },
    })

    const updateTax = async (values) =>
    {
        // console.log(values)
        try {
            const res = await Axios.post(`/empire/${empire.uuid}/tax`, values)
            dispatch(empireLoaded(res.data))
            showNotification({
                title: t('turns:cash.responseSuccess'),
                color: 'yellow',
                autoClose: 2000,
            })
        } catch (error) {
            console.log(error)
            showNotification({
                title: t('turns:cash.responseFail'),
                color: 'orange',
                autoClose: 2000,
            })
        }
    }

    const taxButtons = [5, 25, 50, 75, 95]

    return (
        <Center mt={10}>
            <Stack spacing='sm' align='center'>
                {!tiny &&
                    <>
                        <Title order={3}>{t('turns:cash.tax')}</Title>
                        <Text size='sm'>{t('turns:cash.update')}</Text>
                    </>
                }
                <form onSubmit={form.onSubmit((values) => updateTax(values))}>
                    <Stack align='center'>
                        <Group spacing='xs'>
                            {taxButtons.map((tax) =>
                            {
                                // console.log(tax)
                                let buttonColor = 'none'
                                let variant = 'default'
                                if (empire.tax === tax) {
                                    buttonColor = 'yellow'
                                    variant = 'filled'
                                }
                                return (
                                    <Button color={buttonColor} px='xs' variant={variant} key={tax} onClick={() => updateTax({ empireId: empire.id, tax: tax })}>{tax}%</Button>
                                )
                            })}
                        </Group>
                        <Group spacing='xs' align='end'>
                            <NumberInput
                                w={100}
                                label={t('turns:cash.custom')}
                                min={0}
                                max={100}
                                defaultValue={40}
                                stepHoldDelay={500}
                                stepHoldInterval={100}
                                {...form.getInputProps('tax')}
                            />
                            <Button type='submit' color='yellow'>{t('turns:cash.updateButton')}</Button>
                        </Group>
                        {!tiny &&
                            <Text size='sm'>{t('turns:cash.warning')}</Text>}
                    </Stack>
                </form>
            </Stack>
        </Center>
    )
}
