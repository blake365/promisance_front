import { Center, Group } from "@mantine/core"
import { useSelector } from "react-redux"
import { eraArray } from "../../config/eras"
import PubBuyCard from "./pubBuyCard"
import { useTranslation } from "react-i18next"
import { memo } from "react"

const MarketCard = memo(({ eraItem, type, ...props }) => (
	<PubBuyCard eraItem={eraItem} type={type} {...props} />
))

export default memo(({ empire }) => {
	const gameSettings = useSelector((state) => state.games.activeGame)
	const { otherItems, statusOthers: marketStatus } = useSelector(
		(state) => state.market,
	)
	const { t } = useTranslation(["finance", "eras"])

	const eraName = eraArray[empire.era].name.toLowerCase()

	return (
		<main>
			<Center my={10} maw={950}>
				<Group spacing="sm" position="center">
					{["arm", "lnd", "fly", "sea", "food", "runes"].map((type) => (
						<MarketCard
							key={type}
							eraItem={t(
								`eras:eras.${eraName}.${
									type === "food" || type === "runes" ? type : `trp${type}`
								}`,
							)}
							type={type}
							owned={
								empire[
									type === "food" || type === "runes"
										? type
										: `trp${type.charAt(0).toUpperCase()}${type.slice(1)}`
								]
							}
							item={otherItems[type]}
							base={
								gameSettings[
									`pvtm${type.charAt(0).toUpperCase()}${type.slice(1)}`
								]
							}
							cash={empire.cash}
							empireId={empire.id}
							empireUUID={empire.uuid}
							status={marketStatus}
							game_id={empire.game_id}
						/>
					))}
				</Group>
			</Center>
		</main>
	)
})
