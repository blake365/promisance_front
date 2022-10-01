import { Paper, Grid, Text } from '@mantine/core'
import { eraArray } from '../../config/eras'


export default function InfoBar({ data })
{
	// console.log(data.empire)
	const empire = data
	return (
		<Paper p='xs' shadow='xs' radius='xs' withBorder >
			<Grid justify="space-between" grow columns={19}
			// cols={7}
			// spacing='xs'
			// breakpoints={[
			// 	{ maxWidth: 755, cols: 6 },
			// 	{ maxWidth: 600, cols: 3 },
			// ]}
			>
				{/* <div>
					<Text weight='bold' align='center' color={eraArray[empire.era].color}>
						Mail:
					</Text>
					<Text align='center'>Mail</Text>
				</div> */}
				<Grid.Col span={2}>
					<Text weight='bold' align='center' color={eraArray[empire.era].color}>
						Turns:
					</Text>
					<Text align='center'>{empire.turns}</Text>
				</Grid.Col>
				<Grid.Col span={3}>
					<Text weight='bold' align='center' color={eraArray[empire.era].color}>
						Land:
					</Text>{' '}
					<Text align='center'>{empire.land.toLocaleString()}</Text>
				</Grid.Col>
				<Grid.Col span={3}>
					<Text weight='bold' align='center' color={eraArray[empire.era].color}>
						Money:
					</Text>{' '}
					<Text align='center'>${empire.cash.toLocaleString()}</Text>
				</Grid.Col>
				<Grid.Col span={3}>
					<Text weight='bold' align='center' color={eraArray[empire.era].color}>
						{eraArray[empire.era].food}:
					</Text>{' '}
					<Text align='center'>{empire.food.toLocaleString()}</Text>
				</Grid.Col>
				<Grid.Col span={3}>
					<Text weight='bold' align='center' color={eraArray[empire.era].color}>
						{eraArray[empire.era].runes}:
					</Text>{' '}
					<Text align='center'>{empire.runes.toLocaleString()}</Text>
				</Grid.Col>
				<Grid.Col span={2}>
					<Text weight='bold' align='center' color={eraArray[empire.era].color}>
						Health:
					</Text>{' '}
					<Text align='center'>{empire.health}%</Text>
				</Grid.Col>
				<Grid.Col span={3}>
					<Text weight='bold' align='center' color={eraArray[empire.era].color}>
						Networth:
					</Text>{' '}
					<Text align='center'>${empire.networth.toLocaleString()}</Text>
				</Grid.Col>
			</Grid>
		</Paper>
	)
}
