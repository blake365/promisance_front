import
{
	Card,
	Text,
	SimpleGrid,
} from '@mantine/core'


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

const spellResult = (result) =>
{
	if (result.result === 'success') {
		if (result.food) {
			return (<>
				<Text align='center' weight='bold'>{result.message}<span style={{ color: 'green' }}> {result.food.toLocaleString()}</span> {result.descriptor}.</Text>
			</>)
		} else if (result.cash) {
			return (<>
				<Text align='center' weight='bold'>{result.message}<span style={{ color: 'green' }}> ${result.cash.toLocaleString()}</span>.</Text>
			</>)
		} else {
			// covers time era changes
			return (<>
				<Text align='center' weight='bold'>{result.message}</Text>
			</>)
		}
	} else if (result.result === 'fail') {
		//TODO: untested
		return (<>
			<Text align='center' weight='bold' color='red'>The spell was unsuccessful! {result.wizloss.toLocaleString()} {result.descriptor} died in the explosion.</Text>
		</>)
	}
}



export default function TurnResultCard({ data })
{
	// console.log(data)
	return (
		<>
			{data.error ? (<Card shadow='sm' padding='sm' withBorder sx={(theme) => ({
				backgroundColor: theme.colors.gray[1],
				'&:hover': {
					backgroundColor: theme.colors.gray[2],
				},
			})}>
				<Text align='center' color='red'>{data.error}</Text>
			</Card>) :
				(<div style={{ margin: 'auto', marginTop: '1rem' }}>
					<Card shadow='sm' padding='sm' withBorder sx={(theme) => ({
						backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : '',
						'&:hover': {
							backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
						},
					})}>
						{data.cast && spellResult(data.cast)}
						{data.withdraw > 0 ? <Text align='center' color='orange'>Your savings balance has exceeded the limit. ${data.withdraw.toLocaleString()} has been returned to you.</Text> : ''}


						<SimpleGrid
							cols={3}
							spacing='xs'
							breakpoints={[
								{ maxWidth: 755, cols: 3 },
								{ maxWidth: 600, cols: 1 },
							]}
						>
							<div>
								<Text weight={800}>Economy:</Text>
								<SimpleGrid cols={2} spacing={1}>
									<Text>Income:</Text>
									<Text align='right'>${data.income.toLocaleString()}</Text>
									<Text>Expenses:</Text>
									<Text align='right'>${data.expenses.toLocaleString()}</Text>
									{data.loanpayed > 0 ? (
										<>
											<Text>Loan Payment:</Text>
											<Text align='right'>${data.loanpayed.toLocaleString()}</Text>
										</>
									) : (
										''
									)}

									<NetProduced title='Net' value={data.money} money />
								</SimpleGrid>
							</div>
							<div>
								<Text weight={800}>Agriculture:</Text>
								<SimpleGrid cols={2} spacing={1}>
									<Text>Produced:</Text>
									<Text align='right'>{data.foodpro.toLocaleString()}</Text>
									<Text>Consumed:</Text>
									<Text align='right'>{data.foodcon.toLocaleString()}</Text>

									<NetProduced title='Net' value={data.food} />
								</SimpleGrid>
							</div>
							<div>
								<Text weight={800}>Population and Military:</Text>
								<SimpleGrid cols={2} spacing={1}>
									{data.peasants !== 0 ? (<NetProduced value={data.peasants} title='Peasants' />) : ('')
									}
									{data.trpArm !== 0 ? (<NetProduced value={data.trpArm} title='Footmen' />) : ('')
									}
									{data.trpLnd !== 0 ? (<NetProduced value={data.trpLnd} title='Catapults' />) : ('')
									}
									{data.trpFly !== 0 ? (<NetProduced value={data.trpFly} title='Zeppelins' />) : ('')
									}
									{data.trpSea !== 0 ? (<NetProduced value={data.trpSea} title='Galleons' />) : ('')
									}
									{data.trpWiz !== 0 ? (<NetProduced value={data.trpWiz} title='Wizards' />) : ('')
									}
									{data.runes !== 0 ? (<NetProduced value={data.runes} title='Mana' />) : ('')}
								</SimpleGrid>
							</div>
						</SimpleGrid>
					</Card>
				</div>)}

		</>
	)
}
