import { Title, Text, Collapse, Group, Button, Stack, Center, Loader, Card, Box } from "@mantine/core";
import { Suspense, useState } from 'react';
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
import { demo } from '../../store/userSlice';

export default function ModeCard({ game, empireFound, user })
{
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [opened, { toggle }] = useDisclosure(false);
    const [error, setError] = useState(null);

    // console.log(game.game_id)

    // button action to set active game and navigate to app or create empire
    const handleGameSelect = (game) =>
    {
        // console.log(game.game_id)
        dispatch(setActiveGame(game))
        // compare user empires and find the one with the same game_id as the game object
        if (user.empires.length > 0) {
            // console.log(game.game_id)
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

    const demoRegister = () =>
    {
        dispatch(setActiveGame(game))
        dispatch(demo()).unwrap().then(() => navigate('/demo')).catch((err) =>
        {
            console.log(err)
            setError(err)
        })
    }

    const now = new Date().getTime()

    let roundStatus = false
    const upcoming = new Date(game.roundStart).getTime() - now
    const remaining = new Date(game.roundEnd).getTime() - now

    if (upcoming > 0) {
        roundStatus = true
    } else if (remaining < 0) {
        roundStatus = true
    } else {
        roundStatus = false
    }

    return (
        <Card withBorder shadow='lg' key={game.id} w={'100%'} >
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
                {!user ? <>
                    <Button size="md" w={210} variant="outline" disabled={roundStatus} onClick={() => demoRegister(game)}>Create Demo Empire</Button>
                    <Text color='red' align="left" size='sm'>{error?.error}</Text>
                </> : empireFound ? (
                    <Button size="md" w={210} color='blue' disabled={roundStatus} onClick={() => handleGameSelect(game)}>Play</Button>
                ) : (
                    <Button size="md" w={210} color='teal' disabled={roundStatus} onClick={() => handleGameSelect(game)}>Create Empire</Button>
                )}
            </Stack>
            <Box onClick={toggle} sx={{ cursor: 'pointer' }}>
                {!opened ? <Text size='sm' align='center' color='dimmed'>Click to See Scores and News</Text> : <Text size='sm' align='center' color='dimmed'>Click to Collapse</Text>}
            </Box>
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