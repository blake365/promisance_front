import { Button, Stack, Title } from '@mantine/core'
import { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'


const AdminSidebar = () =>
{
    const activeGame = useSelector((state) => state.games.activeGame)

    const infoLinks = [
        'Summary',
        'Settings',
        'Users',
        'Empires',
        'Mail',
        'ClanMail',
        'Market',
        'News',
    ]

    const location = useLocation()
    // console.log(location.pathname.split('/app/')[1])
    const locationString = location.pathname.split('/admin/')[1]
    // console.log(locationString.split('%').length > 1)

    return (
        <Fragment>
            <Stack spacing='xs' sx={{ marginBottom: '1rem', marginRight: '0.5rem', marginTop: '1rem' }}>
                <Button
                    component={Link}
                    compact
                    to={'/admin/'}
                    variant='filled'
                >
                    Games Index
                </Button>
                {activeGame && <Title order={4} align='center'>{activeGame.name}</Title>}
                <Button
                    component={Link}
                    compact
                    to='/app/'
                    variant='outline'
                >
                    Go to Game
                </Button>
                <Title order={4}>Manage Game</Title>
                {activeGame && infoLinks.map((link, index) =>
                {
                    let variant = 'subtle'
                    if (locationString.split('%').length > 1 && locationString.split('%')[0] === link.split(' ')[0]) {
                        variant = 'filled'
                    } else if (locationString === link) {
                        variant = 'filled'
                    }
                    return (
                        <Button
                            component={Link}
                            compact
                            to={`/admin/${activeGame?.game_id}/${link}`}
                            variant={variant}
                            key={index}
                        >
                            {link}
                        </Button>)

                })}
            </Stack>
        </Fragment>
    )
}

export default AdminSidebar
