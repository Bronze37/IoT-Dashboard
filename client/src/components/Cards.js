import React, { useEffect, useState } from 'react';
import nhietDo from '../img/nhietdo.png';
import humidity from '../img/humidity.png';
import sun from '../img/sun.png';
import dobui from '../img/dobui.png';

import io from 'socket.io-client';

const Cards = ({
    tempCard,
    setTempCard,
    humiCard,
    setHumiCard,
    lightCard,
    setLightCard,
    bgHumi,
    setBgHumi,
    bgTemp,
    setBgTemp,
    bgLight,
    setBgLight,
    dbCard, 
    setDbCard,
    bgDb,
    setBgDb,
    isCheckedFan,
    setIsCheckedFan,
}) => {
    const [relay2, setRelay2] = useState(null);

    const socket = io('http://localhost:8688');

    const handleTurnOnFan = () => {
        if (relay2 !== 1) {
            socket.emit('control_relay_2', 1);
        }
    };

    const handleTurnOffFan = () => {
        if (relay2 !== 1) {
            socket.emit('control_relay_2', 0);
        }
    };

    useEffect(() => {
        const socket = io('http://localhost:8688');
        socket.on('temp', (data) => {
            setTempCard(data);
            if (data <= 25) {
                setBgTemp('blue');
            } else if (data <= 35) {
                setBgTemp('orange');
            } else {
                setBgTemp('#E33539');
            }
        });
        socket.on('humi', (data) => {
            setHumiCard(data);
            if (data <= 10) {
                setBgHumi('lightcyan');
            } else if (data <= 65) {
                setBgHumi('lightblue');
            } else {
                setBgHumi('mediumturquoise');
            }
        });
        socket.on('db', (data) => {
            setDbCard(data);
            if (data <= 20) {
                setBgDb('#FFFFFF');
            } else if (data <= 60) {
                setBgDb('#DDDDDD');
            } else {
                setBgDb('#AAAAAA');
            }
            if (data > 80) {
                handleTurnOnFan();
                setBgDb('#FF0000');
            }
            if (data < 50) {
                handleTurnOffFan();
            }
        });
        socket.on('light', (data) => {
            setLightCard(data);
            if (data <= 50) {
                setBgLight('#A0A0A0'); // Màu xám nhạt
            } else if (data <= 100) {
                setBgLight('#FFFFE0'); // Màu vàng nhạt (light yellow)
            } else if (data <= 150) {
                setBgLight('#FFFF99'); // Màu vàng nhạt hơn (light goldenrod yellow)
            } else if (data <= 200) {
                setBgLight('#FFFF66'); // Màu vàng (yellow)
            } else if (data <= 250) {
                setBgLight('#FFFF33'); // Màu vàng đậm hơn (gold)
            } else if (data <= 300) {
                setBgLight('#FFFF00'); // Màu vàng đậm (golden yellow)
            } else if (data <= 350) {
                setBgLight('#FFCC00'); // Màu vàng cam (orange yellow)
            } else if (data <= 400) {
                setBgLight('#FF9900'); // Màu cam (orange)
            } else if (data <= 450) {
                setBgLight('#FF6600'); // Màu cam đậm (dark orange)
            } else {
                setBgLight('#FF3300'); // Màu cam đỏ (orange red)
            }
        });
        

        return () => {
            // Cleanup: Đóng kết nối socket khi component unmount
            socket.disconnect();
        };
    }, []);

    return (
        <div className="flex justify-around">
            <div
                style={{ backgroundColor: bgTemp }}
                className="flex w-[25%] h-[150px] justify-around items-center rounded-xl  bg-clip-border text-gray-700 shadow-md border"
            >
                <img
                    src={nhietDo}
                    className={`object-contain h-[75px] mr-[-50px]`}
                />
                <div className="ml-[-50px]">
                    <p className="mb-4 text-base text-neutral-600">Nhiệt độ</p>
                    <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 ">
                        {tempCard} &deg; C
                    </h5>
                </div>
            </div>

            <div
                style={{ backgroundColor: bgHumi }}
                className="flex w-[25%] justify-around items-center rounded-xl bg-clip-border text-gray-700 shadow-md border"
            >
                <img
                    src={humidity}
                    className="object-contain h-[75px] mr-[-50px]"
                />
                <div className="ml-[-50px]">
                    <p className="mb-4 text-base text-neutral-600">Độ ẩm</p>
                    <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800">
                        {humiCard} %
                    </h5>
                </div>
            </div>

            <div
                style={{ backgroundColor: bgLight }}
                className="flex w-[25%] justify-around items-center rounded-xl  bg-clip-border text-gray-700 shadow-md border"
            >
                <img src={sun} className="object-contain h-[75px] mr-[-50px]" />
                <div className="ml-[-50px]">
                    <p className="mb-4 text-base text-neutral-600">Ánh sáng</p>
                    <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800">
                        {lightCard} lux
                    </h5>
                </div>
            </div>

            <div
                style={{ backgroundColor: bgDb }}
                className="flex w-[20%] justify-around items-center rounded-xl  bg-clip-border text-gray-700 shadow-md border"
            >
                <img src={dobui} className="object-contain h-[90px] mr-[-50px]" />
                <div className="ml-[-50px]">
                    <p className="mb-4 text-base text-neutral-600">Độ bụi</p>
                    <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800">
                        {dbCard} %
                    </h5>
                </div>
            </div>
        </div>
    );
};

export default Cards;
