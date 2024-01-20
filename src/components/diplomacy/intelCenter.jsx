import
{
    Center,
    Title, Text,
    Stack,
    Card,
    Group, Accordion
} from '@mantine/core'
import { useEffect, useState } from 'react'
import Axios from 'axios'
import { useSelector } from 'react-redux'
import { eraArray } from '../../config/eras'
import Intel from './intel'

import { baseCost } from '../../functions/functions'
import { checkRoundStatus } from '../../functions/checkRoundStatus'
import SpellForm from './spellForm'

export default function IntelCenter()
{
    const { empire } = useSelector((state) => state.empire)

    const [intel, setIntel] = useState()

    // load intel
    useEffect(() =>
    {
        const loadIntel = async () =>
        {
            try {
                const res = await Axios.get(`/intel/${empire.id}`)
                // console.log(res.data)
                return res.data
            } catch (error) {
                console.log(error)
            }
        }
        loadIntel().then((data) => setIntel(data))
    }, [empire.turns])

    const roundStatus = checkRoundStatus()

    return (
        <section>
            <Center>
                <Stack spacing='sm' align='center'>
                    <img src='/images/intel.webp' height='200' style={{ maxHeight: '200px', maxWidth: '100%', borderRadius: '10px' }} alt='intel center' />
                    <Title order={1} align='center'>
                        Intel Center
                    </Title>
                    <Text align='center'>
                        Cast a spell to view another empire's stats. This will take two turns.
                    </Text>
                    {empire.mode === 'demo' && <Text align='center' color='red'>Intel is disabled for demo accounts.</Text>}
                    <Card sx={{ width: '350px' }}>
                        <Card.Section withBorder inheritPadding py="xs">
                            <Group position='apart'>
                                <Text weight={500}>Cast Spell:</Text>
                            </Group>
                        </Card.Section>
                        <Text align='left' py='xs'>
                            Ratio Needed: 1x, Cost: {Math.ceil(baseCost(empire)).toLocaleString()} {eraArray[empire.era].runes}
                        </Text>
                        <SpellForm empire={empire} roundStatus={roundStatus} spy />
                    </Card>
                    {intel && intel.length > 0 ? (
                        <Accordion variant="separated" defaultValue={intel[0].uuid} sx={{
                            minWidth: 350, width: 700,
                            '@media (max-width: 650px)': {
                                width: 700,
                            },
                            '@media (max-width: 700px)': {
                                width: 350,
                            },
                            '@media (max-width: 400px)': {
                                width: 350,
                            },
                        }}>
                            {intel.map((item) =>
                            {
                                return (<Accordion.Item value={item.uuid} key={item.uuid}>
                                    <Accordion.Control>{item.name} - {new Date(item.createdAt).toLocaleString()}</Accordion.Control>
                                    <Accordion.Panel>
                                        <Intel empire={item} />
                                    </Accordion.Panel>
                                </Accordion.Item>)
                            })}

                        </Accordion>
                    ) : (<div>No Intel Gathered</div>)}
                </Stack>
            </Center>
        </section>
    )
}