import { useEffect } from 'react'
import
{ ColorSchemeProvider,
	Group,
Loader, 
MantineProvider} from '@mantine/core'
import { Outlet, useNavigate } from 'react-router-dom'
import Axios from 'axios'
import { useState } from 'react'
import
{
	AppShell,
	Burger,
	Header,
	MediaQuery,
	Navbar,
	Title,
	ScrollArea,
	Button
} from '@mantine/core'

import Sidebar from './components/layout/sidebar'

import './App.css'
import InfoBar from './components/layout/infobar'
import { useDispatch, useSelector } from 'react-redux'
import TurnResultContainer from './components/useTurns/TurnResultContainer'
import { fetchEmpire } from './store/empireSlice'
import { load, logout } from './store/userSlice'
import ThemeToggle from './components/utilities/themeToggle'
import { useLocalStorageValue } from '@mantine/hooks'

function App()
{
	const [opened, setOpened] = useState(false)
	const dispatch = useDispatch()

	const empireStatus = useSelector(state => state.empire.status)

	const { isLoggedIn, user } = useSelector((state) => state.user)
	const empire = useSelector((state) => state.empire)

	const navigate = useNavigate()
	// console.log(empire)

	useEffect(() =>
	{
		async function loadUser()
		{
			try {
				const res = await Axios.get('auth/me')
				console.log(res.data)
				if (res.data) {
					dispatch(load())
				}
			} catch (error) {
				navigate('/')
			}
		}

		if (!isLoggedIn) {
			loadUser()
		}

		if (isLoggedIn && empireStatus === 'idle') {
			dispatch(fetchEmpire(user.empires[0].uuid))
		}
	})

	const [colorScheme, setColorScheme] = useLocalStorageValue({
		key: 'prom-color-scheme',
		defaultValue: 'light'
	});
  	const toggleColorScheme = (value) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

	return (
		<ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
			<MantineProvider theme={{ colorScheme }} withGlobalStyles>
			<AppShell
			styles={(theme) => ({
        main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[1] },
      })}
			navbarOffsetBreakpoint='sm'
			fixed
			navbar={
				<Navbar
					padding='sm'
					hiddenBreakpoint='sm'
					hidden={!opened}
					width={{ sm: 200 }}
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
						onClick={()=>dispatch(logout())}
						variant='subtle'
						compact
						fullWidth
					>
						Logout
					</Button>
					</Navbar.Section>
				</Navbar>
			}
			header={
				<Header height={70} padding='md'>
					<Group direction='row' position='apart' spacing='xs'>
						<MediaQuery largerThan='sm' styles={{ display: 'none' }}>
							<Burger
								opened={opened}
								onClick={() => setOpened((o) => !o)}
								size='sm'
							/>
						</MediaQuery>
						<Title order={1}>Solo Promisance</Title>
						<ThemeToggle />
					</Group>
				</Header>
			}
		>
			<main style={{ paddingBottom: 15}}>
				{empireStatus !== 'succeeded' ? (<Loader />) : (<>
					<InfoBar data={empire} />
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
