import
{
    Paper,
    createStyles,
    TextInput,
    Button,
    Title,
    Text,
    Anchor
} from '@mantine/core';
import { useForm } from '@mantine/form'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';
import Axios from 'axios';

let bg = '/images/login.webp'

const useStyles = createStyles(() => ({
    wrapper: {
        height: '100%',
        width: '100%',
        margin: 'auto',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        backgroundImage:
            `url(${bg})`,
    },
    form: {
        minHeight: '100vh',
        maxWidth: 450,
        padding: 80,
        background: 'rgba(255,255,255,0.85)',
        '@media (max-width: 400)': {
            maxWidth: '100%',
            padding: 60,
        },
    },
}));


export default function Forgot()
{
    const { isLoggedIn, user } = useSelector((state) => state.user)
    // let { empire } = useSelector((state) => state.empire)
    const [error, setError] = useState(null)
    const [message, setMessage] = useState(null)
    const [disabled, setDisabled] = useState(false)

    const navigate = useNavigate()

    useEffect(() =>
    {
        // console.log(user)
        // console.log(user.empires)
        if ((isLoggedIn && user.empires?.length === 0) || (isLoggedIn && user.empires === undefined)) {
            return navigate('/create')
        } else if (isLoggedIn && user.empires.length > 0) {
            // dispatch(empireLoaded(user.empires[0]))
            return navigate('/app/')
        }
    }, [isLoggedIn, user, navigate])

    const dispatch = useDispatch()

    const form = useForm({
        initialValues: {
            email: '',
        },
    })

    const submitReset = async (values) =>
    {
        const res = await Axios.post('/auth/forgot-password', values)
        console.log(res)
        if (res.data.message) {
            setMessage(res.data.message)
            setDisabled(true)
        } else if (res.data.error) {
            setError(res.data.error)
        }
    }

    const { classes } = useStyles();
    return (
        <div className={classes.wrapper}>
            <Paper className={classes.form} radius={0} >
                <Title order={2} ta="center" mt={90} mb={10}>
                    Forgot Your Password?
                </Title>
                <Text ta="center" mb={50}>
                    Enter your email below.
                </Text>
                <form onSubmit={form.onSubmit((values) =>
                {
                    console.log(values)
                    submitReset(values)
                }
                )
                }>
                    <TextInput required label="Email" placeholder="" size="md" {...form.getInputProps('email')} />
                    <Text color='red' align='center' mt='md'>{error && error}</Text>
                    <Button fullWidth mt="xl" size="md" type='submit' color='teal' disabled={disabled}>
                        Request Password Reset
                    </Button>
                    <Text color='green' weight='bold' align='center' mt='md'>{message && message}</Text>
                </form>
                <Text ta="center" mt="md">
                    Need an account? <Anchor component={Link} to='/register'>Register</Anchor>
                </Text>
                <Text ta="center" mt="md">
                    <Anchor component={Link} to='/'>Return home</Anchor>
                </Text>
            </Paper>
        </div>
    );
}