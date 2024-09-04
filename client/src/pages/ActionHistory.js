import React, { useEffect } from 'react';
import Clock from '../components/Clock';

const ActionHistory = ({ relay, setRelay, currentPage1, setCurrentPage1 }) => {
    useEffect(() => {
        // Mock data for testing
        const mockData = [
            { id: 1, relay_id: 'Relay A', state: 'ON', date: '2024-08-27T12:30:00Z' },
            { id: 2, relay_id: 'Relay B', state: 'OFF', date: '2024-08-27T12:45:00Z' },
            { id: 3, relay_id: 'Relay C', state: 'ON', date: '2024-08-27T13:00:00Z' },
            { id: 4, relay_id: 'Relay D', state: 'OFF', date: '2024-08-27T13:15:00Z' },
            { id: 5, relay_id: 'Relay E', state: 'ON', date: '2024-08-27T13:30:00Z' },
            { id: 6, relay_id: 'Relay F', state: 'OFF', date: '2024-08-27T13:45:00Z' },
            { id: 7, relay_id: 'Relay G', state: 'ON', date: '2024-08-27T14:00:00Z' },
            { id: 8, relay_id: 'Relay H', state: 'OFF', date: '2024-08-27T14:15:00Z' },
            { id: 9, relay_id: 'Relay I', state: 'ON', date: '2024-08-27T14:30:00Z' },
            { id: 10, relay_id: 'Relay J', state: 'OFF', date: '2024-08-27T14:45:00Z' },
            { id: 11, relay_id: 'Relay K', state: 'ON', date: '2024-08-27T15:00:00Z' },
            { id: 12, relay_id: 'Relay L', state: 'OFF', date: '2024-08-27T15:15:00Z' },
            { id: 13, relay_id: 'Relay M', state: 'ON', date: '2024-08-27T15:30:00Z' },
            { id: 14, relay_id: 'Relay N', state: 'OFF', date: '2024-08-27T15:45:00Z' },
            { id: 15, relay_id: 'Relay O', state: 'ON', date: '2024-08-27T16:00:00Z' },
            { id: 16, relay_id: 'Relay P', state: 'OFF', date: '2024-08-27T16:15:00Z' },
            { id: 17, relay_id: 'Relay Q', state: 'ON', date: '2024-08-27T16:30:00Z' },
            { id: 18, relay_id: 'Relay R', state: 'OFF', date: '2024-08-27T16:45:00Z' },
            { id: 19, relay_id: 'Relay S', state: 'ON', date: '2024-08-27T17:00:00Z' },
            { id: 20, relay_id: 'Relay T', state: 'OFF', date: '2024-08-27T17:15:00Z' },
        ];

        setRelay(mockData);
    }, []);

    console.log(relay);

    const recordsPerPage = 15;
    const lastIndex = currentPage1 * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = relay.slice(firstIndex, lastIndex);
    const npage = Math.ceil(relay.length / recordsPerPage);
    const numbers = [...Array(npage + 1).keys()].slice(1);

    const formatISO8601ToDateTime = (isoString) => {
        const date = new Date(isoString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
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
                            {records.map((sensor) => (
                                <tr key={sensor.id}>
                                    <td>{sensor.id}</td>
                                    <td>{sensor.relay_id}</td>
                                    <td>{sensor.state}</td>
                                    <td>{formatISO8601ToDateTime(sensor.date)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <nav className="flex justify-end mr-[-20px]">
                    <ul className="pagination">
                        {numbers.map((n, i) => {
                            const pagesToShow = 5;
                            const pagesBeforeCurrent = Math.floor(pagesToShow / 2);
                            const pagesAfterCurrent = pagesToShow - pagesBeforeCurrent;

                            if (n === 1 || n === npage) {
                                return (
                                    <li
                                        className={`page-item ${currentPage1 === n ? 'active' : ''}`}
                                        key={i}
                                    >
                                        <a
                                            href="#"
                                            className="page-link"
                                            onClick={() => changeCPage(n)}
                                        >
                                            {n}
                                        </a>
                                    </li>
                                );
                            }

                            if (
                                n >= currentPage1 - pagesBeforeCurrent &&
                                n <= currentPage1 + pagesAfterCurrent
                            ) {
                                return (
                                    <li
                                        className={`page-item ${currentPage1 === n ? 'active' : ''}`}
                                        key={i}
                                    >
                                        <a
                                            href="#"
                                            className="page-link"
                                            onClick={() => changeCPage(n)}
                                        >
                                            {n}
                                        </a>
                                    </li>
                                );
                            }

                            if (
                                (n === 2 && currentPage1 > pagesBeforeCurrent + 1) ||
                                (n === npage - 1 && currentPage1 < npage - pagesAfterCurrent)
                            ) {
                                return (
                                    <li className="page-item" key={i}>
                                        <span className="page-link">...</span>
                                    </li>
                                );
                            }

                            return null;
                        })}
                    </ul>
                </nav>
            </div>
        </div>
    );
    function changeCPage(id) {
        setCurrentPage1(id);
    }
};

export default ActionHistory;
