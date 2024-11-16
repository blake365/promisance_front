import
{
    Center,
    Title, Text,
    Stack,
    Card, Table
} from '@mantine/core'
import { useSelector } from 'react-redux'
import { FavoriteButton } from '../utilities/maxbutton'
import { eraArray } from '../../config/eras'
import { raceArray } from '../../config/races'
import { offense, defense } from '../../functions/functions'
import AttackForm from './attackForm'
import { checkRoundStatus } from '../../functions/checkRoundStatus'
import { useTranslation } from 'react-i18next'

export default function AttackMini({ size })
{
    const { t } = useTranslation(['diplomacy', 'eras'])
    const { empire } = useSelector((state) => state.empire)

    const eraName = eraArray[empire.era].name.toLowerCase()

    function formatNumber(num)
    {
        if (num >= 1e12) {
            return `${(num / 1e12).toFixed(2)} ${t('diplomacy:warCouncil.trillion')}`;
        }
        if (num >= 1e9) {
            return `${(num / 1e9).toFixed(2)} ${t('diplomacy:warCouncil.billion')}`;
        }
        if (num >= 1e6) {
            return `${(num / 1e6).toFixed(2)} ${t('diplomacy:warCouncil.million')}`;
        }
        return num.toLocaleString();
    }

    const roundStatus = checkRoundStatus()

    return (
        <section>
            <Center>
                <Stack spacing='sm' align='center'>
                    {!size &&
                        <>
                            <img src='/images/war.webp' height='200' style={{ maxHeight: '200px', maxWidth: '100%', borderRadius: '10px' }} alt='war council' />
                            <Title order={1} align='center'>
                                {t('diplomacy:warCouncil.attack')} <FavoriteButton title='Attack' empire={empire} />
                            </Title>
                            <Text align='center'>
                                {t('diplomacy:warCouncil.warDescription')}
                            </Text>
                        </>
                    }
                    <AttackForm empire={empire} roundStatus={roundStatus} />
                    <Card>
                        <Card.Section withBorder inheritPadding py="xs" sx={{ display: 'flex', justifyContent: 'left', alignItems: 'baseline', height: '49px' }}>
                            <Text weight={500}>{t('diplomacy:warCouncil.yourArmy')}:</Text><Title ml='xs' order={4} color={eraArray[empire.era].color}>{t(`eras:eras.${eraName}.name`)}</Title>
                        </Card.Section>
                        <Card.Section pt="sm">
                            <Table>
                                <thead>
                                    <tr>
                                        <th>
                                            {t('diplomacy:warCouncil.units')}
                                        </th>
                                        <th style={{ textAlign: 'right' }}>
                                            {t('diplomacy:warCouncil.number')}
                                        </th>
                                        <th style={{ textAlign: 'right' }}>
                                            {t('diplomacy:warCouncil.attack')}
                                        </th>
                                        <th style={{ textAlign: 'right' }}>
                                            {t('diplomacy:warCouncil.defense')}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{t(`eras:eras.${eraName}.trparm`)}</td>
                                        <td align='right'>{empire?.trpArm.toLocaleString()}</td>
                                        <td align='right'>{formatNumber(Math.round(eraArray[empire.era].o_trparm * empire.trpArm * (1 + raceArray[empire.race].mod_offense / 100) * (empire.health / 100)))}</td>
                                        <td align='right'>{formatNumber(Math.round(eraArray[empire.era].d_trparm * empire.trpArm * (1 + raceArray[empire.race].mod_defense / 100) * (empire.health / 100)))}</td>
                                    </tr>
                                    <tr>
                                        <td>{t(`eras:eras.${eraName}.trplnd`)}</td>
                                        <td align='right'>{empire?.trpLnd.toLocaleString()}</td>
                                        <td align='right'>{formatNumber(Math.round(eraArray[empire.era].o_trplnd * empire.trpLnd * (1 + raceArray[empire.race].mod_offense / 100) * (empire.health / 100)))}</td>
                                        <td align='right'>{formatNumber(Math.round(eraArray[empire.era].d_trplnd * empire.trpLnd * (1 + raceArray[empire.race].mod_defense / 100) * (empire.health / 100)))}</td>
                                    </tr>
                                    <tr>
                                        <td>{t(`eras:eras.${eraName}.trpfly`)}</td>
                                        <td align='right'>{empire?.trpFly.toLocaleString()}</td>
                                        <td align='right'>{formatNumber(Math.round(eraArray[empire.era].o_trpfly * empire.trpFly * (1 + raceArray[empire.race].mod_offense / 100) * (empire.health / 100)))}</td>
                                        <td align='right'>{formatNumber(Math.round(eraArray[empire.era].d_trpfly * empire.trpFly * (1 + raceArray[empire.race].mod_defense / 100) * (empire.health / 100)))}</td>
                                    </tr>
                                    <tr>
                                        <td>{t(`eras:eras.${eraName}.trpsea`)}</td>
                                        <td align='right'>{empire?.trpSea.toLocaleString()}</td>
                                        <td align='right'>{formatNumber(Math.round(eraArray[empire.era].o_trpsea * empire.trpSea * (1 + raceArray[empire.race].mod_offense / 100) * (empire.health / 100)))}</td>
                                        <td align='right'>{formatNumber(Math.round(eraArray[empire.era].d_trpsea * empire.trpSea * (1 + raceArray[empire.race].mod_defense / 100) * (empire.health / 100)))}</td>
                                    </tr>
                                    <tr>
                                        <td>{t('diplomacy:warCouncil.allUnits')}</td>
                                        <td />
                                        <td align='right'>{formatNumber(offense(empire))}</td>
                                        <td align='right'>{formatNumber(defense(empire))}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Card.Section>
                    </Card>
                </Stack>
            </Center>
        </section>
    )
}