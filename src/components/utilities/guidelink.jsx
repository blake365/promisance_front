import { useDispatch } from "react-redux"
import { navigateWithHistory } from "../../store/guideSlice"
import { Anchor } from "@mantine/core"

export default function GuideLink(props) {
	const dispatch = useDispatch()

	return (
		<Anchor
			onClick={() => dispatch(navigateWithHistory(props.page))}
			color={props.color}
		>
			{props.text}
		</Anchor>
	)
}
