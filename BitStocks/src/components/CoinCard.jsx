import React from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { AiOutlineDollar, AiOutlineEuro } from 'react-icons/ai';
import { BiRupee } from 'react-icons/bi';

const CoinCard = ({ coin, currency }) => {
    return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-6 flex flex-col justify-between items-center w-full max-w-md mx-auto text-center transform transition duration-300 hover:scale-105 bg-gradient-to-r from-blue-50 to-blue-200 hover:shadow-3xl hover:cursor-pointer">
            {/* Coin Image */}
            <img
                src={coin.image}
                alt={`${coin.name} logo`}
                className="w-24 h-24 mb-4 rounded-full"
            />

            {/* Coin Name and Symbol */}
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {coin.name} ({coin.symbol.toUpperCase()})
            </h2>

            {/* Current Price */}
            <p className="text-lg font-semibold text-gray-600 mb-2 flex items-center justify-center space-x-2">
                <span>Price:</span>
                <span className="text-green-600 flex items-center">
                    {currency === 'inr' ? (
                        <BiRupee size={20} />
                    ) : currency === 'usd' ? (
                        <AiOutlineDollar size={20} />
                    ) : (
                        <AiOutlineEuro size={20} />
                    )}
                    <span className="ml-1">{coin.current_price.toLocaleString()}</span>
                </span>
            </p>

            {/* Market Cap */}
            <p className="text-sm text-gray-500 mb-2">
                Market Cap: <span className="font-semibold text-blue-600">{Math.round(coin.market_cap / 1e9)}B</span>
            </p>

            {/* 24h Change */}
            <p className="text-sm text-gray-600 mb-2">
                24h Change: <span className={`font-semibold ${coin.price_change_percentage_24h > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {coin.price_change_percentage_24h.toFixed(2)}%
                </span>
            </p>

            {/* ATH (All Time High) */}
            <p className="text-sm text-gray-600 mb-2">
                ATH: <span className="font-semibold text-blue-600">${coin.ath.toLocaleString()}</span> on {new Date(coin.ath_date).toLocaleDateString()}
            </p>

            {/* ATL (All Time Low) */}
            <p className="text-sm text-gray-600 mb-4">
                ATL: <span className="font-semibold text-red-600">${coin.atl.toLocaleString()}</span> on {new Date(coin.atl_date).toLocaleDateString()}
            </p>

            {/* Circulating Supply */}
            <p className="text-sm text-gray-600 mb-2">
                Circulating Supply: <span className="font-semibold text-blue-600">{coin.circulating_supply.toLocaleString()} {coin.symbol.toUpperCase()}</span>
            </p>

            {/* 24h High and Low */}
            <div className="flex justify-between text-sm text-gray-600 mb-4 w-full">
                <p>24h High: <span className="font-semibold text-green-600">${coin.high_24h.toLocaleString()}</span></p>
                <p>24h Low: <span className="font-semibold text-red-600">${coin.low_24h.toLocaleString()}</span></p>
            </div>

            {/* Fully Diluted Valuation */}
            <p className="text-sm text-gray-600 mb-4">
                FDV: <span className="font-semibold text-purple-600">${coin.fully_diluted_valuation.toLocaleString()}</span>
            </p>

            {/* Button to Coin's Page */}
            <Link to={`coin/${coin.id}`} className="w-full">
                <button
                    className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-300 block"
                    onClick={() => toast.success(`Heading to ${(coin.name).toLocaleString()} Details Page`)}
                >
                    View on CoinGecko
                </button>
            </Link>
        </div>
    );
};

export default CoinCard;
