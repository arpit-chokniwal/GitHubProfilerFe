import React from "react";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend
);

const options = {
    responsive: false,
    scales: {
        x: {
            display: false,
        }
    },
    plugins: {
        legend: {
            position: "top",
        },
        title: {
            display: true,
            text: "Commits per Quarter",
        },
    },
};

const MyLineChart = ({ labels, values }) => {

    const chartData = {
        labels,
        datasets: [
            {
                label: "Commits",
                data: values,
                borderColor: "rgb(54, 162, 235)",
                backgroundColor: "rgba(54, 162, 235, 0.5)",
            },
        ],
    };

    return (
        <Line options={options} data={chartData} width={600} height={180} />
    );
};

export default MyLineChart;
