import { useState, useEffect } from 'react'
import { Indicator, Button } from '@mantine/core'
import { UsersFour } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'
import Axios from 'axios'

const ClanMailButton = ({ empire, kickOut }) =>
{
    const [clanMail, setClanMail] = useState(0)

    const checkForClanMail = async () =>
    {
        // console.log('checking for clan mail')
        try {
            const res = await Axios.post(`messages/clan/unread`, { empireId: empire.id, clanId: empire.clanId })
            // console.log(res.data)
            setClanMail(res.data)
        } catch (error) {
            kickOut(error)
        }
    }

    useEffect(() =>
    {
        checkForClanMail()
    })

    return (
        <Indicator color="green" disabled={clanMail < 1} label={clanMail} size={20} overflowCount={50} zIndex={3}>
            <Link to='/app/Clans'>
                <Button size='sm' compact color=''>
                    <UsersFour size='1.2rem' />
                </Button>
            </Link>
        </Indicator>
    )
}

export default ClanMailButton