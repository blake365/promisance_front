import { Table, Text, Button, Title, Menu, Stack } from '@mantine/core';
import { useEffect, useState } from 'react';
import Axios from 'axios';
import { IconSettings, IconTrash } from '@tabler/icons'

function AdminEmpires()
{
    const [empires, setEmpires] = useState([]);
    const [response, setResponse] = useState(null);

    useEffect(() =>
    {
        const loadEmpires = async () =>
        {
            const response = await Axios.get('/admin/empires');
            const data = response.data;
            console.log(data);
            setEmpires(data);
        }

        loadEmpires()

    }, [response]);

    const deleteEmpire = async (uuid) =>
    {
        console.log('deleting empire')
        const response = await Axios.delete('/admin/deleteempire/' + uuid);
        const data = response.data;
        console.log(data);
        setResponse(data);
    }


    const rows = empires.map((item) =>
    (
        <tr key={item.uuid}>
            <Menu shadow="md" width={100} mt='xs'>
                <Menu.Target>
                    <Button size='xs' compact><IconSettings size={14} /></Button>
                </Menu.Target>
                <Menu.Dropdown>
                    <Menu.Item icon={<IconSettings size={14} />}>Edit</Menu.Item>
                    <Menu.Item color="red" icon={<IconTrash size={14} />} onClick={() => deleteEmpire(item.uuid)}>Delete</Menu.Item>
                </Menu.Dropdown>
            </Menu>
            <td>
                {item.mode}
            </td>
            <td>
                {item.createdAt}
            </td>
            <td>
                {item.id}
            </td>
            <td>
                {item.name}
            </td>
            <td>
                {item.turns}
            </td>
            <td>
                {item.turnsUsed}
            </td>
            <td>
                {item.profile}
            </td>
            <td>
                {item.rank}
            </td>
            <td>
                {item.networth}
            </td>
            <td>
                {item.land}
            </td>
            <td>
                {item.cash}
            </td>
            <td>
                {item.food}
            </td>
        </tr>
    ))

    return (
        <Stack>
            <Title>Users</Title>
            <Text color='red'>{response?.message}</Text>
            {empires.length > 0 &&
                <Table striped>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Mode</th>
                            <th>Created</th>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Turns</th>
                            <th>Turns Used</th>
                            <th>Profile</th>
                            <th>Rank</th>
                            <th>Networth</th>
                            <th>Land</th>
                            <th>Cash</th>
                            <th>Food</th>
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

export default AdminEmpires;