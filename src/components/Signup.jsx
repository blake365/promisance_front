import { Button, Center, Group, TextInput, Title } from '@mantine/core'
import { useForm } from '@mantine/hooks'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { signupUser, userSelector } from '../store/userSlice'
import { useEffect } from 'react'

export default function Signup() {
	const dispatch = useDispatch()

	// const { isFetching, isSuccess, isError, errorMessage } =
	// 	useSelector(userSelector)

	// useEffect(() => {
	// 	return () => {
	// 		dispatch(clearState())
	// 	}
	// }, [])

	// useEffect(() => {
	// 	if (isSuccess) {
	// 		dispatch(clearState())
	// 		//   history.push('/');
	// 	}

	// 	if (isError) {
	// 		console.log(errorMessage)
	// 		dispatch(clearState())
	// 	}
	// }, [isSuccess, isError])

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
						Sign Up
					</Title>
					<form
						onSubmit={form.onSubmit((values) => dispatch(signupUser(values)))}
					>
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
					</form>
					<div>
						Already have an account? <Link to='/login'>Login</Link>
					</div>
				</Group>
			</Center>
		</main>
	)
}
