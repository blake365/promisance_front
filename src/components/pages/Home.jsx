import { Card, Group, Box, Title, Text, Button, TextInput, Select, Modal, Center, Stack, Badge, Container, Flex, Grid } from '@mantine/core'

import { useForm } from '@mantine/form'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { demo } from '../../store/userSlice'
import { create } from '../../store/empireSlice'

import { HeroImageRight } from './homeHero'
import HomeNews from '../layout/homeNews'
import Scores from '../scores'
import HomeScores from '../layout/homeScores'
import FooterSocial from '../layout/footer'
import { TURNS_DEMO, TURNS_FREQ, TURNS_MAXIMUM, TURNS_STORED } from '../../config/config'

// TODO: form validation
export default function Home()
{

    const [opened, setOpened] = useState(false);


    const dispatch = useDispatch()

    const { isLoggedIn, user } = useSelector((state) => state.user)
    // let { empire } = useSelector((state) => state.empire)

    const navigate = useNavigate()

    useEffect(() =>
    {
        // console.log(user)
        // console.log(user.empires)
        if (isLoggedIn && user.empires.length === 0) {
            setOpened(true)
        } else if (isLoggedIn && user.empires.length > 0) {
            // dispatch(empireLoaded(user.empires[0]))
            return navigate('app/')
        }
    }, [isLoggedIn, user, navigate])


    const form = useForm({
        initialValues: {
            name: '',
            race: 0,
        },

        validationRules: {

        },

        errorMessages: {

        },
    })

    const demoRegister = () =>
    {
        dispatch(demo())
    }

    return (

        <main style={{ backgroundColor: '#F1F3F5' }}>
            {/* <CreateEmpire opened={opened} /> */}
            <Modal
                opened={opened}
                onClose={() => setOpened(false)}
            >
                <Center>
                    <Stack spacing='sm' align='center'>
                        <Title order={1} align='center'>
                            Create Empire
                        </Title>
                        <form
                            onSubmit={form.onSubmit((values) =>
                            {
                                console.log(values)
                                dispatch(create(values))
                                setOpened(false)
                                navigate('/app/Summary')
                            })}
                        >
                            <Stack spacing='sm' align='center'>
                                <TextInput
                                    label='Name'
                                    placeholder='empire name'
                                    type='text'
                                    required
                                    {...form.getInputProps('name')}
                                />
                                <Select
                                    label="Race"
                                    placeholder="Pick one"
                                    required
                                    data={[
                                        { value: 0, label: 'Human' },
                                        { value: 1, label: 'Elf' },
                                        { value: 2, label: 'Dwarf' },
                                        { value: 3, label: 'Troll' },
                                        { value: 4, label: 'Gnome' },
                                        { value: 5, label: 'Gremlin' },
                                        { value: 6, label: 'Orc' },
                                        { value: 7, label: 'Drow' },
                                        { value: 8, label: 'Goblin' },
                                    ]}
                                    {...form.getInputProps('race')}
                                />
                                <Button type='submit'>Create</Button>
                            </Stack>
                        </form>
                    </Stack>
                </Center>
            </Modal>

            <HeroImageRight />
            <Container size='lg' align='center' mt='lg'>
                <Box align='left' my='lg'>
                    <Title order={1}>About the Game</Title>
                    <Text size='lg'>Promisance is a classic browser based multiplayer game from the early 2000s. In the game players build an empire and compete to become the richest empire in the server. Players use turns to explore for land, gather resources, build different types of buildings, buy and sell goods, cast spells, and raise an army to attack other players. </Text>
                    <Text size='lg' mt='xs'>NeoPromisance is a modern remake of the game with a new interface and some new features. The game is still in development and is not yet feature complete. Upcoming features include clans, foreign aid, and new ideas from community feedback. Join us today! </Text>
                </Box>

                {/* <Card withBorder shadow='md'>
                    <Stack spacing='sm' align='center'>
                        <Title order={1} align='center'>
                            Demo Account
                        </Title>
                        <Text>Demo accounts receive 2,000 turns and are unable to be accessed once the session expires or is closed. Register an account to play the traditional game. </Text>
                        <Button onClick={demoRegister}>Create Demo Account</Button>
                    </Stack>
                </Card> */}

                <Box>
                    <Title order={1} ta='left'>Choose Your Strategy</Title>
                    <Text ta='left' mb='md' size='lg'>There are many ways to play Promisance. Use your turns to build structures that produce different resources. As your empire grows, you will need to attack other players to acquire the land needed to grow even larger. It is common to be attacked in this game but there are limits to try and prevent anyone from taking too much damage. Be sure to protect yourself from enemy spells by using a spell shield. Below are the Big Four strategies you can choose from, but feel free to get creative and find a strategy that works for you!</Text>
                    <Group spacing='sm' position='center' >
                        <Card ta='left' w={350} mih={440} withBorder>
                            <Card.Section>
                                <img src='/images/farm.webp' alt='farm' height={200} />
                            </Card.Section>
                            <Title order={2}>Farming</Title>
                            <Text size='sm'>As a farmer you will focus your build on farms to produce as much food as possible. Sell your excess food to other players on the Public Market to grow your wealth. Master the dynamics of supply and demand to price your goods. Use your wealth to buy an army, and increase your land through attacks.</Text>
                            <Card.Section inheritPadding withBorder py='sm' >
                                <Badge color='green'>Gremlin</Badge> <Badge color='green'>Goblin</Badge>
                            </Card.Section>
                        </Card>
                        <Card ta='left' w={350} mih={440} withBorder>
                            <Card.Section>
                                <img src='/images/cash.webp' alt='farm' height={200} />
                            </Card.Section>
                            <Title order={2}>Cashing</Title>
                            <Text size='sm'>As a Casher you will focus your buildings on huts and markets to grow your empire's economy. Use your excess cash to purchase food and troops from other players or from your Black Market. You may even be able to resell items for a profit. Balance your tax rate with what your citizens can bear for the best cash production.</Text>
                            <Card.Section inheritPadding withBorder py='sm' >
                                <Badge color='yellow'>Gnome</Badge> <Badge color='yellow'>Troll</Badge>
                            </Card.Section>
                        </Card>
                    </Group>
                    <Group spacing='sm' position='center' mt='sm'>
                        <Card ta='left' w={350} mih={440} withBorder>
                            <Card.Section>
                                <img src='/images/industry.webp' alt='farm' height={200} />
                            </Card.Section>
                            <Title order={2}>Industry</Title>
                            <Text size='sm'>Focus on industry to produce troops for attack and defense. Build blacksmiths and keeps to produce troops and lower the cost of keeping them housed and fed. As you produce troops you can sell them on the Public Market to other players for a nice profit. The sale of your troops will fund your cash and food needs.</Text>
                            <Card.Section inheritPadding withBorder py='sm'>
                                <Badge color='red'>Dwarf</Badge> <Badge color='red'>Orc</Badge> <Badge color='red'>Goblin</Badge>
                            </Card.Section>
                        </Card>
                        <Card ta='left' w={350} mih={440} withBorder>
                            <Card.Section>
                                <img src='/images/magic.webp' alt='farm' height={200} />
                            </Card.Section>
                            <Title order={2}>Magic</Title>
                            <Text size='sm'>As a Mage you will rely on wizards and spells to create resources. Mage towers bring wizards to your land and produce the mana required for spells. Cast spells like Tree of Gold and Cornucopia to produce cash and food for your empire. Use offensive spells to tip battles in your favor or steal resources from undefended foes. </Text>
                            <Card.Section inheritPadding withBorder py='sm'>
                                <Badge color='indigo'>Elf</Badge> <Badge color='indigo'>Drow</Badge>
                            </Card.Section>
                        </Card>
                    </Group>
                </Box>
                <Box my='lg'>
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
                            <Button size='md' sx={{ marginTop: 10 }} component='a' href='/demo'>Demo Account</Button>
                        </Card>
                    </Flex>
                </Box>
                <Box my='lg'>
                    <Title order={1} align='center' mb='lg'>Current Game Info</Title>
                    <Card withBorder >
                        <Grid justify="space-between" grow columns={15}>
                            {/* <Grid.Col span={3}>
                                <Center h={50} >
                                    <Text weight='bold' align='center' >
                                        Total Players
                                    </Text>
                                </Center>
                                <Text></Text>
                            </Grid.Col> */}
                            <Grid.Col span={3}>
                                <Center h={50} miw={100} >
                                    <Text weight='bold' align='center' >
                                        Max Turns
                                    </Text>
                                </Center>
                                <Text>{TURNS_MAXIMUM}</Text>
                            </Grid.Col>
                            <Grid.Col span={3}>
                                <Center h={50} miw={100} >
                                    <Text weight='bold' align='center' >
                                        Stored Turns
                                    </Text>
                                </Center>
                                <Text>{TURNS_STORED}</Text>
                            </Grid.Col>
                            <Grid.Col span={3}>
                                <Center h={50} miw={100} >
                                    <Text weight='bold' align='center' >
                                        Turn Rate
                                    </Text>
                                </Center>
                                <Text>1 turn / {TURNS_FREQ} minutes</Text>
                            </Grid.Col>
                            <Grid.Col span={3}>
                                <Center h={50} miw={100} >
                                    <Text weight='bold' align='center' >
                                        Round Start Date
                                    </Text>
                                </Center>
                                <Text>TBD</Text>
                            </Grid.Col>
                            <Grid.Col span={3}>
                                <Center h={50} miw={100} >
                                    <Text weight='bold' align='center' >
                                        Round End Date
                                    </Text>
                                </Center>
                                <Text>TBD</Text>
                            </Grid.Col>
                        </Grid>
                    </Card>
                </Box>
                <Group my='md' position='center' align='flex-start'>
                    <HomeScores />
                    <HomeNews />
                </Group>
            </Container>
            <FooterSocial />
        </main>
    )
}