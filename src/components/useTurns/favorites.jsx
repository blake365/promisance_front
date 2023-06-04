import { Grid, Paper, Stack, Table, Title } from '@mantine/core'
import { useSelector } from 'react-redux'
import { TURNS_COUNT, TURNS_FREQ, TURNS_MAXIMUM, TURNS_STORED } from '../../config/config'
import { eraArray } from '../../config/eras'
import { raceArray } from '../../config/races'

import Build from './build'
import Cash from './cash'
import Explore from './explore'
import Farm from './farm'
import Industry from './industry'
import Meditate from './meditate'
import MagicCenter from './magiccenter'

const MapComponents = (title) =>
{
    if (title === 'Build') {
        return <Build />
    } else if (title === 'Cash') {
        return <Cash />
    } else if (title === 'Explore') {
        return <Explore />
    }
    else if (title === 'Farm') {
        return <Farm />
    }
    else if (title === 'Industry') {
        return <Industry />
    }
    else if (title === 'Meditate') {
        return <Meditate />
    }
    else if (title === 'MagicCenter') {
        return <MagicCenter />
    }

}


export default function Favorites()
{
    const { empire } = useSelector((state) => state.empire)

    console.log(empire.favorites)

    return (
        <main>
            <Title order={1} align='center' sx={{ marginBottom: '1rem' }}>
                Favorites
            </Title>
            <Grid
                grow
                justify='center'
            >
                {empire.favorites.map((favorite) =>
                {
                    return (
                        <Paper key={favorite} shadow="sm" p="xs" sx={{
                            maxWidth: '550px',
                            minWidth: '250px',
                            margin: '0.5rem'
                        }}>
                            {MapComponents(favorite)}
                        </Paper>
                    )
                }
                )}
            </Grid>
        </main>
    )
}
