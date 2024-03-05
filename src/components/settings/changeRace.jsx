import { Stack, Button, Group, Text, Select, Image } from '@mantine/core'
import { raceArray } from '../../config/races'
import { useForm } from '@mantine/form'
import { forwardRef } from 'react'
import Axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { empireLoaded } from '../../store/empireSlice'
import { showNotification } from '@mantine/notifications'

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
                title: 'Empire Race Updated',
                color: 'teal',
                autoClose: 2000,
            })
        } catch (error) {
            console.log(error)
            showNotification({
                title: 'Error changing race',
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
                    title: 'Not Enough Turns',
                    color: 'orange',
                })
            }
        })}>
            <Stack spacing='sm' align='center'>
                <Group align='center'>
                    <Image src={`/icons/${raceArray[empire.race].name.toLowerCase()}.svg`} height={40} width={40} fit='contain' sx={(theme) => theme.colorScheme === 'dark' ? ({ filter: 'invert(1)', opacity: '75%' }) : ({ filter: 'invert(0)', })} />
                    {empire.turnsUsed > turnsProtection ? (<Text w='300px'>{`Change your empire's race. This will cost you ${Math.floor(turnsMax / 2)} turns, 25% of your food, cash, and runes, and 10% of your population and army. `}</Text>) : (<Text w='300px'>{`Change your empire's race. There is no cost to changing your race while in new player protection.`}</Text>)}
                </Group>

                <Select
                    label="Choose Another Race"
                    placeholder="Pick one"
                    itemComponent={RaceItem}
                    data={raceObjects}
                    {...raceForm.getInputProps('race')}
                />

                <Button size='sm' compact type='submit' disabled={status}>Submit</Button>
            </Stack>
        </form>
    )
}

export default ChangeRace