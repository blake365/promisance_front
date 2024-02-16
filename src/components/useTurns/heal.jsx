import { useSelector } from 'react-redux'
import GeneralAction from './generalAction'
import TinyAction from './tinyAction'


export default function Heal({ size })
{
	const { empire } = useSelector((state) => state.empire)

	if (size) {
		return (<TinyAction
			title='Heal'
			type='heal'
			flavor='healing'
			item='health'
			color='red'
			empire={empire} />)
	} else {
		return (<GeneralAction
			title='Heal'
			type='heal'
			flavor='healing'
			item='health'
			color='red'
			empire={empire}
			imglink='/images/heal.webp'
		/>)
	}
}
