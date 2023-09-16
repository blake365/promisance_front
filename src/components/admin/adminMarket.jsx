import { Table, Text, Button, Title, Menu, Stack } from '@mantine/core';
import { useEffect, useState } from 'react';
import Axios from 'axios';
import { IconSettings, IconTrash } from '@tabler/icons'

const marketArray = [
    'trpArm', 'trpLnd', 'trpFly', 'trpSea', 'food', 'runes'
]

function AdminMarket()
{
    const [items, setItems] = useState([]);
    const [response, setResponse] = useState(null);

    useEffect(() =>
    {
        const loadItems = async () =>
        {
            const response = await Axios.get('/admin/markets');
            const data = response.data;
            console.log(data);
            setItems(data);
        }

        loadItems()

    }, [response]);

    const deleteItem = async (uuid) =>
    {
        console.log('deleting item')
        const response = await Axios.delete('/admin/deletemarket/' + uuid);
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
                {item.empire_id}
            </td>
            <td>
                {marketArray[item.type]}
            </td>
            <td>
                {item.amount.toLocaleString()}
            </td>
            <td>
                {item.price.toLocaleString()}
            </td>
            <td>
                {Math.round((new Date().getTime() - new Date(item.createdAt).getTime()) / 1000 / 60 / 60)} hours
            </td>
            <td>
                {item.conversationId}
            </td>
            <td>
                {item.secret.toString()}
            </td>
        </tr>
    ))

    return (
        <Stack>
            <Title>Mail</Title>
            <Text color='red'>{response?.message}</Text>
            {items.length > 0 &&
                <Table striped>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Created At</th>
                            <th>Empire ID</th>
                            <th>Type</th>
                            <th>Amount</th>
                            <th>Price</th>
                            <th>Time on Market</th>
                            <th>Secret</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </Table>
            }
        </Stack>
    );
}

export default AdminMarket;