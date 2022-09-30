import { Button, Center, Group, Stack, TextInput, Title } from '@mantine/core'
import { useForm } from '@mantine/form'
import { login } from '../../store/userSlice'
import { useDispatch } from 'react-redux'

export default function Login()
{
	const dispatch = useDispatch()

	const form = useForm({
		initialValues: {
			username: '',
			password: '',
		},
	})

	// const { isLoggedIn } = useSelector((state) => state.user)

	// let navigate = useNavigate()

	// useEffect(() =>
	// {
	// 	if (isLoggedIn) {
	// 		return navigate('app/summary')
	// 	}
	// }, [isLoggedIn])

	return (
		<main>
			<Center>
				<Stack spacing='sm' align='center'>
					<Title order={1} align='center'>
						Login
					</Title>
					<form onSubmit={form.onSubmit((values) => dispatch(login(values)))}>
						<Stack spacing='sm' align='center'>
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
						</Stack>
					</form>

				</Stack>
			</Center>
		</main>
	)
}
