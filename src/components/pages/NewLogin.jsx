import
{
    Paper,
    createStyles,
    TextInput,
    PasswordInput,
    Button,
    Title,
    Text,
    Anchor,
} from '@mantine/core';
import { useForm } from '@mantine/form'
import { login } from '../../store/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const bgArray = [
    '/images/summaries/default.webp',
    '/images/summaries/cashfuture.webp',
    '/images/summaries/cashpast.webp',
    '/images/summaries/cashpresent.webp',
    '/images/summaries/farmfuture.webp',
    '/images/summaries/farmpast.webp',
    '/images/summaries/farmpresent.webp',
    '/images/summaries/indyfuture.webp',
    '/images/summaries/indypast.webp',
    '/images/summaries/indypresent.webp',
    '/images/summaries/magefuture.webp',
    '/images/summaries/magepast.webp',
    '/images/summaries/magepresent.webp',
]

let bg = bgArray[Math.floor(Math.random() * bgArray.length)]

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


export default function NewLogin()
{
    const { isLoggedIn, user } = useSelector((state) => state.user)
    // let { empire } = useSelector((state) => state.empire)
    const [error, setError] = useState(null)

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
            username: '',
            password: '',
        },
    })

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
                    <PasswordInput required label="Password" placeholder="Your password" mt="md" size="md" {...form.getInputProps('password')} />
                    <Text color='red' align='center' mt='md'>{error && Object.values(error)[0]}</Text>
                    <Button fullWidth mt="xl" size="md" type='submit' color='teal'>
                        Login
                    </Button>
                    <Text size='sm' mt='xs' color='dark' align='center'>You will stay logged in for 1 hour</Text>

                </form>
                <Text ta="center" mt="md">
                    Need an account? <Anchor href='/register'>Register</Anchor>
                </Text>
            </Paper>
        </div >
    );
}