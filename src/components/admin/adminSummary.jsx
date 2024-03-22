import { Text, Button, Title, TextInput } from '@mantine/core';
import { useEffect, useState } from 'react';
import Axios from 'axios';
import { useForm } from '@mantine/form'
import { useSelector } from 'react-redux';


function AdminSummary()
{
    const [stats, setStats] = useState({});
    const [result, setResult] = useState();

    const { game_id } = useSelector((state) => state.games.activeGame)

    useEffect(() =>
    {
        const loadStats = async () =>
        {
            const response = await Axios.get(`/admin/countall?gameId=${game_id}`);
            const data = response.data;
            // console.log(data);
            setStats(data);
        }

        loadStats()

    }, [game_id]);

    const form = useForm({
        initialValues: {
            code: '',
        },
    })

    const submitReset = async (values) =>
    {
        try {
            const res = await Axios.post(`/admin/resetgame?gameId=${game_id}`, values)
            // console.log(res.data)
            setResult(res.data)
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div>
            <div>
                <Title>Game Summary</Title>
                <Text>Users: {stats.users}</Text>
                <Text>Empires: {stats.empires}</Text>
                <Text>Mail Messages (reports): {stats.mail} ({stats.reports})</Text>
                <Text>Market Items: {stats.markets}</Text>
                <Text>News Events: {stats.news}</Text>
            </div>
            <div>
                <Title>Reset Game</Title>
                <Text>Resetting the game will delete all empires, clans, mail messages, market items, news events, etc. Empires, clans, round history will be saved.</Text>
                <form onSubmit={form.onSubmit((values) =>
                {
                    console.log('resetting game')
                    console.log(values)
                    submitReset(values)
                })}>
                    <TextInput placeholder="Enter reset code"
                        {...form.getInputProps('code')}
                        mb='sm'
                        maw={300}
                    />
                    <Button color="red" type='submit'>Reset Game</Button>
                    {result && <Text>{result.message}</Text>}
                </form>
            </div>
        </div>
    );
}

export default AdminSummary;