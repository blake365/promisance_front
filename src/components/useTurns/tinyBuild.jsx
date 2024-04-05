import { Button, NumberInput, Group, Text } from '@mantine/core'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from '@mantine/form'
import Axios from 'axios'
import { clearResult, setResult } from '../../store/turnResultsSlice'
import { raceArray } from '../../config/races'
import { HalfButton, MaxButton, OneTurn } from '../utilities/maxbutton'
import { calcSizeBonus } from '../../functions/functions'
import { useState, useRef } from 'react'
import { useLoadEmpire } from '../../hooks/useLoadEmpire'
import { checkRoundStatus } from '../../functions/checkRoundStatus'
import { setRepeat } from '../../store/repeatSlice'
import { eraArray } from '../../config/eras'

export default function TinyBuild({ building, show })
{
	// console.log(building)
	const { empire } = useSelector((state) => state.empire)
	const { buildCost: baseBuildCost } = useSelector((state) => state.games.activeGame)

	const buttonRef = useRef()
	if (building === 'bldTrp') {
		building = 'bldTroop'
	}

	let buildNumberArray = []
	let totalBuild = 0
	let errors = {
		error: '',
	}
	// const { empire } = useSelector((state) => state.empire)
	const [loading, setLoading] = useState(false)

	const dispatch = useDispatch()
	const loadEmpire = useLoadEmpire(empire.uuid)

	const getBuildAmounts = (empire) =>
	{
		let size = calcSizeBonus(empire)
		// console.log(size)
		let buildCost = Math.round((baseBuildCost + empire.land * 0.2) * (size / 3))

		let buildRate = Math.round(empire.land * 0.015 + 4)
		buildRate = Math.round(
			((100 + raceArray[empire.race].mod_buildrate) / 100) * buildRate
		)

		let canBuild = Math.min(
			Math.floor(empire.cash / buildCost),
			buildRate * empire.turns,
			empire.freeLand
		)

		return { canBuild, buildRate, buildCost }
	}

	const { canBuild, buildRate } = getBuildAmounts(empire)

	const form = useForm({
		initialValues: {
			empireId: empire.id,
			type: 'build',
			// turns: 0,
			bldPop: 0,
			bldCash: 0,
			bldCost: 0,
			bldFood: 0,
			bldTroop: 0,
			bldWiz: 0,
			bldDef: 0,
			// totalBuild: totalBuild,
		},

		validationRules: {
			// totalBuild: (value) => value < canBuild,
			bldPop: (value) => value <= canBuild,
			bldCash: (value) => value <= canBuild,
			bldCost: (value) => value <= canBuild,
			bldFood: (value) => value <= canBuild,
			bldTroop: (value) => value <= canBuild,
			bldWiz: (value) => value <= canBuild,
			bldDef: (value) => value <= canBuild,
		},

		errorMessages: {
			bldPop: 'Invalid number of buildings',
			bldCash: 'Invalid number of buildings',
			bldCost: 'Invalid number of buildings',
			bldFood: 'Invalid number of buildings',
			bldTroop: 'Invalid number of buildings',
			bldWiz: 'Invalid number of buildings',
			bldDef: 'Invalid number of buildings',
		},
	})

	if (form.values['bldPop'] === undefined) {
		form.setFieldValue('bldPop', 0)
	}
	if (form.values['bldCash'] === undefined) {
		form.setFieldValue('bldCash', 0)
	}
	if (form.values['bldCost'] === undefined) {
		form.setFieldValue('bldCost', 0)
	}
	if (form.values['bldFood'] === undefined) {
		form.setFieldValue('bldFood', 0)
	}
	if (form.values['bldTroop'] === undefined) {
		form.setFieldValue('bldTroop', 0)
	}
	if (form.values['bldWiz'] === undefined) {
		form.setFieldValue('bldWiz', 0)
	}
	if (form.values['bldDef'] === undefined) {
		form.setFieldValue('bldDef', 0)
	}

	buildNumberArray = Object.values(form.values).slice(2)
	// console.log(buildNumberArray.length)

	totalBuild = buildNumberArray
		.filter(Number)
		.reduce((partialSum, a) => partialSum + a, 0)
	// console.log(totalBuild)
	// console.log(value)

	function setErrors(error)
	{
		errors.error = error
	}

	const doBuild = async (values) =>
	{
		setLoading(true)
		try {
			// console.log(values)
			const res = await Axios.post(`/build?gameId=${empire.game_id}`, values)
			dispatch(setRepeat({ route: `/build?gameId=${empire.game_id}`, body: values, color: 'blue' }))
			// console.log(res.data)
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

	// console.log(show)

	let bldAbbrev = building.toLowerCase()
	if (bldAbbrev === 'bldtroop') {
		bldAbbrev = 'bldtrp'
	}
	const bldName = eraArray[empire.era][bldAbbrev]

	return (
		<form
			onSubmit={
				totalBuild <= canBuild
					? form.onSubmit((values) =>
					{
						dispatch(clearResult)
						doBuild(values)
					})
					: setErrors("Can't build that many buildings")
			}
		>
			<Group spacing='sm' position='right'>
				{show ? <Text>{bldName}</Text> : null}
				<NumberInput
					hideControls
					maw={180}
					min={0}
					defaultValue={0}
					max={canBuild}
					{...form.getInputProps(building)}
					rightSection={<div style={{ display: 'flex', backgroundColor: 'transparent' }}>
						<OneTurn fieldName={building} value={buildRate} formName={form} currentValue={form.values[building]} />
						<HalfButton fieldName={building} maxValue={canBuild} formName={form} />
						<MaxButton fieldName={building} maxValue={canBuild} formName={form} />
					</div>}
					rightSectionWidth={70}
					parser={(value) =>
						value.split(' ').join('').replace(/\$\s?|(,*)|\s/g, '')
					}
					formatter={(value) =>
					{
						// console.log(typeof value)
						return !Number.isNaN(parseFloat(value))
							? `${value}`.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
							: ''
					}
					}
				/>
				<Button type='submit' disabled={errors.error || roundStatus} loading={loading} ref={buttonRef}>
					Build
				</Button>
			</Group>
		</form>
	)
}
