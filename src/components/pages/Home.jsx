import { Card, Box, Title, Text, Button, Badge, Container, Flex, Grid, Group } from '@mantine/core'
import { HeroImageRight } from './homeHero'
import { useEffect } from 'react'
import FooterSocial from '../layout/footer'
import { useDispatch } from 'react-redux'
import { useMediaQuery } from '@mantine/hooks';
import BigCarousel from '../layout/embla/Carousel'
// import { onLCP } from 'web-vitals'
import { fetchGames } from '../../store/gamesSlice'
import Axios from 'axios';
import { persistor } from '../../store/store';
import { logoutEmpire } from "../../store/empireSlice";
import { resetUser } from "../../store/userSlice";
import { UsersFour, City, Sword, GitBranch, Alien, HourglassMedium, Envelope, ShoppingCart, Newspaper } from '@phosphor-icons/react'

export default function Home()
{
    const dispatch = useDispatch()
    // dispatch(getTime(1))

    useEffect(() =>
    {
        dispatch(fetchGames())

        // console.log('hello?')
        async function loadUser()
        {
            try {
                const res = await Axios.get('auth/me');
                // console.log(res)
            } catch (error) {
                // console.log(error)
                // localStorage.removeItem('persist:root');
                persistor.pause();
                persistor.flush().then(() =>
                {
                    return persistor.purge();
                });
                dispatch(resetUser());
                dispatch(logoutEmpire());
            }
        }

        loadUser()
    })

    // onLCP(console.log)

    const features = [
        {
            name: 'Turn Based Strategy',
            icon: <GitBranch size={20} />,
            description: 'Use your turns to explore, create resources, build structures, and attack other players. Plan your moves carefully to outmaneuver your rivals. You receive new turns over time, so be sure to use them wisely.'
        },
        {
            name: 'PvP Battles',
            icon: <Sword size={20} />,
            description: 'Engage in fierce battles using your army and spells to seize land and resources. With seven attacks and seven spells, strategic choices are key. But beware, opponents are equally determined.'
        },
        {
            name: 'Player Driven Market',
            icon: <ShoppingCart size={20} />,
            description: 'Enter a dynamic marketplace where players buy and sell resources and troops. Set prices, find deals, and build your wealth in this thriving economy.'
        },
        {
            name: '14 Races Options',
            icon: <Alien size={20} />,
            description: 'Choose from 14 different races, each with distinct strengths and weaknesses. Your choice shapes your strategy and empire.'
        },
        {
            name: '7 Types of Buildings',
            icon: <City size={20} />,
            description: 'Construct your empire wisely with seven building types. Each serves a role, from resource production to military strength. Focus on one type of building or build a mix to be well rounded.'
        },
        {
            name: 'Battle Across Eras',
            icon: <HourglassMedium size={20} />,
            description: 'Move through three different eras of the game, each with different troops and production advantages and drawbacks. Choose the best era for your strategy.'
        },
        {
            name: 'Team up in a Clan',
            icon: <UsersFour size={20} />,
            description: 'Join forces with allies in powerful clans to grow faster and defend against rivals. Collaboration and diplomacy are key as you wage war and carve your place in history.'
        },

        {
            name: 'Engage in Diplomacy',
            icon: <Envelope size={20} />,
            description: 'Forge alliances and rivalries with other players through in game messages. The political landscape can be as important as the battlefield.'
        },

        {
            name: 'Keep Up With the News',
            icon: <Newspaper size={20} />,
            description: 'Stay informed with the latest news from the game world. Read about the result of battles, spells, market events, lottery draws, and more to stay ahead of the competition.'
        }
    ]

    const strategies = [
        {
            name: 'Farmer',
            description: 'As a Farmer you will focus your build on farms to produce as much food as possible. Sell your excess food to other players on the Public Market to grow your wealth. Master the dynamics of supply and demand to price your goods. Use your wealth to buy an army, and increase your land through attacks.',
            races: ['Gremlin', 'Hobbit', 'Ghoul'],
            image: '/images/farm.webp',
            color: 'green'
        },
        {
            name: 'Industrialist',
            description: 'Focus on industry to produce troops for attack and defense.Build blacksmiths and keeps to produce troops and lower the cost of keeping them housed and fed.As you produce troops you can sell them on the Public Market to other players for a nice profit.The sale of your troops will fund your cash and food needs.',
            races: ['Dwarf', 'Orc', 'Goblin', 'Ghoul'],
            image: '/images/industry.webp',
            color: 'red'
        },
        {
            name: 'Economist',
            description: "As an Economist you will focus your buildings on huts and markets to grow your  economy. Use your excess cash to purchase food and troops from other players or from your Black Market.You may even be able to resell items for a profit.Balance your tax rate with what your citizens can bear for the best cash production.",
            races: ['Gnome', 'Minotaur', 'Vampire'],
            image: '/images/cash.webp',
            color: 'yellow'
        },
        {
            name: 'Mage',
            description: "As a Mage you will rely on wizards and spells to create resources. Mage towers bring wizards to your land and produce the mana required for spells. Cast spells like Tree of Gold and Cornucopia to produce cash and food for your empire. Use offensive spells to tip battles in your favor or steal resources from undefended foes",
            races: ['Elf', 'Drow', 'Pixie'],
            image: '/images/magic.webp',
            color: 'indigo'
        }
    ]

    const smScreen = useMediaQuery('(max-width: 768px)')

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

                <Box my='lg'>
                    <Card p='lg' withBorder>
                        <Title order={1} align='center' mb='lg'>Features</Title>
                        <Flex justify='center' wrap='wrap'>
                            {features.map((feature) => (
                                <Box key={feature.name} w={!smScreen ? 300 : 410} p='lg'>
                                    <Group spacing='xs' noWrap>{feature.icon}<Title order={3} align='left'>{feature.name}</Title></Group>
                                    <Text size='sm' align='left'>{feature.description}</Text>
                                </Box>
                            ))}
                        </Flex>
                    </Card>
                </Box>

                <Box mt='xl'>
                    <Title order={1} ta='left'>Choose Your Strategy</Title>
                    <Text ta='left' size='lg'>There are many ways to play Promisance. Use your turns to build structures and take actions to produce different resources. As your empire grows, you will need to attack other players to acquire the land needed to grow even larger. It is common to be attacked in this game but there are limits to try and prevent anyone from taking too much damage. Be sure to protect yourself from enemy spells by using a spell shield. Below are the Big Four strategies you can choose from, but feel free to get creative and find a strategy that works for you!</Text>
                </Box>
                <Flex justify='center' wrap='wrap'>
                    {strategies.map((strategy) => (
                        <Card ta='left' withBorder mb='md' shadow='sm' key={strategy.name} w={!smScreen ? 350 : 400} m='lg'>
                            <Card.Section h={175}>
                                <img src={strategy.image} alt={strategy.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading='lazy' />
                            </Card.Section>
                            <Title order={2} mt='xs'>{strategy.name}</Title>
                            <Text mt='xs' size='sm'>{strategy.description}</Text>
                            <Text size='sm' mt='sm' weight='bold'>Suggested Races:</Text>
                            {strategy.races.map(race => (<Badge key={race} variant='filled' mr='xs' color={strategy.color}>{race}</Badge>))}
                        </Card>
                    ))}
                </Flex>

                <Box my='lg'>
                    <Card p='lg' withBorder maw={722}>
                        <Title order={1} align='center' mb='lg'>Ready to Play?</Title>
                        <Text >Register a new account to create your empire and start your journey. If you still have questions, there is a built in guide and tips to help you as you play.
                        </Text>
                        <Button size='md' component='a' sx={{ marginTop: 10 }} href='/register'>Register</Button>
                    </Card>
                </Box>
            </Container>
            <FooterSocial />
        </main>
    )
}