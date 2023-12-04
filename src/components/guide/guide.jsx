import ExploreGuide from "./guidepages/explore";
import SummaryGuide from "./guidepages/summary";
import { useSelector } from "react-redux";
import OverviewGuide from "./guidepages/overview";
import ScoresGuide from "./guidepages/scores";
import BuildGuide from "./guidepages/build";
import DemolishGuide from "./guidepages/demolish";
import FarmGuide from "./guidepages/farm";
import CashGuide from "./guidepages/cash";
import IndustryGuide from "./guidepages/industry";
import MeditateGuide from "./guidepages/meditate";
import IntroGuide from "./guidepages/introduction";
import RaceGuide from "./guidepages/race";
import EraGuide from "./guidepages/eras";
import MilitaryGuide from "./guidepages/military";
import BuildingsGuide from "./guidepages/buildings";
import BlackMarketGuide from "./guidepages/blackMarket";
import WorldBankGuide from "./guidepages/worldBank";
import MagicCenterGuide from "./guidepages/magicCenter";
import GuideIndex from "./guidepages/guideIndex";
import AttackGuide from "./guidepages/attack";
import HealGuide from "./guidepages/heal";
import NewsGuide from "./guidepages/news";
import MailGuide from "./guidepages/mail";
import IntelGuide from "./guidepages/intel";
import SettingsGuide from "./guidepages/settings";
import AidGuide from "./guidepages/foreignAid";
import ClanGuide from "./guidepages/clan";
import ClanStatsGuide from "./guidepages/clanStats";
import FavoritesGuide from "./guidepages/favorites";
import ProtectionGuide from "./guidepages/protection";
import PublicMarketGuide from "./guidepages/publicMarket";
import FarmerGuide from "./guidepages/farmer";
import CasherGuide from "./guidepages/casher";
import IndyGuide from "./guidepages/indy";
import MageGuide from "./guidepages/mage";
import LotteryGuide from "./guidepages/lottery";
import NewTipsGuide from "./guidepages/newPlayer";

export default function Guide(props)
{

    let { guidePage } = useSelector((state) => state.guide)
    // console.log(guidePage)

    switch (guidePage) {
        case 'Summary':
            return <SummaryGuide empire={props.empire} />
        case 'Overview':
            return <OverviewGuide empire={props.empire} />
        case 'Scores':
            return <ScoresGuide />
        case 'Explore':
            return <ExploreGuide />
        case 'Build':
            return <BuildGuide />
        case 'demolish':
            return <DemolishGuide />
        case 'Farm':
            return <FarmGuide empire={props.empire} />
        case 'Cash':
            return <CashGuide />
        case 'Industry':
            return <IndustryGuide />
        case 'Meditate':
            return <MeditateGuide empire={props.empire} />
        case 'Introduction':
            return <IntroGuide empire={props.empire} />
        case 'Race':
            return <RaceGuide empire={props.empire} />
        case 'Era':
            return <EraGuide empire={props.empire} />
        case 'Military':
            return <MilitaryGuide empire={props.empire} />
        case 'Heal':
            return <HealGuide empire={props.empire} />
        case 'Buildings':
            return <BuildingsGuide empire={props.empire} />
        case 'Black%20Market':
            return <BlackMarketGuide empire={props.empire} />
        case 'The%20Bank':
            return <WorldBankGuide />
        case 'Magic%20Center':
            return <MagicCenterGuide empire={props.empire} />
        case 'War%20Council':
            return <AttackGuide empire={props.empire} />
        case 'Empire%20Settings':
            return <SettingsGuide />
        case 'World%20News':
            return <NewsGuide />
        case 'Mailbox':
            return <MailGuide />
        case 'Intel%20Center':
            return <IntelGuide empire={props.empire} />
        case 'Index':
            return <GuideIndex />
        case 'Foreign%20Aid':
            return <AidGuide empire={props.empire} />
        case 'Clans':
            return <ClanGuide />
        case 'Clan%20Stats':
            return <ClanStatsGuide />
        case 'Favorites':
            return <FavoritesGuide />
        case 'Public%20Market':
            return <PublicMarketGuide />
        case 'Protection':
            return <ProtectionGuide empire={props.empire} />
        case 'Farmer':
            return <FarmerGuide empire={props.empire} />
        case 'Casher':
            return <CasherGuide empire={props.empire} />
        case 'Indy':
            return <IndyGuide empire={props.empire} />
        case 'Mage':
            return <MageGuide empire={props.empire} />
        case 'Lottery':
            return <LotteryGuide />
        case 'New%20Player':
            return <NewTipsGuide empire={props.empire} />
        default:
            return <GuideIndex />
    }
}