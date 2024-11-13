import { Button, Center, NumberInput, Stack, Table, Title, Text } from '@mantine/core'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from '@mantine/form'
import Axios from 'axios'
import { clearResult, setResult } from '../../store/turnResultsSlice'
import { raceArray } from '../../config/races'
import { eraArray } from '../../config/eras'
import { OneTurn, MaxButton, HalfButton } from '../utilities/maxbutton'
import { Link } from 'react-router-dom'
import { calcSizeBonus } from '../../functions/functions'
import { useState, useRef } from 'react'
import { FavoriteButton } from '../utilities/maxbutton'
import { useLoadEmpire } from '../../hooks/useLoadEmpire'
import { checkRoundStatus } from '../../functions/checkRoundStatus'
import { setRepeat } from '../../store/repeatSlice'
import { useTranslation } from 'react-i18next'

export default function Demolish()
{
	let demoNumberArray = []
	let totalDemo = 0
	let errors = {
		error: '',
	}
	const { empire } = useSelector((state) => state.empire)
	const { buildCost } = useSelector((state) => state.games.activeGame)
	const { t } = useTranslation(['turns', 'eras'])
	const [loading, setLoading] = useState(false)
	const loadEmpire = useLoadEmpire(empire.uuid)
	const dispatch = useDispatch()

	const getDemolishAmounts = (empire) =>
	{
		const size = calcSizeBonus(empire)
		const demolishCost = Math.round(((buildCost + empire.land * 0.2) * (size / 3)) / 5)

		// let demolishRate = Math.round(Math.min(Math.floor(empire.land * 0.02 + 2) * ((100 + raceArray[empire.race].mod_buildrate) / 100), 200))

		let demolishRate = Math.round(empire.land * 0.007)
		demolishRate = Math.round(((100 + raceArray[empire.race].mod_buildrate) / 100) * demolishRate)

		const canDemolish = Math.min(
			demolishRate * empire.turns, empire.land - empire.freeLand)

		return { canDemolish, demolishRate, demolishCost }
	}

	const getDropAmounts = (empire) =>
	{
		let dropRate = Math.max(Math.ceil((empire.land * 0.02 + 2) * ((100 + raceArray[empire.race].mod_buildrate) / 100) / 10), 50)

		if (empire.attacks !== 0) {
			dropRate = Math.round(dropRate / empire.attacks)
		}

		const canDrop = Math.round(Math.min(dropRate * empire.turns, empire.freeLand, Math.max(0, empire.land - 1000)))

		return { dropRate, canDrop }
	}

	const { canDemolish, demolishRate, demolishCost } = getDemolishAmounts(empire)

	const { dropRate, canDrop } = getDropAmounts(empire)

	const dropForm = useForm({
		initialValues: {
			type: 'drop',
			empireId: empire.id,
			drop: 0
		},

		validationRules: {
			drop: (value) => value <= canDrop,
		},

		errorMessages: {
			drop: 'Invalid'
		}
	})

	const form = useForm({
		initialValues: {
			empireId: empire.id,
			type: 'demolish',
			// turns: 0,
			demoPop: 0,
			demoCash: 0,
			demoCost: 0,
			demoFood: 0,
			demoTroop: 0,
			demoWiz: 0,
			demoDef: 0,
			// totalBuild: totalBuild,
		},

		validationRules: {
			// totalBuild: (value) => value < canDemolish,
			demoPop: (value) => value < min(empire.bldPop, canDemolish),
			demoCash: (value) => value < min(empire.bldCash, canDemolish),
			demoCost: (value) => value < min(empire.bldCost, canDemolish),
			demoFood: (value) => value < min(empire.bldFood, canDemolish),
			demoTroop: (value) => value < min(empire.bldTroop, canDemolish),
			demoWiz: (value) => value < min(empire.bldWiz, canDemolish),
			demoDef: (value) => value < min(empire.bldDef, canDemolish),
		},

		errorMessages: {
			demoPop: t('turns:build.error'),
			demoCash: t('turns:build.error'),
			demoCost: t('turns:build.error'),
			demoFood: t('turns:build.error'),
			demoTroop: t('turns:build.error'),
			demoWiz: t('turns:build.error'),
			demoDef: t('turns:build.error'),
		},
	})

	if (form.values['demoPop'] === undefined) {
		form.setFieldValue('demoPop', 0)
	}
	if (form.values['demoCash'] === undefined) {
		form.setFieldValue('demoCash', 0)
	}
	if (form.values['demoCost'] === undefined) {
		form.setFieldValue('demoCost', 0)
	}
	if (form.values['demoFood'] === undefined) {
		form.setFieldValue('demoFood', 0)
	}
	if (form.values['demoTroop'] === undefined) {
		form.setFieldValue('demoTroop', 0)
	}
	if (form.values['demoWiz'] === undefined) {
		form.setFieldValue('demoWiz', 0)
	}
	if (form.values['demoDef'] === undefined) {
		form.setFieldValue('demoDef', 0)
	}

	demoNumberArray = Object.values(form.values).slice(2)
	// console.log(buildNumberArray.length)

	totalDemo = demoNumberArray
		.filter(Number)
		.reduce((partialSum, a) => partialSum + a, 0)
	// console.log(totalDemo)
	// console.log(value)

	function setErrors(error)
	{
		errors.error = error
	}

	const buttonRef = useRef()
	const buttonRef2 = useRef()

	const doDemolish = async (values) =>
	{
		setLoading(true)
		try {
			const res = await Axios.post(`/demolish?gameId=${empire.game_id}`, values)
			dispatch(setRepeat({ route: `/demolish?gameId=${empire.game_id}`, body: values, color: 'orange' }))
			dispatch(setResult(res.data))
			loadEmpire()
			buttonRef.current.focus()
			form.reset()
			window.scroll({ top: 0, behavior: 'smooth' })
			setLoading(false)
		} catch (error) {
			console.log(error)
			setLoading(false)
		}
	}

	const doDrop = async (values) =>
	{
		setLoading(true)
		try {
			const res = await Axios.post(`/drop?gameId=${empire.game_id}`, values)
			// dispatch(setResult(res.data))
			// console.log(res.data)
			dispatch(setResult(res.data))
			loadEmpire()
			buttonRef2.current.focus()
			form.reset()
			window.scroll({ top: 0, behavior: 'smooth' })
			setLoading(false)
		} catch (error) {
			console.log(error)
			setLoading(false)
		}
	}

	const roundStatus = checkRoundStatus()
	const eraName = eraArray[empire.era].name.toLowerCase()

	const buildings = ['demoPop', 'demoCash', 'demoCost', 'demoTroop', 'demoWiz', 'demoFood', 'demoDef']

	return (
		<main>
			<Center mb={10}>
				<Stack spacing='sm' align='center'>
					<Title order={1} align='center'>
						{t('turns:build.demoTitle')} <FavoriteButton empire={empire} title='Demolish' />
					</Title>
					<Text align='center'>
						{t('turns:build.demoDescription', { cost: demolishCost.toLocaleString() })}
					</Text>
					<Text align='center'>
						{t('turns:build.demoRate', { rate: demolishRate.toLocaleString() })}
					</Text>
					<Text align='center'>
						{t('turns:build.demoCan', { can: canDemolish.toLocaleString() })}
					</Text>

					<form
						onSubmit={
							totalDemo <= canDemolish
								? form.onSubmit((values) =>
								{
									// console.log(values)
									dispatch(clearResult)
									doDemolish(values)
								})
								: setErrors(t('turns:build.demoError'))
						}
					>
						<Stack spacing='sm' align='center'>
							<Table verticalSpacing='xs' striped>
								<thead>
									<tr>
										<th>{t('turns:build.structure')}</th>
										<th>{t('turns:build.owned')}</th>
										{/* <th>Can Demolish</th> */}
										<th>{t('turns:build.demoTitle')}</th>
									</tr>
								</thead>
								<tbody>
									{buildings.map((building, index) =>
									{
										const empireBuilding = building.replace('demo', 'bld')
										let buildingName = empireBuilding.toLowerCase()
										if (building === 'demoTroop') {
											buildingName = 'bldtrp'
										}

										return <tr className={index + 1} key={building}>
											<td>
												{t(`eras:eras.${eraName}.${buildingName}`)}
											</td>
											<td>
												{empire[empireBuilding]} (
												{Math.round((empire[empireBuilding] / empire.land) * 100)}%)
											</td>
											{/* <td>{canBuild.toLocaleString()}</td> */}
											<td>
												<NumberInput
													hideControls
													min={0}
													defaultValue={0}
													max={Math.min(canDemolish, empire[empireBuilding])}
													{...form.getInputProps(building)}
													rightSection={
														<div
															style={{
																display: "flex",
																backgroundColor: "transparent",
															}}
														>
															<OneTurn
																fieldName={building}
																value={Math.min(demolishRate, empire[empireBuilding])}
																max={Math.min(canDemolish, empire[empireBuilding])}
																formName={form}
																currentValue={form.values[building]}
															/>

															<HalfButton
																fieldName={building}
																maxValue={Math.min(canDemolish, empire[empireBuilding])}
																formName={form}
															/>
															<MaxButton
																fieldName={building}
																maxValue={Math.min(canDemolish, empire[empireBuilding])}
																formName={form}
															/>
														</div>
													}
													rightSectionWidth={70}
													parser={(value) =>
														value
															.split(" ")
															.join("")
															.replace(/\$\s?|(,*)|\s/g, "")
													}
													formatter={(value) =>
													{
														// console.log(typeof value)
														return !Number.isNaN(Number.parseFloat(value))
															? `${value}`.replace(
																/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
																",",
															)
															: "";
													}}
												/>
											</td>
										</tr>
									})}
									<tr>
										<td>{t('turns:build.empty')}</td>
										<td colSpan={3}>{empire.freeLand.toLocaleString()} (
											{Math.round((empire.freeLand / empire.land) * 100)}%)</td>
									</tr>
								</tbody>
							</Table>

							<Button type='submit' color='orange' disabled={errors?.error || roundStatus} loading={loading} ref={buttonRef}>
								{t('turns:build.submitDemo')}
							</Button>
						</Stack>
					</form>
					<Button component={Link} to='/app/build' compact variant='outline' color='blue' sx={{ marginTop: '1rem' }}>
						{t('turns:build.buildButton')}
					</Button>
					<form onSubmit={
						dropForm.onSubmit((values) =>
						{
							// console.log(values)
							dispatch(clearResult)
							doDrop(values)
						})
					}>
						<Stack spacing='sm' align='center' sx={{ marginTop: '2rem' }}>
							<Text align='center'>{t('turns:build.dropLand', { canDrop: canDrop.toLocaleString(), dropRate: dropRate.toLocaleString() })}</Text>
							<Table>
								<thead>
									<tr>
										<th> </th>
										<th>{t('turns:build.owned')}</th>
										<th>{t('turns:build.canDrop')}</th>
										<th>{t('turns:build.drop')}</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>{t('turns:build.empty')}</td>
										<td>{empire.freeLand.toLocaleString()}</td>
										<td>{canDrop.toLocaleString()}</td>
										<td>
											<NumberInput
												hideControls
												type='number'
												min={0}
												defaultValue={0}
												max={empire.freeLand}
												{...dropForm.getInputProps('drop')}
												parser={(value) =>
													value.split(' ').join('').replace(/\$\s?|(,*)|\s/g, '')
												}
												formatter={(value) =>
												{
													// console.log(typeof value)
													return !Number.isNaN(Number.parseFloat(value))
														? `${value}`.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
														: ''
												}
												}
											/>
										</td>
									</tr>
								</tbody>
							</Table>
							<Button type='submit' color='red' disabled={roundStatus} loading={loading} ref={buttonRef2}>
								{t('turns:build.dropButton')}
							</Button>
						</Stack>
					</form>
				</Stack>
			</Center>
		</main>
	)
}
