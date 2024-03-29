import { Card, Grid, Stack, Table, Title, Group, Text, Avatar, Button, Center, ActionIcon, Tooltip } from '@mantine/core'
import { useSelector } from 'react-redux'
import { TURNS_COUNT, TURNS_FREQ, TURNS_MAXIMUM, TURNS_PROTECTION, TURNS_STORED } from '../config/config'
import { eraArray } from '../config/eras'
import { raceArray } from '../config/races'
import { Link } from 'react-router-dom'
import { useTour } from '@reactour/tour';
import { steps } from '../tour/steps'
import { Compass, Question } from '@phosphor-icons/react'
import { setBgImage } from '../functions/setBgImage'
import NewPlayerModal from './layout/newPlayerModal'

export default function Summary()
{
	const { empire } = useSelector((state) => state.empire)
	const { setIsOpen, setSteps, setMeta, setCurrentStep } = useTour()
	const { time } = useSelector((state) => state.time)

	const bgimage = setBgImage(empire)

	let roundStatus = 'Round has not started'
	let upcoming = time.start - time.time
	let remaining = time.end - time.time

	if (upcoming > 0) {
		roundStatus = `Round will start in ${Math.floor(upcoming / (1000 * 60 * 60 * 24))} days, ${Math.floor((upcoming % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))} hours, and ${Math.floor((upcoming % (1000 * 60 * 60)) / (1000 * 60))} minutes.`
	} else if (remaining < 0) {
		roundStatus = 'The round has ended, thanks for playing! A new round will start soon.'
	} else {
		roundStatus = `Round will end in ${Math.floor(remaining / (1000 * 60 * 60 * 24))} days, ${Math.floor((remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))} hours, and ${Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60))} minutes.`
	}

	return (
		<main>
			<Stack spacing='sm' align='center'>
				<img src={bgimage} style={{ maxHeight: '100px', maxWidth: '100%', height: 'auto', borderRadius: '10px' }} alt='summary' />
				<Title order={1} align='center'>
					Empire Summary
				</Title>
				<div>
					<NewPlayerModal empire={empire} time={time} />
					<Card>
						<Group position='apart' maw='80vw' sx={{ overflow: 'hidden' }}>
							<div>
							</div>
							<Group position='center' align='center' spacing={5} >
								<Avatar size="sm" src={empire.profileIcon} sx={(theme) => theme.colorScheme === 'dark' ? ({ filter: 'invert(1)', opacity: '75%' }) : ({ filter: 'invert(0)', })} />
								<Title order={2} align='center'>
									{empire?.name}
								</Title>
							</Group>
							<Tooltip label='Personalized Tips' align='top' position='top' withArrow withinPortal>
								<ActionIcon color="green" size="md" radius="xl" variant="filled" component={Link} to='/app/New%20Player'>
									<Question size={21} />
								</ActionIcon>
							</Tooltip>
						</Group>
						{empire.turnsUsed < TURNS_PROTECTION && (<Center my='sm'>
							<Button compact variant='outline' align='center' onClick={() =>
							{
								setMeta('new player tour')
								setSteps(steps)
								setCurrentStep(0)
								setIsOpen(true)
							}}
								leftIcon={<Compass size={20} />}
								sx={{
									border: '1px solid #40c057',
									boxShadow: '0 0 2px 1px #40c057',
									color: '#40c057',
								}}
								className='sixth-step'>Getting Started Tour</Button>
						</Center>)}

						<Text align='center' mb='sm'>{empire.profile ? empire.profile : <Link to='/app/Empire Settings' style={{ color: '#2882cb' }}>set your public profile</Link>}</Text>

						<Grid justify='space-between' grow>
							<Grid.Col sm={6} md={6}>
								<Table
									verticalSpacing='xs'
									striped
									style={{
										minWidth: '300px',
										// maxWidth: '400px',
									}}
								>
									<tbody>
										<tr>
											<td style={{ width: '50%' }}>Turns</td>
											<td align='right'>{empire?.turns} (max {TURNS_MAXIMUM})</td>
										</tr>
										<tr>
											<td>Stored Turns</td>
											<td align='right'>{empire?.storedturns} (max {TURNS_STORED})</td>
										</tr>
										<tr>
											<td>Rank</td>
											<td align='right'>{empire?.rank}</td>
										</tr>
										<tr>
											<td>{eraArray[empire.era].peasants}</td>
											<td align='right'>{empire?.peasants?.toLocaleString()}</td>
										</tr>
										<tr>
											<td>Land Acres</td>
											<td align='right'>{empire?.land?.toLocaleString()}</td>
										</tr>
										<tr>
											<td>Money</td>
											<td align='right'>${empire?.cash?.toLocaleString()}</td>
										</tr>
										<tr>
											<td>{eraArray[empire.era].food}</td>
											<td align='right'>{empire?.food?.toLocaleString()}</td>
										</tr>
										<tr>
											<td>{eraArray[empire.era].runes}</td>
											<td align='right'>{empire?.runes?.toLocaleString()}</td>
										</tr>
										<tr>
											<td>Net Worth</td>
											<td align='right'>${empire?.networth?.toLocaleString()}</td>
										</tr>
									</tbody>
								</Table>
							</Grid.Col>
							<Grid.Col sm={6} md={6}>
								<Table
									verticalSpacing='xs'
									striped
									style={{
										minWidth: '300px',
										// maxWidth: '400px',
									}}
								>
									<tbody>
										<tr>
											<td style={{ width: '50%' }}>Era</td>
											<td align='right'>{eraArray[empire.era].name}</td>
										</tr>
										<tr>
											<td>Race</td>
											<td align='right'>{raceArray[empire.race].name}</td>
										</tr>
										<tr>
											<td>Health</td>
											<td align='right'>{empire?.health}%</td>
										</tr>
										<tr>
											<td>Tax Rate</td>
											<td align='right'>{empire?.tax}%</td>
										</tr>
										<tr>
											<td>{eraArray[empire.era].trparm}</td>
											<td align='right'>{empire?.trpArm.toLocaleString()}</td>
										</tr>
										<tr>
											<td>{eraArray[empire.era].trplnd}</td>
											<td align='right'>{empire?.trpLnd.toLocaleString()}</td>
										</tr>
										<tr>
											<td>{eraArray[empire.era].trpfly}</td>
											<td align='right'>{empire?.trpFly.toLocaleString()}</td>
										</tr>
										<tr>
											<td>{eraArray[empire.era].trpsea}</td>
											<td align='right'>{empire?.trpSea.toLocaleString()}</td>
										</tr>
										<tr>
											<td>{eraArray[empire.era].trpwiz}</td>
											<td align='right'>{empire?.trpWiz.toLocaleString()}</td>
										</tr>
									</tbody>
								</Table>
							</Grid.Col>
						</Grid>
						<Stack align='center' spacing={0} mt='xs'>
							{empire.turnsUsed < TURNS_PROTECTION ? (<>
								<Text align='center' mb='sm' color='green'>You are under new player protection for {TURNS_PROTECTION - empire.turnsUsed} turns. <br />You cannot attack or be attacked until you've used {TURNS_PROTECTION} turns.</Text>

							</>) : ('')}
							<Text align='center'>You get {TURNS_COUNT} turn{TURNS_COUNT > 1 ? ('s') : ('')} every {TURNS_FREQ} minutes.</Text>
							<Text align='center'>Server time: {new Date(time.time).toUTCString()}</Text>
							<Text align='center'>{roundStatus}</Text>
						</Stack>
					</Card>
				</div>
			</Stack>
		</main>
	)
}
