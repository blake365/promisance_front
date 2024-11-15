// form to join a clan
import
{
    Paper,
    TextInput,
    Button,
    Title,
    Text,
    Card,
    Select,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useSelector } from 'react-redux';
import { useState, forwardRef, useEffect } from 'react';
import Axios from 'axios';
import { useLoadEmpire } from '../../../hooks/useLoadEmpire';
import { showNotification } from '@mantine/notifications';
import { useTranslation } from 'react-i18next';

export default function JoinClan({ disabled })
{
    const { empire } = useSelector((state) => state.empire)
    const loadEmpire = useLoadEmpire(empire.uuid)
    const [clans, setClans] = useState([])
    const [selectedClan, setSelectedClan] = useState('')
    const { t } = useTranslation(['diplomacy'])

    const form = useForm({
        initialValues: {
            clanName: '',
            clanPassword: '',
            empireId: empire.id
        },
    })

    useEffect(() =>
    {
        const loadClans = async () =>
        {
            try {
                const res = await Axios.get(`/clans/getClans?gameId=${empire.game_id}`)
                // console.log(res.data)
                if (res.data.length > 0) {
                    const clans = res.data.map(({ clanName, id }) => ({ clanName, id }))
                    const dataFormat = clans.map((clan) =>
                    ({
                        name: clan.clanName,
                        value: clan.clanName,
                        label: clan.clanName
                    })
                    )
                    // console.log(dataFormat)
                    setClans(dataFormat)
                }

            } catch (error) {
                console.log(error)
            }
        }
        loadClans()
    }, [empire.clanId])

    const SelectItem = forwardRef(
        ({ name, value, ...others }, ref) => (
            <div ref={ref} {...others}>
                <div>
                    <Text size='sm' weight='bold'>{name}</Text>
                </div>
            </div>
        )
    );

    const joinClan = async (values) =>
    {
        try {
            const res = await Axios.post(`/clans/join?gameId=${empire.game_id}`, values)
            // console.log(res)
            showNotification({
                title: t('diplomacy:clans.responseJoin'),
                autoClose: 2000,
            })
            loadEmpire()
        } catch (err) {
            // setError(err.response.data),
            console.log(err)
            showNotification({
                title: t('diplomacy:clans.responseJoinError'),
                message: Object.values(err.response.data)[0],
                color: 'orange',
                autoClose: 5000,
            })
        }
    }

    return (
        <Paper maw={400} p={20}>
            <Title order={2} ta="center" >
                {t('diplomacy:clans.joinHeader')}
            </Title>

            {clans.length > 0 ? (<form onSubmit={form.onSubmit((values) =>
                // console.log(values)
                joinClan(values)
            )}>
                <Card>
                    {disabled && <Text align='center' color='red'>{t('diplomacy:clans.joinDisabled')}</Text>}
                    <Select
                        searchable
                        searchValue={selectedClan}
                        onSearchChange={setSelectedClan}
                        label={t('diplomacy:clans.joinSelect')}
                        placeholder={t('diplomacy:forms.pickOne')}
                        withAsterisk
                        itemComponent={SelectItem}
                        data={clans}
                        withinPortal
                        sx={{ width: '100%' }}
                        {...form.getInputProps('clanName')}
                    />
                    <TextInput required label={t('diplomacy:clans.clanPassword')} placeholder={t('diplomacy:clans.passwordPlaceholder')} mt="md" size="md" {...form.getInputProps('clanPassword')} />
                    <Button fullWidth mt="xl" size="md" type='submit' color='teal' disabled={disabled}>
                        {t('diplomacy:clans.joinSubmit')}
                    </Button>
                </Card>
            </form>) : (<Text align='center'>{t('diplomacy:clans.noClans')}</Text>)}
        </Paper>
    );
}