import { Button, Center, NumberInput, Stack, Table, Title, Text, ActionIcon } from '@mantine/core'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from '@mantine/form'
import Axios from 'axios'
import { empireLoaded } from '../../store/empireSlice'
import { clearResult, setResult } from '../../store/turnResultsSlice'
import { raceArray } from '../../config/races'
import { eraArray } from '../../config/eras'
import { FavoriteButton, HalfButton, MaxButton, OneTurn } from '../utilities/maxbutton'
import { BUILD_COST, ROUND_START, ROUND_END } from '../../config/config'
import { Link } from 'react-router-dom'
import { calcSizeBonus } from '../../functions/functions'
import { useState } from 'react'
import { useTour } from '@reactour/tour'
import { Compass } from '@phosphor-icons/react'
import { buildSteps } from '../../tour/buildSteps'

export default function Build()
{
	const { setIsOpen, setSteps, setMeta, setCurrentStep } = useTour()

	let buildNumberArray = []
	let totalBuild = 0
	let errors = {
		error: '',
	}
	const { empire } = useSelector((state) => state.empire)
	const { time } = useSelector((state) => state.time)
	const [loading, setLoading] = useState(false)

	const dispatch = useDispatch()

	const getBuildAmounts = (empire) =>
	{
		let size = calcSizeBonus(empire)
		// console.log(size)
		let buildCost = Math.round((BUILD_COST + empire.land * 0.2) * (size / 3))

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

	const { canBuild, buildRate, buildCost } = getBuildAmounts(empire)

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

	const loadEmpireTest = async () =>
	{
		try {
			const res = await Axios.get(`/empire/${empire.uuid}`)
			// console.log(res.data)
			dispatch(empireLoaded(res.data))
		} catch (error) {
			console.log(error)
		}
	}

	const doBuild = async (values) =>
	{
		setLoading(true)
		try {
			const res = await Axios.post('/build', values)
			// dispatch(setResult(res.data))
			// console.log(res.data)
			dispatch(setResult(res.data))
			loadEmpireTest()
			form.reset()
			window.scroll({ top: 0, behavior: 'smooth' })
			setLoading(false)
			setCurrentStep(5)
		} catch (error) {
			console.log(error)
			setLoading(false)
		}
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
		<main>
			<Center mb={10}>
				<Stack spacing='sm' align='center' >
					<img src='/images/build2.webp' height='200' style={{ maxHeight: '200px', maxWidth: '100%', borderRadius: '10px' }} alt='build' />
					<Title order={1} align='center'>
						Build <FavoriteButton empire={empire} title='Build' />
						<ActionIcon size='md' onClick={() =>
						{
							setMeta('build tour')
							setSteps(buildSteps)
							setCurrentStep(0)
							setIsOpen(true)
						}}
							sx={{
								color: '#40c057',
								display: 'inline',
							}}><Compass size={24} /></ActionIcon>
					</Title>
					<div className='bld-first-step'>
						<Text align='center'>
							Each structure consumes one acre of unused land and costs $
							{buildCost.toLocaleString()} to build.
						</Text>
						<Text align='center'>
							You can build <span style={{ fontWeight: 600 }}>{buildRate.toLocaleString()}</span> structures per turn
						</Text>
						<Text align='center'>
							With your resources and unused land you can build <span style={{ fontWeight: 600 }}>{canBuild.toLocaleString()}{' '}</span>
							structures
						</Text>
					</div>
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
						<Stack spacing='sm' align='center' className='fourth-step'>
							<Table verticalSpacing='xs' striped>
								<thead>
									<tr>
										<th>Structure</th>
										<th>Owned</th>
										{/* <th>Can Build</th> */}
										<th>Build</th>
										{/* <th></th> */}
									</tr>
								</thead>
								<tbody>
									<tr className='bld-second-step'>
										<td>{eraArray[empire.era].bldpop}</td>
										<td>
											{empire.bldPop} (
											{Math.round((empire.bldPop / empire.land) * 100)}%)
										</td>
										{/* <td>{canBuild.toLocaleString()}</td> */}
										<td>
											<NumberInput
												hideControls
												min={0}
												defaultValue={0}
												max={canBuild}
												{...form.getInputProps('bldPop')}
												rightSection={<div style={{ display: 'flex', backgroundColor: 'transparent' }}>
													<OneTurn fieldName='bldPop' value={buildRate} formName={form} />
													<HalfButton fieldName='bldPop' maxValue={canBuild} formName={form} />
													<MaxButton fieldName='bldPop' maxValue={canBuild} formName={form} />
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
										</td>

									</tr>
									<tr className='bld-step-twopointfive'>
										<td>{eraArray[empire.era].bldcash}</td>
										<td>
											{empire.bldCash} (
											{Math.round((empire.bldCash / empire.land) * 100)}%)
										</td>
										{/* <td>{canBuild.toLocaleString()}</td> */}
										<td>
											<NumberInput
												hideControls
												min={0}
												defaultValue={0}
												max={empire.freeLand}
												{...form.getInputProps('bldCash')}
												rightSection={<div style={{ display: 'flex' }}>
													<OneTurn fieldName='bldCash' value={buildRate} formName={form} />
													<HalfButton fieldName='bldCash' maxValue={canBuild} formName={form} />
													<MaxButton fieldName='bldCash' maxValue={canBuild} formName={form} />
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
										</td>

									</tr>
									<tr className='bld-third-step'>
										<td>{eraArray[empire.era].bldtrp}</td>
										<td>
											{empire.bldTroop} (
											{Math.round((empire.bldTroop / empire.land) * 100)}%)
										</td>
										{/* <td>{canBuild.toLocaleString()}</td> */}
										<td>
											<NumberInput
												hideControls
												min={0}
												defaultValue={0}
												max={empire.freeLand}
												{...form.getInputProps('bldTroop')}
												rightSection={<div style={{ display: 'flex' }}>
													<OneTurn fieldName='bldTroop' value={buildRate} formName={form} />
													<HalfButton fieldName='bldTroop' maxValue={canBuild} formName={form} />
													<MaxButton fieldName='bldTroop' maxValue={canBuild} formName={form} />
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
										</td>

									</tr>
									<tr className='bld-fourth-step'>
										<td>{eraArray[empire.era].bldcost}</td>
										<td>
											{empire.bldCost} (
											{Math.round((empire.bldCost / empire.land) * 100)}%)
										</td>
										{/* <td>{canBuild.toLocaleString()}</td> */}
										<td>
											<NumberInput
												hideControls
												min={0}
												defaultValue={0}
												max={empire.freeLand}
												{...form.getInputProps('bldCost')}
												rightSection={<div style={{ display: 'flex' }}>
													<OneTurn fieldName='bldCost' value={buildRate} formName={form} />
													<HalfButton fieldName='bldCost' maxValue={canBuild} formName={form} />
													<MaxButton fieldName='bldCost' maxValue={canBuild} formName={form} />
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
										</td>

									</tr>
									<tr className='bld-fifth-step'>
										<td>{eraArray[empire.era].bldwiz}</td>
										<td>
											{empire.bldWiz} (
											{Math.round((empire.bldWiz / empire.land) * 100)}%)
										</td>
										{/* <td>{canBuild.toLocaleString()}</td> */}
										<td>
											<NumberInput
												hideControls
												min={0}
												defaultValue={0}
												max={empire.freeLand}
												{...form.getInputProps('bldWiz')}
												rightSection={<div style={{ display: 'flex' }}>
													<OneTurn fieldName='bldWiz' value={buildRate} formName={form} />
													<HalfButton fieldName='bldWiz' maxValue={canBuild} formName={form} />
													<MaxButton fieldName='bldWiz' maxValue={canBuild} formName={form} />
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
										</td>

									</tr>
									<tr className='bld-sixth-step'>
										<td>{eraArray[empire.era].bldfood}</td>
										<td>
											{empire.bldFood} (
											{Math.round((empire.bldFood / empire.land) * 100)}%)
										</td>
										{/* <td>{canBuild.toLocaleString()}</td> */}
										<td>
											<NumberInput
												hideControls
												min={0}
												defaultValue={0}
												max={empire.freeLand}
												{...form.getInputProps('bldFood')}
												rightSection={<div style={{ display: 'flex' }}>
													<OneTurn fieldName='bldFood' value={buildRate} formName={form} />
													<HalfButton fieldName='bldFood' maxValue={canBuild} formName={form} />
													<MaxButton fieldName='bldFood' maxValue={canBuild} formName={form} />
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
										</td>
									</tr>
									<tr className='bld-seventh-step'>
										<td>{eraArray[empire.era].blddef}</td>
										<td>
											{empire.bldDef} (
											{Math.round((empire.bldDef / empire.land) * 100)}%)
										</td>
										{/* // <td>{canBuild.toLocaleString()}</td> */}
										<td>
											<NumberInput
												hideControls
												min={0}
												defaultValue={0}
												max={empire.freeLand}
												{...form.getInputProps('bldDef')}
												rightSection={<div style={{ display: 'flex' }}>
													<OneTurn fieldName='bldDef' value={buildRate} formName={form} />
													<HalfButton fieldName='bldDef' maxValue={canBuild} formName={form} />
													<MaxButton fieldName='bldDef' maxValue={canBuild} formName={form} />
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
										</td>

									</tr>
									<tr>
										<td>Unused Land</td>
										<td colSpan={3}>{empire.freeLand.toLocaleString()}</td>
									</tr>
								</tbody>
							</Table>
							<div style={{ color: 'red' }}>{errors.error}</div>

							<Button color='lime' type='submit' disabled={errors.error || roundStatus} loading={loading}>
								Begin Construction
							</Button>

						</Stack>
					</form>
					<Button component={Link} to='/app/demolish' compact variant='outline' color='orange' sx={{ marginTop: '1rem' }}>Demolish Buildings</Button>
				</Stack>
			</Center>
		</main>
	)
}
