import { Button, Stack, Title } from '@mantine/core'
import { Fragment } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ArrowSquareOut } from '@phosphor-icons/react'
import { useTour } from '@reactour/tour'

const Sidebar = ({ name }) =>
{
	const { setCurrentStep, meta } = useTour()

	const infoLinks = [
		'Summary',
		'Overview',
		'Scores',
		'Clan Stats',
		'Mailbox',
		'World News',
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
		'Intel Center',
		'Foreign Aid',
	]
	const statsLinks = [
		'Achievements',
		'Charts',
	]
	const managementLinks = [
		'Empire Settings',
	]

	const location = useLocation()
	// console.log(location.pathname.split('/app/')[1])
	let locationString = location.pathname.split('/app')[1]
	// remove the first character if it is a '/'
	if (locationString[0] === '/') {
		locationString = locationString.slice(1)
	}
	// console.log(locationString.split('%').length > 1)

	const setTutorialClassnames = (link) =>
	{
		if (link === 'Explore') {
			return 'first-step gremlin1'
		}
		if (link === 'Build') {
			return 'third-step gremlin3'
		}
		if (link === 'Farm') {
			return 'gremlin5'
		}
		if (link === 'Magic Center') {
			return 'gremlin11'
		}

	}

	return (
		<Fragment>
			<Stack spacing='xs' sx={{ marginBottom: '1rem', marginRight: '0.5rem', marginTop: '0.5rem' }}>
				<Button radius={0} component={Link} to='/select'><Title order={3} align='center'
					color='white' w={'100%'}>{name}</Title>
				</Button>
				<Title order={4}>Information</Title>
				{infoLinks.map((link) =>
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
							key={link}
						>
							{link}
						</Button>)
				})}
				<Button component='a' compact href='https://discord.gg/bnuVy2pdgM' target='_blank' variant='subtle' rightIcon={<ArrowSquareOut />}>Discord</Button>
				<Button component={Link} compact to='/app/Tips' variant='subtle'>Game Tips</Button>
				<Title order={4}>Use Turns</Title>
				{turnLinks.map((link) =>
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
							key={link}
							className={setTutorialClassnames(link)}
							onClick={() =>
							{
								console.log(meta)
								if (link === 'Explore' && meta !== 'new player tour') {
									setCurrentStep(2)
								} else if (link === 'Explore') {
									setCurrentStep(1)
								}
								if (link === 'Build' && meta === 'new player tour') {
									setCurrentStep(4)
								} else if (link === 'Build') {
									setCurrentStep(4)
								}
								if (link === 'Farm' && meta === 'Gremlin tutorial') {
									console.log('farm tutorial')
									setCurrentStep(6)
								}
								if (link === 'Magic Center' && meta === 'Gremlin tutorial') {
									setCurrentStep(12)
								}
							}}
						>
							{link}
						</Button>
					)
				})}
				<Title order={4}>Finance</Title>
				{financeLinks.map((link) =>
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
							key={link}
							className={link === 'Public Market' && 'gremlin7'}
							onClick={() =>
							{
								console.log(meta)
								if (link === 'Public Market' && meta === 'Gremlin tutorial') {
									setCurrentStep(8)
								}
							}}
						>
							{link}
						</Button>
					)
				})}
				<Title order={4}>Diplomacy</Title>
				{foreignLinks.map((link) =>
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
							key={link}
						>
							{link}
						</Button>
					)
				})}
				<Title order={4}>Additional Stats</Title>
				{statsLinks.map((link) =>
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
							key={link}
						>
							{link}
						</Button>
					)
				})}
				<Title order={4}>Settings</Title>
				{managementLinks.map((link) =>
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
							key={link}
						>
							{link}
						</Button>
					)
				})}
				<Button
					component={'a'}
					compact
					href='https://www.buymeacoffee.com/blakemorgan'
					fullWidth
					variant='subtle'
					target='_blank'
					rightIcon={<ArrowSquareOut />}
				>Donate</Button>
			</Stack>
		</Fragment>
	)
}

export default Sidebar
