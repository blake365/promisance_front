import { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Axios from 'axios'
import { useLocalStorage } from '@mantine/hooks';
import useInterval from './hooks/useInterval'
import
{
	ColorSchemeProvider,
	Group,
	Loader,
	MantineProvider,
	Grid,
	AppShell,
	Burger,
	Header,
	MediaQuery,
	Navbar,
	Title,
	ScrollArea,
	Button,
	Image,
} from '@mantine/core'
import { NotificationsProvider, showNotification } from '@mantine/notifications';
import neoIcon from './icons/neoIcon.svg'
import Sidebar from './components/layout/sidebar'
import InfoBar from './components/layout/infobar'
import { useDispatch, useSelector } from 'react-redux'
import TurnResultContainer from './components/useTurns/TurnResultContainer'
import { fetchEmpire, empireLoaded, logoutEmpire } from './store/empireSlice'
import { load, logout } from './store/userSlice'
import ThemeToggle from './components/utilities/themeToggle'
import { useLocation } from 'react-router-dom'
import { setPage } from './store/guideSlice'
import { getTime } from './store/timeSlice'

import EffectIcons from './components/layout/EffectIcons'
import BonusTurns from './components/layout/bonusTurns';
import { persistor } from './store/store';
import { resetUser } from './store/userSlice';
import { useTour } from '@reactour/tour';
import { processAchievement } from './functions/processAchievement';
import GuideModalButton from './components/guide/guideModalButton';
import NewsDrawerButton from './components/news/newsDrawerButton';
import RefreshButton from './components/utilities/refreshButton';
import MailButton from './components/mail/mailButton';
import ClanMailButton from './components/diplomacy/clans/clanMessagesButton';
import * as Sentry from '@sentry/react';

function App()
{
	const [opened, setOpened] = useState(false)
	const dispatch = useDispatch()
	let location = useLocation()
	const empireStatus = useSelector(state => state.empire.status)
	const { isLoggedIn, user } = useSelector((state) => state.user)
	const { empire } = useSelector((state) => state.empire)

	// const { time } = useSelector((state) => state.time)
	const kickOut = (error) =>
	{
		console.log(error)
		persistor.pause();
		persistor.flush().then(() =>
		{
			return persistor.purge();
		})
		dispatch(resetUser())
		dispatch(logoutEmpire())
		navigate('/login')
	}
	// console.log(empire)
	// const achievements = empire?.achievements
	// console.log(achievements)
	let achievements = {}// Extract achievements from empire
	if (empire) {
		achievements = empire.achievements
		// console.log(achievements)
	}

	useEffect(() =>
	{
		Object.keys(achievements).forEach((key) =>
		{
			if (achievements[key].awarded && new Date(achievements[key].timeAwarded).getTime() + 1000 > Date.now()) {
				// console.log(key)
				const { message, icon } = processAchievement(key)
				showNotification({
					title: 'Achievement Awarded',
					message: message,
					icon: icon,
				})
			}
		})
	}, [achievements])

	const navigate = useNavigate()

	const { setIsOpen, currentStep, meta } = useTour()

	useEffect(() =>
	{
		if (meta === 'new player tour') {
			if (currentStep === 3 || currentStep === 0) {
				setOpened(true)
			} else {
				setOpened(false)
			}
			if (currentStep === 1 && pageName !== 'Explore') {
				navigate('/app/Explore')
			}
			if (currentStep === 4 && pageName !== 'Build') {
				navigate('/app/Build')
			}
		}
	}, [currentStep, setIsOpen, meta])

	useEffect(() =>
	{
		dispatch(getTime())

		async function loadUser()
		{
			// console.log('loading user')
			const res = await Axios.get('auth/me')
			// console.log('status', res.data)
			if (res.status !== 200) {
				console.log('not 200')
				kickOut(res)
			} else if (res.data) {
				dispatch(load())
			}
		}

		if (!isLoggedIn) {
			loadUser()
		}

		if (isLoggedIn && user.empires.length > 0 && (empireStatus === 'idle' || empireStatus === 'loading')) {
			// console.log('logged in but no empire')
			dispatch(fetchEmpire(
				{
					uuid: user.empires[0].uuid,
				}
			)).then((data) =>
			{
				// console.log(data.error)
				if (data.error) {
					kickOut(data.error)
				}
			})

		} else if (isLoggedIn && user.empires.length === 0) {
			if (user.role === 'demo') {
				navigate('/demo')
			} else {
				navigate('/create')
			}
		}

		dispatch(setPage(pageState))

		if (empireStatus === 'succeeded') {
			if (empire.flags === 1 && location.pathname !== '/app/disabled') {
				navigate('/app/disabled')
			}
		}
	})

	useInterval(async () =>
	{
		if (empireStatus === 'succeeded' && pageName !== 'Public Market') {
			try {
				const res = await Axios.get(`/empire/${empire.uuid}`)
				// console.log(res.data)
				dispatch(empireLoaded(res.data))
			}
			catch (error) {
				kickOut(error)
			}
		}
	}, 120000)

	let locationArr = location.pathname.split('/')
	let last = locationArr.length - 1
	let pageState = locationArr[last]
	let pageName = pageState.replace('%20', ' ')
	// console.log(pageState)
	// console.log(clanMail)

	const [colorScheme, setColorScheme] = useLocalStorage({
		key: 'prom-color-scheme',
		defaultValue: 'light'
	});
	const toggleColorScheme = (value) =>
		setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

	function FallbackComponent()
	{
		return <Title>An error has occurred, please refresh the website</Title>;
	}

	const myFallback = <FallbackComponent />;

	return (
		<Sentry.ErrorBoundary fallback={myFallback}>
			<ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
				<MantineProvider theme={{ colorScheme }} withGlobalStyles>
					<NotificationsProvider autoClose={8000}>
						<AppShell
							styles={(theme) => ({
								main: {
									backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[1],
								}
							})}
							navbarOffsetBreakpoint='sm'
							fixed
							navbar={
								<Navbar
									padding='sm'
									hiddenBreakpoint='sm'
									hidden={!opened}
									width={{ sm: 200, base: 200 }}
									zIndex={110}
									sx={{ paddingBottom: 'calc(1em + env(safe-area-inset-bottom))' }}
								>
									<Navbar.Section
										grow
										component={ScrollArea}
										ml={10}
										onClick={() => setOpened(false)}
									>
										<Sidebar />
									</Navbar.Section>
									<Navbar.Section>
										<Button
											onClick={() =>
											{
												persistor.pause();
												persistor.flush().then(() =>
												{
													return persistor.purge();
												})
												dispatch(logout())
												dispatch(logoutEmpire())
											}}
											variant='subtle'
											color='red'
											fullWidth
										>
											Logout
										</Button>
									</Navbar.Section>
								</Navbar>
							}
							header={
								<Header height={60} p='sm' zIndex={120}>
									<Group position='apart' spacing={2}>
										<MediaQuery largerThan='sm' styles={{ display: 'none' }}>
											<Burger
												opened={opened}
												onClick={() => setOpened((o) => !o)}
												size='sm'
											/>
										</MediaQuery>
										<a style={{ textDecoration: 'none', color: 'inherit' }} href='/'>
											<Group align='center' spacing={4}>
												<MediaQuery smallerThan={400} styles={{ display: 'none' }}>
													<Image src={neoIcon} height={38} width={38} sx={colorScheme === 'dark' ? ({ filter: 'invert(1)', opacity: '75%' }) : ({ filter: 'invert(0)', })} />
												</MediaQuery>
												<Title order={1} ml={0}>
													NeoPromisance
												</Title>
											</Group>
										</a>
										<Group>
											{user?.role === 'admin' ? (<Button component="a" href="/admin/" compact variant='light'>Admin</Button>) : ('')}
											<ThemeToggle />
										</Group>
									</Group>
								</Header>
							}
						>
							<main style={{ paddingBottom: 'calc(15px + env(safe-area-inset-bottom))' }} onClick={() => setOpened(false)}>
								{empireStatus !== 'succeeded' ? (<Loader />) : (<>
									<InfoBar data={empire} />
									<Grid grow justify='center' sx={{ marginTop: '0.5rem', marginBottom: '0.25rem' }}>
										<Grid.Col span={2}>
											<EffectIcons pageState={pageState} empire={empire} />
										</Grid.Col>
										<Grid.Col span={3}>
											<Group spacing='xs' position='center'>
												<GuideModalButton pageName={pageName} empire={empire} />
												<RefreshButton empire={empire} />
											</Group>
										</Grid.Col>
										<Grid.Col span={2}>
											<Group spacing='xs' mr='sm' position='right'>
												<BonusTurns />
												{empire.clanId !== 0 && <ClanMailButton empire={empire} kickOut={kickOut} />}
												<MailButton empire={empire} kickOut={kickOut} pageState={pageState} />
												<NewsDrawerButton kickOut={kickOut} empire={empire} pageState={pageState} />
											</Group>
										</Grid.Col>
									</Grid>
									<TurnResultContainer empire={empire} />
									<Outlet />
								</>)}
							</main>
						</AppShell>
					</NotificationsProvider>
				</MantineProvider>
			</ColorSchemeProvider>
		</Sentry.ErrorBoundary>
	)
}

export default App
