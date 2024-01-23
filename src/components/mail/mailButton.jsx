import { useState, useEffect } from 'react'
import { Indicator, Button } from '@mantine/core'
import { Envelope } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'
import Axios from 'axios'

const MailButton = ({ empire, kickOut, pageState }) =>
{
    const [mail, setMail] = useState(0)

    const checkForMail = async () =>
    {
        try {
            const res = await Axios.get(`messages/${empire.id}/count`)
            // console.log(res.data.count)
            setMail(res.data.count)
        } catch (error) {
            kickOut(error)
        }
    }

    useEffect(() =>
    {
        checkForMail()
    }, [empire, pageState])

    return (
        <Indicator color="green" disabled={mail < 1} label={mail} size={20} overflowCount={50} zIndex={3}>
            <Link to='/app/Mailbox'>
                <Button size='sm' compact color=''>
                    <Envelope size='1.2rem' />
                </Button>
            </Link>
        </Indicator>
    )
}

export default MailButton