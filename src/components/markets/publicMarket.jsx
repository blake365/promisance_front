import { Tabs, Title, Center, Stack, Loader, Text } from "@mantine/core"
import PublicMarketBuy from "./PublicMarketBuy"
import PublicMarketSell from "./PublicMarketSell"

import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { fetchMyItems, fetchOtherItems } from '../../store/pubMarketSlice'
import { ROUND_END, ROUND_START } from "../../config/config"

//FIXED: bug with data loading/rendering??

export default function PublicMarket()
{
    const { empire } = useSelector((state) => state.empire)

    const [loading, setLoading] = useState(true)

    const dispatch = useDispatch()

    let marketStatus = useSelector(state => state.market.statusOthers)
    const { time } = useSelector((state) => state.time)

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

    const [activeTab, setActiveTab] = useState('Buy');

    let roundStatus = false
    let upcoming = time.start - time.time
    let remaining = time.end - time.time

    if (upcoming > 0) {
        roundStatus = true
    } else if (remaining < 0) {
        roundStatus = true
    } else {
        roundStatus = false
    }

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
                            {marketStatus !== 'succeeded' ? (<Loader />) : (
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
                            )}
                        </div>}
                </Stack>
            </Center>
        </main>
    )
}
