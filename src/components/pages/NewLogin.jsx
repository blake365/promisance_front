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
import { useEffect } from 'react'
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

        '@media (max-width: 400)': {
            maxWidth: '100%',
        },
    },

}));



export default function NewLogin()
{
    const { isLoggedIn, user } = useSelector((state) => state.user)
    // let { empire } = useSelector((state) => state.empire)

    const navigate = useNavigate()

    useEffect(() =>
    {
        // console.log(user)
        // console.log(user.empires)
        if (isLoggedIn && user.empires.length === 0) {
            setOpened(true)
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
                <Title order={2} ta="center" mt={150} mb={50}>
                    Welcome back to NeoPromisance!
                </Title>
                <form onSubmit={form.onSubmit((values) =>

                    dispatch(login(values)))
                }>
                    <TextInput label="Username" placeholder="username" size="md" {...form.getInputProps('username')} />
                    <PasswordInput label="Password" placeholder="Your password" mt="md" size="md" {...form.getInputProps('password')} />
                    <Button fullWidth mt="xl" size="md" type='submit' color='teal'>
                        Login
                    </Button>
                </form>
                <Text ta="center" mt="md">
                    Don&apos;t have an account? <Anchor href='/register'>Register</Anchor>
                </Text>
            </Paper>
        </div >
    );
}