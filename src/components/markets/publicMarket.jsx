import { Tabs, Title, Center, Stack, Text } from "@mantine/core"
import lazy from "../utilities/lazyWrapper"
const PublicMarketBuy = lazy(() => import("./PublicMarketBuy"))
const PublicMarketSell = lazy(() => import("./PublicMarketSell"))
// import PublicMarketBuy from "./PublicMarketBuy"
// import PublicMarketSell from "./PublicMarketSell"
import { useTour } from "@reactour/tour"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState, useCallback, memo } from "react"
import { fetchMyItems, fetchOtherItems } from "../../store/pubMarketSlice"
import { checkRoundStatus } from "../../functions/checkRoundStatus"
import { useTranslation } from "react-i18next"

const PublicMarket = () => {
	const { empire } = useSelector((state) => state.empire)
	const { setCurrentStep, meta } = useTour()
	const dispatch = useDispatch()
	const { t } = useTranslation(["finance"])
	// console.log(marketStatus)

	const fetchMarketData = useCallback(() => {
		if (empire) {
			const marketValues = { empireId: empire.id, gameId: empire.game_id }
			dispatch(fetchOtherItems(marketValues))
			dispatch(fetchMyItems(marketValues))
		}
	}, [dispatch, empire?.id, empire?.game_id])

	useEffect(() => {
		fetchMarketData()
	}, [fetchMarketData])

	const [activeTab, setActiveTab] = useState("Buy")

	const roundStatus = checkRoundStatus()

	return (
		<main className="gremlin8 dwarf8 ghoul8 goblin8 orc8 hobbit8 gnome10 vampire10 minotaur10">
			<Center mb={10}>
				<Stack spacing="sm" align="center">
					<img
						src="/images/pm.webp"
						height="200"
						style={{
							maxHeight: "200px",
							maxWidth: "100%",
							borderRadius: "10px",
						}}
						alt="public market"
					/>
					<Title order={1} align="center">
						{t("finance:publicMarket.title")}
					</Title>
					<Text align="center">{t("finance:publicMarket.description")}</Text>
					{roundStatus ? (
						<Text align="center" color="red">
							{t("finance:publicMarket.closed")}
						</Text>
					) : (
						<div>
							<Tabs
								styles={{
									tabLabel: { fontSize: "1.2rem" },
								}}
								value={activeTab}
								onTabChange={setActiveTab}
								keepMounted={false}
							>
								<Tabs.List grow position="center">
									<Tabs.Tab value="Buy">
										{t("finance:blackMarket.buy")}
									</Tabs.Tab>
									<Tabs.Tab
										value="Sell"
										onClick={() => {
											if (meta) {
												setCurrentStep(9)
											}
										}}
									>
										{t("finance:blackMarket.sell")}
									</Tabs.Tab>
								</Tabs.List>
								<Tabs.Panel value="Buy">
									<PublicMarketBuy empire={empire} />
								</Tabs.Panel>
								<Tabs.Panel value="Sell">
									<PublicMarketSell empire={empire} />
								</Tabs.Panel>
							</Tabs>
						</div>
					)}
				</Stack>
			</Center>
		</main>
	)
}

export default memo(PublicMarket)
