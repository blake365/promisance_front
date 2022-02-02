import {
	Button,
	Center,
	Divider,
	Group,
	NumberInput,
	Text,
	Title,
} from '@mantine/core'

export default function Industry() {
	return (
		<main>
			<Center mb={10}>
				<Group direction='column' spacing='sm' align='center'>
					<Title order={1} align='center'>
						Industry
					</Title>
					<div>
						For each turn you spend focusing on industry, your factories will
						make 25% more troops.
					</div>
					<NumberInput
						label='Spend how many turns making troops?'
						min={0}
						defaultValue={0}
						stepHoldDelay={500}
						stepHoldInterval={100}
						// max={availableTurns}
					/>
					<Button color='red'>Make Troops</Button>
				</Group>
			</Center>
			<Divider size='lg' />
			<Center mt={5}>
				<Group direction='column' spacing='sm' align='center'>
					<h2>Industry Settings</h2>
					<Text size='sm'>
						Input the percentage of production to dedicate to each type of unit.{' '}
					</Text>
					<NumberInput
						label='Infantry'
						min={0}
						max={100}
						defaultValue={25}
						stepHoldDelay={500}
						stepHoldInterval={100}
					/>
					<NumberInput
						label='Tanks'
						min={0}
						max={100}
						defaultValue={25}
						stepHoldDelay={500}
						stepHoldInterval={100}
					/>
					<NumberInput
						label='Jets'
						min={0}
						max={100}
						defaultValue={25}
						stepHoldDelay={500}
						stepHoldInterval={100}
					/>
					<NumberInput
						label='Battleships'
						min={0}
						max={100}
						defaultValue={25}
						stepHoldDelay={500}
						stepHoldInterval={100}
					/>
					<Button color='red'>Update Industry</Button>
				</Group>
			</Center>
		</main>
	)
}
