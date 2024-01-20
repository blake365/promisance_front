import { useSelector } from "react-redux"

export const checkRoundStatus = () =>
{
	const time = useSelector((state) => state.time)

	let roundStatus = false
	let upcoming = time.start - time.time
	let remaining = time.end - time.time

	if (upcoming > 0) {
		roundStatus = true
	} else if (remaining < 0) {
		roundStatus = true
	} else {
		roundStatus = false
	}

	return roundStatus
}