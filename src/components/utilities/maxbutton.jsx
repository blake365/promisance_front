import { ActionIcon } from "@mantine/core"
import { IconArrowBarToUp, IconStar, IconStarFilled } from "@tabler/icons-react"
import Axios from "axios"
import { useLoadEmpire } from "../../hooks/useLoadEmpire"
import { convertLegacyKey } from "../useTurns/favoritesConfig"

// const dispatch = useDispatch()

export function FavoriteButton(props) {
	const loadEmpire = useLoadEmpire(props.empire.uuid)

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
			size={props.size ? "xs" : "md"}
			color="blue"
			sx={{ display: "inline" }}
			onClick={() => {
				setFavorite(props.empire, props.title)
			}}
		>
			{checkFavorite(props.empire, props.title) ? (
				<IconStarFilled size={props.size} />
			) : (
				<IconStar size={props.size} />
			)}
		</ActionIcon>
	)
}

export function MaxButton(props) {
	return (
		<ActionIcon
			variant="transparent"
			size="sm"
			color="blue"
			onClick={() => {
				props.formName.setFieldValue(
					props.fieldName,
					Math.floor(props.maxValue),
				)
			}}
		>
			<IconArrowBarToUp />
		</ActionIcon>
	)
}

export function HalfButton(props) {
	return (
		<ActionIcon
			variant="transparent"
			size="sm"
			color="blue"
			onClick={() => {
				props.formName.setFieldValue(
					props.fieldName,
					Math.floor(props.maxValue / 2),
				)
			}}
		>
			½
		</ActionIcon>
	)
}

export function HalfAndAll(props) {
	return (
		<div style={props.style}>
			<ActionIcon
				variant="transparent"
				size="md"
				color="blue"
				onClick={() => {
					props.formName.setFieldValue(
						props.fieldName,
						Math.floor(props.maxValue),
					)
				}}
			>
				<IconArrowBarToUp />
			</ActionIcon>
			<ActionIcon
				size="md"
				color="blue"
				onClick={() => {
					props.formName.setFieldValue(
						props.fieldName,
						Math.floor(props.maxValue / 2),
					)
				}}
			>
				½
			</ActionIcon>
		</div>
	)
}

export function OneTurn(props) {
	// console.log(props.currentValue)
	const currentValue = props.currentValue ? props.currentValue : 0
	return (
		<ActionIcon
			size="sm"
			color="blue"
			variant="transparent"
			onClick={() => {
				if (props.value + currentValue > props.max) {
					props.formName.setFieldValue(props.fieldName, props.max)
				} else {
					props.formName.setFieldValue(
						props.fieldName,
						props.value + currentValue,
					)
				}
			}}
		>
			1
		</ActionIcon>
	)
}
