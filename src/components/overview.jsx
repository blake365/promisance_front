import
{
	Title,
	Card,
	SimpleGrid,
	Grid,
	Text,
	Group, Col, Avatar
} from '@mantine/core'
import { useSelector } from 'react-redux'

import { eraArray } from '../config/eras'
import { raceArray } from '../config/races'

import { calcSizeBonus, calcPCI, explore, calcFinances, calcProvisions, offense, defense } from '../functions/functions'
import NetProduced from './utilities/NetProduced'
import { BASE_LUCK } from '../config/config'

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

	let size = calcSizeBonus(empire)
	// console.log(size)
	// let sizeTest1 = calcSizeBonus({ networth: 1000000 })
	// console.log(sizeTest1)
	// let sizeTest2 = calcSizeBonus({ networth: 11347620 })
	// console.log(sizeTest2)
	// let sizeTest3 = calcSizeBonus({ networth: 1348927109 })
	// console.log(sizeTest3)
	// let sizeTest4 = calcSizeBonus({ networth: 1000000000 })
	// console.log(sizeTest4)

	let cpi = calcPCI(empire)

	const newLand = explore(empire)

	const { income, expenses, loanpayed } = calcFinances(cpi, empire, size)

	const { foodpro, foodcon } = calcProvisions(empire)

	const oPower = offense(empire)

	const dPower = defense(empire)

	const race = raceArray[empire.race]
	const era = eraArray[empire.era]

	let luck = Math.round(BASE_LUCK / size)


	return (
		<main>
			<Title order={1} align='center' mb='sm'>
				Overview
			</Title>

			{empire && (
				<div>
					<Group spacing='sm' align='center' position='center' mb='sm'>
						<Card sx={{ width: '400px', minHeight: '285px' }}>
							<Group position='left' spacing={4}>
								<Avatar size="xs" src={empire.profileIcon} sx={{ backgroundColor: 'rgba(255, 255, 255, 0.66)' }} />
								<Text weight={800} size='lg'>
									{empire.name} (#{empire.id})
								</Text>
							</Group>
							<SimpleGrid cols={2} spacing={1}>
								<Text>Turns:</Text>
								<Text align='right'>{empire.turns.toLocaleString()}{' '}({empire.storedturns} stored)</Text>
								<Text>Turns Used:</Text>
								<Text align='right'>{empire.turnsUsed.toLocaleString()}</Text>
								<Text>Health:</Text>
								<Text align='right'>{empire.health}%</Text>
								<Text>Networth:</Text>
								<Text align='right'>${empire.networth.toLocaleString()}</Text>
								<Text>Population:</Text>
								<Text align='right'>{empire.peasants.toLocaleString()}</Text>
								<Text>Race:</Text>
								<Text align='right'>{raceArray[empire.race].name}</Text>
								<Text>Era:</Text>
								<Text align='right'>{eraArray[empire.era].name}</Text>
							</SimpleGrid>
						</Card>

						<Card sx={{ width: '400px', minHeight: '285px' }}>
							<Text weight={800} size='lg'>Agriculture</Text>
							<SimpleGrid cols={2} spacing={1}>
								<Text>Food:</Text>
								<Text align='right'>{empire.food.toLocaleString()}</Text>
								<Text>Production: <RaceBonus value={race.mod_foodpro + era.mod_foodpro} /></Text>
								<Text align='right'>{foodpro.toLocaleString()}</Text>
								<Text>Consumption: <RaceBonus value={race.mod_foodcon} /></Text>
								<Text align='right'>{foodcon.toLocaleString()}</Text>
								<NetProduced title='Net' value={foodpro - foodcon} />

								<Text mt='md' weight={800} size='lg'>Other</Text>
								<Text></Text>
								<Text align='left'>Explore: <RaceBonus value={era.mod_explore + race.mod_explore} />
								</Text>
								<Text align='right'>+{newLand} acres</Text>
								<Text align='left'>Black Market: <RaceBonus value={race.mod_market} /></Text>
								<Text></Text>
								<Text align='left'>Luck: <RaceBonus value={luck} /></Text>
							</SimpleGrid>
						</Card>

						<Card sx={{ width: '400px', minHeight: '285px' }}>
							<Text weight={800} size='lg'>Economy</Text>
							<SimpleGrid cols={2} spacing={1}>
								<Text>Money:</Text>
								<Text align='right'>${empire.cash.toLocaleString()}</Text>
								<Text>Per Capita Income:</Text>
								<Text align='right'>${cpi.toLocaleString()}</Text>
								<Text>Income: <RaceBonus value={race.mod_income + era.mod_cashpro} /></Text>
								<Text align='right'>${income.toLocaleString()}</Text>
								<Text>Expenses: <RaceBonus value={race.mod_expenses} /></Text>
								<Text align='right'>${expenses.toLocaleString()}</Text>
								<Text>Loan Payment:</Text>
								<Text align='right'>${Math.abs(loanpayed).toLocaleString()}</Text>
								<NetProduced title='Net' value={income - expenses - Math.abs(loanpayed)} money />
								<Text>Savings Balance:</Text>
								<Text align='right'>${empire.bank.toLocaleString()}</Text>
								<Text>Loan Balance:</Text>
								<Text align='right'>${empire.loan.toLocaleString()}</Text>

							</SimpleGrid>
						</Card>

						<Card sx={{ width: '400px', minHeight: '285px' }}>

							<Grid columns={16}>
								<Col span={8}>
									<Text weight={800} size='lg'>
										Land Division
									</Text>

									<Text>{eraArray[empire.era].bldpop}:</Text>
									<Text>{eraArray[empire.era].bldcash}:</Text>
									<Text>{eraArray[empire.era].bldcost}:</Text>
									<Text>{eraArray[empire.era].bldtrp}:</Text>
									<Text>{eraArray[empire.era].bldwiz}:</Text>
									<Text>{eraArray[empire.era].bldfood}:</Text>
									<Text>{eraArray[empire.era].blddef}:</Text>
									<Text>Unused Land:</Text>
									<Text>Total Land:</Text>
								</Col>
								<Col span={5}>
									<Text align='right'>Build Rate: </Text>
									<Text align='right'>{empire.bldPop.toLocaleString()}</Text>
									<Text align='right'>{empire.bldCash.toLocaleString()}</Text>
									<Text align='right'>{empire.bldCost.toLocaleString()}</Text>
									<Text align='right'>{empire.bldTroop.toLocaleString()}</Text>
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
									<Text align='right'>{Math.round(empire.bldCost / empire.land * 100)}%</Text>
									<Text align='right'>{Math.round(empire.bldTroop / empire.land * 100)}%</Text>
									<Text align='right'>{Math.round(empire.bldWiz / empire.land * 100)}%</Text>
									<Text align='right'>{Math.round(empire.bldFood / empire.land * 100)}%</Text>
									<Text align='right'>{Math.round(empire.bldDef / empire.land * 100)}%</Text>
									<Text align='right'>{Math.round(empire.freeLand / empire.land * 100)}%</Text>
									<Text align='right'> </Text>
								</Col>
							</Grid>
						</Card>
						<Card sx={{ width: '400px', minHeight: '285px' }}>


							<Grid columns={14}>
								<Col span={7}>
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
									<Text>{eraArray[empire.era].runes}: <RaceBonus value={race.mod_runepro + era.mod_runepro} /></Text>
								</Col>
								<Col span={7}>
									<Text align='right'>Industry: <RaceBonus value={race.mod_industry + era.mod_industry} /></Text>
									<Text align='right'>{empire.trpArm.toLocaleString()}</Text>
									<Text align='right'>{empire.trpLnd.toLocaleString()}</Text>
									<Text align='right'>{empire.trpFly.toLocaleString()}</Text>
									<Text align='right'>{empire.trpSea.toLocaleString()}</Text>

									<Text align='right'> </Text>
									<Text align='right' mt='sm'>{oPower.toLocaleString()}</Text>
									<Text align='right'>{dPower.toLocaleString()}</Text>
									<Text align='right' mt='sm'>{empire.trpWiz.toLocaleString()}</Text>
									<Text align='right' >{empire.runes.toLocaleString()}</Text>
								</Col>

							</Grid>
						</Card>
						<Card sx={{ width: '400px', minHeight: '285px' }}>
							<Text weight={800} size='lg'>
								Relations
							</Text>
							<Grid columns={14}>
								<Col span={7}>
									<Text>Member of Clan:</Text>
									<Text>Allies:</Text>
									<Text>Enemies:</Text>

									<Text mt='sm'>Offensive Actions:</Text>
									<Text>Defenses:</Text>
									{/* <Text>Kills:</Text> */}
								</Col>
								<Col span={7}>
									<Text align='right'>None</Text>
									<Text align='right'>None</Text>
									<Text align='right'>None</Text>

									<Text align='right' mt='sm'>{empire.offTotal} ({Math.round(empire.offSucc / empire.offTotal * 100)}%)</Text>
									<Text align='right'>{empire.defTotal} ({Math.round(empire.defSucc / empire.defTotal * 100)}%)</Text>
									{/* <Text align='right'>{empire.kills}</Text> */}
								</Col>
							</Grid>
						</Card>
					</Group>

				</div>
			)}
		</main >
	)
}
