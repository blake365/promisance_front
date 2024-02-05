import { Stack, Button, TextInput } from '@mantine/core'
import { useForm, hasLength } from '@mantine/form'
import Axios from 'axios'
import { useDispatch } from 'react-redux'
import { empireLoaded } from '../../store/empireSlice'
import { showNotification } from '@mantine/notifications'

export default function UpdateProfile({ status, empire })
{
    const dispatch = useDispatch()


    const form = useForm({
        initialValues: {
            empireId: empire.id,
            type: 'profile',
            profile: empire.profile
        },
        validate: {
            profile: hasLength({ max: 499 }, 'Profile must have 499 or less characters'),
        },
    })


    const updateProfile = async (values) =>
    {
        try {
            const res = await Axios.post(`/empire/${empire.uuid}/profile`, values)
            // console.log(res.data)
            dispatch(empireLoaded(res.data))
            showNotification({
                title: 'Profile updated',
                color: 'teal',
                autoClose: 2000
            })
        } catch (error) {
            console.log(error)
            showNotification({
                title: 'Profile update failed',
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
                    label='Edit Your Public Profile'
                    placeholder={empire.profile ? empire.profile : 'Enter your profile here'}
                    w='350px'
                    {...form.getInputProps('profile')}
                />
                <Button size='sm' compact type='submit' disabled={status}>Submit</Button>
            </Stack>
        </form>
    )
}
