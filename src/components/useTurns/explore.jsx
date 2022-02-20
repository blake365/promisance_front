
import { useSelector } from 'react-redux'
import GeneralAction from './generalAction'


export default function Explore()
{
	const { empire } = useSelector((state) => state.empire)

	const newLand = Math.ceil((1 / (empire.land * 0.00022 + 0.25)) * 40)

	return (
		<main>
			<GeneralAction title='Explore' type='explore' flavor='exploring' explore={newLand}
				item='acres' color='blue' empire={empire} />
		</main>
	)
}
