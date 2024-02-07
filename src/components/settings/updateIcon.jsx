import { Stack, Button, Group, Avatar, Text, Select } from '@mantine/core'
import { useForm } from '@mantine/form'
import { forwardRef } from 'react'
import Axios from 'axios'
import { useDispatch } from 'react-redux'
import { empireLoaded } from '../../store/empireSlice'
import { showNotification } from '@mantine/notifications'

// array of icon names from /icons
const icons = [
    'atom', 'baby', 'barbell', 'battery-full', 'battery-low', 'bicycle', 'boat', 'bone', 'brain', 'bug', 'butterfly', 'cake', 'cat', 'champagne', 'coffee', 'coins', 'detective', 'diamond', 'dna', 'dog', 'dress', 'eye', 'film-slate', 'flame', 'gift', 'graduation-cap', 'grains', 'guitar', 'hammer', 'hamburger', 'headphones', 'heart', 'high-heel', 'infinity', 'leaf', 'lightning', 'lock-laminated', 'magic-wand', 'martini', 'medal-military', 'moon-stars', 'mountains', 'orange-slice', 'paint-brush', 'piggy-bank', 'pill', 'robot', 'rocket', 'scales', 'scroll', 'shield-chevron', 'shield-slash', 'shooting-star', 'shrimp', 'smiley-sad', 'smiley-wink', 'smiley', 'sneaker', 'snowflake', 'soccer-ball', 'sunglasses', 'syringe', 'tent', 'tipi', 'trash', 'trophy', 'vinyl-record', 'virus', 'wall', 'waves', 'wind', 'wine', 'wrench', 'yin-yang'
]

let iconObjects = icons.map((icon) =>
{
    let object = {
        icon: `/icons/${icon}.svg`,
        label: icon.replace('-', ' '),
        value: icon
    }

    return object
})

const SelectItem = forwardRef(({ icon, label, ...others }, ref) => (
    <div ref={ref} {...others}>
        <Group>
            <Avatar src={icon} size='sm' sx={(theme) => theme.colorScheme === 'dark' ? ({ filter: 'invert(1)', opacity: '75%' }) : ({ filter: 'invert(0)', })} />
            <Text>{label}</Text>
        </Group>
    </div>
))

export default function UpdateIcon({ status, empire })
{
    const dispatch = useDispatch()
    const iconForm = useForm({
        initialValues: {
            empireId: empire.id,
            type: 'icon',
            icon: empire.icon
        },
    })

    const updateIcon = async (values) =>
    {
        try {
            const res = await Axios.post(`/empire/${empire.uuid}/icon`, values)
            // console.log(res.data)
            dispatch(empireLoaded(res.data))
            showNotification({
                title: 'Icon updated',
                color: 'teal',
                autoClose: 2000
            })
        } catch (error) {
            console.log(error)
            showNotification({
                title: 'Icon update failed',
                color: 'orange',
            })
        }
    }

    return (
        <form onSubmit={iconForm.onSubmit((values) =>
        {
            // console.log(values)
            updateIcon(values)
        })}>
            <Stack spacing='sm' align='center'>
                <Group align='flex-end'>
                    <Avatar size="md" src={empire.profileIcon} sx={(theme) => theme.colorScheme === 'dark' ? ({ filter: 'invert(1)', opacity: '75%' }) : ({ filter: 'invert(0)', })} />
                    <Select
                        label="Choose Your Icon"
                        placeholder="Pick one"
                        itemComponent={SelectItem}
                        data={iconObjects}
                        {...iconForm.getInputProps('icon')}
                    />
                </Group>
                <Button size='sm' compact type='submit' disabled={status}>Submit</Button>
            </Stack>
        </form>
    )
}
