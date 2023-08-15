import { createStyles, Container, Title, Text, Button, Group } from '@mantine/core';

const useStyles = createStyles((theme) => ({
    root: {
        backgroundColor: '#000000',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundImage:
            'linear-gradient(250deg, rgba(250, 250, 250, 0) 0%, #000000 70%), url(/images/military2.webp)',
        paddingTop: '3rem',
        paddingBottom: '3rem',
    },

    inner: {
        display: 'flex',
        justifyContent: 'space-between',
    },


}));

export function HeroImageRight()
{
    const { classes } = useStyles();
    return (
        <div className={classes.root}>
            <Container size="lg">
                <div className={classes.inner}>
                    <div >
                        <Text color='white'>
                            Welcome to
                        </Text>
                        <Title color='white' sx={{
                            '@media (max-width: 400px)': {
                                fontSize: '2.8rem',
                            },
                            '@media (min-width: 700px)': {
                                fontSize: '5rem',
                            },
                            fontSize: '4rem',
                        }} mb='lg'>
                            NeoPromisance
                        </Title>
                        <Title color='white' size='h3' maw='24rem' mb='lg'>
                            A free browser game of empire building and conquest
                        </Title>
                        <Text color='white' maw='24rem'>
                            Build your empire, plan your expansion, find your niche, and conquer your enemies in this multiplayer game of diplomacy, strategy, and war.
                        </Text>
                    </div>
                </div>
                <Group mt='lg' spacing='lg'>
                    <Button size='lg' component='a' href='/register'>Register</Button>
                    <Button size='lg' color='teal' component='a' href='/login'>Login</Button>
                    {/* <Button color='blue'>Demo Account</Button> */}
                </Group>
            </Container>
        </div>
    );
}