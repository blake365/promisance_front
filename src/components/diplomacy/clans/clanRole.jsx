import { Group, Button, Text } from "@mantine/core"
import Axios from "axios"
import { useSelector } from "react-redux"
import { useLoadEmpire } from "../../../hooks/useLoadEmpire"
import { useTranslation } from "react-i18next"

export default function ClanRole({ member, role, clan }) {
	const { empire } = useSelector((state) => state.empire)
	const loadEmpire = useLoadEmpire(empire.uuid)
	const { t, i18n } = useTranslation(["diplomacy"])
	// if you are the leader, you can promote to assistant, demote to member, or remove from clan
	// console.log(clan)
	// console.log(member)
	// if you are assistant or member, you cannot do anything
	// console.log(role)

	let permission = false
	if (empire.id === clan.empireIdLeader) {
		permission = true
	}

	// promote to assistant
	const promote = async () => {
		try {
			const res = await Axios.post(`/clans/assignRole?lang=${i18n.language}`, {
				memberId: member.id,
				clanRole: "assistant",
				empireId: empire.id,
			})
			// console.log(res)
			loadEmpire()
		} catch (error) {
			console.log(error)
		}
	}
	// demote to member
	const demote = async () => {
		try {
			const res = await Axios.post(`/clans/removeRole?lang=${i18n.language}`, {
				memberId: member.id,
				clanRole: role.toLowerCase(),
				empireId: empire.id,
			})
			// console.log(res)
			loadEmpire()
		} catch (error) {
			console.log(error)
		}
	}
	// remove from clan
	const remove = async () => {
		try {
			const res = await Axios.post(
				`/clans/kick?gameId=${empire.game_id}&lang=${i18n.language}`,
				{ empireId: member.id },
			)
			// console.log(res)
			loadEmpire()
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<section>
			<Text>
				{t("currentRole")}: {role}
			</Text>
			{permission && (
				<Group p="sm">
					{role === "member" ? (
						<Button onClick={promote}>{t("diplomacy:clan.promote")}</Button>
					) : null}
					{role === "Assistant" ? (
						<Button onClick={demote} color="red">
							{t("diplomacy:clan.demote")}
						</Button>
					) : null}
					{member.id !== empire.id && (
						<Button onClick={remove} color="red">
							{t("diplomacy:clan.remove")}
						</Button>
					)}
				</Group>
			)}
		</section>
	)
}
