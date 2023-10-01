// form to join a clan
import
{
    Paper,
    TextInput,
    Button,
    Title,
    Text,
    Card,
    Select,
} from '@mantine/core';
import { useForm } from '@mantine/form'
import { useDispatch, useSelector } from 'react-redux'
import { useState, forwardRef, useEffect } from 'react'
import Axios from 'axios';


export default function JoinClan({ disabled })
{
    const { empire } = useSelector((state) => state.empire)
    const [error, setError] = useState(null)
    const [clans, setClans] = useState([])
    const [selectedClan, setSelectedClan] = useState('')


    const form = useForm({
        initialValues: {
            clanName: '',
            clanPassword: '',
            empireId: empire.id
        },
    })

    useEffect(() =>
    {
        const loadClans = async () =>
        {
            try {
                const res = await Axios.get(`/clans/getClans`)
                console.log(res.data)
                if (res.data.length > 0) {
                    let clans = res.data.map(({ clanName, id }) => ({ clanName, id }))
                    let dataFormat = clans.map((clan) =>
                    ({
                        name: clan.clanName,
                        value: clan.clanName,
                        label: clan.clanName
                    })
                    )
                    console.log(dataFormat)
                    setClans(dataFormat)
                }

            } catch (error) {
                console.log(error)
            }
        }
        loadClans()
    }, [empire.clanId])

    const SelectItem = forwardRef(
        ({ name, value, ...others }, ref) => (
            <div ref={ref} {...others}>
                <div>
                    <Text size='sm' weight='bold'>{name}</Text>
                </div>
            </div>
        )
    );

    const joinClan = async (values) =>
    {
        try {
            const res = await Axios.post('/clans/join', values)
            console.log(res)
        } catch (err) {
            setError(err.response.data)
            console.log(err)
        }
    }

    return (
        <Paper maw={400} p={20}>
            <Title order={2} ta="center" >
                Join a Clan
            </Title>

            {clans.length > 0 ? (<form onSubmit={form.onSubmit((values) =>
                // console.log(values)
                joinClan(values)
            )}>
                <Card>
                    {disabled && <Text align='center' color='red'>You cannot join a clan while in new player protection</Text>}
                    <Select
                        searchable
                        searchValue={selectedClan}
                        onSearchChange={setSelectedClan}
                        label="Select a Clan to join"
                        placeholder="Pick one"
                        withAsterisk
                        itemComponent={SelectItem}
                        data={clans}
                        withinPortal
                        sx={{ width: '100%' }}
                        {...form.getInputProps('clanName')}
                    />
                    <TextInput required label="Clan Password" placeholder="password" mt="md" size="md" {...form.getInputProps('clanPassword')} />
                    <Text color='red' align='center' mt='md'>{error && Object.values(error)[0]}</Text>
                    <Button fullWidth mt="xl" size="md" type='submit' color='teal' disabled={disabled}>
                        Join Clan
                    </Button>
                </Card>
            </form>) : (<Text align='center'>No clans have been created yet.</Text>)}


        </Paper>
    );
}