import { Tabs, Title, Center, Stack, Text } from "@mantine/core"
import lazy from '../utilities/lazyWrapper'
const PrivateMarketBuy = lazy(() => import('./PrivateMarketBuy'))
const PrivateMarketSell = lazy(() => import('./PrivateMarketSell'))
// import PrivateMarketBuy from "./PrivateMarketBuy"
// import PrivateMarketSell from "./PrivateMarketSell"
import { checkRoundStatus } from "../../functions/checkRoundStatus"
import { useTranslation } from "react-i18next"

export default function PrivateMarket()
{
    const { t } = useTranslation(['finance'])
    const roundStatus = checkRoundStatus()

    return (
        <main>
            <Center mb={10}>
                <Stack spacing='sm' align='center' w={675}>
                    <img src='/images/bm2.webp' height='200' style={{ maxHeight: '200px', maxWidth: '100%', borderRadius: '10px' }} alt='black market' />
                    <Title order={1} align='center'>
                        {t('finance:blackMarket.title')}
                    </Title>
                    <Text align='center'>
                        {t('finance:blackMarket.description')}
                    </Text>
                    {roundStatus ? <Text align='center' color='red'>{t('finance:blackMarket.closed')}</Text> : (<Tabs defaultValue="Buy"
                        styles={{
                            tabLabel: { fontSize: '1.2rem' },
                        }}>
                        <Tabs.List grow position="center">
                            <Tabs.Tab value="Buy">{t('finance:blackMarket.buy')}</Tabs.Tab>
                            <Tabs.Tab value="Sell">{t('finance:blackMarket.sell')}</Tabs.Tab>
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
