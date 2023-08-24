import { ActionIcon } from "@mantine/core"
import { IconArrowBarToUp, } from '@tabler/icons'
import { IconStar, IconStarFilled } from '@tabler/icons-react'
import { useDispatch } from 'react-redux'
import Axios from 'axios'
import { empireLoaded } from '../../store/empireSlice'

// const dispatch = useDispatch()

export function FavoriteButton(props)
{
    const dispatch = useDispatch()

    const loadEmpireTest = async () =>
    {
        try {
            const res = await Axios.get(`/empire/${props.empire.uuid}`)
            // console.log(res.data)
            dispatch(empireLoaded(res.data))
        } catch (error) {
            console.log(error)
        }
    }

    const checkFavorite = (empire, item) =>
    {

        if (empire.favorites && empire.favorites.includes(item)) {
            return true
        } else {
            return false
        }
    }

    const setFavorite = async (empire, item) =>
    {
        try {
            console.log()
            const res = await Axios.post(`/empire/${empire.uuid}/favorite`, { favorite: item })
            loadEmpireTest()
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <ActionIcon size='md' color='blue' sx={{ display: 'inline' }} onClick={() =>
        {
            console.log('new favorite')
            setFavorite(props.empire, props.title)
        }}>{checkFavorite(props.empire, props.title) ? (<IconStarFilled />) : (<IconStar />)}</ActionIcon>)

}

export function MaxButton(props)
{
    return (
        <ActionIcon size='md' color='blue' mr={10} onClick={() =>
        {
            props.formName.setFieldValue(props.fieldName, Math.floor(props.maxValue))
        }}><IconArrowBarToUp /></ActionIcon>)

}

export function HalfButton(props)
{
    return (
        <ActionIcon size='md' color='blue' mr={10} onClick={() =>
        {
            props.formName.setFieldValue(props.fieldName, Math.floor(props.maxValue / 2))
        }}>&#189;</ActionIcon>)
}

export function HalfAndAll(props)
{
    return (
        <div style={props.style}>
            <ActionIcon size='md' color='blue' onClick={() =>
            {
                props.formName.setFieldValue(props.fieldName, Math.floor(props.maxValue))
            }}><IconArrowBarToUp /></ActionIcon>
            <ActionIcon size='md' color='blue' onClick={() =>
            {
                props.formName.setFieldValue(props.fieldName, Math.floor(props.maxValue / 2))
            }}>½</ActionIcon>
        </div>)
}