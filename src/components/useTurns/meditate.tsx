import { Button, Center, Group, NumberInput, Text, Title } from '@mantine/core'

export default function Meditate() {
	return (
		<main>
			<Center>
				<Group direction='column' spacing='sm' align='center'>
					<Title order={1} align='center'>
						Meditate
					</Title>
					<div>
						For each turn you spend meditating, your wizards will produce 25%
						more mana.
					</div>
					<NumberInput
						label='Spend how many turns meditating?'
						min={0}
						defaultValue={0}
						stepHoldDelay={500}
						stepHoldInterval={100}
						// max={availableTurns}
					/>
					<Button color='indigo'>Meditate</Button>
				</Group>
			</Center>
		</main>
	)
}
