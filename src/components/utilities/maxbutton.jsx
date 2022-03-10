import { ActionIcon } from "@mantine/core"
import { IconArrowBarToUp } from '@tabler/icons'

export function MaxButton(props)
{
    return (
        <ActionIcon size='md' color='blue' onClick={() =>
        {
            props.formName.setFieldValue(props.fieldName, Math.floor(props.maxValue))
        }}><IconArrowBarToUp /></ActionIcon>)
    
}

export function HalfButton(props)
{
    return (
        <ActionIcon size='md' color='blue' onClick={() =>
        {
            props.formName.setFieldValue(props.fieldName, Math.floor(props.maxValue / 2))
        }}>&#189;</ActionIcon>)
}

export function HalfAndAll(props)
{
    return (
        <>
            <ActionIcon size='md' color='blue' onClick={() =>
            {
                props.formName.setFieldValue(props.fieldName, Math.floor(props.maxValue))
            }}><IconArrowBarToUp /></ActionIcon>
            <ActionIcon size='md' color='blue' onClick={() =>
            {
                props.formName.setFieldValue(props.fieldName, Math.floor(props.maxValue / 2))
            }}>½</ActionIcon>
        </>)
}