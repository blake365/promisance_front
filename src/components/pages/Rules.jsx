import { Container } from '@mantine/core'
import FooterSocial from '../layout/footer'
import { SlimHero } from './slimHero';

const GameRules = () =>
{
    return (
        <div>
            <SlimHero />
            <Container size='lg' mt='lg'>
                <h2>Terms of Engagement for NeoPromisance</h2>
                <p>Upon creating an empire in our games, you consent to the following guidelines:</p>
                <ol>
                    <li>One user account per player is permitted, which can be used to establish a single empire on each server. Utilizing additional accounts to create more empires may lead to those accounts being deactivated.</li>
                    <li>Should you anticipate multiple users at your location (like family members or colleagues) also participating in the game, we advise informing an in-game empire <a href='mailto:admin@neopromisance.com'>administrator</a> to prevent misunderstandings regarding the multi-account rule. Neglecting this could lead to assumptions of rule violation and potential account deactivation.</li>
                    <p>NOTE: The administration may limit access to one user account per location if misusage of multiple accounts is suspected.</p>
                    <li>Inappropriate or offensive names for empires, clans, or profiles are strictly prohibited. Such content may be removed or altered without prior notification.</li>
                    <li>Harassing or offensive messages within the game are forbidden. To report such behavior from another player, please use the report button on the offending message.</li>
                    <li>Automating gameplay actions is prohibited. Empires found violating this rule are subject to deletion or disabling.</li>
                    <li>If you discover a bug, please report it to an administrator or through the Discord server. Exploiting bugs for personal gain in the game may lead to your empire being disabled. If you would like to contribute a bug fix, open a pull request on Github.</li>
                    <li>Failure to adhere to these rules may result in consequences ranging from warnings to permanent exclusion from the game, based on the nature and frequency of the violations.</li>
                </ol>
            </Container>
            <FooterSocial />
        </div>
    );
}

export default GameRules
