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
import { useForm } from '@mantine/form';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import Axios from 'axios';
import { useLoadEmpire } from '../../../hooks/useLoadEmpire';
import { showNotification } from '@mantine/notifications';

export default function CreateClan({ disabled })
{
    const { empire } = useSelector((state) => state.empire)
    const [error, setError] = useState(null)
    const loadEmpire = useLoadEmpire(empire.uuid)

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
            const res = await Axios.post(`/clans/create?gameId=${empire.game_id}`, values)
            // console.log(res)
            showNotification({
                title: 'Clan Created',
                autoClose: 2000,
            })
            loadEmpire()
        } catch (err) {
            setError(err.response.data)
            console.log(err)
            showNotification({
                title: 'Error Creating Clan',
                autoClose: 2000,
            })
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