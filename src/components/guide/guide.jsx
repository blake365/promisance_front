import { Center, Group, Title,  } from "@mantine/core";
import { useCallback, useState } from "react";
import { useLocation } from 'react-router-dom';
import ExploreGuide from "./guidepages/explore";
import SummaryGuide from "./guidepages/summary";
import { useSelector } from "react-redux";

export default function Guide(props)
{

    // let location = useLocation()
    // // console.log(location)

    // let locationArr = location.pathname.split('/')
    // let last = locationArr.length - 1
    // let pageState = locationArr[last]
    // console.log(pageState)

    // const [page, setPage] = useState(pageState)

    // const callback = useCallback((page) =>
    // {
    //     setPage(page)
    // }, [])

    // console.log(page)

    let {guidePage} = useSelector((state) => state.guide)
    console.log(guidePage)

    switch (guidePage) {
        case 'Summary':
            return <SummaryGuide empire={props.empire} />
        case 'Overview':
        case 'Scores':
        case 'Explore':
            return <ExploreGuide />
        case 'Build':
            // return <BuildGuide parentCallback={callback} />
        case 'Farm':
        case 'Cash':
        case 'Industry':
        case 'Meditate':
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