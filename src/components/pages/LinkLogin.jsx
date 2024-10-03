// page to receive link login token and log user in

import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import Axios from "axios"
import { useNavigate, Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { load } from '../../store/userSlice'
import { fetchGames } from '../../store/gamesSlice';

import { Text, Anchor, Paper, Title, Stack } from "@mantine/core"
export default function LinkLogin()
{

    const [error, setError] = useState(null)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    let token = useParams().auth
    // console.log(token)

    useEffect(() =>
    {
        const checkToken = async () =>
        {
            try {
                const res = await Axios.get(`/auth/login-from-link/${token}`);
                console.log(res)
                if (res.status === 200) {
                    console.log("token is valid")
                    dispatch(load())
                        .then(() =>
                        {
                            dispatch(fetchGames());
                            navigate("/select");
                        })
                        .catch((error) =>
                        {
                            console.log(error);
                            setError(error);
                        });
                }
            } catch (error) {
                if (error.response && error.response.status === 400) {
                    console.log("token is invalid")
                    setError("Invalid login link")
                }
                console.log("An error occurred")
                setError("An error occurred: Invalid token")
            }
        }

        if (token) {
            // console.log(token)
            checkToken()
        }
    }, [token])

    return (
        <Stack align='center'>
            <Paper>
                <Title>Checking Login Link...</Title>
                {error && <Text>{error}</Text>}
                <Text ta="center" mt="md">
                    <Anchor component={Link} to='/'>Return Home</Anchor>
                </Text>
            </Paper>
        </Stack>
    )
}