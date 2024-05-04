import { Button, createStyles, Anchor, TextInput, Title, Text, PasswordInput, Paper, ColorSchemeProvider, MantineProvider, Stack } from '@mantine/core'
import { useForm } from '@mantine/form'
import { register } from '../../store/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { IconBrandGoogle } from '@tabler/icons-react'
import { useLocalStorage } from '@mantine/hooks'

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

export default function Signup()
{
	const dispatch = useDispatch()
	const { classes } = useStyles();

	const [error, setError] = useState(null)
	const { isLoggedIn, user } = useSelector((state) => state.user)
	// let { empire } = useSelector((state) => state.empire)

	const navigate = useNavigate()

	useEffect(() =>
	{
		// console.log(user)
		// console.log(user.empires)
		if ((isLoggedIn && user.empires?.length === 0) || (isLoggedIn && user.empires === undefined)) {
			return navigate('/create')
		}
		if (isLoggedIn && user.empires.length > 0) {
			// dispatch(empireLoaded(user.empires[0]))
			return navigate('/app/')
		}
	}, [isLoggedIn, user, navigate])

	const form = useForm({
		initialValues: {
			email: '',
			username: '',
			password: '',

		},

		validationRules: {
			email: (value) => /^\S+@\S+$/.test(value),
			password: (password) => password.trim().length >= 6,
		},

		errorMessages: {
			email: 'Invalid email address',
			password: 'Password must be at least 6 characters',
		},
	})

	// const onSubmit = (data: Object) => {dispatch(signupUser(data))}

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
						<Title order={2} ta="center" mt={90} mb={50}>
							Register Account
						</Title>

						<form
							onSubmit={form.onSubmit((values) => dispatch(register(values))
								.unwrap()
								.then(() => navigate('/login'))
								.catch((error) =>
								{
									console.log(error)
									setError(error)
								})
							)}
						>
							<TextInput
								label='Email'
								placeholder='my@email.com'
								type='email'
								required
								size='md'
								{...form.getInputProps('email')}
								mt='md'
							/>
							<TextInput
								label='Username'
								placeholder=''
								type='text'
								required
								size='md'
								{...form.getInputProps('username')}
								mt='md'
							/>
							<Text size='sm' my={0} color='dimmed' align='left'>username is case sensitive</Text>
							<PasswordInput
								label='Password'
								placeholder=''
								withAsterisk
								size='md'
								{...form.getInputProps('password')}
								mt='md'
							/>
							<Text ta="center" mt="md">
								By registering an account, you agree to abide by the <Anchor component={Link} to='/rules'>game rules</Anchor>.
							</Text>
							<Text color='red' align='center' mt='md'>{error && Object.values(error)[0]}</Text>
							<Button fullWidth mt="md" size="md" type='submit'>Register</Button>
							<Button component='a' href={import.meta.env.PROD ? 'https://api.neopromisance.com/api/auth/auth/google' : 'http://localhost:5001/api/auth/auth/google'} mt="md" fullWidth size="md" color='blue' leftIcon={<IconBrandGoogle />}>
								Login with Google
							</Button>
						</form>
						<Text ta="center" mt="md">
							Already have an account? <Anchor component={Link} to='/login'>Login</Anchor>
						</Text>
						<Text ta="center" mt="md">
							<Anchor component={Link} to='/'>Return Home</Anchor>
						</Text>
					</Paper>
				</Stack>
			</MantineProvider>
		</ColorSchemeProvider>
	)
}
