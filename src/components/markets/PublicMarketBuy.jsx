import { Center, Loader, Stack } from '@mantine/core'
import { useDispatch, useSelector } from 'react-redux'

import { useState } from 'react'
import { eraArray } from '../../config/eras'
import { PVTM_TRPARM, PVTM_TRPFLY, PVTM_TRPLND, PVTM_TRPSEA, PVTM_FOOD, PVTM_RUNES } from '../../config/config'

import PubBuyCard from './pubBuyCard'

import { MaxButton } from '../utilities/maxbutton'
// TODO: make it mobile friendly

export default function PublicMarketBuy({ empire })
{
    // Public Market Workflow:
    // get other items from redux store
    // search for lowest price troops of each type
    // organize market items to simplify display
    // display in market view
    // on purchase, add items to current empire, deduct cash spent
    // allow for partial purchases, update entry in db
    // add cash spent to selling empire, remove entry from db
    // refresh search for new lowest price troops of each type
    //TODO: create news event for seller that shows items were purchased
    //TODO: custom ordering view (show orders on sell side so they can be filled)

    const { otherItems } = useSelector((state) => state.market)
    let marketStatus = useSelector(state => state.market.status)

    const [result, setResult] = useState(null)

    // const { empire } = useSelector((state) => state.empire)

    // console.log(marketStatus)
    // console.log(otherItems)

    const dispatch = useDispatch()

    return (
        <main>
            <Center my={10}>
                {marketStatus !== 'succeeded' ?
                    (<Loader />) : (

                        <Stack spacing='sm' align='center'>

                            <PubBuyCard eraItem={eraArray[empire.era].trparm} type='arm' owned={empire.trpArm} item={otherItems} base={PVTM_TRPARM} cash={empire.cash} empireId={empire.id} empireUUID={empire.uuid} />

                            <PubBuyCard eraItem={eraArray[empire.era].trplnd} type='lnd' owned={empire.trpLnd} item={otherItems} base={PVTM_TRPLND} cash={empire.cash} empireId={empire.id} empireUUID={empire.uuid} />

                            <PubBuyCard eraItem={eraArray[empire.era].trpfly} type='fly' owned={empire.trpFly} item={otherItems} base={PVTM_TRPFLY} cash={empire.cash} empireId={empire.id} empireUUID={empire.uuid} />

                            <PubBuyCard eraItem={eraArray[empire.era].trpsea} type='sea' owned={empire.trpSea} item={otherItems} base={PVTM_TRPSEA} cash={empire.cash} empireId={empire.id} empireUUID={empire.uuid} />

                            <PubBuyCard eraItem={eraArray[empire.era].food} type='food' owned={empire.food} item={otherItems} base={PVTM_FOOD} cash={empire.cash} empireId={empire.id} empireUUID={empire.uuid} />

                            <PubBuyCard eraItem={eraArray[empire.era].runes} type='runes' owned={empire.runes} item={otherItems} base={PVTM_RUNES} cash={empire.cash} empireId={empire.id} empireUUID={empire.uuid} />

                        </Stack>
                    )
                }
            </Center >
        </main >
    )
}
