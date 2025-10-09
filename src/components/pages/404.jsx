import { createStyles, Container, Title, Text, Button, Group, } from '@mantine/core';
import { Illustration } from './Illustration';
import { useTranslation } from 'react-i18next';

const useStyles = createStyles((theme) => ({
    root: {
        paddingTop: 80,
        paddingBottom: 80,
    },

    inner: {
        position: 'relative',
    },

    image: {
        ...theme.fn.cover(),
        opacity: 0.75,
    },

    content: {
        paddingTop: 220,
        position: 'relative',
        zIndex: 1,

        [theme.fn.smallerThan('sm')]: {
            paddingTop: 120,
        },
    },

    title: {
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        textAlign: 'center',
        fontWeight: 900,
        fontSize: 38,

        [theme.fn.smallerThan('sm')]: {
            fontSize: 32,
        },
    },

    description: {
        maxWidth: 540,
        margin: 'auto',
        marginTop: theme.spacing.xl,
        marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
    },
}));

export function NothingFoundBackground()
{
    const { classes } = useStyles();
    const { t } = useTranslation(['pages']);

    return (
        <Container className={classes.root}>
            <div className={classes.inner}>
                <Illustration className={classes.image} />
                <div className={classes.content}>
                    <Title className={classes.title}>{t('pages:error.title')}</Title>
                    <Text color="dimmed" size="lg" align="center" className={classes.description}>
                        {t('pages:error.description')}
                    </Text>
                    <Group position="center">
                        <Button size="md" component='a' href='/'>{t('pages:error.homeButton')}</Button>
                    </Group>
                </div>
            </div>
        </Container>
    );
}