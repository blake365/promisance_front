import { createStyles, Container, Title, Text, Button, Group } from '@mantine/core';
import neoIcon from '../../icons/neoIcon.svg'

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

    svg: {
        filter: 'invert(1)',
        marginBottom: '1rem',
        '@media (max-width: 400px)': {
            height: '2.6rem',

        },
        '@media (min-width: 700px)': {
            height: '5rem',
        },
        height: '3.2rem',
    },

    title: {
        color: 'white',
        fill: 'white',
        '@media (max-width: 400px)': {
            fontSize: '2.5rem',
        },
        '@media (min-width: 700px)': {
            fontSize: '5rem',
        },
        fontSize: '3rem',
    }

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
                        <Group align='center' spacing={4}>
                            <img src={neoIcon} className={classes.svg} />
                            <Title className={classes.title} mb='lg'>
                                NeoPromisance
                            </Title>
                        </Group>
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