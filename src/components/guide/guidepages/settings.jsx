import GuideLink from "../../utilities/guidelink"

export default function SettingsGuide()
{
    return (
        <div>
            <GuideLink text='Return to Index' page='Index' />

            <h2>Empire Settings</h2>
            <p>Here you can update your public profile and set an icon. Your profile is a way to describe your empire, play style, or just be silly. Your icon is another way to express your personality in the game. Both are visible on the scores page. </p>
            <p>
                Change the <GuideLink text='race' page='Race' /> of your empire's inhabitants. This will come at a cost.
            </p>
        </div>
    )
}
