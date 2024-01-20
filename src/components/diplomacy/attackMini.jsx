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

export default function AttackMini()
{
    const { empire } = useSelector((state) => state.empire)

    function formatNumber(num)
    {
        if (num >= 1e12) {
            return (num / 1e12).toFixed(2) + ' T';
        }
        if (num >= 1e9) {
            return (num / 1e9).toFixed(2) + ' B';
        }
        if (num >= 1e6) {
            return (num / 1e6).toFixed(2) + ' M';
        }
        return num.toLocaleString();
    }

    const roundStatus = checkRoundStatus()

    return (
        <section>
            <Center>
                <Stack spacing='sm' align='center'>
                    <img src='/images/war.webp' height='200' style={{ maxHeight: '200px', maxWidth: '100%', borderRadius: '10px' }} alt='war council' />
                    <Title order={1} align='center'>
                        Attack <FavoriteButton title='Attack' empire={empire} />
                    </Title>
                    <Text align='center'>
                        Attack other players to take their land, kill their citizens, or steal their resources. Attacks take two turns.
                    </Text>
                    <AttackForm empire={empire} roundStatus={roundStatus} />
                    <Card>
                        <Card.Section withBorder inheritPadding py="xs" sx={{ display: 'flex', justifyContent: 'left', alignItems: 'baseline', height: '49px' }}>
                            <Text weight={500}>Your Army:</Text><Title ml='xs' order={4} color={eraArray[empire.era].color}>{eraArray[empire.era].name}</Title>
                        </Card.Section>
                        <Card.Section pt="sm">
                            <Table>
                                <thead>
                                    <tr>
                                        <th>
                                            Unit
                                        </th>
                                        <th style={{ textAlign: 'right' }}>
                                            Number
                                        </th>
                                        <th style={{ textAlign: 'right' }}>
                                            Attack
                                        </th>
                                        <th style={{ textAlign: 'right' }}>
                                            Defense
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{eraArray[empire.era].trparm}</td>
                                        <td align='right'>{empire?.trpArm.toLocaleString()}</td>
                                        <td align='right'>{formatNumber(Math.round(eraArray[empire.era].o_trparm * empire.trpArm * (1 + raceArray[empire.race].mod_offense / 100) * (empire.health / 100)))}</td>
                                        <td align='right'>{formatNumber(Math.round(eraArray[empire.era].d_trparm * empire.trpArm * (1 + raceArray[empire.race].mod_defense / 100) * (empire.health / 100)))}</td>
                                    </tr>
                                    <tr>
                                        <td>{eraArray[empire.era].trplnd}</td>
                                        <td align='right'>{empire?.trpLnd.toLocaleString()}</td>
                                        <td align='right'>{formatNumber(Math.round(eraArray[empire.era].o_trplnd * empire.trpLnd * (1 + raceArray[empire.race].mod_offense / 100) * (empire.health / 100)))}</td>
                                        <td align='right'>{formatNumber(Math.round(eraArray[empire.era].d_trplnd * empire.trpLnd * (1 + raceArray[empire.race].mod_defense / 100) * (empire.health / 100)))}</td>
                                    </tr>
                                    <tr>
                                        <td>{eraArray[empire.era].trpfly}</td>
                                        <td align='right'>{empire?.trpFly.toLocaleString()}</td>
                                        <td align='right'>{formatNumber(Math.round(eraArray[empire.era].o_trpfly * empire.trpFly * (1 + raceArray[empire.race].mod_offense / 100) * (empire.health / 100)))}</td>
                                        <td align='right'>{formatNumber(Math.round(eraArray[empire.era].d_trpfly * empire.trpFly * (1 + raceArray[empire.race].mod_defense / 100) * (empire.health / 100)))}</td>
                                    </tr>
                                    <tr>
                                        <td>{eraArray[empire.era].trpsea}</td>
                                        <td align='right'>{empire?.trpSea.toLocaleString()}</td>
                                        <td align='right'>{formatNumber(Math.round(eraArray[empire.era].o_trpsea * empire.trpSea * (1 + raceArray[empire.race].mod_offense / 100) * (empire.health / 100)))}</td>
                                        <td align='right'>{formatNumber(Math.round(eraArray[empire.era].d_trpsea * empire.trpSea * (1 + raceArray[empire.race].mod_defense / 100) * (empire.health / 100)))}</td>
                                    </tr>
                                    <tr>
                                        <td>All Units</td>
                                        <td></td>
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