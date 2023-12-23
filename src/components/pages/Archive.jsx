import { Container, Title, Loader, Text, Card } from '@mantine/core'
import { HeroImageRight } from './homeHero'
import FooterSocial from '../layout/footer'
import { useEffect, useState } from 'react'
import Axios from 'axios'
import { Link } from 'react-router-dom'
import { SlimHero } from './slimHero'

const Archive = () =>
{

    const [rounds, setRounds] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() =>
    {
        setLoading(true)
        const loadRounds = async () =>
        {
            try {
                const res = await Axios.get(`/archives/`)
                // console.log(res.data)
                return res.data
            } catch (error) {
                console.log(error)
            }
        }

        loadRounds().then((data) =>
        {
            setRounds(data)
            setLoading(false)
        }).catch((error) =>
        {
            console.error('Error setting news data:', error);
        });

    }, [])


    return (
        <div>
            <SlimHero />
            <Container size='lg' mt='lg'>
                <Title order={2}>Round Archives</Title>
                <p>Here you can find the results of previous rounds.</p>
                {loading ? <Loader /> : rounds.map((round) =>
                {
                    // console.log(round)
                    return (
                        <Card withBorder my='xs' shadow='sm' sx={(theme) => ({
                            '&:hover': {
                                backgroundColor: theme.colors.gray[0],
                            },
                        })} key={round.id} component={Link} to={`/archive/${round.round_h_id}`}>
                            <Title order={3}>{round.name}</Title>
                            <Text>{new Date(round.startDate).toLocaleDateString()} - {new Date(round.stopDate).toLocaleDateString()}</Text>
                            <Text>Empires: {round.allEmpires}</Text>
                            <Text>Clans: {round.allClans}</Text>
                        </Card>
                    )
                })}
            </Container>
            <FooterSocial />
        </div>
    )
}

export default Archive
