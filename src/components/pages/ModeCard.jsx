import { Title, Text, Collapse, Group, Button, Stack, Center, Loader, Card } from "@mantine/core";
import { Suspense } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { Trophy } from "@phosphor-icons/react";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchEmpire } from '../../store/empireSlice';
import { getTime } from '../../store/timeSlice';
import { setActiveGame } from '../../store/gamesSlice';
import lazy from '../utilities/lazyWrapper'
const HomeNews = lazy(() => import('../layout/homeNews'));
const HomeScores = lazy(() => import('../layout/homeScores'));

export default function ModeCard({ game, empireFound, user })
{
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [opened, { toggle }] = useDisclosure(false);

    // console.log(game.game_id)

    // button action to set active game and navigate to app or create empire
    const handleGameSelect = (game) =>
    {
        dispatch(setActiveGame(game))
        // compare user empires and find the one with the same game_id as the game object
        if (user.empires.length > 0) {
            const empire = user.empires.find(empire =>
                empire.game_id === game.game_id
            )
            // console.log(empire)
            // if user has no empire for this game, send them to create empire
            if (!empire) {
                navigate('/create')
            } else {
                dispatch(fetchEmpire(
                    {
                        uuid: empire.uuid,
                    }
                ))
                dispatch(getTime(game.game_id)).then(() => navigate('/app/'))
            }
        } else {
            navigate('/create')
        }
    }

    return (
        <Card withBorder shadow='lg' key={game.id} w={'100%'} onClick={toggle} sx={{ cursor: 'pointer' }}>
            <Stack>
                <Group position="left"><Trophy size={40} /><Title order={1} align='left'>{game.name}</Title></Group>
                <Text align='left'>
                    {game.roundDescription}
                </Text>
            </Stack>
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
                    <Text align='left'>
                        <b>Players:</b> {game.numEmpires.toLocaleString()}</Text>
                    <Text align='left'>
                        <b>Average Land:</b> {game.avgLand.toLocaleString()}</Text>
                    <Text align='left'>
                        <b>Average Net Worth:</b> ${game.avgNetWorth.toLocaleString()}</Text>
                </Group>
                {!user ? null : (<Button size="md" maw={200} color={empireFound ? 'blue' : 'teal'} onClick={() => handleGameSelect(game)} >{empireFound ? 'Play' : 'Create Empire'}</Button>)}
            </Stack>
            {!opened ? <Text size='sm' align='center' color='dimmed'>Click to See Scores and Events</Text> : <Text size='sm' align='center' color='dimmed'>Click to Collapse</Text>}
            <Collapse in={opened}>
                <Group my='md' position='center' align='flex-start'>
                    <Suspense fallback={<Center><Loader size='xl' /></Center>}>
                        <HomeScores gameId={game.game_id} />
                        <HomeNews gameId={game.game_id} />
                    </Suspense>
                </Group>
            </Collapse>
        </Card>
    )
}