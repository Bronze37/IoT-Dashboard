import React, { useEffect, useState } from 'react';
import Clock from '../components/Clock';

const ActionHistory = () => {

    const [relay, setRelay] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8688/api/relay")
          .then((response) => response.json())
          .then((data) => {
            setRelay(data);
          })
          .catch((err) => console.log(err));
      }, []);

      console.log(relay)
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
                                <th>RelayID</th>
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
                                    <td>{sensor.date}</td>
                                    
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
