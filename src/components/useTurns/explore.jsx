
import { useSelector } from 'react-redux'
import GeneralAction from './generalAction'
import { eraArray } from '../../config/eras'
import { raceArray } from '../../config/races'

export default function Explore()
{
	const { empire } = useSelector((state) => state.empire)

	const newLand = Math.ceil((1 / (empire.land * 0.00019 + 0.25)) * 40 * ((100 + eraArray[empire.era].mod_explore + raceArray[empire.race].mod_explore) / 100))

	// TODO: show amount of land gained from exploring (from backend)

	return (
		<main>
			<GeneralAction title='Explore' type='explore' flavor='exploring' explore={newLand}
				item='acres' color='blue' empire={empire} />
		</main>
	)
}
