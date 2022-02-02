import { Button, Center, Group, TextInput, Title } from '@mantine/core'
import { Link } from 'react-router-dom'

export default function Login() {
	return (
		<main>
			<Center>
				<Group direction='column' spacing='sm' align='center'>
					<Title order={1} align='center'>
						Login
					</Title>
					<TextInput
						label='Email'
						placeholder='me@email.com'
						type='email'
						required
					/>
					<TextInput label='Password' placeholder='' type='password' required />
					<Button color=''>Login</Button>

					<div>
						Don't have an account? <Link to='/signup'>sign up</Link>
					</div>
				</Group>
			</Center>
		</main>
	)
}
