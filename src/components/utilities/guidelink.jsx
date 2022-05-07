import { useDispatch } from "react-redux"
import { setPage } from "../../store/guideSlice"
import { Anchor } from "@mantine/core";


export default function GuideLink(props)
{
    const dispatch = useDispatch()

    return(
        <Anchor onClick={()=> dispatch(setPage(props.page))}>
            {props.text}
        </Anchor>
    )
}