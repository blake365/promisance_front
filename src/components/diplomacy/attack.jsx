import
{
    Center,
    Title,
    Text,
    Stack,
    Card,
    Table,
    Group,
    Button,
    ActionIcon
} from '@mantine/core'
import { useSelector } from 'react-redux'
import { defense, offense } from '../../functions/functions'
import { eraArray } from '../../config/eras'
import { raceArray } from '../../config/races'
import { Compass } from "@phosphor-icons/react"
import { checkRoundStatus } from '../../functions/checkRoundStatus'
import { useTour } from '@reactour/tour';
import { attackSteps } from '../../tour/attackSteps';
import AttackForm from './attackForm'
import SpellForm from './spellForm'

export default function Attack()
{
    const { empire } = useSelector((state) => state.empire)

    const { setIsOpen, setSteps, setMeta, setCurrentStep } = useTour()

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

    // console.log(selectedAttack)
    // console.log(otherEmpires)
    const eraDisplay = [0, 1, 2]

    const roundStatus = checkRoundStatus()

    return (
        <section>
            <Center>
                <Stack spacing='sm' align='center'>
                    <img src='/images/war.webp' height='200' style={{ maxHeight: '200px', maxWidth: '100%', borderRadius: '10px' }} alt='war council' />
                    <Group position='center' spacing='xs'>
                        <Title order={1} align='center'>
                            War Council
                            <ActionIcon size='md' ml='xs' onClick={() =>
                            {
                                setMeta('attacking tour')
                                setSteps(attackSteps)
                                setCurrentStep(0)
                                setIsOpen(true)
                            }}
                                sx={{
                                    color: '#40c057',
                                    display: 'inline',
                                }}><Compass size={24} /></ActionIcon>
                        </Title>
                    </Group>
                    <div className='attk-first-step attk-sixth-step'>

                        <Text align='center'>
                            Attack other players to take their land, kill their citizens, or steal their resources. Attacks take two turns.
                        </Text>
                        <Text align='center'>
                            Cast spells with your {eraArray[empire.era].trpwiz} to capture land, steal resources, or destroy enemy resources. Spells take two turns.
                        </Text>
                    </div>
                    {/* <Button fullWidth onClick={() =>
                    {
                        setMeta('attacking tour')
                        setSteps(attackSteps)
                        setCurrentStep(0)
                        setIsOpen(true)
                    }}
                    >Attacking Tutorial</Button> */}
                    <Group position='center' align='flex-start'>

                        <AttackForm empire={empire} roundStatus={roundStatus} />
                        <Card className='attk-step-twopointfive'>
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
                        <SpellForm empire={empire} roundStatus={roundStatus} />
                    </Group>

                    <Title order={3}>Base Unit Values</Title>
                    <Group position='center' className='attk-second-step'>
                        {eraDisplay.map((era) =>
                        {
                            return (
                                <Card key={era} sx={{ width: 255 }}>
                                    <Card.Section withBorder inheritPadding py="xs">
                                        <Title align='center' order={4} color={eraArray[era].color}>{eraArray[era].name}</Title>
                                    </Card.Section>
                                    <Card.Section pt="xs">
                                        <Table>
                                            <thead>
                                                <tr>
                                                    <th>
                                                        Unit
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
                                                    <td>{eraArray[era].trparm}</td>
                                                    <td align='right'>{eraArray[era].o_trparm}</td>
                                                    <td align='right'>{eraArray[era].d_trparm}</td>
                                                </tr>
                                                <tr>
                                                    <td>{eraArray[era].trplnd}</td>
                                                    <td align='right'>{eraArray[era].o_trplnd}</td>
                                                    <td align='right'>{eraArray[era].d_trplnd}</td>
                                                </tr>
                                                <tr>
                                                    <td>{eraArray[era].trpfly}</td>
                                                    <td align='right'>{eraArray[era].o_trpfly}</td>
                                                    <td align='right'>{eraArray[era].d_trpfly}</td>
                                                </tr>
                                                <tr>
                                                    <td>{eraArray[era].trpsea}</td>
                                                    <td align='right'>{eraArray[era].o_trpsea}</td>
                                                    <td align='right'>{eraArray[era].d_trpsea}</td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                    </Card.Section>
                                </Card>
                            )
                        })
                        }
                    </Group>
                </Stack>
            </Center>
        </section>
    )
}