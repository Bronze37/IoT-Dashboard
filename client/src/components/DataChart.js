import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

function DataChart() {
    const [temp, setTemp] = useState([28.5, 29.0, 28.8, 29.2]);
    const [humi, setHumi] = useState([65, 67, 66, 68]);
    const [light, setLight] = useState([800, 820, 810, 830]);
    const [label, setLabel] = useState(['12:00', '12:01', '12:02', '12:03']);
    const maxDataPoints = 10; // Maximum number of data points to display

    useEffect(() => {
        const interval = setInterval(() => {
            const currentTime = new Date().toLocaleTimeString();

            // Update the data arrays
            setTemp((prevTemp) => {
                const newTemp = [...prevTemp, Math.random() * 50 + 25]; // Temperature between 25°C and 75°C
                return newTemp.length > maxDataPoints ? newTemp.slice(1) : newTemp;
            });

            setHumi((prevHumi) => {
                const newHumi = [...prevHumi, Math.random() * 40 + 60]; // Humidity between 60% and 100%
                return newHumi.length > maxDataPoints ? newHumi.slice(1) : newHumi;
            });

            setLight((prevLight) => {
                const newLight = [...prevLight, Math.random() * 700 + 300]; // Light between 300 and 1000 lux
                return newLight.length > maxDataPoints ? newLight.slice(1) : newLight;
            });

            setLabel((prevLabel) => {
                const newLabel = [...prevLabel, currentTime];
                return newLabel.length > maxDataPoints ? newLabel.slice(1) : newLabel;
            });
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const chartData = {
        labels: label,
        datasets: [
            {
                label: 'Nhiệt độ',
                data: temp,
                borderColor: 'red',
                backgroundColor: 'rgba(255, 0, 0, 0.2)',
                yAxisID: 'y1',
                lineTension: 0.3,
                pointRadius: 5,
                pointHoverRadius: 7,
            },
            {
                label: 'Độ ẩm',
                data: humi,
                borderColor: 'blue',
                backgroundColor: 'rgba(0, 0, 255, 0.2)',
                yAxisID: 'y1',
                lineTension: 0.3,
                pointRadius: 5,
                pointHoverRadius: 7,
            },
            {
                label: 'Ánh sáng',
                data: light,
                borderColor: 'yellow',
                backgroundColor: 'rgba(255, 255, 0, 0.2)',
                yAxisID: 'y2',
                lineTension: 0.3,
                pointRadius: 5,
                pointHoverRadius: 7,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
            duration: 1000, // Duration of animations in milliseconds
            easing: 'easeInOutQuad', // Easing function to use for animations
        },
        plugins: {
            legend: {
                display: true,
                position: 'top',
                labels: {
                    font: {
                        size: 14,
                    },
                },
            },
            tooltip: {
                enabled: true,
                mode: 'index',
                intersect: false,
                backgroundColor: 'rgba(0,0,0,0.7)',
                titleFont: {
                    size: 16,
                },
                bodyFont: {
                    size: 14,
                },
                footerFont: {
                    size: 12,
                },
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Thời gian',
                    font: {
                        size: 16,
                    },
                },
                ticks: {
                    font: {
                        size: 14,
                    },
                },
            },
            y1: {
                type: 'linear',
                position: 'left',
                title: {
                    display: true,
                    text: 'Nhiệt độ và Độ ẩm',
                    font: {
                        size: 16,
                    },
                },
                ticks: {
                    font: {
                        size: 14,
                    },
                },
                min: 0,
                max: 100,
            },
            y2: {
                type: 'linear',
                position: 'right',
                title: {
                    display: true,
                    text: 'Ánh sáng',
                    font: {
                        size: 16,
                    },
                },
                ticks: {
                    font: {
                        size: 14,
                    },
                },
                min: 300,
                max: 1000,
                grid: {
                    drawOnChartArea: false, // Only show grid lines for the y-axis
                },
            },
        },
    };

    return (
        <div className="border rounded-lg mr-11 ml-[20px] h-[500px]">
            <Line data={chartData} options={chartOptions} />
        </div>
    );
}

export default DataChart;