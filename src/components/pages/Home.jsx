import { Card, Group, Box, Title, Text, Button, Center, Badge, Container, Flex, Grid, Anchor, Loader } from '@mantine/core'
import { HeroImageRight } from './homeHero'
import { useState, Suspense } from 'react'
import lazy from '../utilities/lazyWrapper'
const HomeNews = lazy(() => import('../layout/homeNews'));
const HomeScores = lazy(() => import('../layout/homeScores'));
import FooterSocial from '../layout/footer'
import { ROUND_END, ROUND_START, TURNS_COUNT, TURNS_DEMO, TURNS_FREQ, TURNS_MAXIMUM, TURNS_STORED } from '../../config/config'
import { demo } from '../../store/userSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useMediaQuery } from '@mantine/hooks';
import BigCarousel from '../layout/embla/Carousel'
import { getTime } from '../../store/timeSlice'
import { onLCP } from 'web-vitals'


export default function Home()
{
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [error, setError] = useState(null)
    dispatch(getTime())

    const now = new Date().getTime()

    let roundStatus = false
    let upcoming = new Date(ROUND_START).getTime() - now
    let remaining = new Date(ROUND_END).getTime() - now

    if (upcoming > 0) {
        roundStatus = true
    } else if (remaining < 0) {
        roundStatus = true
    } else {
        roundStatus = false
    }

    onLCP(console.log)


    const smScreen = useMediaQuery('(max-width: 768px)')
    const mdScreen = useMediaQuery('(min-width: 992px)')

    const demoRegister = () =>
    {
        dispatch(demo()).unwrap().then(() => navigate('/demo')).catch((err) =>
        {
            // console.log(err)
            setError(err)
        })
    }

    return (
        <main style={{ backgroundColor: '#F1F3F5' }}>
            <HeroImageRight />
            <Container size='lg' align='center' mt='lg'>
                <Grid justify='center' align='center' mb='lg'>
                    <Grid.Col md={5} sm={12}>
                        <Box align='left' my='lg'>
                            <Title order={1}>About the Game</Title>
                            <Text size='lg'>Promisance is a classic browser based multiplayer game from the early 2000s. In the game players build an empire and compete to become the richest empire in the server. Players use turns to explore for land, gather resources, build different types of buildings, buy and sell goods, cast spells, and raise an army to attack other players. The game unfolds over weeks and months as players vie for power. </Text>
                            <Text size='lg' mt='xs'>NeoPromisance is a modern remake of the game with a new interface and some new features. The game is in active development with new features and balance updates coming all the time. Join us today!</Text>
                        </Box>
                    </Grid.Col>
                    <Grid.Col md={7} sm={12}>
                        {smScreen ? <section className="sandbox__carousel"><BigCarousel slides={Array.from(Array(4).keys())} options={{}} /></section> : <section className="sandbox__carousel"><BigCarousel slides={Array.from(Array(5).keys())} options={{}} big /></section>}
                    </Grid.Col>
                </Grid>

                <Grid justify='center' my='lg'>
                    <Grid.Col md={4} sm={12}>
                        <Title order={1} ta='left'>Choose Your Strategy</Title>
                        <Text ta='left' mb='md' size='lg'>There are many ways to play Promisance. Use your turns to build structures and take actions to produce different resources. As your empire grows, you will need to attack other players to acquire the land needed to grow even larger. It is common to be attacked in this game but there are limits to try and prevent anyone from taking too much damage. Be sure to protect yourself from enemy spells by using a spell shield. Below are the Big Four strategies you can choose from, but feel free to get creative and find a strategy that works for you!</Text>
                        {mdScreen ? (<Box my='lg'>
                            <Title order={1} align='center' mb='lg'>Ready to Play?</Title>
                            <Flex justify="center"
                                gap='md'
                                align="center"
                                direction="row"
                                wrap="wrap">
                                <Card maw={380} h={220} p='lg' withBorder shadow='sm' >
                                    <Text>Register a new account to create your empire and start your journey. If you still have questions, there is a built in and <Anchor href='https://guide.neopromisance.com' target="_blank">external ↗</Anchor> guide to answer questions that may arise as you play.
                                    </Text>
                                    <Button size='md' component='a' sx={{ marginTop: 10 }} href='/register'>Register</Button>
                                </Card>
                                <Card maw={380} h={220} p='lg' withBorder shadow='sm'>
                                    <Text>Try a demo account to get a taste of what's in store. Demo accounts get {TURNS_DEMO.toLocaleString()} turns and cannot be accessed once the session is closed or ends after one hour.</Text>
                                    <Button size='md' sx={{ marginTop: 10 }} disabled={roundStatus} component='a' onClick={demoRegister}>Demo Account</Button>
                                    {roundStatus ? (<Text color='red' align='center' size='sm'>Demo accounts are only available when the round is active.</Text>) : ('')}
                                    <Text color='red' align='center' size='sm'>{error && error.error}</Text>
                                </Card>
                            </Flex>
                        </Box>) : ('')}
                    </Grid.Col>
                    <Grid.Col md={8} sm={12}>
                        <Grid justify='center' align='center' maw={740} my='md'>
                            <Grid.Col sm={6} xs={12}>
                                <Card ta='left' w={350} mih={440} withBorder mb='md' shadow='sm'>
                                    <Card.Section>
                                        <img src='/images/farm.webp' alt='farm' height={175} width={350} loading='lazy' />
                                    </Card.Section>
                                    <Title order={2}>Farming</Title>
                                    <Text mt='sm' size='sm'>As a Farmer you will focus your build on farms to produce as much food as possible. Sell your excess food to other players on the Public Market to grow your wealth. Master the dynamics of supply and demand to price your goods. Use your wealth to buy an army, and increase your land through attacks.</Text>
                                    <Card.Section inheritPadding withBorder py='sm' mt='xs'>
                                        <Badge variant='filled' color='green'>Gremlin</Badge> <Badge variant='filled' color='green'>Hobbit</Badge> <Badge variant='filled' color='green'>Ghoul</Badge>
                                    </Card.Section>
                                </Card>
                                <Card ta='left' w={350} mih={440} withBorder shadow='sm'>
                                    <Card.Section>
                                        <img src='/images/industry.webp' alt='farm' height={175} width={350} loading='lazy' />
                                    </Card.Section>
                                    <Title order={2}>Industry</Title>
                                    <Text mt='sm' size='sm'>Focus on industry to produce troops for attack and defense. Build blacksmiths and keeps to produce troops and lower the cost of keeping them housed and fed. As you produce troops you can sell them on the Public Market to other players for a nice profit. The sale of your troops will fund your cash and food needs.</Text>
                                    <Card.Section inheritPadding withBorder py='sm' mt='xs'>
                                        <Badge variant='filled' color='red'>Dwarf</Badge> <Badge variant='filled' color='red'>Orc</Badge> <Badge variant='filled' color='red'>Goblin</Badge> <Badge variant='filled' color='red'>Ghoul</Badge>
                                    </Card.Section>
                                </Card>
                            </Grid.Col>
                            <Grid.Col sm={6} xs={12}>
                                <Card ta='left' w={350} mih={440} withBorder mb='md' shadow='sm'>
                                    <Card.Section>
                                        <img src='/images/cash.webp' alt='farm' height={175} width={350} loading='lazy' />
                                    </Card.Section>
                                    <Title order={2}>Cashing</Title>
                                    <Text mt='sm' size='sm'>As a Casher you will focus your buildings on huts and markets to grow your empire's economy. Use your excess cash to purchase food and troops from other players or from your Black Market. You may even be able to resell items for a profit. Balance your tax rate with what your citizens can bear for the best cash production.</Text>
                                    <Card.Section inheritPadding withBorder py='sm' mt='xs'>
                                        <Badge variant='filled' color='yellow'>Gnome</Badge> <Badge variant='filled' color='yellow'>Minotaur</Badge> <Badge variant='filled' color='yellow'>Vampire</Badge>
                                    </Card.Section>
                                </Card>
                                <Card ta='left' w={350} mih={440} withBorder shadow='sm'>
                                    <Card.Section>
                                        <img src='/images/magic.webp' alt='farm' height={175} width={350} loading='lazy' />
                                    </Card.Section>
                                    <Title order={2}>Magic</Title>
                                    <Text mt='sm' size='sm'>As a Mage you will rely on wizards and spells to create resources. Mage towers bring wizards to your land and produce the mana required for spells. Cast spells like Tree of Gold and Cornucopia to produce cash and food for your empire. Use offensive spells to tip battles in your favor or steal resources from undefended foes. </Text>
                                    <Card.Section inheritPadding withBorder py='sm' mt='xs'>
                                        <Badge variant='filled' color='indigo'>Elf</Badge> <Badge variant='filled' color='indigo'>Drow</Badge> <Badge variant='filled' color='indigo'>Pixie</Badge>
                                    </Card.Section>
                                </Card>
                            </Grid.Col>
                        </Grid>
                    </Grid.Col>
                </Grid>

                {smScreen || !mdScreen ? (<Box my='lg'>
                    <Title order={1} align='center' mb='lg'>Ready to Play?</Title>
                    <Flex justify="center"
                        gap='md'
                        align="center"
                        direction="row"
                        wrap="wrap">
                        <Card maw={380} h={220} p='lg' withBorder >
                            <Text >Register a new account to create your empire and start your journey. If you still have questions, there is a built in guide to answer questions that may arise as you play.
                            </Text>
                            <Button size='md' component='a' sx={{ marginTop: 10 }} href='/register'>Register</Button>
                        </Card>
                        <Card maw={380} h={220} p='lg' withBorder >
                            <Text>Try a demo account to get a taste of what's in store. Demo accounts get {TURNS_DEMO.toLocaleString()} turns and cannot be accessed once the session is closed or ends after one hour.</Text>
                            <Button size='md' sx={{ marginTop: 10 }} disabled={roundStatus} component='a' onClick={demoRegister}>Demo Account</Button>
                            {roundStatus ? (<Text color='red' align='center' size='sm'>Demo accounts are only available when the round is active.</Text>) : ('')}
                            <Text color='red' align='center' size='sm'>{error && error.error}</Text>
                        </Card>
                    </Flex>
                </Box>) : ('')}
                <Box my='lg'>
                    <Title order={1} align='center' mb='lg'>Current Game Info</Title>
                    <Card withBorder >
                        <Grid justify="space-between" grow columns={15}>
                            <Grid.Col span={3}>
                                <Center h={30} miw={100} >
                                    <Text weight='bold' align='center' >
                                        Max Turns
                                    </Text>
                                </Center>
                                <Text>{TURNS_MAXIMUM}</Text>
                            </Grid.Col>
                            <Grid.Col span={3}>
                                <Center h={30} miw={100} >
                                    <Text weight='bold' align='center' >
                                        Stored Turns
                                    </Text>
                                </Center>
                                <Text>{TURNS_STORED}</Text>
                            </Grid.Col>
                            <Grid.Col span={3}>
                                <Center h={30} miw={100} >
                                    <Text weight='bold' align='center' >
                                        Turn Rate
                                    </Text>
                                </Center>
                                <Text>{TURNS_COUNT} turn / {TURNS_FREQ} minutes</Text>
                            </Grid.Col>
                            <Grid.Col span={3}>
                                <Center h={30} miw={100} >
                                    <Text weight='bold' align='center' >
                                        Round Start Date
                                    </Text>
                                </Center>
                                <Text>{ROUND_START.toLocaleDateString()}</Text>
                            </Grid.Col>
                            <Grid.Col span={3}>
                                <Center h={30} miw={100} >
                                    <Text weight='bold' align='center' >
                                        Round End Date
                                    </Text>
                                </Center>
                                <Text>{ROUND_END.toLocaleDateString()}</Text>
                            </Grid.Col>
                        </Grid>
                    </Card>
                </Box>
                <Group my='md' position='center' align='flex-start'>
                    <Suspense fallback={<Center><Loader size='xl' /></Center>}>
                        <HomeScores />
                        <HomeNews />
                    </Suspense>
                </Group>
            </Container>
            <FooterSocial />
        </main>
    )
}