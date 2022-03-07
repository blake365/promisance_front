import { Tabs, Title, Group, Center } from "@mantine/core"
import PrivateMarketBuy from "./PrivateMarketBuy"
import PrivateMarketSell from "./PrivateMarketSell"

export default function PrivateMarket()
{

    return (
        <main style={{ paddingTop: '1rem' }}>
            <Center mb={10}>
                <Group direction='column' spacing='sm' align='center'>
                    <Title order={1} align='center'>
                        Black Market
                    </Title>
                    <div>
                        Purchase or sell goods on the Black Market
                    </div>
                    <Tabs position='center' grow
                        styles={{
                            tabControl: { fontSize: '1.2rem' },
                        }}>
                        <Tabs.Tab label="Buy">
                            <PrivateMarketBuy />
                        </Tabs.Tab>
                        <Tabs.Tab label="Sell" >
                            <PrivateMarketSell />
                        </Tabs.Tab>
                    </Tabs>

                </Group>
            </Center>
        </main>
    )
}
