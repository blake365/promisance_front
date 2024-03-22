import { Button, Stack, Title } from '@mantine/core'
import { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'


const AdminSidebar = () =>
{
    const activeGame = useSelector((state) => state.games.activeGame)

    const infoLinks = [
        'Games Index',
        'Summary',
        'Settings',
        'Users',
        'Empires',
        'Mail',
        'ClanMail',
        'Market',
        'News',
    ]

    let location = useLocation()
    // console.log(location.pathname.split('/app/')[1])
    let locationString = location.pathname.split('/admin/')[1]
    // console.log(locationString.split('%').length > 1)

    return (
        <Fragment>
            <Stack spacing='xs' sx={{ marginBottom: '1rem', marginRight: '0.5rem', marginTop: '1rem' }}>
                {activeGame && <Title order={4}>{activeGame.name}</Title>}
                <Button
                    component={Link}
                    compact
                    to='/app/'
                    variant='outline'
                >
                    Go to Game
                </Button>
                <Title order={4}>Manage Game</Title>
                {infoLinks.map((link, index) =>
                {
                    let variant = 'subtle'
                    if (locationString.split('%').length > 1 && locationString.split('%')[0] === link.split(' ')[0]) {
                        variant = 'filled'
                    } else if (locationString === link) {
                        variant = 'filled'
                    }
                    if (link === 'Games Index') {
                        return (
                            <Button
                                component={Link}
                                compact
                                to={`/admin/`}
                                variant={variant}
                                key={index}
                            >
                                {link}
                            </Button>)
                    }
                    else {
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
                    }
                })}
            </Stack>
        </Fragment>
    )
}

export default AdminSidebar
