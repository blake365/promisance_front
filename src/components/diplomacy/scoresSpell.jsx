import
{
    Center, Stack, Group
} from '@mantine/core'
import { useSelector } from 'react-redux'
import SpellForm from './spellForm'

export default function ScoresSpell({ enemy })
{
    const { empire } = useSelector((state) => state.empire)

    return (
        <section>
            <Center>
                <Stack spacing='sm' align='center'>
                    <Group position='center'>
                        <SpellForm empire={empire} defenderId={enemy.id} roundStatus={false} />
                    </Group>
                </Stack>
            </Center>
        </section>
    )
}
