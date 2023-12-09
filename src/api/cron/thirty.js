import { ROUND_START, ROUND_END } from '../../config/config'

export default async function handler(request, response) {
	let now = new Date().getTime()
	if (
		now > new Date(ROUND_START).getTime() &&
		now < new Date(ROUND_END).getTime()
	) {
		const result = await fetch('https://api.neopromisance.com/api/cron/thirty')
		const data = await result.json()

		return response.json(data)
	} else {
		return response.json({
			message: 'Round is not running',
		})
	}
}
