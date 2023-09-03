import React, { useState, useEffect, createContext, useContext } from 'react';
import nhietDo from '../img/nhietdo.png';
import humidity from '../img/humidity.png';
import sun from '../img/sun.png';

import io from 'socket.io-client';

// Tạo một context để lưu trữ dữ liệu
const DataContext = createContext();

// Provider component để cung cấp dữ liệu
const DataProvider = ({ children }) => {
    const [temperature, setTemperature] = useState(null);
    const [humi, setHumi] = useState(null);
    const [light, setLight] = useState(null);
    const [bgTemp, setBgTemp] = useState('');
    const [bgHumi, setBgHumi] = useState('');
    const [bgLight, setBgLight] = useState('');

    useEffect(() => {
        const socket = io('http://localhost:8688');
        socket.on('temp', (data) => {
            setTemperature(data);
            if (data <= 25) {
                setBgTemp('blue');
            } else if (data <= 35) {
                setBgTemp('orange');
            } else {
                setBgTemp('#E33539');
            }
        });
        socket.on('humi', (data) => {
            setHumi(data);
            if (data <= 10) {
                setBgHumi('lightcyan');
            } else if (data <= 65) {
                setBgHumi('lightblue');
            } else {
                setBgHumi('mediumturquoise');
            }
        });
        socket.on('light', (data) => {
            setLight(data);
            if (data <= 25) {
                setBgLight('#A0A0A0');
            } else if (data <= 100) {
                setBgLight('lightgoldenrodyellow');
            } else {
                setBgLight('yellow');
            }
        });

        return () => {
            // Cleanup: Đóng kết nối socket khi component unmount
            socket.disconnect();
        };
    }, []);

    return (
        <DataContext.Provider
            value={{ temperature, humi, light, bgTemp, bgHumi, bgLight }}
        >
            {children}
        </DataContext.Provider>
    );
};

// Custom hook để truy cập dữ liệu từ context
const useData = () => {
    const context = useContext(DataContext);
    if (context === undefined) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
};

const Cards = () => {
    const { temperature, humi, light, bgTemp, bgHumi, bgLight } = useData();

    return (
        <div className="flex justify-around">
            <div
                style={{ backgroundColor: bgTemp }}
                className="flex w-[30%] h-[150px] justify-around items-center rounded-xl  bg-clip-border text-gray-700 shadow-md border"
            >
                <img
                    src={nhietDo}
                    className={`object-contain h-[90px] mr-[-50px]`}
                />
                <div className="ml-[-50px]">
                    <p className="mb-4 text-base text-white">Nhiệt độ</p>
                    <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 ">
                        {temperature} &deg; C
                    </h5>
                </div>
            </div>

            <div
                style={{ backgroundColor: bgHumi }}
                className="flex w-[30%] justify-around items-center rounded-xl bg-clip-border text-gray-700 shadow-md border"
            >
                <img
                    src={humidity}
                    className="object-contain h-[90px] mr-[-50px]"
                />
                <div className="ml-[-50px]">
                    <p className="mb-4 text-base text-neutral-600">Độ ẩm</p>
                    <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800">
                        {humi} %
                    </h5>
                </div>
            </div>

            <div
                style={{ backgroundColor: bgLight }}
                className="flex w-[30%] justify-around items-center rounded-xl  bg-clip-border text-gray-700 shadow-md border"
            >
                <img src={sun} className="object-contain h-[90px] mr-[-50px]" />
                <div className="ml-[-50px]">
                    <p className="mb-4 text-base text-neutral-600">Ánh sáng</p>
                    <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800">
                        {light} lux
                    </h5>
                </div>
            </div>
        </div>
    );
};

export { DataProvider, Cards };
