// forms to create and join a clan
import { Group, Title, Text } from "@mantine/core"
import CreateClan from "./createClan"
import JoinClan from "./joinClan"
import MyClan from "./myClan"
import { useSelector } from "react-redux"
import { checkRoundStatus } from "../../../functions/checkRoundStatus"
import { useTranslation } from "react-i18next"

// if in a clan, show clan info, clan members, clan chat
function ClanPage()
{
    const { t } = useTranslation('diplomacy')
    const { empire } = useSelector((state) => state.empire)
    const { turnsProtection, clanEnable } = useSelector((state) => state.games.activeGame)

    let disabled = false
    if (empire.turnsUsed < turnsProtection || empire.mode === 'demo') {
        disabled = true
    }

    const roundStatus = checkRoundStatus(true)

    if (!clanEnable) {
        return (
            <main>
                <Title order={1} align='center' sx={{ marginBottom: '1rem' }}>{t('diplomacy:clans.clans')}</Title>
                <Text align="center">{t('diplomacy:clans.clanDisabled')}</Text>
            </main>
        )
    }

    return (
        <main>
            {empire.clanId === 0 ? (
                <div>
                    <Title order={1} align='center' sx={{ marginBottom: '1rem' }}>{t('diplomacy:clans.clans')}</Title>
                    <Text align="center">{t('diplomacy:clans.createDescription')}</Text>
                    <Text align="center">{t('diplomacy:clans.clanBenefits')}</Text>
                    {empire.mode === 'demo' && <Text align="center" color='red'>{t('diplomacy:clans.demoDisabled')}</Text>}
                    <Group position="center" mt={10}>
                        <CreateClan disabled={disabled || roundStatus} />
                        <JoinClan disabled={disabled || roundStatus} />
                    </Group>
                </div>) : (<MyClan />)}
        </main>
    )
}

export default ClanPage