import
{
	Card,
	Text,
	SimpleGrid,
} from '@mantine/core'

import { eraArray } from '../../config/eras'
import NetProduced from '../utilities/NetProduced'

const attackResult = (result, era) =>
{
	if (result.result === 'success') {

		if (result.attackType === 'pillage') {
			let youLost = []
			let youKilled = []

			for (const key in result.troopLoss) {
				if (Object.prototype.hasOwnProperty.call(result.troopLoss, key)) {
					youLost.push(`${eraArray[era][key]}: ${result.troopLoss[key].toLocaleString()}`);
				}
			}

			for (const key in result.troopKilled) {
				if (Object.prototype.hasOwnProperty.call(result.troopKilled, key)) {
					youKilled.push(`${eraArray[era][key]}: ${result.troopKilled[key].toLocaleString()}`);
				}
			}

			return (<>
				<Text align='center' weight='bold'><span style={{ color: 'green' }}>{result.message}
				</span></Text>
				<Text align='center'>You lost: {youLost.map((item, index) =>
				{
					if (index === youLost.length - 1) { return (item) }
					else {
						return (item + ', ')
					}
				}
				)}</Text>
				<Text align='center'>You killed: {youKilled.map((item, index) =>
				{
					if (index === youKilled.length - 1) { return (item) }
					else {
						return (item + ', ')
					}
				}
				)}</Text>
			</>)
		}
		else if (result.attackType !== 'all out' && result.attackType !== 'surprise') {
			return (<>
				<Text align='center' weight='bold'><span style={{ color: 'green' }}>{result.message}
				</span></Text>
				<Text align='center' >You lost {result.troopLoss[result.attackType].toLocaleString()} {result.troopType}</Text>
				<Text align='center' >You killed {result.troopKilled[result.attackType].toLocaleString()} {result.troopType}</Text>
			</>)
		} else {
			// console.log(result)
			let youLost = []
			let youKilled = []
			let buildingsCaptured = []

			for (const key in result.troopLoss) {
				if (Object.prototype.hasOwnProperty.call(result.troopLoss, key)) {
					youLost.push(`${eraArray[era][key]}: ${result.troopLoss[key].toLocaleString()}`);
				}
			}

			for (const key in result.troopKilled) {
				if (Object.prototype.hasOwnProperty.call(result.troopKilled, key)) {
					youKilled.push(`${eraArray[era][key]}: ${result.troopKilled[key].toLocaleString()}`);
				}
			}

			for (const key in result.buildingGain) {
				if (Object.prototype.hasOwnProperty.call(result.buildingGain, key)) {
					let newKey = key.toLowerCase()
					let string = `${eraArray[era][newKey]}: ${result.buildingGain[key].toLocaleString()}`
					if (newKey === 'bldtroop') {
						string = `${eraArray[era].bldtrp}: ${result.buildingGain[key].toLocaleString()}`
					} else if (newKey === 'freeland') {
						string = `Free Land: ${result.buildingGain[key].toLocaleString()}`
					}
					buildingsCaptured.push(string);
				}
			}

			return (<>
				<Text align='center' weight='bold'><span style={{ color: 'green' }}>{result.message}
				</span></Text>
				<Text align='center'>You lost: {youLost.map((item, index) =>
				{
					if (index === youLost.length - 1) { return (item) }
					else {
						return (item + ', ')
					}
				}
				)}</Text>
				<Text align='center'>You killed: {youKilled.map((item, index) =>
				{
					if (index === youKilled.length - 1) { return (item) }
					else {
						return (item + ', ')
					}
				}
				)}</Text>
				{result.attackType !== 'surprise' && <Text align='center'>
					You captured: {buildingsCaptured.map((item, index) =>
					{
						if (index === buildingsCaptured.length - 1) { return (item) }
						else {
							return (item + ', ')
						}
					}
					)}
				</Text>}
			</>)
		}
	} else if (result.result === 'fail') {

		if (result.attackType === 'pillage' || result.attackType === 'surprise' || result.attackType === 'all out') {
			let youLost = []
			let youKilled = []

			for (const key in result.troopLoss) {
				if (Object.prototype.hasOwnProperty.call(result.troopLoss, key)) {
					youLost.push(`${eraArray[era][key]}: ${result.troopLoss[key].toLocaleString()}`);
				}
			}

			for (const key in result.troopKilled) {
				if (Object.prototype.hasOwnProperty.call(result.troopKilled, key)) {
					youKilled.push(`${eraArray[era][key]}: ${result.troopKilled[key].toLocaleString()}`);
				}
			}

			return (<>
				<Text align='center' weight='bold' color='red'>The attack was unsuccessful!</Text>
				<Text align='center'>You lost: {youLost.map((item, index) =>
				{
					if (index === youLost.length - 1) { return (item) }
					else {
						return (item + ', ')
					}
				}
				)}</Text>
				<Text align='center'>You killed: {youKilled.map((item, index) =>
				{
					if (index === youKilled.length - 1) { return (item) }
					else {
						return (item + ', ')
					}
				}
				)}</Text>
			</>)

		} else {
			return (<>
				<Text align='center' weight='bold' color='red'>The attack was unsuccessful!</Text>
				<Text align='center' >You lost {result.troopLoss[result.attackType].toLocaleString()} {result.troopType}</Text>
				<Text align='center' >You killed {result.troopKilled[result.attackType].toLocaleString()} {result.troopType}</Text>
			</>)
		}

	}
}

const spellResult = (result) =>
{
	// console.log(result)
	if (result.result === 'success' || result.result === 'shielded') {
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
			let lines = result.message.split('/n')
			return lines.map((line, index) =>
			{
				let weight = 'normal'
				if (index === 0) weight = 'bold'
				return <Text key={index} weight={weight} align='center'>{line}</Text>
			})
		}
	} else if (result.result === 'fail') {
		//untested
		return (<>
			<Text align='center' weight='bold' color='red'>The spell was unsuccessful! {result.wizloss.toLocaleString()} {result.descriptor} died in the explosion.</Text>
		</>)
	}
}

export default function TurnResultCard({ data, era })
{
	// console.log(data)
	return (
		<>
			{data.error ? (<Card shadow='sm' padding='sm' withBorder sx={(theme) => ({
				backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : '',
				'&:hover': {
					backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
				},
			})}>
				<Text align='center' color='red'>{data.error}</Text>
			</Card>) :
				(<div style={{ margin: 'auto', marginBottom: '1rem' }}>
					<Card shadow='sm' padding='sm' withBorder sx={(theme) => ({
						backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : '',
						'&:hover': {
							backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
						},
					})}>
						{data.type === 'explore' && <Text align='center' weight='bold' color='green'>You gained {data.result.toLocaleString()} acres while exploring</Text>}
						{data?.messages?.desertion && <Text align='center' color='red' weight='bold'>{data.messages.desertion}</Text>}
						{data.attack && attackResult(data.attack, era)}
						{data.cast && spellResult(data.cast)}
						{data.aid && data.aid.includes('successfully') ? (<Text align='center' weight='bold' color='green'>{data.aid}</Text>) : (<Text align='center' weight='bold' color='red'>{data.aid}</Text>)}
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
									{data.loanpayed !== 0 ? (
										<>
											<Text>Loan Payment:</Text>
											<Text align='right'>${(data.loanpayed).toLocaleString()}</Text>
										</>
									) : (
										''
									)}
									{data.loanInterest > 0 ? (
										<>
											<Text>Loan Interest:</Text>
											<Text align='right'>${(data.loanInterest).toLocaleString()}</Text>
										</>
									) : (
										''
									)}
									{data.corruption > 0 ? (<>
										<Text>Corruption:</Text>
										<Text align='right'>${(data.corruption).toLocaleString()}</Text>
									</>) : ('')}
									{data.wartax > 0 ? (<>
										<Text>War Tax:</Text>
										<Text align='right'>${(data.wartax).toLocaleString()}</Text>
									</>) : ('')}


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
									{data.peasants !== 0 ? (<NetProduced value={data.peasants} title={eraArray[era].peasants} />) : ('')
									}
									{data.trpArm !== 0 ? (<NetProduced value={data.trpArm} title={eraArray[era].trparm} />) : ('')
									}
									{data.trpLnd !== 0 ? (<NetProduced value={data.trpLnd} title={eraArray[era].trplnd} />) : ('')
									}
									{data.trpFly !== 0 ? (<NetProduced value={data.trpFly} title={eraArray[era].trpfly} />) : ('')
									}
									{data.trpSea !== 0 ? (<NetProduced value={data.trpSea} title={eraArray[era].trpsea} />) : ('')
									}
									{data.trpWiz !== 0 ? (<NetProduced value={data.trpWiz} title={eraArray[era].trpwiz} />) : ('')
									}
									{data.runes !== 0 ? (<NetProduced value={data.runes} title={eraArray[era].runes} />) : ('')}
								</SimpleGrid>
							</div>
						</SimpleGrid>
					</Card>
				</div>)}

		</>
	)
}
