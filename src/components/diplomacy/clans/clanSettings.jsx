// form to join a clan
import
{
    Card,
    TextInput,
    Button,
    Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import Axios from 'axios';
import { useLoadEmpire } from '../../../hooks/useLoadEmpire';
import { showNotification } from '@mantine/notifications';

export default function ClanSettings({ clan, empire })
{
    const loadEmpire = useLoadEmpire(empire.uuid)

    const form = useForm({
        initialValues: {
            clanTag: clan.clanTag,
            empireId: empire.id
        },

        validate: {
            clanTag: (value) => value.length > 8 ? 'Clan Tag is max 8 characters' : null,
        }
    })

    const updateTag = async (values) =>
    {
        try {
            const res = await Axios.post('/clans/setTag', values)
            console.log(res)
            showNotification({
                title: 'Clan Tag Updated',
                autoClose: 2000,
            })
            loadEmpire()
        } catch (err) {
            // setError(err.response.data),
            // console.log(err)
            showNotification({
                title: 'Error Setting Tag',
                message: Object.values(err.response.data)[0],
                color: 'orange',
                autoClose: 5000,
            })
        }
    }

    return (
        <Card>
            <Title order={2} ta="center" >
                Clan Settings
            </Title>
            <form onSubmit={form.onSubmit((values) => updateTag(values))}>
                <TextInput label="Clan Tag" placeholder="TAG" mt="md" size="md" {...form.getInputProps('clanTag')} description='A short tag for your clan' />
                <Button fullWidth mt="xl" size="md" type='submit' >
                    Submit
                </Button>
            </form>
        </Card>
    );
}