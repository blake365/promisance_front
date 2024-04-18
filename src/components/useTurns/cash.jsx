import
{
	Divider
} from '@mantine/core'
import { useSelector } from 'react-redux'
import GeneralAction from './generalAction'
import TaxRate from '../settings/taxRate'
import TinyAction from './tinyAction'

export default function Cash({ size })
{
	const { empire } = useSelector((state) => state.empire)

	if (size) {
		return (<TinyAction
			title='Cash'
			type='cash'
			flavor='focusing on your economy'
			item='money'
			color='yellow'
			empire={empire}
		/>)
	}
	return (
		<main className='gnome6 minotaur6 vampire6'>
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
			<TaxRate empire={empire} />
		</main>
	)

}
