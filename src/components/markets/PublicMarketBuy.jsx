import { Button, Center, Group, Card, Text } from '@mantine/core'
import { useDispatch, useSelector } from 'react-redux'
// import { useForm } from '@mantine/form'
import Axios from 'axios'
import { empireLoaded } from '../../store/empireSlice'
import { useState } from 'react'
import { eraArray } from '../../config/eras'
import { raceArray } from '../../config/races'
// import { PVTM_FOOD, PVTM_SHOPBONUS, PVTM_TRPARM, PVTM_TRPFLY, PVTM_TRPLND, PVTM_TRPSEA } from '../../config/config'
// import { MaxButton } from '../utilities/maxbutton'
// import { fetchOtherItems } from '../../store/pubMarketSlice'

// TODO: make it mobile friendly

export default function PublicMarketBuy({ empire })
{
    // Public Market Workflow:
    // get other items from redux store
    // search for lowest price troops of each type
    // display in market view
    // on purchase, add items to current empire, deduct cash spent
    // allow for partial purchases, update entry in db
    // add cash spent to selling empire, remove entry from db
    // refresh search for new lowest price troops of each type
    //TODO: create news event for seller that shows items were purchased

    const { otherItems } = useSelector((state) => state.market)

    const [result, setResult] = useState(null)

    // const { empire } = useSelector((state) => state.empire)

    const dispatch = useDispatch()
    // console.log(result)

    const loadEmpireTest = async () =>
    {
        try {
            const res = await Axios.get(`/empire/${empire.uuid}`)
            // setResult(res.data)
            dispatch(empireLoaded(res.data))
        } catch (error) {
            console.log(error)
        }
    }

    const buyItem = async (values) =>
    {
        try {
            console.log(values)
            const res = await Axios.post('/market/pubBuy', values)
            // setResult(res.data)
            loadEmpireTest()
            // dispatch(fetchOtherItems())
        } catch (error) {
            console.log(error)
        }
    }

    let now = new Date()

    let unitArray = [eraArray[empire.era].trparm, eraArray[empire.era].trplnd, eraArray[empire.era].trpfly, eraArray[empire.era].trpsea, eraArray[empire.era].food]

    function truncate(value, precision)
    {
        var step = Math.pow(10, precision || 0);
        var temp = Math.trunc(step * value);

        return temp / step;
    }

    const itemsToBuy = otherItems.map((item) =>
    {
        let createdAt = new Date(item.createdAt)
        createdAt = createdAt.getTime()
        let hoursOnMarket = truncate(((now - createdAt) / 3600000), 1)

        let values = {
            id: item.id,
            amount: parseInt(item.amount, 10),
            // price: item.price,
            cost: item.amount * item.price,
            sellerId: item.empire_id,
            buyerId: empire.id
        }

        let status = 'red'
        let disable = true

        if (empire.cash >= item.amount * item.price) {
            status = 'green'
            disable = false
        }

        return (
            <Card key={item.id} shadow='sm' padding='sm'>
                <Text size="lg">{unitArray[item.type]}</Text>
                <Text><b>amount:</b>{parseInt(item.amount, 0).toLocaleString()}</Text>
                <Text><b>price:</b> ${item.price.toLocaleString()}</Text>
                <Text><b>total:</b> ${(item.amount * item.price).toLocaleString()}</Text>
                <Text><b>age: </b>{hoursOnMarket} hours</Text>
                <Button color={status} fullWidth style={{ marginTop: 14 }} disabled={disable} onClick={() => buyItem(values)}>Buy All</Button>
            </Card>
        )
    })

    return (
        <main>
            <Center my={10}>
                <Group spacing='sm' align='center'>
                    {itemsToBuy}
                </Group>
            </Center>
        </main>
    )
}
