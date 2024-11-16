import
{
    Center, Text,
    Stack,
    Card,
    Table,
    Group
} from '@mantine/core'
import { useSelector } from 'react-redux'
import { raceArray } from '../../config/races'
import { eraArray } from '../../config/eras'
import { offense, defense } from '../../functions/functions'
import { useTranslation } from 'react-i18next'
import AttackForm from './attackForm'

export default function ScoresAttack({ enemy })
{
    const { empire } = useSelector((state) => state.empire)
    const { t } = useTranslation(['diplomacy', 'eras'])
    const eraName = eraArray[empire.era].name.toLowerCase()
    function formatNumber(num)
    {
        if (num >= 1e12) {
            return `${(num / 1e12).toFixed(2)} ${t('diplomacy:warCouncil.trillions')}`;
        }
        if (num >= 1e9) {
            return `${(num / 1e9).toFixed(2)} ${t('diplomacy:warCouncil.billions')}`;
        }
        if (num >= 1e6) {
            return `${(num / 1e6).toFixed(2)} ${t('diplomacy:warCouncil.millions')}`;
        }
        return num.toLocaleString();
    }

    return (
        <section>
            <Center>
                <Stack spacing='sm' align='center'>
                    <Group position='center'>
                        <AttackForm empire={empire} defenderId={enemy.id} roundStatus={false} />
                        <Card mb='sm'>
                            <Card.Section withBorder inheritPadding py="xs" sx={{ display: 'flex', justifyContent: 'left', alignItems: 'baseline', height: '49px' }}>
                                <Text weight={500}>{t('diplomacy:warCouncil.yourArmy')}:</Text>
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
                    </Group>
                </Stack>
            </Center>
        </section>
    )
}
