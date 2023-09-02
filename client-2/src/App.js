import { Routes, Route } from 'react-router-dom';
import './App.css';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import DataSensor from './pages/DataSensor';
import ActionHistory from './pages/ActionHistory';

function App() {
    return (
        <div className="App flex justtify-around">
            <div className="w-[20%]">
                <Sidebar />
            </div>
            <div className="w-[80%]">
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/datasensor" element={<DataSensor />} />
                    <Route path="/actionhistory" element={<ActionHistory />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;
