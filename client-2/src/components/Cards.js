import React, { useState, useEffect } from 'react';
import nhietDo from '../img/nhietdo.png';
import humidity from '../img/humidity.png';
import sun from '../img/sun.png';

const Cards = () => {
    const [randomTem, setRandomTem] = useState(null);
    const [randomHum, setRandomHum] = useState(null);
    const [randomLux, setRandomLux] = useState(null);

    const minTem = 30;
    const maxTem = 40;

    useEffect(() => {
        const interval = setInterval(() => {
            const newRandomTem =
                Math.floor(Math.random() * (maxTem - minTem)) + minTem;
            setRandomTem(newRandomTem);
        }, 3000);
        return () => clearInterval(interval);
    }, []);
    return (
        <div className="flex justify-around">
            <div
                className={`flex w-[30%] h-[150px] justify-around items-center rounded-xl bg-white bg-clip-border text-gray-700 shadow-md border  ${
                    randomTem > 35 ? 'border-red-600' : ''
                }`}
            >
                <img
                    src={nhietDo}
                    className={`object-contain h-[90px] mr-[-50px]`}
                />
                <div className="ml-[-50px]">
                    <p className="mb-4 text-base text-neutral-600">Nhiệt độ</p>
                    <h5
                        className={`mb-2 text-xl font-medium leading-tight text-neutral-800 ${
                            randomTem > 35 ? 'text-red-500' : ''
                        }`}
                    >
                        {randomTem} &deg; C
                    </h5>
                    {randomTem > 35 && <span className="text-red-600">Nhiệt độ quá cao!</span>}
                </div>
            </div>

            <div className="flex w-[30%] justify-around items-center rounded-xl bg-white bg-clip-border text-gray-700 shadow-md border">
                <img
                    src={humidity}
                    className="object-contain h-[90px] mr-[-50px]"
                />
                <div className="ml-[-50px]">
                    <p className="mb-4 text-base text-neutral-600">Độ ẩm</p>
                    <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800">
                        30 %
                    </h5>
                </div>
            </div>

            <div className="flex w-[30%] justify-around items-center rounded-xl bg-white bg-clip-border text-gray-700 shadow-md border">
                <img src={sun} className="object-contain h-[90px] mr-[-50px]" />
                <div className="ml-[-50px]">
                    <p className="mb-4 text-base text-neutral-600">Ánh sáng</p>
                    <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800">
                        30 lux
                    </h5>
                </div>
            </div>
        </div>
    );
};

export default Cards;
