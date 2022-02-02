import { Button, Group, Title } from '@mantine/core'
import { Fragment } from 'react'

import { Link } from 'react-router-dom'

const Sidebar = () => {
	const infolinks = [
		'Summary',
		'Overview',
		'Scores',
		// 'Graveyard',
		'Empire Search',
		// 'News Search',
		'Discord',
	]
	const turnLinks = [
		'Explore',
		'Build',
		'Farm',
		'Cash',
		'Industry',
		'Meditate',
		// 'Heal',
	]
	const financeLinks = [
		'Black Market',
		// 'Public Market',
		'World Bank',
		// 'Lottery',
	]
	const foreignLinks = [
		// 'War Center',
		'Magic Center',
		// 'Intel Center'
	]
	const managementLinks = [
		'Manage Empire',
		'Manage Account',
		'Delete Account',
		'Logout',
	]

	return (
		<Fragment>
			<Group direction='column' spacing='xs'>
				<Title order={4}>Information</Title>
				{infolinks.map((link) => (
					<Button
						component={Link}
						to={`/${link}`}
						variant='subtle'
						compact
						fullWidth
					>
						{link}
					</Button>
				))}
				<Title order={4}>Use Turns</Title>
				{turnLinks.map((link) => (
					<Button
						component={Link}
						to={`/${link}`}
						variant='subtle'
						compact
						fullWidth
					>
						{link}
					</Button>
				))}
				<Title order={4}>Finance</Title>
				{financeLinks.map((link) => (
					<Button
						component={Link}
						to={`/${link}`}
						variant='subtle'
						compact
						fullWidth
					>
						{link}
					</Button>
				))}
				<Title order={4}>Magic</Title>
				{foreignLinks.map((link) => (
					<Button
						component={Link}
						to={`/${link}`}
						variant='subtle'
						compact
						fullWidth
					>
						{link}
					</Button>
				))}
				<Title order={4}>Settings</Title>
				{managementLinks.map((link) => (
					<Button
						component={Link}
						to={`/${link}`}
						variant='subtle'
						compact
						fullWidth
					>
						{link}
					</Button>
				))}
			</Group>
		</Fragment>
	)
}

export default Sidebar
