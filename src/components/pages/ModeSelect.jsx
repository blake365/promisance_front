import { Container, Box, Title, Card, Text, Grid, Center, Group, Button } from "@mantine/core";
import { TURNS_MAXIMUM, TURNS_STORED, TURNS_COUNT, TURNS_FREQ, ROUND_START, ROUND_END } from "../../config/config"
import { SlimHero } from "./slimHero";


export default function ModeSelect()
{

    // logged in user can join both game modes
    // if they have not joined, clicking button will send them to create an empire for that mode
    // if they have joined, clicking button will send them into the game for that mode

    return (
        <main style={{ backgroundColor: '#F1F3F5' }}>
            <SlimHero />
            <Container size='xl' align='center' py='xl'>
                <Group mt='md' position="center">
                    <Card withBorder maw={500} shadow='lg'>
                        <Title order={1} align='center' mb='lg'>Sprint</Title>
                        <Text align='center' mb='lg'>
                            Sprint is a fast paced game mode where you have one month to compete for the top spot so bring your best strategy and tactics to the table. Join a clan to work together and defeat the competition.
                        </Text>
                        <Box my='lg'>
                            <Title order={3} align='center'>Game Info</Title>
                            <Card>
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
                                        <Text>{TURNS_COUNT} turns / {TURNS_FREQ} min</Text>
                                    </Grid.Col>
                                    <Grid.Col span={3}>
                                        <Center h={30} miw={100} >
                                            <Text weight='bold' align='center' >
                                                Round Start
                                            </Text>
                                        </Center>
                                        <Text>{ROUND_START.toLocaleDateString()}</Text>
                                    </Grid.Col>
                                    <Grid.Col span={3}>
                                        <Center h={30} miw={100} >
                                            <Text weight='bold' align='center' >
                                                Round End
                                            </Text>
                                        </Center>
                                        <Text>{ROUND_END.toLocaleDateString()}</Text>
                                    </Grid.Col>
                                    <Grid.Col span={3}>
                                        <Center h={30} miw={100} >
                                            <Text weight='bold' align='center' >
                                                Players
                                            </Text>
                                        </Center>
                                        <Text>35</Text>
                                    </Grid.Col>
                                    <Grid.Col span={3}>
                                        <Center h={30} miw={100} >
                                            <Text weight='bold' align='center' >
                                                Avg Land
                                            </Text>
                                        </Center>
                                        <Text>XXX,XXX</Text>
                                    </Grid.Col>
                                    <Grid.Col span={3}>
                                        <Center h={30} miw={100} >
                                            <Text weight='bold' align='center' >
                                                Avg Net Worth
                                            </Text>
                                        </Center>
                                        <Text>XXX,XXX,XXX</Text>
                                    </Grid.Col>
                                </Grid>
                            </Card>
                        </Box>
                        <Button>Join / Play</Button>
                    </Card>

                    <Card withBorder maw={500} shadow='lg'>
                        <Title order={1} align='center' mb='lg'>Perpetual</Title>
                        <Text align='center' mb='lg'>
                            Perpetual is a slower paced game mode that resets over a longer period of time. This mode is great for players who want to take their time and enjoy the game at a more relaxed pace, just don't let your guard down all the way.
                        </Text>
                        <Box my='lg'>
                            <Title order={3} align='center'>Game Info</Title>
                            <Card>
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
                                        <Text>{TURNS_COUNT} turns / {TURNS_FREQ} min</Text>
                                    </Grid.Col>
                                    <Grid.Col span={3}>
                                        <Center h={30} miw={100} >
                                            <Text weight='bold' align='center' >
                                                Round Start
                                            </Text>
                                        </Center>
                                        <Text>{ROUND_START.toLocaleDateString()}</Text>
                                    </Grid.Col>
                                    <Grid.Col span={3}>
                                        <Center h={30} miw={100} >
                                            <Text weight='bold' align='center' >
                                                Round End
                                            </Text>
                                        </Center>
                                        <Text>{ROUND_END.toLocaleDateString()}</Text>
                                    </Grid.Col>
                                    <Grid.Col span={3}>
                                        <Center h={30} miw={100} >
                                            <Text weight='bold' align='center' >
                                                Players
                                            </Text>
                                        </Center>
                                        <Text>35</Text>
                                    </Grid.Col>
                                    <Grid.Col span={3}>
                                        <Center h={30} miw={100} >
                                            <Text weight='bold' align='center' >
                                                Avg Land
                                            </Text>
                                        </Center>
                                        <Text>XXX,XXX</Text>
                                    </Grid.Col>
                                    <Grid.Col span={3}>
                                        <Center h={30} miw={100} >
                                            <Text weight='bold' align='center' >
                                                Avg Net Worth
                                            </Text>
                                        </Center>
                                        <Text>XXX,XXX,XXX</Text>
                                    </Grid.Col>
                                </Grid>
                            </Card>
                        </Box>
                        <Button>Join / Play</Button>
                    </Card>
                </Group>
            </Container>
        </main>
    )
}
