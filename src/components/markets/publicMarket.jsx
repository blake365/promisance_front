import { Tabs, Title, Group, Center } from "@mantine/core"
import PublicMarketBuy from "./PublicMarketBuy"
import PublicMarketSell from "./PublicMarketSell"

import { useSelector } from "react-redux"

export default function PublicMarket()
{
    const { empire } = useSelector((state) => state.empire)

    return (
        <main>
            <Center mb={10}>
                <Group direction='column' spacing='sm' align='center'>
                    <Title order={1} align='center'>
                        Public Market
                    </Title>
                    <div>
                        Purchase or sell goods between other players on the Public Market
                    </div>
                    <Tabs position='center' grow
                        styles={{
                            tabControl: { fontSize: '1.2rem' },
                        }}>
                        <Tabs.Tab label="Buy">
                            <PublicMarketBuy empire={empire} />
                        </Tabs.Tab>
                        <Tabs.Tab label="Sell" >
                            <PublicMarketSell empire={empire} />
                        </Tabs.Tab>
                    </Tabs>

                </Group>
            </Center>
        </main>
    )
}
