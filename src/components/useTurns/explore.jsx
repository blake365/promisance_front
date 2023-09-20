
import { useSelector } from 'react-redux'
import GeneralAction from './generalAction'
import { eraArray } from '../../config/eras'
import { raceArray } from '../../config/races'
import { explore } from '../../functions/functions'

export default function Explore()
{
	const { empire } = useSelector((state) => state.empire)

	const newLand = explore(empire)

	// TODO: show amount of land gained from exploring (from backend)

	return (
		<main>
			<GeneralAction title='Explore' type='explore' flavor='exploring' explore={newLand}
				item='acres' color='blue' empire={empire}
				imglink='/images/explore.webp'
			/>
		</main>
	)
}
