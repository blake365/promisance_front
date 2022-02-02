import { Grid, Group, Table, Title } from '@mantine/core'

export default function Summary() {
	const empire = {
		id: 3,
		uuid: '3b207ad3-0e7b-4f68-8ecb-982da364f035',
		createdAt: '2022-01-20T00:30:24.633Z',
		updatedAt: '2022-01-22T06:08:11.915Z',
		empireId: 3,
		clanId: 0,
		clanOldId: 0,
		attacks: 0,
		bank: 0,
		bldCash: 2000,
		bldCost: 2000,
		bldDef: 0,
		bldFood: 2000,
		bldPop: 2000,
		bldTroop: 2000,
		bldWiz: 2000,
		cash: 1000000,
		defSucc: 0,
		defTotal: 0,
		era: 1,
		flags: 0,
		food: 50000,
		freeLand: 2000,
		health: 100,
		e_id: 0,
		idle: 0,
		indArmy: 25,
		indFly: 25,
		indLnd: 25,
		indSea: 25,
		killClan: 0,
		killedBy: 0,
		kills: 0,
		land: 14000,
		loan: 0,
		mktArm: 0,
		mktFly: 0,
		mktFood: 0,
		mktLnd: 0,
		mktSea: 0,
		mktPerArm: 0,
		mktPerFly: 0,
		mktPerLnd: 0,
		mktPerSea: 0,
		name: 'Yikay',
		networth: 0,
		offSucc: 0,
		offTotal: 0,
		peasants: 20000,
		race: 'Elf',
		rank: 0,
		reason: 0,
		runes: 1000,
		score: 0,
		sharing: 0,
		tax: 10,
		trpArm: 500,
		trpFly: 500,
		trpLnd: 500,
		trpSea: 500,
		trpWiz: 0,
		turns: 1000,
		turnsUsed: 0,
		vacation: 0,
		valCode: 0,
	}

	let now = new Date()

	return (
		<main>
			<Group direction='column' spacing='sm' align='center' grow>
				<Title order={1} align='center'>
					Summary
				</Title>
				<Title order={2} align='center'>
					{empire.name}(#{empire.id})
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
									<td>{empire.turns.toLocaleString()} (max 360)</td>
								</tr>
								<tr>
									<td>Stored Turns</td>
									<td>0 (max 150)</td>
								</tr>
								<tr>
									<td>Rank</td>
									<td>{empire.rank}</td>
								</tr>
								<tr>
									<td>Civilians</td>
									<td>{empire.peasants.toLocaleString()}</td>
								</tr>
								<tr>
									<td>Land Acres</td>
									<td>{empire.land.toLocaleString()}</td>
								</tr>
								<tr>
									<td>Money</td>
									<td>${empire.cash.toLocaleString()}</td>
								</tr>
								<tr>
									<td>Food</td>
									<td>{empire.food.toLocaleString()}</td>
								</tr>
								<tr>
									<td>Mana</td>
									<td>{empire.runes.toLocaleString()}</td>
								</tr>
								<tr>
									<td>Net Worth</td>
									<td>${empire.networth.toLocaleString()}</td>
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
									<td>{empire.era}</td>
								</tr>
								<tr>
									<td>Race</td>
									<td>{empire.race}</td>
								</tr>
								<tr>
									<td>Health</td>
									<td>{empire.health}%</td>
								</tr>
								<tr>
									<td>Tax Rate</td>
									<td>{empire.tax}%</td>
								</tr>
								<tr>
									<td>Infantry</td>
									<td>{empire.trpArm.toLocaleString()}</td>
								</tr>
								<tr>
									<td>Tanks</td>
									<td>{empire.trpLnd.toLocaleString()}</td>
								</tr>
								<tr>
									<td>Jets</td>
									<td>{empire.trpFly.toLocaleString()}</td>
								</tr>
								<tr>
									<td>Battleships</td>
									<td>{empire.trpSea.toLocaleString()}</td>
								</tr>
								<tr>
									<td>Wizards</td>
									<td>{empire.trpWiz.toLocaleString()}</td>
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
