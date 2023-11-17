import { Table, Text, Button, Title, Menu, Stack } from '@mantine/core';
import { useEffect, useState } from 'react';
import Axios from 'axios';
import { IconSettings, IconTrash } from '@tabler/icons'
import classes from './guide.module.css'

function AdminUsers()
{
    const [users, setUsers] = useState([]);
    const [response, setResponse] = useState(null);

    useEffect(() =>
    {
        const loadUsers = async () =>
        {
            const response = await Axios.get('/admin/users');
            const data = response.data;
            console.log(data);
            setUsers(data);
        }

        loadUsers()

    }, [response]);

    const deleteUser = async (uuid) =>
    {
        console.log('deleting user')
        const response = await Axios.delete('/admin/deleteuser/' + uuid);
        const data = response.data;
        console.log(data);
        setResponse(data);
    }


    const rows = users.map((user) =>
    (
        <tr key={user.uuid}>
            <Menu shadow="md" width={100} mt='xs'>
                <Menu.Target>
                    <Button size='xs' compact><IconSettings size={14} /></Button>
                </Menu.Target>
                <Menu.Dropdown>
                    <Menu.Item icon={<IconSettings size={14} />}>Edit</Menu.Item>
                    <Menu.Item color="red" icon={<IconTrash size={14} />} onClick={() => deleteUser(user.uuid)}>Delete</Menu.Item>
                </Menu.Dropdown>
            </Menu>
            <td>
                {user.role}
            </td>
            <td>
                {user.username}
            </td>
            <td>
                {user.email}
            </td>
            <td>
                {user.lastIp}
            </td>
            <td>
                {user.createdAt}
            </td>
            <td>
                {user.empires[0]?.name}
            </td>
            <td>
                {user.empires[0]?.id}
            </td>
        </tr>
    ))

    return (
        <Stack>
            <Title>Users</Title>
            <Text color='red'>{response?.message}</Text>
            {users.length > 0 &&
                <div className={classes.guideTable}>

                    <Table>
                        <thead>
                            <tr>
                                <th></th>
                                <th>Role</th>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Last IP</th>
                                <th>Created At</th>
                                <th>Empire Name</th>
                                <th>Empire ID</th>
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

export default AdminUsers;