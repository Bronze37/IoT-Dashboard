import React from 'react';
import Cards from '../components/Cards';
import Clock from '../components/Clock';
import Led from '../components/Led';
import ChartE from '../components/ChartE';

const Dashboard = () => {
    return (
        <div>
            <strong className="h-[90px] border-b mr-[100px] flex justify-start items-center">
                <h1>DASHBOARD</h1>
                <Clock />
            </strong>
            <hr className="mr-[100px]" />
            <div className="mr-[100px] mt-10">
                <Cards />
            </div>

            <div className="mt-[40px] mr-[120px] flex justify-around items-center">
                <div className="w-[70%]">
                    <ChartE />
                </div>
                <div className="w-[30%]">
                    <Led />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
