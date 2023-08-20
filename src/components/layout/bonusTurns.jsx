import { Button } from '@mantine/core'
import { useSelector } from 'react-redux'
import Axios from 'axios'
import { useDispatch } from 'react-redux'
import { empireLoaded } from '../../store/empireSlice'
// add a whole new redux slice for empire effects

export default function BonusTurns()
{
    const dispatch = useDispatch()
    const { empire } = useSelector((state) => state.empire)
    // console.log(data.empire)
    let effects = useSelector((state) => state.effects.effects)

    const getBonusTurns = async () =>
    {
        try {
            const res = await Axios.post(`empire/${empire.uuid}/bonus`, { empireId: empire.id })
            dispatch(empireLoaded(res.data))
        } catch (error) {
            console.log(error)
        }
    }

    effects = effects.filter(effect => (effect.empireEffectName === 'bonus turns'))

    return (
        <div>
            {effects.length > 0 ? ('') : (<Button onClick={getBonusTurns} compact size='sm' color='green'>Bonus Turns</Button>)}
        </div>
    )
}
