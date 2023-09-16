import { Table, Text, Button, Title } from '@mantine/core';
import { useEffect, useState } from 'react';
import Axios from 'axios';

function AdminSummary()
{
    const [stats, setStats] = useState({});

    useEffect(() =>
    {
        const loadStats = async () =>
        {
            const response = await Axios.get('/admin/countall');
            const data = response.data;
            // console.log(data);
            setStats(data);
        }

        loadStats()

    }, []);

    return (
        <div>
            <Title>Summary</Title>
            <Text>Users: {stats.users}</Text>
            <Text>Empires: {stats.empires}</Text>
            <Text>Mail Messages: {stats.mail}</Text>
            <Text>Market Items: {stats.markets}</Text>
            <Text>News Events: {stats.news}</Text>
        </div>
    );
}

export default AdminSummary;