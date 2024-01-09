import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { getColors } from '../../utils/helperFunction';

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ data }) => {
    const allLabels = Object.keys(data);
    const allValues = Object.values(data);
    const legendLabels = allLabels.slice(0, 5);

    const chartColors = getColors(allValues.length);

    const chartData = {
        labels: allLabels,
        datasets: [
            {
                label: 'Contribution',
                data: allValues,
                backgroundColor: chartColors,
                borderWidth: 1,
            },
        ],
    };

    const legendOptions = allLabels.length > 5 ? {
        display: true,
        position: 'left',
        labels: {
            filter: function (legendItem, chartData) {
                return legendLabels.indexOf(legendItem.text) !== -1;
            }
        }
    } : {
        display: true,
        position: 'left'
    };

    const options = {
        responsive: true,
        interaction: {
            intersect: false,
            mode: 'nearest'
        },
        hover: {
            mode: null // Disable hover effect
        },
        plugins: {
            legend: legendOptions
        },
    };

    return <Doughnut data={chartData} options={options} />;
};

export default DoughnutChart;
