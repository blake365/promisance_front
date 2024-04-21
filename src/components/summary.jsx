import { Card, Grid, Stack, Table, Title, Group, Text, Avatar, Button, Center } from '@mantine/core'
import { useSelector } from 'react-redux'
import { eraArray } from '../config/eras'
import { raceArray } from '../config/races'
import { Link, useNavigate } from 'react-router-dom'
import { useTour } from '@reactour/tour';
import { steps } from '../tour/steps'
import { Compass } from '@phosphor-icons/react'
import { setBgImage } from '../functions/setBgImage'
import NewPlayerModal from './layout/newPlayerModal'
import { useEffect } from 'react'
import { raceTutorials } from "../tour/raceTutorials"


export default function Summary()
{
	const { empire } = useSelector((state) => state.empire)
	const { setIsOpen, setSteps, setMeta, setCurrentStep } = useTour()
	const { time } = useSelector((state) => state.time)
	const game = useSelector((state) => state.games.activeGame)

	const navigate = useNavigate()
	const bgimage = setBgImage(empire, game.turnsProtection)

	useEffect(() =>
	{
		if (!game) {
			navigate("/select");
		}
	}, [game, navigate])

	let roundStatus = 'Round has not started'
	const upcoming = time.start - time.time
	const remaining = time.end - time.time

	if (upcoming > 0) {
		roundStatus = `Round will start in ${Math.floor(upcoming / (1000 * 60 * 60 * 24))} days, ${Math.floor((upcoming % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))} hours, and ${Math.floor((upcoming % (1000 * 60 * 60)) / (1000 * 60))} minutes.`
	} else if (remaining < 0) {
		roundStatus = 'The round has ended, thanks for playing! A new round will start soon.'
	} else {
		roundStatus = `Round will end in ${Math.floor(remaining / (1000 * 60 * 60 * 24))} days, ${Math.floor((remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))} hours, and ${Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60))} minutes.`
	}

	const startTutorial = (race) =>
	{
		function findSteps(array, selector)
		{
			for (let i = 0; i < array.length; i++) {
				if (array[i][0].selector === `.${selector}0`) {
					return array[i]
				}
			}
		}

		const steps = findSteps(raceTutorials, race.toLowerCase())
		setSteps(steps)
		setMeta(`${race} tutorial`)
		setCurrentStep(0)
		setIsOpen(true)
	}

	return (
		<main>
			<Stack spacing='sm' align='center'>
				<img src={bgimage} style={{ maxHeight: '100px', maxWidth: '100%', height: 'auto', borderRadius: '10px' }} alt='summary' />
				<Title order={1} align='center' >
					Empire Summary
				</Title>
				<div className='dwarf0 elf0 gremlin0 drow0 ghoul0 gnome0 pixie0 minotaur0 goblin0 orc0 hobbit0 vampire0'>
					<NewPlayerModal empire={empire} time={time} />
					<Card>

						<Group position='center' align='center' spacing={5} >
							<Avatar size="sm" src={empire.profileIcon} sx={(theme) => theme.colorScheme === 'dark' ? ({ filter: 'invert(1)', opacity: '75%' }) : ({ filter: 'invert(0)', })} />
							<Title order={2} align='center'>
								{empire?.name}
							</Title>
						</Group>

						{empire.turnsUsed < game.turnsProtection && (<Center my='sm'>
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
											<td align='right'>{empire?.turns} (max {game.turnsMax})</td>
										</tr>
										<tr>
											<td>Stored Turns</td>
											<td align='right'>{empire?.storedturns} (max {game.turnsStored})</td>
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
							{empire.turnsUsed < game.turnsProtection ? (<>
								<Text align='center' mb='sm' color='green'>You are under new player protection for {game.turnsProtection - empire.turnsUsed} turns. <br />You cannot attack or be attacked until you've used {game.turnsProtection} turns.</Text>

							</>) : ('')}
							<Text align='center'>You get {game.turnsCount} turn{game.turnsCount > 1 ? ('s') : ('')} every {game.turnsFreq} minutes.</Text>
							<Text align='center'>Server time: {new Date(time.time).toUTCString()}</Text>
							<Text align='center'>{roundStatus}</Text>
							{empire.race !== 0 ||
								empire.race !== 3 ? (
								<Button mt='md' fullWidth
									onClick={() => startTutorial(raceArray[empire.race].name)}
								>
									{raceArray[empire.race].name} Tutorial
								</Button>
							) : null}
						</Stack>
					</Card>
				</div>
			</Stack>
		</main>
	)
}
