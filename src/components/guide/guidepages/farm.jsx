import { Text } from "@mantine/core"
import GuideLink from "../../utilities/guidelink"


export default function FarmGuide({ parentCallback })
{
    return (
    <div>
        <h2>Exploration</h2>
        <p>For small empires, attacking others to gain land is infeasible - their time is better spent exploring.</p>
        <p>While spending turns here, your empire will expand its borders and gain additional land.</p>
            <p>Be warned - as your empire grows larger, it will become more and more difficult to find usable land, at which point you will have to resort to <Text variant='link' onClick={() => { parentCallback('Your Army') }} inline>attacking</Text> other empires to steal their land.</p>
            <GuideLink text='attacking' page='Your Army' />
    </div>
    )
}
