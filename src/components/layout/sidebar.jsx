import { Button, Group, Title } from '@mantine/core'
import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { logout } from '../../store/userSlice'
import { useDispatch } from 'react-redux'

const Sidebar = () =>
{
	// const navigate = useNavigate()
	const dispatch = useDispatch()

	const infolinks = [
		'Summary',
		'Overview',
		'Scores',
		// 'Graveyard',
		// 'Empire Search',
		// 'News Search',
		// 'Discord',
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
	]

	

	return (
		<Fragment>
			<Group direction='column' spacing='xs'>
				<Title order={4}>Information</Title>
				{infolinks.map((link, index) => (
					<Button
						component={Link}
						to={`/app/${link}`}
						variant='subtle'
						compact
						fullWidth
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
						compact
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
						compact
						fullWidth
						key={index}
					>
						{link}
					</Button>
				))}
				<Title order={4}>Magic</Title>
				{foreignLinks.map((link, index) => (
					<Button
						component={Link}
						to={`/app/${link}`}
						variant='subtle'
						compact
						fullWidth
						key={index}
					>
						{link}
					</Button>
				))}
				<Title order={4}>Settings (TODO: all)</Title>
				{managementLinks.map((link, index) => (
					<Button
						component={Link}
						to={`/app/${link}`}
						variant='subtle'
						compact
						fullWidth
						key={index}
					>
						{link}
					</Button>
				))}
				<Button
						onClick={()=>dispatch(logout())}
						variant='subtle'
						compact
						fullWidth
						
					>
						Logout
					</Button>
			</Group>
		</Fragment>
	)
}

export default Sidebar
