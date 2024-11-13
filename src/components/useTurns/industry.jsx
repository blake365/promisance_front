import
{
	Divider,
} from '@mantine/core'
import { useSelector } from 'react-redux'
import GeneralAction from './generalAction'
import { useTranslation } from 'react-i18next'
import IndyRates from '../settings/indyRates'
import TinyAction from './tinyAction'

export default function Industry({ size })
{
	const { t } = useTranslation('turns')
	const { empire } = useSelector((state) => state.empire)
	if (size) {
		return (<TinyAction title={t('turns:industry.title')} type='industry' flavor={t('turns:industry.flavor')}
			item={t('turns:industry.item')} color='red' empire={empire} />)
	}
	return (
		<main style={{ paddingBottom: '1rem' }} className='dwarf6 ghoul6 goblin6 orc6'>
			<GeneralAction title={t('turns:industry.title')} type='industry' flavor={t('turns:industry.flavor')}
				item={t('turns:industry.item')} color='red' empire={empire} imglink='/images/industry.webp'
			/>
			<Divider size='lg' style={{ marginTop: '1rem', marginBottom: '1rem' }} />
			<IndyRates empire={empire} />
		</main>
	)

}
