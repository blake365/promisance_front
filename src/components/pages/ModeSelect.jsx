import { Container, Box, Title, Card, Text, Grid, Center, Group, Button } from "@mantine/core";
import { SlimHero } from "./slimHero";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchGames, setActiveGame } from "../../store/gamesSlice";
import { useNavigate } from "react-router-dom";
import { fetchEmpire } from "../../store/empireSlice";
import { getTime } from "../../store/timeSlice";
import { load } from "../../store/userSlice";
import Axios from 'axios'
import FooterSocial from "../layout/footer";

export default function ModeSelect()
{
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const games = useSelector((state) => state.games.games)
    const { isLoggedIn, user } = useSelector((state) => state.user)
    // console.log(games)

    useEffect(() =>
    {
        dispatch(fetchGames())
        async function loadUser()
        {
            // console.log('loading user')
            const res = await Axios.get('auth/me')
            // console.log('status', res.data)
            if (res.status !== 200) {
                console.log('not 200')
                navigate('/login')
            } else if (res.data) {
                dispatch(load())
            }
        }

        if (!isLoggedIn) {
            loadUser()
        }
    }, [])

    // get game data from scores to show information on the page
    // useEffect(() =>
    // {

    // }, [games])

    // logged in user can join both game modes
    // if they have not joined, clicking button will send them to create an empire for that mode
    // if they have joined, clicking button will send them into the game for that mode

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
        <main style={{ backgroundColor: '#F1F3F5' }}>
            <SlimHero />
            <Container size='xl' align='center' py='xl'>
                <Group mt='md' position="center">
                    {games.length > 0 && games.map((game) =>
                    {
                        let empireFound = false
                        if (user?.empires?.length > 0) {
                            const empire = user.empires.find(empire =>
                                empire.game_id === game.game_id
                            )
                            if (empire) {
                                empireFound = true
                            }
                        }

                        return (
                            <Card withBorder maw={500} shadow='lg' key={game.id}>
                                <Title order={1} align='center' mb='lg'>{game.name}</Title>
                                <Text align='center' mb='lg'>
                                    {game.roundDescription}
                                </Text>
                                <Box my='lg'>
                                    <Card>
                                        <Grid justify="space-between" grow columns={15}>
                                            <Grid.Col span={3}>
                                                <Center h={30} miw={100} >
                                                    <Text weight='bold' align='center' >
                                                        Max Turns
                                                    </Text>
                                                </Center>
                                                <Text>{game.turnsMax}</Text>
                                            </Grid.Col>
                                            <Grid.Col span={3}>
                                                <Center h={30} miw={100} >
                                                    <Text weight='bold' align='center' >
                                                        Stored Turns
                                                    </Text>
                                                </Center>
                                                <Text>{game.turnsStored}</Text>
                                            </Grid.Col>
                                            <Grid.Col span={3}>
                                                <Center h={30} miw={160} >
                                                    <Text weight='bold' align='center' >
                                                        Turn Rate
                                                    </Text>
                                                </Center>
                                                <Text>{game.turnsCount} turn{game.turnsCount > 1 && 's'} / {game.turnsFreq} minutes</Text>
                                            </Grid.Col>
                                            <Grid.Col span={3}>
                                                <Center h={30} miw={200} >
                                                    <Text weight='bold' align='center' >
                                                        Round Start
                                                    </Text>
                                                </Center>
                                                <Text>{new Date(game.roundStart).toLocaleDateString()}</Text>
                                            </Grid.Col>
                                            <Grid.Col span={3}>
                                                <Center h={30} miw={200} >
                                                    <Text weight='bold' align='center' >
                                                        Round End
                                                    </Text>
                                                </Center>
                                                <Text>{new Date(game.roundEnd).toLocaleDateString()}</Text>
                                            </Grid.Col>
                                            <Grid.Col span={3}>
                                                <Center h={30} miw={100} >
                                                    <Text weight='bold' align='center' >
                                                        Players
                                                    </Text>
                                                </Center>
                                                <Text>XXX</Text>
                                            </Grid.Col>
                                            <Grid.Col span={3}>
                                                <Center h={30} miw={100} >
                                                    <Text weight='bold' align='center' >
                                                        Avg Land
                                                    </Text>
                                                </Center>
                                                <Text>XXX,XXX</Text>
                                            </Grid.Col>
                                            <Grid.Col span={3}>
                                                <Center h={30} miw={100} >
                                                    <Text weight='bold' align='center' >
                                                        Avg Net Worth
                                                    </Text>
                                                </Center>
                                                <Text>XXX,XXX,XXX</Text>
                                            </Grid.Col>
                                        </Grid>
                                    </Card>
                                </Box>
                                {!user ? null : (<Button size="lg" color={empireFound ? 'blue' : 'teal'} onClick={() => handleGameSelect(game)} fullWidth>{empireFound ? 'Play' : 'Create Empire'}</Button>)}
                            </Card>
                        )
                    })}
                </Group>
            </Container>
            <FooterSocial />
        </main>
    )
}
