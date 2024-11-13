import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import GeneralAction from './generalAction'
import { explore } from '../../functions/functions'
import TinyAction from './tinyAction'

export default function Explore({ size })
{
	const { empire } = useSelector((state) => state.empire)
	const { t } = useTranslation('turns')
	const newLand = explore(empire)
	if (size) {
		return (<TinyAction
			title={t('turns:explore.title')} type='explore' flavor={t('turns:explore.flavor')} explore={newLand}
			item={t('turns:explore.item')} color='blue' empire={empire}
		/>)
	}

	return (
		<main className='second-step dwarf2 elf2 gremlin2 drow2 ghoul2 gnome2 pixie2 minotaur2 goblin2 orc2 hobbit2 vampire2'>
			<GeneralAction title={t('turns:explore.title')} type='explore' flavor={t('turns:explore.flavor')} explore={newLand}
				item={t('turns:explore.item')} color='blue' empire={empire}
				imglink='/images/explore.webp'
			/>
		</main>
	)

}
