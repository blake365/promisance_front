// form to create a clan
import { Paper, TextInput, Button, Title, Text, Card } from "@mantine/core"
import { useForm } from "@mantine/form"
import { useSelector } from "react-redux"
import { useState } from "react"
import Axios from "axios"
import { useLoadEmpire } from "../../../hooks/useLoadEmpire"
import { showNotification } from "@mantine/notifications"
import { useTranslation } from "react-i18next"

export default function CreateClan({ disabled }) {
	const { t, i18n } = useTranslation(["diplomacy"])
	const { empire } = useSelector((state) => state.empire)
	const [error, setError] = useState(null)
	const loadEmpire = useLoadEmpire(empire.uuid)

	const form = useForm({
		initialValues: {
			clanName: "",
			clanPassword: "",
			empireId: empire.id,
		},
	})

	const createClan = async (values) => {
		try {
			const res = await Axios.post(
				`/clans/create?gameId=${empire.game_id}&lang=${i18n.language}`,
				values,
			)
			// console.log(res)
			showNotification({
				title: t("diplomacy:clans.responseCreate"),
				autoClose: 2000,
			})
			loadEmpire()
		} catch (err) {
			setError(err.response.data)
			console.log(err)
			showNotification({
				title: t("diplomacy:clans.responseError"),
				autoClose: 2000,
			})
		}
	}

	return (
		<Paper maw={400} p={20}>
			<Title order={2} ta="center">
				{t("diplomacy:clans.createClan")}
			</Title>

			<form
				onSubmit={form.onSubmit((values) =>
					// console.log(values)
					createClan(values),
				)}
			>
				<Card>
					{disabled && (
						<Text align="center" color="red">
							{t("diplomacy:clans.protectionDisabled")}
						</Text>
					)}
					<TextInput
						required
						label={t("diplomacy:clans.clanName")}
						placeholder={t("diplomacy:clans.namePlaceholder")}
						size="md"
						{...form.getInputProps("clanName")}
					/>
					<TextInput
						required
						label={t("diplomacy:clans.clanPassword")}
						placeholder={t("diplomacy:clans.passwordPlaceholder")}
						mt="md"
						size="md"
						{...form.getInputProps("clanPassword")}
					/>
					<Text color="red" align="center" mt="md">
						{error && Object.values(error)[0]}
					</Text>
					<Button
						fullWidth
						mt="xl"
						size="md"
						type="submit"
						color="teal"
						disabled={disabled}
					>
						{t("diplomacy:clans.create")}
					</Button>
				</Card>
			</form>
		</Paper>
	)
}
