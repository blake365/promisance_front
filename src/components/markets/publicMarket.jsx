import { Tabs, Title, Center, Stack, Loader, Text } from "@mantine/core"
import PublicMarketBuy from "./PublicMarketBuy"
import PublicMarketSell from "./PublicMarketSell"

import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { fetchMyItems, fetchOtherItems } from '../../store/pubMarketSlice'

//FIXME: bug with data loading/rendering??

export default function PublicMarket()
{
    const { empire } = useSelector((state) => state.empire)

    const [loading, setLoading] = useState(true)

    const dispatch = useDispatch()

    let marketStatus = useSelector(state => state.market.statusOthers)

    // console.log(marketStatus)
    useEffect(() =>
    {
        setLoading(true)
        if (empire) {
            let marketValues = { empireId: empire.id }
            dispatch(fetchOtherItems(marketValues))
            dispatch(fetchMyItems(marketValues))
            setLoading(false)
        }
    }, [empire, dispatch])

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
                    {marketStatus !== 'succeeded' ? (<Loader />) : (
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
                    )}
                </Stack>
            </Center>
        </main>
    )
}
