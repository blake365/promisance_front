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

import neoIcon from '../../icons/neoIcon.svg'
import { useDispatch, useSelector } from 'react-redux'
import { load, logout } from '../../store/userSlice'
import ThemeToggle from '../../components/utilities/themeToggle'

import AdminSidebar from '../admin/adminSidebar';


function Admin()
{
    const [opened, setOpened] = useState(false)
    const dispatch = useDispatch()
    const [modalOpened, setModalOpened] = useState(false);
    const [drawer, { open, close }] = useDisclosure(false)

    // console.log(location)
    const { isLoggedIn, user } = useSelector((state) => state.user)
    const navigate = useNavigate()
    // console.log(empire)

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

        if (isLoggedIn && user.role !== 'admin') {
            navigate('/')
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
                                <AdminSidebar />
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
                                        Admin Dashboard
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
                        <Outlet />
                    </main>
                </AppShell>
            </MantineProvider>
        </ColorSchemeProvider>
    )
}

export default Admin
