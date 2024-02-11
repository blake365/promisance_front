import
{
    Button,
    Center,
    Divider,
    Group,
    NumberInput,
    SimpleGrid,
    Stack,
    Text,
    Title,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import Axios from 'axios'
import { useDispatch, } from 'react-redux'
import { empireLoaded } from '../../store/empireSlice'
import { eraArray } from '../../config/eras'
import { showNotification } from '@mantine/notifications'


export default function IndyRates({ tiny, empire })
{
    let industryNumberArray = []
    let totalIndustry = 0
    let errors = {
        error: '',
    }

    const dispatch = useDispatch()

    const form = useForm({
        initialValues: {
            empireId: empire.id,
            indArmy: empire.indArmy,
            indLnd: empire.indLnd,
            indFly: empire.indFly,
            indSea: empire.indSea
        },

        validationRules: {
            indArmy: (value) => value <= 100 && value >= 0,
            indLnd: (value) => value <= 100 && value >= 0,
            indFly: (value) => value <= 100 && value >= 0,
            indSea: (value) => value <= 100 && value >= 0,
        },

        errorMessages: {
            indArmy: 'Invalid percent production',
            indLnd: 'Invalid percent production',
            indFly: 'Invalid percent production',
            indSea: 'Invalid percent production',
        },
    })

    if (form.values['indArmy'] === undefined) {
        form.setFieldValue('indArmy', 0)
    }
    if (form.values['indLnd'] === undefined) {
        form.setFieldValue('indLnd', 0)
    }
    if (form.values['indFly'] === undefined) {
        form.setFieldValue('indFly', 0)
    }
    if (form.values['indSea'] === undefined) {
        form.setFieldValue('indSea', 0)
    }


    industryNumberArray = Object.values(form.values).slice(1)

    totalIndustry = industryNumberArray
        .filter(Number)
        .reduce((partialSum, a) => partialSum + a, 0)

    function setErrors(error)
    {
        errors.error = error
    }

    const updateIndustry = async (values) =>
    {
        try {
            const res = await Axios.post(`/empire/${empire.uuid}/industry`, values)
            // console.log(res.data)
            dispatch(empireLoaded(res.data))
            showNotification({
                title: 'Industry Settings Updated',
                color: 'red',
                autoClose: 2000,
            })
        } catch (error) {
            console.log(error)
            showNotification({
                title: 'Error Updating Industry Settings',
                color: 'orange',
                autoClose: 2000,
            })
        }
    }


    return (
        <Center mt={5}>
            <Stack spacing='sm' align='center'>
                {!tiny &&
                    <>
                        <Title order={3}>Industry Settings</Title>
                        <Text size='sm'>
                            Input the percentage of production to dedicate to each type of unit.{' '}
                        </Text>
                    </>}
                <form onSubmit={
                    totalIndustry === 100
                        ? form.onSubmit((values) =>
                        {
                            console.log(values)
                            updateIndustry(values)
                        })
                        : setErrors("Values must add up to 100")
                }>
                    <Stack align='center' spacing='xs'>
                        <Group position='center' spacing='sm'>
                            <NumberInput
                                w={80}
                                label={eraArray[empire.era].trparm}
                                min={0}
                                max={100}
                                defaultValue={empire.indArmy}
                                stepHoldDelay={500}
                                stepHoldInterval={100}
                                {...form.getInputProps('indArmy')}
                            />
                            <NumberInput
                                w={80}
                                label={eraArray[empire.era].trplnd}
                                min={0}
                                max={100}
                                defaultValue={empire.indLnd}
                                stepHoldDelay={500}
                                stepHoldInterval={100}
                                {...form.getInputProps('indLnd')}
                            />
                            <NumberInput
                                w={80}
                                label={eraArray[empire.era].trpfly}
                                min={0}
                                max={100}
                                defaultValue={empire.indFly}
                                stepHoldDelay={500}
                                stepHoldInterval={100}
                                {...form.getInputProps('indFly')}
                            />
                            <NumberInput
                                w={80}
                                label={eraArray[empire.era].trpsea}
                                min={0}
                                max={100}
                                defaultValue={empire.indSea}
                                stepHoldDelay={500}
                                stepHoldInterval={100}
                                {...form.getInputProps('indSea')}
                            />
                        </Group>
                        <div style={{ color: 'red' }}>{errors.error}</div>
                        <Button color='red' type='submit' disabled={errors.error}>
                            Update
                        </Button>
                    </Stack>
                </form>
            </Stack >
        </Center >
    )
}
