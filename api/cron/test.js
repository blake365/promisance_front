export default async function handler(request, response) {
	const result = await fetch('https://api.neopromisance.com/api/cron/test', {
		headers: {
			authorization: `Bearer ${process.env.CRON_SECRET}`,
		},
	})
	const data = await result.json()

	return response.json(data)
}
