import
{
	Center,
	Stack,
	Title,
	NumberInput,
	Button,
	Checkbox,
	Text,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import Axios from 'axios'
import { useDispatch } from 'react-redux'
import { empireLoaded } from '../../store/empireSlice'
import { clearResult, setResult } from '../../store/turnResultsSlice'

export default function GeneralAction(props)
{
	// const empire = useSelector((state) => state.empire)

	const dispatch = useDispatch()

	const form = useForm({
		initialValues: {
			empireId: props.empire.id,
			type: props.type,
			turns: 0,
			condensed: true,
		},

		validationRules: {
			turns: (value) => value <= props.empire.turns && value > 0,
		},

		errorMessages: {
			turns: 'Invalid number of turns',
		},
	})

	const loadEmpireTest = async () =>
	{
		try {
			const res = await Axios.get(`/empire/${props.empire.uuid}`)
			// console.log(res.data)
			dispatch(empireLoaded(res.data))
		} catch (error) {
			console.log(error)
		}
	}

	const doTurns = async (values) =>
	{
		try {
			const res = await Axios.post('/useturns', values)
			dispatch(setResult(res.data))
			loadEmpireTest()
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<section>
			<Center>
				<Stack spacing='sm' align='center'>
					<Title order={1} align='center'>
						{props.title}
					</Title>
					{props.explore ? (<Text>
						For each turn you spend {props.flavor}, your empire will grow by {props.explore} {props.item}.
					</Text>) : (<Text>
						For each turn you spend {props.flavor}, your empire produces 25%
						more {props.item}.
					</Text>)}
					<form onSubmit={form.onSubmit((values) =>
					{
						dispatch(clearResult)
						doTurns(values)
					})}>
						<Stack spacing='sm' align='center'>
							<NumberInput
								label={`Spend how many turns ${props.flavor}?`}
								min={0}
								defaultValue={0}
								stepHoldDelay={500}
								stepHoldInterval={100}
								max={props.empire.turns}
								{...form.getInputProps('turns')}
							/>
							<Checkbox
								label='Condensed'
								color={props.color}
								{...form.getInputProps('condensed', { type: 'checkbox' })}
							/>
							<Button color={props.color} type='submit'>
								{props.title}
							</Button>
						</Stack>
					</form>
				</Stack>
			</Center>
		</section>
	)
}
