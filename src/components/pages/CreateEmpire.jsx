import { Button, Center, Group, TextInput, Title, Select, Modal } from '@mantine/core'
import { useForm } from '@mantine/form'
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
			race: 0,
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
									{ value: 0, label: 'Human' },
									{ value: 1, label: 'Elf' },
									{ value: 2, label: 'Dwarf' },
									{ value: 3, label: 'Troll' },
									{ value: 4, label: 'Gnome' },
									{ value: 5, label: 'Gremlin' },
									{ value: 6, label: 'Orc' },
									{ value: 7, label: 'Drow' },
									{ value: 8, label: 'Goblin' },
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
