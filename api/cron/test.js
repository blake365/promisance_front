import { ROUND_START, ROUND_END } from '../../src/config/config'

export const edge = true

export default async function handler(request, response) {
	let now = new Date().getTime()
	console.log('now', now)
	if (
		now > new Date(ROUND_START).getTime() &&
		now < new Date(ROUND_END).getTime()
	) {
		console.log('in round')
		const result = await fetch('https://api.neopromisance.com/api/cron/test', {
			headers: {
				authorization: `Bearer ${process.env.VITE_CRON_SECRET}`,
			},
		})
		const data = await result.json()

		return response.json(data)
	} else {
		return response.json({
			message: 'Round is not running',
		})
	}
}
