import React, { useEffect} from 'react';
import { Line } from 'react-chartjs-2';
import io from 'socket.io-client';
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
                backgroundColor: 'rgba(255, 0, 0, 0.2)',
                fill: true,
                lineTension: 0.3,
            },
            {
                label: 'Độ ẩm',
                data: humi,
                borderColor: 'blue',
                backgroundColor: 'rgba(0, 0, 255, 0.2)',
                fill: true,
                lineTension: 0.3,
            },
            {
                label: 'Ánh sáng',
                data: light,
                borderColor: 'yellow',
                backgroundColor: 'rgba(255, 255, 0, 0.2)',
                fill: true,
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
        animation: {
            easing: 'easeInOutQuart', // Sử dụng hàm easing easeInOutQuart
        },
    };

    return (
        <div className="border rounded-lg mr-11 ml-[15px]">
            <Line data={chartData} options={chartOptions} />
        </div>
    );
}

export default DataChart;
