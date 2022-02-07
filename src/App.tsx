import { useEffect } from 'react'
import {
	ColorScheme,
	ColorSchemeProvider,
	MantineProvider,
} from '@mantine/core'
import { useColorScheme } from '@mantine/hooks'
import { Link, Outlet } from 'react-router-dom'

import { useState } from 'react'
import {
	AppShell,
	Burger,
	Header,
	MediaQuery,
	Navbar,
	Title,
	useMantineTheme,
	ScrollArea,
	Button,
} from '@mantine/core'

import Sidebar from './components/sidebar'

import './App.css'
import InfoBar from './components/infobar'
import { useDispatch } from 'react-redux'
import { userLoaded } from './store/userSlice'
import Axios from 'axios'
import TurnResultContainer from './components/useTurns/TurnResultContainer'

function App() {
	const [opened, setOpened] = useState(false)
	const theme = useMantineTheme()
	const dispatch = useDispatch()

	// const clickRef = useClickOutside(() => setOpened(false))
	const preferredColorScheme = useColorScheme()
	const [colorScheme, setColorScheme] =
		useState<ColorScheme>(preferredColorScheme)
	const toggleColorScheme = (value?: ColorScheme) =>
		setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'))

	useEffect(() => {
		async function loadUser() {
			try {
				const res = await Axios.get('auth/me')
				dispatch(userLoaded(res.data))
			} catch (error) {
				console.log(error)
			}
		}
		loadUser()
	})

	return (
		<ColorSchemeProvider
			colorScheme={colorScheme}
			toggleColorScheme={toggleColorScheme}
		>
			<MantineProvider theme={{ colorScheme }}>
				<AppShell
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
						</Navbar>
					}
					header={
						<Header height={70} padding='md'>
							{/* Handle other responsive styles with MediaQuery component or createStyles function */}
							<div
								style={{
									display: 'flex',
									alignItems: 'center',
									height: '100%',
									color: 'blue',
								}}
							>
								<MediaQuery largerThan='sm' styles={{ display: 'none' }}>
									<Burger
										opened={opened}
										onClick={() => setOpened((o) => !o)}
										size='sm'
										color={theme.colors.red[9]}
										mr='xl'
									/>
								</MediaQuery>

								<Title order={1}>Solo Promisance</Title>
								<div>
									<Button component={Link} to='/login' compact>
										Login
									</Button>
									<Button component={Link} to='/signup' compact>
										Sign Up
									</Button>
								</div>
							</div>
						</Header>
					}
				>
					<main style={{ paddingRight: 15, paddingBottom: 15 }}>
						<InfoBar />
						<TurnResultContainer />
						<Outlet />
					</main>
				</AppShell>
			</MantineProvider>
		</ColorSchemeProvider>
	)
}

export default App
