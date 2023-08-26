import React from 'react';
import Cards from '../components/Cards';
import Clock from '../components/Clock';

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
        </div>
    );
};

export default Dashboard;
