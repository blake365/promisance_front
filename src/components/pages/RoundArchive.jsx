import { Container, Title, Loader, Text, Card } from '@mantine/core'
import { HeroImageRight } from './homeHero'
import FooterSocial from '../layout/footer'
import { useEffect, useState } from 'react'
import Axios from 'axios'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import HistoryCard from './HistoryCard'
import { SlimHero } from './slimHero'

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


    return (
        <div>
            <SlimHero />
            <Container size='lg' mt='lg' mih={'90vh'}>
                {loading ? <Loader /> : round.empireHistory.map((empire) =>
                {
                    // console.log(empire)
                    return (
                        <HistoryCard empire={empire} key={empire.id} />
                    )
                })}
            </Container>
            <FooterSocial />
        </div>
    )
}

export default RoundArchive
