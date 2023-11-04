import { Container, Group, ActionIcon, Title } from '@mantine/core';
import { IconBrandDiscord, IconBrandGithub } from '@tabler/icons-react';


export default function FooterSocial()
{
    return (
        <div>
            <Container size='lg' py='lg'>
                <Group spacing={0} position="apart" noWrap>
                    <Title order={1}>NeoPromisance</Title>
                    <Group>
                        <ActionIcon size="lg" component='a' href='https://discord.gg/bnuVy2pdgM' alt='discord link'>
                            <IconBrandDiscord size="2rem" stroke={1.5} />
                        </ActionIcon>
                        <ActionIcon size="lg" component='a' href='https://github.com/blake365/typescript_promisance' alt='github link'>
                            <IconBrandGithub size="2rem" stroke={1.5} />
                        </ActionIcon>
                    </Group>
                </Group>
            </Container>
        </div>
    );
}