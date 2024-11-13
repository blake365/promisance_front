import { Center, Switch, Paper, Text, Title, Flex } from '@mantine/core'
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
import React, { useState } from 'react'
import Axios from 'axios'
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useLoadEmpire } from '../../hooks/useLoadEmpire'
import { useMediaQuery } from '@mantine/hooks';
import { useTranslation } from 'react-i18next';

const MapComponents = ({ title, empire, size, index }) =>
{
    // console.log(title)
    let child = null
    if (title === 'Build') {
        child = <Build size={size} favorite />
    } else if (title === 'Demolish') {
        child = <Demolish size={size} />
    } else if (title === 'Cash') {
        child = <Cash size={size} />
    } else if (title === 'Explore') {
        child = <Explore size={size} />
    }
    else if (title === 'Farm') {
        child = <Farm size={size} />
    }
    else if (title === 'Industry') {
        child = <Industry size={size} />
    }
    else if (title === 'Meditate') {
        child = <Meditate size={size} />
    }
    else if (title === 'MagicCenter') {
        child = <MagicCenter size={size} />
    }
    else if (title === 'Heal') {
        child = <Heal size={size} />
    } else if (title === 'Attack') {
        child = <AttackMini size={size} />
    } else if (title === 'Spell') {
        child = <SpellMini size={size} />
    } else if (title.includes('bld')) {
        // console.log(title)
        child = <TinyBuild show={true} building={title} empire={empire} />
    }

    return (
        <Draggable draggableId={title} index={index}>
            {(provided) => (
                <Paper key={index} shadow="sm" p="md" sx={{
                    maxWidth: '550px',
                    minWidth: '250px',
                    margin: '0.5rem'
                }}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    {child}
                </Paper>
            )}
        </Draggable>
    )
}

const FavoritesList = React.memo(function favoritesList({ favorites, size })
{
    return favorites.map((favorite, index) =>
    {
        // console.log(favorite)
        return <MapComponents key={favorite} title={favorite} index={index} size={size} />
    })
})

const moveCol = (source, destination, droppableSource, droppableDestination) =>
{
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
};

const reorderCol = (list, startIndex, endIndex) =>
{
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};


export default function Favorites()
{
    const { t } = useTranslation('turns')
    const { empire } = useSelector((state) => state.empire)
    const [checked, setChecked] = useState(empire.favSize)
    const [state, setState] = useState({ favorites: empire.favorites })

    const [colState, setColState] = useState([empire.favColumns.column1, empire.favColumns.column2])

    const loadEmpire = useLoadEmpire(empire.uuid)

    const reorder = (list, startIndex, endIndex) =>
    {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        return result;
    };

    async function onDragEnd(result)
    {
        if (!result.destination) {
            return;
        }

        if (result.destination.index === result.source.index) {
            return;
        }

        const favorites = reorder(
            state.favorites,
            result.source.index,
            result.destination.index
        );
        // console.log(favorites)
        setState({ favorites });
        await Axios.post(`/empire/${empire.uuid}/favorites/order`, { favorites: favorites })
        loadEmpire()
    }

    async function onDragEndCol(result)
    {
        const { source, destination } = result;

        // dropped outside the list
        if (!destination) {
            return;
        }
        const sInd = +source.droppableId;
        const dInd = +destination.droppableId;

        if (sInd === dInd) {
            const items = reorderCol(colState[sInd], source.index, destination.index);
            const newState = [...colState];
            newState[sInd] = items;
            setColState(newState);
            await Axios.post(`/empire/${empire.uuid}/favorites/orderColumns`, { favorites: newState })
            loadEmpire()
        } else {
            const result = moveCol(colState[sInd], colState[dInd], source, destination);
            const newState = [...colState];
            newState[sInd] = result[sInd];
            newState[dInd] = result[dInd];
            setColState(newState.filter(group => group.length));
            await Axios.post(`/empire/${empire.uuid}/favorites/orderColumns`, { favorites: newState })
            loadEmpire()
        }
    }

    const handleSizeChange = (checked) =>
    {
        Axios.post(`/empire/${empire.uuid}/favorites/size`, { favSize: !checked })
        setChecked(!checked)
    }

    const smScreen = useMediaQuery('(max-width: 768px)')
    // console.log(colState)
    // console.log(empire.favorites)
    return (
        <main>
            <Title order={1} align='center'>
                {t('turns:favorites.title')}
            </Title>
            <Text size='sm' color='dimmed' align='center' mb='xs'>{t('turns:favorites.drag')}</Text>
            <Center>
                <Switch
                    label={t('turns:favorites.compact')}
                    checked={checked}
                    onChange={(event) => handleSizeChange(checked)}
                />
            </Center>
            {empire.favorites.length === 0 && <Text align='center' mt='lg'>{t('turns:favorites.empty')}</Text>}

            {!smScreen ? (
                <Flex align='start' justify='center' wrap='wrap'>
                    <DragDropContext onDragEnd={onDragEndCol}>
                        {colState.map((col, index) =>
                        {
                            // console.log(col)
                            return (
                                <Droppable key={index} droppableId={`${index}`}>
                                    {(provided) => (
                                        <div
                                            {...provided.droppableProps}
                                            ref={provided.innerRef}
                                        >
                                            <FavoritesList favorites={col} size={checked} />
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            )
                        })}
                    </DragDropContext>
                </Flex>
            ) : (
                <Center>
                    <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId="favorites">
                            {(provided) => (
                                <div
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                >
                                    <FavoritesList favorites={state.favorites} size={checked} />
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                </Center>
            )}
        </main>
    )
}
