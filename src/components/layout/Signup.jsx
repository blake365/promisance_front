import { Button, Center, Group, TextInput, Title } from '@mantine/core'
import { useForm } from '@mantine/hooks'
import { useDispatch } from 'react-redux'
import { register, } from '../../store/userSlice'

export default function Signup()
{
	const dispatch = useDispatch()

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
		<main>
			<Center>
				<Group direction='column' spacing='sm' align='center'>
					<Title order={1} align='center'>
						Register
					</Title>
					<form
						onSubmit={form.onSubmit((values) => dispatch(register(values)))}
					>
						<Group direction='column' spacing='sm' align='center'>
							<TextInput
								label='Email'
								placeholder='me@email.com'
								type='email'
								required
								{...form.getInputProps('email')}
							/>
							<TextInput
								label='Username'
								placeholder=''
								type='text'
								required
								{...form.getInputProps('username')}
							/>
							<TextInput
								label='Password'
								placeholder=''
								type='password'
								required
								{...form.getInputProps('password')}
							/>
							<Button type='submit'>Sign Up</Button>
						</Group>
					</form>

				</Group>
			</Center>
		</main>
	)
}
