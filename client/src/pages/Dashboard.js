import React, { useState, useEffect, useRef } from 'react';
import Swal from 'sweetalert2';
import io from 'socket.io-client';
import Cards from '../components/Cards';
import Clock from '../components/Clock';
import Led from '../components/Led';
import DataChart from '../components/DataChart';

const Dashboard = ({
    temp,
    setTemp,
    humi,
    setHumi,
    light,
    setLight,
    label,
    setLabel,
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
    isCheckedLight,
    setIsCheckedLight,
    isCheckedFan,
    setIsCheckedFan,
    dbCard,
    setDbCard,
    db,
    setDb,
    isCheckedAirCon,
    setIsCheckedAirCon,
    bgDb,
    setBgDb
}) => {
    const [lastAlertTime, setLastAlertTime] = useState(0);
    const [lastLightAlertTime, setLastLightAlertTime] = useState(0);

    

    // Hàm cảnh báo nhiệt độ cao
    useEffect(() => {
        const now = Date.now();
        if (temp.some(t => t > 35) && now - lastAlertTime > 30000) {
            Swal.fire({
                title: 'Cảnh báo!',
                text: 'Nhiệt độ cao!',
                icon: 'warning',
                confirmButtonText: 'OK',
                confirmButtonColor: '#333333'
            });
            
            setLastAlertTime(now);
        }
    }, [temp, lastAlertTime, setIsCheckedLight, setIsCheckedFan, setIsCheckedAirCon]);

    // Hàm cảnh báo ánh sáng cao
    useEffect(() => {
        const now = Date.now();
        if (light.some(l => l > 400) && now - lastLightAlertTime > 30000) {
            Swal.fire({
                title: 'Cảnh báo!',
                text: 'Ánh sáng quá mạnh!',
                icon: 'warning',
                confirmButtonText: 'OK',
                confirmButtonColor: '#333333'
            });
            
            setLastLightAlertTime(now);
        }
    }, [light, lastLightAlertTime]);

    return (
        <div>
            {/* <strong className="h-[90px] border-b mr-[100px] flex justify-start items-center">
                <h1>DASHBOARD</h1>
                <Clock />
            </strong> */}
            <hr className="mr-[100px]" />

            <div className="mr-[100px] mt-10">
                <Cards
                    tempCard={tempCard}
                    setTempCard={setTempCard}
                    humiCard={humiCard}
                    setHumiCard={setHumiCard}
                    lightCard={lightCard}
                    setLightCard={setLightCard}
                    bgHumi={bgHumi}
                    setBgHumi={setBgHumi}
                    bgTemp={bgTemp}
                    setBgTemp={setBgTemp}
                    bgLight={bgLight}
                    setBgLight={setBgLight}
                    dbCard={dbCard}
                    setDbCard={setDbCard}
                    bgDb={bgDb}
                    setBgDb={setBgDb}
                />
            </div>

            <div className="mt-[40px] mr-[120px] flex justify-around items-center">
                <div className="w-[70%]">
                    <DataChart
                        temp={temp}
                        setTemp={setTemp}
                        humi={humi}
                        setHumi={setHumi}
                        light={light}
                        setLight={setLight}
                        label={label}
                        setLabel={setLabel}
                        dbCard={dbCard}
                        setDbCard={setDbCard}
                        db={db}
                        setDb={setDb}
                    />
                </div>
                <div className="w-[30%]">
                    <Led
                        isCheckedLight={isCheckedLight}
                        setIsCheckedLight={setIsCheckedLight}
                        isCheckedFan={isCheckedFan}
                        setIsCheckedFan={setIsCheckedFan}
                        isCheckedAirCon={isCheckedAirCon}
                        setIsCheckedAirCon={setIsCheckedAirCon}
                    />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;