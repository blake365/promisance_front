import { memo, useState, useMemo } from "react"
import {
	Button,
	Center,
	Card,
	Text,
	NumberInput,
	SimpleGrid,
	Loader,
} from "@mantine/core"
import { useDispatch } from "react-redux"
import { useForm } from "@mantine/form"
import { MaxButton } from "../utilities/maxbutton"
import { useLoadEmpire } from "../../hooks/useLoadEmpire"
import { showNotification } from "@mantine/notifications"
import { fetchOtherItems } from "../../store/pubMarketSlice"
import Axios from "axios"
import { useTranslation } from "react-i18next"

const typeMap = {
	arm: 0,
	lnd: 1,
	fly: 2,
	sea: 3,
	food: 4,
	runes: 5,
}

const StatRow = memo(({ label, value, align = "right" }) => (
	<>
		<Text>{label}</Text>
		<Text align={align}>{value}</Text>
	</>
))

const PubBuyCard = memo(
	({
		eraItem,
		type,
		owned,
		base,
		item,
		cash,
		empireId,
		empireUUID,
		status,
		game_id,
	}) => {
		const dispatch = useDispatch()
		const loadEmpire = useLoadEmpire(empireUUID)
		const [loading, setLoading] = useState(false)
		const { t } = useTranslation(["finance", "eras"])

		const formType = typeMap[type]
		const itemAmount = Number.parseInt(item[0].amount)
		const itemPrice = item[0].price
		const maxBuy = useMemo(
			() =>
				cash === 0 ? 0 : Math.min(itemAmount, Math.floor(cash / itemPrice)),
			[cash, itemAmount, itemPrice],
		)

		const form = useForm({
			initialValues: {
				empireId,
				action: "buy",
				type: formType,
				buy: 0,
				item: item[0],
			},
			validate: {
				buy: (value) => value <= cash / itemPrice,
			},
			errorMessages: {
				buy: t("finance:blackMarket.buyError"),
			},
		})

		const buyItem = async (values) => {
			if (values.buy <= 0) return

			setLoading(true)
			try {
				const res = await Axios.post(
					`/publicmarket/pubBuy2?gameId=${game_id}`,
					{
						...values,
						item: item[0],
					},
				)

				showNotification({
					title: t("finance:publicMarket.responseBuySuccess"),
					message: res.data.success,
				})

				form.reset()
				dispatch(fetchOtherItems({ empireId, gameId: game_id }))
				loadEmpire()
			} catch (error) {
				console.error(error)
				showNotification({
					title: t("finance:publicMarket.responseBuyError"),
					message: "",
					color: "orange",
				})
			}
			setLoading(false)
		}

		const spendAmount = form.values.buy * itemPrice

		return (
			<Card w={300} p="sm" shadow="sm">
				<Card.Section withBorder p="xs">
					<Text align="center" weight="bold" size="lg">
						{eraItem}
					</Text>
				</Card.Section>

				{status !== "succeeded" ? (
					<Loader />
				) : (
					<Card.Section p="sm">
						<SimpleGrid cols={2} spacing={1}>
							<StatRow
								label={t("finance:blackMarket.owned")}
								value={owned.toLocaleString()}
							/>
							<StatRow
								label={t("finance:blackMarket.available")}
								value={itemAmount.toLocaleString()}
							/>
							<StatRow
								label={t("finance:publicMarket.basePrice")}
								value={`$${base.toLocaleString()}`}
							/>
							<StatRow
								label={t("finance:publicMarket.salePrice")}
								value={`$${itemPrice.toLocaleString()}`}
							/>
							<StatRow
								label={t("finance:blackMarket.canAfford")}
								value={maxBuy.toLocaleString()}
							/>
							<StatRow
								label={t("finance:publicMarket.spend")}
								value={`$${spendAmount.toLocaleString()}`}
							/>
						</SimpleGrid>
					</Card.Section>
				)}

				<Card.Section p="sm" withBorder>
					<form onSubmit={form.onSubmit(buyItem)}>
						<Center>
							<NumberInput
								hideControls
								align="center"
								w="50%"
								min={0}
								max={maxBuy}
								{...form.getInputProps("buy")}
								parser={(value) => value.replace(/[^\d]/g, "")}
								formatter={(value) =>
									value ? value.replace(/\B(?=(\d{3})+(?!\d))/g, ",") : ""
								}
								rightSection={
									<MaxButton
										formName={form}
										fieldName="buy"
										maxValue={maxBuy}
									/>
								}
							/>
							<Button
								type="submit"
								ml="sm"
								disabled={itemAmount === 0}
								loading={loading}
							>
								{t("finance:blackMarket.buySubmit")}
							</Button>
						</Center>
					</form>
				</Card.Section>
			</Card>
		)
	},
)

PubBuyCard.displayName = "PubBuyCard"

export default PubBuyCard
