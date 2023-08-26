import Clock from '../components/Clock';
import React from 'react';

const DataSensor = () => {
    return (
        <div>
            <strong className="h-[90px] border-b mr-[100px] flex justify-start items-center">
                <div>DATA SENSORS</div>
                <Clock />
            </strong>
            <hr className="mr-[100px]" />
        </div>
    );
};

export default DataSensor;
