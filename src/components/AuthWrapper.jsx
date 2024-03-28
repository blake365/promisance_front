import { useKickOut } from '../hooks/useKickOut'
import { useEffect } from 'react';
import Axios from 'axios';
import { load } from '../store/userSlice';
import { persistor } from '../store/store';
import { useDispatch } from "react-redux";
import { logoutEmpire } from "../store/empireSlice";
import { resetUser } from "../store/userSlice";

const AuthWrapper = ({ children }) =>
{
    const location = window.location.pathname
    console.log('location', location)
    const dispatch = useDispatch()

    useEffect(() =>
    {
        async function loadUser()
        {
            // console.log('loading user')
            const res = await Axios.get('auth/me')
            console.log('status', res.data)
            if (res.status !== 200) {
                console.log('not 200')
                persistor.pause();
                persistor.flush().then(() =>
                {
                    return persistor.purge();
                })
                dispatch(resetUser())
                dispatch(logoutEmpire())
            } else if (res.data) {
                dispatch(load())
            }
        }

        loadUser()
    }, [location])

    return children;
};

export default AuthWrapper;