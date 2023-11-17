import
{
    Center,
    Stack,
    Text, Button,
} from '@mantine/core'
import { useSelector } from 'react-redux'


export default function Disabled()
{

    const { empire } = useSelector((state) => state.empire)

    return (
        <section >
            <Center>
                <Stack spacing='sm' align='center'>
                    <Text align='center'>Your empire has been disabled for suspected rule breaking or abuse of the game. <a href='/rules'>See game rules</a></Text>
                    <Text align='center'>If you would like to appeal to the admins please send an email.</Text>
                    <Button component='a' href={`mailto:admin@neopromisance.com?subject=${empire.name} (#${empire.id}) Disabled Appeal`}>Email Admins</Button>
                </Stack>
            </Center>
        </section>
    )
}
