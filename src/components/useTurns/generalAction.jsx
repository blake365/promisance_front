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
import { useDispatch, useSelector } from 'react-redux'
import { empireLoaded } from '../../store/empireSlice'
import { clearResult, setResult } from '../../store/turnResultsSlice'
import { FavoriteButton } from '../utilities/maxbutton'
import { ROUND_END, ROUND_START } from '../../config/config'
import { useState } from 'react'
import { useTour } from '@reactour/tour'

export default function GeneralAction(props)
{
	// const empire = useSelector((state) => state.empire)
	const { time } = useSelector((state) => state.time)
	const dispatch = useDispatch()
	const [loading, setLoading] = useState(false)

	const { setCurrentStep } = useTour()

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
		setLoading(true)
		try {
			const res = await Axios.post('/useturns', values)
			dispatch(setResult(res.data))
			loadEmpireTest()
			form.reset()
			window.scroll({ top: 0, behavior: 'smooth' })
			setLoading(false)
			if (values.type === 'explore') {
				setCurrentStep(2)
			}
		} catch (error) {
			console.log(error)
			setLoading(false)
		}
	}

	let flavorText = `For each turn you spend ${props.flavor}, your empire produces 25%
						more ${props.item}.`

	if (props.explore) {
		flavorText = `For each turn you spend ${props.flavor}, your empire will grow by ${props.explore} ${props.item}.`
	}
	if (props.type === 'heal') {
		flavorText = `Using turns in any way will heal your empire but for each turn you spend ${props.flavor}, your empire will heal an additional percentage point. Your resource production will be reduced to 75% of its baseline value.`
	}

	let roundStatus = false
	let upcoming = ROUND_START - time
	let remaining = ROUND_END - time

	if (upcoming > 0) {
		roundStatus = true
	} else if (remaining < 0) {
		roundStatus = true
	} else {
		roundStatus = false
	}

	return (
		<section >
			<Center>
				<Stack spacing='sm' align='center' maw={650}>
					<img src={props.imglink} height='200' style={{ maxHeight: '200px', maxWidth: '100%', borderRadius: '10px' }} alt={props.title} />
					<Title order={1} align='center' sx={{ display: 'inline-block', width: '200px' }}>
						{props.title} <FavoriteButton title={props.title} empire={props.empire} />
					</Title>
					<Text align='center'>
						{flavorText}
					</Text>
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
							<Button color={props.color} type='submit' disabled={roundStatus} loading={loading}>
								{props.title}
							</Button>
						</Stack>
					</form>
				</Stack>
			</Center>
		</section>
	)
}
