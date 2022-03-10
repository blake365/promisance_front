import
{
	Text,
	Center,
	Group,
	Title,
	NumberInput,
	Button,
	Divider,
} from '@mantine/core'
import { useForm } from '@mantine/hooks'
import Axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import GeneralAction from './generalAction'
import { empireLoaded } from '../../store/empireSlice'
import { useState } from 'react'


export default function Cash()
{
	const { empire } = useSelector((state) => state.empire)
	const dispatch = useDispatch()

	const [update, setUpdate] = useState()

	const form = useForm({
		initialValues: {
			empireId: empire.id,
			tax: empire.tax,
		},

		validationRules: {
			tax: (value) => value <= 100 && value > 0,
		},

		errorMessages: {
			tax: 'Invalid tax rate',
		},
	})

	const updateTax = async (values) =>
	{
		try {
			const res = await Axios.post(`/empire/${empire.uuid}/tax`, values)
			// console.log(res.data)
			dispatch(empireLoaded(res.data))
			setUpdate('Success')
		} catch (error) {
			console.log(error)
			setUpdate(error)
		}
	}

	return (
		<main>

			<GeneralAction
				title='Cash'
				type='cash'
				flavor='focusing on your economy'
				item='money'
				color='yellow'
				empire={empire}
			/>
			<Divider size='lg' style={{ marginTop: '1rem' }} />
			<Center mt={10}>
				<Group direction='column' spacing='sm' align='center'>
					<Title order={3}>Tax Settings</Title>
					<Text size='sm'>Update your empire's tax rate:</Text>
					<form onSubmit={form.onSubmit((values) => updateTax(values))}>
						<Group direction='column' align='center'>
							<NumberInput
								label='Tax Rate'
								min={0}
								max={100}
								defaultValue={40}
								stepHoldDelay={500}
								stepHoldInterval={100}
								{...form.getInputProps('tax')}
							/>
							<Button type='submit' color='yellow'>Update</Button>
						</Group>
					</form>
					<div>{update}</div>
				</Group>
			</Center>
		</main>
	)
}
