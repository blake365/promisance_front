import GuideLink from "../../utilities/guidelink"
import { Sword } from "@phosphor-icons/react"
import { ThemeIcon } from "@mantine/core"
import { useTranslation } from "react-i18next"
import { parseGuideLinks } from "../../utilities/parseGuideLinks"

export default function ScoresGuide() {
	const { t } = useTranslation(["guide"])

	return (
		<div>
			<GuideLink text={t("guide:guide.content.common.return")} page="Index" />

			<h2>{t("guide:guide.content.scores.title")}</h2>
			<p>{parseGuideLinks(t("guide:guide.content.scores.description"))}</p>
			<dl>
				<dt>
					<span style={{ color: "lightgreen" }}>
						{t("guide:guide.content.scores.empireTypes.protected.name")}
					</span>
				</dt>
				<dd>
					{parseGuideLinks(
						t("guide:guide.content.scores.empireTypes.protected.description"),
					)}
				</dd>
				<dt>
					<span style={{ color: "brown" }}>
						{t("guide:guide.content.scores.empireTypes.demo.name")}
					</span>
				</dt>
				<dd>
					{parseGuideLinks(
						t("guide:guide.content.scores.empireTypes.demo.description"),
					)}
				</dd>
				<dt>
					<span>
						War{" "}
						<ThemeIcon size="sm" radius="sm" color="red">
							<Sword />
						</ThemeIcon>
					</span>
				</dt>
				<dd>
					{parseGuideLinks(
						t("guide:guide.content.scores.empireTypes.war.description"),
					)}
				</dd>
				<dt>
					<span style={{ color: "red" }}>
						{t("guide:guide.content.scores.empireTypes.locked.name")}
					</span>
				</dt>
				<dd>
					{parseGuideLinks(
						t("guide:guide.content.scores.empireTypes.locked.description"),
					)}
				</dd>
				<dt>
					<span style={{ color: "orange" }}>
						{t("guide:guide.content.scores.empireTypes.admin.name")}
					</span>
				</dt>
				<dd>
					{parseGuideLinks(
						t("guide:guide.content.scores.empireTypes.admin.description"),
					)}
				</dd>
				<dt>
					<span style={{ color: "deepskyblue" }}>
						{t("guide:guide.content.scores.empireTypes.self.name")}
					</span>
				</dt>
				<dd>
					{parseGuideLinks(
						t("guide:guide.content.scores.empireTypes.self.description"),
					)}
				</dd>
			</dl>
			<p>{parseGuideLinks(t("guide:guide.content.scores.statistics.intro"))}</p>
			<dl>
				<dt>{t("guide:guide.content.scores.statistics.stats.rank.name")}</dt>
				<dd>
					{parseGuideLinks(
						t("guide:guide.content.scores.statistics.stats.rank.description"),
					)}
				</dd>
				<dt>{t("guide:guide.content.scores.statistics.stats.empire.name")}</dt>
				<dd>
					{parseGuideLinks(
						t("guide:guide.content.scores.statistics.stats.empire.description"),
					)}
				</dd>
				<dt>
					{t("guide:guide.content.scores.statistics.stats.netWorth.name")}
				</dt>
				<dd>
					{parseGuideLinks(
						t(
							"guide:guide.content.scores.statistics.stats.netWorth.description",
						),
					)}
				</dd>
				<dt>{t("guide:guide.content.scores.statistics.stats.land.name")}</dt>
				<dd>
					{parseGuideLinks(
						t("guide:guide.content.scores.statistics.stats.land.description"),
					)}
				</dd>
				<dt>{t("guide:guide.content.scores.statistics.stats.era.name")}</dt>
				<dd>
					{parseGuideLinks(
						t("guide:guide.content.scores.statistics.stats.era.description"),
					)}
				</dd>
				<dt>{t("guide:guide.content.scores.statistics.stats.race.name")}</dt>
				<dd>
					{parseGuideLinks(
						t("guide:guide.content.scores.statistics.stats.race.description"),
					)}
				</dd>
				<dt>{t("guide:guide.content.scores.statistics.stats.dr.name")}</dt>
				<dd>
					{parseGuideLinks(
						t("guide:guide.content.scores.statistics.stats.dr.description"),
					)}
				</dd>
			</dl>
			<p>{parseGuideLinks(t("guide:guide.content.scores.interaction"))}</p>
		</div>
	)
}
