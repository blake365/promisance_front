import { Card, Grid, Table, Title } from '@mantine/core'
import { eraArray } from '../../config/eras'
import { raceArray } from '../../config/races'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

function Intel({ empire })
{
    const { t } = useTranslation(['summary', 'eras'])
    const eraName = eraArray[empire.era].name.toLowerCase()
    const { turnsMax, turnsStored } = useSelector((state) => state.games.activeGame)
    // console.log(empire)
    // console.log(typeof empire.era)
    return (
        <Card>
            <Title order={2} align='center' mb='sm'>
                {empire?.name}
            </Title>
            <Grid justify='space-between' grow>
                <Grid.Col sm={6} md={6}>
                    <Table
                        verticalSpacing='xs'
                        striped
                        style={{
                            minWidth: '300px',
                            // maxWidth: '400px',
                        }}
                    >
                        <tbody>
                            <tr>
                                <td style={{ width: '50%' }}>{t('summary:summary.turns')}</td>
                                <td align='right'>{empire?.turns} (max {turnsMax})</td>
                            </tr>
                            <tr>
                                <td>{t('summary:summary.storedturns')}</td>
                                <td align='right'>{empire?.storedturns} (max {turnsStored})</td>
                            </tr>
                            <tr>
                                <td>{t('summary:summary.rank')}</td>
                                <td align='right'>{empire?.rank}</td>
                            </tr>
                            <tr>
                                <td>{t(`eras:eras.${eraName}.peasants`)}</td>
                                <td align='right'>{empire?.peasants?.toLocaleString()}</td>
                            </tr>
                            <tr>
                                <td>{t('summary:summary.land')}</td>
                                <td align='right'>{empire?.land?.toLocaleString()}</td>
                            </tr>
                            <tr>
                                <td>{t('summary:summary.cash')}</td>
                                <td align='right'>${empire?.cash?.toLocaleString()}</td>
                            </tr>
                            <tr>
                                <td>{t(`eras:eras.${eraName}.food`)}</td>
                                <td align='right'>{empire?.food?.toLocaleString()}</td>
                            </tr>
                            <tr>
                                <td>{t(`eras:eras.${eraName}.runes`)}</td>
                                <td align='right'>{empire?.runes?.toLocaleString()}</td>
                            </tr>
                            <tr>
                                <td>{t('summary:summary.networth')}</td>
                                <td align='right'>${empire?.networth?.toLocaleString()}</td>
                            </tr>
                        </tbody>
                    </Table>
                </Grid.Col>
                <Grid.Col sm={6} md={6}>
                    <Table
                        verticalSpacing='xs'
                        striped
                        style={{
                            minWidth: '300px',
                            // maxWidth: '400px',
                        }}
                    >
                        <tbody>
                            <tr>
                                <td style={{ width: '50%' }}>{t('summary:summary.era')}</td>
                                <td align='right'>{eraArray[empire.era].name}</td>
                            </tr>
                            <tr>
                                <td>{t('summary:summary.race')}</td>
                                <td align='right'>{raceArray[empire.race].name}</td>
                            </tr>
                            <tr>
                                <td>{t('summary:summary.health')}</td>
                                <td align='right'>{empire?.health}%</td>
                            </tr>
                            <tr>
                                <td>{t('summary:summary.tax')}</td>
                                <td align='right'>{empire?.tax}%</td>
                            </tr>
                            <tr>
                                <td>{t(`eras:eras.${eraName}.trparm`)}</td>
                                <td align='right'>{empire?.trpArm.toLocaleString()}</td>
                            </tr>
                            <tr>
                                <td>{t(`eras:eras.${eraName}.trplnd`)}</td>
                                <td align='right'>{empire?.trpLnd.toLocaleString()}</td>
                            </tr>
                            <tr>
                                <td>{t(`eras:eras.${eraName}.trpfly`)}</td>
                                <td align='right'>{empire?.trpFly.toLocaleString()}</td>
                            </tr>
                            <tr>
                                <td>{t(`eras:eras.${eraName}.trpsea`)}</td>
                                <td align='right'>{empire?.trpSea.toLocaleString()}</td>
                            </tr>
                            <tr>
                                <td>{t(`eras:eras.${eraName}.trpwiz`)}</td>
                                <td align='right'>{empire?.trpWiz.toLocaleString()}</td>
                            </tr>
                        </tbody>
                    </Table>
                </Grid.Col>
            </Grid>
        </Card>
    )
}

export default Intel