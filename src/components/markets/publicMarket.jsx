import { Tabs, Title, Group, Center, Stack } from "@mantine/core"
import PublicMarketBuy from "./PublicMarketBuy"
import PublicMarketSell from "./PublicMarketSell"

import { useSelector } from "react-redux"

export default function PublicMarket()
{
    const { empire } = useSelector((state) => state.empire)

    return (
        <main>
            <Center mb={10}>
                <Stack spacing='sm' align='center'>
                    <Title order={1} align='center'>
                        Public Market
                    </Title>
                    <div>
                        Purchase or sell goods between other players on the Public Market
                    </div>
                    <Tabs defaultValue="Buy" styles={{
                        tabLabel: { fontSize: '1.2rem' },
                    }}>
                        <Tabs.List grow position="center">
                            <Tabs.Tab value="Buy">Buy</Tabs.Tab>
                            <Tabs.Tab value="Sell">Sell</Tabs.Tab>
                        </Tabs.List>
                        <Tabs.Panel value="Buy">
                            <PublicMarketBuy empire={empire} />
                        </Tabs.Panel>
                        <Tabs.Panel value="Sell" >
                            <PublicMarketSell empire={empire} />
                        </Tabs.Panel>
                    </Tabs>

                </Stack>
            </Center>
        </main>
    )
}
