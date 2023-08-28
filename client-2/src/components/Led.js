import React, { useState, useEffect } from 'react';
import Led_off from '../img/lightbulb.png';
import Led_on from '../img/lightbulb_on.png';
import Fan_off from '../img/fan_off.png';
import Fan_on from '../img/fan_on.gif';

const Led = () => {
    const [isCheckedLight, setIsCheckedLight] = useState(false);
    const [isCheckedFan, setIsCheckedFan] = useState(false);

    const handleChangeLight = () => {
        setIsCheckedLight(!isCheckedLight);
    };

    const handleChangeFan = () => {
        setIsCheckedFan(!isCheckedFan);
    };
    // console.log(isCheckedLight)
    return (
        <div className="flex flex-col justify-around">
            <div className="mb-[40px] flex w-[100%] justify-around items-center rounded-xl bg-white bg-clip-border text-gray-700 shadow-md border h-[150px]">
                {isCheckedLight ? (
                    <img
                        src={Led_on}
                        className="object-contain h-[90px] mr-[-50px]"
                    />
                ) : (
                    <img
                        src={Led_off}
                        className="object-contain h-[90px] mr-[-50px]"
                    />
                )}
                <div className="ml-[-50px]">
                    <div>
                        OFF&ensp;
                        <input
                            className="mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-neutral-300 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-neutral-600 dark:after:bg-neutral-400 dark:checked:bg-primary dark:checked:after:bg-primary dark:focus:before:shadow-[3px_-1px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca]"
                            type="checkbox"
                            role="switch"
                            id="flexSwitchCheckDefault"
                            checked={isCheckedLight}
                            onChange={handleChangeLight}
                        />
                        &ensp;ON
                    </div>
                </div>
            </div>

            <div className="flex w-[100%] justify-around items-center rounded-xl bg-white bg-clip-border text-gray-700 shadow-md border h-[150px]">
                {isCheckedFan ? (
                    <img
                        src={Fan_on}
                        className="object-contain h-[90px] mr-[-50px]"
                    />
                ) : (
                    <img
                        src={Fan_off}
                        className="object-contain h-[90px] mr-[-50px]"
                    />
                )}
                <div className="ml-[-50px]">
                    <div>
                        OFF&ensp;
                        <input
                            className="mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-neutral-300 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-neutral-600 dark:after:bg-neutral-400 dark:checked:bg-primary dark:checked:after:bg-primary dark:focus:before:shadow-[3px_-1px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca]"
                            type="checkbox"
                            role="switch"
                            id="flexSwitchCheckDefault"
                            checked={isCheckedFan}
                            onChange={handleChangeFan}
                        />
                        &ensp;ON
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Led;
