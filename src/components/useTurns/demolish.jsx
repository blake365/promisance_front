import { Button, Center, Group, NumberInput, Table, Title } from '@mantine/core'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from '@mantine/hooks'
import Axios from 'axios'
import { empireLoaded } from '../../store/empireSlice'
import { clearResult, setResult } from '../../store/turnResultsSlice'
import { raceArray } from '../../config/races'
import { eraArray } from '../../config/eras'
import { MaxButton, HalfButton } from '../utilities/maxbutton'
import { BUILD_COST } from '../../config/config'

// TODO: clear form on submit
// TODO: fix styling of button, unused land, top alignment, text alignment in cells
// TODO: build demolish feature


export default function Demolish()
{
	let demoNumberArray = []
	let totalDemo = 0
	let errors = {
		error: '',
	}
	const { empire } = useSelector((state) => state.empire)

	const dispatch = useDispatch()

	const getDemolishAmounts = (empire) =>
	{
		let demolishCost = Math.round((BUILD_COST + empire.land * 0.1)/5)

		let demolishRate = Math.min(Math.floor(empire.land * 0.02 + 2) * ((100 + raceArray[empire.race].mod_buildrate) / 100), 200)

		let canDemolish = Math.min(
			demolishRate * empire.turns, empire.land - empire.freeLand)

		return { canDemolish, demolishRate, demolishCost }
	}

	const getDropAmounts = (empire) =>
	{
		let dropRate = Math.max(Math.ceil((empire.land * 0.02 + 2) * ((100 + raceArray[empire.race].mod_buildrate) / 100) / 10), 50)

		// TODO: empire effect to restrict land dropping
		let canDrop = Math.min(dropRate * empire.turns, empire.freeLand, Math.max(0, empire.land - 1000))
		
		return {dropRate, canDrop}
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
			// demoDef: 0,
			// totalBuild: totalBuild,
		},

		validationRules: {
			// totalBuild: (value) => value < canBuild,
			demoPop: (value) => value <= canDemolish,
			demoCash: (value) => value <= canDemolish,
			demoCost: (value) => value <= canDemolish,
			demoFood: (value) => value <= canDemolish,
			demoTroop: (value) => value <= canDemolish,
			demoWiz: (value) => value <= canDemolish,
			demoDef: (value) => value <= canDemolish,
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
	console.log(totalDemo)
	// console.log(value)

	function setErrors(error)
	{
		errors.error = error
	}

	const loadEmpireTest = async () =>
	{
		try {
			const res = await Axios.get(`/empire/${empire.uuid}`)
			console.log(res.data)
			dispatch(empireLoaded(res.data))
		} catch (error) {
			console.log(error)
		}
	}

	const doDemolish = async (values) =>
	{
		try {
			const res = await Axios.post('/demolish', values)
			// dispatch(setResult(res.data))
			console.log(res.data)
			dispatch(setResult(res.data))
			loadEmpireTest()
			form.reset()
		} catch (error) {
			console.log(error)
		}
	}

	const doDrop = async (values) =>
	{
		try {
			const res = await Axios.post('/drop', values)
			// dispatch(setResult(res.data))
			console.log(res.data)
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
				<Group direction='column' spacing='sm' align='center'>
					<Title order={1} align='center'>
						Demolish
					</Title>
					<div>
						Each structure demolished frees up one acre of land and 
						${demolishCost.toLocaleString()} will be salvaged.
					</div>
					<div>
						You can demolish {demolishRate.toLocaleString()} structures per turn.
					</div>
					<div>
						With your resources, you can demolish {canDemolish.toLocaleString()}{' '}
						structures.
					</div>

					<form
						onSubmit={
							totalDemo <= canDemolish
								? form.onSubmit((values) =>
								{
									console.log(values)
									dispatch(clearResult)
									doDemolish(values)
								})
								: setErrors("Can't demolish that many buildings")
						}
					>
						<Group direction='column' spacing='sm' align='center'>
						<Table verticalSpacing='xs' striped>
							<thead>
								<tr>
									<th>Structure</th>
									<th>Owned</th>
									<th>Can Demolish</th>
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
									<td>{Math.min(canDemolish, empire.bldPop).toLocaleString()}</td>
									<td>
										<NumberInput
											hideControls
											min={0}
											defaultValue={0}
											max={Math.min(canDemolish, empire.bldPop)}
											{...form.getInputProps('demoPop')}
											rightSection={<div style={{ marginRight: '2rem', display: "flex" }}><MaxButton formName={form} fieldName='demoPop' maxValue={Math.min(canDemolish, empire.bldPop)} /><HalfButton formName={form} fieldName='demoPop' maxValue={Math.min(canDemolish, empire.bldPop)} /></div>}
										/>
									</td>
								</tr>
								<tr>
									<td>{eraArray[empire.era].bldcash}</td>
									<td>
										{empire.bldCash} (
										{Math.round((empire.bldCash / empire.land) * 100)}%)
									</td>
									<td>{Math.min(canDemolish, empire.bldCash).toLocaleString()}</td>
									<td>
										<NumberInput
											hideControls
											min={0}
											defaultValue={0}
											max={empire.freeLand}
											{...form.getInputProps('demoCash')}
											rightSection={<div style={{ marginRight: '2rem', display: "flex" }}><MaxButton formName={form} fieldName='demoCash' maxValue={Math.min(canDemolish, empire.bldCash)} /><HalfButton formName={form} fieldName='demoCash' maxValue={Math.min(canDemolish, empire.bldCash)} /></div>}
										/>
									</td>
								</tr>
								<tr>
									<td>{eraArray[empire.era].bldtrp}</td>
									<td>
										{empire.bldTroop} (
										{Math.round((empire.bldTroop / empire.land) * 100)}%)
									</td>
									<td>{Math.min(canDemolish, empire.bldTroop).toLocaleString()}</td>
									<td>
										<NumberInput
											hideControls
											min={0}
											defaultValue={0}
											max={empire.freeLand}
											{...form.getInputProps('demoTroop')}
											rightSection={<div style={{ marginRight: '2rem', display: "flex" }}><MaxButton formName={form} fieldName='demoTroop' maxValue={Math.min(canDemolish, empire.bldTroop)} /><HalfButton formName={form} fieldName='demoTroop' maxValue={Math.min(canDemolish, empire.bldTroop)} /></div>}
										/>
									</td>
								</tr>
								<tr>
									<td>{eraArray[empire.era].bldcost}</td>
									<td>
										{empire.bldCost} (
										{Math.round((empire.bldCost / empire.land) * 100)}%)
									</td>
									<td>{Math.min(canDemolish, empire.bldCost).toLocaleString()}</td>
									<td>
										<NumberInput
											hideControls
											min={0}
											defaultValue={0}
											max={empire.freeLand}
											{...form.getInputProps('demoCost')}
											rightSection={<div style={{ marginRight: '2rem', display: "flex" }}><MaxButton formName={form} fieldName='demoCost' maxValue={Math.min(canDemolish, empire.bldCost)} /><HalfButton formName={form} fieldName='demoCost' maxValue={Math.min(canDemolish, empire.bldCost)} /></div>}
										/>
									</td>
								</tr>
								<tr>
									<td>{eraArray[empire.era].bldwiz}</td>
									<td>
										{empire.bldWiz} (
										{Math.round((empire.bldWiz / empire.land) * 100)}%)
									</td>
									<td>{Math.min(canDemolish, empire.bldWiz).toLocaleString()}</td>
									<td>
										<NumberInput
											hideControls
											min={0}
											defaultValue={0}
											max={empire.freeLand}
											{...form.getInputProps('demoWiz')}
											rightSection={<div style={{ marginRight: '2rem', display: "flex" }}>
												<MaxButton formName={form} fieldName='demoWiz' maxValue={Math.min(canDemolish, empire.bldWiz)} />
												<HalfButton formName={form} fieldName='demoWiz' maxValue={Math.min(canDemolish, empire.bldWiz)} />
											</div>} />
									</td>
								</tr>
								<tr>
									<td>{eraArray[empire.era].bldfood}</td>
									<td>
										{empire.bldFood} (
										{Math.round((empire.bldFood / empire.land) * 100)}%)
									</td>
									<td>{Math.min(canDemolish, empire.bldFood).toLocaleString()}</td>
									<td>
										<NumberInput
											hideControls
											type='number'
											min={0}
											defaultValue={0}
											max={empire.freeLand}
											{...form.getInputProps('demoFood')}
											rightSection={<div style={{ marginRight: '2rem', display: "flex" }}>
												<MaxButton formName={form} fieldName='demoFood' maxValue={Math.min(canDemolish, empire.bldFood)} />
												<HalfButton formName={form} fieldName='demoFood' maxValue={Math.min(canDemolish, empire.bldFood)} />
											</div>}
										/>
									</td>
								</tr>
								{/* <tr>
									<td>{eraArray[empire.era].blddef}</td>
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
								</tr> */}
								<tr>
									<td>Unused Land</td>
									<td colSpan={3}>{empire.freeLand.toLocaleString()} (
										{Math.round((empire.freeLand / empire.land) * 100)}%)</td>
								</tr>
							</tbody>
						</Table>
						<div style={{ color: 'red' }}>{errors.error}</div>
						{errors.error ? (
							<Button type='submit' disabled>
								Begin Demolition
							</Button>
						) : (
							<Button type='submit'>
								Begin Demolition
							</Button>
							)}
						</Group>
					</form>

					<form onSubmit={
							 dropForm.onSubmit((values) =>
								{
									console.log(values)
									dispatch(clearResult)
									doDrop(values)
								})
								
						}>
					<Group direction='column' spacing='sm' align='center' sx={{ marginTop: '2rem'}}>
						<div>You can drop up to {canDrop} unused acres of land, at {dropRate} acres per turn.</div>
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
									/>
								</td>
								</tr>
								</tbody>
						</Table>
						<Button  type='submit' color='red'>
								Drop Land
							</Button>
					</Group>
					

					</form>
				</Group>
			</Center>
		</main>
	)
}
