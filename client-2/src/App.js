import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import DataSensor from './pages/DataSensor';
import ActionHistory from './pages/ActionHistory';
import useLimitedArray from './config/useLimitedArray';

function App() {
    //card
    const [tempCard, setTempCard] = useState(null);
    const [humiCard, setHumiCard] = useState(null);
    const [lightCard, setLightCard] = useState(null);
    const [bgTemp, setBgTemp] = useState('');
    const [bgHumi, setBgHumi] = useState('');
    const [bgLight, setBgLight] = useState('');

    //chart
    const [temp, setTemp] = useLimitedArray(10);
    const [humi, setHumi] = useLimitedArray(10);
    const [light, setLight] = useLimitedArray(10);
    const [label, setLabel] = useLimitedArray(10);

    //datasensor
    const [dataSensor, setDataSensor] = useState([]);

    //Led
    const [isCheckedLight, setIsCheckedLight] = useState(null);
    const [isCheckedFan, setIsCheckedFan] = useState(null);

    //relay api
    const [relay, setRelay] = useState([]);


    return (
        <div className="App flex justtify-around">
            <div className="w-[20%]">
                <Sidebar />
            </div>
            <div className="w-[80%]">
                <Routes>
                    <Route
                        path="/"
                        element={
                            <Dashboard
                                temp={temp}
                                setTemp={setTemp}
                                humi={humi}
                                setHumi={setHumi}
                                light={light}
                                setLight={setLight}
                                label={label}
                                setLabel={setLabel}
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
                                isCheckedLight={isCheckedLight}
                                setIsCheckedLight={setIsCheckedLight}
                                isCheckedFan={isCheckedFan}
                                setIsCheckedFan={setIsCheckedFan}
                            />
                        }
                    />
                    <Route path="/profile" element={<Profile />} />
                    <Route
                        path="/datasensor"
                        element={
                            <DataSensor
                                dataSensor={dataSensor}
                                setDataSensor={setDataSensor}
                            />
                        }
                    />
                    <Route path="/actionhistory" element={<ActionHistory relay={relay} setRelay={setRelay}/>} />
                </Routes>
            </div>
        </div>
    );
}

export default App;
