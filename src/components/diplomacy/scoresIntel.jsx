import
{
    Center, Stack, Group,
    Accordion
} from '@mantine/core'
import { useState, useEffect } from 'react'
import Axios from 'axios'
import { useSelector } from 'react-redux'
import Intel from './intel'
import SpellForm from './spellForm'

export default function ScoresIntel({ enemy })
{

    const { empire } = useSelector((state) => state.empire)
    const [intel, setIntel] = useState()

    const body = {
        ownerId: empire.id,
        spiedEmpireId: enemy.id,
    }

    // console.log(typeof body.spiedEmpireId)
    // console.log(typeof body.ownerId)
    // load intel
    useEffect(() =>
    {
        const loadIntel = async () =>
        {
            // console.log(body)
            try {
                const res = await Axios.post('/intel/scores', body)
                // console.log(res.data)
                return res.data
            } catch (error) {
                console.log(error)
            }
        }
        loadIntel().then((data) => setIntel(data))
    }, [empire.turns])

    return (
        <section>
            <Center>
                <Stack spacing='xs' align='center'>
                    <Group position='center'>
                        <SpellForm empire={empire} roundStatus={false} spy defenderId={enemy.id} />
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
                                    return (<Accordion.Item value={item.uuid} key={item.uuid} mb='md'>
                                        <Accordion.Control>{item.name} - {new Date(item.createdAt).toLocaleString()}</Accordion.Control>
                                        <Accordion.Panel>
                                            <Intel empire={item} />
                                        </Accordion.Panel>
                                    </Accordion.Item>)
                                })}
                            </Accordion>
                        ) : ('')}
                    </Group>
                </Stack>
            </Center>
        </section>
    )
}
