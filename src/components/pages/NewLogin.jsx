import
{
    Paper,
    createStyles,
    TextInput,
    PasswordInput,
    Button,
    Title,
    Text,
    Anchor
} from '@mantine/core';
import { useForm } from '@mantine/form'
import { login } from '../../store/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';
import { logoutEmpire } from '../../store/empireSlice';
import { IconBrandGoogle } from '@tabler/icons-react';
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
        maxWidth: 500,
        padding: 80,
        background: 'rgba(255,255,255,0.85)',
        '@media (max-width: 400px)': {
            maxWidth: '100%',
            padding: 40,
        },
    },
}));


export default function NewLogin()
{
    const { isLoggedIn, user } = useSelector((state) => state.user)
    let { empire } = useSelector((state) => state.empire)
    const [error, setError] = useState(null)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() =>
    {
        // console.log(user)
        // console.log(user.empires)
        if (!isLoggedIn && empire) {
            dispatch(logoutEmpire())
        } else if ((isLoggedIn && user.empires?.length === 0) || (isLoggedIn && user.empires === undefined)) {
            return navigate('/create')
        } else if (isLoggedIn && user.empires.length > 0) {
            // dispatch(empireLoaded(user.empires[0]))
            return navigate('/app/')
        }
    }, [isLoggedIn])


    const form = useForm({
        initialValues: {
            username: '',
            password: '',
        },
    })

    const google = async () =>
    {
        window.location.href = 'localhost:5001/api/auth/auth/google'
    }


    const { classes } = useStyles();
    return (
        <div className={classes.wrapper}>
            <Paper className={classes.form} radius={0} >
                <Title order={2} ta="center" mt={90} mb={50}>
                    Welcome back to NeoPromisance!
                </Title>
                <form onSubmit={form.onSubmit((values) =>
                    dispatch(login(values))
                        .unwrap()
                        .then(() => navigate('/app'))
                        .catch((error) =>
                        {
                            console.log(error)
                            setError(error)
                        })
                )
                }>
                    <TextInput required label="Username" placeholder="username" size="md" {...form.getInputProps('username')} />
                    <Text size='sm' my={0} color='dimmed' align='left'>Username is case sensitive. <Anchor component={Link} to='/forgot-username'>Forgot Username?</Anchor></Text>
                    <PasswordInput required label="Password" placeholder="Your password" mt="md" size="md" {...form.getInputProps('password')} />
                    <Text size='sm' align='left'>
                        <Anchor component={Link} to='/forgot'>Forgot Password?</Anchor>
                    </Text>
                    <Text color='red' align='center' mt='md'>{error && Object.values(error)[0]}</Text>
                    <Button fullWidth mt="xl" size="md" type='submit' color='teal'>
                        Login
                    </Button>
                    <Button component='a' href={import.meta.env.PROD ? 'https://api.neopromisance.com/api/auth/auth/google' : 'http://localhost:5001/api/auth/auth/google'} mt="md" fullWidth size="md" color='blue' leftIcon={<IconBrandGoogle />}>
                        Login with Google
                    </Button>
                    <Text size='sm' mt='xs' color='dimmed' align='center'>You will stay logged in for 1 hour</Text>
                </form>
                <Text ta="center" mt="md">
                    Need an account? <Anchor component={Link} to='/register'>Register</Anchor>
                </Text>

                <Text ta="center" mt="md">
                    <Anchor component={Link} to='/'>Return home</Anchor>
                </Text>
            </Paper>
        </div >
    );
}