
import { useSelector } from 'react-redux'
import GeneralAction from './generalAction'
import TinyAction from './tinyAction'

export default function Farm({ favorite })
{
	const { empire } = useSelector((state) => state.empire)

	if (favorite) {
		return (<TinyAction
			title='Farm'
			type='farm'
			flavor='farming'
			item='food'
			color='green'
			empire={empire}
		/>)
	}
	else {
		return (<GeneralAction
			title='Farm'
			type='farm'
			flavor='farming'
			item='food'
			color='green'
			empire={empire}
			imglink='/images/farm.webp'
		/>)
	}
}
