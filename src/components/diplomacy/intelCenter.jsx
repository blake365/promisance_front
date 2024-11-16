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
import { useTranslation } from 'react-i18next'
import { baseCost } from '../../functions/functions'
import { checkRoundStatus } from '../../functions/checkRoundStatus'
import SpellForm from './spellForm'

export default function IntelCenter()
{
    const { empire } = useSelector((state) => state.empire)
    const { t } = useTranslation(['diplomacy', 'eras'])
    const [intel, setIntel] = useState()
    const [accordionDefault, setAccordionDefault] = useState('')

    const eraName = eraArray[empire.era].name.toLowerCase()
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

    useEffect(() =>
    {
        // console.log(intel)
        if (intel && intel.length > 0) {
            // console.log(intel[0].uuid)
            setAccordionDefault(intel[0].uuid)
        }
    }, [intel])

    const roundStatus = checkRoundStatus()

    return (
        <section>
            <Center>
                <Stack spacing='sm' align='center'>
                    <img src='/images/intel.webp' height='200' style={{ maxHeight: '200px', maxWidth: '100%', borderRadius: '10px' }} alt='intel center' />
                    <Title order={1} align='center'>
                        {t('diplomacy:intel.title')}
                    </Title>
                    <Text align='center'>
                        {t('diplomacy:intel.description')}
                    </Text>
                    {empire.mode === 'demo' && <Text align='center' color='red'>{t('diplomacy:intel.demoDisabled')}</Text>}
                    <Card sx={{ width: '350px' }}>
                        <Card.Section withBorder inheritPadding py="xs">
                            <Group position='apart'>
                                <Text weight={500}>{t('diplomacy:warCouncil.castSpell')}:</Text>
                            </Group>
                        </Card.Section>
                        <Text align='left' py='xs'>
                            {t('diplomacy:intel.ratio')}: 1x, {t('diplomacy:intel.cost')}: {Math.ceil(baseCost(empire)).toLocaleString()} {t(`eras:eras.${eraName}.runes`)}
                        </Text>
                        <SpellForm empire={empire} roundStatus={roundStatus} spy />
                    </Card>
                    {intel && intel.length > 0 ? (
                        <Accordion multiple variant="separated" defaultValue={[accordionDefault]} sx={{
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
                    ) : (<div>{t('diplomacy:intel.noIntel')}</div>)}
                </Stack>
            </Center>
        </section>
    )
}