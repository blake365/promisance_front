import { useEffect, useState } from "react"
import { raceArray } from "../../config/races"
import { Modal, Text } from "@mantine/core"
import { Compass } from "@phosphor-icons/react"
import { useTranslation } from "react-i18next"

const NewPlayerModal = ({ empire, time }) => {
	const { t } = useTranslation(['guide'])
	const [newPlayerModal, setNewPlayerModal] = useState(false)

	const raceName = raceArray[empire.race].name.toLowerCase()
	// if empire is less than 5 minutes old, show new player modal
	useEffect(() => {
		// console.log(time - new Date(empire.createdAt).getTime())
		if (
			empire &&
			time.time &&
			time.time - new Date(empire.createdAt).getTime() < 120000
		) {
			setNewPlayerModal(true)
		}
	}, [])

	return (
		<Modal
			opened={newPlayerModal}
			onClose={() => setNewPlayerModal(false)}
			title={t('guide:content.newPlayer.title')}
			centered
			overflow="inside"
			size="lg"
		>
			<Text>
				{t('guide:content.newPlayer.protection', { turnsProtection: 1000 })}
			</Text>
			<Text mt="sm">
				{t('guide:content.newPlayer.newPlayerGuide')}
			</Text>
			<Text mt="sm">
				{t('guide:content.newPlayer.goal')}
			</Text>
			<Text mt="sm">
				{t('guide:content.newPlayer.raceTraits.intro', { 
					raceName: raceArray[empire.race].name, 
					strength: t(`guide:content.newPlayer.raceTraits.${raceName}`)
				})}
			</Text>
		</Modal>
	)
}

export default NewPlayerModal
