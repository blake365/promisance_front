import { useState } from 'react'
import { Stack, Title, Button, TextInput, Text } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useNavigate } from 'react-router-dom'
import { logout } from '../../store/userSlice'
import { useDispatch } from 'react-redux'
import Axios from 'axios'
import { useTranslation } from 'react-i18next'

export default function DeleteEmpire({ status, empire })
{
    const { t } = useTranslation('settings')
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [deleteUpdate, setDeleteUpdate] = useState()

    const form2 = useForm({
        initialValues: {
            confirm: '',
        },
    })

    const deleteEmpire = async (values) =>
    {
        if (values.confirm === 'confirm') {
            try {
                const res = await Axios.delete(`/empire/${empire.uuid}`)
                console.log(res.data)
                dispatch(logout())
                navigate('/')
            } catch (error) {
                console.log(error)
            }
        } else {
            setDeleteUpdate(t('settings:settings.pleaseConfirm'))
        }
    }

    return (
        <Stack spacing='sm' align='center' mt={100}>
            <Title>{t('settings:settings.deleteEmpire')}</Title>
            <Text maw={400}>{t('settings:settings.deleteEmpireText')} <a href='mailto:admin@neopromisance.com'>{t('settings:settings.contactUs')}</a> {t('settings:settings.feedback')} </Text>
            <form onSubmit={form2.onSubmit((values) =>
            {
                // console.log('deleting empire')
                // console.log(values)
                deleteEmpire(values)
            })}>
                <Stack>
                    <TextInput placeholder={t('settings:settings.deleteEmpireConfirm')}
                        {...form2.getInputProps('confirm')}
                        mb='sm'
                    />
                    <Button color="red" type='submit' disabled={status}>{t('settings:settings.deleteEmpire')}</Button>
                    {deleteUpdate && <Text ta='center'>{deleteUpdate}</Text>}
                </Stack>
            </form>
        </Stack>
    )
}
