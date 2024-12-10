import { eraArray } from "../../../config/eras"
import GuideLink from "../../utilities/guidelink"
import { useSelector } from "react-redux"
import { useTranslation } from "react-i18next"
import { parseGuideLinks } from "../../utilities/parseGuideLinks"

export default function IntroGuide({ empire }) {
	const { t } = useTranslation(["guide", "eras"])
	const { turnsCount, turnsFreq, turnsMax, turnsProtection, turnsStored } =
		useSelector((state) => state.games.activeGame)

	const eraName = eraArray[empire.era].name.toLowerCase()

	return (
		<div>
			<h2>{t("guide:guide.content.introduction.title")}</h2>
			<p>{parseGuideLinks(t("guide:guide.content.introduction.mainGoal"))}</p>

			<h2>{t("guide:guide.content.introduction.aboutTurns.title")}</h2>
			<p>{t("guide:guide.content.introduction.aboutTurns.description")}</p>
			<p>
				{parseGuideLinks(
					t("guide:guide.content.introduction.aboutTurns.turnGeneration", {
						turnsCount,
						turnsFreq,
						turnsMax,
						turnsStored,
					}),
				)}
			</p>
			<p>
				{parseGuideLinks(
					t("guide:guide.content.introduction.aboutTurns.turnUsage"),
				)}
			</p>
			<p>
				{parseGuideLinks(
					t("guide:guide.content.introduction.aboutTurns.combatTurns"),
				)}
			</p>
			<p>
				{parseGuideLinks(
					t("guide:guide.content.introduction.aboutTurns.freeTurns"),
				)}
			</p>
			<p>
				{parseGuideLinks(
					t("guide:guide.content.introduction.aboutTurns.maintenance"),
				)}
			</p>
			<p>
				{parseGuideLinks(
					t("guide:guide.content.introduction.aboutTurns.protection", {
						turnsProtection,
					}),
				)}
			</p>

			<h2>{t("guide:guide.content.introduction.statusBar.title")}</h2>
			<p>
				{parseGuideLinks(
					t("guide:guide.content.introduction.statusBar.description"),
				)}
			</p>
			<dl>
				<b>
					{t("guide:guide.content.introduction.statusBar.stats.turnsTitle")}
				</b>
				<dd>
					{parseGuideLinks(
						t("guide:guide.content.introduction.statusBar.stats.turns"),
					)}
				</dd>
				<b>
					{t("guide:guide.content.introduction.statusBar.stats.networthTitle")}
				</b>
				<dd>
					{parseGuideLinks(
						t("guide:guide.content.introduction.statusBar.stats.networth"),
					)}
				</dd>
				<b>{t("guide:guide.content.introduction.statusBar.stats.landTitle")}</b>
				<dd>
					{parseGuideLinks(
						t("guide:guide.content.introduction.statusBar.stats.land"),
					)}
				</dd>
				<b>{t("guide:guide.content.introduction.statusBar.stats.cashTitle")}</b>
				<dd>
					{parseGuideLinks(
						t("guide:guide.content.introduction.statusBar.stats.cash"),
					)}
				</dd>
				<b>{t(`eras:eras.${eraName}.food`)}</b>
				<dd>
					{parseGuideLinks(
						t("guide:guide.content.introduction.statusBar.stats.food"),
					)}
				</dd>
				<b>{t(`eras:eras.${eraName}.runes`)}</b>
				<dd>
					{parseGuideLinks(
						t("guide:guide.content.introduction.statusBar.stats.runes", {
							runeType: t(`eras:eras.${eraName}.runes`),
							wizardType: t(`eras:eras.${eraName}.trpwiz`),
						}),
					)}
				</dd>
				<b>
					{t("guide:guide.content.introduction.statusBar.stats.healthTitle")}
				</b>
				<dd>
					{parseGuideLinks(
						t("guide:guide.content.introduction.statusBar.stats.health"),
					)}
				</dd>
			</dl>

			<h2>{t("guide:guide.content.introduction.otherIcons.title")}</h2>
			<p>
				{parseGuideLinks(
					t("guide:guide.content.introduction.otherIcons.description"),
				)}
			</p>
		</div>
	)
}
