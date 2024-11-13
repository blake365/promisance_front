import
{
	Divider
} from '@mantine/core'
import { useSelector } from 'react-redux'
import GeneralAction from './generalAction'
import TaxRate from '../settings/taxRate'
import TinyAction from './tinyAction'
import { useTranslation } from 'react-i18next'
export default function Cash({ size })
{
	const { empire } = useSelector((state) => state.empire)
	const { t } = useTranslation('turns')
	if (size) {
		return (<TinyAction
			title={t('turns:cash.title')}
			type='cash'
			flavor={t('turns:cash.flavor')}
			item={t('turns:cash.item')}
			color='yellow'
			empire={empire}
		/>)
	}
	return (
		<main className='gnome6 minotaur6 vampire6'>
			<GeneralAction
				title={t('turns:cash.title')}
				type='cash'
				flavor={t('turns:cash.flavor')}
				item={t('turns:cash.item')}
				color='yellow'
				empire={empire}
				imglink='/images/cash.webp'
			/>
			<Divider size='lg' style={{ marginTop: '1rem' }} />
			<TaxRate empire={empire} />
		</main>
	)

}
