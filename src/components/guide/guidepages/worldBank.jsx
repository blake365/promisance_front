import GuideLink from "../../utilities/guidelink"
import { useSelector } from 'react-redux'

export default function WorldBankGuide()
{

    const { bankLoanRate, bankSaveRate } = useSelector((state) => state.games.activeGame)

    return (
        <div>
            <GuideLink text='Return to Index' page='Index' />

            <h2>The Bank</h2>
            <p>The bank provides a place for empires both to store their excess funds and to take out loans during emergencies.</p>
            <p>The maximum size of an empire's savings account and the most it can loan at once is determined mainly by the empire's networth.</p>
            <p>Savings account interest rates begin at {bankSaveRate}% and gradually decreases as your empire grows larger and begins to deposit more of its funds.</p>
            <p>Loan interest rates begin at {bankLoanRate}% and gradually increase as your empire grows larger and becomes more easily able to pay off loans.</p>
            <p>If, while spending turns, your empire manages to run out of money, a loan will automatically be taken out for the amount you need, and the Bank will respect your state of emergency by allowing you to temporarily exceed your usual loan size limit by 100%.</p>
            <p>During the final week of a round, you will not be allowed to take out any additional loans.</p>
        </div>
    )
}
