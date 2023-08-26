import React from 'react';
import Clock from '../components/Clock';

const ActionHistory = () => {
    return (
        <div>
            <strong className="h-[90px] border-b mr-[100px] flex justify-start items-center">
                <h1>ACTION HISTORY</h1>
                <Clock />
            </strong>
            <hr className="mr-[100px]" />
        </div>
    );
};

export default ActionHistory;
