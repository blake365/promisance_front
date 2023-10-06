import { Center, Loader, Stack } from '@mantine/core'
import { useDispatch, useSelector } from 'react-redux'

import { useState } from 'react'
import { eraArray } from '../../config/eras'
import { PVTM_TRPARM, PVTM_TRPFLY, PVTM_TRPLND, PVTM_TRPSEA, PVTM_FOOD, PVTM_RUNES } from '../../config/config'

import PubBuyCard from './pubBuyCard'

export default function PublicMarketBuy({ empire })
{
    const { otherItems } = useSelector((state) => state.market)
    let marketStatus = useSelector(state => state.market.statusOthers)
    // console.log(marketStatus)

    // console.log(otherItems)
    const [result, setResult] = useState(null)


    return (
        <main>
            <Center my={10}>
                {marketStatus !== 'succeeded' ?
                    (<Loader />) : (

                        <Stack spacing='sm' align='center'>

                            <PubBuyCard eraItem={eraArray[empire.era].trparm} type='arm' owned={empire.trpArm} item={otherItems['arm']} base={PVTM_TRPARM} cash={empire.cash} empireId={empire.id} empireUUID={empire.uuid} />

                            <PubBuyCard eraItem={eraArray[empire.era].trplnd} type='lnd' owned={empire.trpLnd} item={otherItems['lnd']} base={PVTM_TRPLND} cash={empire.cash} empireId={empire.id} empireUUID={empire.uuid} />

                            <PubBuyCard eraItem={eraArray[empire.era].trpfly} type='fly' owned={empire.trpFly} item={otherItems['fly']} base={PVTM_TRPFLY} cash={empire.cash} empireId={empire.id} empireUUID={empire.uuid} />

                            <PubBuyCard eraItem={eraArray[empire.era].trpsea} type='sea' owned={empire.trpSea} item={otherItems['sea']} base={PVTM_TRPSEA} cash={empire.cash} empireId={empire.id} empireUUID={empire.uuid} />

                            <PubBuyCard eraItem={eraArray[empire.era].food} type='food' owned={empire.food} item={otherItems['food']} base={PVTM_FOOD} cash={empire.cash} empireId={empire.id} empireUUID={empire.uuid} />

                            <PubBuyCard eraItem={eraArray[empire.era].runes} type='runes' owned={empire.runes} item={otherItems['runes']} base={PVTM_RUNES} cash={empire.cash} empireId={empire.id} empireUUID={empire.uuid} />

                        </Stack>
                    )
                }
            </Center >
        </main >
    )
}
