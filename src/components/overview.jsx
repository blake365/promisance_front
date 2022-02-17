import
{
	Button,
	Group,
	Title,
	Card,
	SimpleGrid,
	Text,
	Badge,
	useMantineTheme,
} from '@mantine/core'
import { useDispatch, useSelector } from 'react-redux'
import { empireLoaded } from '../store/empireSlice'
import Axios from 'axios'

import
{
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


const NetProduced = (props) =>
{
	return (
		<>
			<Text>{props.title}:</Text>
			<Text
				align='right'
				style={props.value >= 0 ? { color: 'green' } : { color: 'red' }}
				weight={600}
			>
				{props.value <= 0 ? '' : '+'}
				{props.money && '$'}
				{props.value.toLocaleString()}
			</Text>
		</>
	)
}


export default function Overview()
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

	function generalLog(number, base)
	{
		return Math.log(base) / Math.log(number)
	}

	const calcSizeBonus = ({ networth }) =>
	{
		let net = Math.max(networth, 1)
		let size = Math.atan(generalLog(net, 1000) - 1) * 2.1 - 0.65
		size = Math.round(Math.min(Math.max(0.5, size), 1.7) * 1000) / 1000
		return size
	}

	let size = calcSizeBonus(empire)
	// console.log(size)

	const calcPCI = (empire) =>
	{
		const { bldCash, land } = empire
		return Math.round(25 * (1 + bldCash / Math.max(land, 1)))
	}

	let cpi = calcPCI(empire)

	// takes place of calcFinances function
	let income = Math.round(
		(cpi *
			(empire.tax / 100) *
			(empire.health / 100) *
			empire.peasants +
			empire.bldCash * 500) / size
	)

	// let loan = Math.round(empire.loan / 200)

	let expenses = Math.round(
		empire.trpArm * 1 +
		empire.trpLnd * 2.5 +
		empire.trpFly * 4 +
		empire.trpSea * 7 +
		empire.land * 8 +
		empire.trpWiz * 0.5
	)

	//TODO: set up race/era modifier
	let expensesBonus = Math.min(0.5, empire.bldCost / Math.max(empire.land, 1))

	expenses -= Math.round(expenses * expensesBonus)

	// takes place of calcProvisions function
	let production =
		10 * empire.freeLand +
		empire.bldFood *
		85 *
		Math.sqrt(1 - (0.75 * empire.bldFood) / Math.max(empire.land, 1))
	// production *= food production modifier
	let foodpro = Math.round(production)

	let consumption =
		empire.trpArm * 0.05 +
		empire.trpLnd * 0.03 +
		empire.trpFly * 0.02 +
		empire.trpSea * 0.01 +
		empire.peasants * 0.01 +
		empire.trpWiz * 0.25
	// consumption *= food consumption modifier
	let foodcon = Math.round(consumption)

	let loanpayed = 0

	return (
		<main>
			<Group direction='column' spacing='sm' align='center' grow>
				<Title order={1} align='center'>
					Overview
				</Title>
				<Button onClick={loadEmpireTest}>Load Empire Test</Button>

				{empire && (
					<Card shadow='sm' padding='lg'>

						<Group direction='column' grow>
							<div>
								<Text weight={800} size='lg' align='center'>
									{empire.name} (#{empire.id})
								</Text>
								<SimpleGrid cols={2} spacing={1}>
									<Text>Turns:</Text>
									<Text align='right'>{empire.turns.toLocaleString()}{' '}({empire.storedturns} stored)</Text>
									<Text>Turns Used:</Text>
									<Text align='right'>{empire.turnsUsed.toLocaleString()}</Text>
									<Text>Health:</Text>
									<Text align='right'>{empire.health}</Text>
									<Text>Networth:</Text>
									<Text align='right'>{empire.networth}</Text>
									<Text>Population:</Text>
									<Text align='right'>{empire.peasants}</Text>
									<Text>Race:</Text>
									<Text align='right'>{empire.race}</Text>
									<Text>Era:</Text>
									<Text align='right'>{empire.era}</Text>


								</SimpleGrid>

							</div>

							<div>
								<Text weight={800} size='lg'>Agriculture:</Text>
								<SimpleGrid cols={2} spacing={1}>
									<Text>Food:</Text>
									<Text align='right'>{empire.food.toLocaleString()}</Text>
									<Text>Est. Production:</Text>
									<Text align='right'>{foodpro.toLocaleString()}</Text>
									<Text>Est. Consumption:</Text>
									<Text align='right'>{foodcon.toLocaleString()}</Text>

									<NetProduced title='Net' value={foodpro - foodcon} />
								</SimpleGrid>
							</div>

							<div>
								<Text weight={800} size='lg'>Economy:</Text>
								<SimpleGrid cols={2} spacing={1}>
									<Text>Money:</Text>
									<Text align='right'>${empire.cash.toLocaleString()}</Text>
									<Text>Per Capita Income:</Text>
									<Text align='right'>${cpi.toLocaleString()}</Text>
									<Text>Est. Income:</Text>
									<Text align='right'>${income.toLocaleString()}</Text>
									<Text>Est. Expenses:</Text>
									<Text align='right'>${expenses.toLocaleString()}</Text>
									{loanpayed > 0 ? (
										<>
											<Text>Loan Payment:</Text>
											<Text align='right'>${loanpayed.toLocaleString()}</Text>
										</>
									) : (
										''
									)}

									<NetProduced title='Net' value={income - expenses} money />
									<Text>Savings Balance:</Text>
									<Text align='right'>$XXXXX</Text>
									<Text>Loan Balance:</Text>
									<Text align='right'>$XXXXX</Text>
								</SimpleGrid>
							</div>

							<div>
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
							</div>
							<div>
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
							</div>
						</Group>
					</Card>
				)}
			</Group>
		</main>
	)
}
