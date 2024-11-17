import { Stack, Button, TextInput } from '@mantine/core'
import { useForm, hasLength } from '@mantine/form'
import Axios from 'axios'
import { useDispatch } from 'react-redux'
import { empireLoaded } from '../../store/empireSlice'
import { showNotification } from '@mantine/notifications'
import { useTranslation } from 'react-i18next'

export default function UpdateProfile({ status, empire })
{
    const { t } = useTranslation('settings')
    const dispatch = useDispatch()


    const form = useForm({
        initialValues: {
            empireId: empire.id,
            type: 'profile',
            profile: empire.profile
        },
        validate: {
            profile: hasLength({ max: 499 }, t('settings:settings.profileValidation')),
        },
    })


    const updateProfile = async (values) =>
    {
        try {
            const res = await Axios.post(`/empire/${empire.uuid}/profile`, values)
            // console.log(res.data)
            dispatch(empireLoaded(res.data))
            showNotification({
                title: t('settings:settings.profileResponseSuccess'),
                color: 'teal',
                autoClose: 2000
            })
        } catch (error) {
            console.log(error)
            showNotification({
                title: t('settings:settings.profileResponseError'),
                color: 'orange',
            })
        }
    }

    return (
        <form onSubmit={form.onSubmit((values) =>
        {
            // console.log(values)
            updateProfile(values)
        })}>
            <Stack spacing='sm' align='center'>
                <TextInput
                    label={t('settings:settings.updateProfile')}
                    placeholder={empire.profile ? empire.profile : t('settings:settings.profilePlaceholder')}
                    w='350px'
                    {...form.getInputProps('profile')}
                />
                <Button size='sm' compact type='submit' disabled={status}>{t('settings:settings.submit')}</Button>
            </Stack>
        </form>
    )
}
