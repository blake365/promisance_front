import { useEffect } from 'react'
import
{
	Loader,
} from '@mantine/core'
import { Link, Outlet } from 'react-router-dom'

import { useState } from 'react'
import
{
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

import Sidebar from './components/layout/sidebar'

import './App.css'
import InfoBar from './components/layout/infobar'
import { useDispatch, useSelector } from 'react-redux'
import TurnResultContainer from './components/useTurns/TurnResultContainer'
import { fetchEmpire } from './store/empireSlice'

function App()
{
	const [opened, setOpened] = useState(false)
	const theme = useMantineTheme()
	const dispatch = useDispatch()

	const empireStatus = useSelector(state => state.empire.status)

	const { isLoggedIn, user } = useSelector((state) => state.user)
	const empire = useSelector((state) => state.empire)

	// console.log(empire)

	useEffect(() =>
	{
		if (isLoggedIn && empireStatus === 'idle') {
			dispatch(fetchEmpire(user.empires[0].uuid))
		}

	}, [dispatch, isLoggedIn, empireStatus, user.empires])

	// const clickRef = useClickOutside(() => setOpened(false))
	// const preferredColorScheme = useColorScheme()
	// const [colorScheme, setColorScheme] =
	// 	useState<ColorScheme>(preferredColorScheme)
	// const toggleColorScheme = (value?: ColorScheme) =>
	// 	setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'))

	return (

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
					</div>
				</Header>
			}
		>
			<main style={{ paddingBottom: 15 }}>
				{empireStatus !== 'succeeded' ? (<Loader />) : (<>
					<InfoBar data={empire} />
					<TurnResultContainer />
					<Outlet />
				</>)}

			</main>
		</AppShell>
	)
}

export default App
