import { Button, Center, NumberInput, Stack, Table, Title, Text } from '@mantine/core'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from '@mantine/form'
import Axios from 'axios'
import { clearResult, setResult } from '../../store/turnResultsSlice'
import { raceArray } from '../../config/races'
import { eraArray } from '../../config/eras'
import { OneTurn, MaxButton, HalfButton } from '../utilities/maxbutton'
import { BUILD_COST } from '../../config/config'
import { Link } from 'react-router-dom'
import { calcSizeBonus } from '../../functions/functions'
import { useState, useRef } from 'react'
import { FavoriteButton } from '../utilities/maxbutton'
import { useLoadEmpire } from '../../hooks/useLoadEmpire'
import { checkRoundStatus } from '../../functions/checkRoundStatus'

export default function Demolish()
{
	let demoNumberArray = []
	let totalDemo = 0
	let errors = {
		error: '',
	}
	const { empire } = useSelector((state) => state.empire)
	const [loading, setLoading] = useState(false)
	const loadEmpire = useLoadEmpire(empire.uuid)
	const dispatch = useDispatch()

	const getDemolishAmounts = (empire) =>
	{
		let size = calcSizeBonus(empire)
		let demolishCost = Math.round(((BUILD_COST + empire.land * 0.2) * (size / 3)) / 5)

		let demolishRate = Math.round(Math.min(Math.floor(empire.land * 0.02 + 2) * ((100 + raceArray[empire.race].mod_buildrate) / 100), 200))

		let canDemolish = Math.min(
			demolishRate * empire.turns, empire.land - empire.freeLand)

		return { canDemolish, demolishRate, demolishCost }
	}

	const getDropAmounts = (empire) =>
	{
		let dropRate = Math.max(Math.ceil((empire.land * 0.02 + 2) * ((100 + raceArray[empire.race].mod_buildrate) / 100) / 10), 50)

		if (empire.attacks !== 0) {
			dropRate = Math.round(dropRate / empire.attacks)
		}

		let canDrop = Math.round(Math.min(dropRate * empire.turns, empire.freeLand, Math.max(0, empire.land - 1000)))

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
			// totalBuild: (value) => value < canBuild,
			demoPop: (value) => value < min(empire.bldPop, canDemolish),
			demoCash: (value) => value < min(empire.bldCash, canDemolish),
			demoCost: (value) => value < min(empire.bldCost, canDemolish),
			demoFood: (value) => value < min(empire.bldFood, canDemolish),
			demoTroop: (value) => value < min(empire.bldTroop, canDemolish),
			demoWiz: (value) => value < min(empire.bldWiz, canDemolish),
			demoDef: (value) => value < min(empire.bldDef, canDemolish),
		},

		errorMessages: {
			demoPop: 'Invalid number of buildings',
			demoCash: 'Invalid number of buildings',
			demoCost: 'Invalid number of buildings',
			demoFood: 'Invalid number of buildings',
			demoTroop: 'Invalid number of buildings',
			demoWiz: 'Invalid number of buildings',
			demoDef: 'Invalid number of buildings',
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

	const doDemolish = async (values) =>
	{
		setLoading(true)
		try {
			const res = await Axios.post('/demolish', values)
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
			const res = await Axios.post('/drop', values)
			// dispatch(setResult(res.data))
			// console.log(res.data)
			dispatch(setResult(res.data))
			loadEmpireTest()
			form.reset()
			window.scroll({ top: 0, behavior: 'smooth' })
			setLoading(false)
		} catch (error) {
			console.log(error)
			setLoading(false)
		}
	}

	const roundStatus = checkRoundStatus()

	return (
		<main>
			<Center mb={10}>
				<Stack spacing='sm' align='center'>
					<Title order={1} align='center'>
						Demolish <FavoriteButton empire={empire} title='Demolish' />
					</Title>
					<Text align='center'>
						Each structure demolished frees up one acre of land and
						${demolishCost.toLocaleString()} will be salvaged.
					</Text>
					<Text align='center'>
						You can demolish {demolishRate.toLocaleString()} structures per turn.
					</Text>
					<Text align='center'>
						With your resources, you can demolish {canDemolish.toLocaleString()}{' '}
						structures.
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
								: setErrors("Can't demolish that many buildings")
						}
					>
						<Stack spacing='sm' align='center'>
							<Table verticalSpacing='xs' striped>
								<thead>
									<tr>
										<th>Structure</th>
										<th>Owned</th>
										{/* <th>Can Demolish</th> */}
										<th>Demolish</th>

									</tr>
								</thead>
								<tbody>
									<tr>
										<td>{eraArray[empire.era].bldpop}</td>
										<td>
											{empire.bldPop} (
											{Math.round((empire.bldPop / empire.land) * 100)}%)
										</td>
										{/* <td>{Math.min(canDemolish, empire.bldPop).toLocaleString()}</td> */}
										<td>
											<NumberInput
												hideControls
												min={0}
												defaultValue={0}
												max={Math.min(canDemolish, empire.bldPop)}
												{...form.getInputProps('demoPop')}
												rightSection={<div style={{ display: 'flex' }}>
													<OneTurn fieldName='demoPop' value={Math.min(demolishRate, empire.bldPop)} formName={form} />
													<HalfButton fieldName='demoPop' maxValue={Math.min(canDemolish, empire.bldPop)} formName={form} />
													<MaxButton fieldName='demoPop' maxValue={Math.min(canDemolish, empire.bldPop)} formName={form} />
												</div>}
												rightSectionWidth={70} parser={(value) =>
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
										</td>

									</tr>
									<tr>
										<td>{eraArray[empire.era].bldcash}</td>
										<td>
											{empire.bldCash} (
											{Math.round((empire.bldCash / empire.land) * 100)}%)
										</td>
										{/* <td>{Math.min(canDemolish, empire.bldCash).toLocaleString()}</td> */}
										<td>
											<NumberInput
												hideControls
												min={0}
												defaultValue={0}
												max={Math.min(canDemolish, empire.bldCash)}
												{...form.getInputProps('demoCash')}
												rightSection={<div style={{ display: 'flex' }}>
													<OneTurn fieldName='demoCash' value={Math.min(demolishRate, empire.bldCash)} formName={form} />
													<HalfButton fieldName='demoCash' maxValue={Math.min(canDemolish, empire.bldCash)} formName={form} />
													<MaxButton fieldName='demoCash' maxValue={Math.min(canDemolish, empire.bldCash)} formName={form} />
												</div>}
												rightSectionWidth={70} parser={(value) =>
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
										</td>

									</tr>
									<tr>
										<td>{eraArray[empire.era].bldtrp}</td>
										<td>
											{empire.bldTroop} (
											{Math.round((empire.bldTroop / empire.land) * 100)}%)
										</td>
										{/* <td>{Math.min(canDemolish, empire.bldTroop).toLocaleString()}</td> */}
										<td>
											<NumberInput
												hideControls
												min={0}
												defaultValue={0}
												max={Math.min(canDemolish, empire.bldTroop)}
												{...form.getInputProps('demoTroop')}
												rightSection={<div style={{ display: 'flex' }}>
													<OneTurn fieldName='demoTroop' value={Math.min(demolishRate, empire.bldTroop)} formName={form} />
													<HalfButton fieldName='demoTroop' maxValue={Math.min(canDemolish, empire.bldTroop)} formName={form} />
													<MaxButton fieldName='demoTroop' maxValue={Math.min(canDemolish, empire.bldTroop)} formName={form} />
												</div>}
												rightSectionWidth={70} parser={(value) =>
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
										</td>

									</tr>
									<tr>
										<td>{eraArray[empire.era].bldcost}</td>
										<td>
											{empire.bldCost} (
											{Math.round((empire.bldCost / empire.land) * 100)}%)
										</td>
										{/* <td>{Math.min(canDemolish, empire.bldCost).toLocaleString()}</td> */}
										<td>
											<NumberInput
												hideControls
												min={0}
												defaultValue={0}
												max={Math.min(canDemolish, empire.bldCost)}
												{...form.getInputProps('demoCost')}
												rightSection={<div style={{ display: 'flex' }}>
													<OneTurn fieldName='demoCost' value={Math.min(demolishRate, empire.bldCost)} formName={form} />
													<HalfButton fieldName='demoCost' maxValue={Math.min(canDemolish, empire.bldCost)} formName={form} />
													<MaxButton fieldName='demoCost' maxValue={Math.min(canDemolish, empire.bldCost)} formName={form} />
												</div>}
												rightSectionWidth={70} parser={(value) =>
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
										</td>

									</tr>
									<tr>
										<td>{eraArray[empire.era].bldwiz}</td>
										<td>
											{empire.bldWiz} (
											{Math.round((empire.bldWiz / empire.land) * 100)}%)
										</td>
										{/* <td>{Math.min(canDemolish, empire.bldWiz).toLocaleString()}</td> */}
										<td>
											<NumberInput
												hideControls
												min={0}
												defaultValue={0}
												max={Math.min(canDemolish, empire.bldWiz)}
												{...form.getInputProps('demoWiz')}
												rightSection={<div style={{ display: 'flex' }}>
													<OneTurn fieldName='demoWiz' value={Math.min(demolishRate, empire.bldWiz)} formName={form} />
													<HalfButton fieldName='demoWiz' maxValue={Math.min(canDemolish, empire.bldWiz)} formName={form} />
													<MaxButton fieldName='demoWiz' maxValue={Math.min(canDemolish, empire.bldWiz)} formName={form} />
												</div>}
												rightSectionWidth={70} parser={(value) =>
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
										</td>

									</tr>
									<tr>
										<td>{eraArray[empire.era].bldfood}</td>
										<td>
											{empire.bldFood} (
											{Math.round((empire.bldFood / empire.land) * 100)}%)
										</td>
										{/* <td>{Math.min(canDemolish, empire.bldFood).toLocaleString()}</td> */}
										<td>
											<NumberInput
												hideControls
												min={0}
												defaultValue={0}
												max={Math.min(canDemolish, empire.bldFood)}
												{...form.getInputProps('demoFood')}
												rightSection={<div style={{ display: 'flex' }}>
													<OneTurn fieldName='demoFood' value={Math.min(demolishRate, empire.bldFood)} formName={form} />
													<HalfButton fieldName='demoFood' maxValue={Math.min(canDemolish, empire.bldFood)} formName={form} />
													<MaxButton fieldName='demoFood' maxValue={Math.min(canDemolish, empire.bldFood)} formName={form} />
												</div>}
												rightSectionWidth={70} parser={(value) =>
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
										</td>

									</tr>
									<tr>
										<td>{eraArray[empire.era].blddef}</td>
										<td>
											{empire.bldDef} (
											{Math.round((empire.bldDef / empire.land) * 100)}%)
										</td>
										{/* <td>{Math.min(canDemolish, empire.bldDef).toLocaleString()}</td> */}
										<td>
											<NumberInput
												hideControls
												min={0}
												defaultValue={0}
												max={Math.min(canDemolish, empire.bldDef)}
												{...form.getInputProps('demoDef')}
												rightSection={<div style={{ display: 'flex' }}>
													<OneTurn fieldName='demoDef' value={Math.min(demolishRate, empire.bldDef)} formName={form} />
													<HalfButton fieldName='demoDef' maxValue={Math.min(canDemolish, empire.bldDef)} formName={form} />
													<MaxButton fieldName='demoDef' maxValue={Math.min(canDemolish, empire.bldDef)} formName={form} />
												</div>}
												rightSectionWidth={70} parser={(value) =>
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
										</td>

									</tr>
									<tr>
										<td>Unused Land</td>
										<td colSpan={3}>{empire.freeLand.toLocaleString()} (
											{Math.round((empire.freeLand / empire.land) * 100)}%)</td>
									</tr>
								</tbody>
							</Table>

							<Button type='submit' color='orange' disabled={errors?.error || roundStatus} loading={loading} ref={buttonRef}>
								Begin Demolition
							</Button>
						</Stack>
					</form>
					<Button component={Link} to='/app/build' compact variant='outline' color='blue' sx={{ marginTop: '1rem' }}>Build Buildings</Button>
					<form onSubmit={
						dropForm.onSubmit((values) =>
						{
							// console.log(values)
							dispatch(clearResult)
							doDrop(values)
						})

					}>
						<Stack spacing='sm' align='center' sx={{ marginTop: '2rem' }}>
							<Text align='center'>You can drop up to {canDrop} unused acres of land, at {dropRate} acres per turn.</Text>
							<Table>
								<thead>
									<tr>
										<th></th>
										<th>Owned</th>
										<th>Can Drop</th>
										<th>Drop</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>Unused Land</td>
										<td>{empire.freeLand.toLocaleString()}</td>
										<td>{canDrop}</td>
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
													return !Number.isNaN(parseFloat(value))
														? `${value}`.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
														: ''
												}
												}
											/>
										</td>
									</tr>
								</tbody>
							</Table>
							<Button type='submit' color='red' disabled={roundStatus} loading={loading}>
								Drop Land
							</Button>
						</Stack>
					</form>
				</Stack>
			</Center>
		</main>
	)
}
