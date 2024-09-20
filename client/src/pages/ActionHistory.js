import React, { useEffect, useState } from 'react';
import Clock from '../components/Clock';

const ActionHistory = ({ relay, setRelay, currentPage1, setCurrentPage1 }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [pageSize, setPageSize] = useState(15);

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

    const filteredData = relay.filter(sensor => {
        if (!searchQuery) return true;
        const formattedDate = formatISO8601ToDateTime(sensor.date);
        return formattedDate.includes(searchQuery);
    });
    const lastIndex = currentPage1 * pageSize;
    const firstIndex = lastIndex - pageSize;
    const records = filteredData.slice(firstIndex, lastIndex);
    const npage = Math.ceil(filteredData.length / pageSize);
    const numbers = [...Array(npage + 1).keys()].slice(1);
    const handlePageSizeChange = (e) => {
        setPageSize(Number(e.target.value));
        setCurrentPage1(1);
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
                        <label htmlFor="searchQuery">Search by Date:</label>
                        <input
                            type="text"
                            id="searchQuery"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="form-control"
                        />
                    </div>
                </div>

                <br></br>

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
                                <td>
                                    {formatISO8601ToDateTime(sensor.date)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                

                <nav className="flex justify-end mr-[-20px]">
                    <ul className="pagination">
                        {numbers.map((n, i) => {
                            // Tính toán số trang cần hiển thị trước và sau trang hiện tại
                            const pagesToShow = 5; // Số trang liền kề (không tính trang hiện tại)
                            const pagesBeforeCurrent = Math.floor(
                                pagesToShow / 2,
                            );
                            const pagesAfterCurrent =
                                pagesToShow - pagesBeforeCurrent;

                            if (n === 1) {
                                // Hiển thị trang đầu tiên
                                return (
                                    <li
                                        className={`page-item ${
                                            currentPage1 === n ? 'active' : ''
                                        }`}
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
                                // Hiển thị trang cuối cùng
                                return (
                                    <li
                                        className={`page-item ${
                                            currentPage1 === n ? 'active' : ''
                                        }`}
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
                                n <= currentPage1 + pagesAfterCurrent &&
                                n !== 1 &&
                                n !== npage
                            ) {
                                // Hiển thị trang hiện tại và các trang liền kề
                                return (
                                    <li
                                        className={`page-item ${
                                            currentPage1 === n ? 'active' : ''
                                        }`}
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
                                (n === 2 &&
                                    currentPage1 > pagesBeforeCurrent + 1) ||
                                (n === npage - 1 &&
                                    currentPage1 < npage - pagesAfterCurrent)
                            ) {
                                // Hiển thị dấu chấm ba (...) nếu cần
                                return (
                                    <li className="page-item" key={i}>
                                        <span className="page-link">...</span>
                                    </li>
                                );
                            }

                            return null; // Ẩn các ô pagination khác
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
