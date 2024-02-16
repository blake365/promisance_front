
import { useSelector } from 'react-redux'
import GeneralAction from './generalAction'
import { explore } from '../../functions/functions'
import TinyAction from './tinyAction'

export default function Explore({ size })
{
	const { empire } = useSelector((state) => state.empire)

	const newLand = explore(empire)
	if (size) {
		return (<TinyAction
			title='Explore' type='explore' flavor='exploring' explore={newLand}
			item='acres' color='blue' empire={empire}
		/>)
	}
	else {
		return (
			<main className='second-step'>
				<GeneralAction title='Explore' type='explore' flavor='exploring' explore={newLand}
					item='acres' color='blue' empire={empire}
					imglink='/images/explore.webp'
				/>
			</main>
		)
	}
}
