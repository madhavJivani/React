import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { server } from '../main';
import Loader from './Loader';
import ErrorComponent from './ErrorComponent';
import CoinCard from './CoinCard';
import { AiOutlineDollar, AiOutlineEuro } from 'react-icons/ai';
import { BiRupee } from 'react-icons/bi';
import toast from 'react-hot-toast';

const Coins = () => {
    const [info, setInfo] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [currency, setCurrency] = useState('inr'); // default to INR
    const [page, setPage] = useState(1); // Page state for pagination

    const fetchCoins = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`${server}/coins/markets?vs_currency=${currency}&page=${page}`);
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

    // Fetch data when the page or component loads or currency/page changes
    useEffect(() => {
        fetchCoins();
    }, [currency, page]);

    // Handler for changing pages
    const handlePageChange = (newPage) => {
        if (newPage < 1 || newPage > 32) return; // Prevent negative or out-of-bound pages
        setPage(newPage);
    };

    if (loading) {
        return <Loader />;
    }

    if (isError) {
        return (
            <div className="flex items-center justify-center h-screen">
                <ErrorComponent message="Failed to load coins. Please try again later." />
            </div>
        );
    }

    return (
        <div className="p-8">
            <div className="flex items-center justify-between mb-8 mt-14">
                <h1 className="text-3xl font-bold">Cryptocurrency Prices</h1>
                <div className="flex items-center space-x-4">
                    <button onClick={() => { toast.success('Currency set to Rupees!'); setCurrency('inr') }} className={`p-2 ${currency === 'inr' ? 'text-yellow-500' : 'text-white'}`}>
                        <BiRupee size={24} />
                    </button>
                    <button onClick={() => { toast.success('Currency set to US Dollors!'); setCurrency('usd') }} className={`p-2 ${currency === 'usd' ? 'text-yellow-500' : 'text-white'}`}>
                        <AiOutlineDollar size={24} />
                    </button>
                    <button onClick={() => { toast.success('Currency set to Euros!'); setCurrency('eur') }} className={`p-2 ${currency === 'eur' ? 'text-yellow-500' : 'text-white'}`}>
                        <AiOutlineEuro size={24} />
                    </button>
                </div>
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center justify-between mb-4">
                <button
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 1}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
                >
                    <strong>Previous</strong>
                </button>
                <span className="text-lg font-semibold text-black">Page {page}</span>
                <button
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page === 32}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
                >
                    <strong>Next</strong>
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {info.map((item, index) => (
                    <CoinCard coin={item} key={index} currency={currency} />
                ))}
            </div>
        </div>
    );
};

export default Coins;
