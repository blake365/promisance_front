import
{
    Center,
    Title, Text,
    Stack
} from '@mantine/core'
import { useSelector } from 'react-redux'
import { FavoriteButton } from '../utilities/maxbutton'
import { eraArray } from '../../config/eras'
import { checkRoundStatus } from '../../functions/checkRoundStatus'
import SpellForm from './spellForm'
import { useTranslation } from 'react-i18next'

export default function SpellMini({ size })
{
    const { empire } = useSelector((state) => state.empire)
    const { t } = useTranslation('diplomacy')
    const eraName = eraArray[empire.era].name.toLowerCase()
    const roundStatus = checkRoundStatus()

    return (
        <section>
            <Center>
                <Stack spacing='sm' align='center'>
                    {!size && <>
                        <img src='/images/war.webp' height='200' style={{ maxHeight: '200px', maxWidth: '100%', borderRadius: '10px' }} alt='war council' />
                        <Title order={1} align='center'>
                            {t('diplomacy:warCouncil.castSpell')} <FavoriteButton title='Spell' empire={empire} />
                        </Title>
                        <Text align='center'>
                            {t('diplomacy:warCouncil.spellDescription', { wiz: t(`eras:eras.${eraName}.trpwiz`) })}
                        </Text>
                    </>}
                    <SpellForm empire={empire} roundStatus={roundStatus} />
                </Stack>
            </Center>
        </section>
    )
}