import { Center, Group } from '@mantine/core'
import { useSelector } from 'react-redux'
import { eraArray } from '../../config/eras'
import PubBuyCard from './pubBuyCard'
import { useTranslation } from 'react-i18next'

export default function PublicMarketBuy({ empire })
{
    // const empire = useSelector((state) => state.empire.empire)
    const { pvtmTrpArm, pvtmTrpLnd, pvtmTrpFly, pvtmTrpSea, pvtmFood, pvtmRunes } = useSelector((state) => state.games.activeGame)
    const { otherItems } = useSelector((state) => state.market)
    const marketStatus = useSelector(state => state.market.statusOthers)
    // console.log(otherItems)
    const { t } = useTranslation(['finance', 'eras'])

    const eraName = eraArray[empire.era].name.toLowerCase()

    return (
        <main>
            <Center my={10} maw={950}>
                <Group spacing='sm' position='center'>
                    <>
                        <PubBuyCard eraItem={t(`eras:eras.${eraName}.trparm`)} type='arm' owned={empire.trpArm} item={otherItems['arm']} base={pvtmTrpArm} cash={empire.cash} empireId={empire.id} empireUUID={empire.uuid} status={marketStatus} game_id={empire.game_id} />

                        <PubBuyCard eraItem={t(`eras:eras.${eraName}.trplnd`)} type='lnd' owned={empire.trpLnd} item={otherItems['lnd']} base={pvtmTrpLnd} cash={empire.cash} empireId={empire.id} empireUUID={empire.uuid} status={marketStatus} game_id={empire.game_id} />

                        <PubBuyCard eraItem={t(`eras:eras.${eraName}.trpfly`)} type='fly' owned={empire.trpFly} item={otherItems['fly']} base={pvtmTrpFly} cash={empire.cash} empireId={empire.id} empireUUID={empire.uuid} status={marketStatus} game_id={empire.game_id} />

                        <PubBuyCard eraItem={t(`eras:eras.${eraName}.trpsea`)} type='sea' owned={empire.trpSea} item={otherItems['sea']} base={pvtmTrpSea} cash={empire.cash} empireId={empire.id} empireUUID={empire.uuid} status={marketStatus} game_id={empire.game_id} />

                        <PubBuyCard eraItem={t(`eras:eras.${eraName}.food`)} type='food' owned={empire.food} item={otherItems['food']} base={pvtmFood} cash={empire.cash} empireId={empire.id} empireUUID={empire.uuid} status={marketStatus} game_id={empire.game_id} />

                        <PubBuyCard eraItem={t(`eras:eras.${eraName}.runes`)} type='runes' owned={empire.runes} item={otherItems['runes']} base={pvtmRunes} cash={empire.cash} empireId={empire.id} empireUUID={empire.uuid} status={marketStatus} game_id={empire.game_id} />

                    </>
                </Group>
            </Center>
        </main>
    )
}
