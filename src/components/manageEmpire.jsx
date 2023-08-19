import { Stack, Title, Button, TextInput, Group, Avatar, Text, Select, } from '@mantine/core'
import { useSelector, useDispatch } from 'react-redux'
import { useForm } from '@mantine/form'
// import { TURNS_COUNT, TURNS_FREQ, TURNS_MAXIMUM, TURNS_STORED } from '../config/config'
import { eraArray } from '../config/eras'
import { raceArray } from '../config/races'
import { forwardRef, useEffect, useState } from 'react'
import Axios from 'axios'
import { empireLoaded } from '../store/empireSlice'

// TODO: create polymorph feature

// array of icon names from /icons
const icons = [
	'atom', 'baby', 'barbell', 'battery-full', 'battery-low', 'bicycle', 'boat', 'bone', 'brain', 'bug', 'butterfly', 'cake', 'cat', 'champagne', 'coffee', 'coins', 'detective', 'diamond', 'dna', 'dog', 'dress', 'eye', 'film-slate', 'flame', 'gift', 'graduation-cap', 'grains', 'guitar', 'hammer', 'hamburger', 'headphones', 'heart', 'high-heel', 'infinity', 'leaf', 'lightning', 'lock-laminated', 'magic-wand', 'martini', 'medal-military', 'moon-stars', 'mountains', 'orange-slice', 'paint-brush', 'piggy-bank', 'pill', 'robot', 'rocket', 'scales', 'scroll', 'shield-chevron', 'shield-slash', 'shooting-star', 'shrimp', 'smiley-sad', 'smiley-wink', 'smiley', 'sneaker', 'snowflake', 'soccer-ball', 'sunglasses', 'syringe', 'tent', 'tipi', 'trash', 'trophy', 'viynl-record', 'virus', 'wall', 'waves', 'wind', 'wine', 'wrench', 'yin-yang'
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
			<Avatar src={icon} size='sm' />
			<Text>{label}</Text>
		</Group>
	</div>
))

export default function ManageEmpire()
{
	const dispatch = useDispatch()

	const { empire } = useSelector((state) => state.empire)

	const [profileUpdate, setProfileUpdate] = useState()
	const [iconUpdate, setIconUpdate] = useState()

	const form = useForm({
		initialValues: {
			empireId: empire.id,
			type: 'profile',
			profile: empire.profile
		},
	})

	const iconForm = useForm({
		initialValues: {
			empireId: empire.id,
			type: 'icon',
			icon: empire.icon
		},
	})

	const updateProfile = async (values) =>
	{
		try {
			const res = await Axios.post(`/empire/${empire.uuid}/profile`, values)
			// console.log(res.data)
			dispatch(empireLoaded(res.data))
			setProfileUpdate('Success')
		} catch (error) {
			console.log(error)
			setProfileUpdate(error)
		}
	}

	const updateIcon = async (values) =>
	{
		try {
			const res = await Axios.post(`/empire/${empire.uuid}/icon`, values)
			// console.log(res.data)
			dispatch(empireLoaded(res.data))
			setIconUpdate('Success')
		} catch (error) {
			console.log(error)
			setIconUpdate(error)
		}
	}

	// Edit empire profile form
	// Set profile icon form
	// Change empire race form

	// Rename empire form?

	return (
		<main>
			<Stack spacing='sm' align='center'>
				<Title order={1} align='center'>
					Empire Settings
				</Title>

				<form onSubmit={form.onSubmit((values) =>
				{
					// console.log(values)
					updateProfile(values)
				})}>
					<Stack spacing='sm' align='center'>
						<TextInput
							label='Edit Your Profile'
							placeholder={empire.profile ? empire.profile : 'Enter your profile here'}
							required
							w='350px'
							{...form.getInputProps('profile')}
						/>
						<Button size='sm' compact type='submit'>Submit</Button>
						<Text>{profileUpdate}</Text>
					</Stack>
				</form>

				<form onSubmit={iconForm.onSubmit((values) =>
				{
					// console.log(values)
					updateIcon(values)
				})}>
					<Stack spacing='sm' align='center'>
						<Group align='flex-end'>
							<Avatar src={empire.profileIcon} size='md' />
							<Select
								label="Choose Your Icon"
								placeholder="Pick one"
								itemComponent={SelectItem}
								data={iconObjects}
								{...iconForm.getInputProps('icon')}
							/>
						</Group>
						<Button size='sm' compact type='submit'>Submit</Button>
						<Text>{iconUpdate}</Text>
					</Stack>
				</form>
			</Stack>
		</main>
	)
}
