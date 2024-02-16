import { Group, Paper, Text, Title, Button } from '@mantine/core'
import { useSelector } from 'react-redux'
import Build from './build'
import Demolish from './demolish'
import Cash from './cash'
import Explore from './explore'
import Farm from './farm'
import Industry from './industry'
import Meditate from './meditate'
import MagicCenter from './magiccenter'
import Heal from './heal'
import AttackMini from '../diplomacy/attackMini'
import SpellMini from '../diplomacy/spellMini'
import TinyBuild from './tinyBuild'
import { useState } from 'react'

const MapComponents = (title, empire, size) =>
{
    // console.log(title)
    if (title === 'Build') {
        return <Build />
    } else if (title === 'Demolish') {
        return <Demolish />
    } else if (title === 'Cash') {
        return <Cash size={size} />
    } else if (title === 'Explore') {
        return <Explore size={size} />
    }
    else if (title === 'Farm') {
        return <Farm size={size} />
    }
    else if (title === 'Industry') {
        return <Industry size={size} />
    }
    else if (title === 'Meditate') {
        return <Meditate size={size} />
    }
    else if (title === 'MagicCenter') {
        return <MagicCenter />
    }
    else if (title === 'Heal') {
        return <Heal size={size} />
    } else if (title === 'Attack') {
        return <AttackMini />
    } else if (title === 'Spell') {
        return <SpellMini />
    } else if (title.includes('bld')) {
        // console.log(title)
        return <TinyBuild show={true} building={title} empire={empire} />
    }
}

// TODO: ability to reorder favorites

export default function Favorites()
{
    const { empire } = useSelector((state) => state.empire)
    const [size, setSize] = useState(false)
    // console.log(empire.favorites)
    return (
        <main>
            <Title order={1} align='center' sx={{ marginBottom: '1rem' }}>
                Favorites
            </Title>
            {empire.favorites.length === 0 && <Text align='center'>Add favorites from the actions in the <b>Use Turns</b> category</Text>}
            <Button onClick={() => setSize(!size)} compact>{size === true ? 'small' : 'normal'}</Button>
            <Group position='center' spacing={5}>
                {empire.favorites.map((favorite) =>
                {
                    return (
                        <Paper key={favorite} shadow="sm" p="md" sx={{
                            maxWidth: '550px',
                            minWidth: '250px',
                            margin: '0.5rem'
                        }}>
                            {MapComponents(favorite, empire, size)}
                        </Paper>
                    )
                }
                )}
            </Group>
        </main>
    )
}
