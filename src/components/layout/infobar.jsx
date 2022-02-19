import { Paper, SimpleGrid, Text } from '@mantine/core'

export default function InfoBar({ data })
{
	// console.log(data.empire)
	const empire = data.empire
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
					<Text align='center'>{empire.land.toLocaleString()}</Text>
				</div>
				<div>
					<Text weight='bold' align='center'>
						Money:
					</Text>{' '}
					<Text align='center'>${empire.cash.toLocaleString()}</Text>
				</div>
				<div>
					<Text weight='bold' align='center'>
						Food:
					</Text>{' '}
					<Text align='center'>{empire.food.toLocaleString()}</Text>
				</div>
				<div>
					<Text weight='bold' align='center'>
						Mana:
					</Text>{' '}
					<Text align='center'>{empire.runes.toLocaleString()}</Text>
				</div>
				<div>
					<Text weight='bold' align='center'>
						Networth:
					</Text>{' '}
					<Text align='center'>${empire.networth.toLocaleString()}</Text>
				</div>
			</SimpleGrid>
		</Paper>
	)
}
