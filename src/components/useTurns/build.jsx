import { Button, Center, Group, NumberInput, Table, Title } from '@mantine/core'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from '@mantine/hooks'
import Axios from 'axios'
import { empireLoaded } from '../../store/empireSlice'

export default function Build() {
	let buildNumberArray = []
	let totalBuild = 0
	let errors = {
		error: '',
	}
	const empire = useSelector((state) => state.empire)

	const dispatch = useDispatch()

	const getBuildAmounts = (empire) => {
		let buildCost = Math.round(3500 + empire.land * 0.1)

		let buildRate = Math.round(empire.land * 0.015 + 4)

		//TODO: buildrate race bonus

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
			bldPop: (value) => value < canBuild,
			bldCash: (value) => value < canBuild,
			bldCost: (value) => value < canBuild,
			bldFood: (value) => value < canBuild,
			bldTroop: (value) => value < canBuild,
			bldWiz: (value) => value < canBuild,
			bldDef: (value) => value < canBuild,
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

	function setErrors(error) {
		errors.error = error
	}

	const loadEmpireTest = async () => {
		try {
			const res = await Axios.get(`/empire/${empire.uuid}`)
			console.log(res.data)

			dispatch(empireLoaded(res.data))
		} catch (error) {
			console.log(error)
		}
	}

	const doBuild = async (values) => {
		try {
			const res = await Axios.post('/build', values)

			console.log(res.data)
			loadEmpireTest()
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<main>
			<Center mb={10}>
				<Group direction='column' spacing='sm' align='center'>
					<Title order={1} align='center'>
						Build
					</Title>
					<div>
						Each structure consumes one acre of unused land and costs $
						{buildCost.toLocaleString()} to build.
					</div>
					<div>
						You can build {buildRate.toLocaleString()} structures per turn
					</div>
					<div>
						With your resources you can build {canBuild.toLocaleString()}{' '}
						structures
					</div>

					<form
						onSubmit={
							totalBuild < canBuild
								? form.onSubmit((values) => doBuild(values))
								: setErrors("Can't build that many buildings")
						}
					>
						<Table verticalSpacing='xs' striped>
							<thead>
								<tr>
									<th>Structure</th>
									<th>Owned</th>
									<th>Can Build</th>
									<th>Build</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>Apartments</td>
									<td>
										{empire.bldPop} (
										{Math.round((empire.bldPop / empire.land) * 100)}%)
									</td>
									<td>{canBuild.toLocaleString()}</td>
									<td>
										<NumberInput
											hideControls
											min={0}
											defaultValue={0}
											max={empire.freeLand}
											{...form.getInputProps('bldPop')}
										/>
									</td>
								</tr>
								<tr>
									<td>Business Centers</td>
									<td>
										{empire.bldCash} (
										{Math.round((empire.bldCash / empire.land) * 100)}%)
									</td>
									<td>{canBuild.toLocaleString()}</td>
									<td>
										<NumberInput
											hideControls
											min={0}
											defaultValue={0}
											max={empire.freeLand}
											{...form.getInputProps('bldCash')}
										/>
									</td>
								</tr>
								<tr>
									<td>Factories</td>
									<td>
										{empire.bldTroop} (
										{Math.round((empire.bldTroop / empire.land) * 100)}%)
									</td>
									<td>{canBuild.toLocaleString()}</td>
									<td>
										<NumberInput
											hideControls
											min={0}
											defaultValue={0}
											max={empire.freeLand}
											{...form.getInputProps('bldTroop')}
										/>
									</td>
								</tr>
								<tr>
									<td>Warehouses</td>
									<td>
										{empire.bldCost} (
										{Math.round((empire.bldCost / empire.land) * 100)}%)
									</td>
									<td>{canBuild.toLocaleString()}</td>
									<td>
										<NumberInput
											hideControls
											min={0}
											defaultValue={0}
											max={empire.freeLand}
											{...form.getInputProps('bldCost')}
										/>
									</td>
								</tr>
								<tr>
									<td>PSI Centers</td>
									<td>
										{empire.bldWiz} (
										{Math.round((empire.bldWiz / empire.land) * 100)}%)
									</td>
									<td>{canBuild.toLocaleString()}</td>
									<td>
										<NumberInput
											hideControls
											min={0}
											defaultValue={0}
											max={empire.freeLand}
											{...form.getInputProps('bldWiz')}
										/>
									</td>
								</tr>
								<tr>
									<td>Plantations</td>
									<td>
										{empire.bldFood} (
										{Math.round((empire.bldFood / empire.land) * 100)}%)
									</td>
									<td>{canBuild.toLocaleString()}</td>
									<td>
										<NumberInput
											hideControls
											type='number'
											min={0}
											defaultValue={0}
											max={empire.freeLand}
											{...form.getInputProps('bldFood')}
										/>
									</td>
								</tr>
								<tr>
									<td>Bunkers</td>
									<td>
										{empire.bldDef} (
										{Math.round((empire.bldDef / empire.land) * 100)}%)
									</td>
									<td>{canBuild.toLocaleString()}</td>
									<td>
										<NumberInput
											hideControls
											min={0}
											defaultValue={0}
											max={empire.freeLand}
											{...form.getInputProps('bldDef')}
										/>
									</td>
								</tr>
								<tr>
									<td>Unused Land</td>
									<td>{empire.freeLand.toLocaleString()}</td>
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
					</form>
				</Group>
			</Center>
		</main>
	)
}
