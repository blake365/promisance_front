import { ActionIcon } from "@mantine/core"
import { IconArrowBarToUp, IconStar, IconStarFilled } from "@tabler/icons-react"
import Axios from "axios"
import { useLoadEmpire } from "../../hooks/useLoadEmpire"
import { convertLegacyKey } from "../useTurns/favoritesConfig"
import { memo } from "react"

// const dispatch = useDispatch()

export const FavoriteButton = memo(({ title, empire, size }) => {
	const loadEmpire = useLoadEmpire(empire.uuid)

	const checkFavorite = (empire, item) => {
		const newKey = convertLegacyKey(item)
		return empire?.favorites.some(
			(favorite) => convertLegacyKey(favorite) === newKey,
		)
	}

	const setFavorite = async (empire, item) => {
		try {
			const newKey = convertLegacyKey(item)
			await Axios.post(`/empire/${empire.uuid}/favorite`, {
				favorite: newKey,
			})
			loadEmpire()
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<ActionIcon
			size={size ? size : "md"}
			color="blue"
			sx={{ display: "inline" }}
			onClick={() => {
				setFavorite(empire, title)
			}}
		>
			{checkFavorite(empire, title) ? (
				<IconStarFilled size={size} />
			) : (
				<IconStar size={size} />
			)}
		</ActionIcon>
	)
})

FavoriteButton.displayName = "FavoriteButton"

export const MaxButton = memo(({ formName, fieldName, maxValue }) => {
	return (
		<ActionIcon
			variant="transparent"
			size="sm"
			color="blue"
			onClick={() => formName.setFieldValue(fieldName, Math.floor(maxValue))}
		>
			<IconArrowBarToUp />
		</ActionIcon>
	)
})

export const HalfButton = memo(({ formName, fieldName, maxValue }) => {
	return (
		<ActionIcon
			variant="transparent"
			size="sm"
			color="blue"
			onClick={() =>
				formName.setFieldValue(fieldName, Math.floor(maxValue / 2))
			}
		>
			½
		</ActionIcon>
	)
})

export const HalfAndAll = memo(({ formName, fieldName, maxValue, style }) => {
	return (
		<div style={style}>
			<ActionIcon
				variant="transparent"
				size="md"
				color="blue"
				onClick={() => formName.setFieldValue(fieldName, Math.floor(maxValue))}
			>
				<IconArrowBarToUp />
			</ActionIcon>
			<ActionIcon
				size="md"
				color="blue"
				onClick={() =>
					formName.setFieldValue(fieldName, Math.floor(maxValue / 2))
				}
			>
				½
			</ActionIcon>
		</div>
	)
})

export const OneTurn = memo(
	({ formName, fieldName, value, max, currentValue }) => {
		const curValue = currentValue ? currentValue : 0
		return (
			<ActionIcon
				size="sm"
				color="blue"
				variant="transparent"
				onClick={() => {
					if (value + curValue > max) {
						formName.setFieldValue(fieldName, max)
					} else {
						formName.setFieldValue(fieldName, value + curValue)
					}
				}}
			>
				1
			</ActionIcon>
		)
	},
)

OneTurn.displayName = "OneTurn"

MaxButton.displayName = "MaxButton"
HalfButton.displayName = "HalfButton"
HalfAndAll.displayName = "HalfAndAll"
