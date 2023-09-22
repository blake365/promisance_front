import { Grid, Paper, Text, Title } from '@mantine/core'
import { useSelector } from 'react-redux'


import Build from './build'
import Cash from './cash'
import Explore from './explore'
import Farm from './farm'
import Industry from './industry'
import Meditate from './meditate'
import MagicCenter from './magiccenter'
import Heal from './heal'
import AttackMini from '../diplomacy/attackMini'
import SpellMini from '../diplomacy/spellMini'

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
    else if (title === 'Heal') {
        return <Heal />
    } else if (title === 'Attack') {
        return <AttackMini />
    } else if (title === 'Spell') {
        return <SpellMini />
    }
}

// TODO: ability to reorder favorites

export default function Favorites()
{
    const { empire } = useSelector((state) => state.empire)

    console.log(empire.favorites)

    return (
        <main>
            <Title order={1} align='center' sx={{ marginBottom: '1rem' }}>
                Favorites
            </Title>
            {empire.favorites.length === 0 && <Text align='center'>Add favorites from the actions in the <b>Use Turns</b> category</Text>}
            <Grid
                grow
                justify='center'
            >
                {empire.favorites.map((favorite) =>
                {
                    return (
                        <Paper key={favorite} shadow="sm" p="md" sx={{
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
