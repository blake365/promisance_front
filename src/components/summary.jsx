import { Button, Grid, Group, Table, Title } from '@mantine/core'
import { useDispatch, useSelector } from 'react-redux'
import { empireLoaded } from '../store/empireSlice'
import Axios from 'axios'

export default function Summary()
{
	const dispatch = useDispatch()

	const loadEmpireTest = async () =>
	{
		try {
			const res = await Axios.get(
				'/empire/26a4d879-c017-42b8-aa2a-5a1a3c881aa3'
			)
			console.log(res.data)

			dispatch(empireLoaded(res.data))
		} catch (error) {
			console.log(error)
		}
	}

	let now = new Date()
	const empire = useSelector((state) => state.empire)

	return (
		<main>
			<Group direction='column' spacing='sm' align='center' grow>
				<Title order={1} align='center'>
					Summary
				</Title>
				<Button onClick={loadEmpireTest}>Load Empire Test</Button>

				<Title order={2} align='center'>
					{empire?.name}(#{empire?.id})
				</Title>
				<Grid justify='space-between' grow>
					<Grid.Col sm={6} md={6}>
						<Table
							verticalSpacing='xs'
							striped
							style={{
								minWidth: '300px',
								// maxWidth: '400px',
							}}
						>
							<tbody>
								<tr>
									<td style={{ width: '50%' }}>Turns</td>
									<td>{empire?.turns} (max 500)</td>
								</tr>
								<tr>
									<td>Stored Turns</td>
									<td>{empire?.storedturns} (max 250)</td>
								</tr>
								<tr>
									<td>Rank</td>
									<td>{empire?.rank}</td>
								</tr>
								<tr>
									<td>Civilians</td>
									<td>{empire?.peasants.toLocaleString()}</td>
								</tr>
								<tr>
									<td>Land Acres</td>
									<td>{empire?.land.toLocaleString()}</td>
								</tr>
								<tr>
									<td>Money</td>
									<td>${empire?.cash.toLocaleString()}</td>
								</tr>
								<tr>
									<td>Food</td>
									<td>{empire?.food.toLocaleString()}</td>
								</tr>
								<tr>
									<td>Mana</td>
									<td>{empire?.runes.toLocaleString()}</td>
								</tr>
								<tr>
									<td>Net Worth</td>
									<td>${empire?.networth.toLocaleString()}</td>
								</tr>
							</tbody>
						</Table>
					</Grid.Col>
					<Grid.Col sm={6} md={6}>
						<Table
							verticalSpacing='xs'
							striped
							style={{
								minWidth: '300px',
								// maxWidth: '400px',
							}}
						>
							<tbody>
								<tr>
									<td style={{ width: '50%' }}>Era</td>
									<td>{empire?.era}</td>
								</tr>
								<tr>
									<td>Race</td>
									<td>{empire?.race}</td>
								</tr>
								<tr>
									<td>Health</td>
									<td>{empire?.health}%</td>
								</tr>
								<tr>
									<td>Tax Rate</td>
									<td>{empire?.tax}%</td>
								</tr>
								<tr>
									<td>Infantry</td>
									<td>{empire?.trpArm.toLocaleString()}</td>
								</tr>
								<tr>
									<td>Tanks</td>
									<td>{empire?.trpLnd.toLocaleString()}</td>
								</tr>
								<tr>
									<td>Jets</td>
									<td>{empire?.trpFly.toLocaleString()}</td>
								</tr>
								<tr>
									<td>Battleships</td>
									<td>{empire?.trpSea.toLocaleString()}</td>
								</tr>
								<tr>
									<td>Wizards</td>
									<td>{empire?.trpWiz.toLocaleString()}</td>
								</tr>
							</tbody>
						</Table>
					</Grid.Col>
				</Grid>
				<div>{now.toISOString}</div>
				<div>You get 2 turns every 15 minutes</div>
				<div>Next 2 turns in XX minutes, XX seconds</div>
				<div>The current round will end in X days, XX hours</div>


			</Group>
		</main>
	)
}
