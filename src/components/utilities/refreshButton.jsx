import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Tooltip, Button } from '@mantine/core'
import { IconRefresh } from '@tabler/icons-react'
import { loadScores } from '../../store/scoresSlice'
import { useNavigate } from 'react-router-dom'
import { resetUser } from '../../store/userSlice'
import { persistor } from '../../store/store'
import { empireLoaded } from '../../store/empireSlice'
import { fetchMyItems, fetchOtherItems } from '../../store/pubMarketSlice'
import Axios from 'axios'
import { useTranslation } from 'react-i18next'
const RefreshButton = ({ empire }) =>
{
    const [refreshLoading, setRefreshLoading] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { t } = useTranslation(['turns'])
    const handleClick = async () =>
    {
        if (empire) {
            try {
                setRefreshLoading(true)
                const res = await Axios.get(`/empire/${empire.uuid}`)
                dispatch(empireLoaded(res.data))
                dispatch(fetchMyItems({ empireId: empire.id, gameId: empire.game_id }))
                dispatch(fetchOtherItems({ empireId: empire.id, gameId: empire.game_id }))
                dispatch(loadScores(empire.game_id))
                setRefreshLoading(false)
            } catch (error) {
                console.log(error)
                persistor.pause();
                persistor.flush().then(() =>
                {
                    return persistor.purge();
                })
                dispatch(resetUser())
                navigate('/login')
                console.log(error)
            }
        }
    }

    return (
        <Tooltip label={t('turns:general.refresh')} withArrow>
            <Button compact color="blue" size='sm' variant="outline" loading={refreshLoading} loaderPosition='center' onClick={handleClick}>
                <IconRefresh size={16} strokeWidth={2.5} />
            </Button>
        </Tooltip>
    )
}

export default RefreshButton