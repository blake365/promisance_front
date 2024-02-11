import
{
	Button,
	Center,
	Group, NumberInput
} from '@mantine/core'
import { useForm } from '@mantine/form'
import Axios from 'axios'
import { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { checkRoundStatus } from '../../functions/checkRoundStatus'
import { useLoadEmpire } from '../../hooks/useLoadEmpire'
import { setRepeat } from '../../store/repeatSlice'
import { clearResult, setResult } from '../../store/turnResultsSlice'
import { FavoriteButton } from '../utilities/maxbutton'

export default function TinyAction(props)
{
	// const empire = useSelector((state) => state.empire)
	const dispatch = useDispatch()
	const [loading, setLoading] = useState(false)
	const buttonRef = useRef()

	const form = useForm({
		initialValues: {
			empireId: props.empire.id,
			type: props.type,
			turns: props.type === 'heal' ? (100 - props.empire.health) / 2 : 0,
			condensed: true,
		},

		validationRules: {
			turns: (value) => value <= props.empire.turns && value > 0,
		},

		errorMessages: {
			turns: 'Invalid number of turns',
		},
	})

	const loadEmpire = useLoadEmpire(props.empire.uuid)

	const doTurns = async (values) =>
	{
		setLoading(true)
		try {
			const res = await Axios.post('/useturns', values)
			dispatch(setRepeat({ route: '/useturns', body: values, color: props.color }))
			dispatch(setResult(res.data))
			loadEmpire()
			buttonRef.current.focus()
			form.reset()
			// window.scroll({ top: 0, behavior: 'smooth' })
			setLoading(false)
		} catch (error) {
			console.log(error)
			setLoading(false)
		}
	}

	const roundStatus = checkRoundStatus()

	return (
		<section >
			<Center>
				<form onSubmit={form.onSubmit((values) =>
				{
					dispatch(clearResult)
					doTurns(values)
				})}>
					<Group spacing='xs'>
						{/* <FavoriteButton title={props.title} empire={props.empire} /> */}
						<NumberInput
							// label={`Spend how many turns ${props.flavor}?`}
							// description={flavorText}
							min={0}
							defaultValue={0}
							stepHoldDelay={500}
							stepHoldInterval={100}
							max={props.empire.turns}
							{...form.getInputProps('turns')}
							maw={100}
						/>
						<Button color={props.color} type='submit' disabled={roundStatus} loading={loading} ref={buttonRef}>
							{props.title}
						</Button>
					</Group>
				</form>
			</Center>
		</section>
	)
}
