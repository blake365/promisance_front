export const edge = true

export default async function handler(request, response) {
	// gameId set to 1 for now, will be dynamic in future
	const result = await fetch('https://api.neopromisance.com/api/cron/aid', {
		headers: {
			authorization: `Bearer ${process.env.VITE_CRON_SECRET}`,
		},
	})
	const data = await result.json()

	return response.json(data)
}
