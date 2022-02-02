import { Center, Group, Title, NumberInput, Button } from '@mantine/core'
import { useForm } from '@mantine/hooks'
import Axios from 'axios'

export default function Explore() {
	const empire = {
		id: 2,
		turns: 200,
	}

	const form = useForm({
		initialValues: {
			empireId: empire.id,
			type: 'explore',
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
			<Center>
				<Group direction='column' spacing='sm' align='center'>
					<Title order={1} align='center'>
						Explore
					</Title>
					<div>
						For each turn you spend exploring, your empire will grow by XX acres
					</div>
					<form onSubmit={form.onSubmit((values) => doTurns(values))}>
						<Group direction='column' spacing='sm' align='center'>
							<NumberInput
								label='Spend how many turns exploring?'
								min={0}
								defaultValue={0}
								stepHoldDelay={500}
								stepHoldInterval={100}
								// max={availableTurns}
								{...form.getInputProps('turns')}
							/>
							<Button color='grape' type='submit'>
								Explore
							</Button>
						</Group>
					</form>
				</Group>
			</Center>
		</main>
	)
}
