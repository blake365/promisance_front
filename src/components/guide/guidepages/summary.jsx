import { eraArray } from "../../../config/eras"
import GuideLink from "../../utilities/guidelink"
import { useTranslation } from "react-i18next"
import { parseGuideLinks } from "../../utilities/parseGuideLinks"

export default function SummaryGuide({ empire }) {
	const { t } = useTranslation(["guide", "eras"])
	const eraName = eraArray[empire.era].name.toLowerCase()

	return (
		<div>
			<GuideLink text={t("guide:guide.content.common.return")} page="Index" />

			<h2>{t("guide:guide.content.summary.title")}</h2>
			<p>{parseGuideLinks(t("guide:guide.content.summary.description"))}</p>

			<p>
				{parseGuideLinks(t("guide:guide.content.summary.statistics.intro"))}
			</p>
			<dl>
				<dt>
					{t("guide:guide.content.summary.statistics.stats.empireInfo.name")}
				</dt>
				<dd>
					{parseGuideLinks(
						t(
							"guide:guide.content.summary.statistics.stats.empireInfo.description",
						),
					)}
				</dd>
				<dt>{t("guide:guide.content.summary.statistics.stats.turns.name")}</dt>
				<dd>
					{parseGuideLinks(
						t("guide:guide.content.summary.statistics.stats.turns.description"),
					)}
				</dd>
				<dt>
					{t("guide:guide.content.summary.statistics.stats.storedTurns.name")}
				</dt>
				<dd>
					{parseGuideLinks(
						t(
							"guide:guide.content.summary.statistics.stats.storedTurns.description",
						),
					)}
				</dd>
				<dt>{t("guide:guide.content.summary.statistics.stats.rank.name")}</dt>
				<dd>
					{parseGuideLinks(
						t("guide:guide.content.summary.statistics.stats.rank.description"),
					)}
				</dd>
				<dt>{t(`eras:eras.${eraName}.peasants`)}</dt>
				<dd>
					{parseGuideLinks(
						t(
							"guide:guide.content.summary.statistics.stats.population.description",
						),
					)}
				</dd>
				<dt>{t("guide:guide.content.summary.statistics.stats.land.name")}</dt>
				<dd>
					{parseGuideLinks(
						t("guide:guide.content.summary.statistics.stats.land.description"),
					)}
				</dd>
				<dt>{t("guide:guide.content.summary.statistics.stats.money.name")}</dt>
				<dd>
					{parseGuideLinks(
						t("guide:guide.content.summary.statistics.stats.money.description"),
					)}
				</dd>
				<dt>{t(`eras:eras.${eraName}.food`)}</dt>
				<dd>
					{parseGuideLinks(
						t("guide:guide.content.summary.statistics.stats.food.description"),
					)}
				</dd>
				<dt>{t(`eras:eras.${eraName}.runes`)}</dt>
				<dd>
					{parseGuideLinks(
						t(
							"guide:guide.content.summary.statistics.stats.runes.description",
							{
								wizardType: t(`eras:eras.${eraName}.trpwiz`),
							},
						),
					)}
				</dd>
				<dt>
					{t("guide:guide.content.summary.statistics.stats.netWorth.name")}
				</dt>
				<dd>
					{parseGuideLinks(
						t(
							"guide:guide.content.summary.statistics.stats.netWorth.description",
						),
					)}
				</dd>
				<dt>{t("guide:guide.content.summary.statistics.stats.era.name")}</dt>
				<dd>
					{parseGuideLinks(
						t("guide:guide.content.summary.statistics.stats.era.description"),
					)}
				</dd>
				<dt>{t("guide:guide.content.summary.statistics.stats.race.name")}</dt>
				<dd>
					{parseGuideLinks(
						t("guide:guide.content.summary.statistics.stats.race.description"),
					)}
				</dd>
				<dt>{t("guide:guide.content.summary.statistics.stats.health.name")}</dt>
				<dd>
					{parseGuideLinks(
						t(
							"guide:guide.content.summary.statistics.stats.health.description",
						),
					)}
				</dd>
				<dt>
					{t("guide:guide.content.summary.statistics.stats.taxRate.name")}
				</dt>
				<dd>
					{parseGuideLinks(
						t(
							"guide:guide.content.summary.statistics.stats.taxRate.description",
						),
					)}
				</dd>
				<dt>
					{t(`eras:eras.${eraName}.trparm`)}, {t(`eras:eras.${eraName}.trplnd`)}
					, {t(`eras:eras.${eraName}.trpfly`)},{" "}
					{t(`eras:eras.${eraName}.trpsea`)}
				</dt>
				<dd>
					{parseGuideLinks(
						t(
							"guide:guide.content.summary.statistics.stats.military.description",
							{
								armoredUnit: t(`eras:eras.${eraName}.trparm`),
								landUnit: t(`eras:eras.${eraName}.trplnd`),
								airUnit: t(`eras:eras.${eraName}.trpfly`),
								seaUnit: t(`eras:eras.${eraName}.trpsea`),
							},
						),
					)}
				</dd>
				<dt>{t(`eras:eras.${eraName}.trpwiz`)}</dt>
				<dd>
					{parseGuideLinks(
						t(
							"guide:guide.content.summary.statistics.stats.wizards.description",
						),
					)}
				</dd>
			</dl>
			<p>{parseGuideLinks(t("guide:guide.content.summary.roundInfo"))}</p>
			<p>{parseGuideLinks(t("guide:guide.content.summary.newsInfo"))}</p>
		</div>
	)
}
