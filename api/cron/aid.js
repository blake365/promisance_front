import { ROUND_START, ROUND_END } from '../../src/config/config'
export const edge = true

export default async function handler(request, response) {
	let now = new Date().getTime()
	if (
		now > new Date(ROUND_START).getTime() &&
		now < new Date(ROUND_END).getTime()
	) {
		// gameId set to 1 for now, will be dynamic in future
		const result = await fetch(
			'https://api.neopromisance.com/api/cron/aid?gameId=1',
			{
				headers: {
					authorization: `Bearer ${process.env.VITE_CRON_SECRET}`,
				},
			}
		)
		const data = await result.json()

		return response.json(data)
	} else {
		return response.json({
			message: 'Round is not running',
		})
	}
}
