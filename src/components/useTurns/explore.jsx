
import { useSelector } from 'react-redux'
import GeneralAction from './generalAction'
import { explore } from '../../functions/functions'

export default function Explore()
{
	const { empire } = useSelector((state) => state.empire)

	const newLand = explore(empire)

	return (
		<main className='second-step'>
			<GeneralAction title='Explore' type='explore' flavor='exploring' explore={newLand}
				item='acres' color='blue' empire={empire}
				imglink='/images/explore.webp'
			/>
		</main>
	)
}
