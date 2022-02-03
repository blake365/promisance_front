import { Button, Center, Group, NumberInput, Text, Title } from '@mantine/core'
import { useForm } from '@mantine/hooks'
import Axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { empireLoaded } from '../../store/empireSlice'

export default function Farm() {
	const empire = useSelector((state) => state.empire)

	const dispatch = useDispatch()

	const form = useForm({
		initialValues: {
			empireId: empire.id,
			type: 'farm',
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

	const loadEmpireTest = async () => {
		try {
			const res = await Axios.get(`/empire/${empire.uuid}`)
			console.log(res.data)

			dispatch(empireLoaded(res.data))
		} catch (error) {
			console.log(error)
		}
	}

	const doTurns = async (values) => {
		try {
			const res = await Axios.post('/useturns', values)

			console.log(res.data)
			loadEmpireTest()
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<main>
			<Center>
				<Group direction='column' spacing='sm' align='center'>
					<Title order={1} align='center'>
						Farm
					</Title>
					<div>
						For each turn you spend farming, your farms will produce 25% more
						food
					</div>
					<form onSubmit={form.onSubmit((values) => doTurns(values))}>
						<Group direction='column' spacing='sm' align='center'>
							<NumberInput
								label='Spend how many turns farming?'
								min={0}
								defaultValue={0}
								stepHoldDelay={500}
								stepHoldInterval={100}
								max={empire.turns}
								{...form.getInputProps('turns')}
							/>
							<Button color='green' type='submit'>
								Farm
							</Button>
						</Group>
					</form>
				</Group>
			</Center>
		</main>
	)
}
