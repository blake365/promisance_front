import GuideLink from "../../utilities/guidelink"
import { useSelector } from "react-redux"
import { useTranslation } from "react-i18next"
import { parseGuideLinks } from "../../utilities/parseGuideLinks"

export default function WorldBankGuide() {
	const { bankLoanRate, bankSaveRate } = useSelector(
		(state) => state.games.activeGame,
	)
	const { t } = useTranslation(["guide"])

	return (
		<div>
			<GuideLink text={t("guide:guide.content.common.return")} page="Index" />

			<h2>{t("guide:guide.content.worldBank.title")}</h2>
			<p>{parseGuideLinks(t("guide:guide.content.worldBank.description"))}</p>
			<p>{parseGuideLinks(t("guide:guide.content.worldBank.accountLimits"))}</p>
			<p>
				{parseGuideLinks(
					t("guide:guide.content.worldBank.savingsRate", {
						bankSaveRate: bankSaveRate,
					}),
				)}
			</p>
			<p>
				{parseGuideLinks(
					t("guide:guide.content.worldBank.loanRate", {
						bankLoanRate: bankLoanRate,
					}),
				)}
			</p>
			<p>{parseGuideLinks(t("guide:guide.content.worldBank.emergencyLoan"))}</p>
			<p>{parseGuideLinks(t("guide:guide.content.worldBank.finalWeek"))}</p>
		</div>
	)
}
