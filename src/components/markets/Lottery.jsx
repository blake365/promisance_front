import { Button, Center, Title, Text, Stack } from '@mantine/core'
import { useDispatch, useSelector } from 'react-redux'
import Axios from 'axios'
import { empireLoaded } from '../../store/empireSlice'
import { useEffect, useState } from 'react'
import { LOTTERY_MAXTICKETS, ROUND_END, ROUND_START, TURNS_PROTECTION } from '../../config/config'
import { generalLog } from '../../functions/functions'

export default function Lottery()
{

    const [result, setResult] = useState(null)
    const [loading, setLoading] = useState(false)
    const [jackpot, setJackpot] = useState(0)
    const [tickets, setTickets] = useState(0)
    const [totalTickets, setTotalTickets] = useState(0)
    const { empire } = useSelector((state) => state.empire)
    const { time } = useSelector((state) => state.time)
    // let loanDefault = empire.loan
    const dispatch = useDispatch()

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

    const buyTicket = async () =>
    {
        setLoading(true)
        const values = {
            empireId: empire.id,
            type: 'lottery',
        }
        try {
            const res = await Axios.post(`/lottery/buyTicket`, values)
            // console.log(res.data)
            setResult(res.data)
            loadEmpireTest()
        } catch (error) {
            console.log(error)
            setResult(error.response.data)
        }
        setLoading(false)
    }

    useEffect(() =>
    {
        const fetchJackpot = async () =>   
        {
            try {
                const res = await Axios.get(`/lottery/getJackpot`)
                // console.log(res.data)
                return res.data.success
            } catch (error) {
                console.log(error)
            }
        }

        const getTickets = async () => 
        {
            try {
                const res = await Axios.get(`/lottery/getTickets/${empire.id}`)
                // console.log(res.data)
                return res.data.success
            } catch (error) {
                console.log(error)
            }
        }

        const getTotalTickets = async () =>
        {
            try {
                const res = await Axios.get(`/lottery/getTotalTickets`)
                // console.log(res.data)
                return res.data.success
            }
            catch (error) {
                console.log(error)
            }
        }


        fetchJackpot().then((res) => setJackpot(res))
        getTickets().then((res) => setTickets(res))
        getTotalTickets().then((res) => setTotalTickets(res))

    }, [buyTicket])

    let ticketCost = Math.round(empire.networth / generalLog(empire.networth, 25))


    // console.log(result[0].action)
    let roundStatus = false
    let upcoming = ROUND_START - time
    let remaining = ROUND_END - time

    if (upcoming > 0) {
        roundStatus = true
    } else if (remaining < 0 || remaining / 1000 / 60 / 60 < 24) {
        roundStatus = true
    } else {
        roundStatus = false
    }

    return (
        <main>
            <Center mb={10}>
                <Stack spacing='sm' align='center' maw={650}>
                    <img src='/images/lottery.webp' height='200' style={{ maxHeight: '200px', maxWidth: '100%', borderRadius: '10px' }} alt='world bank' />
                    <Title order={1} align='center'>
                        Lottery
                    </Title>
                    {empire.mode === 'demo' && <Text align='center' color='red'>The lottery is not accessible to demo accounts.</Text>}
                    {empire.turnsUsed <= TURNS_PROTECTION && <Text align='center' color='red'>The lottery is only accessible once you have left protection.</Text>}
                    <Text align='center'>
                        The lottery can be a good way to get extra cash for your empire. There is a lottery drawing every 24 hours and you can buy up to {LOTTERY_MAXTICKETS} lottery tickets each day. Drawings are random and there is no guarantee of a winner. If no winner is found, the jackpot will continue to increase until there is a winner. Lottery results are posted in the World News.
                    </Text>
                    <Text align='center'>
                        You currently have <strong>{tickets}/{LOTTERY_MAXTICKETS}</strong> lottery tickets.
                    </Text>
                    <Text>
                        Total tickets purchased: <strong>{totalTickets}</strong>.
                    </Text>
                    <Text align='center'>
                        The current jackpot is <strong>${jackpot.toLocaleString()}</strong>.
                    </Text>
                    <Text align='center'>
                        A ticket costs <strong>${ticketCost.toLocaleString()}</strong>.
                    </Text>
                    <Button onClick={buyTicket} disabled={roundStatus || tickets >= LOTTERY_MAXTICKETS || empire.turnsUsed <= TURNS_PROTECTION || empire.cash < ticketCost || empire.mode === 'demo'} loading={loading}>Buy Ticket</Button>
                </Stack>
            </Center>
        </main>
    )
}
