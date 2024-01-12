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
import { Button, Title, Text } from '@mantine/core';
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
    type: 'line',
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
    },
    interaction: {
        mode: 'index',
        intersect: false,
    },
    stacked: false,
    scales: {
        y: {
            type: 'linear',
            display: true,
            position: 'left',
        },
        y1: {
            type: 'linear',
            display: true,
            position: 'right',

            // grid line settings
            grid: {
                drawOnChartArea: false, // only want the grid lines for one axis to show up
            },
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
    const [stat1, setStat1] = useState('cash')
    const [stat2, setStat2] = useState('networth')
    const [data, setData] = useState({
        labels: [],
        datasets: [
            {
                labels: [],
                data: [],
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                yAxisId: 'y',
            },
            {
                labels: [],
                data: [],
                borderColor: 'rgb(99, 255, 132)',
                backgroundColor: 'rgba(99, 255, 132, 0.5)',
                yAxisId: 'y1',
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

    let labels = []

    useEffect(() =>
    {
        if (rawData.length > 0) {
            // console.log(rawData)
            labels = getLabels(rawData)
            let dataSet = reduceArrayByKey(rawData, stat1)
            let dataSet2 = reduceArrayByKey(rawData, stat2)
            // console.log(data)

            let newdata = {
                labels: labels,
                datasets: [
                    {
                        label: statName(stat1, era),
                        data: dataSet.map((item) => item.item),
                        borderColor: 'rgb(255, 99, 132)',
                        backgroundColor: 'rgba(255, 99, 132, 0.5)',
                        yAxisID: 'y',
                    },
                    {
                        label: statName(stat2, era),
                        data: dataSet2.map((item) => item.item),
                        borderColor: 'rgb(99, 255, 132)',
                        backgroundColor: 'rgba(99, 255, 132, 0.5)',
                        yAxisID: 'y1',
                    },
                ],
            };
            setData(newdata)
        }
    }, [rawData, stat1, stat2])

    // console.log(data)

    return (
        <>
            <Title align='center'>Stat Charts</Title>
            {empire.mode === 'demo' ? (<Text align='center' color='red' mb='sm'>Stats not collected for demo accounts. </Text >) : (<Text align='center' mb='sm'>Stats are collected for empires who have used greater than {TURNS_PROTECTION} turns. </Text >)}
            <Line
                options={options}
                data={data}
            />
            <div style={{ maxWidth: '100%', overflowX: 'scroll', display: 'flex', flexDirection: 'row' }}>
                {statSelector.map((stat) =>
                {
                    return (
                        <Button
                            compact
                            m={2}
                            size='sm'
                            // variant='default'
                            color={stat === stat1 ? 'red' : 'gray'}
                            key={stat}
                            onClick={() =>
                            {
                                // console.log(stat)
                                setStat1(stat)
                            }}
                        >
                            {statName(stat, era)}
                        </Button>
                    )
                })}
            </div>
            <hr />
            <div style={{ maxWidth: '100%', overflowX: 'scroll', display: 'flex', flexDirection: 'row' }}>
                {statSelector.map((stat) =>
                {
                    return (
                        <Button
                            compact
                            m={2}
                            size='sm'
                            // variant='default'
                            color={stat === stat2 ? 'green' : 'gray'}
                            key={stat}
                            onClick={() =>
                            {
                                // console.log(stat)
                                setStat2(stat)
                            }}
                        >
                            {statName(stat, era)}
                        </Button>
                    )
                })}
            </div>
        </>
    );
}

export default AdvancedStats;
