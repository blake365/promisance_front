import { Container, Group, ActionIcon, Title, Anchor } from '@mantine/core';
import { IconBrandDiscord, IconBrandGithub } from '@tabler/icons-react';


export default function FooterSocial()
{
    return (
        <div>
            <Container size='lg' py='lg'>
                <Group spacing={0} position="apart">
                    <Title order={1} component='a' href='/' aria-label='home'>NeoPromisance</Title>
                    <Group noWrap position='center'>
                        <Anchor href='/rules' sx={{ textDecoration: 'none', color: 'gray' }}>Rules</Anchor>
                        <Anchor href='/privacy' sx={{ textDecoration: 'none', color: 'gray' }}>Privacy Policy</Anchor>
                        <ActionIcon size="lg" component='a' href='https://discord.gg/bnuVy2pdgM' aria-label='discord link'>
                            <IconBrandDiscord size="2rem" stroke={1.5} />
                        </ActionIcon>
                        <ActionIcon size="lg" component='a' href='https://github.com/blake365/typescript_promisance' aria-label='github link'>
                            <IconBrandGithub size="2rem" stroke={1.5} />
                        </ActionIcon>
                    </Group>
                </Group>
            </Container>
        </div>
    );
}