import { Container, Group, Loader } from "@mantine/core";
import { SlimHero } from "./slimHero";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchGames } from "../../store/gamesSlice";
import { useNavigate } from "react-router-dom";
import { load } from "../../store/userSlice";
import Axios from 'axios'
import FooterSocial from "../layout/footer";
import ModeCard from "./ModeCard";

export default function ModeSelect()
{
    const navigate = useNavigate()
    const dispatch = useDispatch()
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

    const { status, games } = useSelector((state) => state.games)

    // get game data from scores to show information on the page
    // useEffect(() =>
    // {

    // }, [games])

    // logged in user can join both game modes
    // if they have not joined, clicking button will send them to create an empire for that mode
    // if they have joined, clicking button will send them into the game for that mode

    return (
        <main style={{ backgroundColor: '#F1F3F5' }}>
            <SlimHero />
            <Container size='xl' align='center' py='xl'>
                <Group mt='md' position="center" key='owjojd'>
                    {games.length > 0 ? games.map((game) =>
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
                            <ModeCard game={game} empireFound={empireFound} user={user} key={game.id} />
                        )
                    }) : (<Loader size='xl' />)}
                </Group>
            </Container>
            <FooterSocial />
        </main>
    )
}
