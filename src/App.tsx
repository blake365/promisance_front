import React from 'react'
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
	Text,
	Title,
	useMantineTheme,
	ScrollArea,
	Button,
} from '@mantine/core'

import Sidebar from './components/sidebar'

import './App.css'
import { useClickOutside } from '@mantine/hooks'
import InfoBar from './components/infobar'

function App() {
	const [opened, setOpened] = useState(false)
	const theme = useMantineTheme()

	// const clickRef = useClickOutside(() => setOpened(false))
	const preferredColorScheme = useColorScheme()
	const [colorScheme, setColorScheme] =
		useState<ColorScheme>(preferredColorScheme)
	const toggleColorScheme = (value?: ColorScheme) =>
		setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'))

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
						<div>This is where the turn result goes</div>
						<Outlet />
					</main>
				</AppShell>
			</MantineProvider>
		</ColorSchemeProvider>
	)
}

export default App
