import { useEffect } from 'react';
import Axios from 'axios';
import { load } from '../store/userSlice';
import { persistor } from '../store/store';
import { useDispatch } from "react-redux";
import { logoutEmpire } from "../store/empireSlice";
import { resetUser } from "../store/userSlice";

async function loadUser()
{
    const res = await Axios.get('auth/me');
    if (res.status !== 200) {
        persistor.pause();
        persistor.flush().then(() =>
        {
            return persistor.purge();
        });
        dispatch(resetUser());
        dispatch(logoutEmpire());
    } else if (res.data) {
        dispatch(load());
    }
}

export default loadUser;