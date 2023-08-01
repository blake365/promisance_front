import { Card, Grid, Table, Title } from '@mantine/core'
import { eraArray } from '../../config/eras'
import { TURNS_MAXIMUM, TURNS_STORED } from '../../config/config'
import { raceArray } from '../../config/races'

function Intel({ empire })
{

    // console.log(empire)
    // console.log(typeof empire.era)
    return (
        <Card>
            <Title order={2} align='center' mb='sm'>
                {empire?.name}(#{empire?.spiedEmpireId})
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
                                <td style={{ width: '50%' }}>Turns</td>
                                <td align='right'>{empire?.turns} (max {TURNS_MAXIMUM})</td>
                            </tr>
                            <tr>
                                <td>Stored Turns</td>
                                <td align='right'>{empire?.storedturns} (max {TURNS_STORED})</td>
                            </tr>
                            <tr>
                                <td>Rank</td>
                                <td align='right'>{empire?.rank}</td>
                            </tr>
                            <tr>
                                <td>{eraArray[empire.era].peasants}</td>
                                <td align='right'>{empire?.peasants?.toLocaleString()}</td>
                            </tr>
                            <tr>
                                <td>Land Acres</td>
                                <td align='right'>{empire?.land?.toLocaleString()}</td>
                            </tr>
                            <tr>
                                <td>Money</td>
                                <td align='right'>${empire?.cash?.toLocaleString()}</td>
                            </tr>
                            <tr>
                                <td>{eraArray[empire.era].food}</td>
                                <td align='right'>{empire?.food?.toLocaleString()}</td>
                            </tr>
                            <tr>
                                <td>{eraArray[empire.era].runes}</td>
                                <td align='right'>{empire?.runes?.toLocaleString()}</td>
                            </tr>
                            <tr>
                                <td>Net Worth</td>
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
                                <td style={{ width: '50%' }}>Era</td>
                                <td align='right'>{eraArray[empire.era].name}</td>
                            </tr>
                            <tr>
                                <td>Race</td>
                                <td align='right'>{raceArray[empire.race].name}</td>
                            </tr>
                            <tr>
                                <td>Health</td>
                                <td align='right'>{empire?.health}%</td>
                            </tr>
                            <tr>
                                <td>Tax Rate</td>
                                <td align='right'>{empire?.tax}%</td>
                            </tr>
                            <tr>
                                <td>{eraArray[empire.era].trparm}</td>
                                <td align='right'>{empire?.trpArm.toLocaleString()}</td>
                            </tr>
                            <tr>
                                <td>{eraArray[empire.era].trplnd}</td>
                                <td align='right'>{empire?.trpLnd.toLocaleString()}</td>
                            </tr>
                            <tr>
                                <td>{eraArray[empire.era].trpfly}</td>
                                <td align='right'>{empire?.trpFly.toLocaleString()}</td>
                            </tr>
                            <tr>
                                <td>{eraArray[empire.era].trpsea}</td>
                                <td align='right'>{empire?.trpSea.toLocaleString()}</td>
                            </tr>
                            <tr>
                                <td>{eraArray[empire.era].trpwiz}</td>
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