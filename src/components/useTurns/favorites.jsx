import { Center, Switch, Paper, Text, Title, Flex } from "@mantine/core"
import { useSelector } from "react-redux"
import TinyBuild from "./tinyBuild"
import React, { useState, useEffect } from "react"
import Axios from "axios"
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"
import { useLoadEmpire } from "../../hooks/useLoadEmpire"
import { useMediaQuery } from "@mantine/hooks"
import { useTranslation } from "react-i18next"
import {
	FAVORITES_CONFIG,
	convertLegacyKey,
	getComponentInfo,
} from "./favoritesConfig"

const MapComponents = ({ id, empire, size, index }) => {
	let child = null

	const componentInfo = getComponentInfo(id)
	if (componentInfo) {
		if (componentInfo.type === "building") {
			child = <TinyBuild show={true} building={id} empire={empire} />
		} else {
			const Component = componentInfo.component
			child = <Component size={size} favorite />
		}
	}

	return (
		<Draggable draggableId={id} index={index}>
			{(provided) => (
				<Paper
					shadow="sm"
					p="md"
					sx={{
						maxWidth: "550px",
						minWidth: "250px",
						margin: "0.5rem",
					}}
					ref={provided.innerRef}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
				>
					{child}
				</Paper>
			)}
		</Draggable>
	)
}

const FavoritesList = React.memo(function favoritesList({ favorites, size }) {
	return favorites.map((favorite, index) => (
		<MapComponents key={favorite} id={favorite} index={index} size={size} />
	))
})

const moveCol = (
	source,
	destination,
	droppableSource,
	droppableDestination,
) => {
	const sourceClone = Array.from(source)
	const destClone = Array.from(destination)
	const [removed] = sourceClone.splice(droppableSource.index, 1)

	destClone.splice(droppableDestination.index, 0, removed)

	const result = {}
	result[droppableSource.droppableId] = sourceClone
	result[droppableDestination.droppableId] = destClone

	return result
}

const reorderCol = (list, startIndex, endIndex) => {
	const result = Array.from(list)
	const [removed] = result.splice(startIndex, 1)
	result.splice(endIndex, 0, removed)

	return result
}

export default function Favorites() {
	const { t } = useTranslation("turns")
	const { empire } = useSelector((state) => state.empire)
	const [checked, setChecked] = useState(empire.favSize)

	// Convert legacy favorites to new format
	const convertedFavorites = empire.favorites.map(convertLegacyKey)
	const [state, setState] = useState({ favorites: convertedFavorites })

	// Convert legacy columns to new format with proper defaults
	const convertedColumns =
		empire.favColumns?.column1?.map(convertLegacyKey) || []
	const convertedColumns2 =
		empire.favColumns?.column2?.map(convertLegacyKey) || []
	const [colState, setColState] = useState([
		convertedColumns,
		convertedColumns2,
	])

	const loadEmpire = useLoadEmpire(empire.uuid)

	const reorder = (list, startIndex, endIndex) => {
		const result = Array.from(list)
		const [removed] = result.splice(startIndex, 1)
		result.splice(endIndex, 0, removed)
		return result
	}

	async function onDragEnd(result) {
		if (!result.destination) {
			return
		}

		if (result.destination.index === result.source.index) {
			return
		}

		const favorites = reorder(
			state.favorites,
			result.source.index,
			result.destination.index,
		)
		setState({ favorites })
		await Axios.post(`/empire/${empire.uuid}/favorites/order`, { favorites })
		loadEmpire()
	}

	async function onDragEndCol(result) {
		const { source, destination } = result

		if (!destination) {
			return
		}

		const sInd = +source.droppableId
		const dInd = +destination.droppableId

		if (sInd === dInd) {
			const items = reorderCol(colState[sInd], source.index, destination.index)
			const newState = [...colState]
			newState[sInd] = items
			setColState(newState)
			await Axios.post(`/empire/${empire.uuid}/favorites/orderColumns`, {
				favorites: newState,
			})
			loadEmpire()
		} else {
			const result = moveCol(
				colState[sInd],
				colState[dInd],
				source,
				destination,
			)
			const newState = [...colState]
			newState[sInd] = result[sInd] || []
			newState[dInd] = result[dInd] || []
			setColState(newState)
			await Axios.post(`/empire/${empire.uuid}/favorites/orderColumns`, {
				favorites: newState,
			})
			loadEmpire()
		}
	}

	const handleSizeChange = (checked) => {
		Axios.post(`/empire/${empire.uuid}/favorites/size`, { favSize: !checked })
		setChecked(!checked)
	}

	const smScreen = useMediaQuery("(max-width: 768px)")

	return (
		<main>
			<Title order={1} align="center">
				{t("turns:favorites.title")}
			</Title>
			<Text size="sm" color="dimmed" align="center" mb="xs">
				{t("turns:favorites.drag")}
			</Text>
			<Center>
				<Switch
					label={t("turns:favorites.compact")}
					checked={checked}
					onChange={(event) => handleSizeChange(checked)}
				/>
			</Center>
			{state.favorites.length === 0 && (
				<Text align="center" mt="lg">
					{t("turns:favorites.empty")}
				</Text>
			)}

			{!smScreen ? (
				<Flex align="start" justify="center" wrap="wrap">
					<DragDropContext onDragEnd={onDragEndCol}>
						{colState.map((col, index) => (
							<Droppable key={index} droppableId={`${index}`}>
								{(provided) => (
									<div {...provided.droppableProps} ref={provided.innerRef}>
										<FavoritesList favorites={col} size={checked} />
										{provided.placeholder}
									</div>
								)}
							</Droppable>
						))}
					</DragDropContext>
				</Flex>
			) : (
				<Center>
					<DragDropContext onDragEnd={onDragEnd}>
						<Droppable droppableId="favorites">
							{(provided) => (
								<div {...provided.droppableProps} ref={provided.innerRef}>
									<FavoritesList favorites={state.favorites} size={checked} />
									{provided.placeholder}
								</div>
							)}
						</Droppable>
					</DragDropContext>
				</Center>
			)}
		</main>
	)
}
