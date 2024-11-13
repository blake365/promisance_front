import
{
    Center,
    Title,
    NumberInput,
    Button,
    Select,
    Text,
    Stack
} from '@mantine/core'
import { useForm } from '@mantine/form'
import Axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { clearResult, setResult } from '../../store/turnResultsSlice'
import { forwardRef } from 'react'
import { getPower_self, baseCost } from '../../functions/functions'
import { eraArray } from '../../config/eras'
import { FavoriteButton } from '../utilities/maxbutton'
import { useState } from 'react'
import { useLoadEmpire } from '../../hooks/useLoadEmpire'
import { checkRoundStatus } from '../../functions/checkRoundStatus'
import { setRepeat } from '../../store/repeatSlice'
import { useTour } from '@reactour/tour'
import { useTranslation } from 'react-i18next'

export default function MagicCenter({ size })
{
    const { t } = useTranslation(['turns', 'eras'])
    const { empire } = useSelector((state) => state.empire)
    const [loading, setLoading] = useState(false)
    const effects = useSelector((state) => state.effects.effects)
    const { setCurrentStep, meta } = useTour()
    // console.log(effects)

    const dispatch = useDispatch()
    const loadEmpire = useLoadEmpire(empire.uuid)
    const form = useForm({
        initialValues: {
            empireId: empire.id,
            type: 'magic',
            number: 1,
        },

        validationRules: {
            number: (value) => value <= Math.floor(empire.turns / 2) && value > 0,
        },

        errorMessages: {
            number: "Can't cast spell that many times",
        },
    })

    const doMagic = async (values) =>
    {
        setLoading(true)
        // console.log(values)
        try {
            const res = await Axios.post(`/magic?gameId=${empire.game_id}`, values)
            dispatch(setRepeat({ route: `/magic?gameId=${empire.game_id}`, body: values, color: 'grape' }))
            // console.log(res.data)
            dispatch(setResult(res.data))
            window.scroll({ top: 0, behavior: 'smooth' })
            loadEmpire()
            setLoading(false)
            if (meta && meta !== 'new player tutorial') {
                if (
                    !meta.includes("Elf") &&
                    !meta.includes("Drow") &&
                    !meta.includes("Pixie")
                ) {
                    setCurrentStep(13);
                }
            }

        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    const eraName = eraArray[empire.era].name.toLowerCase()
    const magicPower = getPower_self(empire)

    const SelectItem = forwardRef(
        ({ label, power, cost, ...others }, ref) => (
            <div ref={ref} {...others}>
                <div>
                    <Text size='md'>{label}</Text>
                    <Text size='xs'>{t('turns:magicCenter.powerReq')}: {power}</Text>
                    <Text size='xs'>{t('turns:magicCenter.cost')}: {cost.toLocaleString()} {t(`eras:eras.${eraName}.runes`)}</Text>
                </div>
            </div>
        )
    );

    // check era to see if they can advance or regress
    const eraCheck = (empire) =>
    {
        let nextEra = 'None'
        if (eraArray[empire.era].era_next !== -1) {
            nextEra = eraArray[eraArray[empire.era].era_next].name
        }

        let canAdvance = false
        if (nextEra !== 'None') {
            canAdvance = true
        }

        let prevEra = 'None'
        if (eraArray[empire.era].era_prev !== -1) {
            prevEra = eraArray[eraArray[empire.era].era_prev].name
        }

        let canRegress = false
        if (prevEra !== 'None') {
            canRegress = true
        }

        return { nextEra, canAdvance, prevEra, canRegress }
    }

    const timeGateCheck = (effects) =>
    {
        let timeGate = false
        for (const effect of effects) {
            if (effect.empireEffectName === 'time gate') {
                timeGate = true
            }
        }
        return timeGate
    }

    const { nextEra, canAdvance, prevEra, canRegress } = eraCheck(empire)
    const timeGate = timeGateCheck(effects)

    const roundStatus = checkRoundStatus()

    return (
        <section >
            <Center>
                <Stack spacing='sm' align='center' className='gremlin12 gremlin13 dwarf12 ghoul12 goblin12 orc12 hobbit12 dwarf13 ghoul13 goblin13 orc13 hobbit13 elf8 drow8 pixie8 elf9 drow9 pixie9 gnome12 vampire12 minotaur12 gnome13 vampire13 minotaur13'>
                    {!size && <>
                        <img src='/images/magic.webp' height='200' style={{ maxHeight: '200px', maxWidth: '100%', borderRadius: '10px' }} alt='magic center' />
                        <Title order={1} align='center'>
                            {t('turns:magicCenter.title')} <FavoriteButton empire={empire} title='MagicCenter' />
                        </Title>
                        <Text align='center'>
                            {t('turns:magicCenter.description')}
                        </Text>
                    </>}
                    <Text align='center'>
                        {t('turns:magicCenter.power', { power: magicPower })}
                    </Text>
                    <form onSubmit={form.onSubmit((values) =>
                    {
                        // console.log(values)
                        dispatch(clearResult)
                        doMagic(values)
                    })}>
                        <Stack spacing='sm' align='center'>
                            <Select
                                label={t('turns:magicCenter.select')}
                                placeholder={t('turns:magicCenter.pick')}
                                required
                                itemComponent={SelectItem}
                                data={[
                                    { value: 0, label: t(`eras:eras.${eraName}.spell_shield`), power: 15, cost: Math.ceil(baseCost(empire) * 4.9) },
                                    { value: 1, label: t(`eras:eras.${eraName}.spell_food`), power: 30, cost: Math.ceil(baseCost(empire) * 17.5) },
                                    { value: 2, label: t(`eras:eras.${eraName}.spell_cash`), power: 30, cost: Math.ceil(baseCost(empire) * 17.5) },
                                    { value: 5, label: t(`eras:eras.${eraName}.spell_gate`), power: 65, cost: Math.ceil(baseCost(empire) * 20) },
                                    { value: 6, label: t(`eras:eras.${eraName}.spell_ungate`), power: 75, cost: Math.ceil(baseCost(empire) * 14.5), disabled: !timeGate },
                                    { value: 3, label: t(`eras:eras.${eraName}.spell_advance`), power: 80, cost: Math.ceil(baseCost(empire) * 47.5), disabled: !canAdvance },
                                    { value: 4, label: t(`eras:eras.${eraName}.spell_regress`), power: 80, cost: Math.ceil(baseCost(empire) * 47.5), disabled: !canRegress },
                                ]}
                                {...form.getInputProps('spell')}
                            />
                            <NumberInput
                                label={t('turns:magicCenter.number')}
                                min={1}
                                defaultValue={1}
                                stepHoldDelay={500}
                                stepHoldInterval={100}
                                max={empire.turns / 2}
                                {...form.getInputProps('number')}
                            />

                            <Button color='grape' type='submit' disabled={roundStatus} loading={loading}>
                                {t('turns:magicCenter.submit')}
                            </Button>
                        </Stack>
                    </form>
                </Stack>
            </Center>
        </section>
    )
}