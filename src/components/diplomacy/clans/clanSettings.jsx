// form to join a clan
import
{
    Card,
    TextInput,
    Button,
    Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import Axios from 'axios';
import { useLoadEmpire } from '../../../hooks/useLoadEmpire';
import { showNotification } from '@mantine/notifications';
import { useTranslation } from 'react-i18next';

export default function ClanSettings({ clan, empire })
{
    const { t, i18n } = useTranslation(['diplomacy'])
    const loadEmpire = useLoadEmpire(empire.uuid)

    const form = useForm({
        initialValues: {
            clanTag: clan.clanTag,
            empireId: empire.id
        },

        validate: {
            clanTag: (value) => value.length > 8 ? t('diplomacy:clans.tagValidation') : null,
        }
    })

    const updateTag = async (values) =>
    {
        try {
            const res = await Axios.post(`/clans/setTag?lang=${i18n.language}`, values)
            console.log(res)
            showNotification({
                title: t('diplomacy:clans.tagSuccess'),
                autoClose: 2000,
            })
            loadEmpire()
        } catch (err) {
            // setError(err.response.data),
            // console.log(err)
            showNotification({
                title: t('diplomacy:clans.tagError'),
                message: Object.values(err.response.data)[0],
                color: 'orange',
                autoClose: 5000,
            })
        }
    }

    return (
        <Card>
            <Title order={2} ta="center" >
                {t('diplomacy:clans.settingsHeader')}
            </Title>
            <form onSubmit={form.onSubmit((values) => updateTag(values))}>
                <TextInput label={t('diplomacy:clans.clanTag')} placeholder={t('diplomacy:clans.tagPlaceholder')} mt="md" size="md" {...form.getInputProps('clanTag')} description={t('diplomacy:clans.clanTagDescription')} />
                <Button mt="xl" size="md" type='submit' >
                    {t('diplomacy:forms.submit')}
                </Button>
            </form>
        </Card>
    );
}