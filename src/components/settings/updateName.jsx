import { Stack, Button, TextInput } from '@mantine/core'
import { useForm, hasLength } from '@mantine/form'
import Axios from 'axios'
import { useDispatch } from 'react-redux'
import { empireLoaded } from '../../store/empireSlice'
import { showNotification } from '@mantine/notifications'
import { useTranslation } from 'react-i18next'

export default function UpdateName({ status, empire })
{
    const { t } = useTranslation('settings')
    const dispatch = useDispatch()

    const form = useForm({
        initialValues: {
            empireId: empire.id,
            type: 'name change',
            name: empire.name
        },
        validate: {
            name: hasLength({ min: 3, max: 50 }, t('settings:settings.nameError')),
        },
    })


    const updateName = async (values) =>
    {
        try {
            const res = await Axios.post(`/empire/${empire.uuid}/nameChange?gameId=${empire.game_id}`, values)
            // console.log(res.data)
            dispatch(empireLoaded(res.data))
            showNotification({
                title: t('settings:settings.nameResponseSuccess'),
                color: 'teal',
                autoClose: 2000
            })
        } catch (error) {
            console.log(error)
            showNotification({
                title: error.response.data.error,
                color: 'orange',
            })
        }
    }

    const alreadyChanged = empire.changeName > 0 ? true : false

    return (
        <form onSubmit={form.onSubmit((values) =>
        {
            // console.log(values)
            updateName(values)
        })}>
            <Stack spacing='sm' align='center'>
                <TextInput
                    label={t('settings:settings.changeName')}
                    description={t('settings:settings.nameLimit')}
                    placeholder={empire.name}
                    w='350px'
                    {...form.getInputProps('name')}
                />
                <Button size='sm' compact type='submit' disabled={status || alreadyChanged}>{t('settings:settings.submit')}</Button>
            </Stack>
        </form>
    )
}
