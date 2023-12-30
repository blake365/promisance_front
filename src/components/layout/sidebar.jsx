import { Button, Stack, Title } from '@mantine/core'
import { Fragment } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ArrowSquareOut } from '@phosphor-icons/react'
import { useTour } from '@reactour/tour'

const Sidebar = () =>
{

	const { setCurrentStep } = useTour()

	const infoLinks = [
		'Summary',
		'Overview',
		'Scores',
		'Clan Stats',
		'Mailbox',
		'World News',
		// 'Graveyard',
		// 'Empire Search',
		// 'Discord',
	]
	const turnLinks = [
		'Favorites',
		'Explore',
		'Build',
		'Farm',
		'Cash',
		'Industry',
		'Meditate',
		'Magic Center',
		'Heal',
	]
	const financeLinks = [
		'Black Market',
		'Public Market',
		'The Bank',
		'Lottery',
	]
	const foreignLinks = [
		'Clans',
		'War Council',
		// 'Mage Council',
		'Intel Center',
		'Foreign Aid',
	]
	const statsLinks = [
		// 'Advanced Stats',
		'Achievements',
	]
	const managementLinks = [
		'Empire Settings',
	]


	let location = useLocation()

	// console.log(location.pathname.split('/app/')[1])

	let locationString = location.pathname.split('/app/')[1]

	// console.log(locationString.split('%').length > 1)

	return (
		<Fragment>
			<Stack spacing='xs' sx={{ marginBottom: '1rem', marginRight: '0.5rem', marginTop: '1rem' }}>
				<Title order={4}>Information</Title>
				{infoLinks.map((link, index) =>
				{
					let variant = 'subtle'
					if (locationString.split('%').length > 1 && locationString.split('%')[0] === link.split(' ')[0]) {
						variant = 'filled'
					} else if (locationString === link) {
						variant = 'filled'
					}

					return (
						<Button
							component={Link}
							compact
							to={`/app/${link}`}
							variant={variant}
							key={index}
						>
							{link}
						</Button>)
				})}
				<Button component='a' compact href='https://discord.gg/bnuVy2pdgM' target='_blank' variant='subtle' rightIcon={<ArrowSquareOut />}>Discord</Button>
				<Title order={4}>Use Turns</Title>
				{turnLinks.map((link, index) =>
				{
					let variant = 'subtle'
					if (locationString.split('%').length > 1 && locationString.split('%')[0] === link.split(' ')[0]) {
						variant = 'filled'
					} else if (locationString === link) {
						variant = 'filled'
					}
					return (
						<Button
							component={Link}
							compact
							to={`/app/${link}`}
							variant={variant}
							fullWidth
							key={index}
							className={link === 'Explore' ? 'first-step' : link === 'Build' ? 'third-step' : ''}
							onClick={() =>
							{
								if (link === 'Explore') {
									setCurrentStep(1)
								} else if (link === 'Build') {
									setCurrentStep(4)
								}
							}}
						>
							{link}
						</Button>
					)
				})}
				<Title order={4}>Finance</Title>
				{financeLinks.map((link, index) =>
				{
					let variant = 'subtle'
					if (locationString.split('%').length > 1 && locationString.split('%')[0] === link.split(' ')[0]) {
						variant = 'filled'
					} else if (locationString === link) {
						variant = 'filled'
					}
					return (
						<Button
							component={Link}
							compact
							to={`/app/${link}`}
							variant={variant}
							fullWidth
							key={index}
						>
							{link}
						</Button>
					)
				})}
				<Title order={4}>Diplomacy</Title>
				{foreignLinks.map((link, index) =>
				{
					let variant = 'subtle'
					if (locationString.split('%').length > 1 && locationString.split('%')[0] === link.split(' ')[0]) {
						variant = 'filled'
					} else if (locationString === link) {
						variant = 'filled'
					}
					return (
						<Button
							component={Link}
							compact
							to={`/app/${link}`}
							variant={variant}
							fullWidth
							key={index}
						>
							{link}
						</Button>
					)
				})}
				<Title order={4}>Advanced Stats</Title>
				{statsLinks.map((link, index) =>
				{
					let variant = 'subtle'
					if (locationString.split('%').length > 1 && locationString.split('%')[0] === link.split(' ')[0]) {
						variant = 'filled'
					} else if (locationString === link) {
						variant = 'filled'
					}
					return (
						<Button
							component={Link}
							compact
							to={`/app/${link}`}
							variant={variant}
							fullWidth
							key={index}
						>
							{link}
						</Button>
					)
				})}
				<Title order={4}>Settings</Title>
				{managementLinks.map((link, index) =>
				{
					let variant = 'subtle'
					if (locationString.split('%').length > 1 && locationString.split('%')[0] === link.split(' ')[0]) {
						variant = 'filled'
					} else if (locationString === link) {
						variant = 'filled'
					}
					return (
						<Button
							component={Link}
							compact
							to={`/app/${link}`}
							variant={variant}
							fullWidth
							key={index}
						>
							{link}
						</Button>
					)
				})}
			</Stack>
		</Fragment>
	)
}

export default Sidebar
