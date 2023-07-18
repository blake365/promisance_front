import { Paper, Grid, Text, Center } from '@mantine/core'
import { eraArray } from '../../config/eras'
import { Mountains, Coins, Scales, ForkKnife, Brain, Heart, GitBranch } from "@phosphor-icons/react"

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
					<Center>
						<GitBranch size={20} color={eraArray[empire.era].color} />
						<Text weight='bold' align='center' color={eraArray[empire.era].color} ml={1}>
							Turns
						</Text>
					</Center>
					<Text align='center'>{empire.turns}</Text>
				</Grid.Col>
				<Grid.Col span={3}>
					<Center>
						<Scales size={20} color={eraArray[empire.era].color} />
						<Text weight='bold' align='center' color={eraArray[empire.era].color} ml={2}>
							Net Worth
						</Text>
					</Center>
					<Text align='center'>${empire.networth.toLocaleString()}</Text>
				</Grid.Col>
				<Grid.Col span={3}>
					<Center>
						<Mountains size={20} color={eraArray[empire.era].color} />
						<Text weight='bold' align='center' color={eraArray[empire.era].color} ml={2}>
							Land
						</Text>
					</Center>
					<Text align='center'>{empire.land.toLocaleString()}</Text>
				</Grid.Col>
				<Grid.Col span={3}>
					<Center>
						<Coins size={20} color={eraArray[empire.era].color} />
						<Text weight='bold' align='center' color={eraArray[empire.era].color} ml={2}>
							Money
						</Text>
					</Center>

					<Text align='center'>${empire.cash.toLocaleString()}</Text>
				</Grid.Col>
				<Grid.Col span={3}>
					<Center>
						<ForkKnife size={20} color={eraArray[empire.era].color} />
						<Text weight='bold' align='center' color={eraArray[empire.era].color} ml={2}>
							{eraArray[empire.era].food}
						</Text>
					</Center>
					<Text align='center'>{empire.food.toLocaleString()}</Text>
				</Grid.Col>
				<Grid.Col span={3}>
					<Center>
						<Brain size={20} color={eraArray[empire.era].color} />
						<Text weight='bold' align='center' color={eraArray[empire.era].color} ml={2}>
							{eraArray[empire.era].runes}
						</Text>
					</Center>

					<Text align='center'>{empire.runes.toLocaleString()}</Text>
				</Grid.Col>
				<Grid.Col span={2}>
					<Center>
						<Heart size={20} color={eraArray[empire.era].color} />
						<Text weight='bold' align='center' color={eraArray[empire.era].color} ml={2}>
							Health
						</Text>
					</Center>

					<Text align='center'>{empire.health}%</Text>
				</Grid.Col>

			</Grid>
		</Paper>
	)
}
