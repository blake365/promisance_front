import { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Axios from 'axios'
import { useDisclosure, useColorScheme } from '@mantine/hooks';
import
{
	ColorSchemeProvider,
	Group,
	Loader,
	MantineProvider,
	Modal,
	Grid,
	Drawer,
	AppShell,
	Burger,
	Header,
	MediaQuery,
	Navbar,
	Title,
	ScrollArea,
	Button,
	Indicator,
	Image,
} from '@mantine/core'

import neoIcon from './icons/neoIcon.svg'

import Sidebar from './components/layout/sidebar'
import InfoBar from './components/layout/infobar'
import { useDispatch, useSelector } from 'react-redux'
import TurnResultContainer from './components/useTurns/TurnResultContainer'
import { fetchEmpire, empireLoaded } from './store/empireSlice'
import { load, logout } from './store/userSlice'
import ThemeToggle from './components/utilities/themeToggle'
import { useLocalStorage } from '@mantine/hooks'
import { useLocation } from 'react-router-dom'
import { setPage } from './store/guideSlice'
import { fetchMyItems, fetchOtherItems } from './store/pubMarketSlice'

import Guide from './components/guide/guide'
import EffectIcons from './components/layout/EffectIcons'
import { fetchEffects } from './store/effectSlice'
import { NewspaperClipping, Envelope } from '@phosphor-icons/react'
import EmpireNews from './components/news/empireNews';
import BonusTurns from './components/layout/bonusTurns';
import { loadScores } from './store/scoresSlice';


function App()
{
	const [opened, setOpened] = useState(false)
	const dispatch = useDispatch()
	const [modalOpened, setModalOpened] = useState(false);
	const [drawer, { open, close }] = useDisclosure(false)
	const [news, setNews] = useState()
	const [mail, setMail] = useState()

	let location = useLocation()
	// console.log(location)

	const empireStatus = useSelector(state => state.empire.status)

	const { isLoggedIn, user } = useSelector((state) => state.user)
	// const empire = useSelector((state) => state.empire)
	const { empire } = useSelector((state) => state.empire)
	// console.log(empire)


	const navigate = useNavigate()
	// console.log(empire)


	const loadEmpireTest = async () =>
	{
		try {
			const res = await Axios.get(`/empire/${empire.uuid}`)
			// console.log(res.data)
			dispatch(empireLoaded(res.data))
		} catch (error) {
			console.log(error)
		}
	}

	const loadMarket = async () =>
	{
		try {
			if (empire) {
				let marketValues = { empireId: empire.id }
				dispatch(fetchMyItems(marketValues))
				dispatch(fetchOtherItems(marketValues))
			}
		} catch (error) {
			console.log(error)
		}
	}



	const checkForNews = async () =>
	{
		try {
			const res = await Axios.get(`/news/${empire.id}/check`)
			// console.log(res.data.new)
			return res.data.new
		} catch (error) {
			console.log(error)
		}
	}

	const checkForMail = async () =>
	{
		try {
			const res = await Axios.get(`messages/${empire.id}/check`)
			// console.log(res.data.new)
			return res.data.new
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() =>
	{
		async function loadUser()
		{
			console.log('loading user')
			try {
				const res = await Axios.get('auth/me')
				console.log('status', res.status)
				if (res.status === 401) {
					navigate('/')
				} else if (res.status !== 200) {
					navigate('/')
				} else if (res.data) {
					dispatch(load())
				}
			} catch (error) {
				navigate('/')
			}
		}

		if (!isLoggedIn) {
			loadUser()
		}


		if (isLoggedIn && user.empires.length > 0 && empireStatus === 'idle') {
			dispatch(fetchEmpire(
				{
					uuid: user.empires[0].uuid,
				}
			))
		} else if (isLoggedIn && user.empires.length === 0) {
			if (user.role === 'demo') {
				navigate('/demo')
			} else {
				navigate('/create')
			}
		}
	})

	let locationArr = location.pathname.split('/')
	let last = locationArr.length - 1
	let pageState = locationArr[last]

	useEffect(() =>
	{
		dispatch(setPage(pageState))

		if (empireStatus === 'succeeded') {
			try {
				dispatch(fetchEffects({
					id: empire.id
				})).then((data) =>
				{
					// console.log(data)
					if (data.meta.requestStatus === 'rejected') {
						navigate('/')
					}
				}
				)

				checkForNews().then((data) =>
				{
					// console.log(data)
					setNews(data)
				})
				checkForMail().then((data) =>
				{
					// console.log(data)
					setMail(data)
				})
			}
			catch (error) {
				// console.log(error)
				navigate('/')
			}
		}

	})

	const preferredColorScheme = useColorScheme()
	// console.log(preferredColorScheme)
	const [colorScheme, setColorScheme] = useState(preferredColorScheme);
	const toggleColorScheme = (value) =>
	{
		const nextColorScheme = value || (colorScheme === 'dark' ? 'light' : 'dark');
		setColorScheme(nextColorScheme);
	}

	useEffect(() =>
	{
		setColorScheme(preferredColorScheme);
	}, [preferredColorScheme])

	return (
		<ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
			<MantineProvider theme={{ colorScheme }} withGlobalStyles>
				<AppShell
					styles={(theme) => ({
						main: {
							backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[1],
						},
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
									onClick={() => dispatch(logout())}
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
								<Group align='center' spacing={4}>
									<MediaQuery smallerThan={400} styles={{ display: 'none' }}>
										<Image src={neoIcon} height={38} width={38} sx={colorScheme === 'dark' ? ({ filter: 'invert(1)', opacity: '75%' }) : ({ filter: 'invert(0)', })} />
									</MediaQuery>
									<Title order={1} ml={0}>
										NeoPromisance
									</Title>
								</Group>
								<Group>
									<ThemeToggle />
								</Group>
							</Group>
						</Header>
					}
				>
					<main style={{ paddingBottom: 'calc(15px + env(safe-area-inset-bottom))' }}>
						{empireStatus !== 'succeeded' ? (<Loader />) : (<>
							<InfoBar data={empire} />
							<Modal
								opened={modalOpened}
								onClose={() => setModalOpened(false)}
								title='Game Guide'
								centered
								overflow="inside"
								size="xl"
							>
								<Guide empire={empire} />
							</Modal>
							<Grid grow justify='center' sx={{ marginTop: '0.5rem', marginBottom: '0.25rem' }}>
								<Grid.Col span={3}>
									<EffectIcons />
								</Grid.Col>
								<Grid.Col span={2}>
									<Group spacing='xs' position='center'>
										<Button compact variant='light' onClick={() => { setModalOpened(true) }}>Game Guide</Button>
										<Button compact variant='light' onClick={() =>
										{
											loadEmpireTest()
											loadMarket()
											dispatch(loadScores())
										}}>Refresh</Button>
									</Group>
								</Grid.Col>
								<Grid.Col span={3}>
									<Group spacing='xs' mr='sm' position='right'>
										<BonusTurns />
										<Indicator color="green" processing disabled={!mail} zIndex={3}>
											<Button component="a" href="/app/mailbox" size='sm' compact color=''><Envelope size='1.2rem' /> </Button>
										</Indicator>
										<Indicator color="green" processing disabled={!news} zIndex={3}>
											<Button onClick={open} size='sm' compact color=''><NewspaperClipping size='1.2rem' /> </Button>
										</Indicator>
									</Group>
								</Grid.Col>
							</Grid>
							<Drawer opened={drawer} onClose={close} position='right' size='lg' title='' >
								<EmpireNews />
							</Drawer>
							<TurnResultContainer />
							<Outlet />
						</>)}
					</main>
				</AppShell>
			</MantineProvider>
		</ColorSchemeProvider>
	)
}

export default App
