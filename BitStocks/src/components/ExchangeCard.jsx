import React from 'react';
import toast from 'react-hot-toast';

const ExchangeCard = ({ exchange }) => {
    return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-6 flex flex-col justify-between items-center w-full max-w-xs mx-auto text-center transform transition duration-300 hover:scale-105 bg-gradient-to-r from-blue-50 to-blue-200 hover:shadow-3xl">
            {/* Exchange Logo */}
            <img
                src={exchange.image}
                alt={`${exchange.name} logo`}
                className="w-16 h-16 rounded-full mb-4"
            />

            {/* Exchange Name */}
            <h2 className="text-2xl font-bold text-gray-800 mb-2 ">
                {exchange.name}
            </h2>

            {/* Country and Established Year */}
            <p className="text-sm text-gray-500 mb-2">
                {exchange.country} • Est. {exchange.year_established}
            </p>

            {/* Trust Score */}
            <p className="text-sm font-medium text-gray-600 mb-2">
                Trust Score: <span className="text-blue-600">{exchange.trust_score}</span>
            </p>

            {/* Trade Volume */}
            <p className="text-sm font-medium text-gray-600 mb-4">
                24h Volume: <span className="text-blue-600">{Math.round(exchange.trade_volume_24h_btc)} BTC</span>
            </p>

            {/* Trust Score Rank */}
            <p className="text-sm text-gray-600 mb-4">
                Rank: <span className="font-semibold text-blue-600">#{exchange.trust_score_rank}</span>
            </p>

            {/* Has Trading Incentive */}
            <p className="text-sm text-gray-600 mb-6">
                Trading Incentive: {exchange.has_trading_incentive ? (
                    <span className="text-green-600 font-semibold">Yes</span>
                ) : (
                    <span className="text-red-600 font-semibold">No</span>
                )}
            </p>

            {/* Button to Visit the Exchange */}
            <a
                href={exchange.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-300"
                onClick={() => toast.success(`Heading to ${exchange.name}`)}
            >
                Visit
            </a>
        </div>
    );
};

export default ExchangeCard;
