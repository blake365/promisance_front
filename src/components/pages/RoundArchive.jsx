import { Container, Title, Loader, Text, Card, Tabs } from '@mantine/core'
import FooterSocial from '../layout/footer'
import { useEffect, useState } from 'react'
import Axios from 'axios'
import { useParams } from 'react-router-dom'
import HistoryCard from './HistoryCard'
import { SlimHero } from './slimHero'
import ClanHistoryCard from './ClanHistoryCard'

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

    return (
        <div>
            <SlimHero />
            <Container size='lg' mt='lg' mih={'90vh'} align='center'>

                {loading ? <Loader /> : (
                    <>
                        <Title>
                            {round.roundHistory.name}
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
                                {round.empireHistory.map((empire) =>
                                {
                                    // console.log(empire)
                                    return (
                                        <HistoryCard empire={empire} key={empire.id} />
                                    )
                                })}
                            </Tabs.Panel>

                            <Tabs.Panel value='clans'>
                                {round.clanHistory.map((clan, index) =>
                                {
                                    console.log(clan)
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
        </div>
    )
}

export default RoundArchive
