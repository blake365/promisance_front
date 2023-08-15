import { Button, createStyles, Stack, TextInput, Title, Paper, PasswordInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useDispatch } from 'react-redux'
import { register, } from '../../store/userSlice'



const useStyles = createStyles(() => ({
	wrapper: {
		height: '100%',
		width: '100%',
		margin: 'auto',
		backgroundSize: 'cover',
		backgroundPosition: 'center center',
		backgroundRepeat: 'no-repeat',
		backgroundImage:
			`url('/images/summaries/default.webp')`,
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

export default function Signup()
{
	const dispatch = useDispatch()
	const { classes } = useStyles();

	//TODO: set up server side validation response

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
				<Title order={2} ta="center" mt={150} mb={50}>
					Register An Account
				</Title>
				<form
					onSubmit={form.onSubmit((values) => dispatch(register(values)))}
				>
					<TextInput
						label='Email'
						placeholder='me@email.com'
						type='email'
						required
						size='md'
						{...form.getInputProps('email')}
					/>
					<TextInput
						label='Username'
						placeholder=''
						type='text'
						required
						size='md'
						{...form.getInputProps('username')}
					/>
					<TextInput
						label='Password'
						placeholder=''
						type='password'
						required
						size='md'
						{...form.getInputProps('password')}
					/>
					<Button fullWidth mt="xl" size="md" type='submit'>Register</Button>
				</form>
			</Paper>
		</main>
	)
}
