
import { useSelector } from 'react-redux'
import GeneralAction from './generalAction'


export default function Farm() {
	const empire = useSelector((state) => state.empire)

	return (<GeneralAction
					title='Farm'
					type='farm'
					flavor='farming'
					item='food'
					color='green'
					empire={empire}
				/>)
	
}
