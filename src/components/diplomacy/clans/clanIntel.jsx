import
{
    Center,
    Stack,
    Accordion
} from '@mantine/core'
import { useEffect, useState } from 'react'
import Axios from 'axios'
import { useTranslation } from 'react-i18next'
import Intel from '../intel'

export default function ClanIntel({ members })
{
    // console.log(members)

    const [intel, setIntel] = useState()
    const { t } = useTranslation('diplomacy')
    const body = { ownerId: members }

    // console.log(body)
    // load intel
    useEffect(() =>
    {
        const loadIntel = async (body) =>
        {
            try {
                const res = await Axios.post('/intel/clan', body)
                // console.log(res.data)
                return res.data
            } catch (error) {
                console.log(error)
            }
        }
        loadIntel(body).then((data) => setIntel(data))
    }, [])

    // console.log(intel)

    return (
        <section>
            <Center>
                <Stack spacing='sm' align='center'>
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
                    ) : (<div>{t('diplomacy:intel.noneAvailable')}</div>)}
                </Stack>
            </Center>
        </section>
    )
}