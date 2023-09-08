import React, { useEffect } from 'react';
import Clock from '../components/Clock';

const ActionHistory = ({ relay, setRelay }) => {
    useEffect(() => {
        fetch('http://localhost:8688/api/relay')
            .then((response) => response.json())
            .then((data) => {
                setRelay(data);
            })
            .catch((err) => console.log(err));
    }, []);

    console.log(relay);

    const formatISO8601ToDateTime = (isoString) => {
        const date = new Date(isoString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Thêm 0 đầu tiên nếu tháng < 10
        const day = String(date.getDate()).padStart(2, '0'); // Thêm 0 đầu tiên nếu ngày < 10
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');

        return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    };

    return (
        <div>
            <strong className="h-[90px] border-b mr-[100px] flex justify-start items-center">
                <h1>ACTION HISTORY</h1>
                <Clock />
            </strong>
            <hr className="mr-[100px]" />

            <div className="mt-[20px] mr-[100px]">
                <div className="row">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>TYPE</th>
                                <th>State</th>
                                <th>Time</th>
                            </tr>
                        </thead>

                        <tbody>
                            {relay.map((sensor) => (
                                <tr key={sensor.id}>
                                    <td>{sensor.id}</td>
                                    <td>{sensor.relay_id}</td>
                                    <td>{sensor.state}</td>
                                    <td>
                                        {formatISO8601ToDateTime(sensor.date)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ActionHistory;
