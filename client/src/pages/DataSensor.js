import React, { useEffect, useState } from 'react';
import Clock from '../components/Clock';

const DataSensor = ({
    dataSensor,
    setDataSensor,
    currentPage,
    setCurrentPage,
}) => {
    const [pageSize, setPageSize] = useState(15);
    const [filter, setFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        // Mock data for testing
        const mockData = [
            { id: 1, temp: 22.5, humi: 55, light: 200, date: '2024-08-27T12:30:00Z' },
            { id: 2, temp: 23.0, humi: 60, light: 210, date: '2024-08-27T12:45:00Z' },
            { id: 3, temp: 24.0, humi: 58, light: 220, date: '2024-08-27T13:00:00Z' },
            { id: 4, temp: 25.0, humi: 62, light: 230, date: '2024-08-27T13:15:00Z' },
            { id: 5, temp: 26.0, humi: 65, light: 240, date: '2024-08-27T13:30:00Z' },
            { id: 6, temp: 27.0, humi: 63, light: 250, date: '2024-08-27T13:45:00Z' },
            { id: 7, temp: 28.0, humi: 67, light: 260, date: '2024-08-27T14:00:00Z' },
            { id: 8, temp: 29.0, humi: 68, light: 270, date: '2024-08-27T14:15:00Z' },
            { id: 9, temp: 30.0, humi: 70, light: 280, date: '2024-08-27T14:30:00Z' },
            { id: 10, temp: 21.5, humi: 59, light: 190, date: '2024-08-27T14:45:00Z' },
            { id: 11, temp: 22.8, humi: 61, light: 195, date: '2024-08-27T15:00:00Z' },
            { id: 12, temp: 23.5, humi: 64, light: 205, date: '2024-08-27T15:15:00Z' },
            { id: 13, temp: 24.2, humi: 66, light: 215, date: '2024-08-27T15:30:00Z' },
            { id: 14, temp: 25.8, humi: 69, light: 225, date: '2024-08-27T15:45:00Z' },
            { id: 15, temp: 26.4, humi: 70, light: 235, date: '2024-08-27T16:00:00Z' },
            { id: 16, temp: 27.1, humi: 72, light: 245, date: '2024-08-27T16:15:00Z' },
            { id: 17, temp: 28.5, humi: 74, light: 255, date: '2024-08-27T16:30:00Z' },
            { id: 18, temp: 29.9, humi: 76, light: 265, date: '2024-08-27T16:45:00Z' },
            { id: 19, temp: 30.5, humi: 78, light: 275, date: '2024-08-27T17:00:00Z' },
            { id: 20, temp: 21.0, humi: 80, light: 285, date: '2024-08-27T17:15:00Z' },
        ];

        setDataSensor(mockData);
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery]);

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

    const filteredData = dataSensor.filter(sensor => {
        if (!searchQuery) return true;
        const formattedDate = formatISO8601ToDateTime(sensor.date);
        switch (filter) {
            case 'temp':
                return sensor.temp.toString().includes(searchQuery);
            case 'humi':
                return sensor.humi.toString().includes(searchQuery);
            case 'light':
                return sensor.light.toString().includes(searchQuery);
            case 'time':
                return formattedDate.includes(searchQuery);
            case 'all':
            default:
                return (
                    sensor.temp.toString().includes(searchQuery) ||
                    sensor.humi.toString().includes(searchQuery) ||
                    sensor.light.toString().includes(searchQuery) ||
                    formattedDate.includes(searchQuery)
                );
        }
    });

    const lastIndex = currentPage * pageSize;
    const firstIndex = lastIndex - pageSize;
    const records = filteredData.slice(firstIndex, lastIndex);
    const npage = Math.ceil(filteredData.length / pageSize);
    const numbers = [...Array(npage + 1).keys()].slice(1);

    const handlePageSizeChange = (e) => {
        setPageSize(Number(e.target.value));
        setCurrentPage(1);
    };

    return (
        <div>
            <strong className="h-[90px] border-b mr-[100px] flex justify-start items-center">
                <div>DATA SENSORS</div>
                <Clock />
            </strong>
            <hr className="mr-[100px]" />

            <div className="mt-[20px] mr-[100px]">
                <div className="row">
                    <div className="col-md-4">
                        <label htmlFor="pageSize">Page Size:</label>
                        <select
                            id="pageSize"
                            value={pageSize}
                            onChange={handlePageSizeChange}
                            className="form-control"
                        >
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={15}>15</option>
                            <option value={20}>20</option>
                        </select>
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="filter">Filter:</label>
                        <select
                            id="filter"
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className="form-control"
                        >
                            <option value="all">All</option>
                            <option value="temp">Temp</option>
                            <option value="humi">Humi</option>
                            <option value="light">Light</option>
                            <option value="time">Time</option>
                        </select>
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="searchQuery">Search:</label>
                        <input
                            type="text"
                            id="searchQuery"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="form-control"
                            placeholder="Enter search term"
                        />
                    </div>
                </div>
                <table className="table table-striped table-bordered mt-3">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Temp</th>
                            <th>Humi</th>
                            <th>Light</th>
                            <th>Time</th>
                        </tr>
                    </thead>

                    <tbody>
                        {records.map((sensor) => (
                            <tr key={sensor.id}>
                                <td>{sensor.id}</td>
                                <td>{sensor.temp}</td>
                                <td>{sensor.humi}</td>
                                <td>{sensor.light}</td>
                                <td>{formatISO8601ToDateTime(sensor.date)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <nav className="flex justify-end mr-[-20px]">
                    <ul className="pagination">
                        {numbers.map((n, i) => {
                            const pagesToShow = 5;
                            const pagesBeforeCurrent = Math.floor(pagesToShow / 2);
                            const pagesAfterCurrent = pagesToShow - pagesBeforeCurrent;

                            if (n === 1 || n === npage) {
                                return (
                                    <li
                                        className={`page-item ${currentPage === n ? 'active' : ''}`}
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
                                n >= currentPage - pagesBeforeCurrent &&
                                n <= currentPage + pagesAfterCurrent
                            ) {
                                return (
                                    <li
                                        className={`page-item ${currentPage === n ? 'active' : ''}`}
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
                                (n === 2 && currentPage > pagesBeforeCurrent + 1) ||
                                (n === npage - 1 && currentPage < npage - pagesAfterCurrent)
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
        setCurrentPage(id);
    }
};

export default DataSensor;