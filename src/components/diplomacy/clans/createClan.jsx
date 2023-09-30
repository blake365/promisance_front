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


export default function CreateClan()
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

    const createClan = async (values) =>
    {
        try {
            const res = await Axios.post('/clans/create', values)
            console.log(res)
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
                    <TextInput required label="Clan Name" placeholder="name" size="md" {...form.getInputProps('clanName')} />
                    <TextInput required label="Clan Password" placeholder="password" mt="md" size="md" {...form.getInputProps('clanPassword')} />
                    <Text color='red' align='center' mt='md'>{error && Object.values(error)[0]}</Text>
                    <Button fullWidth mt="xl" size="md" type='submit' color='teal'>
                        Create Clan
                    </Button>
                </Card>
            </form>

        </Paper>
    );
}