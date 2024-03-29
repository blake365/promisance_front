import { Tabs, Title, Center, Stack, Text } from "@mantine/core"
import PublicMarketBuy from "./PublicMarketBuy"
import PublicMarketSell from "./PublicMarketSell"

import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { fetchMyItems, fetchOtherItems } from '../../store/pubMarketSlice'
import { checkRoundStatus } from "../../functions/checkRoundStatus"
//FIXED: bug with data loading/rendering??

export default function PublicMarket()
{
    const { empire } = useSelector((state) => state.empire)

    const dispatch = useDispatch()

    // console.log(marketStatus)
    useEffect(() =>
    {
        if (empire) {
            let marketValues = { empireId: empire.id }
            dispatch(fetchOtherItems(marketValues))
            dispatch(fetchMyItems(marketValues))
        }
    }, [])

    const [activeTab, setActiveTab] = useState('Buy');

    const roundStatus = checkRoundStatus()

    return (
        <main>
            <Center mb={10}>
                <Stack spacing='sm' align='center'>
                    <img src='/images/pm.webp' height='200' style={{ maxHeight: '200px', maxWidth: '100%', borderRadius: '10px' }} alt='public market' />
                    <Title order={1} align='center'>
                        Public Market
                    </Title>
                    <Text align="center">
                        Purchase or sell goods between other players on the Public Market
                    </Text>
                    {roundStatus ? <Text align='center' color='red'>The Public Market is currently closed.</Text> :
                        <div>
                            <Tabs styles={{
                                tabLabel: { fontSize: '1.2rem' },
                            }} value={activeTab} onTabChange={setActiveTab}>
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
                        </div>}
                </Stack>
            </Center>
        </main>
    )
}
