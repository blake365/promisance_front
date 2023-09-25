import { Stack, Title, Button, TextInput, Group, Avatar, Text, Select, Image } from '@mantine/core'
import { useSelector, useDispatch } from 'react-redux'
import { useForm, hasLength } from '@mantine/form'
import { forwardRef, useState } from 'react'
import Axios from 'axios'
import { empireLoaded } from '../store/empireSlice'
import { TURNS_MAXIMUM } from '../config/config'
import { raceArray } from '../config/races'

// create polymorph feature

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
			<Avatar src={icon} size='sm' />
			<Text>{label}</Text>
		</Group>
	</div>
))

const raceObjects = raceArray.map((race, index) => ({
	icon: index,
	label: race.name,
	value: index
}))

const RaceItem = forwardRef(({ icon, label, ...others }, ref) => (
	<div ref={ref} {...others}>
		<Group>
			<Image src={`/icons/${raceArray[icon].name.toLowerCase()}.svg`} height={22} width={22} fit='contain' sx={(theme) => theme.colorScheme === 'dark' ? ({ filter: 'invert(1)', opacity: '75%' }) : ({ filter: 'invert(0)', })} />
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
	const [raceUpdate, setRaceUpdate] = useState()

	const form = useForm({
		initialValues: {
			empireId: empire.id,
			type: 'profile',
			profile: empire.profile
		},
		validate: {
			profile: hasLength({ max: 499 }, 'Profile must have 499 or less characters'),
		},
	})

	const iconForm = useForm({
		initialValues: {
			empireId: empire.id,
			type: 'icon',
			icon: empire.icon
		},
	})

	const raceForm = useForm({
		initialValues: {
			empireId: empire.id,
			type: 'race',
			race: empire.race
		}
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

	const updateRace = async (values) =>
	{
		try {
			const res = await Axios.post(`/empire/${empire.uuid}/changeRace`, values)
			// console.log(res.data)
			dispatch(empireLoaded(res.data))
			setRaceUpdate('Success')
		} catch (error) {
			console.log(error)
			setRaceUpdate(error)
		}
	}


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
							label='Edit Your Public Profile'
							placeholder={empire.profile ? empire.profile : 'Enter your profile here'}
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
							<Avatar size="md" src={empire.profileIcon} sx={{ backgroundColor: 'rgba(255, 255, 255, 0.66)' }} />
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

				<form onSubmit={raceForm.onSubmit((values) =>
				{
					console.log(values)
					if (empire.turns > Math.floor(TURNS_MAXIMUM / 2)) {
						updateRace(values)
					} else {
						setRaceUpdate('Not enough turns')
					}
				})}>
					<Stack spacing='sm' align='center'>
						<Group align='center'>
							<Image src={`/icons/${raceArray[empire.race].name.toLowerCase()}.svg`} height={40} width={40} fit='contain' sx={(theme) => theme.colorScheme === 'dark' ? ({ filter: 'invert(1)', opacity: '75%' }) : ({ filter: 'invert(0)', })} />
							<Text w='300px'>{`Change your empire's race. This will cost you ${Math.floor(TURNS_MAXIMUM / 2)} turns, 25% of your food, cash, and runes, and 10% of your population and army. `}</Text>

						</Group>

						<Select
							label="Choose Another Race"
							placeholder="Pick one"
							itemComponent={RaceItem}
							data={raceObjects}
							{...raceForm.getInputProps('race')}
						/>

						<Button size='sm' compact type='submit'>Submit</Button>
						<Text>{raceUpdate}</Text>
					</Stack>
				</form>
			</Stack>
		</main>
	)
}
