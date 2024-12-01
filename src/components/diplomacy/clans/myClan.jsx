// forms to create and join a clan
import { Title, Text, Stack, Tabs, Paper, Loader, Button } from "@mantine/core"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import Axios from "axios"
import MemberCard from "./memberCard"
import ClanIntel from "./clanIntel"
import ClanNews from "./clanNews"
import ClanChat from "./clanChat"
import ClanRelations from "./clanRelations"
import { checkRoundStatus } from "../../../functions/checkRoundStatus"
import { useLoadEmpire } from "../../../hooks/useLoadEmpire"
import ClanSettings from "./clanSettings"
import { useTranslation } from "react-i18next"
// show clan info, clan members, clan chat
function MyClan() {
	const { t, i18n } = useTranslation("diplomacy")
	const { empire } = useSelector((state) => state.empire)
	const loadEmpire = useLoadEmpire(empire.uuid)
	const [clan, setClan] = useState(null)
	const [members, setMembers] = useState(null)
	const [clanMail, setClanMail] = useState(0)
	const [response, setResponse] = useState(null)

	const checkForClanMail = async () => {
		// console.log('checking for clan mail')
		try {
			const res = await Axios.post("messages/clan/unread", {
				empireId: empire.id,
				clanId: empire.clanId,
			})
			// console.log(res.data)
			return res.data
		} catch (error) {
			console.log(error)
		}
	}

	// get clan info
	useEffect(() => {
		async function getClan() {
			const clan = await Axios.post("/clans/get", { clanId: empire.clanId })
			// console.log(clan.data[0])
			setClan(clan.data[0])

			const members = await Axios.post("/clans/getMembers", {
				clanId: empire.clanId,
			})
			// console.log(members.data)
			setMembers(members.data)
		}
		if (empire) {
			getClan()
		}
	}, [empire])

	useEffect(() => {
		checkForClanMail().then((data) => setClanMail(data))
	}, [])

	// console.log(clan)

	const intelMembers = members?.map((member) => member.id)
	// console.log(intelMembers)

	const disbandClan = async () => {
		try {
			const res = await Axios.post(
				`/clans/disband?gameId=${empire.game_id}&lang=${i18n.language}`,
				{ clanId: clan.id, empireId: empire.id },
			)
			console.log(res.data)
			// setResponse(res.data)
			loadEmpire()
		} catch (error) {
			console.log(error)
			setResponse(error?.response?.data?.error)
		}
	}

	const leaveClan = async () => {
		try {
			const res = await Axios.post(
				`/clans/leave?gameId=${empire.game_id}&lang=${i18n.language}`,
				{ empireId: empire.id },
			)
			console.log(res.data)
			// setResponse(res.data)
			loadEmpire()
		} catch (error) {
			console.log(error)
			setResponse(error?.response?.data?.error)
		}
	}

	const roundStatus = checkRoundStatus()

	return (
		<section>
			{clan && (
				<div>
					<Title order={1} align="center" sx={{ marginBottom: "1rem" }}>
						{clan.clanName}
					</Title>
					{members && (
						<div>
							<Title order={3} align="left" m={10}>
								{t("diplomacy:clans.members")}
							</Title>
							<Stack spacing="xs">
								{members.map((member) => {
									// console.log(clan)
									let role = ""
									if (member.id === clan.empireIdLeader) {
										role = t("diplomacy:clans.leader")
									} else if (member.id === clan.empireIdAssistant) {
										role = t("diplomacy:clans.assistant")
									} else if (
										member.id === clan.empireIdAgent1 ||
										member.id === clan.empireIdAgent2
									) {
										role = t("diplomacy:clans.agent")
									} else {
										role = t("diplomacy:clans.member")
									}
									const clanString = ` - ${role}`

									return (
										<MemberCard
											empire={member}
											myId={empire.id}
											key={member.id}
											clan={clan}
											clanString={clanString}
										/>
									)
								})}
							</Stack>
							{/* leader and assistant can assign roles */}
							{/* leader and assistant can kick members */}
						</div>
					)}

					{/* leader and assistant can declare war or peace */}
					{/* mandatory shared defense with clan mates */}
					{/* leader and assistant can invite members */}
					{/* option to leave clan */}

					<Paper mt={20}>
						<Tabs p="md" keepMounted={false} defaultValue="Clan Chat">
							<Tabs.List>
								<Tabs.Tab value="Clan Chat">
									{t("diplomacy:clans.clanChat")}{" "}
									{clanMail > 0 && <span>({clanMail})</span>}
								</Tabs.Tab>
								<Tabs.Tab value="Clan News">
									{t("diplomacy:clans.sharedNews")}
								</Tabs.Tab>
								<Tabs.Tab value="Clan Intel">
									{t("diplomacy:clans.sharedIntel")}
								</Tabs.Tab>
								<Tabs.Tab value="Clan Relations">
									{t("diplomacy:clans.clanRelations")}
								</Tabs.Tab>
								{empire.id === clan.empireIdLeader && (
									<Tabs.Tab value="Settings">
										{t("diplomacy:clans.settings")}
									</Tabs.Tab>
								)}
							</Tabs.List>

							<Tabs.Panel value="Clan Chat" pt="xs">
								<ClanChat empire={empire} />
							</Tabs.Panel>

							<Tabs.Panel value="Clan News" pt="xs">
								{/* show combined news of all clan members */}
								{intelMembers ? (
									<ClanNews memberIds={intelMembers} />
								) : (
									<Loader />
								)}
							</Tabs.Panel>

							<Tabs.Panel value="Clan Intel" pt="xs">
								{/* show intel of clan members */}
								{intelMembers ? (
									<ClanIntel members={intelMembers} />
								) : (
									<Loader />
								)}
							</Tabs.Panel>

							<Tabs.Panel value="Clan Relations" pt="xs">
								<ClanRelations
									myClan={clan}
									empireId={empire.id}
									gameId={empire.game_id}
								/>
							</Tabs.Panel>

							<Tabs.Panel value="Settings" pt="xs">
								<ClanSettings clan={clan} empire={empire} />
							</Tabs.Panel>
						</Tabs>
					</Paper>

					<Paper mt="lg" p="md">
						{empire.id === clan.empireIdLeader ? (
							<Text mb="sm">{t("diplomacy:clans.disbandClanDescription")}</Text>
						) : (
							<Text mb="sm">{t("diplomacy:clans.leaveClanDescription")}</Text>
						)}
						{empire.id === clan.empireIdLeader ? (
							<Button color="red" onClick={disbandClan}>
								{t("diplomacy:clans.disbandClan")}
							</Button>
						) : (
							<Button color="red" onClick={leaveClan} disabled={roundStatus}>
								{t("diplomacy:clans.leaveClan")}
							</Button>
						)}
						<Text mt="sm" color="red">
							{response}
						</Text>
					</Paper>
				</div>
			)}
		</section>
	)
}

export default MyClan
