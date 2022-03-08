import { ActionIcon, Button } from "@mantine/core"

export function MaxButton(props)
{
    return (
        <ActionIcon size='md' color='blue' onClick={() =>
        {
            props.formName.setFieldValue(props.fieldName, Math.floor(props.maxValue))
        }}>⏫</ActionIcon>)
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
            }}>⏫</ActionIcon>
            <ActionIcon size='md' color='blue' onClick={() =>
            {
                props.formName.setFieldValue(props.fieldName, Math.floor(props.maxValue / 2))
            }}>½</ActionIcon>
        </>)
}