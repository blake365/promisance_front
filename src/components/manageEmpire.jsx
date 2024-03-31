import { Stack, Title, Button, Center } from '@mantine/core'
import { useSelector } from 'react-redux'
import { Compass } from '@phosphor-icons/react'
import { useTour } from '@reactour/tour';
import { steps } from '../tour/steps'
import { checkRoundStatus } from '../functions/checkRoundStatus'
import ChangeRace from './settings/changeRace'
import UpdateIcon from './settings/updateIcon'
import UpdateProfile from './settings/updateProfile'
import DeleteEmpire from './settings/deleteEmpire'
import UpdateName from './settings/updateName';

export default function ManageEmpire()
{
	const { setIsOpen, setSteps, setMeta, setCurrentStep } = useTour()
	const { empire } = useSelector((state) => state.empire)
	const roundStatus = checkRoundStatus()
	// Rename empire form?
	// free polymorph in protection
	// option to delete empire

	return (
		<main>
			<Stack spacing='sm' align='center'>
				<Title order={1} align='center'>
					Empire Settings
				</Title>

				<UpdateProfile status={roundStatus} empire={empire} />
				<UpdateIcon status={roundStatus} empire={empire} />
				<ChangeRace status={roundStatus} empire={empire} />
				<UpdateName status={checkRoundStatus(true)} empire={empire} />

				<Center my='sm'>
					<Button compact variant='outline' align='center' onClick={() =>
					{
						setMeta('new player tour')
						setSteps(steps)
						setCurrentStep(0)
						setIsOpen(true)
					}}
						rightIcon={<Compass />}
						sx={{
							border: '1px solid #40c057',
							boxShadow: '0 0 2px 1px #40c057',
							color: '#40c057',
						}}
						className='sixth-step'>Replay First Turns Tour</Button>
				</Center>

				<DeleteEmpire status={checkRoundStatus(true)} empire={empire} />
			</Stack>
		</main>
	)
}
