import { useSelector } from 'react-redux'
import GeneralAction from './generalAction'
import { eraArray } from '../../config/eras'
import { useTranslation } from 'react-i18next'

export default function Meditate()
{
	const { empire } = useSelector((state) => state.empire)
	const { t } = useTranslation(['turns', 'eras'])
	const eraName = eraArray[empire.era].name.toLowerCase()

	return (
		<main className='elf6 drow6 pixie6'>
			<GeneralAction
				title={t('turns:meditate.title')}
				type='meditate'
				flavor={t('turns:meditate.flavor')}
				item={t(`eras:eras.${eraName}.runes`)}
				color='grape'
				empire={empire}
				imglink='/images/meditate.webp'
			/>
		</main>
	)
}
