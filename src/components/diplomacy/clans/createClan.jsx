// form to create a clan
import
{
    Paper,
    TextInput,
    Button,
    Title,
    Text,
    Card,
} from '@mantine/core';
import { useForm } from '@mantine/form'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import Axios from 'axios';
import { empireLoaded } from '../../../store/empireSlice'


export default function CreateClan({ disabled })
{
    const { empire } = useSelector((state) => state.empire)
    const [error, setError] = useState(null)

    const dispatch = useDispatch()

    const form = useForm({
        initialValues: {
            clanName: '',
            clanPassword: '',
            empireId: empire.id
        },
    })

    const loadEmpireTest = async () =>
    {
        try {
            const res = await Axios.get(`/empire/${empire.uuid}`)
            // console.log(res.data)
            dispatch(empireLoaded(res.data))
        } catch (error) {
            console.log(error)
        }
    }

    const createClan = async (values) =>
    {
        try {
            const res = await Axios.post('/clans/create', values)
            // console.log(res)
            loadEmpireTest()
        } catch (err) {
            setError(err.response.data)
            console.log(err)
        }
    }

    return (
        <Paper maw={400} p={20}>
            <Title order={2} ta="center" >
                Create a Clan
            </Title>

            <form onSubmit={form.onSubmit((values) =>
                // console.log(values)
                createClan(values)
            )
            }>
                <Card >
                    {disabled && <Text align='center' color='red'>You cannot create a clan while in new player protection</Text>}
                    <TextInput required label="Clan Name" placeholder="name" size="md" {...form.getInputProps('clanName')} />
                    <TextInput required label="Clan Password" placeholder="password" mt="md" size="md" {...form.getInputProps('clanPassword')} />
                    <Text color='red' align='center' mt='md'>{error && Object.values(error)[0]}</Text>
                    <Button fullWidth mt="xl" size="md" type='submit' color='teal' disabled={disabled}>
                        Create Clan
                    </Button>
                </Card>
            </form>

        </Paper>
    );
}