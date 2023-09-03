import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import io from 'socket.io-client';

const ChartE = () => {
    const updatee = new Chart('myChart', {
        type: 'line',
        data: {
            labels: [],
            datasets: [
                {
                    label: 'Nhiệt độ',
                    lineTension: 0.3,
                    backgroundColor: 'red', // màu các điểm
                    borderColor: 'red', //màu đường kẻ
                    data: [],
                },
                {
                    label: 'Độ ẩm',
                    lineTension: 0.3,
                    backgroundColor: 'blue',
                    borderColor: 'blue',
                    data: [],
                },
                {
                    label: 'Ánh sáng',
                    lineTension: 0.3,
                    backgroundColor: 'yellow',
                    borderColor: 'yellow',
                    data: [],
                },
            ],
        },
        options: {
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Hệ thống IoT lắp đặt tại Học viện Công nghệ Bưu chính Viễn thông',
                    },
                },
            },
        },
    });

    return (
        <div className="border rounded-lg mr-11 ml-[15px]">
            <canvas
                class="border  rounded"
                id="myChart"
                style="max-height: 800px; width: 100%; background-color: white;"
            ></canvas>
        </div>
    );
};

export default ChartE;
