import { Table, Text, Button, Title, Menu, Stack } from '@mantine/core';
import { useEffect, useState } from 'react';
import Axios from 'axios';
import { IconSettings, IconTrash } from '@tabler/icons-react'
import classes from './guide.module.css'
import { useParams } from 'react-router-dom';

function AdminClanMail()
{
    const [items, setItems] = useState([]);
    const [response, setResponse] = useState(null);

    const { gameId } = useParams()

    useEffect(() =>
    {
        const loadItems = async () =>
        {
            const response = await Axios.get('/admin/clanMail?gameId=' + gameId);
            const data = response.data;
            console.log(data);
            setItems(data);
        }

        loadItems()

    }, [response]);

    const deleteItem = async (uuid) =>
    {
        console.log('deleting item')
        const response = await Axios.delete('/admin/deleteClanMail/' + uuid);
        const data = response.data;
        console.log(data);
        setResponse(data);
    }

    // const toggleReport = async (uuid) =>
    // {
    //     console.log('toggling report')
    //     const response = await Axios.get('/messages/togglereport/' + uuid);
    //     const data = response.data;
    //     console.log(data);
    //     setResponse(data);
    // }

    const rows = items.map((item) =>
    (
        <tr key={item.uuid}>
            <td>
                <Menu shadow="md" width={100} mt='xs'>
                    <Menu.Target>
                        <Button size='xs' compact><IconSettings size={14} /></Button>
                    </Menu.Target>
                    <Menu.Dropdown>
                        <Menu.Item icon={<IconSettings size={14} />}>Edit</Menu.Item>
                        <Menu.Item color="red" icon={<IconTrash size={14} />} onClick={() => deleteItem(item.uuid)}>Delete</Menu.Item>
                        <Menu.Item icon={<IconSettings size={14} />} onClick={() => toggleReport(item.uuid)}>Report</Menu.Item>
                    </Menu.Dropdown>
                </Menu>
            </td>
            <td>
                {item.createdAt}
            </td>
            <td>
                {item.clanMessageFlags}
            </td>
            <td>
                {item.clanId}
            </td>
            <td>
                {item.empireName}
            </td>
            <td>
                {item.clanMessageBody}
            </td>
            <td>
                {item.seenBy.map((item, index) => (item + ' '))}
            </td>
        </tr>
    ))

    return (
        <Stack>
            <Title>Clan Mail</Title>
            <Text color='red'>{response?.message}</Text>
            {items.length > 0 &&
                <div className={classes.guideTable}>

                    <Table striped>
                        <thead>
                            <tr>
                                <th></th>
                                <th>Created At</th>
                                <th>Reported</th>
                                <th>Clan Id</th>
                                <th>Empire Name</th>
                                <th>Message Body</th>
                                <th>Seen By</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows}
                        </tbody>
                    </Table>
                </div>
            }
        </Stack>
    );
}

export default AdminClanMail;