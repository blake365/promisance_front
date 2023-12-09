export default async function handler(request, response) {
	const result = await fetch('https://api.neopromisance.com/api/cron/test')
	const data = await result.json()

	return response.json(data)
}
