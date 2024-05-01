import { Text, Button, Title, TextInput, Group, Stack, Container } from '@mantine/core';
import { useEffect, useState } from 'react';
import Axios from 'axios';
import { useForm } from '@mantine/form'
import { useSelector } from 'react-redux';
import { CheckCircle } from '@phosphor-icons/react';

function AdminSummary()
{
    const [stats, setStats] = useState({});
    const [result, setResult] = useState();

    const game = useSelector((state) => state.games.activeGame)

    useEffect(() =>
    {
        const loadStats = async () =>
        {
            const response = await Axios.get(`/admin/countall?gameId=${game.game_id}`);
            const data = response.data;
            // console.log(data);
            setStats(data);
        }

        loadStats()

    }, [game]);

    const form = useForm({
        initialValues: {
            code: '',
        },
    })

    const submitReset = async (values) =>
    {
        try {
            const res = await Axios.post(`/admin/resetgame?gameId=${game.game_id}`, values)
            // console.log(res.data)
            setResult(res.data)
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <Container>
            <Stack>
                <div>
                    <Group><Title>{game.name}</Title>
                        {game.isActive && <CheckCircle color='green' weight='fill' size={20} />}
                    </Group>
                    <Title order={2}>Game Summary</Title>
                    <Text>Users: {stats.users}</Text>
                    <Text>Empires: {stats.empires}</Text>
                    <Text>Mail Messages (reports): {stats.mail} ({stats.reports})</Text>
                    <Text>Market Items: {stats.markets}</Text>
                    <Text>News Events: {stats.news}</Text>
                </div>
                <Stack my='sm'>
                    <Group spacing='xs'>
                        <Text align='left'>
                            <b>Max Turns:</b> {game.turnsMax}</Text>
                        <Text align='left'>
                            <b>Stored Turns:</b> {game.turnsStored}</Text>
                        <Text align='left'>
                            <b>Turn Rate:</b> {game.turnsCount} turn{game.turnsCount > 1 && 's'} / {game.turnsFreq} minutes</Text>
                        <Text align='left'>
                            <b>Round Start:</b> {new Date(game.roundStart).toLocaleDateString()}</Text>
                        <Text align='left'>
                            <b>Round End:</b> {new Date(game.roundEnd).toLocaleDateString()}</Text>
                    </Group>

                    <Group spacing='xs'>
                        {game.numEmpires && <Text align='left'>
                            <b>Players:</b> {game.numEmpires.toLocaleString()}</Text>}
                        {game.avgLand && (
                            <Text align="left">
                                <b>Average Land:</b> {game.avgLand.toLocaleString()}
                            </Text>
                        )}
                        {game.avgNetWorth && (
                            <Text align="left">
                                <b>Average Net Worth:</b> $
                                {game.avgNetWorth.toLocaleString()}
                            </Text>
                        )}
                    </Group>
                </Stack>
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
            </Stack>
        </Container>
    );
}

export default AdminSummary;