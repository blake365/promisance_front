import { useEffect, useState } from "react"
import { raceArray } from "../../config/races"
import { Modal, Text } from "@mantine/core"
import { Compass } from "@phosphor-icons/react"

const NewPlayerModal = ({ empire, time }) => {
	const [newPlayerModal, setNewPlayerModal] = useState(false)

	let strength = ""
	switch (raceArray[empire.race].name) {
		case "Human":
			strength =
				"being a generalist. You can go any direction you want with your empire. Your people can succeed in any era."
			break
		case "Elf":
			strength =
				"magic. You should focus your buildings on Mage Towers, use turns in Meditate, and cast spells in the Magic Center. Your people are best suited for the Past era."
			break
		case "Dwarf":
			strength =
				"industry. You should focus your buildings on Blacksmiths and use turns in Industry. Your people are best suited for the Future era."
			break
		case "Orc":
			strength =
				"industry and military. You should focus your buildings on Blacksmiths and use turns in Industry. Your people are best suited for the Future era."
			break
		case "Gnome":
			strength =
				"economy and markets. You should focus your buildings on Huts and Markets,  use turns in Cash, buy things from the Black Market. Your people are best suited for the Future era."
			break
		case "Troll":
			strength =
				"military. You should focus your buildings on Blacksmiths, Huts and Markets, and use your attack bonus to win battles. Your people are best suited for the Future era."
			break
		case "Drow":
			strength =
				"magic and military. You should focus your buildings on Mage Towers, use turns in Meditate, and cast spells in the Magic Center. Your people are best suited for the Past era."
			break
		case "Gremlin":
			strength =
				"food production. You should focus your buildings on Farms, use turns in Farm, sell your food on the Public Market. Your people are best suited for the Present era."
			break
		case "Goblin":
			strength =
				"industry. You should focus your buildings on Blacksmiths and use your turns in Industry. Your people are best suited for the Future era."
			break
		case "Hobbit":
			strength =
				"food production. You should focus your buildings on Farms and use turns in Farm. Your people are best suited for the Present era."
			break
		case "Ghoul":
			strength =
				"food production and industry. You should focus your buildings on Blacksmiths and Farms, and use your turns in either Industry or Farm. Your people are best suited for the Present and Future era."
			break
		case "Vampire":
			strength =
				"economy and industry. You should focus your buildings on Huts, Markets, and Blacksmiths, and use your turns in either Cash or Industry. Your people are best suited for the Future era."
			break
		case "Minotaur":
			strength =
				"military and economy. You should focus your buildings on Huts and Markets, and use your attack and defense bonuses to win battles. Your people are best suited for the Future era."
			break
		case "Pixie":
			strength =
				"magic and economy. You should focus your buildings on Mage Towers, Huts, and Markets, use turns in Meditate or Cash, and cast spells in the Magic Center. Beware of your low attack and defense stats. Your people are best suited for the Past era."
			break
	}
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
			title="Welcome to NeoPromisance!"
			centered
			overflow="inside"
			size="lg"
		>
			<Text>
				You are the founder of a new empire in the world of Promisance. You are
				currently in the protection period. This means that you cannot be
				attacked by other players. You can use this time to learn the game and
				build up your empire.
			</Text>
			<Text mt="sm">
				If you are brand new to the game, the{" "}
				<strong>Getting Started Tour</strong> and <strong>Game Guide</strong>{" "}
				will be very useful for you, each page has a <strong>Guide</strong> link
				that will take you to the relevant section of the Game Guide. Additional
				walkthrough tours are indicated with the Compass <Compass /> icon and
				are available on the Build and Attack pages.
			</Text>
			<Text mt="sm">
				You're goal is to build up your empire and become the most powerful
				empire in the world. To do this you will need to increase your{" "}
				<strong>land</strong> and <strong>army</strong>, but there are many
				paths to victory. You can focus on building buildings tailored to your
				economy, military, magic, or food production. You can also focus on a
				combination of these things.
			</Text>
			<Text mt="sm">
				As a {raceArray[empire.race].name} your people are strongest in{" "}
				{strength}
			</Text>
		</Modal>
	)
}

export default NewPlayerModal
