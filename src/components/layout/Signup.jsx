import { Button, createStyles, Anchor, TextInput, Title, Box, Text, PasswordInput, Paper } from '@mantine/core'
import { useForm } from '@mantine/form'
import { register } from '../../store/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const useStyles = createStyles(() => ({
	wrapper: {
		height: '100%',
		width: '100%',
		margin: 'auto',
		backgroundSize: 'cover',
		backgroundPosition: 'center center',
		backgroundRepeat: 'no-repeat',
		backgroundImage:
			`url('/images/login.webp')`,
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
		} else if (isLoggedIn && user.empires.length > 0) {
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

	return (
		<main className={classes.wrapper}>
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
					<PasswordInput
						label='Password'
						placeholder=''
						withAsterisk
						size='md'
						{...form.getInputProps('password')}
						mt='md'
					/>
					<Text ta="center" mt="md">
						By registering an account, you agree to abide by the <Anchor href='/rules'>game rules</Anchor>.
					</Text>
					<Text color='red' align='center' mt='md'>{error && Object.values(error)[0]}</Text>
					<Button fullWidth mt="md" size="md" type='submit'>Register</Button>
				</form>
				<Text ta="center" mt="md">
					Already have an account? <Anchor href='/login'>Login</Anchor>
				</Text>
				<Text ta="center" mt="md">
					<Anchor href='/'>Return home</Anchor>
				</Text>
			</Paper>
		</main>
	)
}
