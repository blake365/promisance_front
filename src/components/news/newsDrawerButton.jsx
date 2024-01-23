import { useDisclosure } from "@mantine/hooks"
import { Button, Drawer, Indicator } from "@mantine/core"
import EmpireNews from "./empireNews"
import { NewspaperClipping } from "@phosphor-icons/react"
import Axios from "axios"
import { useState, useEffect } from "react"

const NewsDrawerButton = ({ kickOut, empire, pageState }) =>
{
    const [drawer, { open, close }] = useDisclosure(false)
    const [news, setNews] = useState(0)

    const checkForNews = async () =>
    {
        try {
            const res = await Axios.get(`/news/${empire.id}/count`)
            // console.log(res.data.count)
            setNews(res.data.count)
        } catch (error) {
            kickOut(error)
        }
    }

    useEffect(() =>
    {
        checkForNews()
    }, [empire, pageState])

    return (
        <div>
            <Indicator color="green" disabled={news < 1} label={news} size={20} overflowCount={50} zIndex={3}>
                <Button onClick={open} size='sm' compact color=''><NewspaperClipping size='1.2rem' /></Button>
            </Indicator>
            <Drawer opened={drawer} onClose={close} position='right' size='lg' title='' >
                <EmpireNews />
            </Drawer>
        </div>
    )
}

export default NewsDrawerButton