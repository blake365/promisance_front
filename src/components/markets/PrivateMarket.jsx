import { Tabs, Title, Center, Stack, Text } from "@mantine/core"
import PrivateMarketBuy from "./PrivateMarketBuy"
import PrivateMarketSell from "./PrivateMarketSell"
import { checkRoundStatus } from "../../functions/checkRoundStatus"

export default function PrivateMarket()
{

    const roundStatus = checkRoundStatus()

    return (
        <main>
            <Center mb={10}>
                <Stack spacing='sm' align='center' w={675}>
                    <img src='/images/bm2.webp' height='200' style={{ maxHeight: '200px', maxWidth: '100%', borderRadius: '10px' }} alt='black market' />
                    <Title order={1} align='center'>
                        Black Market
                    </Title>
                    <Text align='center'>
                        Purchase or sell goods on the Black Market
                    </Text>
                    {roundStatus ? <Text align='center' color='red'>The Black Market is currently closed.</Text> : (<Tabs defaultValue="Buy"
                        styles={{
                            tabLabel: { fontSize: '1.2rem' },
                        }}>
                        <Tabs.List grow position="center">
                            <Tabs.Tab value="Buy">Buy</Tabs.Tab>
                            <Tabs.Tab value="Sell">Sell</Tabs.Tab>
                        </Tabs.List>

                        <Tabs.Panel value="Buy">
                            <PrivateMarketBuy />
                        </Tabs.Panel>
                        <Tabs.Panel value="Sell" >
                            <PrivateMarketSell />
                        </Tabs.Panel>
                    </Tabs>)}


                </Stack>
            </Center>
        </main>
    )
}
