import
{
	Text,
	Center,
	Stack,
	Title,
	NumberInput,
	Button,
	Divider,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import Axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import GeneralAction from './generalAction'
import { empireLoaded } from '../../store/empireSlice'
import { showNotification } from '@mantine/notifications'


export default function Cash()
{
	const { empire } = useSelector((state) => state.empire)
	const dispatch = useDispatch()

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
			dispatch(empireLoaded(res.data))
			showNotification({
				title: 'Tax Rate Updated',
				color: 'yellow',
				autoClose: 2000,
			})
		} catch (error) {
			console.log(error)
			showNotification({
				title: 'Error Updating Tax Rate',
				color: 'orange',
				autoClose: 2000,
			})
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
				imglink='/images/cash.webp'
			/>
			<Divider size='lg' style={{ marginTop: '1rem' }} />
			<Center mt={10}>
				<Stack spacing='sm' align='center'>
					<Title order={3}>Tax Settings</Title>
					<Text size='sm'>Update your empire's tax rate:</Text>
					<form onSubmit={form.onSubmit((values) => updateTax(values))}>
						<Stack align='center'>
							<NumberInput
								label='Tax Rate'
								min={0}
								max={100}
								defaultValue={40}
								stepHoldDelay={500}
								stepHoldInterval={100}
								{...form.getInputProps('tax')}
							/>
							<Text size='sm'>A high tax rate will lower your max health. </Text>
							<Button type='submit' color='yellow'>Update</Button>
						</Stack>
					</form>
				</Stack>
			</Center>
		</main>
	)
}
