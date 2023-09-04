import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import io from 'socket.io-client';
import useLimitedArray from '../config/useLimitedArray';
import Chart from 'chart.js/auto';

function DataChart({
    temp,
    setTemp,
    humi,
    setHumi,
    light,
    setLight,
    label,
    setLabel,
}) {
    // const [temp, setTemp] = useLimitedArray(10);
    // const [humi, setHumi] = useLimitedArray(10);
    // const [light, setLight] = useLimitedArray(10);
    // const [label, setLabel] = useLimitedArray(10);

    useEffect(() => {
        const socket = io('http://localhost:8688');

        socket.on('temp', (data_received) => {
            const nhietdo = data_received;
            setTemp(nhietdo);

            const currentTime = new Date().toLocaleTimeString();
            setLabel(currentTime);
        });

        socket.on('humi', (data_received) => {
            const doam = data_received;
            setHumi(doam);
        });

        socket.on('light', (data_received) => {
            const anhsang = data_received;
            setLight(anhsang);
        });

        // Clean up the socket when the component unmounts
        return () => {
            socket.disconnect();
        };
    }, []);

    // const reversedLabel = [...label].reverse();

    const chartData = {
        labels: label,
        datasets: [
            {
                label: 'Nhiệt độ',
                data: temp,
                borderColor: 'red',
                backgroundColor: 'red',
                fill: false,
                lineTension: 0.3,
            },
            {
                label: 'Độ ẩm',
                data: humi,
                borderColor: 'blue',
                backgroundColor: 'blue',
                fill: false,
                lineTension: 0.3,
            },
            {
                label: 'Ánh sáng',
                data: light,
                borderColor: 'yellow',
                backgroundColor: 'yellow',
                fill: false,
                lineTension: 0.3,
            },
        ],
    };

    // Cấu hình biểu đồ
    const chartOptions = {
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Hệ thống IoT',
                },
            },
        },
    };

    return (
        <div className="border rounded-lg mr-11 ml-[15px]">
            <Line data={chartData} options={chartOptions} />
        </div>
    );
}

export default DataChart;
