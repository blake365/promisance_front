import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Tooltip, ActionIcon } from '@mantine/core'
import Axios from 'axios'
import { useLoadEmpire } from '../../hooks/useLoadEmpire'
import { setResult } from '../../store/turnResultsSlice'
import { RepeatOnce } from '@phosphor-icons/react'
import { clearRepeat } from '../../store/repeatSlice'

const RepeatButton = ({ empire, kickOut }) =>
{
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const loadEmpire = useLoadEmpire(empire.uuid)
    const location = window.location.pathname
    const repeatAction = useSelector((state) => state.repeat.repeat)
    // console.log(repeatAction)
    const handleClick = async () =>
    {
        if (repeatAction.route) {
            try {
                setLoading(true)
                const res = await Axios.post(repeatAction.route, repeatAction.body)
                // console.log(res.data)
                dispatch(setResult(res.data))
                loadEmpire()
                setLoading(false)
            } catch (error) {
                kickOut(error)
            }
        }
    }

    // if route is for an attack, set a 3 second delay where button is disabled
    useEffect(() =>
    {
        if (repeatAction.route === '/attack' || repeatAction.route === '/magic/attack') {
            setLoading(true);
            setTimeout(() =>
            {
                setLoading(false);
            }, 4000);
        }
    }, [empire])


    useEffect(() =>
    {
        dispatch(clearRepeat())
    }, [location])

    if (!repeatAction?.route) { return null }
    return (
        <div style={{ position: 'fixed', right: '20px', bottom: '5%', zIndex: 10 }}>
            <Tooltip label="Repeat Action" withArrow>
                <ActionIcon color={repeatAction.color} size='xl' radius='xl' variant='filled' onClick={handleClick} loading={loading}>
                    <RepeatOnce size={30} strokeWidth={1.5} />
                </ActionIcon>
            </Tooltip>
        </div>
    )
}

export default RepeatButton