import { Button, Center, NumberInput, Stack, Table, Title } from '@mantine/core'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from '@mantine/form'
import Axios from 'axios'
import { empireLoaded } from '../../store/empireSlice'
import { clearResult, setResult } from '../../store/turnResultsSlice'
import { raceArray } from '../../config/races'
import { eraArray } from '../../config/eras'
import { MaxButton, HalfButton, FavoriteButton } from '../utilities/maxbutton'
import { BUILD_COST } from '../../config/config'
import { Link } from 'react-router-dom'

// TODO: clear form on submit
// TODO: fix styling of button, unused land, top alignment, text alignment in cells
// TODO: build demolish feature


export default function Build()
{
	let buildNumberArray = []
	let totalBuild = 0
	let errors = {
		error: '',
	}
	const { empire } = useSelector((state) => state.empire)

	const dispatch = useDispatch()

	const getBuildAmounts = (empire) =>
	{
		let buildCost = Math.round(BUILD_COST + empire.land * 0.1)

		let buildRate = Math.round(empire.land * 0.015 + 4)
		buildRate = Math.round((100 + raceArray[empire.race].mod_buildrate) / 100 * buildRate)

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
		try {
			const res = await Axios.post('/build', values)
			// dispatch(setResult(res.data))
			// console.log(res.data)
			dispatch(setResult(res.data))
			loadEmpireTest()
			form.reset()
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<main>
			<Center mb={10}>
				<Stack spacing='sm' align='center'>
					<Title order={1} align='center'>
						Build <FavoriteButton empire={empire} title='Build' />
					</Title>
					<div>
						Each structure consumes one acre of unused land and costs $
						{buildCost.toLocaleString()} to build.
					</div>
					<div>
						You can build <span style={{ fontWeight: 600 }}>{buildRate.toLocaleString()}</span> structures per turn
					</div>
					<div>
						With your resources and unused land you can build <span style={{ fontWeight: 600 }}>{canBuild.toLocaleString()}{' '}</span>
						structures
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
						<Stack spacing='sm' align='center'>
							<Table verticalSpacing='xs' striped>
								<thead>
									<tr>
										<th>Structure</th>
										<th>Owned</th>
										{/* <th>Can Build</th> */}
										<th>Build</th>
									</tr>
								</thead>
								<tbody>
									<tr>
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
												rightSection={<div style={{ marginRight: '2rem', display: "flex" }}><MaxButton formName={form} fieldName='bldPop' maxValue={canBuild} /><HalfButton formName={form} fieldName='bldPop' maxValue={canBuild} /></div>}
											/>
										</td>
									</tr>
									<tr>
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
												rightSection={<div style={{ marginRight: '2rem', display: "flex" }}><MaxButton formName={form} fieldName='bldCash' maxValue={canBuild} /><HalfButton formName={form} fieldName='bldCash' maxValue={canBuild} /></div>}
											/>
										</td>
									</tr>
									<tr>
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
												rightSection={<div style={{ marginRight: '2rem', display: "flex" }}><MaxButton formName={form} fieldName='bldTroop' maxValue={canBuild} /><HalfButton formName={form} fieldName='bldTroop' maxValue={canBuild} /></div>}
											/>
										</td>
									</tr>
									<tr>
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
												rightSection={<div style={{ marginRight: '2rem', display: "flex" }}><MaxButton formName={form} fieldName='bldCost' maxValue={canBuild} /><HalfButton formName={form} fieldName='bldCost' maxValue={canBuild} /></div>}
											/>
										</td>
									</tr>
									<tr>
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
												rightSection={<div style={{ marginRight: '2rem', display: "flex" }}><MaxButton formName={form} fieldName='bldWiz' maxValue={canBuild} /><HalfButton formName={form} fieldName='bldWiz' maxValue={canBuild} />
												</div>} />
										</td>
									</tr>
									<tr>
										<td>{eraArray[empire.era].bldfood}</td>
										<td>
											{empire.bldFood} (
											{Math.round((empire.bldFood / empire.land) * 100)}%)
										</td>
										{/* <td>{canBuild.toLocaleString()}</td> */}
										<td>
											<NumberInput
												hideControls
												type='number'
												min={0}
												defaultValue={0}
												max={empire.freeLand}
												{...form.getInputProps('bldFood')}
												rightSection={<div style={{ marginRight: '2rem', display: "flex" }}><MaxButton formName={form} fieldName='bldFood' maxValue={canBuild} />
													<HalfButton formName={form} fieldName='bldFood' maxValue={canBuild} />
												</div>}
											/>
										</td>
									</tr>
									<tr>
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
												rightSection={<div style={{ marginRight: '2rem', display: "flex" }}><MaxButton formName={form} fieldName='bldDef' maxValue={canBuild} />
													<HalfButton formName={form} fieldName='bldDef' maxValue={canBuild} /></div>}
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
							{errors.error ? (
								<Button color='black' type='submit' disabled>
									Begin Construction
								</Button>
							) : (
								<Button color='black' type='submit'>
									Begin Construction
								</Button>
							)}
						</Stack>
					</form>
					<Button component={Link} to='/app/demolish' compact variant='outline' color='orange' sx={{ marginTop: '1rem' }}>Demolish Buildings</Button>
				</Stack>
			</Center>
		</main>
	)
}
