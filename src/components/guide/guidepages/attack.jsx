import { eraArray } from "../../../config/eras"
import GuideLink from "../../utilities/guidelink"

export default function AttackGuide({ empire })
{


    return (
        <div>
            <GuideLink text='Return to Index' page='Index' />

            <h2>Your Army</h2>
            <p>From here, you may deploy your empire's military to attack other empires and steal their land and resources. Once your empire reaches a certain size, this becomes the easiest method of expansion.</p>
            <p>In order to attack another empire, it must either be in the same era as yours or a Time Gate must be open between your empires, either opened by you or by your target.</p>
            <p>Six different attack methods are available for you to use, each having their own advantages and disadvantages:</p>
            <dl>
                <dt>Guerilla Strike</dt>
                <dd>By sending in only your {eraArray[empire.era].trparm}, you can avoid your target's other forces. If successful, all structures on captured land are destroyed.</dd>
                <dt>Lay Siege</dt>
                <dd>By sending in only your {eraArray[empire.era].trplnd}, you can not only steal your target's land but also destroy additional structures on the land you do not capture. {eraArray[empire.era].blddef} and {eraArray[empire.era].bldwiz} are especially vulnerable.</dd>
                <dt>Air Strike</dt>
                <dd>By sending in only your {eraArray[empire.era].trpfly}, you can not only steal your target's land but also destroy additional structures on the land you do not capture. While attacking from above, significantly more structures can be destroyed, but much fewer will be captured.</dd>
                <dt>Coastal Assault</dt>
                <dd>By sending in only your {eraArray[empire.era].trpsea}, you can not only steal your target's land but also destroy additional structures on the land you do not capture. {eraArray[empire.era].blddef} and {eraArray[empire.era].bldwiz} are especially vulnerable.</dd>
            </dl>
            <h2>Casting Spells</h2>
            <p>From here, your {eraArray[empire.era].trpwiz} can spend {eraArray[empire.era].runes} and turns to cast spells on your enemies.</p>
            <p>Spells cannot be cast if your empire's health is below 20%. Casting an offensive spell reduces health by 6%.</p>
            <p>If your empire's magic power is not great enough, high level spells will result in a magical explosion and kill some of your {eraArray[empire.era].trpwiz}.</p>
            <h3>Offensive Spells</h3>
            <dl>
                <dt>{eraArray[empire.era].spell_blast}</dt>
                <dd>If successful, this will eliminate 3% of your enemy's military and magical forces. If your target has an active {eraArray[empire.era].spell_shield}, only 1% will be destroyed.</dd>
                <dt>{eraArray[empire.era].spell_storm}</dt>
                <dd>If successful, this will destroy a percentage of your target's cash and {eraArray[empire.era].food}. If shielded, it will only be 33% as effective.</dd>
                <dt>{eraArray[empire.era].spell_runes}</dt>
                <dd>If successful, this will destroy a percentage of your target's {eraArray[empire.era].runes}, limiting the ability of their {eraArray[empire.era].trpwiz} to cast spells. If shielded, it will only be 33% as effective.</dd>
                <dt>{eraArray[empire.era].spell_struct}</dt>
                <dd>If successful, this will destroy 3% of your enemy's structures. If your target has an active {eraArray[empire.era].spell_shield}, only 1% will be destroyed.</dd>
                <dt>{eraArray[empire.era].spell_fight}</dt>
                <dd>This spell will allow your {eraArray[empire.era].trpwiz} to battle with your target's magic users. Successful attacks will steal approximately 33% as much land as a standard military attack.</dd>
                <dt>{eraArray[empire.era].spell_steal}</dt>
                <dd>If successful, this will allow you to steal cash from your target empire's treasury. If shielded, it will only be 33% as effective.</dd>
            </dl>
        </div>
    )
}
