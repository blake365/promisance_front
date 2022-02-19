import { Button, Center, Group, TextInput, Title } from '@mantine/core'
import { useForm } from '@mantine/hooks'
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
				<Group direction='column' spacing='sm' align='center'>
					<Title order={1} align='center'>
						Login
					</Title>
					<form onSubmit={form.onSubmit((values) => dispatch(login(values)))}>
						<Group direction='column' spacing='sm' align='center'>
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
						</Group>
					</form>

				</Group>
			</Center>
		</main>
	)
}
