import { Button, Group } from "@mantine/core"
import { useState } from "react"
import { eraArray } from "../../../config/eras"
import GuideLink from "../../utilities/guidelink"
import { useSelector } from "react-redux"
import { useTranslation } from "react-i18next"
import { parseGuideLinks } from "../../utilities/parseGuideLinks"

export default function MilitaryGuide({ empire }) {
	const { pvtmTrpArm, pvtmTrpFly, pvtmTrpLnd, pvtmTrpSea } = useSelector(
		(state) => state.games.activeGame,
	)
	const [era, setEra] = useState(empire.era)
	const { t } = useTranslation(["guide", "eras"])

	return (
		<div>
			<GuideLink text={t("guide:guide.content.common.return")} page="Index" />

			<h2>{t("guide:guide.content.military.title")}</h2>
			<p>{parseGuideLinks(t("guide:guide.content.military.description"))}</p>

			<Group>
				<Button onClick={() => setEra(0)} compact color={eraArray[0].color}>
					{t("guide:guide.content.military.eraButtons.past")}
				</Button>
				<Button onClick={() => setEra(1)} compact color={eraArray[1].color}>
					{t("guide:guide.content.military.eraButtons.present")}
				</Button>
				<Button onClick={() => setEra(2)} compact color={eraArray[2].color}>
					{t("guide:guide.content.military.eraButtons.future")}
				</Button>
			</Group>
			<dl>
				<dt>{eraArray[era].trparm}</dt>
				<dd>
					{parseGuideLinks(
						t("guide:guide.content.military.units.armored.description"),
					)}
					<br />
					{parseGuideLinks(
						t("guide:guide.content.military.units.armored.stats", {
							cost: pvtmTrpArm,
							offense: eraArray[era].o_trparm,
							defense: eraArray[era].d_trparm,
						}),
					)}
				</dd>
				<dt>{eraArray[era].trplnd}</dt>
				<dd>
					{parseGuideLinks(
						t("guide:guide.content.military.units.land.description", {
							primaryStrength:
								eraArray[era].o_trplnd > eraArray[era].d_trplnd
									? "offensive"
									: "defensive",
						}),
					)}
					<br />
					{parseGuideLinks(
						t("guide:guide.content.military.units.land.stats", {
							cost: pvtmTrpLnd,
							offense: eraArray[era].o_trplnd,
							defense: eraArray[era].d_trplnd,
						}),
					)}
				</dd>
				<dt>{eraArray[era].trpfly}</dt>
				<dd>
					{parseGuideLinks(
						t("guide:guide.content.military.units.air.description", {
							primaryStrength:
								eraArray[era].o_trpfly > eraArray[era].d_trpfly
									? "offense"
									: "defense",
						}),
					)}
					<br />
					{parseGuideLinks(
						t("guide:guide.content.military.units.air.stats", {
							cost: pvtmTrpFly,
							offense: eraArray[era].o_trpfly,
							defense: eraArray[era].d_trpfly,
						}),
					)}
				</dd>
				<dt>{eraArray[era].trpsea}</dt>
				<dd>
					{parseGuideLinks(
						t("guide:guide.content.military.units.sea.description"),
					)}
					<br />
					{parseGuideLinks(
						t("guide:guide.content.military.units.sea.stats", {
							cost: pvtmTrpSea,
							offense: eraArray[era].o_trpsea,
							defense: eraArray[era].d_trpsea,
						}),
					)}
				</dd>
			</dl>
		</div>
	)
}
