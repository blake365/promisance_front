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
import { Button, Title, Text, Input, Group, Tooltip as Tooltips } from '@mantine/core';
import { eraArray } from '../../config/eras';
import { useForm } from '@mantine/form';
import { Download } from '@phosphor-icons/react';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
    TimeScale,
);

const options = {
    // type: 'line',
    // responsive: true,
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

const FileDownloadButton = ({ id }) =>
{
    const handleDownload = async () =>
    {
        try {
            const response = await Axios.get(`/snapshots/${id}/download`);
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `empire-${id}-snapshots.csv`); // or any other extension
            document.body.appendChild(link);
            link.click();
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <Tooltips label='Download CSV' withArrow>
            <Button mt='lg' onClick={handleDownload}><Download size={20} /></Button>
        </Tooltips>
    );
};


function AdvancedStats()
{
    const [rawData, setRawData] = useState([])
    const [stat1, setStat1] = useState('cash')
    const [stat2, setStat2] = useState('networth')
    const [take, setTake] = useState(600)
    const [skip, setSkip] = useState(0)
    const [page, setPage] = useState(0)
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
    const { turnsProtection } = useSelector((state) => state.games.activeGame)

    const era = empire.era

    useEffect(() =>
    {
        // fetch data
        const getSnapshots = async () =>
        {
            try {
                const res = await Axios.post(`/snapshots/${empire.id}/paginate`, { take: take, page: page });
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

    }, [page, take])

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
    const form = useForm({
        initialValues: {
            take: take,
            skip: skip,
        },

        validationRules: {
            turns: (value) => value <= props.empire.turns && value > 0,
        },

        errorMessages: {
            turns: 'Invalid number of turns',
        },
    })

    return (
        <>
            <Title align='center'>Stat Charts</Title>
            {empire.mode === 'demo' ? (<Text align='center' color='red' mb='sm'>Stats not collected for demo accounts. </Text >) : (<Text align='center' mb='sm'>Stats are collected for empires who have used greater than {turnsProtection} turns.</Text >)}
            <Text align='center'>Showing {take ? take : 'all'} data points</Text>
            <Group position='center' spacing='xs'>
                <Button variant='default' compact onClick={() =>
                {
                    setPage(prevPage => prevPage + 1)
                }} disabled={page * take >= rawData.length + take || !take}>
                    &lt;
                </Button>
                <Input
                    size='xs'
                    w={60}
                    min={10}
                    max={5000}
                    placeholder={take ? take : 'all'}
                    default={take}
                    value={take}
                    onChange={(e) => setTake(e.target.value)}
                />
                <Button variant='default' compact onClick={() =>
                {
                    setPage(prevPage => Math.max(0, prevPage - 1))
                }} disabled={page === 0}>
                    &gt;
                </Button>
            </Group>
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
            <FileDownloadButton id={empire.id} />
        </>
    );
}

export default AdvancedStats;
