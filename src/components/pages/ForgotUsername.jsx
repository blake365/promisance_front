import
{
    Paper,
    createStyles,
    TextInput,
    Button,
    Title,
    Text,
    Anchor,
    MantineProvider,
    ColorSchemeProvider,
    Stack
} from '@mantine/core';
import { useForm } from '@mantine/form'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';
import Axios from 'axios';
import { useLocalStorage } from '@mantine/hooks';
import { useTranslation } from 'react-i18next';

const useStyles = createStyles(() => ({
    form: {
        minHeight: '100vh',
        maxWidth: 500,
        padding: 80,
        '@media (max-width: 400px)': {
            maxWidth: '100%',
            padding: 40,
        },
    },
}));


export default function ForgotUsername()
{
    const { isLoggedIn, user } = useSelector((state) => state.user)
    // let { empire } = useSelector((state) => state.empire)
    const [error, setError] = useState(null)
    const [message, setMessage] = useState(null)
    const [disabled, setDisabled] = useState(false)
    const { t, i18n } = useTranslation(['auth'])

    const navigate = useNavigate()

    useEffect(() =>
    {
        // console.log(user)
        // console.log(user.empires)
        if ((isLoggedIn && user.empires?.length === 0) || (isLoggedIn && user.empires === undefined)) {
            return navigate('/create')
        } if (isLoggedIn && user.empires.length > 0) {
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
        const res = await Axios.post(`/auth/forgot-username?language=${i18n.language}`, values)
        console.log(res)
        if (res.data.message) {
            setMessage(res.data.message)
            setDisabled(true)
        } else if (res.data.error) {
            setError(res.data.error)
        }
    }

    const { classes } = useStyles();
    const [colorScheme, setColorScheme] = useLocalStorage({
        key: 'prom-color-scheme',
        defaultValue: 'dark'
    });
    const toggleColorScheme = (value) =>
        setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

    return (
        <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
            <MantineProvider theme={{ colorScheme }} withGlobalStyles>
                <Stack align='center'>
                    <Paper className={classes.form} radius={0} >
                        <Title order={2} ta="center" mt={90} mb={10}>
                            {t('auth:forgotUsernameTitle')}
                        </Title>
                        <Text ta="center" mb={50}>
                            {t('auth:forgotPasswordText')}
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
                                {t('auth:forgotUsernameButton')}
                            </Button>
                            <Text color='green' weight='bold' align='center' mt='md'>{message && message}</Text>
                        </form>
                        <Text ta="center" mt="md">
                            {t('auth:returnTo')} <Anchor component={Link} to='/login'>{t('auth:loginButton')}</Anchor>
                        </Text>
                        <Text ta="center" mt="md">
                            {t('auth:needAccount')} <Anchor component={Link} to='/register'>{t('auth:registerButton')}</Anchor>
                        </Text>
                        <Text ta="center" mt="md">
                            <Anchor component={Link} to='/'>{t('auth:returnHome')}</Anchor>
                        </Text>
                    </Paper>
                </Stack>
            </MantineProvider>
        </ColorSchemeProvider>
    );
}