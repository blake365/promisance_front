export const edge = true

export default async function handler(request, response) {
	const result = await fetch('https://api.neopromisance.com/api/cron/turns', {
		headers: {
			authorization: `Bearer ${process.env.VITE_CRON_SECRET}`,
		},
	})
	const data = await result.json()

	return response.json(data)
}
