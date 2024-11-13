import { useSelector } from 'react-redux'
import GeneralAction from './generalAction'
import TinyAction from './tinyAction'
import { useTranslation } from 'react-i18next'

export default function Heal({ size })
{
	const { empire } = useSelector((state) => state.empire)
	const { t } = useTranslation(['turns'])
	if (size) {
		return (<TinyAction
			title={t('turns:heal.title')}
			type='heal'
			flavor={t('turns:heal.flavor')}
			item='health'
			color='red'
			empire={empire} />)
	}
	return (<GeneralAction
		title={t('turns:heal.title')}
		type='heal'
		flavor={t('turns:heal.flavor')}
		item='health'
		color='red'
		empire={empire}
		imglink='/images/heal.webp'
	/>)

}
