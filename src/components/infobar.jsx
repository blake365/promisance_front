import { Paper, SimpleGrid, Text } from '@mantine/core'
import { useSelector } from 'react-redux'

export default function InfoBar() {
	// const empire = {
	// 	id: 3,
	// 	uuid: '3b207ad3-0e7b-4f68-8ecb-982da364f035',
	// 	createdAt: '2022-01-20T00:30:24.633Z',
	// 	updatedAt: '2022-01-22T06:08:11.915Z',
	// 	empireId: 3,
	// 	clanId: 0,
	// 	clanOldId: 0,
	// 	attacks: 0,
	// 	bank: 0,
	// 	bldCash: 2000,
	// 	bldCost: 2000,
	// 	bldDef: 0,
	// 	bldFood: 2000,
	// 	bldPop: 2000,
	// 	bldTroop: 2000,
	// 	bldWiz: 2000,
	// 	cash: 1000000,
	// 	defSucc: 0,
	// 	defTotal: 0,
	// 	era: 1,
	// 	flags: 0,
	// 	food: 50000,
	// 	freeLand: 2000,
	// 	health: 100,
	// 	e_id: 0,
	// 	idle: 0,
	// 	indArmy: 25,
	// 	indFly: 25,
	// 	indLnd: 25,
	// 	indSea: 25,
	// 	killClan: 0,
	// 	killedBy: 0,
	// 	kills: 0,
	// 	land: 14000,
	// 	loan: 0,
	// 	mktArm: 0,
	// 	mktFly: 0,
	// 	mktFood: 0,
	// 	mktLnd: 0,
	// 	mktSea: 0,
	// 	mktPerArm: 0,
	// 	mktPerFly: 0,
	// 	mktPerLnd: 0,
	// 	mktPerSea: 0,
	// 	name: 'Yikay',
	// 	networth: 0,
	// 	offSucc: 0,
	// 	offTotal: 0,
	// 	peasants: 20000,
	// 	race: 'Elf',
	// 	rank: 0,
	// 	reason: 0,
	// 	runes: 1000,
	// 	score: 0,
	// 	sharing: 0,
	// 	tax: 10,
	// 	trpArm: 500,
	// 	trpFly: 500,
	// 	trpLnd: 500,
	// 	trpSea: 500,
	// 	trpWiz: 0,
	// 	turns: 1000,
	// 	turnsUsed: 0,
	// 	vacation: 0,
	// 	valCode: 0,
	// }

	const empire = useSelector((state) => state.empire)

	return (
		<Paper padding='xs' shadow='xs' radius='xs' withBorder>
			<SimpleGrid
				cols={6}
				spacing='xs'
				breakpoints={[
					{ maxWidth: 755, cols: 6 },
					{ maxWidth: 600, cols: 3 },
				]}
			>
				<div>
					<Text weight='bold' align='center'>
						Turns:
					</Text>
					<Text align='center'>{empire.turns}</Text>
				</div>
				<div>
					<Text weight='bold' align='center'>
						Land:
					</Text>{' '}
					<Text align='center'>{empire.land}</Text>
				</div>
				<div>
					<Text weight='bold' align='center'>
						Money:
					</Text>{' '}
					<Text align='center'>${empire.cash}</Text>
				</div>
				<div>
					<Text weight='bold' align='center'>
						Food:
					</Text>{' '}
					<Text align='center'>{empire.food}</Text>
				</div>
				<div>
					<Text weight='bold' align='center'>
						Mana:
					</Text>{' '}
					<Text align='center'>{empire.runes}</Text>
				</div>
				<div>
					<Text weight='bold' align='center'>
						Networth:
					</Text>{' '}
					<Text align='center'>${empire.networth}</Text>
				</div>
			</SimpleGrid>
		</Paper>
	)
}
