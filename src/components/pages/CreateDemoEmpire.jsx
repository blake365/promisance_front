import { Button, Paper, Stack, TextInput, Title, Select, Container, createStyles, Table, Text, Group, Image, ColorSchemeProvider, MantineProvider } from '@mantine/core'
import { useForm } from '@mantine/form'
import { create } from '../../store/empireSlice'
import { useEffect, forwardRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { raceArray } from '../../config/races'
import { load } from '../../store/userSlice'
import { getTime } from '../../store/timeSlice'
import { useLocalStorage } from '@mantine/hooks'


const useStyles = createStyles(() => ({
	form: {
		minHeight: '100vh',
		marginTop: 50,
		// maxWidth: 900,
		padding: 20,

		'@media (max-width: 400)': {
			maxWidth: '100%',
		},
	},
	guideTable: {
		overflowX: 'auto',
		whiteSpace: 'nowrap',
		textAlign: 'center',
	}
}));

const raceObjects = raceArray.slice(0, 8).map((race, index) => ({
	icon: index,
	label: race.name,
	value: index
}))

const RaceItem = forwardRef(({ icon, label, ...others }, ref) => (
	<div ref={ref} {...others} key={label}>
		<Group>
			<Image src={`/icons/${raceArray[icon].name.toLowerCase()}.svg`} height={22} width={22} fit='contain' sx={(theme) => theme.colorScheme === 'dark' ? ({ filter: 'invert(1)', opacity: '75%' }) : ({ filter: 'invert(0)', })} />
			<Text>{label}</Text>
		</Group>
	</div>
))

export default function CreateDemoEmpire()
{
	const { isLoggedIn, user } = useSelector((state) => state.user)

	const navigate = useNavigate()
	const dispatch = useDispatch()

	const { game_id } = useSelector((state) => state.games.activeGame)

	useEffect(() =>
	{
		if (!isLoggedIn || !user) {
			navigate('/')
		}
		if (user && user.role !== 'demo') {
			navigate('/')
		}

	}, [user, dispatch])

	// set up server side validation response
	const form = useForm({
		initialValues: {
			name: '',
			race: 0,
		},

		validationRules: {

		},

		errorMessages: {

		},
	})

	// const onSubmit = (data: Object) => {dispatch(signupUser(data))}
	const { classes } = useStyles();

	const [colorScheme, setColorScheme] = useLocalStorage({
		key: 'prom-color-scheme',
		defaultValue: 'dark'
	});
	const toggleColorScheme = (value) =>
		setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

	return (
		<ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
			<MantineProvider theme={{ colorScheme }} withGlobalStyles>
				<div>
					<Container size='lg'>
						<Paper className={classes.form} radius={0} >
							<Stack align='left'>
								<Title order={1} align='center'>
									Create Demo Empire
								</Title>
								<form
									onSubmit={form.onSubmit((values) =>
									{
										// console.log(values)
										dispatch(create({ values, game_id }))
											.unwrap()
											.then(() =>
											{
												// console.log('created')
												dispatch(load())
													.then(() =>
													{
														// console.log('loaded user')
														dispatch(getTime(game_id)).then(() => navigate('/app/'))
													})
											})
											.catch((error) =>
											{
												console.log(error)
												// setError(error)
											})
									})}
								>
									<Stack spacing='sm' align='center'>
										<TextInput
											label='Name'
											placeholder='empire name'
											type='text'
											required
											{...form.getInputProps('name')}
										/>
										<Select
											label="Choose Your Race"
											placeholder="Pick one"
											required
											itemComponent={RaceItem}
											data={raceObjects}
											{...form.getInputProps('race')}
										/>
										<Button type='submit'>Create Empire</Button>
									</Stack>
								</form>

								<Title order={3}>Races</Title>
								<Text>There are many different races in the world, each with their own distinct advantages and disadvantages in the following areas:</Text>
								<dl>
									<dt>Offense</dt>
									<dd>Your offensive power while attacking other empires.</dd>
									<dt>Defense</dt>
									<dd>Your defensive power when being attacked by other empires.</dd>
									<dt>Building</dt>
									<dd>How quickly you can construct (and demolish) structures.</dd>
									<dt>Upkeep*</dt>
									<dd>The amount of money you must pay for upkeep on your military units.</dd>
									<dt>Magic</dt>
									<dd>Your magical power, used when casting spells and when other empires cast spells on you.</dd>
									<dt>Industry</dt>
									<dd>Your ability to produce military units.</dd>
									<dt>Economy</dt>
									<dd>Your Per Capita Income, how much money your citizens make each turn.</dd>
									<dt>Exploration</dt>
									<dd>How much land you gain per turn spent exploring.</dd>
									<dt>Market*</dt>
									<dd>The prices of military units on the private market.</dd>
									<dt>Consumption*</dt>
									<dd>The amount of food your population and military consumes each turn.</dd>
									<dt>Energy</dt>
									<dd>The rate at which your wizards produce mana.</dd>
									<dt>Agriculture</dt>
									<dd>The rate at which your farms produce food.</dd>
								</dl>
								<i>Scroll to see more attributes</i>
								<div className={classes.guideTable}>
									<Table highlightOnHover striped style={{ width: 1300 }}>
										<thead>
											<tr>
												<th>Race</th>
												<th>Offense</th>
												<th>Defense</th>
												<th>Building</th>
												<th>Upkeep*</th>
												<th>Magic</th>
												<th>Industry</th>
												<th>Economy</th>
												<th>Exploration</th>
												<th>Market*</th>
												<th>Consumption*</th>
												<th>Energy</th>
												<th>Agriculture</th>
											</tr>
										</thead>
										<tbody>
											{raceArray.map(race => 
											{
												return (
													<tr>
														<td>{race.name}</td>
														<td style={race.mod_offense >= 0 ? { color: 'green' } : { color: 'red' }}>{race.mod_offense}%</td>
														<td style={race.mod_defense >= 0 ? { color: 'green' } : { color: 'red' }}>{race.mod_defense}%</td>
														<td style={race.mod_buildrate >= 0 ? { color: 'green' } : { color: 'red' }}>{race.mod_buildrate}%</td>
														<td style={race.mod_expenses >= 0 ? { color: 'green' } : { color: 'red' }}>{race.mod_expenses}%</td>
														<td style={race.mod_magic >= 0 ? { color: 'green' } : { color: 'red' }}>{race.mod_magic}%</td>
														<td style={race.mod_industry >= 0 ? { color: 'green' } : { color: 'red' }}>{race.mod_industry}%</td>
														<td style={race.mod_income >= 0 ? { color: 'green' } : { color: 'red' }}>{race.mod_income}%</td>
														<td style={race.mod_explore >= 0 ? { color: 'green' } : { color: 'red' }}>{race.mod_explore}%</td>
														<td style={race.mod_market >= 0 ? { color: 'green' } : { color: 'red' }}>{race.mod_market}%</td>
														<td style={race.mod_foodcon >= 0 ? { color: 'green' } : { color: 'red' }}>{race.mod_foodcon}%</td>
														<td style={race.mod_runepro >= 0 ? { color: 'green' } : { color: 'red' }}>{race.mod_runepro}%</td>
														<td style={race.mod_foodpro >= 0 ? { color: 'green' } : { color: 'red' }}>{race.mod_foodpro}%</td>
													</tr>
												)
											})}
										</tbody>
									</Table>
								</div>
								<p>For all of the above values, a positive percentage works to your empire's advantage while a negative percentage acts as a penalty. For attributes noted with a "*", this may seem backwards - for example, a food consumption penalty (negative) will <i>increase</i> how much food your units require, while an upkeep bonus (positive) will <i>decrease</i> your expenses.</p>

							</Stack>
						</Paper>
					</Container>
				</div>
			</MantineProvider>
		</ColorSchemeProvider>
	)
}
