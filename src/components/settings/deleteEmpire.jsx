import { useState } from 'react'
import { Stack, Title, Button, TextInput, Text } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useNavigate } from 'react-router-dom'
import { logout } from '../../store/userSlice'
import { useDispatch } from 'react-redux'

export default function DeleteEmpire({ status, empire })
{
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
            setDeleteUpdate('Please confirm')
        }
    }

    return (
        <Stack spacing='sm' align='center' mt={100}>
            <Title>Delete Empire</Title>
            <Text maw={400}>This will fully delete your empire for this round. We are sorry to see you go. <a href='mailto:admin@neopromisance.com'>Contact us</a> if you have any feedback to improve the game. </Text>
            <form onSubmit={form2.onSubmit((values) =>
            {
                // console.log('deleting empire')
                // console.log(values)
                deleteEmpire(values)
            })}>
                <Stack>
                    <TextInput placeholder="Type 'confirm' to delete empire"
                        {...form2.getInputProps('confirm')}
                        mb='sm'
                        maw={300}
                    />
                    <Button color="red" type='submit' disabled={status}>Delete Empire</Button>
                    {deleteUpdate && <Text ta='center'>{deleteUpdate}</Text>}
                </Stack>
            </form>
        </Stack>
    )
}
