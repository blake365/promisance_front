import {
	Button,
	Grid,
	Group,
	Table,
	Title,
	Card,
	Image,
	Text,
	Badge,
	useMantineTheme,
} from '@mantine/core'
import { useDispatch, useSelector } from 'react-redux'
import { empireLoaded } from '../store/empireSlice'
import Axios from 'axios'
import { PureComponent } from 'react'

import {
	BarChart,
	Bar,
	Cell,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from 'recharts'

export default function Overview() {
	const dispatch = useDispatch()

	const loadEmpireTest = async () => {
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

	const theme = useMantineTheme()

	const secondaryColor =
		theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7]

	const landBarColors = [
		'#1982C4',
		'#FFCA3A',
		'#FF595E',
		'#3E687A',
		'#6A4C93',
		'#8AC926',
		'#553D36',
		'#000000',
	]

	const landData = [
		{
			name: 'huts',
			amount: empire?.bldPop,
			icon: '🛖',
		},
		{
			name: 'markets',
			amount: empire?.bldCash,
			icon: '💰',
		},
		{
			name: 'blacksmiths',
			amount: empire?.bldTroop,
			icon: '🏭',
		},
		{
			name: 'keeps',
			amount: empire?.bldCost,
			icon: '🏰',
		},
		{
			name: 'mage towers',
			amount: empire?.bldWiz,
			icon: '🪄',
		},
		{
			name: 'farms',
			amount: empire?.bldFood,
			icon: '🌾',
		},
		{
			name: 'guard towers',
			amount: empire?.bldDef,
			icon: '💂‍♀️',
		},
		{
			name: 'open land',
			amount: empire?.freeLand,
			icon: '⛰',
		},
	]

	const troopBarColors = ['#4A5043', '#D73909', '#E09D00', '#008FCC', '#573E79']

	const militaryData = [
		{
			name: 'footmen',
			amount: empire?.trpArm,
			networth: empire.trpArm * 1,
		},
		{
			name: 'catapults',
			amount: empire?.trpLnd,
			networth: empire?.trpLnd * 2,
		},
		{
			name: 'zeppelins',
			amount: empire?.trpFly,
			networth: empire?.trpFly * 4,
		},
		{
			name: 'galleons',
			amount: empire?.trpSea,
			networth: empire?.trpSea * 6,
		},
		{
			name: 'wizards',
			amount: empire?.trpWiz,
			networth: empire?.trpWiz * 2,
		},
	]

	return (
		<main>
			<Group direction='column' spacing='sm' align='center' grow>
				<Title order={1} align='center'>
					Overview
				</Title>
				<Button onClick={loadEmpireTest}>Load Empire Test</Button>

				{empire && (
					<Card shadow='sm' padding='lg'>
						<Card.Section>
							<Group>
								<h3>
									{empire.name} (#{empire.id})
								</h3>

								<Badge color='pink' variant='light'>
									{empire.race}
								</Badge>
							</Group>
						</Card.Section>
						<Card.Section>
							<Text weight={500}>Agriculture</Text>
							<Group></Group>
						</Card.Section>
						<Card.Section>
							<Text weight={500}>Finance</Text>
							<Group></Group>
						</Card.Section>
						<Card.Section>
							<Text weight={500} align='center'>
								Land Division
							</Text>
							<BarChart
								width={500}
								height={300}
								data={landData}
								margin={{
									top: 5,
									right: 30,
									left: 20,
									bottom: 5,
								}}
							>
								<CartesianGrid strokeDasharray='3 3' />
								<XAxis dataKey='icon' interval={0} />
								<YAxis
								// formatter={(value) =>
								// 	new Intl.NumberFormat('en').format(value)
								// }
								/>
								<Tooltip
									formatter={(value) =>
										new Intl.NumberFormat('en').format(value)
									}
								/>
								<Bar dataKey='amount'>
									{landData.map((entry, index) => (
										<Cell key={`cell-${index}`} fill={landBarColors[index]} />
									))}
								</Bar>
							</BarChart>
						</Card.Section>
						<Card.Section>
							<Text weight={500} align='center'>
								Military
							</Text>
							<BarChart
								width={500}
								height={300}
								data={militaryData}
								margin={{
									top: 5,
									right: 30,
									left: 20,
									bottom: 5,
								}}
							>
								<CartesianGrid strokeDasharray='3 3' />
								<XAxis dataKey='name' interval={0} />
								<YAxis yAxisId='left' orientation='left' stroke='#8884d8' />
								<YAxis yAxisId='right' orientation='right' stroke='#82ca9d' />
								<Tooltip
									formatter={(value) =>
										new Intl.NumberFormat('en').format(value)
									}
								/>
								<Legend />
								<Bar dataKey='amount' yAxisId='left' fill='#8884d8'>
									{landData.map((entry, index) => (
										<Cell key={`cell-${index}`} fill={troopBarColors[index]} />
									))}
								</Bar>
								<Bar dataKey='networth' yAxisId='right' fill='#82ca9d' />
							</BarChart>
						</Card.Section>
					</Card>
				)}
			</Group>
		</main>
	)
}
