import { Grid, Group, Table, Title } from '@mantine/core'
import { useSelector } from 'react-redux'
import { TURNS_COUNT, TURNS_FREQ, TURNS_MAXIMUM, TURNS_STORED } from '../config/config'
import { eraArray } from '../config/eras'
import { raceArray } from '../config/races'

// TODO: create polymorph feature
// TODO: build page

export default function ManageEmpire()
{
	const { empire } = useSelector((state) => state.empire)

	return (
		<main>
			<Group direction='column' spacing='sm' align='center' grow>
				<Title order={1} align='center'>
					Manage Empire
				</Title>
                <div>Polymorph</div>
                <div>taxes</div>
                <div>industry</div>
                <div>rename</div>
			</Group>
		</main>
	)
}
