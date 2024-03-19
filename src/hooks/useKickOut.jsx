import { persistor } from '../store/store';
import { useDispatch } from "react-redux";
import { logoutEmpire } from "../store/empireSlice";
import { resetUser } from "../store/userSlice";
import { useNavigate } from "react-router-dom";

export const useKickOut = () =>
{
    const dispatch = useDispatch()
    const navigate = useNavigate()

    return (error) =>
    {
        console.log(error)
        persistor.pause();
        persistor.flush().then(() =>
        {
            return persistor.purge();
        })
        dispatch(resetUser())
        dispatch(logoutEmpire())
        navigate('/login')
    }
}