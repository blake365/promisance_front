
import { useSelector } from 'react-redux'
import GeneralAction from './generalAction'
import TinyAction from './tinyAction'
import { useTranslation } from 'react-i18next'
export default function Farm({ size })
{
	const { empire } = useSelector((state) => state.empire)
	const { t } = useTranslation('turns')
	if (size) {
		return (<TinyAction
			title={t('turns:farm.title')}
			type='farm'
			flavor={t('turns:farm.flavor')}
			item={t('turns:farm.item')}
			color='green'
			empire={empire}
		/>)
	}

	return (
		<main className='gremlin6 hobbit6'>
			<GeneralAction
				title={t('turns:farm.title')}
				type='farm'
				flavor={t('turns:farm.flavor')}
				item={t('turns:farm.item')}
				color='green'
				empire={empire}
				imglink='/images/farm.webp'
			/>
		</main>)

}
