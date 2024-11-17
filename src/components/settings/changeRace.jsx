import { Stack, Button, Group, Text, Select, Image } from '@mantine/core'
import { raceArray } from '../../config/races'
import { useForm } from '@mantine/form'
import { forwardRef } from 'react'
import Axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { empireLoaded } from '../../store/empireSlice'
import { showNotification } from '@mantine/notifications'
import { useTranslation } from 'react-i18next'

const raceObjects = raceArray.map((race, index) => ({
    icon: index,
    label: race.name,
    value: index
}))

const RaceItem = forwardRef(({ icon, label, ...others }, ref) => (
    <div ref={ref} {...others}>
        <Group>
            <Image src={`/icons/${raceArray[icon].name.toLowerCase()}.svg`} height={22} width={22} fit='contain' sx={(theme) => theme.colorScheme === 'dark' ? ({ filter: 'invert(1)', opacity: '75%' }) : ({ filter: 'invert(0)', })} />
            <Text>{label}</Text>
        </Group>
    </div>
))

function ChangeRace({ status, empire }) 
{
    const dispatch = useDispatch()
    const { t } = useTranslation('settings')
    const { turnsProtection, turnsMax } = useSelector((state) => state.games.activeGame)

    const raceForm = useForm({
        initialValues: {
            empireId: empire.id,
            type: 'race',
            race: empire.race
        }
    })

    const updateRace = async (values) =>
    {
        try {
            const res = await Axios.post(`/empire/${empire.uuid}/changeRace?gameId=${empire.game_id}`, values)
            // console.log(res.data)
            dispatch(empireLoaded(res.data))
            showNotification({
                title: t('settings:settings.raceResponseSuccess'),
                color: 'teal',
                autoClose: 2000,
            })
        } catch (error) {
            console.log(error)
            showNotification({
                title: t('settings:settings.raceResponseError'),
                color: 'orange',
            })
        }
    }

    return (
        <form onSubmit={raceForm.onSubmit((values) =>
        {
            // console.log(values)
            if (empire.turns >= Math.floor(turnsMax / 2) || empire.turnsUsed <= turnsProtection) {
                updateRace(values)
            } else {
                showNotification({
                    title: t('settings:settings.turnsError'),
                    color: 'orange',
                })
            }
        })}>
            <Stack spacing='sm' align='center'>
                <Group align='center'>
                    <Image src={`/icons/${raceArray[empire.race].name.toLowerCase()}.svg`} height={40} width={40} fit='contain' sx={(theme) => theme.colorScheme === 'dark' ? ({ filter: 'invert(1)', opacity: '75%' }) : ({ filter: 'invert(0)', })} />
                    {empire.turnsUsed > turnsProtection ? (<Text w='300px'>{t('settings:settings.changeRace', { turnsCost: Math.floor(turnsMax / 2) })}</Text>) : (<Text w='300px'>{t('settings:settings.freeRaceChange')}</Text>)}
                </Group>

                <Select
                    label={t('settings:settings.raceSelect')}
                    placeholder={t('settings:settings.pickOne')}
                    itemComponent={RaceItem}
                    data={raceObjects}
                    {...raceForm.getInputProps('race')}
                />

                <Button size='sm' compact type='submit' disabled={status}>{t('settings:settings.submit')}</Button>
            </Stack>
        </form>
    )
}

export default ChangeRace