import { Container, Box, Title, Card, Text, Grid, Center } from "@mantine/core";
import { TURNS_MAXIMUM, TURNS_STORED, TURNS_COUNT, TURNS_FREQ, ROUND_START, ROUND_END } from "../../constants";
import { HomeScores } from "../layout/homeScores";
import { HomeNews } from "../layout/homeNews";
import { Suspense } from "react";


export default function ModeSelect()
{
    return (
        <Container>
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
    )
}
