import { Card, Group, Header, Title, Text, Button, TextInput, Select, Modal, Center, Stack, ActionIcon } from '@mantine/core'
import Login from '../layout/Login'
import Signup from '../layout/Signup'

import { useForm } from '@mantine/form'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { demo } from '../../store/userSlice'
import { create } from '../../store/empireSlice'

import { Globe } from '@phosphor-icons/react'
import { HeroImageRight } from './homeHero'

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

        <main>
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
            <Header height={60} p='sm'>
                <Group position='apart' spacing='sm'>
                    <Title order={1}>NeoPromisance</Title>
                    <Group>
                    </Group>
                </Group>
            </Header>

            <section>
                <HeroImageRight />
                <Group position='center' spacing='xl' sx={{ padding: '2rem' }}>
                    <Card withBorder sx={{ minHeight: '300px', width: '600px' }} shadow='md'>
                        <div>
                            <Title>About the game</Title>
                            <Text>Promisance is a classic browser based game from the early 2000s. In the game players build an empire and compete to become the richest empire in the server. Players can use turns to explore for land, build different types of buildings, buy and sell goods, cast spells, and raise an army. </Text>
                            <Text>This is a single player version of the game. The game has been ported from its original PHP origins to a modern node.js and React codebase. In the future a full featured version of the game is planned with multiplayer features such as public markets, attacking, clans, foreign aid, and much more. </Text>
                        </div>
                    </Card>
                </Group>
                <Group position='center' spacing='xl' sx={{ padding: '2rem' }}>
                    <Card withBorder sx={{ height: '500px', width: '275px' }} shadow='md'>
                        <Stack spacing='sm' align='center'>
                            <Title order={1} align='center'>
                                Demo Account
                            </Title>
                            <Text>Demo accounts receive 2,000 turns and are unable to be accessed once the session expires or is closed. Register an account to play the traditional game. </Text>
                            <Button onClick={demoRegister}>Create Demo Account</Button>
                        </Stack>
                    </Card>
                    <Card withBorder sx={{ height: '350px', width: '275px' }} shadow='md'>
                        <Login />
                    </Card>
                    <Card withBorder sx={{ height: '500px', width: '275px' }} shadow='md'>
                        <Signup />
                    </Card>

                </Group>
            </section>
        </main>
    )
}