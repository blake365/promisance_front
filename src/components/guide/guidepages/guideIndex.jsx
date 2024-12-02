import { Group, Anchor } from "@mantine/core"
import GuideLink from "../../utilities/guidelink"
import { useTranslation } from "react-i18next"

export default function GuideIndex() {
	const { t } = useTranslation(["guide"])

	return (
		<div>
			<h2>{t("guide:guide.sections.gettingStarted")}</h2>
			<Anchor href="https://guide.neopromisance.com" target="_blank" mr="sm">
				External Guide ↗
			</Anchor>
			<GuideLink
				text={t("guide:guide.pages.newPlayer")}
				page="New%20Player"
				color="green"
			/>
			<div>
				<h4>{t("guide:guide.sections.gettingStarted")}</h4>
				<Group>
					<GuideLink
						text={t("guide:guide.pages.introduction")}
						page="Introduction"
					/>
					<GuideLink text={t("guide:guide.pages.buildings")} page="Buildings" />
					<GuideLink text={t("guide:guide.pages.military")} page="Military" />
					<GuideLink text={t("guide:guide.pages.race")} page="Race" />
					<GuideLink text={t("guide:guide.pages.era")} page="Era" />
				</Group>
				<h4>{t("guide:guide.sections.basicStrategies")}</h4>
				<Group>
					<GuideLink
						text={t("guide:guide.pages.protection")}
						page="Protection"
					/>
					<GuideLink text={t("guide:guide.pages.farmer")} page="Farmer" />
					<GuideLink text={t("guide:guide.pages.indy")} page="Indy" />
					<GuideLink text={t("guide:guide.pages.casher")} page="Casher" />
					<GuideLink text={t("guide:guide.pages.mage")} page="Mage" />
				</Group>
				<h4>{t("guide:guide.sections.information")}</h4>
				<Group>
					<GuideLink text={t("guide:guide.pages.summary")} page="Summary" />
					<GuideLink text={t("guide:guide.pages.overview")} page="Overview" />
					<GuideLink text={t("guide:guide.pages.scores")} page="Scores" />
					<GuideLink
						text={t("guide:guide.pages.clanStats")}
						page="Clan%20Stats"
					/>
					<GuideLink text={t("guide:guide.pages.mailbox")} page="Mailbox" />
					<GuideLink
						text={t("guide:guide.pages.worldNews")}
						page="World%20News"
					/>
				</Group>
				<h4>{t("guide:guide.sections.spendingTurns")}</h4>
				<Group>
					<GuideLink text={t("guide:guide.pages.farm")} page="Farm" />
					<GuideLink text={t("guide:guide.pages.cash")} page="Cash" />
					<GuideLink text={t("guide:guide.pages.explore")} page="Explore" />
					<GuideLink text={t("guide:guide.pages.industry")} page="Industry" />
					<GuideLink text={t("guide:guide.pages.healing")} page="Healing" />
					<GuideLink text={t("guide:guide.pages.meditate")} page="Meditate" />
					<GuideLink
						text={t("guide:guide.pages.magicCenter")}
						page="Magic%20Center"
					/>
					<GuideLink text={t("guide:guide.pages.build")} page="Build" />
					<GuideLink text={t("guide:guide.pages.demolish")} page="demolish" />
					<GuideLink text={t("guide:guide.pages.favorites")} page="Favorites" />
				</Group>
				<h4>{t("guide:guide.sections.finance")}</h4>
				<Group>
					<GuideLink
						text={t("guide:guide.pages.blackMarket")}
						page="Black%20Market"
					/>
					<GuideLink
						text={t("guide:guide.pages.publicMarket")}
						page="Public%20Market"
					/>
					<GuideLink
						text={t("guide:guide.pages.worldBank")}
						page="The%20Bank"
					/>
					<GuideLink text={t("guide:guide.pages.lottery")} page="Lottery" />
				</Group>
				<h4>{t("guide:guide.sections.diplomacy")}</h4>
				<Group>
					<GuideLink text={t("guide:guide.pages.clans")} page="Clans" />
					<GuideLink
						text={t("guide:guide.pages.warCouncil")}
						page="War%20Council"
					/>
					<GuideLink
						text={t("guide:guide.pages.intelCenter")}
						page="Intel%20Center"
					/>
					<GuideLink
						text={t("guide:guide.pages.foreignAid")}
						page="Foreign%20Aid"
					/>
				</Group>
				<h4>{t("guide:guide.sections.management")}</h4>
				<Group>
					<GuideLink
						text={t("guide:guide.pages.empireSettings")}
						page="Empire%20Settings"
					/>
				</Group>
			</div>
		</div>
	)
}
