import { Container, Group, ActionIcon, Title } from '@mantine/core';
import { IconBrandGithub } from '@tabler/icons-react';


export default function FooterSocial()
{

    return (
        <div>
            <Container size='lg' py='lg'>
                <Group spacing={0} position="apart" noWrap>
                    <Title order={1}>NeoPromisance</Title>
                    <ActionIcon size="lg">
                        <IconBrandGithub size="1.05rem" stroke={1.5} />
                    </ActionIcon>
                </Group>
            </Container>
        </div>
    );
}