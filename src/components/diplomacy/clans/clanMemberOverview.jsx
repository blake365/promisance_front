import
{
	Card,
	SimpleGrid,
	Grid,
	Text,
	Group, Col, Avatar
} from '@mantine/core'
import { useSelector } from 'react-redux'
import { eraArray } from '../../../config/eras'
import { raceArray } from '../../../config/races'
import { calcSizeBonus, calcPCI, explore, calcFinances, calcProvisions, offense, defense, calcCorruption, calcRot } from '../../../functions/functions'
import NetProduced from '../../utilities/NetProduced'
import { useTranslation } from 'react-i18next'

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

export default function ClanMemberOverview({ empire })
{
	const { t } = useTranslation(['summary', 'eras'])
	const { baseLuck } = useSelector((state) => state.games.activeGame)
	// console.log(empire)
	const size = calcSizeBonus(empire)

	const cpi = calcPCI(empire)

	const newLand = explore(empire)

	const { income, expenses, loanpayed } = calcFinances(cpi, empire, size)

	// let corruption = 0
	// if (empire.cash > empire.networth * 110) {
	// 	let multiples = Math.floor(empire.cash / empire.networth) - 1
	// 	corruption = Math.round(multiples * empire.networth * 0.001)
	// }

	const corruption = calcCorruption(empire)

	const { foodpro, foodcon } = calcProvisions(empire)

	const rot = calcRot(empire, foodcon)

	const oPower = offense(empire)

	const dPower = defense(empire)

	const race = raceArray[empire.race]
	const era = eraArray[empire.era]
	const buildings = ['bldPop', 'bldCash', 'bldTrp', 'bldCost', 'bldWiz', 'bldFood', 'bldDef']

	const luck = Math.round(baseLuck / size)

	const clan = empire.clan

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

	const eraName = eraArray[empire.era].name.toLowerCase()


	return (
		<main>
			<Group spacing='sm' align='center' position='center' mb='sm'>
				<Card sx={{ width: '380px', minHeight: '295px' }}>
					<Group position='left' spacing={4}>
						<Avatar size="xs" src={empire.profileIcon} sx={(theme) => theme.colorScheme === 'dark' ? ({ filter: 'invert(1)', opacity: '75%' }) : ({ filter: 'invert(0)', })} />
						<Text weight={800} size='lg'>
							{empire.name}
						</Text>
					</Group>
					<SimpleGrid cols={2} spacing={1}>
						<Text>{t('summary:summary.turns')}:</Text>
						<Text align='right'>{empire.turns.toLocaleString()}{' '}({empire.storedturns} stored)</Text>
						<Text>{t('summary:summary.turnsUsed')}:</Text>
						<Text align='right'>{empire.turnsUsed.toLocaleString()}</Text>
						<Text>{t('summary:summary.health')}:</Text>
						<Text align='right'>{empire.health}%</Text>
						<Text>{t('summary:summary.networth')}:</Text>
						<Text align='right'>${empire.networth.toLocaleString()}</Text>
						<Text>{t('summary:summary.population')}:</Text>
						<Text align='right'>{empire.peasants.toLocaleString()}</Text>
						<Text>{t('summary:summary.race')}:</Text>
						<Text align='right'>{raceArray[empire.race].name}</Text>
						<Text>{t('summary:summary.era')}:</Text>
						<Text align='right'>{eraArray[empire.era].name}</Text>
						<Text>{t('summary:summary.tax')}:</Text>
						<Text align='right'>{empire.tax}%</Text>
						<Text align='left'>{t('summary:summary.luck')}: </Text><Text align='right'>{luck}%</Text>
					</SimpleGrid>
				</Card>

				<Card sx={{ width: '380px', minHeight: '295px' }}>
					<Text weight={800} size='lg'>Agriculture</Text>
					<SimpleGrid cols={2} spacing={1}>
						<Text>{t('summary:summary.food')}:</Text>
						<Text align='right'>{empire.food.toLocaleString()}</Text>
						<Text>{t('summary:summary.production')}: <RaceBonus value={race.mod_foodpro + era.mod_foodpro} /></Text>
						<Text align='right'>{foodpro.toLocaleString()}</Text>
						<Text>{t('summary:summary.consumption')}: <RaceBonus value={race.mod_foodcon} /></Text>
						<Text align='right'>{foodcon.toLocaleString()}</Text>
						<Text>{t('summary:summary.rot')}:</Text>
						<Text align='right'>{rot.toLocaleString()}</Text>
						<NetProduced title='Net' value={foodpro - foodcon - rot} />
						<Text mt='md' weight={800} size='lg'>{t('summary:summary.other')}</Text>
						<Text> </Text>
						<Text align='left'>{t('summary:summary.explore')}: <RaceBonus value={era.mod_explore + race.mod_explore} />
						</Text>
						<Text align='right'>+{newLand} acres</Text>
						<Text align='left'>{t('summary:summary.blackMarket')}: <RaceBonus value={race.mod_market} /></Text>
					</SimpleGrid>
				</Card>

				<Card sx={{ width: '380px', minHeight: '295px' }}>
					<Text weight={800} size='lg'>Economy</Text>
					<SimpleGrid cols={2} spacing={1}>
						<Text>{t('summary:summary.money')}:</Text>
						<Text align='right'>${empire.cash.toLocaleString()}</Text>
						<Text>{t('summary:summary.perCapitaIncome')}:</Text>
						<Text align='right'>${cpi.toLocaleString()}</Text>
						<Text>{t('summary:summary.income')}: <RaceBonus value={race.mod_income + era.mod_cashpro} /></Text>
						<Text align='right'>${income.toLocaleString()}</Text>
						<Text>{t('summary:summary.expenses')}: <RaceBonus value={race.mod_expenses} /></Text>
						<Text align='right'>${expenses.toLocaleString()}</Text>
						<Text>{t('summary:summary.corruption')}: </Text>
						<Text align='right'>${corruption.toLocaleString()}</Text>
						<Text>{t('summary:summary.loanPayment')}:</Text>
						<Text align='right'>${Math.abs(loanpayed).toLocaleString()}</Text>
						<NetProduced title='Net' value={income - expenses - Math.abs(loanpayed) - corruption} money />
						<Text>{t('summary:summary.savingsBalance')}:</Text>
						<Text align='right'>${empire.bank.toLocaleString()}</Text>
						<Text>{t('summary:summary.loanBalance')}:</Text>
						<Text align='right'>${empire.loan.toLocaleString()}</Text>
					</SimpleGrid>
				</Card>

				<Card sx={{ width: '380px', minHeight: '295px' }}>

					<Grid columns={16}>
						<Col span={8}>
							<Text weight={800} size='lg'>
								{t('summary:summary.landDivision')}
							</Text>
							{buildings.map((building, index) => (
								<div key={index}>
									<Text>{eraArray[empire.era][building.toLowerCase()]}:</Text>

								</div>
							))}
							<Text>{t('summary:summary.unusedLand')}:</Text>
							<Text>{t('summary:summary.totalLand')}:</Text>
						</Col>
						<Col span={5} mt={3}>
							<Text align='right'>{t('summary:summary.buildRate')}: </Text>
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
						<Col span={3} mt={3}>
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
								{t('summary:summary.military')}
							</Text>
							<Text>{t('eras:eras.${eraName}.trparm')}:</Text>
							<Text>{t('eras:eras.${eraName}.trplnd')}:</Text>
							<Text>{t('eras:eras.${eraName}.trpfly')}:</Text>
							<Text>{t('eras:eras.${eraName}.trpsea')}:</Text>
							<Text> </Text>
							<Text mt='sm'>{t('summary:summary.offPower')}: <RaceBonus value={race.mod_offense} /></Text>
							<Text>{t('summary:summary.defPower')}: <RaceBonus value={race.mod_defense} /></Text>
							<Text mt='sm'>{t(`eras:eras.${eraName}.trpwiz`)}: <RaceBonus value={race.mod_magic} /></Text>
							<Text>{t(`eras:eras.${eraName}.runes`)}: <RaceBonus value={race.mod_runepro + era.mod_runepro} /></Text>
						</Col>
						<Col span={5} align='right' mt={3}>
							<Text align='right'>{t('summary:summary.industry')}: </Text>
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
						<Col span={3} mt={3}>
							<Text align='right'><RaceBonus value={race.mod_industry + era.mod_industry} /></Text>
							<Text align='right'>{empire.indArmy}%</Text>
							<Text align='right'>{empire.indLnd}%</Text>
							<Text align='right'>{empire.indFly}%</Text>
							<Text align='right'>{empire.indSea}%</Text>
						</Col>
					</Grid>
				</Card>
				<Card sx={{ width: '380px', minHeight: '295px' }}>
					<Text weight={800} size='lg'>
						{t('summary:summary.relations')}
					</Text>
					<Grid columns={14}>
						<Col span={7}>
							<Text>{t('summary:summary.memberOfClan')}:</Text>
							<Text>{t('summary:summary.role')}:</Text>
							<Text>{t('summary:summary.enemies')}:</Text>
							<Text mt='sm'>{t('summary:summary.offensiveActions')}:</Text>
							<Text>{t('summary:summary.defenses')}:</Text>
							{/* <Text>Kills:</Text> */}
						</Col>
						<Col span={7}>
							<Text align='right' truncate={true}>{clan ? (clan.clanName) : ('None')}</Text>
							<Text align='right'>{clan ? (clanRole(empire.id, clan)) : 'None'}</Text>
							<Text align='right'>{enemies}</Text>
							<Text align='right' mt='sm'>{empire.offTotal} ({empire.offSucc ? Math.round(empire.offSucc / empire.offTotal * 100) : ('0')}%)</Text>
							<Text align='right'>{empire.defTotal} ({empire.defSucc ? Math.round(empire.defSucc / empire.defTotal * 100) : ('0')}%)</Text>
							{/* <Text align='right'>{empire.kills}</Text> */}
						</Col>
					</Grid>
				</Card>
			</Group>
		</main >
	)
}
