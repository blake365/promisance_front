import { Button, Center, Group, TextInput, Title } from '@mantine/core'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from '@mantine/hooks'
import { login } from '../store/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

export default function Login() {
	const dispatch = useDispatch()

	const form = useForm({
		initialValues: {
			username: '',
			password: '',
		},
	})

	const { isLoggedIn } = useSelector((state) => state.user)

	let navigate = useNavigate()

	useEffect(() => {
		if (isLoggedIn) {
			return navigate('/summary')
		}
	}, [isLoggedIn])

	return (
		<main>
			<Center>
				<Group direction='column' spacing='sm' align='center'>
					<Title order={1} align='center'>
						Login
					</Title>
					<form onSubmit={form.onSubmit((values) => dispatch(login(values)))}>
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
						<Button type='submit'>Login</Button>
					</form>
					<div>
						Don't have an account? <Link to='/signup'>sign up</Link>
					</div>
				</Group>
			</Center>
		</main>
	)
}
