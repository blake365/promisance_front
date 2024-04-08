import { Alert } from "@mantine/core"

const advisorMessages = [
    {
        message: 'Your land is quite low. Increase your land by exploring. ',
        severity: 'red',
        priority: 1
    },
    {
        message: 'Fill your land with buildings to make your lands productive. ',
        severity: 'red',
        priority: 2
    },
    {
        message: 'Protect your empire from magical attacks with a spell shield',
        severity: 'red',
        priority: 3
    },
    {
        message: 'You have a lot of cash, spend some on troops to increase your net worth.',
        severity: 'blue',
        priority: 4
    },
    {
        message: 'You have a lot of food, consider selling some on the public market.',
        severity: 'green',
        priority: 5
    },
    {
        message: 'Your race is better suited for another era, you should go to the magic center and advance to the next era.',
        severity: 'green',
        priority: 6
    },
]

export default function Assistant({ empire, effects })
{

    const pickMessage = (empire, effects) =>
    {
        if (empire.land < 10000) {
            return advisorMessages[0]
        }
        if (empire.freeland / empire.land < 0.5) {
            return advisorMessages[1]
        }

    }

    const message = pickMessage(empire, effects)

    return (
        <Alert title='Advisor Message' color={message.severity}>{message.message}</Alert>
    )
}
