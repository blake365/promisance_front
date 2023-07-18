import { Button, Stack, Title } from '@mantine/core'
import { Fragment } from 'react'
import { Link } from 'react-router-dom'


const Sidebar = () =>
{
	const infoLinks = [
		'Summary',
		'Overview',
		'My News',
		'Scores',
		'Mailbox',
		'World News',
		// 'Graveyard',
		// 'Empire Search',
		// 'News Search',
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
		'World Bank',
		// 'Lottery',
	]
	const foreignLinks = [
		'War Council',
		'Offensive Magic',
		'Intel Center'
	]
	const managementLinks = [
		'Manage Empire',
	]



	return (
		<Fragment>
			<Stack spacing='xs' sx={{ marginBottom: '1rem', marginRight: '0.5rem', marginTop: '1rem' }}>
				<Title order={4}>Information</Title>
				{infoLinks.map((link, index) => (
					<Button
						component={Link}
						to={`/app/${link}`}
						variant='subtle'

						key={index}
					>
						{link}
					</Button>
				))}
				<Title order={4}>Use Turns</Title>
				{turnLinks.map((link, index) => (
					<Button
						component={Link}
						to={`/app/${link}`}
						variant='subtle'
						fullWidth
						key={index}
					>
						{link}
					</Button>
				))}
				<Title order={4}>Finance</Title>
				{financeLinks.map((link, index) => (
					<Button
						component={Link}
						to={`/app/${link}`}
						variant='subtle'
						fullWidth
						key={index}
					>
						{link}
					</Button>
				))}
				<Title order={4}>Diplomacy</Title>
				{foreignLinks.map((link, index) => (
					<Button
						component={Link}
						to={`/app/${link}`}
						variant='subtle'
						fullWidth
						key={index}
					>
						{link}
					</Button>
				))}
				<Title order={4}>Settings</Title>
				{managementLinks.map((link, index) => (
					<Button
						component={Link}
						to={`/app/${link}`}
						variant='subtle'
						fullWidth
						key={index}
					>
						{link}
					</Button>
				))}

			</Stack>
		</Fragment>
	)
}

export default Sidebar
