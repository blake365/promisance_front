import { Group, Anchor } from "@mantine/core"
import GuideLink from "../../utilities/guidelink"

export default function GuideIndex() {
	return (
		<div>
			<h2>Index of Topics </h2>
			<Anchor href="https://guide.neopromisance.com" target="_blank" mr="sm">
				External Guide ↗
			</Anchor>
			<GuideLink text="Personalized Tips" page="New%20Player" color="green" />
			<div>
				<h4>Getting Started</h4>
				<Group>
					<GuideLink text="Introduction" page="Introduction" />
					<GuideLink text="Structures" page="Buildings" />
					<GuideLink text="Military Units" page="Military" />
					<GuideLink text="Races" page="Race" />
					<GuideLink text="Time Periods" page="Era" />
				</Group>
				<h4>Basic Strategies</h4>
				<Group>
					<GuideLink text="Protection" page="Protection" />
					<GuideLink text="Farmer" page="Farmer" />
					<GuideLink text="Industrialist" page="Indy" />
					<GuideLink text="Casher" page="Casher" />
					<GuideLink text="Mage" page="Mage" />
				</Group>
				<h4>Information</h4>
				<Group>
					<GuideLink text="Empire Summary" page="Summary" />
					<GuideLink text="Detailed Overview" page="Overview" />
					<GuideLink text="Scores List" page="Scores" />
					<GuideLink text="Clan Statistics" page="Clan%20Stats" />
					{/* <GuideLink text='The Graveyard' page='Graveyard' /> */}
					{/* <GuideLink text='Searching for Empires' page='Empire Search' /> */}
					<GuideLink text="Mailbox" page="Mailbox" />
					<GuideLink text="World News" page="World%20News" />
					{/* <GuideLink text='Clan Contacts' page='Clan Contacts' /> */}
				</Group>
				<h4>Spending Turns</h4>
				<Group>
					<GuideLink text="Agriculture Focus" page="Farm" />
					<GuideLink text="Economic Focus" page="Cash" />
					<GuideLink text="Exploration" page="Explore" />
					<GuideLink text="Industrial Focus" page="Industry" />
					<GuideLink text="Healing Focus" page="Healing" />
					<GuideLink text="Meditate" page="Meditate" />
					<GuideLink text="Casting Spells" page="Magic%20Center" />
					<GuideLink text="Construction" page="Build" />
					<GuideLink text="Demolition" page="demolish" />
					<GuideLink text="Favorites" page="Favorites" />
				</Group>
				<h4>Finance</h4>
				<Group>
					<GuideLink text="Black Market" page="Black%20Market" />
					<GuideLink text="Public Market" page="Public%20Market" />
					<GuideLink text="The Bank" page="The%20Bank" />
					<GuideLink text="Lottery" page="Lottery" />
				</Group>
				<h4>Diplomacy</h4>
				<Group>
					<GuideLink text="Clans" page="Clans" />
					<GuideLink text="Your Army" page="War%20Council" />
					<GuideLink text="Intel Center" page="Intel%20Center" />
					<GuideLink text="Sending Foreign Aid" page="Foreign%20Aid" />
				</Group>
				<h4>Management</h4>
				<Group>
					{/* <GuideLink text='Managing Your Account' page='Account' /> */}
					<GuideLink text="Empire Settings" page="Empire%20Settings" />
					{/* <GuideLink text='Managing Your Clan' page='Manage%20Clan' /> */}
				</Group>
			</div>
		</div>
	)
}
