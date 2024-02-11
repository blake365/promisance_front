import
{
	Button,
	Center,
	Divider,
	NumberInput,
	SimpleGrid,
	Stack,
	Text,
	Title,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import Axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { empireLoaded } from '../../store/empireSlice'
import GeneralAction from './generalAction'
import { eraArray } from '../../config/eras'
import { showNotification } from '@mantine/notifications'
import IndyRates from '../settings/indyRates'

export default function Industry()
{

	const { empire } = useSelector((state) => state.empire)

	return (
		<main style={{ paddingBottom: '1rem' }}>
			<GeneralAction title='Industry' type='industry' flavor='focusing on industry'
				item='troops' color='red' empire={empire} imglink='/images/industry.webp'
			/>
			<Divider size='lg' style={{ marginTop: '1rem', marginBottom: '1rem' }} />
			<IndyRates empire={empire} />
		</main>
	)
}
