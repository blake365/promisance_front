import { Button, Stack, Title } from '@mantine/core'
import { Fragment } from 'react'
import { Link, useLocation } from 'react-router-dom'


const AdminSidebar = () =>
{
    const infoLinks = [
        'Return to Game',
        'Summary',
        'Users',
        'Empires',
        'Mail',
        'Market',
        'News',
        // 'Graveyard',
        // 'Empire Search',
        // 'Discord',
    ]

    let location = useLocation()
    // console.log(location.pathname.split('/app/')[1])
    let locationString = location.pathname.split('/admin/')[1]
    // console.log(locationString.split('%').length > 1)

    return (
        <Fragment>
            <Stack spacing='xs' sx={{ marginBottom: '1rem', marginRight: '0.5rem', marginTop: '1rem' }}>
                <Title order={4}>Manage</Title>
                {infoLinks.map((link, index) =>
                {
                    let variant = 'subtle'
                    if (locationString.split('%').length > 1 && locationString.split('%')[0] === link.split(' ')[0]) {
                        variant = 'filled'
                    } else if (locationString === link) {
                        variant = 'filled'
                    }

                    if (link === 'Return to Game') {
                        return (<Button
                            component={Link}
                            compact
                            to={`/app/`}
                            variant={variant}
                            key={index}
                        >
                            {link}
                        </Button>)

                    } else {

                        return (
                            <Button
                                component={Link}
                                compact
                                to={`/admin/${link}`}
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
