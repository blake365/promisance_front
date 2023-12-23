import { Title, Card, Avatar, Text, Group, Collapse, Image, Table } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { eraArray } from '../../config/eras'
import { Mountains, Scales, Hourglass } from "@phosphor-icons/react"

const eraConverter = (era) =>
{
    if (era === 'Past') {
        return 0
    } else if (era === 'Present') {
        return 1
    } else if (era === 'Future') {
        return 2
    }
}

const HistoryCard = ({ empire }) =>
{
    const [opened, { toggle }] = useDisclosure(false);

    let era = eraConverter(empire.empireHistoryEra)

    return (
        <Card shadow="sm" radius="sm" sx={{ width: '100%', maxWidth: 600 }} key={empire.id} withBorder my='sm'>
            <Card.Section sx={{ height: '2px' }}>
            </Card.Section>
            <Card.Section onClick={toggle} sx={{ cursor: 'pointer' }} inheritPadding>
                <Group spacing="xs" my='xs'>
                    <Group w='100%' noWrap>
                        <Text mx='xs' align='center' sx={{ width: 25 }} weight='bolder'>
                            {empire.empireHistoryRank}
                        </Text>
                        <Group spacing='xs' noWrap>
                            <Avatar size="sm" alt={empire.profileIcon} src={empire.profileIcon} sx={(theme) => theme.colorScheme === 'dark' ? ({ filter: 'invert(1)', opacity: '75%' }) : ({ filter: 'invert(0)', })} />
                            <Title order={4}>
                                {empire.empireHistoryName}
                            </Title>
                        </Group>
                    </Group>
                    <Group spacing='lg'>
                        <Group ml='xs' sx={{ width: '150px' }} spacing='xs' noWrap>
                            <Scales size={22} weight='fill' />
                            <Text>${Number(empire.empireHistoryNetworth).toLocaleString()}</Text></Group>
                        <Group ml='xs' spacing='xs' noWrap sx={{ width: '100px' }}>
                            <Mountains size={22} weight='fill' />
                            <Text>{empire.empireHistoryLand.toLocaleString()}</Text></Group>
                        <Group ml='xs' spacing='xs' noWrap sx={{ width: '90px' }}>
                            <Hourglass size={22} weight='regular' />
                            <Text>{empire.empireHistoryEra}</Text></Group>
                        <Group ml='xs' spacing='xs' noWrap sx={{ width: '100px' }}>
                            <Image src={`/icons/${empire.empireHistoryRace.toLowerCase()}.svg`} height={22} width={22} fit='contain' sx={(theme) => theme.colorScheme === 'dark' ? ({ filter: 'invert(1)', opacity: '75%' }) : ({ filter: 'invert(0)', })} alt={empire.empireHistoryRace} />
                            <Text>{empire.empireHistoryRace}</Text>
                        </Group>

                    </Group>
                </Group>
                <Group spacing='sm'>
                    <Text size='sm'>Turns Used: {empire.turnsUsed}</Text>
                    <Text size='sm'>
                        Attacks: {empire.empireHistoryOffTotal.toLocaleString()} {empire.empireHistoryOffTotal > 0 ?
                            `(${Math.round(empire.empireHistoryOffSucc / empire.empireHistoryOffTotal * 100)}%)` : '(0%)'}
                    </Text>
                    <Text size='sm'>
                        Defends: {empire.empireHistoryDefTotal.toLocaleString()} {empire.empireHistoryDefTotal > 0 ?
                            `(${Math.round(empire.empireHistoryDefSucc / empire.empireHistoryDefTotal * 100)}%)`
                            : '(0%)'}
                    </Text>
                </Group>
                {!opened ? <Text size='sm' align='center' color='dimmed'>Click to Expand</Text> : <hr />}
            </Card.Section>
            <Collapse in={opened}>
                <Text align='left'>Profile: {empire.profile}</Text>
                <Table striped>
                    <tbody>
                        <tr>
                            <td>Income</td>
                            <td align='right'>${Number(empire.empireHistoryIncome).toLocaleString()}</td>
                        </tr>
                        <tr>
                            <td>Expenses</td>
                            <td align='right'>${Number(empire.empireHistoryExpenses).toLocaleString()}</td>
                        </tr>
                        <tr>
                            <td>Food Production</td>
                            <td align='right'>{Number(empire.empireHistoryFoodPro).toLocaleString()}</td>
                        </tr>
                        <tr>
                            <td>Food Consumption</td>
                            <td align='right'>{Number(empire.empireHistoryFoodCon).toLocaleString()}</td>
                        </tr>
                        <tr>
                            <td>Industry Production</td>
                            <td align='right'>${Number(empire.empireHistoryIndyProd).toLocaleString()}</td>
                        </tr>
                        <tr>
                            <td>Magic Production</td>
                            <td align='right'>${Number(empire.empireHistoryMagicProd).toLocaleString()}</td>
                        </tr>
                        <tr>
                            <td>Attack Gains</td>
                            <td align='right'>{Number(empire.empireHistoryAttackGain).toLocaleString()}</td>
                        </tr>
                        <tr>
                            <td>Attack Losses</td>
                            <td align='right'>{Number(empire.empireHistoryAttackLoss).toLocaleString()}</td>
                        </tr>
                        <tr>
                            <td>Net Worth per turn</td>
                            <td align='right'>${Math.round(Number(empire.empireHistoryNetworth) / empire.turnsUsed).toLocaleString()}</td>
                        </tr>
                        <tr>
                            <td>Final {eraArray[era].trparm}</td>
                            <td align='right'>{Number(empire.finalTrpArm).toLocaleString()}</td>
                        </tr>
                        <tr>
                            <td>Final {eraArray[era].trplnd}</td>
                            <td align='right'>{Number(empire.finalTrpLnd).toLocaleString()}</td>
                        </tr>
                        <tr>
                            <td>Final {eraArray[era].trpfly}</td>
                            <td align='right'>{Number(empire.finalTrpFly).toLocaleString()}</td>
                        </tr>
                        <tr>
                            <td>Final {eraArray[era].trpsea}</td>
                            <td align='right'>{Number(empire.finalTrpSea).toLocaleString()}</td>
                        </tr>
                        <tr>
                            <td>Final {eraArray[era].trpwiz}</td>
                            <td align='right'>{Number(empire.finalTrpWiz).toLocaleString()}</td>
                        </tr>
                    </tbody>
                </Table>
            </Collapse>
            <Card.Section sx={{ height: '2px' }}>
            </Card.Section>
        </Card>
    )
}

export default HistoryCard