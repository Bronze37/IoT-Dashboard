import React, { useEffect, useState, useRef } from 'react';
import { Chart } from 'chart.js';
import io from 'socket.io-client';

const socket = io('http://localhost:8688');

const ChartE = () => {
    const [temperature, setTemperature] = useState(null);
    const [humi, setHumi] = useState(null);
    const [light, setLight] = useState(null);

    useEffect(() => {
        socket.on('temp', (data) => {
            setTemperature(data);
        });
        socket.on('humi', (data) => {
            setHumi(data);
        });
        socket.on('light', (data) => {
            setLight(data);
        });
    }, []);

    return (
        <div className="border rounded-lg mr-11 ml-[15px]">
            <div>
                <canvas
                    className="border rounded-lg h-[100%] w-[100%]"
                    id="myChart"
                ></canvas>
            </div>
        </div>
    );
};

export default ChartE;
