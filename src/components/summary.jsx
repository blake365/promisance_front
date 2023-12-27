import { Card, Grid, Stack, Table, Title, Group, Text, Avatar, Modal, Button, Center } from '@mantine/core'
import { useSelector } from 'react-redux'
import { ROUND_END, ROUND_START, TURNS_COUNT, TURNS_FREQ, TURNS_MAXIMUM, TURNS_PROTECTION, TURNS_STORED } from '../config/config'
import { eraArray } from '../config/eras'
import { raceArray } from '../config/races'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useTour } from '@reactour/tour';
import { steps } from '../tour/steps'
import { Compass } from '@phosphor-icons/react'

export default function Summary()
{
	const [newPlayerModal, setNewPlayerModal] = useState(false)
	const [raceStrength, setRaceStrength] = useState('')
	const { empire } = useSelector((state) => state.empire)

	const { setIsOpen, setSteps, setMeta, setCurrentStep } = useTour()

	const { time } = useSelector((state) => state.time)
	// console.log(time)
	let bgimage = '/images/summaries/default.webp'

	let cash = Math.round(empire.bldPop / empire.land * 100) + Math.round(empire.bldCash / empire.land * 100)
	let indy = Math.round(empire.bldTroop / empire.land * 100)
	let mage = Math.round(empire.bldWiz / empire.land * 100)
	let farm = Math.round(empire.bldFood / empire.land * 100)

	if (empire.turnsUsed < TURNS_PROTECTION) {
		bgimage = '/images/summaries/default.webp'
	} else if (cash > indy && cash > mage && cash > farm) {
		if (empire.era === 0) {
			bgimage = '/images/summaries/cashpast.webp'
		} else if (empire.era === 1) {
			bgimage = '/images/summaries/cashpresent.webp'
		} else if (empire.era === 2) {
			bgimage = '/images/summaries/cashfuture.webp'
		}
	} else if (indy > cash && indy > mage && indy > farm) {
		if (empire.era === 0) {
			bgimage = '/images/summaries/indypast.webp'
		} else if (empire.era === 1) {
			bgimage = '/images/summaries/indypresent.webp'
		} else if (empire.era === 2) {
			bgimage = '/images/summaries/indyfuture.webp'
		}
	} else if (mage > cash && mage > indy && mage > farm) {
		if (empire.era === 0) {
			bgimage = '/images/summaries/magepast.webp'
		} else if (empire.era === 1) {
			bgimage = '/images/summaries/magepresent.webp'
		} else if (empire.era === 2) {
			bgimage = '/images/summaries/magefuture.webp'
		}
	} else if (farm > cash && farm > indy && farm > mage) {
		if (empire.era === 0) {
			bgimage = '/images/summaries/farmpast.webp'
		} else if (empire.era === 1) {
			bgimage = '/images/summaries/farmpresent.webp'
		} else if (empire.era === 2) {
			bgimage = '/images/summaries/farmfuture.webp'
		}
	} else {
		bgimage = '/images/summaries/default.webp'
	}
	let roundStatus = 'Round has not started'

	// console.log(time)

	// console.log(ROUND_START)
	let upcoming = time.start - time.time
	// console.log(upcoming)
	let remaining = time.end - time.time
	// console.log(ROUND_END)
	// console.log(remaining)

	if (upcoming > 0) {
		roundStatus = `Round will start in ${Math.floor(upcoming / (1000 * 60 * 60 * 24))} days, ${Math.floor((upcoming % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))} hours, and ${Math.floor((upcoming % (1000 * 60 * 60)) / (1000 * 60))} minutes.`
	} else if (remaining < 0) {
		roundStatus = 'The round has ended, thanks for playing!'
	} else {
		roundStatus = `Round will end in ${Math.floor(remaining / (1000 * 60 * 60 * 24))} days, ${Math.floor((remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))} hours, and ${Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60))} minutes.`
	}

	// if empire is less than 5 minutes old, show new player modal
	useEffect(() =>
	{
		// console.log(time - new Date(empire.createdAt).getTime())
		if (empire && time.time && time.time - new Date(empire.createdAt).getTime() <= 120000) {
			// console.log('new player')
			// console.log(raceArray[empire.race].name)
			// switch cases for raceStrength
			switch (raceArray[empire.race].name) {
				case 'Human':
					setRaceStrength('being a generalist. You can go any direction you want with your empire. Your people can succeed in any era.')
					break
				case 'Elf':
					setRaceStrength('magic. You should focus your buildings on Mage Towers, use turns in Meditate, and cast spells in the Magic Center. Your people are best suited for the Past era.')
					break
				case 'Dwarf':
					setRaceStrength('industry. You should focus your buildings on Blacksmiths and use turns in Industry. Your people are best suited for the Future era.')
					break
				case 'Orc':
					setRaceStrength('industry and military. You should focus your buildings on Blacksmiths and use turns in Industry. Your people are best suited for the Future era.')
					break
				case 'Gnome':
					setRaceStrength('economy and markets. You should focus your buildings on Huts and Markets,  use turns in Cash, buy things from the Black Market. Your people are best suited for the Future era.')
					break
				case 'Troll':
					setRaceStrength('military. You should focus your buildings on Blacksmiths, Huts and Markets, and use your attack bonus to win battles. Your people are best suited for the Future era.')
					break
				case 'Drow':
					setRaceStrength('magic and military. You should focus your buildings on Mage Towers, use turns in Meditate, and cast spells in the Magic Center. Your people are best suited for the Past era.')
					break
				case 'Gremlin':
					setRaceStrength('food production. You should focus your buildings on Farms, use turns in Farm, sell your food on the Public Market. Your people are best suited for the Present era.')
					break
				case 'Goblin':
					setRaceStrength('industry. You should focus your buildings on Blacksmiths and use your turns in Industry. Your people are best suited for the Future era.')
					break
				case 'Hobbit':
					setRaceStrength('food production. You should focus your buildings on Farms and use turns in Farm. Your people are best suited for the Present era.')
					break
				case 'Ghoul':
					setRaceStrength('food production and industry. You should focus your buildings on Blacksmiths and Farms, and use your turns in either Industry or Farm. Your people are best suited for the Present and Future era.')
					break
				case 'Vampire':
					setRaceStrength('economy and industry. You should focus your buildings on Huts, Markets, and Blacksmiths, and use your turns in either Cash or Industry. Your people are best suited for the Future era.')
					break
				case 'Minotaur':
					setRaceStrength('military and economy. You should focus your buildings on Huts and Markets, and use your attack and defense bonuses to win battles. Your people are best suited for the Future era.')
					break
				case 'Pixie':
					setRaceStrength('magic and economy. You should focus your buildings on Mage Towers, Huts, and Markets, use turns in Meditate or Cash, and cast spells in the Magic Center. Beware of your low attack and defense stats. Your people are best suited for the Past era.')
					break
			}
			setNewPlayerModal(true)
		}
	}, [])

	return (
		<main>
			<Stack spacing='sm' align='center'>
				<img src={bgimage} style={{ maxHeight: '100px', maxWidth: '100%', height: 'auto', borderRadius: '10px' }} alt='summary' />
				<Title order={1} align='center'>
					Empire Summary
				</Title>
				<div>

					<>
						<Modal
							opened={newPlayerModal}
							onClose={() => setNewPlayerModal(false)}
							title="Welcome to NeoPromisance!"
							centered
							overflow="inside"
							size="lg"
						>
							<Text>
								You are the founder of a new empire in the world of Promisance. You are currently in the protection period. This means that you cannot be attacked by other players. You can use this time to learn the game and build up your empire.
							</Text>
							<Text mt='sm'>
								If you are brand new to the game, the <strong>First Turns Tour</strong> and <strong>Game Guide</strong> will be very useful for you, each page has a <strong>Guide</strong> link that will take you to the relevant section of the Game Guide. Additional walkthrough tours are indicated with the Compass <Compass /> icon and are available on the Build and Attack pages.
							</Text>
							<Text mt='sm'>
								You're goal is to build up your empire and become the most powerful empire in the world. To do this you will need to build up your <strong>land</strong> and <strong>army</strong>, but there are many paths to victory. You can focus on building up your economy, your military, your magic, or your food production. You can also focus on a combination of these things.
							</Text>
							<Text mt='sm'>
								As a {raceArray[empire.race].name} your people are strongest in {raceStrength}
							</Text>
						</Modal>
						<Card>
							<Group position='center' align='center' spacing={5}>
								<Avatar size="sm" src={empire.profileIcon} sx={(theme) => theme.colorScheme === 'dark' ? ({ filter: 'invert(1)', opacity: '75%' }) : ({ filter: 'invert(0)', })} />
								<Title order={2} align='center' >
									{empire?.name}
								</Title>
							</Group>
							{empire.turnsUsed < 200 && (<Center my='sm'>
								<Button compact variant='outline' align='center' onClick={() =>
								{
									setMeta('new player tour')
									setSteps(steps)
									setCurrentStep(0)
									setIsOpen(true)
								}}
									rightIcon={<Compass />}
									sx={{
										border: '1px solid #40c057',
										boxShadow: '0 0 2px 1px #40c057',
										color: '#40c057',
									}}
									className='sixth-step'>First Turns Tour</Button>
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
						</Card></>
				</div>
			</Stack>
		</main>
	)
}
