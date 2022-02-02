import { Button, Center, Group, NumberInput, Text, Title } from '@mantine/core'

export default function Farm() {
	return (
		<main>
			<Center>
				<Group direction='column' spacing='sm' align='center'>
					<Title order={1} align='center'>
						Farm
					</Title>
					<div>
						For each turn you spend farming, your farms will produce 25% more
						food
					</div>
					<NumberInput
						label='Spend how many turns farming?'
						min={0}
						defaultValue={0}
						stepHoldDelay={500}
						stepHoldInterval={100}
						// max={availableTurns}
					/>
					<Button color='green'>Farm</Button>
				</Group>
			</Center>
		</main>
	)
}
