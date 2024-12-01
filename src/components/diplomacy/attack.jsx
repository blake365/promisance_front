import {
	Center,
	Title,
	Text,
	Stack,
	Card,
	Table,
	Group,
	ActionIcon,
} from "@mantine/core"
import { useSelector } from "react-redux"
import { defense, offense } from "../../functions/functions"
import { eraArray } from "../../config/eras"
import { raceArray } from "../../config/races"
import { Compass } from "@phosphor-icons/react"
import { checkRoundStatus } from "../../functions/checkRoundStatus"
import { useTour } from "@reactour/tour"
import { attackSteps } from "../../tour/attackSteps"
import AttackForm from "./attackForm"
import SpellForm from "./spellForm"
import { useTranslation } from "react-i18next"

export default function Attack() {
	const { empire } = useSelector((state) => state.empire)
	const { t } = useTranslation(["diplomacy", "eras"])
	const { setIsOpen, setSteps, setMeta, setCurrentStep } = useTour()

	function formatNumber(num) {
		if (num >= 1e12) {
			return `${(num / 1e12).toFixed(2)} ${t("diplomacy:warCouncil.trillion")}`
		}
		if (num >= 1e9) {
			return `${(num / 1e9).toFixed(2)} ${t("diplomacy:warCouncil.billion")}`
		}
		if (num >= 1e6) {
			return `${(num / 1e6).toFixed(2)} ${t("diplomacy:warCouncil.million")}`
		}
		return num.toLocaleString()
	}

	// console.log(selectedAttack)
	// console.log(otherEmpires)
	const eraDisplay = [0, 1, 2]
	const eraName = eraArray[empire.era].name.toLowerCase()

	const roundStatus = checkRoundStatus()

	return (
		<section>
			<Center>
				<Stack spacing="sm" align="center">
					<img
						src="/images/war.webp"
						height="200"
						style={{
							maxHeight: "200px",
							maxWidth: "100%",
							borderRadius: "10px",
						}}
						alt="war council"
					/>
					<Group position="center" spacing="xs">
						<Title order={1} align="center">
							{t("diplomacy:warCouncil.warCouncil")}
							<ActionIcon
								size="md"
								ml="xs"
								onClick={() => {
									setMeta("attacking tour")
									setSteps(attackSteps)
									setCurrentStep(0)
									setIsOpen(true)
								}}
								sx={{
									color: "#40c057",
									display: "inline",
								}}
							>
								<Compass size={24} />
							</ActionIcon>
						</Title>
					</Group>
					<div className="attk-first-step attk-sixth-step">
						<Text align="center">
							{t("diplomacy:warCouncil.warDescription")}
						</Text>
						<Text align="center">
							{t("diplomacy:warCouncil.spellDescription", {
								wiz: t(`eras:eras.${eraName}.trpwiz`),
							})}
						</Text>
					</div>
					<Group position="center" align="flex-start">
						<AttackForm empire={empire} roundStatus={roundStatus} />
						<Card className="attk-step-twopointfive">
							<Card.Section
								withBorder
								inheritPadding
								py="xs"
								sx={{
									display: "flex",
									justifyContent: "left",
									alignItems: "baseline",
									height: "49px",
								}}
							>
								<Text weight={500}>{t("diplomacy:warCouncil.yourArmy")}:</Text>
								<Title ml="xs" order={4} color={eraArray[empire.era].color}>
									{t(`eras:eras.${eraName}.name`)}
								</Title>
							</Card.Section>
							<Card.Section pt="sm">
								<Table>
									<thead>
										<tr>
											<th>{t("diplomacy:warCouncil.units")}</th>
											<th style={{ textAlign: "right" }}>
												{t("diplomacy:warCouncil.number")}
											</th>
											<th style={{ textAlign: "right" }}>
												{t("diplomacy:warCouncil.attack")}
											</th>
											<th style={{ textAlign: "right" }}>
												{t("diplomacy:warCouncil.defense")}
											</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td>{t(`eras:eras.${eraName}.trparm`)}</td>
											<td align="right">{empire?.trpArm.toLocaleString()}</td>
											<td align="right">
												{formatNumber(
													Math.round(
														eraArray[empire.era].o_trparm *
															empire.trpArm *
															(1 + raceArray[empire.race].mod_offense / 100) *
															(empire.health / 100),
													),
												)}
											</td>
											<td align="right">
												{formatNumber(
													Math.round(
														eraArray[empire.era].d_trparm *
															empire.trpArm *
															(1 + raceArray[empire.race].mod_defense / 100) *
															(empire.health / 100),
													),
												)}
											</td>
										</tr>
										<tr>
											<td>{t(`eras:eras.${eraName}.trplnd`)}</td>
											<td align="right">{empire?.trpLnd.toLocaleString()}</td>
											<td align="right">
												{formatNumber(
													Math.round(
														eraArray[empire.era].o_trplnd *
															empire.trpLnd *
															(1 + raceArray[empire.race].mod_offense / 100) *
															(empire.health / 100),
													),
												)}
											</td>
											<td align="right">
												{formatNumber(
													Math.round(
														eraArray[empire.era].d_trplnd *
															empire.trpLnd *
															(1 + raceArray[empire.race].mod_defense / 100) *
															(empire.health / 100),
													),
												)}
											</td>
										</tr>
										<tr>
											<td>{t(`eras:eras.${eraName}.trpfly`)}</td>
											<td align="right">{empire?.trpFly.toLocaleString()}</td>
											<td align="right">
												{formatNumber(
													Math.round(
														eraArray[empire.era].o_trpfly *
															empire.trpFly *
															(1 + raceArray[empire.race].mod_offense / 100) *
															(empire.health / 100),
													),
												)}
											</td>
											<td align="right">
												{formatNumber(
													Math.round(
														eraArray[empire.era].d_trpfly *
															empire.trpFly *
															(1 + raceArray[empire.race].mod_defense / 100) *
															(empire.health / 100),
													),
												)}
											</td>
										</tr>
										<tr>
											<td>{t(`eras:eras.${eraName}.trpsea`)}</td>
											<td align="right">{empire?.trpSea.toLocaleString()}</td>
											<td align="right">
												{formatNumber(
													Math.round(
														eraArray[empire.era].o_trpsea *
															empire.trpSea *
															(1 + raceArray[empire.race].mod_offense / 100) *
															(empire.health / 100),
													),
												)}
											</td>
											<td align="right">
												{formatNumber(
													Math.round(
														eraArray[empire.era].d_trpsea *
															empire.trpSea *
															(1 + raceArray[empire.race].mod_defense / 100) *
															(empire.health / 100),
													),
												)}
											</td>
										</tr>
										<tr>
											<td>{t("diplomacy:warCouncil.allUnits")}</td>
											<td />
											<td align="right">{formatNumber(offense(empire))}</td>
											<td align="right">{formatNumber(defense(empire))}</td>
										</tr>
									</tbody>
								</Table>
							</Card.Section>
						</Card>
						<SpellForm empire={empire} roundStatus={roundStatus} />
					</Group>

					<Title order={3}>{t("diplomacy:warCouncil.baseUnitValues")}</Title>
					<Group position="center" className="attk-second-step">
						{eraDisplay.map((era) => {
							return (
								<Card key={era}>
									<Card.Section withBorder inheritPadding py="xs">
										<Title align="center" order={4} color={eraArray[era].color}>
											{eraArray[era].name}
										</Title>
									</Card.Section>
									<Card.Section pt="xs">
										<Table>
											<thead>
												<tr>
													<th>{t("diplomacy:warCouncil.units")}</th>
													<th style={{ textAlign: "right" }}>
														{t("diplomacy:warCouncil.attack")}
													</th>
													<th style={{ textAlign: "right" }}>
														{t("diplomacy:warCouncil.defense")}
													</th>
												</tr>
											</thead>
											<tbody>
												<tr>
													<td>{t(`eras:eras.${eraName}.trparm`)}</td>
													<td align="right">{eraArray[era].o_trparm}</td>
													<td align="right">{eraArray[era].d_trparm}</td>
												</tr>
												<tr>
													<td>{t(`eras:eras.${eraName}.trplnd`)}</td>
													<td align="right">{eraArray[era].o_trplnd}</td>
													<td align="right">{eraArray[era].d_trplnd}</td>
												</tr>
												<tr>
													<td>{t(`eras:eras.${eraName}.trpfly`)}</td>
													<td align="right">{eraArray[era].o_trpfly}</td>
													<td align="right">{eraArray[era].d_trpfly}</td>
												</tr>
												<tr>
													<td>{t(`eras:eras.${eraName}.trpsea`)}</td>
													<td align="right">{eraArray[era].o_trpsea}</td>
													<td align="right">{eraArray[era].d_trpsea}</td>
												</tr>
											</tbody>
										</Table>
									</Card.Section>
								</Card>
							)
						})}
					</Group>
				</Stack>
			</Center>
		</section>
	)
}
