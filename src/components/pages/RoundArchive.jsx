import { Container, Title, Loader, Text, Stack, Tabs, ColorSchemeProvider, MantineProvider } from '@mantine/core'
import FooterSocial from '../layout/footer'
import { useEffect, useState } from 'react'
import Axios from 'axios'
import { useParams } from 'react-router-dom'
import HistoryCard from './HistoryCard'
import { SlimHero } from './slimHero'
import ClanHistoryCard from './ClanHistoryCard'
import { useLocalStorage } from '@mantine/hooks'

const RoundArchive = () =>
{
    const { roundId } = useParams()
    // console.log(roundId)

    const [round, setRound] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() =>
    {
        setLoading(true)
        const loadRound = async () =>
        {
            try {
                const res = await Axios.get(`/archives/${roundId}`)
                // console.log(res.data)
                return res.data
            } catch (error) {
                console.log(error)
            }
        }

        loadRound().then((data) =>
        {
            setRound(data)
            setLoading(false)
        }).catch((error) =>
        {
            console.error('Error setting history data:', error);
        });

    }, [])

    // console.log(round)
    const [colorScheme, setColorScheme] = useLocalStorage({
        key: 'prom-color-scheme',
        defaultValue: 'dark'
    });
    const toggleColorScheme = (value) =>
        setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

    return (
        <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
            <MantineProvider theme={{ colorScheme }} withGlobalStyles>
                <SlimHero />
                <Container size='lg' mt='lg' mih={'90vh'} align='center'>

                    {loading ? <Loader /> : (
                        <>
                            <Title>
                                {round.roundHistory.name} - v{round.roundHistory.gameVersion}
                            </Title>
                            <Text>
                                {new Date(round.roundHistory.startDate).toLocaleDateString()} - {new Date(round.roundHistory.stopDate).toLocaleDateString()}
                            </Text>
                            <Tabs defaultValue='empires'>
                                <Tabs.List grow position="center">
                                    <Tabs.Tab value='empires'>Empires</Tabs.Tab>
                                    <Tabs.Tab value='clans'>Clans</Tabs.Tab>
                                </Tabs.List>

                                <Tabs.Panel value='empires'>
                                    <Stack spacing='xs' align='center' mt='sm'>
                                        {round.empireHistory.map((empire) =>
                                        {
                                            // console.log(empire)

                                            return (
                                                <HistoryCard empire={empire} key={empire.id} />
                                            )

                                        })}
                                    </Stack>
                                </Tabs.Panel>

                                <Tabs.Panel value='clans'>
                                    {round.clanHistory.sort(
                                        (a, b) => (Number(a.clanHistoryTotalNet) > Number(b.clanHistoryTotalNet)) ? -1 : 1
                                    ).map((clan, index) =>
                                    {
                                        // console.log(clan)
                                        return (
                                            <ClanHistoryCard clan={clan} index={index} key={clan.id} />
                                        )
                                    })}
                                </Tabs.Panel>
                            </Tabs>

                        </>)
                    }
                </Container>
                <FooterSocial />
            </MantineProvider>
        </ColorSchemeProvider>
    )
}

export default RoundArchive
