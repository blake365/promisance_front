import { Table, Text, Button, Title, Menu, Stack } from '@mantine/core';
import { useEffect, useState } from 'react';
import Axios from 'axios';
import { IconSettings, IconTrash } from '@tabler/icons'
import classes from './guide.module.css'

function AdminNews()
{
    const [items, setItems] = useState([]);
    const [response, setResponse] = useState(null);

    useEffect(() =>
    {
        const loadItems = async () =>
        {
            const response = await Axios.get('/admin/news');
            const data = response.data;
            console.log(data);
            setItems(data);
        }

        loadItems()

    }, [response]);

    const deleteItem = async (uuid) =>
    {
        console.log('deleting item')
        const response = await Axios.delete('/admin/deletenews/' + uuid);
        const data = response.data;
        console.log(data);
        setResponse(data);
    }


    const rows = items.map((item) =>
    (
        <tr key={item.uuid}>
            <Menu shadow="md" width={100} mt='xs'>
                <Menu.Target>
                    <Button size='xs' compact><IconSettings size={14} /></Button>
                </Menu.Target>
                <Menu.Dropdown>
                    <Menu.Item icon={<IconSettings size={14} />}>Edit</Menu.Item>
                    <Menu.Item color="red" icon={<IconTrash size={14} />} onClick={() => deleteItem(item.uuid)}>Delete</Menu.Item>
                </Menu.Dropdown>
            </Menu>
            <td>
                {item.createdAt}
            </td>
            <td>
                {item.type}
            </td>
            <td>
                {item.result}
            </td>
            <td>
                {item.sourceName}
            </td>
            <td>
                {item.empireIdSource}
            </td>
            <td>
                {item.destinationName}
            </td>
            <td>
                {item.empireIdDestination}
            </td>
            <td>
                {item.personalContent}
            </td>
            <td>
                {item.publicContent}
            </td>
        </tr>
    ))

    return (
        <Stack>
            <Title>News</Title>
            <Text color='red'>{response?.message}</Text>
            {items.length > 0 &&
                <div className={classes.guideTable}>

                    <Table striped>
                        <thead>
                            <tr>
                                <th></th>
                                <th>Created At</th>
                                <th>Type</th>
                                <th>Result</th>
                                <th>Source Name</th>
                                <th>Source ID</th>
                                <th>Destination Name</th>
                                <th>Destination ID</th>
                                <th>Personal Content</th>
                                <th>Public Content</th>
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

export default AdminNews;