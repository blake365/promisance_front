import { useState, useEffect } from 'react';
import
{
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
    TimeScale,
} from 'chart.js';
import Axios from 'axios';
import { useSelector } from 'react-redux';
import { Line } from 'react-chartjs-2';
import { Button, Container, Title, Text } from '@mantine/core';
import { eraArray } from '../../config/eras';
import { TURNS_PROTECTION } from '../../config/config';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
    TimeScale
);

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
    },
};

function statName(name, era)
{
    if (name === 'cash') {
        return 'Cash'
    } else if (name === 'food') {
        return `${eraArray[era].food}`
    } else if (name === 'income') {
        return 'Income'
    } else if (name === 'expenses') {
        return 'Expenses'
    } else if (name === 'indyProd') {
        return 'Industrial Production'
    } else if (name === 'magicProd') {
        return 'Magical Production'
    } else if (name === 'foodcon') {
        return 'Food Consumption'
    } else if (name === 'foodpro') {
        return 'Food Production'
    } else if (name === 'exploreGains') {
        return 'Exploration'
    } else if (name === 'land') {
        return 'Total Land'
    } else if (name === 'networth') {
        return 'Net Worth'
    } else if (name === 'peasants') {
        return 'Population'
    } else if (name === 'trpArm') {
        return `${eraArray[era].trparm}`
    } else if (name === 'trpLnd') {
        return `${eraArray[era].trplnd}`
    } else if (name === 'trpFly') {
        return `${eraArray[era].trpfly}`
    } else if (name === 'trpSea') {
        return `${eraArray[era].trpsea}`
    } else if (name === 'trpWiz') {
        return `${eraArray[era].trpwiz}`
    } else if (name === 'attackGains') {
        return 'Attack Gains'
    } else if (name === 'attackLosses') {
        return 'Attack Losses'
    } else {
        return name
    }
}


function AdvancedStats()
{
    const [rawData, setRawData] = useState([])
    const [stat, setStat] = useState('cash')
    const [data, setData] = useState({
        labels: [],
        datasets: [
            {
                label: '...',
                data: [],
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    })
    const { empire } = useSelector((state) => state.empire)
    const era = empire.era

    useEffect(() =>
    {
        // fetch data
        const getSnapshots = async () =>
        {
            try {
                const res = await Axios.get(`/snapshots/${empire.id}`);
                const data = res.data;
                return data;
            } catch (error) {
                // Handle error if the API request fails
                console.error('Error fetching snapshots:', error);
                return [];
            }
        };

        getSnapshots()
            .then((data) =>
            {
                // console.log(data)
                setRawData(data);
            })
            .catch((error) =>
            {
                console.error('Error setting Snapshots data:', error);
            });

    }, [])

    const statSelector = ['cash', 'food', 'land', 'networth', 'peasants', 'trpArm', 'trpLnd', 'trpFly', 'trpSea', 'trpWiz', 'income', 'expenses', 'foodpro', 'foodcon', 'indyProd', 'magicProd', 'attackGains', 'attackLosses', 'exploreGains']

    function reduceArrayByKey(array, key)
    {
        return array.map(item =>
        {
            return {
                item: item[key]
            };
        });
    }

    function getLabels(array)
    {
        return array.map((item) => new Date(item.createdAt).toLocaleString());
    }

    let food = []
    let labels = []

    useEffect(() =>
    {
        if (rawData.length > 0) {
            // console.log(rawData)
            labels = getLabels(rawData)
            let dataSet = reduceArrayByKey(rawData, stat)
            // console.log(data)

            let newdata = {
                labels: labels,
                datasets: [
                    {
                        label: statName(stat, era),
                        data: dataSet.map((item) => item.item),
                        borderColor: 'rgb(255, 99, 132)',
                        backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    },
                ],
            };
            setData(newdata)
        }
    }, [rawData, stat])

    // console.log(data)

    return (
        <Container>
            <Title align='center'>Stat Charts</Title>
            <Text align='center' mb='sm'>Stats are collected every 4 hours for empires who have used greater than {TURNS_PROTECTION} turns. </Text>
            <Line
                options={options}
                data={data}
            />
            {statSelector.map((stat) =>
            {
                return (
                    <Button
                        compact
                        m={2}
                        size='sm'
                        variant='default'
                        key={stat}
                        onClick={() =>
                        {
                            // console.log(stat)
                            setStat(stat)
                        }}
                    >
                        {statName(stat, era)}
                    </Button>
                )
            })}
        </Container>
    );
}

export default AdvancedStats;
