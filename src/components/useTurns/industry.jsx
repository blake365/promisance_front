import
{
	Divider,
} from '@mantine/core'
import { useSelector } from 'react-redux'
import GeneralAction from './generalAction'

import IndyRates from '../settings/indyRates'
import TinyAction from './tinyAction'

export default function Industry({ size })
{

	const { empire } = useSelector((state) => state.empire)
	if (size) {
		return (<TinyAction title='Industry' type='industry' flavor='focusing on industry'
			item='troops' color='red' empire={empire} />)
	}
	return (
		<main style={{ paddingBottom: '1rem' }} className='dwarf6 ghoul6 goblin6 orc6'>
			<GeneralAction title='Industry' type='industry' flavor='focusing on industry'
				item='troops' color='red' empire={empire} imglink='/images/industry.webp'
			/>
			<Divider size='lg' style={{ marginTop: '1rem', marginBottom: '1rem' }} />
			<IndyRates empire={empire} />
		</main>
	)

}
