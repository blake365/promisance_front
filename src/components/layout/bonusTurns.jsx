import { Button } from '@mantine/core'
import { useSelector } from 'react-redux'
import Axios from 'axios'
import { useDispatch } from 'react-redux'
import { empireLoaded } from '../../store/empireSlice'
import { checkRoundStatus } from '../../functions/checkRoundStatus'

export default function BonusTurns()
{
    const dispatch = useDispatch()
    const { empire } = useSelector((state) => state.empire)
    // console.log(data.empire)
    const effects = useSelector((state) => state.effects.effects)
    const status = useSelector((state) => state.effects.status)
    const { turnsMax } = useSelector((state) => state.games.activeGame)


    const getBonusTurns = async () =>
    {
        try {
            const res = await Axios.post(`empire/${empire.uuid}/bonus?gameId=${empire.game_id}`, { empireId: empire.id })
            dispatch(empireLoaded(res.data))
        } catch (error) {
            console.log(error)
        }
    }

    let bonus = []

    if (status === 'succeeded') {
        bonus = effects.filter(effect => (effect.empireEffectName === 'bonus turns'))
    }

    const round = checkRoundStatus()

    return (
        round ? '' :
            <div>
                {status === 'succeeded' && empire.flags === 0 && bonus.length === 0 ? (<Button onClick={getBonusTurns} compact size='sm' color='green' mb={2.5} disabled={empire.turns >= turnsMax - 10}>Bonus Turns</Button>) : ('')}
            </div>
    )
}
