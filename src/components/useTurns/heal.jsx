
import { useSelector } from 'react-redux'
import GeneralAction from './generalAction'


export default function Heal()
{
	const { empire } = useSelector((state) => state.empire)

	return (<GeneralAction
		title='Heal'
		type='heal'
		flavor='healing'
		item='health'
		color='red'
		empire={empire}
	/>)

}
