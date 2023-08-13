import { Card, Grid, Stack, Table, Title, Group, Center, BackgroundImage } from '@mantine/core'
import { useSelector } from 'react-redux'
import { TURNS_COUNT, TURNS_FREQ, TURNS_MAXIMUM, TURNS_STORED } from '../config/config'
import { eraArray } from '../config/eras'
import { raceArray } from '../config/races'

export default function Summary()
{
	let now = new Date()
	const { empire } = useSelector((state) => state.empire)

	let bgimage = '/images/summaries/default.webp'

	let cash = Math.round(empire.bldPop / empire.land * 100) + Math.round(empire.bldCash / empire.land * 100)
	let indy = Math.round(empire.bldTroop / empire.land * 100)
	let mage = Math.round(empire.bldWiz / empire.land * 100)
	let farm = Math.round(empire.bldFood / empire.land * 100)

	if (empire.turnsUsed < 250) {
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

	return (
		<main>
			<Stack spacing='sm' align='center'>
				{/* <img src={bgimage} height='200' style={{ maxHeight: '200px', maxWidth: '100%', borderRadius: '10px' }} alt='summary' /> */}
				<Title order={1} align='center'>
					Summary
				</Title>
				<div>
					{empire ? (
						<Card opacity='80%'>
							<Title order={2} align='center' mb='sm'>
								{empire?.name}(#{empire?.id})
							</Title>
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
						</Card>) : ('')}
					<Stack align='center' spacing={0}>
						<div>{now.toISOString()}</div>
						<div>You get {TURNS_COUNT} turns every {TURNS_FREQ} minutes</div>
						<div>Next {TURNS_COUNT} turns in XX minutes, XX seconds</div>
						<div>The current round will end in X days, XX hours</div>
					</Stack>
				</div>

			</Stack>
		</main>
	)
}
