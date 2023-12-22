import { Title, Card, Avatar, Tabs, Text, Group, Indicator, Collapse, Image, ThemeIcon } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { raceArray } from '../../config/races'
import { eraArray } from '../../config/eras'
import { Mountains, Scales, Hourglass, Sword } from "@phosphor-icons/react"
import NetProduced from '../utilities/NetProduced'

const HistoryCard = ({ empire }) =>
{
    const [opened, { toggle }] = useDisclosure(false);

    let color = ''
    let disabled = false

    if (empire.mode === 'demo') {
        color = 'brown'
    }

    if (empire.flags === 1) {
        color = 'red'
    }
    if (empire.mode === 'admin') {
        color = 'orange'
    }

    return (
        <Card shadow="sm" radius="sm" sx={{ width: '100%', }} key={empire.id} withBorder my='sm'>
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
                            <Title order={4} color={color}>
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
                <Text>{empire.profile}</Text>
                <Text>Income: {empire.empireHistoryIncome}</Text>
                <Text>Expenses: {empire.empireHistoryExpenses}</Text>
                <Text>Cash Net: {empire.empireHistoryIncome - empire.empireHistoryExpenses}</Text>

                <Text>Food Production: {empire.empireHistoryFoodPro}</Text>
                <Text>Food Consumption: {empire.empireHistoryFoodCon}</Text>
                <Text>Food Net: {empire.empireHistoryFoodPro - empire.empireHistoryFoodCon}</Text>

                <Text>Industry Production: {empire.empireHistoryIndyProd}</Text>
                <Text>Magic Production: {empire.empireHistoryMagicProd}</Text>
                <Text>Attack Gains: {empire.empireHistoryAttackGain}</Text>
                <Text>Attack Losses: {empire.empireHistoryAttackLoss}</Text>
                <Text>Networth per turn: {Math.round(Number(empire.empireHistoryNetworth) / empire.turnsUsed)}</Text>
            </Collapse>
            <Card.Section sx={{ height: '2px' }}>
            </Card.Section>
        </Card>
    )
}

export default HistoryCard