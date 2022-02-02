import {
	Center,
	Group,
	Title,
	NumberInput,
	Button,
	Divider,
} from '@mantine/core'
import { useForm } from '@mantine/hooks'
import Axios from 'axios'

export default function Cash() {
	// TODO: state management for form input
	const empire = {
		id: 2,
		turns: 200,
	}

	const form = useForm({
		initialValues: {
			empireId: empire.id,
			type: 'cash',
			turns: 0,
			condensed: true,
		},

		validationRules: {
			turns: (value) => value < empire.turns && value > 0,
		},

		errorMessages: {
			turns: 'Invalid number of turns',
		},
	})

	const doTurns = async (values: Object) => {
		try {
			const res = await Axios.post('/useturns', values)

			console.log(res.data)
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<main>
			<Center mb={10}>
				<Group direction='column' spacing='sm' align='center'>
					<Title order={1} align='center'>
						Cash
					</Title>
					<div>
						For each turn focusing on your economy, your people will produce 25%
						more money
					</div>
					<form onSubmit={form.onSubmit((values) => doTurns(values))}>
						<Group direction='column' spacing='sm' align='center'>
							<NumberInput
								label='Spend how many turns making money?'
								min={0}
								defaultValue={0}
								stepHoldDelay={500}
								stepHoldInterval={100}
								max={empire.turns}
								{...form.getInputProps('turns')}
							/>
							<Button color='yellow' type='submit'>
								Make Money
							</Button>
						</Group>
					</form>
				</Group>
			</Center>
			<Divider size='lg' />
			<Center mt={10}>
				<Group direction='column' spacing='sm' align='center'>
					<div>Update your tax rate:</div>
					<NumberInput
						label='Tax Rate'
						min={0}
						max={100}
						defaultValue={40}
						stepHoldDelay={500}
						stepHoldInterval={100}
					/>
					<Button>Change Tax Rate</Button>
				</Group>
			</Center>
		</main>
	)
}
