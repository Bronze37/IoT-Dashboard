import React, { useEffect, useState } from 'react';
import Clock from '../components/Clock';

const DataSensor = ({
    dataSensor,
    setDataSensor,
    currentPage,
    setCurrentPage,
}) => {
    useEffect(() => {
        fetch('http://localhost:8688/api/sensordata')
            .then((response) => response.json())
            .then((data) => {
                setDataSensor(data);
            })
            .catch((err) => console.log(err));
    }, [dataSensor]);

    const [pageSize, setPageSize] = useState(15);
    const [filter, setFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

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
            case 'db':
                return sensor.db.toString().includes(searchQuery);
            case 'time':
                return formattedDate.includes(searchQuery);
            case 'all':
            default:
                return (
                    sensor.temp.toString().includes(searchQuery) ||
                    sensor.humi.toString().includes(searchQuery) ||
                    sensor.light.toString().includes(searchQuery) ||
                    sensor.db.toString().includes(searchQuery) ||
                    formattedDate.includes(searchQuery)
                );
        }
    });

    const sortedData = [...filteredData].sort((a, b) => {
        if (sortConfig.key) {
            if (sortConfig.direction === 'ascending') {
                return a[sortConfig.key] > b[sortConfig.key] ? 1 : -1;
            } else {
                return a[sortConfig.key] < b[sortConfig.key] ? 1 : -1;
            }
        }
        return 0;
    });

    const lastIndex = currentPage * pageSize;
    const firstIndex = lastIndex - pageSize;
    const records = sortedData.slice(firstIndex, lastIndex);
    const npage = Math.ceil(filteredData.length / pageSize);
    const numbers = [...Array(npage + 1).keys()].slice(1);
    const handlePageSizeChange = (e) => {
        setPageSize(Number(e.target.value));
        setCurrentPage(1);
    };

    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery]);

    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const getSortIcon = (key) => {
        if (sortConfig.key === key) {
            return sortConfig.direction === 'ascending' ? '▲' : '▼';
        }
        return '▲';
    };

    const getCurrentDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const countHighDustLevelsInDay = (dateString) => {
        const targetDate = new Date(dateString);
        return dataSensor.filter(sensor => {
            const sensorDate = new Date(sensor.date);
            return sensor.db > 80 &&
                sensorDate.getFullYear() === targetDate.getFullYear() &&
                sensorDate.getMonth() === targetDate.getMonth() &&
                sensorDate.getDate() === targetDate.getDate();
        }).length;
    };

    const targetDate = getCurrentDate(); 

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
                            <option value="db">DB</option>
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

                <br></br>

                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th className='flex justify-center'>
                                Temp
                                <button
                                    onClick={() => requestSort('temp')}
                                    style={{ marginLeft: '5px' }}
                                >
                                    {getSortIcon('temp')}
                                </button>
                            </th>
                            <th>
                                Humi
                                <button
                                    onClick={() => requestSort('humi')}
                                    style={{ marginLeft: '5px' }}
                                >
                                    {getSortIcon('humi')}
                                </button>
                            </th>
                            <th>
                                Light
                                <button
                                    onClick={() => requestSort('light')}
                                    style={{ marginLeft: '5px' }}
                                >
                                    {getSortIcon('light')}
                                </button>
                            </th>
                            <th>
                                DB
                                <button
                                    onClick={() => requestSort('db')}
                                    style={{ marginLeft: '5px' }}
                                >
                                    {getSortIcon('db')}
                                </button>
                            </th>
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
                                <td>{sensor.db}</td>
                                <td>
                                    {formatISO8601ToDateTime(sensor.date)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="d-flex justify-content-between align-items-center">
                    <div className="col-md-2">
                        <div className="d-flex">
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
                    </div>
                    <nav className="flex justify-end mr-[-20px]">
                        <ul className="pagination">
                            {numbers.map((n, i) => {
                                const pagesToShow = 5;
                                const pagesBeforeCurrent = Math.floor(pagesToShow / 2);
                                const pagesAfterCurrent = pagesToShow - pagesBeforeCurrent;

                                if (n === 1) {
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

                                if (n === npage) {
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
                                    n <= currentPage + pagesAfterCurrent &&
                                    n !== 1 &&
                                    n !== npage
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
                                            <span className="page-link">
                                                ...
                                            </span>
                                        </li>
                                    );
                                }

                                return null;
                            })}
                        </ul>
                    </nav>
                </div>
                <div>
                    <p>Số lần bụi lớn hơn 80% trong ngày: {countHighDustLevelsInDay(targetDate)}</p>
                </div>
            </div>
        </div>
    );

    function changeCPage(id) {
        setCurrentPage(id);
    }
};

export default DataSensor;