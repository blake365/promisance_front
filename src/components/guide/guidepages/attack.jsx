import { eraArray } from "../../../config/eras"
import { useTranslation } from "react-i18next"
import { parseGuideLinks } from "../../utilities/parseGuideLinks"

export default function AttackGuide({ empire }) {
	const { t } = useTranslation(["guide", "eras"])
	const eraName = eraArray[empire.era].name.toLowerCase()

	return (
		<div>
			<h2>{t("guide:guide.content.warCouncil.title")}</h2>
			<p>{parseGuideLinks(t("guide:guide.content.warCouncil.description"))}</p>
			<p>
				{parseGuideLinks(t("guide:guide.content.warCouncil.eraRestriction"))}
			</p>
			<p>
				{parseGuideLinks(
					t("guide:guide.content.warCouncil.attackTypes.description"),
				)}
			</p>
			<dl>
				<dt>
					{t("guide:guide.content.warCouncil.attackTypes.guerrilla.name")}
				</dt>
				<dd>
					{parseGuideLinks(
						t(
							"guide:guide.content.warCouncil.attackTypes.guerrilla.description",
							{
								armoredUnit: t(`eras:eras.${eraName}.trparm`),
							},
						),
					)}
				</dd>
				<dt>{t("guide:guide.content.warCouncil.attackTypes.siege.name")}</dt>
				<dd>
					{parseGuideLinks(
						t("guide:guide.content.warCouncil.attackTypes.siege.description", {
							landUnit: t(`eras:eras.${eraName}.trplnd`),
							defenseBuilding: t(`eras:eras.${eraName}.blddef`),
							wizardBuilding: t(`eras:eras.${eraName}.bldwiz`),
						}),
					)}
				</dd>
				<dt>{t("guide:guide.content.warCouncil.attackTypes.air.name")}</dt>
				<dd>
					{parseGuideLinks(
						t("guide:guide.content.warCouncil.attackTypes.air.description", {
							airUnit: t(`eras:eras.${eraName}.trpfly`),
						}),
					)}
				</dd>
				<dt>{t("guide:guide.content.warCouncil.attackTypes.coastal.name")}</dt>
				<dd>
					{parseGuideLinks(
						t(
							"guide:guide.content.warCouncil.attackTypes.coastal.description",
							{
								seaUnit: t(`eras:eras.${eraName}.trpsea`),
								defenseBuilding: t(`eras:eras.${eraName}.blddef`),
								wizardBuilding: t(`eras:eras.${eraName}.bldwiz`),
							},
						),
					)}
				</dd>
				<dt>{t("guide:guide.content.warCouncil.attackTypes.allOut.name")}</dt>
				<dd>
					{parseGuideLinks(
						t("guide:guide.content.warCouncil.attackTypes.allOut.description"),
					)}
				</dd>
				<dt>{t("guide:guide.content.warCouncil.attackTypes.surprise.name")}</dt>
				<dd>
					{parseGuideLinks(
						t(
							"guide:guide.content.warCouncil.attackTypes.surprise.description",
						),
					)}
				</dd>
				<dt>{t("guide:guide.content.warCouncil.attackTypes.pillage.name")}</dt>
				<dd>
					{parseGuideLinks(
						t("guide:guide.content.warCouncil.attackTypes.pillage.description"),
					)}
				</dd>
			</dl>

			<h2>{t("guide:guide.content.warCouncil.spells.title")}</h2>
			<p>
				{parseGuideLinks(
					t("guide:guide.content.warCouncil.spells.description", {
						wizardType: t(`eras:eras.${eraName}.trpwiz`),
						runeType: t(`eras:eras.${eraName}.runes`),
					}),
				)}
			</p>
			<p>
				{parseGuideLinks(
					t("guide:guide.content.warCouncil.spells.healthRestriction"),
				)}
			</p>
			<p>
				{parseGuideLinks(
					t("guide:guide.content.warCouncil.spells.powerWarning", {
						wizardType: t(`eras:eras.${eraName}.trpwiz`),
					}),
				)}
			</p>
			<p>
				{parseGuideLinks(
					t("guide:guide.content.warCouncil.spells.magicRatio.intro"),
				)}
			</p>
			<p>
				{parseGuideLinks(
					t("guide:guide.content.warCouncil.spells.magicRatio.offense", {
						wizardType: t(`eras:eras.${eraName}.trpwiz`),
					}),
				)}
			</p>
			<p>
				{parseGuideLinks(
					t("guide:guide.content.warCouncil.spells.magicRatio.defense", {
						wizardType: t(`eras:eras.${eraName}.trpwiz`),
					}),
				)}
			</p>
			<p>
				{parseGuideLinks(
					t("guide:guide.content.warCouncil.spells.magicRatio.ratio"),
				)}
			</p>

			<h3>
				{t("guide:guide.content.warCouncil.spells.offensiveSpells.title")}
			</h3>
			<dl>
				<dt>{t(`eras:eras.${eraName}.spell_blast`)}</dt>
				<dd>
					{parseGuideLinks(
						t(
							"guide:guide.content.warCouncil.spells.offensiveSpells.blast.description",
							{
								spellShield: t(`eras:eras.${eraName}.spell_shield`),
							},
						),
					)}
				</dd>
				<dt>{t(`eras:eras.${eraName}.spell_storm`)}</dt>
				<dd>
					{parseGuideLinks(
						t(
							"guide:guide.content.warCouncil.spells.offensiveSpells.storm.description",
							{
								foodType: t(`eras:eras.${eraName}.food`),
							},
						),
					)}
				</dd>
				<dt>{t(`eras:eras.${eraName}.spell_runes`)}</dt>
				<dd>
					{parseGuideLinks(
						t(
							"guide:guide.content.warCouncil.spells.offensiveSpells.runes.description",
							{
								runeType: t(`eras:eras.${eraName}.runes`),
								wizardType: t(`eras:eras.${eraName}.trpwiz`),
							},
						),
					)}
				</dd>
				<dt>{t(`eras:eras.${eraName}.spell_struct`)}</dt>
				<dd>
					{parseGuideLinks(
						t(
							"guide:guide.content.warCouncil.spells.offensiveSpells.struct.description",
							{
								spellShield: t(`eras:eras.${eraName}.spell_shield`),
							},
						),
					)}
				</dd>
				<dt>{t(`eras:eras.${eraName}.spell_fight`)}</dt>
				<dd>
					{parseGuideLinks(
						t(
							"guide:guide.content.warCouncil.spells.offensiveSpells.fight.description",
							{
								wizardType: t(`eras:eras.${eraName}.trpwiz`),
							},
						),
					)}
				</dd>
				<dt>{t(`eras:eras.${eraName}.spell_steal`)}</dt>
				<dd>
					{parseGuideLinks(
						t(
							"guide:guide.content.warCouncil.spells.offensiveSpells.steal.description",
						),
					)}
				</dd>
			</dl>
		</div>
	)
}
