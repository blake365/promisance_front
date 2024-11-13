import { Button, Center, NumberInput, Stack, Table, Title, Text, ActionIcon, Group } from '@mantine/core'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from '@mantine/form'
import Axios from 'axios'
import { clearResult, setResult } from '../../store/turnResultsSlice'
import { raceArray } from '../../config/races'
import { eraArray } from '../../config/eras'
import { FavoriteButton, HalfButton, MaxButton, OneTurn } from '../utilities/maxbutton'
import { Link } from 'react-router-dom'
import { calcSizeBonus } from '../../functions/functions'
import { useState, useRef } from 'react'
import { useTour } from '@reactour/tour'
import { Compass } from '@phosphor-icons/react'
import { buildSteps } from '../../tour/buildSteps'
import { useLoadEmpire } from '../../hooks/useLoadEmpire'
import { checkRoundStatus } from '../../functions/checkRoundStatus'
import { setRepeat } from '../../store/repeatSlice'
import { useTranslation } from 'react-i18next'

export default function Build({ size })
{
	const buttonRef = useRef()

	const { t } = useTranslation(['turns', 'eras'])

	const { setIsOpen, setSteps, setMeta, setCurrentStep, meta } = useTour()
	let buildNumberArray = []
	let totalBuild = 0
	const errors = {
		error: '',
	}
	const { empire } = useSelector((state) => state.empire)
	const { buildCost: baseBuildCost } = useSelector((state) => state.games.activeGame)

	const [loading, setLoading] = useState(false)

	const dispatch = useDispatch()
	const loadEmpire = useLoadEmpire(empire.uuid)

	const getBuildAmounts = (empire) =>
	{
		const size = calcSizeBonus(empire)
		// console.log(size)
		const buildCost = Math.round((baseBuildCost + empire.land * 0.2) * (size / 3))

		let buildRate = Math.round(empire.land * 0.015 + 4)
		buildRate = Math.round(
			((100 + raceArray[empire.race].mod_buildrate) / 100) * buildRate
		)

		const canBuild = Math.min(
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
			bldPop: t('build.error'),
			bldCash: t('build.error'),
			bldCost: t('build.error'),
			bldFood: t('build.error'),
			bldTroop: t('build.error'),
			bldWiz: t('build.error'),
			bldDef: t('build.error'),
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

	const buildings = ['bldPop', 'bldCash', 'bldCost', 'bldTroop', 'bldWiz', 'bldFood', 'bldDef']

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
			window.scroll({ top: 0, behavior: 'smooth' })
			setLoading(false)
			if (meta && meta !== 'build tour') {
				setCurrentStep(5)
			}
		} catch (error) {
			console.log(error)
			setLoading(false)
		}
	}

	const eraName = eraArray[empire.era].name.toLowerCase()
	const roundStatus = checkRoundStatus()

	return (
		<main className=''>
			<Center mb={10}>
				<Stack spacing='sm' align='center' >
					{!size && <>
						<img src='/images/build2.webp' height='200' style={{ maxHeight: '200px', maxWidth: '100%', borderRadius: '10px' }} alt='build' />
						<Title order={1} align='center'>
							{t('build.title')} <FavoriteButton empire={empire} title='Build' />
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
						<div className='build0'>
							<Text align='center'>
								{t('build.description', { cost: buildCost.toLocaleString() })}
							</Text>
							<Text align='center'>
								{t('build.rate', { rate: buildRate.toLocaleString() })}
							</Text>
							<Text align='center'>
								{t('build.canBuild', { canBuild: canBuild.toLocaleString() })}
							</Text>
						</div>
					</>}
					<form
						onSubmit={
							totalBuild <= canBuild
								? form.onSubmit((values) =>
								{
									dispatch(clearResult)
									doBuild(values)
								})
								: setErrors(t('build.error'))
						}
						className='gremlin4 dwarf4 elf4 gremlin4 drow4 ghoul4 gnome4 pixie4 minotaur4 goblin4 orc4 hobbit4 vampire4 '
					>
						<Stack spacing='sm' align='center' className='fourth-step'>
							<Table verticalSpacing='xs' striped>
								<thead>
									<tr>
										<th>{t('turns:build.structure')}</th>
										<th>{t('turns:build.owned')}</th>
										{/* <th>Can Build</th> */}
										<th>{t('turns:build.build')}</th>
										{/* <th></th> */}
									</tr>
								</thead>
								<tbody>
									{buildings.map((building, index) =>
									{
										let buildingName = building.toLowerCase()
										if (building === 'bldTroop') {
											buildingName = 'bldtrp'
										}

										return <tr className={`build${index + 1}`} key={building}>
											<td>
												<Group spacing={2}>
													<FavoriteButton
														size={16}
														empire={empire}
														title={building}
													/>
													{t(`eras:eras.${eraName}.${buildingName}`)}
												</Group>
											</td>
											<td>
												{empire[building]} (
												{Math.round((empire[building] / empire.land) * 100)}%)
											</td>
											{/* <td>{canBuild.toLocaleString()}</td> */}
											<td>
												<NumberInput
													hideControls
													min={0}
													defaultValue={0}
													max={canBuild}
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
																value={buildRate}
																max={canBuild}
																formName={form}
																currentValue={form.values[building]}
															/>
															<HalfButton
																fieldName={building}
																maxValue={canBuild}
																formName={form}
															/>
															<MaxButton
																fieldName={building}
																maxValue={canBuild}
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
										<td colSpan={3}>{empire.freeLand.toLocaleString()}</td>
									</tr>
								</tbody>
							</Table>
							<div style={{ color: 'red' }}>{errors.error}</div>

							<Button type='submit' disabled={errors.error || roundStatus} loading={loading} ref={buttonRef}>
								{t('turns:build.submit')}
							</Button>

						</Stack>
					</form>
					<Button component={Link} to='/app/demolish' compact variant='outline' color='orange' sx={{ marginTop: '1rem' }}>
						{t('turns:build.demolish')}
					</Button>
				</Stack>
			</Center>
		</main>
	)
}
