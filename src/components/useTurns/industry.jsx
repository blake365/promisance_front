import {
	Button,
	Center,
	Divider,
	Group,
	NumberInput,
	Text,
	Title,
} from '@mantine/core'
import { useForm } from '@mantine/hooks'
import Axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { empireLoaded } from '../../store/empireSlice'

export default function Industry() {
	const empire = useSelector((state) => state.empire)

	const dispatch = useDispatch()

	const form = useForm({
		initialValues: {
			empireId: empire.id,
			type: 'industry',
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
			<Center mb={10}>
				<Group direction='column' spacing='sm' align='center'>
					<Title order={1} align='center'>
						Industry
					</Title>
					<div>
						For each turn you spend focusing on industry, your factories will
						make 25% more troops.
					</div>
					<form onSubmit={form.onSubmit((values) => doTurns(values))}>
						<Group direction='column' spacing='sm' align='center'>
							<NumberInput
								label='Spend how many turns making troops?'
								min={0}
								defaultValue={0}
								stepHoldDelay={500}
								stepHoldInterval={100}
								max={empire.turns}
								{...form.getInputProps('turns')}
							/>
							<Button color='red' type='submit'>
								Make Troops
							</Button>
						</Group>
					</form>
				</Group>
			</Center>
			<Divider size='lg' />
			<Center mt={5}>
				<Group direction='column' spacing='sm' align='center'>
					<h2>Industry Settings</h2>
					<Text size='sm'>
						Input the percentage of production to dedicate to each type of unit.{' '}
					</Text>
					<NumberInput
						label='Infantry'
						min={0}
						max={100}
						defaultValue={empire.indArmy}
						stepHoldDelay={500}
						stepHoldInterval={100}
					/>
					<NumberInput
						label='Tanks'
						min={0}
						max={100}
						defaultValue={empire.indLnd}
						stepHoldDelay={500}
						stepHoldInterval={100}
					/>
					<NumberInput
						label='Jets'
						min={0}
						max={100}
						defaultValue={empire.indFly}
						stepHoldDelay={500}
						stepHoldInterval={100}
					/>
					<NumberInput
						label='Battleships'
						min={0}
						max={100}
						defaultValue={empire.indSea}
						stepHoldDelay={500}
						stepHoldInterval={100}
					/>
					<Button color='red'>Update Industry</Button>
				</Group>
			</Center>
		</main>
	)
}
