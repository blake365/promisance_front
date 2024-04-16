
import { useSelector } from 'react-redux'
import GeneralAction from './generalAction'
import TinyAction from './tinyAction'

export default function Farm({ size })
{
	const { empire } = useSelector((state) => state.empire)

	if (size) {
		return (<TinyAction
			title='Farm'
			type='farm'
			flavor='farming'
			item='food'
			color='green'
			empire={empire}
		/>)
	}

	return (
		<main className='gremlin6'>
			<GeneralAction
				title='Farm'
				type='farm'
				flavor='farming'
				item='food'
				color='green'
				empire={empire}
				imglink='/images/farm.webp'
			/>
		</main>)

}
