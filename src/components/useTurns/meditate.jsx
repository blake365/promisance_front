
import { useSelector } from 'react-redux'
import GeneralAction from './generalAction'

export default function Meditate()
{
	const { empire } = useSelector((state) => state.empire)

	return (
		<GeneralAction
			title='Meditate'
			type='meditate'
			flavor='meditating'
			item='mana'
			color='grape'
			empire={empire}
		/>
	)
}
