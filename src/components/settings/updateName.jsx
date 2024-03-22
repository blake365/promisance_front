import { Stack, Button, TextInput } from '@mantine/core'
import { useForm, hasLength } from '@mantine/form'
import Axios from 'axios'
import { useDispatch } from 'react-redux'
import { empireLoaded } from '../../store/empireSlice'
import { showNotification } from '@mantine/notifications'

export default function UpdateName({ status, empire })
{
    const dispatch = useDispatch()

    const form = useForm({
        initialValues: {
            empireId: empire.id,
            type: 'name change',
            name: empire.name
        },
        validate: {
            name: hasLength({ min: 3, max: 255 }, 'Name must have between 3 and 255'),
        },
    })


    const updateName = async (values) =>
    {
        try {
            const res = await Axios.post(`/empire/${empire.uuid}/nameChange`, values)
            // console.log(res.data)
            dispatch(empireLoaded(res.data))
            showNotification({
                title: 'Name Changed',
                color: 'teal',
                autoClose: 2000
            })
        } catch (error) {
            console.log(error)
            showNotification({
                title: 'Name Change Failed',
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
                    label='Change Your Empire Name'
                    description='You can change your empire name once per round'
                    placeholder={empire.name}
                    w='350px'
                    {...form.getInputProps('name')}
                />
                <Button size='sm' compact type='submit' disabled={status || alreadyChanged}>Submit</Button>
            </Stack>
        </form>
    )
}
