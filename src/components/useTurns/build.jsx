import { Button, Center, Group, NumberInput, Table, Title } from '@mantine/core'

export default function Build() {
	return (
		<main>
			<Center mb={10}>
				<Group direction='column' spacing='sm' align='center'>
					<Title order={1} align='center'>
						Build
					</Title>
					<div>
						Each structure consumes one acre of unused land and costs $5,000 to
						build.
					</div>
					<div>You can build 600 structures per turn</div>
					<div>With your resources you can build XX structures</div>
					<form>
						<Table verticalSpacing='xs' striped>
							<thead>
								<tr>
									<th>Structure</th>
									<th>Owned</th>
									<th>Can Build</th>
									<th>Build</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>Apartments</td>
									<td>0 (0%)</td>
									<td>20000</td>
									<td>
										<NumberInput
											hideControls
											min={0}
											defaultValue={0}
											stepHoldDelay={500}
											stepHoldInterval={100}
										/>
									</td>
								</tr>
								<tr>
									<td>Business Centers</td>
									<td>0 (0%)</td>
									<td>0</td>
									<td>
										<NumberInput
											hideControls
											min={0}
											defaultValue={0}
											stepHoldDelay={500}
											stepHoldInterval={100}
										/>
									</td>
								</tr>
								<tr>
									<td>Factories</td>
									<td>0 (0%)</td>
									<td>0</td>
									<td>
										<NumberInput
											hideControls
											min={0}
											defaultValue={0}
											stepHoldDelay={500}
											stepHoldInterval={100}
										/>
									</td>
								</tr>
								<tr>
									<td>Warehouses</td>
									<td>0 (0%)</td>
									<td>0</td>
									<td>
										<NumberInput
											hideControls
											min={0}
											defaultValue={0}
											stepHoldDelay={500}
											stepHoldInterval={100}
										/>
									</td>
								</tr>
								<tr>
									<td>PSI Centers</td>
									<td>0 (0%)</td>
									<td>0</td>
									<td>
										<NumberInput
											hideControls
											min={0}
											defaultValue={0}
											stepHoldDelay={500}
											stepHoldInterval={100}
										/>
									</td>
								</tr>
								<tr>
									<td>Plantations</td>
									<td>0 (0%)</td>
									<td>0</td>
									<td>
										<NumberInput
											hideControls
											min={0}
											defaultValue={0}
											stepHoldDelay={500}
											stepHoldInterval={100}
										/>
									</td>
								</tr>
								<tr>
									<td>Bunkers</td>
									<td>0 (0%)</td>
									<td>0</td>
									<td>
										<NumberInput
											hideControls
											min={0}
											defaultValue={0}
											stepHoldDelay={500}
											stepHoldInterval={100}
										/>
									</td>
								</tr>
								<tr>
									<td>Unused Land</td>
									<td>0</td>
								</tr>
							</tbody>
						</Table>

						<Button color='black' type='submit'>
							Begin Construction
						</Button>
					</form>
				</Group>
			</Center>
		</main>
	)
}
