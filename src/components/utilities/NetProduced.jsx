import { Text } from '@mantine/core'

const NetProduced = (props) =>
{
    let abs = Math.abs(props.value)
    let display = ''

    if (props.money) {
        if (props.value == 0) {
            display = '$0'
        } else if (props.value < 0) {
            display = `-$${abs.toLocaleString()}`
        } else {
            display = `+$${abs.toLocaleString()}`
        }
    } else if (props.percent) {
        display = `${props.value.toLocaleString()}%`
    } else {
        if (props.value == 0) {
            display = '0'
        } else if (props.value < 0) {
            display = `-${abs.toLocaleString()}`
        } else {
            display = `+${abs.toLocaleString()}`
        }
    }

    return (
        <>
            <Text weight={700}>{props.title}:</Text>
            <Text
                align='right'
                style={props.value > 0 ? { color: 'green' } : { color: 'red' }}
                weight={700}
            >
                {display}
            </Text>
        </>
    )
}

export default NetProduced