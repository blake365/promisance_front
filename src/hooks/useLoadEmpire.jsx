import { useDispatch } from 'react-redux'
import { empireLoaded } from '../store/empireSlice'
import Axios from 'axios'

export const useLoadEmpire = (uuid) =>
{
    const dispatch = useDispatch()

    const loadEmpire = async () =>
    {
        try {
            const res = await Axios.get(`/empire/${uuid}`)
            dispatch(empireLoaded(res.data))
        } catch (error) {
            console.log(error)
        }
    }

    return loadEmpire
}