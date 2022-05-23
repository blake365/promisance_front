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

export default function Guide(props)
{

    let {guidePage} = useSelector((state) => state.guide)
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
        case 'Black%20Market':
        case 'World%20Bank':
        case 'Magic%20Center':
        case 'Manage%20Empire':
        default: 
            return (<div>Nothing yet</div>)
    }


    // return (
        
    //         <ExploreGuide parentCallback={callback}/>
        

    // )
}