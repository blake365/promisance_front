import { Button, Center, Group, TextInput, Title, Select, Modal } from '@mantine/core'
import { useForm } from '@mantine/hooks'
import { useDispatch } from 'react-redux'
import { create } from '../../store/empireSlice'
import { useState } from 'react'

export default function CreateEmpire(props)
{
	const dispatch = useDispatch()

	//TODO: set up server side validation response

	const [opened, setOpened] = useState(props.opened);

	const form = useForm({
		initialValues: {
			name: '',
			race: '',
		},

		validationRules: {

		},

		errorMessages: {

		},
	})

	// const onSubmit = (data: Object) => {dispatch(signupUser(data))}

	return (
		<Modal
			opened={opened}
			onClose={() => setOpened(false)}
		>
			<Center>
				<Group direction='column' spacing='sm' align='center'>
					<Title order={1} align='center'>
						Create Empire
					</Title>
					<form
						onSubmit={form.onSubmit((values) =>
						{
							console.log(values)
							dispatch(create(values))
							setOpened(false)
						})}
					>
						<Group direction='column' spacing='sm' align='center'>
							<TextInput
								label='Name'
								placeholder='empire name'
								type='text'
								required
								{...form.getInputProps('name')}
							/>
							<Select
								label="Race"
								placeholder="Pick one"
								required
								data={[
									{ value: 'elf', label: 'Elf' },
									{ value: 'gremlin', label: 'Gremlin' },
									{ value: 'orc', label: 'Orc' },
									{ value: 'gnome', label: 'Gnome' },
								]}
							/>
							<Button type='submit'>Create</Button>
						</Group>
					</form>

				</Group>
			</Center>
		</Modal>
	)
}
