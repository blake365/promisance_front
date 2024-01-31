import { useSelector } from "react-redux"

export const checkRoundStatus = (early) =>
{
	const time = useSelector((state) => state.time)
	let roundStatus = false
	let upcoming = time.time.start - time.time.time
	let remaining = time.time.end - time.time.time
	let earlyEnd = false
	if (early) {
		earlyEnd = remaining / 1000 / 60 / 60 < 24
	}

	if (upcoming > 0) {
		roundStatus = true
	} else if (remaining < 0 || earlyEnd) {
		roundStatus = true
	} else {
		roundStatus = false
	}

	return roundStatus
}