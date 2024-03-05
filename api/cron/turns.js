import { ROUND_START, ROUND_END, TURNS_FREQ } from '../../src/config/config'
export const edge = true

export default async function handler(request, response) {
	let now = new Date().getTime()
	if (
		now > new Date(ROUND_START).getTime() &&
		now < new Date(ROUND_END).getTime() + 1000 * 60 * TURNS_FREQ + 1000
	) {
		const result = await fetch(
			'https://api.neopromisance.com/api/cron/turns?gameId=1',
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
