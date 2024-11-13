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
import { clearResult, setResult } from '../../store/turnResultsSlice'
import { FavoriteButton } from '../utilities/maxbutton'
import { useState, useRef, useEffect } from 'react'
import { useTour } from '@reactour/tour'
import { checkRoundStatus } from '../../functions/checkRoundStatus'
import { useLoadEmpire } from '../../hooks/useLoadEmpire'
import { setRepeat } from '../../store/repeatSlice'
import { useTranslation } from 'react-i18next'
export default function GeneralAction(props)
{
	// const empire = useSelector((state) => state.empire)
	const dispatch = useDispatch()
	const [loading, setLoading] = useState(false)
	const buttonRef = useRef()
	const { setCurrentStep, meta, currentStep } = useTour()
	const { t } = useTranslation('turns')
	let turns = 0
	let healthDeduction = 100

	useEffect(() =>
	{
		if (props.type === 'heal') {
			healthDeduction = Math.max((props.empire.tax - 25) / 2, 0)
			turns = (100 - props.empire.health - healthDeduction) / 2;
			if (turns < 0) {
				turns = 0
			}
		}
		form.setValues({ turns: turns })
	}, [props.type, props.empire.health]);

	const form = useForm({
		initialValues: {
			empireId: props.empire.id,
			type: props.type,
			turns: turns,
			condensed: true,
		},

		validationRules: {
			turns: (value) => value <= props.empire.turns && value > 0,
		},

		errorMessages: {
			turns: t('turns:general.error'),
		},
	})

	const loadEmpire = useLoadEmpire(props.empire.uuid)

	const doTurns = async (values) =>
	{
		setLoading(true)
		try {
			const res = await Axios.post(`/useturns?gameId=${props.empire.game_id}`, values)
			dispatch(setRepeat({ route: `/useturns?gameId=${props.empire.game_id}`, body: values, color: props.color }))
			dispatch(setResult(res.data))
			loadEmpire()
			buttonRef.current.focus()
			form.reset()
			window.scroll({ top: 0, behavior: 'smooth' })
			setLoading(false)
			// console.log(currentStep)
			// console.log(values.type)
			if (meta) {
				if (values.type === "explore" && meta !== "new player tutorial") {
					setCurrentStep(3);
				} else if (values.type === "explore") {
					// console.log("new player explore tutorial trigger");
					setCurrentStep(2);
				}
				if (
					values.type === "farm" &&
					(meta.includes("Gremlin") || meta.includes("Hobbit"))
				) {
					// console.log("farm tutorial trigger");
					setCurrentStep(7);
				}

				if (values.type === "cash" &&
					(meta.includes("Gnome") || meta.includes("Minotaur") ||
						meta.includes("Vampire"))
				) {
					// console.log("cash tutorial trigger");
					setCurrentStep(7);
				}

				if (
					values.type === "industry" &&
					(meta.includes("Dwarf") ||
						meta.includes("Orc") ||
						meta.includes("Goblin") ||
						meta.includes("Ghoul"))
				) {
					setCurrentStep(7);
				}

				if (
					values.type === "meditate" &&
					(meta.includes("Elf") ||
						meta.includes("Drow") ||
						meta.includes("Pixie"))
				) {
					setCurrentStep(7);
				}
			}
			// console.log(values.type)
			// console.log(currentStep)
		} catch (error) {
			console.log(error)
			setLoading(false)
		}
	}

	let flavorText = t('turns:general.flavorText', { flavor: props.flavor, item: props.item })

	if (props.explore) {
		flavorText = t('turns:explore.flavorText', { flavor: props.flavor, explore: props.explore, item: props.item })
	}
	if (props.type === 'heal') {
		flavorText = t('turns:heal.flavorText', { flavor: props.flavor })
	}

	const roundStatus = checkRoundStatus()

	return (
		<section>
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
								label={t('turns:general.spend', { flavor: props.flavor })}
								min={0}
								defaultValue={0}
								stepHoldDelay={500}
								stepHoldInterval={100}
								max={props.empire.turns}
								{...form.getInputProps('turns')}
							/>
							<Checkbox
								label={t('turns:general.condensed')}
								color={props.color}
								{...form.getInputProps('condensed', { type: 'checkbox' })}
							/>
							<Button color={props.color} type='submit' disabled={roundStatus} loading={loading} ref={buttonRef}>
								{props.title}
							</Button>
						</Stack>
					</form>
				</Stack>
			</Center>
		</section>
	)
}
