import { useSelector } from 'react-redux'
import GeneralAction from './generalAction'
import { eraArray } from '../../config/eras'

export default function Meditate()
{
	const { empire } = useSelector((state) => state.empire)

	return (
		<main className='elf6 drow6 pixie6'>
			<GeneralAction
				title='Meditate'
				type='meditate'
				flavor='meditating'
				item={eraArray[empire.era].runes}
				color='grape'
				empire={empire}
				imglink='/images/meditate.webp'
			/>
		</main>
	)
}
