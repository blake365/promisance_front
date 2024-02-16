import
{
	Title,
	Card,
	SimpleGrid,
	Grid,
	Text,
	Group, Col, Avatar, Stack, Popover, Anchor
} from '@mantine/core'
import { useSelector } from 'react-redux'

import { eraArray } from '../config/eras'
import { raceArray } from '../config/races'
import { calcSizeBonus, calcPCI, explore, calcFinances, calcProvisions, offense, defense } from '../functions/functions'
import NetProduced from './utilities/NetProduced'
import { BASE_LUCK } from '../config/config'
import { setBgImage } from '../functions/setBgImage'
import TinyAction from './useTurns/tinyAction'
import TinyBuild from './useTurns/tinyBuild'
import TaxRate from './settings/taxRate'
import IndyRates from './settings/indyRates'

const RaceBonus = ({ value }) =>
{
	// console.log(value)
	let color = 'green'
	if (value < 0) {
		color = 'red'
	}

	return (
		<span style={{ color: color }}>{value > 0 && '+'}{value}%</span>
	)
}

// finish overview page
// Show race details
// Show era details

export default function Overview()
{
	const { empire } = useSelector((state) => state.empire)

	// console.log(empire)
	let size = calcSizeBonus(empire)

	let cpi = calcPCI(empire)

	const newLand = explore(empire)

	const { income, expenses, loanpayed } = calcFinances(cpi, empire, size)

	let corruption = 0
	if (empire.cash > empire.networth * 110) {
		let multiples = Math.floor(empire.cash / empire.networth) - 1
		corruption = Math.round(multiples * empire.networth * 0.001)
	}

	const { foodpro, foodcon } = calcProvisions(empire)

	const oPower = offense(empire)

	const dPower = defense(empire)

	const race = raceArray[empire.race]
	const era = eraArray[empire.era]
	const buildings = ['bldPop', 'bldCash', 'bldTrp', 'bldCost', 'bldWiz', 'bldFood', 'bldDef']

	let luck = Math.round(BASE_LUCK / size)

	let clan = empire.clan

	// console.log(clan.relation)
	let enemies = []
	if (clan) {
		enemies = clan.relation.map((relation) =>
		{
			if (relation.clanRelationFlags === 'war') {
				return relation.clan2Name
			}
		})
	}
	// console.log(enemies)
	if (enemies.length > 1) {
		enemies = enemies.join(', ')
	} else if (enemies.length === 1) {
		enemies = enemies[0]
	} else {
		enemies = 'None'
	}
	// console.log(clan)
	const clanRole = (empireId, clan) =>
	{
		let role = 'None'
		if (empireId === clan.empireIdLeader) {
			role = 'Leader'
		} else if (empireId === clan.empireIdAssistant) {
			role = 'Assistant'
		} else {
			role = 'Member'
		}

		return role
	}

	const bgimage = setBgImage(empire)

	return (
		<main>
			<Stack spacing='sm' align='center'>
				<img src={bgimage} style={{ maxHeight: '100px', maxWidth: '100%', height: 'auto', borderRadius: '10px' }} alt='summary' />
				<Title order={1} align='center'>
					Overview
				</Title>

				<div>
					<Group spacing='sm' align='center' position='center' mb='sm'>
						<Card sx={{ width: '380px', minHeight: '295px' }}>
							<Group position='left' spacing={4}>
								<Avatar size="xs" src={empire.profileIcon} sx={(theme) => theme.colorScheme === 'dark' ? ({ filter: 'invert(1)', opacity: '75%' }) : ({ filter: 'invert(0)', })} />
								<Text weight={800} size='lg'>
									{empire.name}
								</Text>
							</Group>
							<SimpleGrid cols={2} spacing={1}>
								<Text>Turns:</Text>
								<Text align='right'>{empire.turns.toLocaleString()}{' '}({empire.storedturns} stored)</Text>
								<Text>Turns Used:</Text>
								<Text align='right'>{empire.turnsUsed.toLocaleString()}</Text>
								<Popover withArrow shadow="md">
									<Popover.Target>
										<Anchor>Health:</Anchor>
									</Popover.Target>
									<Popover.Dropdown>
										<TinyAction title='Heal' type='heal' color='red' empire={empire} />
									</Popover.Dropdown>
								</Popover>
								<Text align='right'>{empire.health}%</Text>
								<Text>Networth:</Text>
								<Text align='right'>${empire.networth.toLocaleString()}</Text>
								<Text>Population:</Text>
								<Text align='right'>{empire.peasants.toLocaleString()}</Text>
								<Text>Race:</Text>
								<Text align='right'>{raceArray[empire.race].name}</Text>
								<Text>Era:</Text>
								<Text align='right'>{eraArray[empire.era].name}</Text>
								<Popover withArrow shadow="md">
									<Popover.Target>
										<Anchor>Tax Rate:</Anchor>
									</Popover.Target>
									<Popover.Dropdown>
										<TaxRate tiny empire={empire} />
									</Popover.Dropdown>
								</Popover>
								<Text align='right'>{empire.tax}%</Text>
							</SimpleGrid>
						</Card>

						<Card sx={{ width: '380px', minHeight: '295px' }}>
							<Text weight={800} size='lg'>Agriculture</Text>
							<SimpleGrid cols={2} spacing={1}>
								<Text>Food:</Text>
								<Text align='right'>{empire.food.toLocaleString()}</Text>
								<Popover withArrow shadow="md">
									<Popover.Target>
										<Anchor>Production: <RaceBonus value={race.mod_foodpro + era.mod_foodpro} /></Anchor>
									</Popover.Target>
									<Popover.Dropdown>
										<TinyAction title='Farm' type='farm' color='green' empire={empire} />
									</Popover.Dropdown>
								</Popover>
								<Text align='right'>{foodpro.toLocaleString()}</Text>
								<Text>Consumption: <RaceBonus value={race.mod_foodcon} /></Text>
								<Text align='right'>{foodcon.toLocaleString()}</Text>
								<NetProduced title='Net' value={foodpro - foodcon} />
								<Text mt='md' weight={800} size='lg'>Other</Text>
								<Text></Text>
								<Popover withArrow shadow="md">
									<Popover.Target>
										<Anchor align='left'>Explore: <RaceBonus value={era.mod_explore + race.mod_explore} />
										</Anchor>
									</Popover.Target>
									<Popover.Dropdown>
										<TinyAction title='Explore' type='explore' color='blue' empire={empire} />
									</Popover.Dropdown>
								</Popover>
								<Text align='right'>+{newLand} acres</Text>
								<Text align='left'>Black Market: <RaceBonus value={race.mod_market} /></Text>
								<Text></Text>
								<Text align='left'>Luck: <RaceBonus value={luck} /></Text>
							</SimpleGrid>
						</Card>

						<Card sx={{ width: '380px', minHeight: '295px' }}>
							<Text weight={800} size='lg'>Economy</Text>
							<SimpleGrid cols={2} spacing={1}>
								<Text>Money:</Text>
								<Text align='right'>${empire.cash.toLocaleString()}</Text>
								<Text>Per Capita Income:</Text>
								<Text align='right'>${cpi.toLocaleString()}</Text>
								<Popover withArrow shadow="md">
									<Popover.Target>
										<Anchor>Income: <RaceBonus value={race.mod_income + era.mod_cashpro} /></Anchor>
									</Popover.Target>
									<Popover.Dropdown>
										<TinyAction title='Cash' type='cash' color='yellow' empire={empire} />
									</Popover.Dropdown>
								</Popover>
								<Text align='right'>${income.toLocaleString()}</Text>
								<Text>Expenses: <RaceBonus value={race.mod_expenses} /></Text>
								<Text align='right'>${expenses.toLocaleString()}</Text>
								<Text>Corruption: </Text>
								<Text align='right'>${corruption.toLocaleString()}</Text>
								<Text>Loan Payment:</Text>
								<Text align='right'>${Math.abs(loanpayed).toLocaleString()}</Text>
								<NetProduced title='Net' value={income - expenses - Math.abs(loanpayed) - corruption} money />
								<Text>Savings Balance:</Text>
								<Text align='right'>${empire.bank.toLocaleString()}</Text>
								<Text>Loan Balance:</Text>
								<Text align='right'>${empire.loan.toLocaleString()}</Text>
							</SimpleGrid>
						</Card>

						<Card sx={{ width: '380px', minHeight: '295px' }}>

							<Grid columns={16}>
								<Col span={8}>
									<Text weight={800} size='lg'>
										Land Division
									</Text>
									{buildings.map((building, index) => (
										<div key={index}>
											<Popover withArrow shadow="md">
												<Popover.Target>
													<Anchor>{eraArray[empire.era][building.toLowerCase()]}:</Anchor>
												</Popover.Target>
												<Popover.Dropdown>
													<TinyBuild building={building} empire={empire} />
												</Popover.Dropdown>
											</Popover>
										</div>
									))}
									<Text>Unused Land:</Text>
									<Text>Total Land:</Text>
								</Col>
								<Col span={5}>
									<Text align='right'>Build Rate: </Text>
									<Text align='right'>{empire.bldPop.toLocaleString()}</Text>
									<Text align='right'>{empire.bldCash.toLocaleString()}</Text>
									<Text align='right'>{empire.bldTroop.toLocaleString()}</Text>
									<Text align='right'>{empire.bldCost.toLocaleString()}</Text>
									<Text align='right'>{empire.bldWiz.toLocaleString()}</Text>
									<Text align='right'>{empire.bldFood.toLocaleString()}</Text>
									<Text align='right'>{empire.bldDef.toLocaleString()}</Text>
									<Text align='right'>{empire.freeLand.toLocaleString()}</Text>
									<Text align='right'>{empire.land.toLocaleString()}</Text>
								</Col>
								<Col span={3}>
									<Text align='right'><RaceBonus value={race.mod_buildrate} /> </Text>
									<Text align='right'>{Math.round(empire.bldPop / empire.land * 100)}%</Text>
									<Text align='right'>{Math.round(empire.bldCash / empire.land * 100)}%</Text>
									<Text align='right'>{Math.round(empire.bldTroop / empire.land * 100)}%</Text>
									<Text align='right'>{Math.round(empire.bldCost / empire.land * 100)}%</Text>
									<Text align='right'>{Math.round(empire.bldWiz / empire.land * 100)}%</Text>
									<Text align='right'>{Math.round(empire.bldFood / empire.land * 100)}%</Text>
									<Text align='right'>{Math.round(empire.bldDef / empire.land * 100)}%</Text>
									<Text align='right'>{Math.round(empire.freeLand / empire.land * 100)}%</Text>
									<Text align='right'> </Text>
								</Col>
							</Grid>
						</Card>
						<Card sx={{ width: '380px', minHeight: '295px' }}>
							<Grid columns={16}>
								<Col span={8}>
									<Text weight={800} size='lg'>
										Military
									</Text>
									<Text>{eraArray[empire.era].trparm}:</Text>
									<Text>{eraArray[empire.era].trplnd}:</Text>
									<Text>{eraArray[empire.era].trpfly}:</Text>
									<Text>{eraArray[empire.era].trpsea}:</Text>
									<Text> </Text>
									<Text mt='sm'>Off Power: <RaceBonus value={race.mod_offense} /></Text>
									<Text>Def Power: <RaceBonus value={race.mod_defense} /></Text>
									<Text mt='sm'>{eraArray[empire.era].trpwiz}: <RaceBonus value={race.mod_magic} /></Text>
									<Popover withArrow shadow="md">
										<Popover.Target>
											<Anchor>{eraArray[empire.era].runes}: <RaceBonus value={race.mod_runepro + era.mod_runepro} /></Anchor>
										</Popover.Target>
										<Popover.Dropdown>
											<TinyAction title='Meditate' type='meditate' color='grape' empire={empire} />
										</Popover.Dropdown>
									</Popover>
								</Col>
								<Col span={5} align='right'>
									<Popover withArrow shadow="md">
										<Popover.Target>
											<Anchor >Industry: </Anchor>
										</Popover.Target>
										<Popover.Dropdown>
											<TinyAction title='Industry' type='industry' color='red' empire={empire} />
										</Popover.Dropdown>
									</Popover>
									<Text align='right'>{empire.trpArm.toLocaleString()}</Text>
									<Text align='right'>{empire.trpLnd.toLocaleString()}</Text>
									<Text align='right'>{empire.trpFly.toLocaleString()}</Text>
									<Text align='right'>{empire.trpSea.toLocaleString()}</Text>
									<Text align='right'> </Text>
									<Text align='right' mt='sm'>{oPower.toLocaleString()}</Text>
									<Text align='right'>{dPower.toLocaleString()}</Text>
									<Text align='right' mt='sm'>{empire.trpWiz.toLocaleString()}</Text>
									<Text align='right'>{empire.runes.toLocaleString()}</Text>
								</Col>

								<Col span={3}>
									<Popover withArrow shadow="md" withinPortal>
										<Popover.Target>
											<Anchor>
												<Text align='right'><RaceBonus value={race.mod_industry + era.mod_industry} /></Text>
												<Text align='right'>{empire.indArmy}%</Text>
												<Text align='right'>{empire.indLnd}%</Text>
												<Text align='right'>{empire.indFly}%</Text>
												<Text align='right'>{empire.indSea}%</Text>
											</Anchor>
										</Popover.Target>
										<Popover.Dropdown>
											<IndyRates tiny empire={empire} />
										</Popover.Dropdown>
									</Popover>
								</Col>
							</Grid>
						</Card>
						<Card sx={{ width: '380px', minHeight: '295px' }}>
							<Text weight={800} size='lg'>
								Relations
							</Text>
							<Grid columns={14}>
								<Col span={7}>
									<Text>Member of Clan:</Text>
									<Text>Role:</Text>
									<Text>Enemies:</Text>
									<Text mt='sm'>Offensive Actions:</Text>
									<Text>Defenses:</Text>
									{/* <Text>Kills:</Text> */}
								</Col>
								<Col span={7}>
									<Text align='right'>{clan ? (clan.clanName) : ('None')}</Text>
									<Text align='right'>{clan ? (clanRole(empire.id, clan)) : 'None'}</Text>
									<Text align='right'>{enemies}</Text>
									<Text align='right' mt='sm'>{empire.offTotal} ({empire.offSucc ? Math.round(empire.offSucc / empire.offTotal * 100) : ('0')}%)</Text>
									<Text align='right'>{empire.defTotal} ({empire.defSucc ? Math.round(empire.defSucc / empire.defTotal * 100) : ('0')}%)</Text>
									{/* <Text align='right'>{empire.kills}</Text> */}
								</Col>
							</Grid>
						</Card>
					</Group>

				</div>
			</Stack>

		</main >
	)
}
