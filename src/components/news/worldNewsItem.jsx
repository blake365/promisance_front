import { Group, Card, Text, Box } from "@mantine/core"
import {
	Sword,
	Shield,
	ShoppingCart,
	ShieldStar,
	MagicWand,
	FirstAid,
	Handshake,
	HandCoins,
} from "@phosphor-icons/react"
import { useTranslation } from "react-i18next"

export default function WorldNewsItem({ item, now }) {
	const { t } = useTranslation(["diplomacy", "news"])
	const eventTime = new Date(item.createdAt)
	const diff = now - eventTime
	const minutes = Math.floor(diff / 60000)
	const hours = Math.floor(minutes / 60)
	const days = Math.floor(hours / 24)
	let timeSince = ""

	if (days > 0) {
		timeSince = `${days} ${t("diplomacy:news.daysAgo")}`
	} else if (hours > 0) {
		timeSince = `${hours} ${t("diplomacy:news.hoursAgo")}`
	} else if (minutes > 0) {
		timeSince = `${minutes} ${t("diplomacy:news.minutesAgo")}`
	} else {
		timeSince = `${t("diplomacy:news.justNow")}`
	}

	let highlight = ""
	if (item.result === "success") highlight = "green"
	if (item.result === "fail") highlight = "red"
	if (item.result === "shielded") highlight = "blue"

	const selectIcon = (type, result) => {
		if (type === "attack" && result === "success")
			return <Shield size={24} color={highlight} weight="fill" />
		if (type === "attack" && result === "fail")
			return <Sword size={24} color={highlight} weight="fill" />
		if (type === "market" && result === "success")
			return <ShoppingCart size={24} color={highlight} weight="fill" />
		if (type === "market" && result === "fail")
			return <ShoppingCart size={24} color={highlight} weight="fill" />
		if (type === "spell" && result === "success")
			return <Shield size={24} color={highlight} weight="fill" />
		if (type === "spell" && result === "fail")
			return <MagicWand size={24} color={highlight} weight="fill" />
		if (type === "spell" && result === "shielded")
			return <ShieldStar size={24} color={highlight} weight="fill" />
		if (type === "aid" && result === "success")
			return <FirstAid size={24} color={highlight} weight="fill" />
		if (type === "war" && result === "success")
			return <Sword size={24} color={highlight} weight="duotone" />
		if (type === "peace" && result === "success")
			return <Handshake size={24} color={highlight} weight="fill" />
		if (type === "peace" && result === "shielded")
			return <Handshake size={24} color={highlight} weight="fill" />
		if (type === "lottery" && result === "success")
			return <HandCoins size={24} color={highlight} weight="fill" />
		if (type === "lottery" && result === "fail")
			return <HandCoins size={24} color={highlight} weight="fill" />
	}

	// Generate unique key for news content
	const getContentKey = (content) => {
		if (!content?.key) return null
		console.log(content.key)
		return `news:${content.key}`
	}

	// console.log(item)

	return (
		<Card shadow="sm" radius="sm" p="xs" withBorder sx={{ overflowX: "auto" }}>
			<Card.Section p="xs">
				<Group position="apart">
					<Text size="xs">
						{eventTime.toLocaleString()} ({timeSince})
					</Text>
				</Group>
			</Card.Section>
			<Group noWrap spacing="xs" sx={{ alignItems: "start" }}>
				<Box mt="sm">{selectIcon(item.type, item.result)}</Box>
				<Box ta="left">
					<Text size="sm" weight="bold">
						{t(getContentKey(item.publicNews), item.publicNews?.params || {})}
					</Text>
				</Box>
			</Group>
		</Card>
	)
}
