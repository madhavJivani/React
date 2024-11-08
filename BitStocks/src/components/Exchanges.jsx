import React, { useEffect, useState } from 'react';
import { server } from '../main';
import axios from 'axios';
import ExchangeCard from './ExchangeCard';
import ErrorComponent from './ErrorComponent';
import Loader from './Loader';

const Exchanges = () => {
    const [info, setInfo] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [page, setPage] = useState(1); // Page state for pagination

    const fetchExchanges = async () => {
        try {
            setLoading(true); // Set loading to true when fetching data
            const { data } = await axios.get(`${server}/exchanges?page=${page}`);
            setInfo(data);
            setLoading(false);
            setIsError(false);
        } catch (error) {
            console.log(error);
            setTimeout(() => {
                setLoading(false);
                setIsError(true);
            }, 2000);
        }
    };

    // Fetch data when the page or component loads or page changes
    useEffect(() => {
        fetchExchanges();
    }, [page]);

    // Handler for changing pages
    const handlePageChange = (newPage) => {
        if (newPage < 1 || newPage > 32) return; // Prevent negative pages
        setPage(newPage);
    };

    if (loading) {
        return <Loader />;
    }

    if (isError) {
        return (
            <div className="flex items-center justify-center h-screen">
                <ErrorComponent message="Failed to load exchanges. Please try again later." />
            </div>
        );
    }

    return (
        <div className="p-8">
            <div className="flex items-center justify-between mb-8 mt-14">
                <h1 className="text-3xl font-bold">Exchanges</h1>

                {/* Pagination Controls */}
                <div className="flex items-center space-x-4">
                    <button
                        onClick={() => handlePageChange(page - 1)}
                        disabled={page === 1}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"

                    >
                        <strong>Previous</strong>
                    </button>
                    <span className="text-lg font-semibold text-black">
                        Page {page}
                    </span>
                    <button
                        onClick={() => handlePageChange(page + 1)}
                        disabled={page === 32}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition disabled:bg-gray-300 disabled:text-blue-400"
                    >
                        <strong>Next</strong>
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {info.map((item, index) => (
                    <ExchangeCard exchange={item} key={index} />
                ))}
            </div>
        </div>
    );
};

export default Exchanges;
